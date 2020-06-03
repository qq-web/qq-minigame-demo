import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "unzip":
        // 先获取全局唯一的文件管理器，接着调起unzip方法
        qq.getFileSystemManager().unzip({
          zipFilePath: "test.zip", // 压缩包在代码包的根路径上面
          targetPath: `${qq.env.USER_DATA_PATH}/fileA`,
          success() {
            qq.showToast({
              title: "解压成功",
              icon: "success",
              duration: 800
            });
          },
          fail(e) {
            qq.showModal({
              title: "解压失败",
              content: e
            });
            console.log(e);
          }
        });
        break;
      default:
        break;
    }
  });
};
