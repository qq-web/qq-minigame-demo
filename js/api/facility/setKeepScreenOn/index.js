import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, keepScreenOn, drawFn } = data;
    switch (status) {
      case "setKeepScreenOn":
        // 设置保持常亮状态。
        qq.setKeepScreenOn({
          keepScreenOn,
          success(res) {
            console.log(res);

            qq.showToast({
              title: `常亮${keepScreenOn ? "已开启" : "已关闭"}`,
              icon: "success",
              duration: 800
            });

            drawFn(res); // 绘制UI
          }
        });
        break;
      default:
        break;
    }
  });
};
