var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var mouseX = 0;
var mouseY = 0;
var x = 0;
var y = 0;

function tick() {
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
    myInterval = dt;
    x = x + (mouseX - x) * (dt/200);
    y = y + (mouseY - y) * (dt/200);
    $("#paw").css({
      left: x,
      top: y
    });
}

//current_value = start_float + (end_float - start_float) * (elapsed_time / total_duration) 


$(".linkDiv").hover(
    function () {
        $(this).find('.linkOut').addClass('linkIn').removeClass('linkOut');
    },
    function () {
        $(this).find('.linkIn').removeClass('linkIn').addClass('linkOut');
    }
);

$(document).mousemove(function(e) {
  mouseX = e.pageX-120;
  mouseY = e.pageY+20;
/*
  $("#dot").css({
    left: e.pageX,
    top: e.pageY
  });
*/
});