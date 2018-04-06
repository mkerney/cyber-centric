/*-- Data Map Initialization and values  --*/
var actualData = [];
var availableTags = [
    "Hyderabad",
    "America",
    "Austria",
    "Chile",
    "Germany",
    "Mongolia",
    "Saudi Arabia",
    "Japan",
    "Philippines",
    "Russia",
    "Android",
    "Windows",
    "IOS",
    "MAC",
    "00:56:767:aa",
    "00:56:67:cc",
    "22:77:67:aa",
    "10:17:aa:56d",
    "34:56:aa:77",
    "00:56:77:aa",
    "22:77:67:aa",
    "10:17:aa:56d",
    "34:56:aa:77",
    "192.241.78",
    "192.201.78.1",
    "192.111.91.3",
    "198.267.11.9",
    "Excel,word",
    "word",
    "MS Office",
    "wordpad",
    "17.3850",
    "78.4867",
    "37.0902",
    "95.7129",
    "47.5162",
    "14.5501",
    "35.6751",
    "71.5430",
    "51.1657",
    "10.4515",
    "46.8625",
    "103.8467",
    "23.8859",
    "45.0792",
    "36.2048",
    "138.2529",
    "12.8797",
    "121.7740",
    "61.5240",
    "105.3188",
    "37.0902",
    "95.7129",
    "47.5162",
    "14.5501",
    "35.6751",
    "71.5430",
    "51.1657",
    "10.4515",
    "46.8625",
    "103.8467",
    "36.2048",
    "138.2529",
    "12.8797",
    "121.7740",
    "61.5240",
    "105.3188",
    "78.4867",
    "47.5162",
    "14.5501",
    "35.6751",
    "71.5430",
    "51.1657",
    "10.4515",
    "23.8859",
    "45.0792",
    "36.2048",
    "138.2529",
    "12.8797",
    "121.7740",
    "12:45",
    "09:10",
    "18:45",
    "20:56",
    "11:05",
    "12/09/2016",
    "22/01/2016",
    "25/09/2015",
    "Tag1",
    "Tag2",
    "Tag3",
    "Tag4",
    "Tag5",
    "18/12/2016"
];
$(document).ready(function () {

    /*--  Global var  --*/
    tempData = [];
    filteredData = [];
    $.getJSON("assets/json/test.json", function (json) {
        actualData = json;
        plotMap(actualData);
    });

    if (window.localStorage.tags) {
        var tagsArray = window.localStorage.tags.split(',');
        $.getJSON("assets/json/test.json", function (json) {
            actualData = json;
            $(tagsArray).each(function (k, v) {
                $(actualData).each(function (k1, v1) {
                    if (v1.device === v.split(':')[0]) {
                        v1.tag = v.split(':')[1];
                        availableTags.push(v.split(':')[1]);
                    }
                });
            });
            plotMap(actualData);
        });
    }
});


/*--  Initialize autocomplte input  --*/
$("#searchbox").autocomplete({
    source: availableTags,
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
        var str = $("#searchbox").val().toLowerCase();

        var newarr = $.grep(actualData, function (n, i) {
            return ((n['User_ID'].toString().toLowerCase().search(str) != -1) || (n['mac_address'].toString().toLowerCase().search(str) != -1) || (n['IP address'].toString().toLowerCase().search(str) != -1) || (n['Time'].toString().toLowerCase().search(str) != -1) || (n['Date'].toString().toLowerCase().search(str) != -1) || (n['Appications'].toString().toLowerCase().search(str) != -1) || (n['Downloads'].toString().toLowerCase().search(str) != -1) || (n['device'].toString().toLowerCase().search(str) != -1) || (n['area'].toString().toLowerCase().search(str) != -1) || (n['tag'].toString().toLowerCase().search(str) != -1))
        });
        var area = [];
        tempData = [];
        $.each(newarr, function (i, v) {
            if (filteredData[v.area] == undefined) {
                filteredData[v.area] = [];
            }
            tempData.push(v.area);
            filteredData[v.area].push(v);
        })
        plotMap(newarr);
        $(".datamaps-bubble").each(function (index) {
            areaToSearch = $.parseJSON($(this).attr("data-info")).area;
            cx = $(this).attr("cx")
            cy = $(this).attr("cy")

            numOfTimes = tempData.reduce(function (p, c) {
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
});

$("#searchbox").on("keyup", function () {
    if ($(this).val() === '') {
        plotMap(actualData);
    }
});

function plotMap(data) {
    $("#container").empty();
    $(".pci-data").empty();
    $.each(data, function (k, v) {
        $(".pci-data").append("<li class='list-group-item'><strong>" + v.device + " #" + v['User_ID'] + " </strong><span> MAC:" + v['mac_address'] + "</span><a href='javascript:void(0);' data-toggle='popover' data-placement='left' data-content=''><i class='fa fa-chevron-right'></i></a></li>");
    });
    $(function () {
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function () {
                return $('#popover_content_wrapper').html();
            }
        });
        $('body').on('click', function (e) {
            $('[data-toggle=popover]').each(function () {
                /*--  Hide any open popovers when the anywhere else in the body is clicked  --*/
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });
    });
    var bubble_map = new Datamap({
        element: document.getElementById("container"),
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
            var userId = [];
            if (filteredData[data.area] == undefined) {
                return '<div class="hoverinfo">User ID : ' + data.User_ID + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
            } else {
                $.each(filteredData[data.area], function (i, v) {
                    userId.push(v.User_ID);
                    userId = $.distinct(userId);

                });
                return '<div class="hoverinfo">User ID : ' + userId.toString() + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
            }
        }
    });
    // bubble_map.labels({'customLabelText': '1'});
    $('#container svg .datamaps-bubble').css('fill', 'url(#image)');
    // $('#container').append('<text x="50%" y="50%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" dy=".3em">Look</text>');
    $.extend({
        distinct: function (anArray) {
            var result = [];
            $.each(anArray, function (i, v) {
                if ($.inArray(v, result) == -1)
                    result.push(v);
            });
            return result;
        }
    });
}

/*-- Data Flow Map Initialization and values  --*/
$(document).ready(function () {
    $(".dashboard-tabs a[href='#data-flow']").on('shown.bs.tab', function (e) {
        e.target; // newly activated tab
        e.relatedTarget; // previous active tab    
        $.blockUI({css: {color: '#0088cc'}, overlayCSS: {backgroundColor: 'transparent'}, message: '<img src="assets/images/ajax-loader.gif"></img>'});
        $("#mapChartContainer").html("");
        setTimeout(function () {
            $.unblockUI();
            plotMapConnector("mapChartContainer");
        }, 300);
//        renderLegend();
    });
});

function plotMapConnector(id) {
    var capacityArray = [];
    var width = $("svg").parent().width() - 100;

    var height = width / 4;
    if (height < 200) {
        height = 200;
    }
    var svg = d3.select("#mapChartContainer").append("svg")
            .attr("width", width)
            .attr("height", height);
    var projection = d3.geo.equirectangular()
            .scale(width / 11)
            .translate([width / 3.3, height / 1.5]);

    var path = d3.geo.path()
            .projection(projection);
    var g = svg.append("g");

    /*--  Define Colorscale for legends and connection line olors  --*/
    var colorScale = d3.scale.linear().domain([10, 20, 35, 45, 100, 150, 200, 300, 400, 600, 700, 1000, 1500, 2000, 2500, 5000, 10000, 20000, 30000, 100000]).range(['#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5', '#FF3BBA', '#31AFF5']);
    /*--  Defining color scale for graph  --*/
    //var colorScale = d3.scale.category20()

    /*--  Load topojson data  */
    d3.json("assets/json/topo1.json", function (error, topology) {

        var index;
        /*get index of antarctica*/
        $.grep(topology.objects.output_features.geometries, function (d, k) {
            if (d.properties.name == "Antarctica") {
                index = k;
            }
        });
        /*delete antartica using its index*/
        delete topology.objects.output_features.geometries[index];

        /*draw map using loaded json*/
        g.selectAll("path")
                .data(topojson.object(topology, topology.objects.output_features) /*giving topojson data to path*/
                        .geometries)
                .enter()
                .append("path")
                .attr("d", path);

        /*--  Draw points using cities_with_links data  --*/
        d3.json("assets/json/cities_with_links.json", function (error, cities) {
            rendercities(cities);
            $.unblockUI();
        });
    });


//------------------------------------------------------------------------------
    /**
     *Function to render cities
     */
    function rendercities(data) {
        var data_array = data.cities;/*--  Get data array of cities  --*/
        var linking_array = data.links;/*--  Get data array of cities  --*/
        /*--  Plot scircles on svg for cities  --*/
        svg.selectAll("circle")
                .data(data_array).enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection([d.long, d.lat])[0]
                })
                .attr("cy", function (d) {
                    return projection([d.long, d.lat])[1]
                })
                .attr("r", "3px")
                .attr("fill", "#3E89C3")
                .attr("stroke-width", "1px")
                .attr("stroke", function (d) {
                    /*-- Outer border of circle  --*/
                    return "#FF3BBA";
                });
        /*--  Call function to render connector lines  --*/
        renderConnectorLines(linking_array, data_array);
    }

//------------------------------------------------------------------------------
    /**
     * Function to render connector lines and legends
     * 
     * @param {array} data data array of links
     * 
     */
    function renderConnectorLines(linking_array, data_array) {
        var finalArray = [];/*--  Array o get data inrequired format  --*/
        capacityArray = [];/*--  Array to save unique cpacity values to render legends  --*/
        /*--  Create final and capacity array  --*/
        $.each(linking_array, function (k, v) {
            $.each(v, function (key, val) {
                capacityArray.push(val.capacity);/*--  Push all cap[acities  --*/

                /*--  Get data for first geo position  --*/
                var data1 = $.grep(data_array, function (e) {
                    return e.id == val.endpoint1_id;
                })[0];

                /*--  Get data for second geo poaition  --*/
                var data2 = $.grep(data_array, function (e) {
                    return e.id == val.endpoint2_id;
                })[0];

                /*--  Push data to final array in required format  --*/
                finalArray.push({
                    type: "LineString",
                    capacity: val.capacity,
                    coordinates: [
                        [data1.long, data1.lat],
                        [data2.long, data2.lat]
                    ]
                });
            });
        });
        /*--  Define path arcs to draw connector lines  --*/
        var pathArcs = svg.selectAll(".arc")
                .data(finalArray);
//draw connector lines
        pathArcs.enter()
                .append("path")
                .attr("stroke", function (d) {
                    return colorScale(d.capacity);
                })
                .attr('class', function (d) {
                    return 'arc capacity_' + d.capacity + "path";/*--  Unique calss based on capacities  --*/
                })
                .style({fill: 'none'}).transition()
                .duration(2000)
                .attr("d", path)
                .style({
                    'stroke-width': '1.5px'
                });
        capacityArray = unique(capacityArray);/*--  Remove duplicates from capacity array  --*/
        function unique(array) {
            return $.grep(array, function (el, index) {
                return index == $.inArray(el, array);
            });
        }
        unique(capacityArray)
        renderLegend(capacityArray);/*--  Call render legend to render legends  --*/
    }

//------------------------------------------------------------------------------
    /**
     * Function to render legends
     * 
     * @param {array} data 
     */
    function renderLegend(data) {
        return false;

        /*--  Sort data in accesding order  --*/
        data.sort(function (a, b) {
            return a - b;
        });
        var legenddiv = d3.select('#mapChartContainer').append("div").attr("class", "legendContainer")

        /*--  Draw legend container using div as there are number of legends and svg didn't support scroll  --*/
        for (var i = 0; i < data.length; i++) {
            legenddiv.append('div')
                    .style({'border': '1px solid white', 'padding': '3px', 'text-align': 'right', 'color': 'white', 'background-color': colorScale(data[i]), 'height': '25px'})
                    .attr('class', 'col-xs-3 capacity_' + data[i]).html(data[i])
                    .on("click", function (d) {
                        var cls = $(this).attr('class').split(" ")[1];/*--  Get current element class  --*/
                        var opacity = $(this).css("opacity") == 1 ? 0.3 : 1;/*--  Revert current element opacity  --*/
                        $("." + cls).css("opacity", opacity);/*--  Give reverted opacity to the same element  --*/
                        $("." + cls + "path").css("opacity", opacity == 0.3 ? 0 : 1);/*--  Hide show connector lines based on current opacityof the current element  --*/
                    });
        }
    }
}

$(window).resize(function () {
    // var projection = d3.geo.equirectangular().scale(125).translate([width / 2 - 280, height / 2 - 120])
    setTimeout(function () {
        $("#mapChartContainer").html("");
        plotMapConnector();
    }, 0);
});