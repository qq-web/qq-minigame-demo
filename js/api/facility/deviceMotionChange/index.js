import view from "./view";

module.exports = function(PIXI, app, obj) {
  let monitorFunc;
  return view(PIXI, app, obj, data => {
    const { status, drawFn } = data;
    switch (status) {
      case "onDeviceMotionChange":
        // 开启获取设备方向的变化
        qq.startDeviceMotionListening({ interval: "game" });

        if (monitorFunc) return;

        // 监听设备方向变化事件。
        qq.onDeviceMotionChange(
          (monitorFunc = res => {
            drawFn(res); // 绘制UI
          })
        );
        break;
      case "offDeviceMotionChange":
        // 停止获取设备方向的变化
        qq.stopDeviceMotionListening({ interval: "game" });

        // 取消监听设备方向变化事件。
        if (monitorFunc && qq.offDeviceMotionChange) {
          qq.offDeviceMotionChange(monitorFunc);
          monitorFunc = null;
        }
        break;
      default:
        break;
    }
  });
};
