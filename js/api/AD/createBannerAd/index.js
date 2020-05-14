import view from "./view";
import * as show from "../../../libs/show";

module.exports = function(PIXI, app, obj) {
  let bannerAd;
  return view(PIXI, app, obj, data => {
    const { status, style, drawFn } = data;
    switch (status) {
      case "createBannerAd":
        // 创建 banner 广告组件;
        bannerAd = qq.createBannerAd({
          adUnitId: "b8d0840fb7e38e8399e49c98e8d0a94e",
          testDemoType: 193,
          style: {
            left: style.left,
            top: style.top,
            width: style.width
          }
        });

        qq.showLoading({ title: "广告打开中...", mask: true });

        // 监听 banner 广告加载事件。
        bannerAd.onLoad(() => {
          qq.hideLoading();
          // 需要主动调用show函数banner 广告才会显示
          bannerAd.show();
          drawFn(); // 更新UI
        });

        // 监听 banner 广告错误事件。
        bannerAd.onError(res => {
          qq.hideLoading();

          show.Modal(res.errMsg, "发生错误");

          drawFn(res); // 更新UI
        });
        break;
      case "hide":
        // 隐藏 banner 广告
        bannerAd.hide();
        drawFn(); // 更新UI
        break;
      case "show":
        // 显示 banner 广告
        bannerAd.show();
        drawFn(); // 更新UI
        break;
      case "destroy":
        bannerAd.destroy();
        break;
      default:
        break;
    }
  });
};
