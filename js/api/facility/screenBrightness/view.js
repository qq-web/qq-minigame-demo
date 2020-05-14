import {
  pText,
  pLine,
  pBox,
  pCircle,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "屏幕亮度",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "get/set/ScreenBrightness",
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const div = pBox(PIXI, {
    height: 474.4 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "",
    fontSize: 72 * PIXI.ratio,
    y: 225 * PIXI.ratio,
    relative_middle: { containerWidth: div.width }
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
  });

  div.addChild(
    pText(PIXI, {
      content: "当前屏幕亮度",
      fontSize: 34 * PIXI.ratio,
      y: 54 * PIXI.ratio,
      relative_middle: { containerWidth: div.width }
    }),
    text,
    pText(PIXI, {
      content: "设置屏幕亮度",
      fontSize: 28 * PIXI.ratio,
      fill: 0x9f9f9f,
      x: 46 * PIXI.ratio,
      y: div.height + 36.6 * PIXI.ratio
    })
  );

  // 滑动调节亮度UI 开始
  const grayLine = pBox(PIXI, {
    width: 580 * PIXI.ratio,
    height: 4 * PIXI.ratio,
    radius: 2 * PIXI.ratio,
    background: { color: 0xb5b6b5 },
    y: div.y + div.height + 49 * PIXI.ratio
  });
  const greenLine = pBox(PIXI, {
    width: grayLine.width,
    height: grayLine.height,
    radius: 2 * PIXI.ratio,
    background: { color: 0x09bb07 },
    y: grayLine.y
  });
  const circle = pCircle(PIXI, {
    radius: 20 * PIXI.ratio,
    background: { color: 0x09bb07 },
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
    div,
    grayLine,
    greenLine,
    circle,
    logo,
    logoName
  );
  container.interactive = true;
  container.touchend = () => {
    circle.touchmove = null;
  };
  app.stage.addChild(container);

  return container;
};
