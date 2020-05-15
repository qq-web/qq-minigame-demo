import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, value, drawFn } = data;
    switch (status) {
      case "setScreenBrightness":
        // 设置屏幕亮度
        qq.setScreenBrightness({ value });
        break;
      case "getScreenBrightness":
        // 获取屏幕亮度
        qq.getScreenBrightness({
          success(res) {
            console.log(res);
            drawFn(res);
          }
        });
        break;
      default:
        break;
    }
  });
};
