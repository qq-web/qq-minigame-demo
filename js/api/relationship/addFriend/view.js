import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const bg = new PIXI.Graphics();
  container.addChild(bg);
  bg.beginFill(0xffffff)
    .drawRoundedRect(0, 0, app.renderer.view.width, app.renderer.view.height)
    .endFill();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "添加好友",
    apiName: "createAddFriendButton"
  });
  const button1 = pButton(PIXI, {
    color: 0x00cafc,
    height: 90 * PIXI.ratio,
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 60 * PIXI.ratio
  });
  // button2 = pButton(PIXI, {
  //     color: 0x00CAFC,
  //     width: 686 * PIXI.ratio,
  //     y: button1.height + button1.y + 20 * PIXI.ratio
  // });

  button1.myAddChildFn(
    pText(PIXI, {
      content: `点击授权被加好友权限`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button1.width,
        containerHeight: button1.height
      }
    })
  );
  // button2.myAddChildFn(
  //     pText(PIXI, {
  //         content: `点击加好友`,
  //         fontSize: 34 * PIXI.ratio,
  //         fill: 0xffffff,
  //         relative_middle: { containerWidth: button2.width, containerHeight: button2.height }
  //     })
  // );

  button1.onClickFn(() => {
    callBack({
      status: "getAuthorization"
    });
  });

  goBack.callBack = () => {
    callBack({ status: "close" });
  };

  bg.addChild(goBack, title, apiName, underline, button1, logo);

  app.stage.addChild(container);

  return { container, button1 };
};
