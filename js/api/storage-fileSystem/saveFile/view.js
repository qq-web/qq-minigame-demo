import { pButton, pText, pLine, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "保存临时文件到本地",
    apiName: "saveFile"
  });
  const tipText = pText(PIXI, {
    content: "提示：这里会保存一个mp4文件，文件来源看源码",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    lineHeight: 40 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  const pathArr = [
    `${qq.env.USER_DATA_PATH}/fileA/video.mp4`,
    "选择保存为本地缓存路径"
  ];
  const divDeploy = {
    height: 0,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.height + underline.y + 80 * PIXI.ratio
  };
  const divChildArr = [];
  const pitchOn = [];
  for (let i = 0, len = pathArr.length; i < len; i++) {
    divChildArr[i] = pBox(PIXI, {
      height: 112 * PIXI.ratio,
      border: {
        width: PIXI.ratio | 0,
        color: 0xe5e5e5
      },
      y:
        i && divChildArr[i - 1].height + divChildArr[i - 1].y - (PIXI.ratio | 0)
    });

    divChildArr[i].addChild(
      pText(PIXI, {
        content: pathArr[i],
        fontSize: 34 * PIXI.ratio,
        x: 32 * PIXI.ratio,
        fill: 0x03081a,
        relative_middle: { containerHeight: divChildArr[i].height }
      }),
      (pitchOn[i] = pLine(
        PIXI,
        {
          width: 5 * PIXI.ratio,
          color: 0x00cafc
        },
        [670 * PIXI.ratio, 50 * PIXI.ratio],
        [15 * PIXI.ratio, 15 * PIXI.ratio],
        [45 * PIXI.ratio, -15 * PIXI.ratio]
      ))
    );
    pitchOn[i].visible = false;
    divChildArr[i].onClickFn(e => {
      if (pitchOn[i].visible) return;
      pitchOn.forEach(element => {
        element.visible = false;
      });
      pitchOn[i].visible = true;
    });
  }

  // 默认时选中第一项true
  pitchOn[0].visible = true;
  divDeploy.height =
    divChildArr[divChildArr.length - 1].y +
    divChildArr[divChildArr.length - 1].height;

  const div = pBox(PIXI, divDeploy);
  div.addChild(...divChildArr);

  tipText.setPositionFn({ y: div.height + div.y + 16 * PIXI.ratio });

  // 点击保存 “按钮” 开始
  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: div.height + div.y + 116 * PIXI.ratio
  });
  button.myAddChildFn(
    pText(PIXI, {
      content: "点击保存",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    const index = pitchOn.findIndex(element => element.visible);

    callBack({
      status: "saveFile",
      index
    });
  });
  // 点击保存 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    div,
    tipText,
    button,
    logo
  );
  app.stage.addChild(container);

  return container;
};
