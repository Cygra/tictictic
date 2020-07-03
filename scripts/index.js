const ANIM_DURATION = 1500;
let secondHandInterval, minuteHandInterval, hourHandInterval;

const rotateTo = ($e) => (deg) => {
  $e.css({ transform: "rotate(" + deg + "deg)" });
};

const animate = (finalPosition, $elem) => {
  $({ deg: 0 }).animate(
    { deg: finalPosition },
    { duration: ANIM_DURATION, step: rotateTo($elem) }
  );
};

var didMount = ($secondHand, $minuteHand, $hourHand) => {
  var current = new Date();
  var second = current.getSeconds();
  var minute = current.getMinutes();
  var hour = current.getHours();
  var secondOffset = second + ANIM_DURATION / 1000;

  var secondHandInitPos = secondOffset * 6;
  var minuteHandInitPos = minute * 6 + secondOffset / 10;
  var hourHandInitPos = (hour % 12) * 30 + minute / 2 + secondOffset / 120;

  animate(secondHandInitPos, $secondHand);
  animate(minuteHandInitPos, $minuteHand);
  animate(hourHandInitPos, $hourHand);

  setTimeout(() => {
    secondHandInterval = setInterval(
      () => rotateTo($secondHand)((secondHandInitPos += 1.2)),
      200
    );

    minuteHandInterval = setInterval(
      () => rotateTo($minuteHand)((minuteHandInitPos += 0.05)),
      500
    );

    hourHandInterval = setInterval(
      () => rotateTo($hourHand)((hourHandInitPos += 0.01)),
      1200
    );
  }, ANIM_DURATION);
};

$(document).ready(() => {
  var $secondHand = $($(".second-hand")[0]);
  var $minuteHand = $($(".minute-hand")[0]);
  var $hourHand = $($(".hour-hand")[0]);

  didMount($secondHand, $minuteHand, $hourHand);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      clearInterval(secondHandInterval);
      clearInterval(minuteHandInterval);
      clearInterval(hourHandInterval);
    } else didMount($secondHand, $minuteHand, $hourHand);
  });
});
