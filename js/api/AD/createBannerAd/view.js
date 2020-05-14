import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "banner 广告",
    apiName: "createBannerAd"
  });
  const bannerAdButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });

  const styleText1 = pText(PIXI, {
    content: "样式193",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    // align: "center",
    lineHeight: 28 * PIXI.ratio,
    x: 32 * PIXI.ratio,
    y: underline.height + underline.y + 32 * PIXI.ratio
    // relative_middle: { containerWidth: obj.width }
  });
  styleText1.hideFn();

  const hideButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
    alpha: 0,
    y: underline.height + underline.y + 890 * PIXI.ratio
  });
  const showButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
    alpha: 0,
    y: hideButton.y
  });

  // 点击展示 “按钮” 开始
  bannerAdButton.myAddChildFn(
    pText(PIXI, {
      content: `点击展示`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: bannerAdButton.width,
        containerHeight: bannerAdButton.height
      }
    })
  );
  bannerAdButton.onClickFn(() => {
    bannerAdButton.hideFn();
    callBack({
      status: "createBannerAd",
      style: {
        top:
          (underline.y + underline.height + 76 * PIXI.ratio) / obj.pixelRatio,
        left: (23 * obj.width) / (750 * obj.pixelRatio),
        width: (704 * obj.width) / (750 * obj.pixelRatio)
      },
      drawFn(res) {
        if (res) return bannerAdButton.showFn();
        styleText1.showFn();
        hideButton.showFn();
        // destroyButton.showFn();
      }
    });
  });
  // 点击展示 “按钮” 结束

  // 隐藏 banner 广告 “按钮” 开始
  hideButton.myAddChildFn(
    pText(PIXI, {
      content: `隐藏 banner 广告`,
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: hideButton.width,
        containerHeight: hideButton.height
      }
    })
  );
  hideButton.onClickFn(() => {
    callBack({
      status: "hide",
      drawFn() {
        hideButton.hideFn();
        showButton.showFn();
      }
    });
  });
  hideButton.hideFn();
  // 隐藏 banner 广告 “按钮” 结束

  // 显示 banner 广告 “按钮” 开始
  showButton.myAddChildFn(
    pText(PIXI, {
      content: `显示 banner 广告`,
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: showButton.width,
        containerHeight: showButton.height
      }
    })
  );
  showButton.onClickFn(() => {
    callBack({
      status: "show",
      drawFn() {
        showButton.hideFn();
        hideButton.showFn();
      }
    });
  });
  showButton.hideFn();
  // 显示 banner 广告 “按钮” 结束

  goBack.callBack = callBack.bind(null, { status: "destroy" });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bannerAdButton,
    hideButton,
    showButton,
    styleText1,
    // destroyButton,
    logo
  );

  app.stage.addChild(container);

  return container;
};
