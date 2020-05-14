import {
  pButton,
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
    content: "获取手机网络状态",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "getNetworkType",
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
  const prompt = pText(PIXI, {
    content: "未获取\n点击绿色按钮可获取网络状态",
    fontSize: 27 * PIXI.ratio,
    fill: 0xbebebe,
    align: "center",
    lineHeight: 45 * PIXI.ratio,
    y: 200 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
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
    prompt,
    network_state_text
  );

  const getNetworkTypeBtn = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    height: 80 * PIXI.ratio,
    y: 830 * PIXI.ratio,
    radius: 5 * PIXI.ratio
  });
  getNetworkTypeBtn.myAddChildFn(
    pText(PIXI, {
      content: "获取手机网络状态",
      fontSize: 30 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getNetworkTypeBtn.width,
        containerHeight: getNetworkTypeBtn.height
      }
    })
  );
  getNetworkTypeBtn.onClickFn(() => {
    callBack({
      status: "getNetworkType",
      drawFn(res) {
        prompt.visible = false;
        network_state_text.visible = true;
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
  });

  // 清空“按钮”开始
  const wipeData = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    alpha: 0,
    height: 80 * PIXI.ratio,
    y: 930 * PIXI.ratio,
    radius: 5 * PIXI.ratio
  });
  wipeData.myAddChildFn(
    pText(PIXI, {
      content: "清空",
      fontSize: 30 * PIXI.ratio,
      relative_middle: {
        containerWidth: wipeData.width,
        containerHeight: wipeData.height
      }
    })
  );
  wipeData.onClickFn(() => {
    if (prompt.visible) return;
    prompt.visible = true;
    network_state_text.visible = false;
  });
  // 清空“按钮”结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    div,
    getNetworkTypeBtn,
    wipeData,
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
