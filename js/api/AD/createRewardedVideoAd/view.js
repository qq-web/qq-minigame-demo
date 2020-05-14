import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "激励视频广告",
    apiName: "createRewardedVideoAd"
  });
  const showButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  const tipText = pText(PIXI, {
    content: "视频素材兼容横/竖屏形态，每次展示以系统下发为准",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 28 * PIXI.ratio,
    y: showButton.height + showButton.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  // 点击展示 “按钮” 开始
  showButton.myAddChildFn(
    pText(PIXI, {
      content: `点击展示`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: showButton.width,
        containerHeight: showButton.height
      }
    })
  );
  showButton.onClickFn(() => {
    showButton.isTouchable(false);
    callBack({
      status: "show",
      drawFn: showButton.isTouchable.bind(null, true)
    });
  });
  // 点击展示 “按钮” 结束

  // 初始化 激励视频广告组件 开始
  callBack({ status: "createRewardedVideoAd" });
  // 初始化 激励视频广告组件 结束

  goBack.callBack = () => {
    callBack({
      status: "destroy",
      drawFn() {
        // window.router.getNowPage(page => {
        //   if (!page.reload)
        //     page.reload = function() {
        //       logo.turnImg({ src: "images/logo.png" });
        //     };
        // });
      }
    });
  };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    showButton,
    tipText,
    logo
  );

  app.stage.addChild(container);

  return container;
};
