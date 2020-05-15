import { pText, pImg, pBox, pButton } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "截图生成一个临时文件",
    apiName: "toTempFilePath"
  });
  const bottomBg = new PIXI.Graphics();
  container.addChild(bottomBg);
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
  const img = pImg(PIXI, {
    width: 630 * PIXI.ratio,
    height: 280 * PIXI.ratio,
    src: "images/someImage.png",
    relative_middle: {
      containerWidth: box.width,
      containerHeight: box.height
    }
  });
  const tipText = pText(PIXI, {
    content:
      "提示：一但使用了开放数据域，生成后的文件仅\n能被qq.saveImageToPhotosAlbum、qq.share\nAppMessage、qq.onShareAppMessage\n这些接口调用",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 28 * PIXI.ratio,
    y: box.height + box.y + 44 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: box.height + box.y + 260 * PIXI.ratio
  });

  box.addChild(img);

  // 截图生成一个临时文件 “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `截图生成一个临时文件`,
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
      status: "toTempFilePath",
      deploy: {
        x: img.x,
        y: box.y + img.y,
        width: img.width,
        height: img.height
      }
    });
  });
  // 截图生成一个临时文件 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    box,
    tipText,
    button,
    logo
  );

  app.stage.addChild(container);

  return container;
};
