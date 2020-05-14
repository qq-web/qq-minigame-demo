import { pBox, pText } from "../../libs/component/index";
import fixedTemplate from "../../libs/template/fixed";
import share from "../../libs/share";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "主动分享",
    apiName: "onShareAppMessage"
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

  goBack.callBack = () => {
    callBack({
      status: "offShareAppMessage"
    });
    share();
  };

  const transpondTextContainer = pBox(PIXI, {
    height: 76 * PIXI.ratio,
    width: app.renderer.view.width,
    y: underline.height + underline.y + 60 * PIXI.ratio,
    background: {
      color: 0xf5f6fa
    }
  });
  const transpondText = pText(PIXI, {
    content: "发送内容 （以下字段可自由适配）",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: 32 * PIXI.ratio
  });

  transpondTextContainer.addChild(transpondText);

  const transpond = {
    标题: "自定义转发标题",
    描述: "自定义转发描述",
    跳转页面: "当前小游戏示例"
  };
  const divDeploy = {
    height: 0,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: transpondTextContainer.height + transpondTextContainer.y
  };
  const divContainer = new PIXI.Container();
  const divContainerChildArr = [];

  for (
    let i = 0, arr = Object.keys(transpond), len = arr.length;
    i < len;
    i++
  ) {
    divContainerChildArr[i] = pBox(PIXI, {
      height: 112 * PIXI.ratio, // i ? 93 * PIXI.ratio : 87 * PIXI.ratio,
      border: {
        width: PIXI.ratio | 0,
        color: 0xe5e5e5
      },
      y: i
        ? divContainerChildArr[i - 1].height +
          divContainerChildArr[i - 1].y -
          (PIXI.ratio | 0)
        : 0
    });

    divContainerChildArr[i].addChild(
      pText(PIXI, {
        content: arr[i],
        fontSize: 34 * PIXI.ratio,
        fill: 0x03081a,
        x: 32 * PIXI.ratio,
        relative_middle: { containerHeight: divContainerChildArr[i].height }
      }),
      (transpond[arr[i]] = pText(PIXI, {
        content: transpond[arr[i]],
        fontSize: 34 * PIXI.ratio,
        fill: 0x03081a,
        relative_middle: {
          containerWidth: divContainerChildArr[i].width,
          containerHeight: divContainerChildArr[i].height
        }
      }))
    );
  }

  divDeploy.height =
    divContainerChildArr[divContainerChildArr.length - 1].y +
    divContainerChildArr[divContainerChildArr.length - 1].height;

  const div = pBox(PIXI, divDeploy);
  divContainer.addChild(...divContainerChildArr);
  divContainer.mask = pBox(PIXI, {
    width: div.width - 30 * PIXI.ratio,
    height: divDeploy.height - 2 * PIXI.ratio,
    x: 30 * PIXI.ratio,
    color: 0xff0000
  });
  div.addChild(divContainer, divContainer.mask);

  const tip = pText(PIXI, {
    content: "点击右上角菜单转发给好友",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: div.height + div.y + 16 * PIXI.ratio
  });

  // 加载监听被动调起分享 开始
  callBack({
    status: "onShareAppMessage"
  });
  // 加载监听被动调起分享 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    transpondTextContainer,
    div,
    tip,
    logo
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
