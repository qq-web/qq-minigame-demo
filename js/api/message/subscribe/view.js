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
    title: "订阅消息",
    apiName: "subscribeMessage"
  });
  const btnGetAuthorization = pButton(PIXI, {
    color: 0x00cafc,
    height: 90 * PIXI.ratio,
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  const btnSendSubscribeMsg = pButton(PIXI, {
    color: 0x00cafc,
    width: 686 * PIXI.ratio,
    y: btnGetAuthorization.height + btnGetAuthorization.y + 20 * PIXI.ratio
  });

  const tip = pText(PIXI, {
    content: "1天最多发送1条订阅消息",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    x: 32 * PIXI.ratio,
    y: btnSendSubscribeMsg.height + btnSendSubscribeMsg.y + 33 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  btnGetAuthorization.myAddChildFn(
    pText(PIXI, {
      content: `获取订阅权限`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: btnGetAuthorization.width,
        containerHeight: btnGetAuthorization.height
      }
    })
  );
  btnSendSubscribeMsg.myAddChildFn(
    pText(PIXI, {
      content: `发送订阅消息`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: btnSendSubscribeMsg.width,
        containerHeight: btnSendSubscribeMsg.height
      }
    })
  );

  btnGetAuthorization.onClickFn(() => {
    callBack({
      status: "getAuthorization"
    });
  });

  btnSendSubscribeMsg.onClickFn(() => {
    callBack({
      status: "sendSubscribeMsg"
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
    btnGetAuthorization,
    btnSendSubscribeMsg,
    tip,
    logo
  );

  app.stage.addChild(container);

  return { container, btnGetAuthorization, btnSendSubscribeMsg };
};
