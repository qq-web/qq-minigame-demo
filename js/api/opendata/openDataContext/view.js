import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "开放数据域",
    apiName: "排行榜"
  });

  const report = pButton(PIXI, {
    color: 0xebedf5,
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  const button = pButton(PIXI, {
    color: 0xebedf5,
    width: 686 * PIXI.ratio,
    y: report.height + report.y + 20 * PIXI.ratio
  });
  const gButton = pButton(PIXI, {
    color: 0xebedf5,
    width: 686 * PIXI.ratio,
    y: button.height + button.y + 20 * PIXI.ratio
  });

  report.myAddChildFn(
    pText(PIXI, {
      content: `上报随机分数`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.myAddChildFn(
    pText(PIXI, {
      content: `查看好友排行`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  gButton.myAddChildFn(
    pText(PIXI, {
      content: `查看群排行`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: gButton.width,
        containerHeight: gButton.height
      }
    })
  );
  const bottomBg = new PIXI.Graphics();
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      obj.height - 228 * PIXI.ratio,
      app.renderer.view.width,
      228 * PIXI.ratio
    )
    .endFill();

  const close = pButton(PIXI, {
    color: 0x00cafc,
    width: 686 * PIXI.ratio,
    y: (obj.height - 185 * PIXI.ratio) | 0,
    x: 32
  });

  close.myAddChildFn(
    pText(PIXI, {
      content: `关闭排行`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );

  close.onClickFn(() => {
    container.removeChild(close);
    container.removeChild(bottomBg);
    callBack({
      status: "close"
    });
  });

  button.onClickFn(() => {
    container.addChild(bottomBg);
    container.addChild(close);
    container.addChild(logo);
    callBack({
      status: "showFriendRank"
    });
  });

  gButton.onClickFn(() => {
    callBack({
      status: "shareAppMessage"
    });
  });

  report.onClickFn(() => {
    callBack({
      status: "setUserRecord"
    });
  });

  goBack.callBack = () => {
    container.removeChild(close);
    callBack({
      status: "close"
    });
  };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    report,
    button,
    gButton,
    logo
  );

  app.stage.addChild(container);

  return { container, underline, close };
};
