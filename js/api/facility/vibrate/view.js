import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "震动",
    apiName: "vibrate/Long/Short"
  });

  const longButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0x00cafc,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  const shortButton = pButton(PIXI, {
    width: longButton.width,
    height: longButton.height,
    color: 0xebedf5,
    y: longButton.height + longButton.y + 20 * PIXI.ratio
  });

  // 长振动 “按钮” 开始
  longButton.myAddChildFn(
    pText(PIXI, {
      content: `长振动`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
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
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
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
    logo
  );

  app.stage.addChild(container);

  return container;
};
