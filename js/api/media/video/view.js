import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "视频",
    apiName: "video"
  });
  const bg = new PIXI.Graphics();
  container.addChild(bg);
  bg.beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();
  goBack.callBack = () => {
    callBack({
      status: "destroy"
    });
  };

  // 创建视频 开始
  callBack({
    status: "createVideo",
    data: {
      x: (75 * obj.width) / (375 * 2 * obj.pixelRatio),
      y:
        ((underline.y + underline.height + 83 * PIXI.ratio) * 750) /
        (375 * 2 * obj.pixelRatio),
      width: (300 * obj.width) / (375 * obj.pixelRatio),
      height: (225 * obj.width) / (375 * obj.pixelRatio)
    }
  });
  // 创建视频 结束

  container.addChild(goBack, title, apiName, underline, logo);

  app.stage.addChild(container);

  return container;
};
