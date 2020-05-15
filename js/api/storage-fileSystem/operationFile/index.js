import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, drawFn } = data;
    switch (status) {
      case "writeFile":
        // 先获取全局唯一的文件管理器，接着调起writeFile方法
        qq.getFileSystemManager().writeFile({
          filePath: `${qq.env.USER_DATA_PATH}/fileA/hello.txt`,
          data: "hello, world", // 写入的内容
          success() {
            qq.showToast({
              title: "写入成功",
              icon: "success",
              duration: 800
            });

            drawFn(); // 更新UI
          },
          fail(res) {
            if (!res.errMsg) return;

            if (res.errMsg.includes("fail no such file or directory")) {
              res.errMsg = `上级目录 ${JSON.stringify(
                `${qq.env.USER_DATA_PATH}/fileA`
              )} 不存在，请去创建目录`;

              qq.showModal({
                content: res.errMsg,
                title: "发生错误"
              });
            }
          }
        });
        break;

      case "readFile":
        // 先获取全局唯一的文件管理器，接着调起readFile方法
        qq.getFileSystemManager().readFile({
          filePath: `${qq.env.USER_DATA_PATH}/fileA/hello.txt`,
          encoding: "utf-8",
          success(res) {
            qq.showModal({
              content: `获取成功返回到内容是 “${res.data}”`,
              title: "读取成功"
            });
          }
        });
        break;

      case "appendFile":
        // 先获取全局唯一的文件管理器，接着调起appendFile方法
        qq.getFileSystemManager().appendFile({
          filePath: `${qq.env.USER_DATA_PATH}/fileA/hello.txt`,
          data: " The Testing API", // 新追加的内容
          success() {
            qq.show.Toast("追加成功", "success", 800);
          }
        });
        break;

      case "copyFile":
        // 先获取全局唯一的文件管理器，接着调起copyFile方法
        qq.getFileSystemManager().copyFile({
          srcPath: `${qq.env.USER_DATA_PATH}/fileA/hello.txt`,
          destPath: `${qq.env.USER_DATA_PATH}/fileA/hello - copy.txt`, // 复制并重新命名文件路径
          success() {
            qq.showToast({
              title: "复制成功",
              icon: "success",
              duration: 800
            });
          }
        });
        break;

      case "unlink":
        // 先获取全局唯一的文件管理器，接着调起unlink方法
        qq.getFileSystemManager().unlink({
          filePath: `${qq.env.USER_DATA_PATH}/fileA/hello.txt`,
          success() {
            qq.showToast({
              title: "删除成功",
              iconL: "success",
              duration: 800
            });

            drawFn(); // 更新UI
          }
        });
        break;
      default:
        break;
    }
  });
};
