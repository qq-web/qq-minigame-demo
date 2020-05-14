import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  // const bg = new PIXI.Graphics();
  // container.addChild(bg);
  // bg.beginFill(0xffffff)
  //   .drawRoundedRect(0, 0, app.renderer.view.width, app.renderer.view.height)
  //   .endFill();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "模板消息",
    apiName: "template"
  });
  const btnGetFormId = pButton(PIXI, {
    color: 0x00cafc,
    height: 90 * PIXI.ratio,
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  const btnSendTemplateMsg = pButton(PIXI, {
    color: 0x00cafc,
    width: 686 * PIXI.ratio,
    y: btnGetFormId.height + btnGetFormId.y + 20 * PIXI.ratio
  });

  const tip = pText(PIXI, {
    content: "获取1次formid，即可发送1条信息",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: btnSendTemplateMsg.height + btnSendTemplateMsg.y + 33 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  btnGetFormId.myAddChildFn(
    pText(PIXI, {
      content: `获取formid`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: btnGetFormId.width,
        containerHeight: btnGetFormId.height
      }
    })
  );
  btnSendTemplateMsg.myAddChildFn(
    pText(PIXI, {
      content: `发送模版消息`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: btnSendTemplateMsg.width,
        containerHeight: btnSendTemplateMsg.height
      }
    })
  );

  btnGetFormId.onClickFn(() => {
    callBack({
      status: "getFormId"
    });
  });

  btnSendTemplateMsg.onClickFn(() => {
    callBack({
      status: "sendTemplateMsg"
    });
  });
  // goBack.callBack = () => {
  //   callBack({ status: "close" });
  // };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    btnGetFormId,
    btnSendTemplateMsg,
    tip,
    logo
  );

  app.stage.addChild(container);

  return { container, btnGetFormId, btnSendTemplateMsg };
};
