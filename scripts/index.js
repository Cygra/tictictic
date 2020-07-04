const ANIM_DURATION = 1500,
  FRAME = 16,
  $secondHand = document.getElementsByClassName("second-hand")[0],
  $minuteHand = document.getElementsByClassName("minute-hand")[0],
  $hourHand = document.getElementsByClassName("hour-hand")[0],
  $body = document.getElementsByTagName("body")[0];

let secondHandInterval, minuteHandInterval, hourHandInterval;

const rotateTo = ($e, deg) => ($e.style.transform = "rotate(" + deg + "deg)");

const animate = (finalPosition, $e) => {
  var currentPostion = 0,
    step = finalPosition / (ANIM_DURATION / FRAME),
    interval = setInterval(() => {
      if ((currentPostion += step) >= finalPosition) {
        rotateTo($e, finalPosition);
        clearInterval(interval);
      } else rotateTo($e, currentPostion);
    }, FRAME);
};

const didMount = () => {
  var current = new Date();
  var second = current.getSeconds();
  var minute = current.getMinutes();
  var hour = current.getHours();
  var secondOffset = second + ANIM_DURATION / 1000;

  if (hour > 18 || hour < 7) $body.setAttribute("class", "dark");

  var secondHandInitPos = secondOffset * 6;
  var minuteHandInitPos = minute * 6 + secondOffset / 10;
  var hourHandInitPos = (hour % 12) * 30 + minute / 2 + secondOffset / 120;

  animate(secondHandInitPos, $secondHand);
  animate(minuteHandInitPos, $minuteHand);
  animate(hourHandInitPos, $hourHand);

  setTimeout(() => {
    secondHandInterval = setInterval(
      () => rotateTo($secondHand, (secondHandInitPos += 1.2)),
      200
    );

    minuteHandInterval = setInterval(
      () => rotateTo($minuteHand, (minuteHandInitPos += 0.05)),
      500
    );

    hourHandInterval = setInterval(
      () => rotateTo($hourHand, (hourHandInitPos += 0.01)),
      1200
    );
  }, ANIM_DURATION);
};

didMount();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearInterval(secondHandInterval);
    clearInterval(minuteHandInterval);
    clearInterval(hourHandInterval);
  } else didMount();
});
