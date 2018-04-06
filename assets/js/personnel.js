$(function () {
    $(".ui-widget").dialog({
        autoOpen: false
    });
    $("#row1").on("click", function () {
        $("#popup1").dialog("open");
    });
});