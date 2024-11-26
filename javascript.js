$(".linkDiv").hover(
    function () {
        $(this).find('.linkDrop').removeClass('linkOut').addClass('linkIn');
    },
    function () {
        $(this).find('.linkDrop').removeClass('linkIn');
    }
);