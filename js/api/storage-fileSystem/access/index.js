import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, index } = data;
    const path = [
      `${qq.env.USER_DATA_PATH}/fileA`,
      `${qq.env.USER_DATA_PATH}/fileA/test.txt`
    ][index];

    switch (status) {
      case "access":
        // 先获取全局唯一的文件管理器，接着调起access方法
        qq.getFileSystemManager().access({
          path,
          success() {
            qq.showModal({
              content: `${path} 目录存在`,
              showCancel: false,
              confirmColor: "#02BB00"
            });
          },
          fail(res) {
            if (!res.errMsg) return;

            const err = res.errMsg.split(",");
            err[0] = "文件/目录不存在";
            qq.showModal({
              content: err.join(",")
            });
          }
        });
        break;
      default:
        break;
    }
  });
};
