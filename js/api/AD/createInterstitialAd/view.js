import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "插屏广告",
    apiName: "createInterstitialAd"
  });
  const showButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
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
    callBack({ status: "show" });
  });
  // 点击展示 “按钮” 结束

  // 初始化 插屏广告组件 开始
  callBack({ status: "createInterstitialAd" });
  // 初始化 插屏广告组件 结束

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

  container.addChild(goBack, title, apiName, underline, showButton, logo);

  app.stage.addChild(container);

  return container;
};
