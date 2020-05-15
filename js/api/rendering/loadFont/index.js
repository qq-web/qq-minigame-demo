import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status, drawFn } = res;
    let font;
    switch (status) {
      case "loadFont":
        // 加载自定义字体文件
        font = qq.loadFont(`TencentSans-W7.subset.ttf`);
        console.log(`load font: ${font}`);
        drawFn(font); // 更新UI

        break;
      default:
        break;
    }
  });
};
