$(document).ready(function () {
    /*-- Threats Map Initialization and values  --*/
    var threatsData = [];
    tempThreatsData = [];
    filteredThreatsData = [];

    $(".dashboard-tabs a[href='#threats']").on('shown.bs.tab', function (e) {
        e.target; // newly activated tab
        e.relatedTarget; // previous active tab   
        $.getJSON("assets/json/threats.json", function (json) {
            threatsData = json;
            plotThreatsMap(threatsData);
        });
    });
    
    function plotThreatsMap(data) {
        $("#containerThreats").empty();
        var bubble_map = new Datamap({
            element: document.getElementById("containerThreats"),
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
                if (filteredThreatsData[data.area] === undefined) {
                    return '<div class="hoverinfo">Threats : ' + data.threats + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
                } else {
                    $.each(filteredThreatsData[data.area], function (i, v) {
                        userId.push(v.threats);
                        userId = $.distinct(userId);
                    });
                    return '<div class="hoverinfo">Threats : ' + userId.toString() + '<br/>Device : ' + data.device + '<br/>MAC Address : ' + data.mac_address + '<br/> Country : ' + data.area + '';
                }
            }
        });

        $('#containerThreats svg .datamaps-bubble').css('fill', 'url(#image)');

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
});


