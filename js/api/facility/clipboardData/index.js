import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, value, drawFn } = data;
    switch (status) {
      case "setClipboardData":
        // 设置系统剪贴板的内容，即复制内容
        qq.setClipboardData({
          data: value,
          success() {
            drawFn(); // 绘制UI
            qq.showToast({
              title: "内容已复制",
              icon: "success",
              duration: 500
            });
          }
        });
        break;
      case "getClipboardData":
        // 获取系统剪贴板的内容，即粘贴内容
        qq.getClipboardData({
          success(res) {
            console.log(res.data);

            drawFn(res.data); // 绘制UI

            qq.showToast({
              title: "粘贴成功",
              icon: "success",
              duration: 500
            });
          }
        });
        break;
      default:
        break;
    }
  });
};
