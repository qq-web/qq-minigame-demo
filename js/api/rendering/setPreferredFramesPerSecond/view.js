import { pBox, pCircle, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "渲染帧率",
    apiName: "setPreferredFramesPerSecond"
  });
  const bottomBg = new PIXI.Graphics();
  container.addChild(bottomBg);
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const box = pBox(PIXI, {
    height: 392 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const fpsText = pText(PIXI, {
    content: "当前帧率：60fps",
    fontSize: 28 * PIXI.ratio,
    fill: 0x03081a,
    y: 295 * PIXI.ratio,
    relative_middle: { containerWidth: box.width }
  });

  // 当前帧率
  let CurveFPS = 60;

  // 绘制三角形 start
  const circumscribedRadius =
    (((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6)) /
    (4 * (box.width / 4) * (Math.sqrt(3) * (box.width / 12)));

  const trilateral = new PIXI.Graphics();
  trilateral
    .beginFill(0x00cafc)
    .drawPolygon([
      -(Math.sqrt(3) * (box.width / 12)),
      box.width / 4 - circumscribedRadius,
      Math.sqrt(3) * (box.width / 12),
      box.width / 4 - circumscribedRadius,
      0,
      -circumscribedRadius
    ])
    .endFill();
  trilateral.position.set(box.width / 2, box.height / 2.5);
  trilateral.scale.set(0.9, 0.9);
  const rotatingFn = (() => {
    let angle = 0;
    return () => {
      angle > 360 && (angle -= 360);
      angle += 90 / CurveFPS;
      trilateral.rotation = (angle * Math.PI) / 180;
    };
  })();
  app.ticker.add(rotatingFn);
  // 绘制三角形 end

  goBack.callBack = () => {
    app.ticker.remove(rotatingFn);
    callBack({
      status: "setPreferredFramesPerSecond",
      value: 60
    });
  };

  box.addChild(trilateral, fpsText);
  const setTips = pText(PIXI, {
    content: "设置渲染帧率",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: box.y + box.height + 32 * PIXI.ratio
  });
  // 滑动调节FPS 开始
  const grayLine = pBox(PIXI, {
    width: 628 * PIXI.ratio,
    height: 6 * PIXI.ratio,
    radius: 2 * PIXI.ratio,
    background: { color: 0xb5b6b5 },
    y: box.y + box.height + 115 * PIXI.ratio
  });
  const greenLine = pBox(PIXI, {
    width: grayLine.width,
    height: grayLine.height,
    radius: 2 * PIXI.ratio,
    background: { color: 0x00c4f5 },
    y: grayLine.y
  });
  const circle = pCircle(PIXI, {
    radius: 22 * PIXI.ratio,
    background: { color: 0xffffff },
    x: greenLine.x + greenLine.width,
    y: greenLine.y + greenLine.height / 2
  });
  circle.onTouchMoveFn(e => {
    if (
      e.data.global.x >= grayLine.x &&
      grayLine.x + grayLine.width >= e.data.global.x
    ) {
      circle.setPositionFn({ x: e.data.global.x });
      greenLine.width = e.data.global.x - greenLine.x;
      CurveFPS = 1 + Math.round(59 * (greenLine.width / grayLine.width));
      callBack({
        status: "setPreferredFramesPerSecond",
        value: CurveFPS
      });
      fpsText.turnText(`当前帧率：${CurveFPS}fps`);
    }
  });
  // 滑动调节FPS 结束

  container.addChild(
    pBox(PIXI, { height: obj.height, background: { alpha: 0 } }),
    goBack,
    title,
    apiName,
    underline,
    box,
    setTips,
    grayLine,
    greenLine,
    circle,
    pText(PIXI, {
      content: "1",
      fontSize: 28 * PIXI.ratio,
      y: grayLine.y + grayLine.height + 20 * PIXI.ratio,
      relative_middle: { point: grayLine.x }
    }),
    pText(PIXI, {
      content: "60",
      fontSize: 28 * PIXI.ratio,
      y: grayLine.y + grayLine.height + 20 * PIXI.ratio,
      relative_middle: { point: grayLine.x + grayLine.width }
    }),
    logo
  );
  container.interactive = true;
  container.touchend = () => {
    circle.touchmove = null;
  };

  app.stage.addChild(container);

  return container;
};
