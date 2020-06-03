import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, pathArr, drawFn } = data;
    switch (status) {
      case "rename":
        // 先获取全局唯一的文件管理器，接着调起rename方法
        qq.getFileSystemManager().rename({
          oldPath: pathArr[0],
          newPath: pathArr[1],
          success() {
            qq.showToast({
              title: "重命名成功",
              icon: "success",
              duration: 800
            });

            drawFn(); // 更新UI
          },
          fail(res) {
            console.log(res);
            if (!res.errMsg) return;

            if (res.errMsg.includes("no such file or directory")) {
              res.errMsg = `源文件，或目录 ${JSON.stringify(
                `${qq.env.USER_DATA_PATH}/fileA`
              )} 不存在，请去创建`;
            }
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
