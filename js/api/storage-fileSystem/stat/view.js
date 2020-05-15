import { pButton, pText, pLine, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "判断文件路径是否是目录",
    apiName: "stat"
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

  const divChildArr = [];
  const pitchOn = [];

  const pathArr = [
    `${qq.env.USER_DATA_PATH}`,
    `${qq.env.USER_DATA_PATH}/fileA/hello.txt`
  ];
  const divDeploy = {
    height: 0,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.height + underline.y + 80 * PIXI.ratio
  };

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

  const statButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: div.height + div.y + 116 * PIXI.ratio
  });
  statButton.myAddChildFn(
    pText(PIXI, {
      content: "点击判断",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: statButton.width,
        containerHeight: statButton.height
      }
    })
  );

  statButton.onClickFn(() => {
    const index = pitchOn.findIndex(element => element.visible);

    callBack({ status: "stat", index });
  });
  // 点击判断 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    div,
    statButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
