$(document).ready(function () {
    /*-- Threats Map Initialization and values  --*/
    var dataMapData = [];
    tempDataMapData = [];
    filteredDataMapData = [];
    dataMapTags = [];

    $(".dashboard-tabs a[href='#datamap']").on('shown.bs.tab', function (e) {
        e.target; // newly activated tab
        e.relatedTarget; // previous active tab   
        $.getJSON("assets/json/data-map.json", function (json) {
            dataMapData = json;
            plotDataMap(dataMapData);
        });
    });

    /*--  Initialize Search Tags  --*/
    var availableSearchTags = [
        "Tag1",
        "Tag2",
        "Tag3",
        "Tag4",
        "Tag5",
        "Tag6",
        "Tag7",
        "Tag8",
        "Tag9",
        "Tag10"
    ];

    $("#searchTagsBox").autocomplete({
        source: availableSearchTags,
        autoFocus: true,
        classes: {
            "ui-autocomplete": "filter-data-list"
        },
        open: function (e, ui) {
            var acData = $(this).data('ui-autocomplete');
            acData
                    .menu
                    .element
                    .find('li')
                    .each(function () {
                        var me = $(this);
                        var keywords = acData.term.split(' ').join('|');
                        me.html(me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<strong>$1</strong>'));
                    });
        },
        select: function (event, ui) {
            selectedMachineData = ui.item.value;
        }
    });

    /*--  Initialize Tool-Tip   --*/
    $('[data-toggle="tooltip"]').tooltip();

    /*--  Slide Toggle cloud button  --*/
    $(".btn-cloud").on('click', function () {
        $(this).siblings('.collapse').slideToggle();
        $(function () {
            var opt = {
                horLabelPos: 'topRight',
                milestones: false,
                foreColor: '#00A65A',
                backColor: '#F5F5F5'
            };
            $('#bar-01').barIndicator(opt);
        });
    });

    /*--  Plot Data Map Function  --*/
    function plotDataMap(data) {
        $("#containerDataMap").empty();
        var bubble_map = new Datamap({
            element: document.getElementById("containerDataMap"),
            geographyConfig: {
                popupOnHover: false,
                highlightOnHover: false
            },
            fills: {
                defaultFill: '#D3D3D3' /*--  Any hex, color name or rgb/rgba value  --*/
            }
        });

        bubble_map.bubbles(data, {
            popupTemplate: function (geo, data) {
                console.log(data);
                var userId = [];
                if (filteredDataMapData[data.area] === undefined) {
                    return '<div class="hoverinfo">Data_Map : ' + data.data_map + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
                } else {
                    $.each(filteredDataMapData[data.area], function (i, v) {
                        userId.push(v.data_map);
                        userId = $.distinct(userId);
                    });
                    return '<div class="hoverinfo">Data_Map : ' + userId.toString() + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
                }
            }
        });

        $('#containerDataMap svg .datamaps-bubble').css('fill', 'url(#image)');

        $.extend({
            distinct: function (anArray) {
                var result = [];
                $.each(anArray, function (i, v) {
                    if ($.inArray(v, result) === -1)
                        result.push(v);
                });
                return result;
            }
        });
    }

    /*--  On Submit Form  --*/
    $(".btn-submit").click(function () {
        if ($("#searchTagsBox").val() !== "") {
            $(".map-main-wrapper").show();
            var dataMapTagVal, checkedVal, selectedVal;
            dataMapTagVal = $("#searchTagsBox").val();
            checkedVal = $("#dataMapForm .radio-inline input:checked").val();
            selectedVal = $("#dataMapForm select").val();
            if (dataMapTagVal !== "" && checkedVal !== "") {
                $(".data-map-table tbody").append('<tr>' +
                        '<td>' +
                        '<span class="selected-data tags">' + dataMapTagVal + '</span>' +
                        '</td>' +
                        '<td>' +
                        '<span class="selected-data">' + checkedVal + '</span>' +
                        '</td>' +
                        '</tr>');
            }
            var str1 = dataMapTagVal;
            var str2 = checkedVal;
            var str3 = selectedVal;
            filterMapFunction(str1, str2, str3);
        }

    });

    /*--  Search Multiple String Function  --*/
    function search(data, str) {
        var newarr = $.grep(data, function (n, i) {
            return ((n['tag'].toString().toLowerCase().search((str.toLowerCase())) !== -1) || (n['machine'].toString().toLowerCase().search((str.toLowerCase())) !== -1) || (n['people'].toString().toLowerCase().search((str.toLowerCase())) !== -1) || (n['include'].toString().toLowerCase().search((str.toLowerCase())) !== -1) || (n['exclude'].toString().toLowerCase().search((str.toLowerCase())) !== -1));
        });
        return newarr;
    }

    /*--  Filter Map Function  --*/
    function  filterMapFunction(str1, str2, str3) {
        var str = [];
        str.push(str1);
        str.push(str2);
        str.push(str3);
        var currentData = dataMapData;
        console.log(str);
        $.each(str, function (i, d) {
            console.log(currentData, "inner");
            currentData = search(currentData, d);

        });
        console.log(currentData, "cd");
        var area = [];
        tempDataMapData = [];
        $.each(currentData, function (i, v) {
            if (filteredDataMapData[v.area] == undefined) {
                filteredDataMapData[v.area] = [];
            }
            tempDataMapData.push(v.area);
            filteredDataMapData[v.area].push(v);
        })
        plotDataMap(currentData);
        $(".datamaps-bubble").each(function (index) {
            areaToSearch = $.parseJSON($(this).attr("data-info")).area;
            cx = $(this).attr("cx")
            cy = $(this).attr("cy")

            numOfTimes = tempDataMapData.reduce(function (p, c) {
                if (c.toLowerCase() === areaToSearch.toLowerCase())
                    p++;
                return p;
            }, 0);
            var tempArray = [{x: cx, y: cy, area: areaToSearch, num: numOfTimes}]
            var svg = d3.select("#container svg");
            var text = svg.append("svg:g").selectAll("g")
                    .data(tempArray)
                    .enter().append("svg:g");

            text.append("svg:text")
                    .attr("text-anchor", "middle")
                    .attr("style", "line-height: 20%")
                    .text(function (d) {
                        return d.num;
                    });

            text.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
    }

    /**
     * Form Validation For Add Policies Form
     */
    $('#dataMapForm').validate({
        rules: {
            searchTagsBox: {
                required: true
            },
            inlineRadioOptions: {
                required: true
            },
            selectOption: {
                required: true
            }
        },
        messages: {
            searchTagsBox: {
                required: "Search Tag is required."
            },
            inlineRadioOptions: {
                required: "Tag Related To is required."
            },
            selectOption: {
                required: "Select is required."
            }
        },
        submitHandler: function (form) {
        }
    });

//    /*--  Initialize Progressbar  --*/
//    $("#progressTimer").progressTimer({
//        timeLimit: 30,
//        warningThreshold: 10,
//        baseStyle: 'progress-bar-success',
//        warningStyle: 'progress-bar-success',
//        completeStyle: 'progress-bar-success',
//        onFinish: function () {
//            console.log("I'm done");
//        }
//    });
});


