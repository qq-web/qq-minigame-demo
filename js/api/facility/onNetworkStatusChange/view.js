import {
  pText,
  pLine,
  pBox,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "监听手机网络变化",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "onNetworkStatusChange",
    fontSize: 30 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const div = pBox(PIXI, {
    height: 400 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const network_state_text = pText(PIXI, {
    content: "",
    fontSize: 60 * PIXI.ratio,
    align: "center",
    y: 220 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
  });

  div.addChild(
    pText(PIXI, {
      content: "网络状态",
      fontSize: 30 * PIXI.ratio,
      y: 50 * PIXI.ratio,
      relative_middle: { containerWidth: div.width }
    }),
    network_state_text
  );

  callBack({
    status: "onNetworkStatusChange",
    drawFn(res) {
      network_state_text.turnText(
        {
          wifi: "wifi",
          "2g": "2g",
          "3g": "3g",
          "4g": "4g",
          unknown: "不常见的未知网络",
          none: "无网络"
        }[res.networkType]
      );
    }
  });

  container.addChild(goBack, title, apiName, underline, div, logo, logoName);
  app.stage.addChild(container);

  return container;
};
