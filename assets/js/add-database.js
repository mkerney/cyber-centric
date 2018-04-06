$(document).ready(function () {
    /*--  On Shown Add Document Modal  --*/
    $('#addDatabaseModal').on('shown.bs.modal', function () {
        var availableServerTags = [
            "Server 1",
            "Server 2",
            "Server 3",
            "Server 4",
            "Server 5",
            "Server 6",
            "Server 7",
            "Server 8",
            "Server 9",
            "Server 10"
        ];

        $("#searchServerBox").autocomplete({
            source: availableServerTags,
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
                selectedServerData = ui.item.value;
            }
        });
        var availableDBTags = [
            "DB 1",
            "DB 2",
            "DB 3",
            "DB 4",
            "DB 5",
            "DB 6",
            "DB 7",
            "DB 8",
            "DB 9",
            "DB 10"
        ];

        $("#searchDBBox").autocomplete({
            source: availableDBTags,
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
                selectedDBData = ui.item.value;
            }
        });

        $('#databaseTags').tagsinput('removeAll');
    });

    /*--  On Hidden Add Document Modal  --*/
    $('#addDatabaseModal').on('hidden.bs.modal', function () {
        selectedDatabaseData = $('#databaseTags').val();
//        console.log(selectedDatabaseData.split(",").join(""));

        if ($("#searchServerbox").val() !== "" && $("#searchDBbox").val() !== "" && $('#databaseTags').val() !== "") {

            $(".add-database-table tbody").append('<tr>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedServerData + '</span>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedDBData + '</span>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data tags">' + selectedDatabaseData + '</span>' +
                    '</td>' +
                    '</tr>');

            /*--  Show Add Database Table  --*/
            $(".add-database-table").show();
            $("#searchServerBox").val("");
            $("#searchDBBox").val("");
            $('#databaseTags').tagsinput('removeAll');
        }
        $(".btn-db-modal-close").click(function () {
            $("#searchServerBox").val("");
            $("#searchDBBox").val("");
            $('#databaseTags').tagsinput('removeAll');
        });
    });
});

