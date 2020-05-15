import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, drawFn } = data;
    switch (status) {
      case "onDeviceOrientationChange":
        // 监听横竖屏切换事件
        qq.onDeviceOrientationChange(res => {
          console.log(res);

          qq.showToast({
            title: "触发成功",
            icon: "success",
            duration: 800
          });

          drawFn(); // 绘制UI
        });
        break;
      case "offDeviceOrientationChange":
        // 取消监听横竖屏切换事件
        qq.offDeviceOrientationChange();
        break;
      default:
        break;
    }
  });
};
