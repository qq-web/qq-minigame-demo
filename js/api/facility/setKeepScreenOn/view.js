import { pImg, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "屏幕常亮",
    apiName: "setKeepScreenOn"
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

  const div = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.y + underline.height + 75 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "仅在当前小程序生效\n离开小程序后设置失效",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 45 * PIXI.ratio,
    y: div.y + div.height + 56 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  // switch button 开始
  const off = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/off.png",
    x: div.width - 126 * PIXI.ratio,
    relative_middle: { containerHeight: div.height }
  });
  const on = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/on.png",
    x: div.width - 126 * PIXI.ratio,
    relative_middle: { containerHeight: div.height }
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
      color: 0x03081e,
      x: 32 * PIXI.ratio,
      relative_middle: { containerHeight: div.height }
    }),
    off,
    on
  );

  setTimeout(() => {
    window.router.getNowPage(page => {
      page.reload = function() {
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
    bottomBg,
    div,
    text,
    logo
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
