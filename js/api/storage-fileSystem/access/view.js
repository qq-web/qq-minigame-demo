import { pButton, pText, pLine, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "判断文件/目录是否存在",
    apiName: "access"
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

  const pathArr = [
    `${qq.env.USER_DATA_PATH}/fileA`,
    `${qq.env.USER_DATA_PATH}/fileA/test.txt`
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

  for (let i = 0, len = pathArr.length; i < len; i++) {
    i &&
      divChildArr.push(
        pLine(
          PIXI,
          {
            width: PIXI.ratio | 0,
            color: 0xe5e5e5
          },
          [30 * PIXI.ratio, i * divChildArr[0].height],
          [obj.width, 0]
        )
      );

    const num = divChildArr.length;
    divChildArr[num] = pButton(PIXI, {
      width: obj.width,
      height: 112 * PIXI.ratio,
      color: 0xffffff,
      radius: 0,
      y: num && divChildArr[num - 1].height + divChildArr[num - 1].y
    });

    divChildArr[num].myAddChildFn(
      pText(PIXI, {
        content: pathArr[i],
        fontSize: 34 * PIXI.ratio,
        x: 30 * PIXI.ratio,
        fill: 0x03081a,
        relative_middle: {
          containerWidth: divChildArr[num].width,
          containerHeight: divChildArr[num].height
        }
      })
    );
    divChildArr[num].onClickFn(() => {
      callBack({
        status: "access",
        index: i
      });
    });
  }

  divDeploy.height =
    divChildArr[divChildArr.length - 1].y +
    divChildArr[divChildArr.length - 1].height;

  const div = pBox(PIXI, divDeploy);
  div.addChild(...divChildArr);

  const tipText = pText(PIXI, {
    content: "点击查询目录是否存在",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    lineHeight: 40 * PIXI.ratio,
    y: div.height + div.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    div,
    tipText,
    logo
  );
  app.stage.addChild(container);

  return container;
};
