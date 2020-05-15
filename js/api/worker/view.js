import {
  pText,
  pLine,
  pBox,
  pCircle,
  pButton,
  pGoBackBtn
} from "../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const background = pBox(PIXI, {
    width: obj.width,
    height: obj.height,
    background: { color: 0x000000 }
  });
  const goBack = pGoBackBtn(PIXI, "navigateBack:0xffffff", () => {
    app.ticker.remove(delta);
  });
  const title = pText(PIXI, {
    content: "多线程",
    fontSize: 34 * PIXI.ratio,
    fill: 0xffffff,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "Worker",
    fontSize: 32 * PIXI.ratio,
    fill: 0xffffff,
    y: title.height + title.y + 69 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xffffff
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 24 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const box = pBox(PIXI, {
    width: 686 * PIXI.ratio,
    height: 178 * PIXI.ratio,
    radius: 12 * PIXI.ratio,
    y: obj.height - 342 * PIXI.ratio
  });
  let fabonacciIndex = 35;
  const fabonacciText = pText(PIXI, {
    content: `计算斐波拉契数列第${fabonacciIndex}位数值`,
    fontSize: 28 * PIXI.ratio,
    fill: 0x333333,
    x: 20 * PIXI.ratio,
    y: box.height - 54 * PIXI.ratio
  });

  // 滑动调节1~42的斐波拉契数列的下标 开始
  const transparentLine = pBox(PIXI, {
    width: 628 * PIXI.ratio,
    height: 6 * PIXI.ratio,
    radius: 1 * PIXI.ratio,
    background: { alpha: 0 },
    y: box.y - 105 * PIXI.ratio
  });
  const whiteLine = pBox(PIXI, {
    width: fabonacciIndex * (transparentLine.width / 42),
    height: transparentLine.height,
    radius: 2 * PIXI.ratio,
    x: transparentLine.x,
    y: transparentLine.y
  });
  const circle = pCircle(PIXI, {
    radius: 22 * PIXI.ratio,
    background: { color: 0xffffff },
    x: whiteLine.x + whiteLine.width,
    y: whiteLine.y + whiteLine.height / 2
  });

  circle.onTouchMoveFn(e => {
    if (
      e.data.global.x >= transparentLine.x &&
      transparentLine.x + transparentLine.width >= e.data.global.x
    ) {
      circle.setPositionFn({ x: e.data.global.x });
      whiteLine.width = e.data.global.x - whiteLine.x;
      fabonacciIndex =
        1 + Math.round(41 * (whiteLine.width / transparentLine.width));
      fabonacciText.turnText(`计算斐波拉契数列第${fabonacciIndex}个数的值`);
    }
  });
  // 滑动调节1~42的斐波拉契数列的下标 结束

  box.addChild(
    pText(PIXI, {
      content:
        "提示: 使用单线程进行计算时，动画会出现明显的\n卡顿现象。使用 Worker 线程进行计算，则可以保\n证动画的流畅。",
      fontSize: 28 * PIXI.ratio,
      fill: 0x878b99,
      y: 16 * PIXI.ratio,
      relative_middle: { containerWidth: box.width }
    }),
    fabonacciText
  );

  // 单线程“按钮” 开始
  const singleThreadedButton = pButton(PIXI, {
    width: 336 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    fill: 0xebedf5,
    color: 0xffffff,
    x: 32 * PIXI.ratio,
    y: obj.height - (90 + 45) * PIXI.ratio
  });
  singleThreadedButton.addChild(
    pText(PIXI, {
      content: "单线程计算",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081e,
      relative_middle: {
        containerWidth: singleThreadedButton.width,
        containerHeight: singleThreadedButton.height
      }
    })
  );
  singleThreadedButton.onClickFn(() => {
    callBack({
      status: "noWorker",
      fabonacciIndex
    });
  });
  // 单线程“按钮” 结束

  box.addChild(
    pText(PIXI, {
      content: "1",
      fontSize: 28 * PIXI.ratio,
      fill: 0xffffff,
      y: -83 * PIXI.ratio,
      relative_middle: { point: transparentLine.x - box.x }
    }),
    pText(PIXI, {
      content: "42",
      fontSize: 28 * PIXI.ratio,
      fill: 0xffffff,
      y: -83 * PIXI.ratio,
      relative_middle: {
        point: transparentLine.x + transparentLine.width - box.x
      }
    })
  );

  // Worker“按钮” 开始
  const workerButton = pButton(PIXI, {
    width: singleThreadedButton.width,
    height: singleThreadedButton.height,
    x: obj.width - singleThreadedButton.width - 32 * PIXI.ratio,
    y: singleThreadedButton.y
  });
  workerButton.addChild(
    pText(PIXI, {
      content: "利用 Worker 线程计算",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: workerButton.width,
        containerHeight: workerButton.height
      }
    })
  );
  workerButton.onClickFn(() => {
    console.log(0);
    callBack({
      status: "Worker",
      fabonacciIndex
    });
  });
  // Worker“按钮” 结束

  let cameraZ = 0;
  let speed = 0;
  let warpSpeed = 0;
  let time = 0;
  const starAmount = 1000;
  const fov = 20;
  const baseSpeed = 0.025;
  const starStretch = 5;
  const starBaseSize = 0.05;

  // Create the stars
  const stars = [];
  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new PIXI.Sprite(PIXI.loader.resources["images/star.png"].texture),
      z: 0,
      x: 0,
      y: 0
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    background.addChild(star.sprite);
    stars.push(star);
  }

  function randomizeStar(star, initial) {
    star.z = initial
      ? Math.random() * 2000
      : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
  }

  // Listen for animate update
  function delta(d) {
    // Change flight speed every 350 delta
    time += d;
    if (time >= 300) {
      warpSpeed = warpSpeed > 0 ? 0 : 1;
      time = 0;
    }

    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += d * 20 * (speed + baseSpeed) * (warpSpeed || 10);
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < cameraZ) randomizeStar(star);

      // Map star 3d position to 2d with really simple projection
      const z = star.z - cameraZ;
      star.sprite.x =
        star.x * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.width / 2;
      star.sprite.y =
        star.y * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.height / 2;

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
      const distanceCenter = Math.sqrt(
        dxCenter * dxCenter + dyCenter + dyCenter
      );
      const distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      // Star is looking towards center so that y axis is towards center.
      // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
      star.sprite.scale.y =
        distanceScale * starBaseSize +
        (distanceScale * speed * starStretch * distanceCenter) /
          app.renderer.screen.width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  }

  app.ticker.add(delta);

  window.router.getNowPage(page => {
    page.reload = function() {
      app.ticker.add(delta);
    };
  });

  container.interactive = true;
  container.touchend = () => {
    circle.touchmove = null;
  };
  container.addChild(
    background,
    goBack,
    title,
    apiName,
    underline,
    transparentLine,
    whiteLine,
    circle,
    box,
    singleThreadedButton,
    workerButton
  );
  app.stage.addChild(container);

  return container;
};
