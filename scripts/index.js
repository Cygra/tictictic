$(document).ready(function () {
  var ANIM_DURATION = 1500;

  var $secondHand = $($(".second-hand")[0]);
  var $minuteHand = $($(".minute-hand")[0]);
  var $hourHand = $($(".hour-hand")[0]);

  var current = new Date();
  var second = current.getSeconds();
  var minute = current.getMinutes();
  var hour = current.getHours();
  var secondOffset = second + ANIM_DURATION / 1000;

  var secondHandInitPos = secondOffset * 6;
  var minuteHandInitPos = minute * 6 + secondOffset / 10;
  var hourHandInitPos = (hour % 12) * 30 + minute / 2 + secondOffset / 120;

  var animate = function (finalPosition, $elem) {
    $({ deg: 0 }).animate(
      { deg: finalPosition },
      {
        duration: ANIM_DURATION,
        step: function (now) {
          $elem.css({ transform: "rotate(" + now + "deg)" });
        },
      }
    );
  };

  animate(secondHandInitPos, $secondHand);
  animate(minuteHandInitPos, $minuteHand);
  animate(hourHandInitPos, $hourHand);

  setTimeout(function () {
    setInterval(function () {
      secondHandInitPos += 1.2;
      $secondHand.css({ transform: "rotate(" + secondHandInitPos + "deg)" });
    }, 200);

    setInterval(function () {
      minuteHandInitPos += 0.05;
      $minuteHand.css({ transform: "rotate(" + minuteHandInitPos + "deg)" });
    }, 500);

    setInterval(function () {
      hourHandInitPos += 0.01;
      $hourHand.css({ transform: "rotate(" + hourHandInitPos + "deg)" });
    }, 1200);
  }, ANIM_DURATION);
});
