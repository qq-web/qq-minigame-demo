import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "getFileInfo":
        // 先获取全局唯一的文件管理器，接着调起getFileInfo方法
        qq.getFileSystemManager().getFileInfo({
          filePath: "images/someImage.png",
          success(res) {
            qq.showModal({
              content: `这个文件的size：${res.size}B`,
              title: "获取成功"
            });
          },
          fail(res) {
            if (!res.errMsg) return;

            qq.showModal({
              content: res.errMsg,
              title: "发生错误"
            });
          }
        });
        break;
      default:
        break;
    }
  });
};
