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
    title: "打开群资料卡",
    apiName: "openGroupProfile"
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
      content: `点击打开群资料卡`,
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
        containerWidth: button1.width,
        containerHeight: button1.height
      }
    })
  );

  close.onClickFn(() => {
    bg.removeChild(close);
    // bg.removeChild(subscribe);
    callBack({
      status: "close"
    });
  });

  // let subscribe = pButton(PIXI, {
  //     width: 300 * PIXI.ratio,
  //     y: (obj.height - 200 * PIXI.ratio) | 0,
  //     x: 50,
  // });

  // subscribe.myAddChildFn(
  //     pText(PIXI, {
  //         content: `订阅消息`,
  //         fontSize: 32 * PIXI.ratio,
  //         fill    : 0xffffff,
  //         relative_middle: { containerWidth: button2.width, containerHeight: button2.height }
  //     })
  // );

  // subscribe.onClickFn(() => {
  //     callBack({
  //         status: 'subscribe'
  //     });
  // });

  // button2.onClickFn(() => {
  //     bg.addChild(close);
  //     // bg.addChild(subscribe);
  //     callBack({
  //         status: 'addFriend'
  //     });
  // });

  button1.onClickFn(() => {
    callBack({
      status: "addQun"
    });
  });

  goBack.callBack = () => {
    callBack({ status: "close" });
  };

  bg.addChild(goBack, title, apiName, underline, button1, logo);

  app.stage.addChild(container);

  return { container, close, button1 };
};
