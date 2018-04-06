$(document).ready(function () {
    var selectedData;

    /*--  UI Dialog For My Document Table  --*/
    $(function () {
        $(".ui-widget").dialog({
            autoOpen: false
        });
        $("#downloads-popup-opener").on("click", function () {
            $("#downloads-popup").dialog("open");
        });
        $("#authorised-popup-opener").on("click", function () {
            $("#authorised-popup").dialog("open");
        });
    });
    var tags = [];
    /*--   Bootstrap Tags Input Initialization  --*/
    $('#tags').on('itemAdded', function (event) {
        // event.item: contains the item
        tags.push(selectedMachineData +':'+event.item);
        window.localStorage.tags = tags;
    });
    $('#tags').on('itemRemoved', function (event) {
        // event.item: contains the item
    });
    /*--  Initialize Tree View  --*/
    function treeView() {
        $('.destinationpicker').select2Folder({
            type: "folder",
            placeholder: "Select folder...",
            width: "100%",
            dropdownCssClass: "custom-drop",
            formatSelection: function (data) {
                var selectedData = [];
                selectedData = data;
                var fileUrl = selectedData.toString();
                switch (fileUrl) {
                    case 'Desktop / Test':
                        return false;
                        break;
                    case 'Documents':
                        return false;
                        break;
                    case 'Music':
                        return false;
                        break;
                    case 'Pictures':
                        return false;
                        break;
                    case 'Videos':
                        return false;
                        break;
                    case 'Local Disk (C:)':
                        return false;
                        break;
                    case 'Local Disk (C:) / subfolder 2':
                        return false;
                        break;
                    case 'Local Disk (C:) / subfolder 2 / subfolder 3':
                        return false;
                        break;
                    case 'Local Disk (D:)':
                        return false;
                        break;
                    case 'Local Disk (D:) / subfolder 2':
                        return false;
                        break;
                    case 'Local Disk (D:) / subfolder 2 / subfolder 3':
                        return false;
                        break;
                    case 'Local Disk (E:)':
                        return false;
                        break;
                    case 'Local Disk (E:) / subfolder 2':
                        return false;
                        break;
                    case 'Local Disk (E:) / subfolder 2 / subfolder 3':
                        return false;
                        break;
                    case 'Desktop / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Desktop / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Documents / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Documents / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Documents / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Downloads / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Downloads / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Downloads / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Music / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Music / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Music / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Pictures / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Pictures / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Pictures / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Videos / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Videos / test1.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Videos / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (C:) / subfolder 2 / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (C:) / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (C:) / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (D:) / subfolder 2 / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (D:) / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (D:) / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (E:) / subfolder 2 / test1.txt':
                        fileUrl = "test1.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (E:) / test2.txt':
                        fileUrl = "test2.txt";
                        shoFile(fileUrl);
                        break;
                    case 'Local Disk (E:) / test3.txt':
                        fileUrl = "test3.txt";
                        shoFile(fileUrl);
                        break;
                    default:
//                        fileUrl = "test1.txt";
//                        shoFile(fileUrl);
                }
            },
            data:
                    [
                        {id: "f1", name: "Desktop", items:
                                    [
                                        {id: "f11", name: "Test"},
                                        {id: "f12", name: "test1.txt"},
                                        {id: "f13", name: "test2.txt"}
                                    ]
                        },
                        {id: "f2", name: "Documents", items:
                                    [
                                        {id: "f13", name: "test1.txt"},
                                        {id: "f14", name: "test2.txt"},
                                        {id: "f15", name: "test3.txt"}
                                    ]
                        },
                        {id: "f3", name: "Downloads", items:
                                    [
                                        {id: "f16", name: "test1.txt"},
                                        {id: "f17", name: "test2.txt"},
                                        {id: "f18", name: "test3.txt"}
                                    ]
                        },
                        {id: "f4", name: "Music", items:
                                    [
                                        {id: "f19", name: "test1.txt"},
                                        {id: "f20", name: "test2.txt"},
                                        {id: "f23", name: "test3.txt"}
                                    ]
                        },
                        {id: "f5", name: "Pictures", items:
                                    [
                                        {id: "f21", name: "test1.txt"},
                                        {id: "f22", name: "test2.txt"},
                                        {id: "f23", name: "test3.txt"}
                                    ]
                        },
                        {id: "f6", name: "Videos", items:
                                    [
                                        {id: "f24", name: "test1.txt"},
                                        {id: "f25", name: "test2.txt"},
                                        {id: "f26", name: "test3.txt"}
                                    ]
                        },
                        {id: "f7", name: "Local Disk (C:)", items:
                                    [
                                        {id: "f27", name: "subfolder 2", items:
                                                    [
                                                        {id: "f311", name: "subfolder 3"},
                                                        {id: "f312", name: "test1.txt"}
                                                    ]
                                        },
                                        {id: "f28", name: "test2.txt"},
                                        {id: "f33", name: "test3.txt"}
                                    ]
                        },
                        {id: "f8", name: "Local Disk (D:)", items:
                                    [
                                        {id: "f29", name: "subfolder 2", items:
                                                    [
                                                        {id: "f313", name: "subfolder 3"},
                                                        {id: "f314", name: "test1.txt"}
                                                    ]
                                        },
                                        {id: "f30", name: "test2.txt"},
                                        {id: "f31", name: "test3.txt"}
                                    ]
                        },
                        {id: "f9", name: "Local Disk (E:)", items:
                                    [
                                        {id: "f32", name: "subfolder 2", items:
                                                    [
                                                        {id: "f315", name: "subfolder 3"},
                                                        {id: "f316", name: "test1.txt"}
                                                    ]
                                        },
                                        {id: "f33", name: "test2.txt"},
                                        {id: "f34", name: "test3.txt"}
                                    ]
                        }
                    ]

        });
    }

    /*--  On Shown Add Document Modal  --*/
    $('#addDocumentModal').on('shown.bs.modal', function () {
        var availableTags = [
            "Machine 1",
            "Machine 2",
            "Machine 3",
            "Machine 4",
            "Machine 5",
            "Machine 6",
            "Machine 7",
            "Machine 8",
            "Machine 9",
            "Machine 10"
        ];

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
                selectedMachineData = ui.item.value;
            }
        });
    });

    /*--  On Hidden Add Document Modal  --*/
    $('#addDocumentModal').on('hidden.bs.modal', function () {

        $('#tags').tagsinput('removeAll');

        if ($("#searchbox").val() !== "") {
            $(".add-documents-table tbody").append('<tr>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedMachineData + '</span>' +
                    '</td>' +
                    '<td>' +
                    '<input id="folderPath" class="selectpicker destinationpicker"/>' +
                    '</td>' +
                    '</tr>');
            treeView();
            $(".add-documents-table").show();
            $("#searchbox").val("");
        }
        $(".btn-close").click(function () {
            $("#searchbox").val("");
        });
    });

    function  shoFile(url) {
        url = "assets/data/" + url;
        $(".file-wrapper").attr("src", url);
    }
    $(document).on("change", ".destinationpicker", function () {
        $(".file-container-wrapper").show();
    });
});