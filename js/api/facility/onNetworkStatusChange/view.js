import { pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "监听手机网络变化",
    apiName: "onNetworkStatusChange"
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
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const networkStateText = pText(PIXI, {
    content: "",
    fontSize: 60 * PIXI.ratio,
    align: "center",
    y: 220 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  div.addChild(
    pText(PIXI, {
      content: "网络状态",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      y: 40 * PIXI.ratio,
      relative_middle: { containerWidth: div.width }
    }),
    networkStateText
  );

  callBack({
    status: "onNetworkStatusChange",
    drawFn(res) {
      networkStateText.turnText(
        {
          wifi: "wifi",
          "2g": "2g",
          "3g": "3g",
          "4g": "4g",
          unknown: "不常见的未知网络",
          none: "无网络"
        }[res.networkType]
      );
    }
  });

  container.addChild(bottomBg, goBack, title, apiName, underline, div, logo);
  app.stage.addChild(container);

  return container;
};
