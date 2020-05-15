import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, drawFn } = data;
    switch (status) {
      case "getNetworkType":
        qq.getNetworkType({
          success(res) {
            drawFn(res); // 更新UI
          },
          fail() {
            qq.showToast({
              title: "获取失败",
              icon: "success",
              duration: 500
            });
          }
        });
        break;
      default:
        break;
    }
  });
};
