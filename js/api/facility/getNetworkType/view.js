import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "获取手机网络状态",
    apiName: "getNetworkType"
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
  const prompt = pText(PIXI, {
    content: "未获取\n点击蓝色按钮可获取网络状态",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: 202 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
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
    prompt,
    networkStateText
  );

  const getNetworkTypeBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    y: underline.y + underline.height + 608 * PIXI.ratio,
    radius: 5 * PIXI.ratio
  });
  getNetworkTypeBtn.myAddChildFn(
    pText(PIXI, {
      content: "获取手机网络状态",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getNetworkTypeBtn.width,
        containerHeight: getNetworkTypeBtn.height
      }
    })
  );
  getNetworkTypeBtn.onClickFn(() => {
    callBack({
      status: "getNetworkType",
      drawFn(res) {
        prompt.visible = false;
        networkStateText.visible = true;
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
  });

  // 清空“按钮”开始
  const wipeData = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: getNetworkTypeBtn.y + getNetworkTypeBtn.height + 20 * PIXI.ratio,
    radius: 5 * PIXI.ratio
  });
  wipeData.myAddChildFn(
    pText(PIXI, {
      content: "清空",
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: wipeData.width,
        containerHeight: wipeData.height
      }
    })
  );
  wipeData.onClickFn(() => {
    if (prompt.visible) return;
    prompt.visible = true;
    networkStateText.visible = false;
  });
  // 清空“按钮”结束

  container.addChild(
    bottomBg,
    goBack,
    title,
    apiName,
    underline,
    div,
    getNetworkTypeBtn,
    wipeData,
    logo
  );
  app.stage.addChild(container);

  return container;
};
