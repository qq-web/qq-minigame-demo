import { pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "定向分享",
    apiName: "directed sharing"
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

  const tipText = pText(PIXI, {
    content:
      "提示：拉取同玩好友/可能感兴趣的好友列表\n无需跳出，在小游戏内完成分享流程",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: underline.height + underline.y + 890 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  goBack.callBack = () => {
    callBack({ status: "close" });
  };

  callBack({ status: "directedSharing" }, underline);

  container.addChild(goBack, title, apiName, underline, tipText, logo);

  app.stage.addChild(container);

  return container;
};
