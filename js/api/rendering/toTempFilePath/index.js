import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status, deploy } = res;
    switch (status) {
      case "toTempFilePath":
        // 将当前 Canvas 保存为一个临时文件
        canvas.toTempFilePath({
          ...deploy,
          success(response) {
            qq.shareAppMessage({
              title: "这是已截好的图",
              imageUrl: response.tempFilePath
            });
            console.log(response);
          }
        });

        break;
      default:
        break;
    }
  });
};
