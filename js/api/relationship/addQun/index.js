import view from "./view";

module.exports = function(PIXI, app, obj) {
  const _view = view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "addQun":
        qq.openGroupProfile({
          groupId: "109573191" // 需要在game.json中配置groupIdList字段才能使用
        });
        break;
      default:
        break;
    }
  });

  return _view.container;
};
