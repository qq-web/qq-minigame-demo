import { pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "关系链互动",
    apiName: "relationalChaininteractiveData"
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
      "提示：在赠送/索要/邀请场景可搭配好友列表、\n排行榜使用，跟同玩好友间进行互动",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: underline.height + underline.y + 630 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  goBack.callBack = () => {
    callBack({ status: "close" });
  };

  // 默认上报分数
  qq.setUserCloudStorage({
    KVDataList: [
      {
        key: "score",
        value: JSON.stringify({
          wxgame: {
            score: 0,
            update_time: (Date.now() / 1000) | 0
          }
        })
      }
    ]
  });

  // 由于这里已经callback，在callback中等不到view的return，所以在这里将underline返回，供sharecanvas调整位置。
  callBack({ status: "relationalChaininteractiveData" }, underline);

  container.addChild(goBack, title, apiName, underline, tipText, logo);

  app.stage.addChild(container);

  return container;
};
