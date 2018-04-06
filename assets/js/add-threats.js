
$('#datePicker1').datepicker({
    format: 'mm/dd/yyyy'
});
$('#timePicker1').timepicker();

$('.threats-wrapper .nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
    $('.vulnerabilities-table').paging({limit: 10});
})

$(document).ready(function () {

    /*--  On Shown Add Document Modal  --*/
    $('#addThreatsModal').on('shown.bs.modal', function () {
        var availableIPTags = [
            "192.168.0.0",
            "192.168.0.1",
            "192.168.0.2",
            "192.168.0.3",
            "192.168.0.4",
            "192.168.0.5",
            "192.168.0.6",
            "192.168.0.7",
            "192.168.0.8",
            "192.168.0.9"
        ];
        $("#searchIPBox").autocomplete({
            source: availableIPTags,
            autoFocus: true,
            classes: {
                "ui-autocomplete": "server-data-list"
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
                selectedIPData = ui.item.value;
            }
        });
        var availableMacTags = [
            "MAC:00:56:767:aa1",
            "MAC:00:56:767:aa2",
            "MAC:00:56:767:aa3",
            "MAC:00:56:767:aa4",
            "MAC:00:56:767:aa5",
            "MAC:00:56:767:aa6",
            "MAC:00:56:767:aa7",
            "MAC:00:56:767:aa8",
            "MAC:00:56:767:aa9",
            "MAC:00:56:767:aa10"
        ];
        $("#searchMacBox").autocomplete({
            source: availableMacTags,
            autoFocus: true,
            classes: {
                "ui-autocomplete": "db-data-list"
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
                selectedMacData = ui.item.value;
            }
        });

    });

    /*--  On Hidden Add Document Modal  --*/
    $('#addThreatsModal').on('hidden.bs.modal', function () {
        selectedReskScoreData = $("#searchRiskStorebox").val();
        selectedDateData = $('#datePicker1').find("input").val();
        selectedTimeData = $('#timePicker1').val();
        customClass= "";
        switch (selectedReskScoreData) {
            case '0':
                customClass = "gray";
                break;
            case '1':
                customClass = "green";
                break;
            case '2':
                customClass = "yellow";
                break;
            case '3':
                customClass = "yellow";
                break;
            case '4':
                customClass = "yellow";
                break;
            case '5':
                customClass = "orange";
                break;
            case '6':
                customClass = "orange";
                break;
            case '7':
                customClass = "orange";
                break;
            case '8':
                customClass = "red";
                break;
            case '9':
                customClass = "red";
                break;
            case '10':
                customClass = "red";
                break;
            default:
                 customClass = "gray";
        }
        console.log(customClass);
//        console.log($('#datetimepicker1').find("input").val());
        if ($("#searchIPbox").val() !== "" && $("#searchMacbox").val() !== "" && $('#searchRiskStorebox').val() !== "" && $('#datePicker1').find("input").val() !== "" && $('#timePicker1').val() !== "") {
            $(".add-threats-table tbody").append('<tr>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedIPData + '</span>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedMacData + '</span>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedDateData + '&nbsp;' + selectedTimeData + '</span>' +
                    '</td>' +
                    '<td class="'+customClass+'">' +
                    '<span class="selected-data tags">' + selectedReskScoreData + '</span>' +
                    '</td>' +
                    '</tr>');

            /*--  Show Add Database Table  --*/
            $(".add-threats-table").show();
            $("#searchIPBox").val("");
            $("#searchMacBox").val("");
            $('#selectedDateData').val("");
            $('#selectedTimeData').val("");
            $("#searchRiskStorebox").val("");
        }
        $(".btn-threats-close").click(function () {
            $("#searchIPBox").val("");
            $("#searchMacBox").val("");
            $('#selectedDateData').val("");
            $('#selectedTimeData').val("");
            $("#searchRiskStorebox").val("");
        });
    });


    /*--  On Hidden Add Document Modal  --*/
    $('#addVulnerabilitiesModal').on('hidden.bs.modal', function () {
        selectedNameData = $("#name").val();
        selectedDescriptionData = $('#description').val();

        if ($("#name").val() !== "" && $("#description").val() !== "") {
            $(".vulnerabilities-table table tbody").append('<tr>' +
                    '<td>' +
                    '<a class="selected-data" href="javascript:void(0);">' + selectedNameData + '</a>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedDescriptionData + '</span>' +
                    '</td>' +
                    '</tr>');

            /*--  Show Add Database Table  --*/
//            $(".add-threats-table").show();
            $("#name").val("");
            $("#description").val("");
        }
        $(".btn-threats-close").click(function () {
            $("#name").val("");
            $("#description").val("");
        });
    });
        
});

