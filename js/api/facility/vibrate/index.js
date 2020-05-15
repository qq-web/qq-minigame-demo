import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status } = res;
    switch (status) {
      case "vibrateLong":
        // 使手机发生较长时间的振动（400 ms)
        qq.vibrateLong();
        break;
      case "vibrateShort":
        // 使手机发生较短时间的振动（15 ms）
        qq.vibrateShort();
        break;
      default:
        break;
    }
  });
};
