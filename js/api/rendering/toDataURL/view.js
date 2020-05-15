import { pText, pImg, pButton } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "转换为URL",
    apiName: "toDataURL"
  });
  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 120 * PIXI.ratio
  });
  const tipText = pText(PIXI, {
    content:
      "提示：一旦使用了开放数据域，只能在离屏画布\n调用toDataURL才会返回base64",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 28 * PIXI.ratio,
    y: button.height + button.y + 46 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  // 转换为URL “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `转换为URL`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    callBack({
      status: "toDataURL",
      drawFn(base64) {
        const img = pImg(PIXI, {
          width: 630 * PIXI.ratio,
          height: 280 * PIXI.ratio,
          src: base64,
          y: underline.height + underline.y + 67.5 * PIXI.ratio,
          relative_middle: { containerWidth: obj.width }
        });
        img.name = "img";

        button.hideFn();
        tipText.setPositionFn({ y: img.y + img.height + 50 * PIXI.ratio });

        container.addChild(img);
      }
    });
  });
  // 转换为URL “按钮” 结束

  goBack.callBack = () => {
    const img = container.getChildByName("img");
    img && container.removeChild(img).destroy(true);
  };

  // window.router.getNowPage(page => {
  //     page.reload = function() {
  //         button.showFn();
  //         tipText.setPositionFn({ y: button.height + button.y + 50 * PIXI.ratio });
  //         logo.turnImg({ src: 'images/logo.png' });
  //     };
  // });

  container.addChild(goBack, title, apiName, underline, button, tipText, logo);

  app.stage.addChild(container);

  return container;
};
