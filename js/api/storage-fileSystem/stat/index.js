import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, index } = data;
    switch (status) {
      case "stat":
        // 先获取全局唯一的文件管理器，接着调起stat方法
        qq.getFileSystemManager().stat({
          path: [
            `${qq.env.USER_DATA_PATH}`,
            `${qq.env.USER_DATA_PATH}/fileA/hello.txt`
          ][index],
          success(res) {
            // 获得文件 Stats 对象
            const { stats } = res;

            // 调用 stats.isDirectory() 方法进行判断
            qq.showToast({
              title: `是一个${stats.isDirectory() ? "目录" : "文件"}`,
              icon: "success",
              duration: 800
            });
          },
          fail(res) {
            if (!res.errMsg) return;

            if (res.errMsg.includes("no such file or directory")) {
              res.errMsg = `源文件，或上级目录 ${JSON.stringify(
                `${qq.env.USER_DATA_PATH}/fileA`
              )} 不存在，请去创建`;

              qq.showModal({
                content: res.errMsg,
                title: "发生错误"
              });
            }
          }
        });
        break;
      default:
        break;
    }
  });
};
