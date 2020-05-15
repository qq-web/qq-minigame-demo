import { pButton, pText, pImg, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "创建一个图片对象",
    apiName: "createImage"
  });

  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 120 * PIXI.ratio
  });

  // 创建 “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `创建`,
      fontSize: 36 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    callBack({
      status: "createImage",
      drawFn(image) {
        button.hideFn();
        const img = pImg(PIXI, {
          width: 630 * PIXI.ratio,
          height: 280 * PIXI.ratio,
          src: image.src,
          y: underline.height + underline.y + 120 * PIXI.ratio,
          relative_middle: { containerWidth: obj.width }
        });
        const bottomBg = new PIXI.Graphics();
        bottomBg
          .beginFill(0xf5f6fa)
          .drawRoundedRect(
            0,
            underline.y + 60 * PIXI.ratio,
            app.renderer.view.width,
            app.renderer.view.height
          )
          .endFill();
        const box = pBox(PIXI, {
          height: 360 * PIXI.ratio,
          y: underline.y + underline.height + 80 * PIXI.ratio
        });
        container.addChild(
          bottomBg,
          box,
          img,
          pText(PIXI, {
            content: `width: ${image.width}px   height: ${image.height}px`,
            fontSize: 28 * PIXI.ratio,
            fill: 0x878b99,
            y: img.height + img.y + 62 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
          })
        );
      }
    });
  });
  // 创建 “按钮” 结束

  container.addChild(goBack, title, apiName, underline, button, logo);

  app.stage.addChild(container);

  return container;
};
