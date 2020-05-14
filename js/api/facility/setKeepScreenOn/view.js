import {
  pText,
  pBox,
  pLine,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "navigateBack");
  const title = pText(PIXI, {
    content: "屏幕常亮",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "setKeepScreenOn",
    fontSize: 32 * PIXI.ratio,
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
    height: 89 * PIXI.ratio,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.y + underline.height + 75 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "仅在当前小程序生效\n离开小程序后设置失效",
    fontSize: 30 * PIXI.ratio,
    fill: 0x353535,
    align: "center",
    lineHeight: 55 * PIXI.ratio,
    y: div.y + div.height + 71 * PIXI.ratio,
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

  // switch button 开始
  const off = pImg(PIXI, {
    width: 142 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    src: "images/off.png",
    x: div.width - 152 * PIXI.ratio,
    relative_middle: { containerHeight: div.height }
  });
  const on = pImg(PIXI, {
    width: 122 * PIXI.ratio,
    height: 87 * PIXI.ratio,
    src: "images/on.png",
    x: div.width - 142 * PIXI.ratio
  });
  on.hideFn();
  off.onClickFn(() => {
    callBack({
      status: "setKeepScreenOn",
      keepScreenOn: true,
      drawFn() {
        off.hideFn();
        on.showFn();
      }
    });
  });
  on.onClickFn(() => {
    callBack({
      status: "setKeepScreenOn",
      keepScreenOn: false,
      drawFn() {
        off.showFn();
        on.hideFn();
      }
    });
  });
  // switch button 结束

  div.addChild(
    pText(PIXI, {
      content: "屏幕常亮",
      fontSize: 34 * PIXI.ratio,
      x: 30 * PIXI.ratio,
      relative_middle: { containerHeight: div.height }
    }),
    off,
    on
  );

  setTimeout(() => {
    window.router.getNowPage(page => {
      page.reload = function() {
        logo.turnImg({ src: "images/logo.png" });
        off.turnImg({ src: "images/off.png" });
        on.turnImg({ src: "images/on.png" });
      };
    });
  }, 0);

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    div,
    text,
    logo,
    logoName
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
