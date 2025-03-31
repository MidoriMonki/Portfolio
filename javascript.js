$(".linkDiv").hover(
    function () {
        $(this).find('.linkOut').addClass('linkIn').removeClass('linkOut');
    },
    function () {
        $(this).find('.linkIn').removeClass('linkIn').addClass('linkOut');
    }
);