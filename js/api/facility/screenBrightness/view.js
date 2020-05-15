import { pCircle, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "屏幕亮度",
    apiName: "get/set/ScreenBrightness"
  });
  const bottomBg = new PIXI.Graphics();
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const div = pBox(PIXI, {
    height: 488 * PIXI.ratio,
    background: { color: 0xffffff },
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "",
    fontSize: 80 * PIXI.ratio,
    y: 188 * PIXI.ratio,
    relative_middle: { containerWidth: div.width }
  });

  div.addChild(
    pText(PIXI, {
      content: "当前屏幕亮度",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081e,
      y: 40 * PIXI.ratio,
      relative_middle: { containerWidth: div.width }
    }),
    text
  );

  const controlTips = pText(PIXI, {
    content: "设置屏幕亮度",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: div.y + div.height + 32 * PIXI.ratio
  });

  // 滑动调节亮度UI 开始
  const grayLine = pBox(PIXI, {
    width: 628 * PIXI.ratio,
    height: 4 * PIXI.ratio,
    radius: 2 * PIXI.ratio,
    background: { color: 0xe4e7e4 },
    y: div.y + div.height + 115 * PIXI.ratio
  });
  const greenLine = pBox(PIXI, {
    width: grayLine.width,
    height: grayLine.height,
    radius: 2 * PIXI.ratio,
    background: { color: 0x00cafc },
    y: grayLine.y
  });
  const circle = pCircle(PIXI, {
    radius: 20 * PIXI.ratio,
    background: { color: 0xffffff },
    x: greenLine.x,
    y: greenLine.y + greenLine.height / 2
  });
  greenLine.width = 0;
  circle.onTouchMoveFn(e => {
    if (
      e.data.global.x >= grayLine.x &&
      grayLine.x + grayLine.width >= e.data.global.x
    ) {
      circle.setPositionFn({ x: e.data.global.x });
      greenLine.width = e.data.global.x - greenLine.x;
      text.turnText(
        `${Math.round((greenLine.width / grayLine.width) * 10) / 10}`
      );
      callBack({
        status: "setScreenBrightness",
        value: +text.text
      });
    }
  });
  // 滑动调节亮度UI 结束

  // 获取屏幕亮度函数调用 开始
  callBack({
    status: "getScreenBrightness",
    drawFn(res) {
      text.turnText(`${Math.round(res.value * 10) / 10}`);
      circle.setPositionFn({
        x: greenLine.x + (greenLine.width = grayLine.width * text.text)
      });
    }
  });
  // 获取屏幕亮度函数调用 结束

  container.addChild(
    pBox(PIXI, { height: obj.height, background: { alpha: 0 } }),
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    div,
    controlTips,
    grayLine,
    greenLine,
    circle,
    logo
  );
  container.interactive = true;
  container.touchend = () => {
    circle.touchmove = null;
  };
  app.stage.addChild(container);

  return container;
};
