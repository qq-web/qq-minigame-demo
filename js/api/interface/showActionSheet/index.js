import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "showActionSheet":
        qq.showActionSheet({
          itemList: ["item1", "item2", "item3", "item4"],
          success(e) {
            console.log(e.tapIndex);
          }
        });
        break;
      default:
        break;
    }
  });
};
