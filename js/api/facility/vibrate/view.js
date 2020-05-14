import {
  pText,
  pLine,
  pImg,
  pButton,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "震动",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "vibrate/Long/Short",
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
  const longButton = pButton(PIXI, {
    width: 334 * PIXI.ratio,
    height: 80 * PIXI.ratio,
    color: 0x05c25f,
    y: underline.height + underline.y + 123 * PIXI.ratio
  });
  const shortButton = pButton(PIXI, {
    width: longButton.width,
    height: longButton.height,
    color: 0xf2f2f2,
    y: longButton.height + longButton.y + 20 * PIXI.ratio
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

  // 长振动 “按钮” 开始
  longButton.myAddChildFn(
    pText(PIXI, {
      content: `长振动`,
      fontSize: 30 * PIXI.ratio,
      fill: 0xffffff,
      fontWeight: "bold",
      relative_middle: {
        containerWidth: longButton.width,
        containerHeight: longButton.height
      }
    })
  );
  longButton.onClickFn(() => {
    callBack({
      status: "vibrateLong"
    });
  });
  // 长振动 “按钮” 结束

  // 短振动 “按钮” 开始
  shortButton.myAddChildFn(
    pText(PIXI, {
      content: `短振动`,
      fontSize: 30 * PIXI.ratio,
      fill: 0x05c25f,
      fontWeight: "bold",
      relative_middle: {
        containerWidth: shortButton.width,
        containerHeight: shortButton.height
      }
    })
  );
  shortButton.onClickFn(() => {
    callBack({
      status: "vibrateShort"
    });
  });
  // 短振动 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    longButton,
    shortButton,
    logo,
    logoName
  );

  app.stage.addChild(container);

  return container;
};
