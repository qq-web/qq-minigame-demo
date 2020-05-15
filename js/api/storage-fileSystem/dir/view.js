import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "创建/删除目录",
    apiName: "mk/rm/dir"
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
  const mkdirButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 120 * PIXI.ratio
  });
  const div = new PIXI.Container();
  const pathBox = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    y: underline.height + underline.y + 80 * PIXI.ratio
  });
  const tipText = pText(PIXI, {
    content: "提示：上面显示的路径是已创建了的",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    lineHeight: 40 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const rmdirButton = pButton(PIXI, {
    width: mkdirButton.width,
    y: pathBox.height + pathBox.y + 123 * PIXI.ratio
  });

  pathBox.addChild(
    pText(PIXI, {
      content: `${qq.env.USER_DATA_PATH}/fileA`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: pathBox.width,
        containerHeight: pathBox.height
      }
    })
  );

  // 创建目录“按钮” 开始
  mkdirButton.myAddChildFn(
    pText(PIXI, {
      content: "创建目录",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: mkdirButton.width,
        containerHeight: mkdirButton.height
      }
    })
  );
  mkdirButton.onClickFn(() => {
    callBack({
      status: "mkdir",
      drawFn() {
        div.visible = !div.visible;
        mkdirButton.hideFn();
      }
    });
  });
  // 创建目录“按钮” 结束

  // 创建目录“按钮” 开始
  rmdirButton.myAddChildFn(
    pText(PIXI, {
      content: "删除目录",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: rmdirButton.width,
        containerHeight: rmdirButton.height
      }
    })
  );
  rmdirButton.onClickFn(() => {
    callBack({
      status: "rmdir",
      drawFn() {
        div.visible = !div.visible;
        mkdirButton.showFn();
      }
    });
  });
  // 创建目录“按钮” 结束

  div.visible = false;
  mkdirButton.hideFn();
  qq.getFileSystemManager().access({
    path: `${qq.env.USER_DATA_PATH}/fileA`,
    success() {
      div.visible = true;
    },
    fail() {
      div.visible = false;
      mkdirButton.showFn();
    }
  });

  div.addChild(bottomBg, pathBox, tipText, rmdirButton);
  container.addChild(goBack, title, apiName, underline, div, mkdirButton, logo);
  app.stage.addChild(container);

  return container;
};
