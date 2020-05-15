import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, drawFn } = data;
    switch (status) {
      case "onNetworkStatusChange":
        qq.onNetworkStatusChange(res => {
          console.log(res);
          drawFn(res); // 更新UI
        });
        qq.showModal({
          content: "请去切换网络状态进行测试",
          title: "监听成功"
        });
        break;
      default:
        break;
    }
  });
};
