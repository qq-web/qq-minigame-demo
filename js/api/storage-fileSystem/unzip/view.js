import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "解压文件",
    apiName: "unzip"
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
    content: `提示：把压缩包的内容解压到路径 ${JSON.stringify(
      `${qq.env.USER_DATA_PATH}/fileA`
    )} 下`,
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    lineHeight: 40 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const unzipFileButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 158 * PIXI.ratio
  });

  pathBox.addChild(
    pText(PIXI, {
      content: "压缩包",
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerHeight: pathBox.height }
    }),
    pText(PIXI, {
      content: "test.zip",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: pathBox.width,
        containerHeight: pathBox.height
      }
    })
  );

  // 解压文件 “按钮” 开始
  unzipFileButton.myAddChildFn(
    pText(PIXI, {
      content: "解压文件",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: unzipFileButton.width,
        containerHeight: unzipFileButton.height
      }
    })
  );
  unzipFileButton.onClickFn(() => {
    callBack({ status: "unzip" });
  });
  // 解压文件 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    pathBox,
    tipText,
    unzipFileButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
