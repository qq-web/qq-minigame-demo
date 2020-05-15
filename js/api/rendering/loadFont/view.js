import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "加载自定义字体文件",
    apiName: "loadFont"
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
    height: 292 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "Hello 小游戏",
    fontSize: 62 * PIXI.ratio,
    fill: 0x03081a,
    relative_middle: {
      containerWidth: box.width,
      containerHeight: box.height
    }
  });
  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: box.height + box.y + 40 * PIXI.ratio
  });

  // 加载自定义字体文件 “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `加载自定义字体文件`,
      fontSize: 33 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    callBack({
      status: "loadFont",
      drawFn(font) {
        text.turnText("", { fontFamily: font || "" });
      }
    });
  });
  // 加载自定义字体文件 “按钮” 结束

  box.addChild(text);
  container.addChild(goBack, title, apiName, underline, box, button, logo);

  app.stage.addChild(container);

  return container;
};
