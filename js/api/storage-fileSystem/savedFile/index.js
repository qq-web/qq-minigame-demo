import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, paperFile, drawFn } = data;
    switch (status) {
      case "getSavedFileList":
        // 先获取全局唯一的文件管理器，接着调起getSavedFileList方法
        qq.getFileSystemManager().getSavedFileList({
          success(res) {
            if (!(res.fileList || []).length)
              return qq.showModal({ content: "本地缓存文件列表为空" });

            qq.showToast({
              title: "获取成功",
              icon: "success",
              duration: 800
            });

            drawFn(res.fileList); // 更新UI
          }
        });
        break;

      case "removeSavedFile":
        Promise.all(
          paperFile.map(item => {
            return new Promise(res => {
              // 先获取全局唯一的文件管理器，接着调起removeSavedFile方法
              qq.getFileSystemManager().removeSavedFile({
                filePath: item.filePath,
                success() {
                  res();
                }
              });
            });
          })
        )
          .then(() => {
            qq.showToast({
              title: "已清空",
              icon: "success",
              duration: 800
            });

            drawFn(); // 更新UI
          })
          .catch(e => console.log(e));
        break;
      default:
        break;
    }
  });
};
