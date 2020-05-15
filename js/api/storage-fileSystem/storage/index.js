import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status, key, value } = data;
    switch (status) {
      case "setStorage":
        qq.setStorage({
          key,
          data: value,
          success() {
            qq.showModal({ content: `数据存储成功` });
          }
        });
        break;

      case "getStorage":
        qq.getStorage({
          key,
          success(res) {
            console.log(res);
            qq.showModal({
              content: `data: ${res.data}`,
              title: "读取数据成功"
            });
          },
          fail() {
            qq.showModal({
              content: "找不到 key 对应的数据",
              title: "读取数据失败"
            });
          }
        });
        break;

      case "clearStorage":
        qq.clearStorage({
          success() {
            qq.showModal({ content: "清除数据成功" });
          }
        });
        break;
      default:
        break;
    }
  });
};
