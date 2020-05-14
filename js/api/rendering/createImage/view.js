import {
  pText,
  pLine,
  pImg,
  pButton,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "创建一个图片对象",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "createImage",
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const button = pButton(PIXI, {
    width: 580 * PIXI.ratio,
    y: underline.height + underline.y + 123 * PIXI.ratio
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
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
          width: 620 * PIXI.ratio,
          height: 224 * PIXI.ratio,
          src: image.src,
          y: underline.height + underline.y + 67.5 * PIXI.ratio,
          relative_middle: { containerWidth: obj.width }
        });
        container.addChild(
          img,
          pText(PIXI, {
            content: `width:${image.width}px   height:${image.height}px`,
            fontSize: 30 * PIXI.ratio,
            fill: 0x353535,
            y: img.height + img.y + 30 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
          })
        );
      }
    });
  });
  // 创建 “按钮” 结束

  container.addChild(goBack, title, apiName, underline, button, logo, logoName);

  app.stage.addChild(container);

  return container;
};
