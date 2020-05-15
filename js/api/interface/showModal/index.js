import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "with title":
        qq.showModal({
          title: "弹窗标题",
          content:
            "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
          showCancel: false,
          confirmText: "确定"
        });
        break;

      case "without title":
        qq.showModal({
          content:
            "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
          confirmText: "确定",
          cancelText: "取消"
        });
        break;
      default:
        break;
    }
  });
};
