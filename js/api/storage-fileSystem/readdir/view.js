import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "查看目录内容",
    apiName: "readdir"
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
  const readdirButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 110 * PIXI.ratio
  });

  pathBox.addChild(
    pText(PIXI, {
      content: "目录路径",
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerHeight: pathBox.height }
    }),
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

  function showListFn(pathArr) {
    const divDeploy = {
      height: 0,
      border: {
        width: PIXI.ratio | 0,
        color: 0xe5e5e5
      },
      y: pathBox.height + pathBox.y - PIXI.ratio
    };
    const divChildArr = [];

    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i].path.length < 2) {
        pathArr.shift();
        i--;
        continue;
      }

      divChildArr[i] = pBox(PIXI, {
        height: 112 * PIXI.ratio,
        border: {
          width: PIXI.ratio | 0,
          color: 0xe5e5e5
        },
        y:
          i &&
          divChildArr[i - 1].height + divChildArr[i - 1].y - (PIXI.ratio | 0)
      });

      divChildArr[i].addChild(
        pText(PIXI, {
          content: pathArr[i].stats.isFile() ? "文件" : "目录",
          fontSize: 34 * PIXI.ratio,
          x: 32 * PIXI.ratio,
          fill: 0x03081a,
          relative_middle: { containerHeight: divChildArr[i].height }
        }),
        pText(PIXI, {
          content: pathArr[i].path.replace("/", ""),
          fontSize: 34 * PIXI.ratio,
          x: 216 * PIXI.ratio,
          fill: 0x03081a,
          relative_middle: {
            containerWidth: divChildArr[i].width,
            containerHeight: divChildArr[i].height
          }
        })
      );
    }

    divDeploy.height =
      divChildArr[divChildArr.length - 1].y +
      divChildArr[divChildArr.length - 1].height;

    const div = pBox(PIXI, divDeploy);
    div.addChild(...divChildArr);
    container.addChild(div);
  }

  // 点击查看 “按钮” 开始
  readdirButton.myAddChildFn(
    pText(PIXI, {
      content: "点击查看",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: readdirButton.width,
        containerHeight: readdirButton.height
      }
    })
  );
  readdirButton.onClickFn(() => {
    callBack({
      status: "readdir",
      drawFn(path) {
        qq.getFileSystemManager().stat({
          path,
          recursive: true,
          success(res) {
            showListFn(res.stats);
            readdirButton.hideFn();
          }
        });
      }
    });
  });
  // 点击查看 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    pathBox,
    readdirButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
