import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "QQ登录",
    apiName: "Login"
  });
  const prompt = pText(PIXI, {
    content: "每个QQ号中仅需登录一次",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    lineHeight: 34 * PIXI.ratio,
    y: underline.y + underline.height + 280 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const hasLoggedOn = pText(PIXI, {
    content: "已登录",
    fontSize: 50 * PIXI.ratio,
    fontWeight: "bold",
    y: underline.y + underline.height + 262 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const anotherTip = pText(PIXI, {
    content:
      "每个QQ号中仅需登录1次，后续每次进入页面即可\n根据QQ id自动拉取用户信息",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: underline.y + underline.height + 488 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  // QQ登录“按钮” 开始
  const qqLogin = pButton(PIXI, {
    y: underline.y + underline.height + 434 * PIXI.ratio,
    width: 686 * PIXI.ratio
  });
  qqLogin.myAddChildFn(
    pText(PIXI, {
      content: "QQ登录",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: qqLogin.width,
        containerHeight: qqLogin.height
      }
    })
  );
  qqLogin.onClickFn(() => {
    callBack({
      status: "login",
      drawFn() {
        qqLogin.visible = false;
        prompt.visible = false;
        container.addChild(hasLoggedOn, anotherTip);
      }
    });
  });
  // QQ登录“按钮” 结束

  container.addChild(goBack, title, apiName, underline, prompt, qqLogin, logo);

  app.stage.addChild(container);

  return container;
};
