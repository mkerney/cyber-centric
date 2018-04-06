$(document).ready(function () {   
    /*-- On Click Toggle Aside Wrapper --*/
    $(document).on("click", ".toggle-aside", function () {
        $(".aside-wrapper").toggleClass("aside-open-wrapper");
        $(".right-contents-wrapper").toggleClass("open");
    });
});

