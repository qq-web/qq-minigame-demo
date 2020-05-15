import { pButton, pText, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "下载文件",
    apiName: "downloadFile"
  });

  const explain = pText(PIXI, {
    content: "点击按钮下载服务端实例图片",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    y: underline.y + underline.height + 280 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const button = pButton(PIXI, {
    y: explain.y + explain.height + 120 * PIXI.ratio
  });

  let sprite = null;

  button.myAddChildFn(
    pText(PIXI, {
      content: "下载",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );

  button.onClickFn(() => {
    callBack(tempFilePath => {
      PIXI.loader.add(tempFilePath).load(() => {
        sprite = pImg(PIXI, {
          src: tempFilePath,
          is_PIXI_loader: true,
          x: 30 * PIXI.ratio,
          y: underline.y + underline.height + 100 * PIXI.ratio
        });
        sprite.height =
          ((obj.width - 60 * PIXI.ratio) * sprite.height) / sprite.width;
        sprite.width = obj.width - 60 * PIXI.ratio;
        explain.hideFn();
        button.hideFn();
        container.addChild(sprite);
      });
    });
  });

  container.addChild(goBack, title, apiName, underline, explain, button, logo);
  app.stage.addChild(container);

  return container;
};
