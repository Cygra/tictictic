$(document).ready(function () {
  var $secondHand = $($(".second-hand")[0]);
  var $minuteHand = $($(".minute-hand")[0]);
  var $hourHand = $($(".hour-hand")[0]);

  var current = new Date();
  var second = current.getSeconds();
  var minute = current.getMinutes();
  var hour = current.getHours();

  var secondHandInitPosition = -90 + second * 6;
  var minuteHandInitPosition = -90 + minute * 6 + second / 10;
  var hourHandInitPosition = -90 + (hour % 12) * 30 + minute / 2 + second / 120;

  $secondHand.css({ transform: "rotate(" + secondHandInitPosition + "deg)" });
  $minuteHand.css({ transform: "rotate(" + minuteHandInitPosition + "deg)" });
  $hourHand.css({ transform: "rotate(" + hourHandInitPosition + "deg)" });

  setInterval(function () {
    secondHandInitPosition += 1.2;
    $secondHand.css({ transform: "rotate(" + secondHandInitPosition + "deg)" });
  }, 200);

  setInterval(function () {
    minuteHandInitPosition += 0.05;
    $minuteHand.css({ transform: "rotate(" + minuteHandInitPosition + "deg)" });
  }, 500);

  setInterval(function () {
    hourHandInitPosition += 0.01;
    $hourHand.css({ transform: "rotate(" + hourHandInitPosition + "deg)" });
  }, 1200);
});
