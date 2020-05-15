import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status, value } = res;
    switch (status) {
      case "setPreferredFramesPerSecond":
        // 设置渲染帧率
        qq.setPreferredFramesPerSecond(value);
        break;
      default:
        break;
    }
  });
};
