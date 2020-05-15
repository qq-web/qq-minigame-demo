import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "获取文件信息",
    apiName: "getFileInfo"
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
  const pathBox = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    y: underline.height + underline.y + 80 * PIXI.ratio
  });
  const tipText = pText(PIXI, {
    content:
      "提示：路径可以是代码包绝对路径、本地临时路\n径、本地路径和本地缓存路径",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 40 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  const getFileInfoButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 165 * PIXI.ratio
  });

  pathBox.addChild(
    pText(PIXI, {
      content: `路径`,
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerHeight: pathBox.height }
    }),
    pText(PIXI, {
      content: "images/someImage.png",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: pathBox.width,
        containerHeight: pathBox.height
      }
    })
  );

  // 获取文件信息 “按钮” 开始
  getFileInfoButton.myAddChildFn(
    pText(PIXI, {
      content: "获取文件信息",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getFileInfoButton.width,
        containerHeight: getFileInfoButton.height
      }
    })
  );
  getFileInfoButton.onClickFn(() => {
    callBack({ status: "getFileInfo" });
  });
  // 获取文件信息 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    pathBox,
    tipText,
    getFileInfoButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
