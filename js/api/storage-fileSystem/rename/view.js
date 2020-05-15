import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "重命名",
    apiName: "rename"
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
    content: "提示： 可以把文件夹、文件从 oldPath 移动到 newPath",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    lineHeight: 40 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const renameButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 110 * PIXI.ratio
  });

  let path;
  let pathArr = [
    `${qq.env.USER_DATA_PATH}/fileA`,
    `${qq.env.USER_DATA_PATH}/newTestFile`
  ];

  pathBox.addChild(
    pText(PIXI, {
      content: "目录路径",
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerHeight: pathBox.height }
    }),
    (path = pText(PIXI, {
      content: pathArr[0],
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: pathBox.width,
        containerHeight: pathBox.height
      }
    }))
  );

  // 重命名 “按钮” 开始
  renameButton.myAddChildFn(
    pText(PIXI, {
      content: "重命名",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: renameButton.width,
        containerHeight: renameButton.height
      }
    })
  );
  renameButton.onClickFn(() => {
    callBack({
      status: "rename",
      pathArr,
      drawFn() {
        pathArr = [pathArr[1], pathArr[0]];
        path.turnText(pathArr[0]);
      }
    });
  });
  // 重命名 “按钮” 结束

  goBack.callBack = () => {
    qq.getFileSystemManager().rmdir({
      dirPath: `${qq.env.USER_DATA_PATH}/newTestFile`,
      recursive: true
    });
  };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    pathBox,
    tipText,
    renameButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
