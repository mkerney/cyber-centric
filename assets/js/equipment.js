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

$(document).ready(function(){
   $(".btn-save").click(function(){
      $(".equipment-wrapper .nav a:first").tab("show");
   }); 
});