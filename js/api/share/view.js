import { pButton, pBox, pText } from "../../libs/component/index";
import fixedTemplate from "../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const BUTTON_WIDTH = 686 * PIXI.ratio;
  const BUTTON_HEIGHT = 90 * PIXI.ratio;
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "主动分享",
    apiName: "shareAppMessage"
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

  const transpondTextContainer = pBox(PIXI, {
    height: 76 * PIXI.ratio,
    width: app.renderer.view.width,
    y: underline.height + underline.y + 60 * PIXI.ratio,
    background: {
      color: 0xf5f6fa
    }
  });
  const transpondText = pText(PIXI, {
    content: "点击右上角菜单转发给好友",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: 32 * PIXI.ratio
  });

  transpondTextContainer.addChild(transpondText);

  const btnShowShareMenu = pButton(PIXI, {
    color: 0xffffff,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    y: transpondTextContainer.height + transpondTextContainer.y
  });
  const btnShowShareMenuAll = pButton(PIXI, {
    color: 0xffffff,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    y: BUTTON_HEIGHT + btnShowShareMenu.y + 20 * PIXI.ratio
  });
  const btnFastShareList = pButton(PIXI, {
    color: 0xffffff,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    y: BUTTON_HEIGHT + btnShowShareMenuAll.y + 20 * PIXI.ratio
  });
  const btnFastShare = pButton(PIXI, {
    color: 0xebedf5,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    y: BUTTON_HEIGHT + btnFastShareList.y + 20 * PIXI.ratio
  });

  const tip = pText(PIXI, {
    content: "分享页面到群会话，从群会话中打开小程序即\n可「分享回原会话」",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: btnFastShare.height + btnFastShare.y + 46 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  btnShowShareMenu.myAddChildFn(
    pText(PIXI, {
      content: `分享面板显示QQ和Qzone`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: BUTTON_WIDTH,
        containerHeight: BUTTON_HEIGHT
      }
    })
  );
  btnShowShareMenuAll.myAddChildFn(
    pText(PIXI, {
      content: `分享面板显示全部`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: BUTTON_WIDTH,
        containerHeight: BUTTON_HEIGHT
      }
    })
  );
  btnFastShareList.myAddChildFn(
    pText(PIXI, {
      content: `快速分享面板`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: BUTTON_WIDTH,
        containerHeight: BUTTON_HEIGHT
      }
    })
  );
  btnFastShare.myAddChildFn(
    pText(PIXI, {
      content: `一键分享回原会话`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: BUTTON_WIDTH,
        containerHeight: BUTTON_HEIGHT
      }
    })
  );

  btnShowShareMenu.onClickFn(() => {
    callBack({
      status: "showShareMenu"
    });
  });

  btnShowShareMenuAll.onClickFn(() => {
    callBack({
      status: "showShareMenuAll"
    });
  });

  btnFastShareList.onClickFn(() => {
    callBack({
      status: "fastShareList"
    });
  });

  btnFastShare.onClickFn(() => {
    callBack({
      status: "fastShare"
    });
  });

  goBack.callBack = () => {
    callBack({
      status: "close"
    });
  };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    transpondTextContainer,
    btnShowShareMenu,
    btnShowShareMenuAll,
    btnFastShareList,
    btnFastShare,
    tip,
    logo
  );

  app.stage.addChild(container);

  return { container, underline, btnFastShare };
};
