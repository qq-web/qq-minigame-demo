import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, index } = data;
    switch (status) {
      case "saveFile":
        qq.showLoading({ title: "生成临时文件中", mask: true });
        // 调用downloadFile把网络资源生成临时路径
        qq.downloadFile({
          url:
            "https://res.wx.qq.com/wechatgame/product/webpack/userupload/20190813/advideo.MP4",
          success(res) {
            qq.hideLoading();
            const pathArr = [`${qq.env.USER_DATA_PATH}/fileA/video.MP4`, ""][
              index
            ];
            let filePath;

            // 不传filePath属性，就会保存为本地缓存文件
            pathArr && (filePath = { filePath: pathArr });

            // 先获取全局唯一的文件管理器，接着调起saveFile方法
            qq.getFileSystemManager().saveFile({
              tempFilePath: res.tempFilePath,
              ...filePath,
              recursive: true,
              success() {
                qq.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 800
                });
              },
              fail(e) {
                if (!e.errMsg) return;

                if (
                  e.errMsg.includes(
                    "fail exceeded the maximum size of the file storage limit 50M"
                  )
                )
                  return qq.showModal({
                    content: "超过文件存储限制的最大大小50M",
                    title: "发生错误"
                  });

                if (e.errMsg.includes("fail no such file or directory")) {
                  e.errMsg = `上级目录 ${JSON.stringify(
                    pathArr
                  )} 不存在，请去创建目录`;

                  qq.showModal({
                    content: e.errMsg,
                    title: "发生错误"
                  });
                }
              }
            });
          },
          fail: e => {
            console.log(e);
            qq.hideLoading();
          }
        });

        break;
      default:
        break;
    }
  });
};
