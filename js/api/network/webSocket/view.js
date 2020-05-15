import { pBox, pText, pImg, pButton } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "WebSocket",
    apiName: "Web Socket"
  });
  const bg = new PIXI.Graphics();
  container.addChild(bg);
  bg.beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const socketState = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    }
  });

  // 绘制 on/off 开关按钮 start
  const off = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/off.png",
    x: socketState.width - 125 * PIXI.ratio,
    relative_middle: { containerHeight: socketState.height }
  });
  const on = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/on.png",
    x: socketState.width - 125 * PIXI.ratio,
    relative_middle: { containerHeight: socketState.height }
  });
  on.hideFn();

  // 绘制 on/off 开关按钮 end

  socketState.addChild(
    pText(PIXI, {
      content: "Socket状态",
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      relative_middle: { containerHeight: socketState.height }
    }),
    off,
    on
  );

  const news = pBox(PIXI, {
    height: socketState.height,
    y: socketState.y + socketState.height
  });
  const msg = pText(PIXI, {
    content: "",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    x: 210 * PIXI.ratio,
    relative_middle: { containerHeight: news.height }
  });
  news.addChild(
    pText(PIXI, {
      content: "消息",
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      relative_middle: { containerHeight: news.height }
    }),
    msg
  );

  const box = pBox(PIXI, {
    height: news.y + news.height,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });

  box.addChild(socketState, news);

  const button = pButton(PIXI, {
    y: box.y + box.height + 40 * PIXI.ratio,
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xb2effe
  });
  const sendText = pText(PIXI, {
    content: "点我发送",
    fontSize: 34 * PIXI.ratio,
    fill: 0xffffff,
    relative_middle: {
      containerWidth: button.width,
      containerHeight: button.height
    }
  });
  button.myAddChildFn(sendText);
  button.onClickFn(() => {
    callBack("sendMessage");
  });
  button.isTouchable(false);

  off.onClickFn(() => {
    callBack("connection", message => {
      off.hideFn();
      on.showFn();
      button.isTouchable(true);
      button.turnColors({ color: 0x00cafc, alpha: 1 });
      sendText.turnColors(0xffffff);
      msg.turnText(message);
    });
  });
  on.onClickFn(() => {
    callBack("disconnect", () => {
      off.showFn();
      on.hideFn();
      button.isTouchable(false);
      button.turnColors();
      sendText.turnColors();
      msg.turnText("");
    });
  });

  goBack.callBack = () => {
    callBack("disconnect");
  };

  container.addChild(goBack, title, apiName, underline, bg, box, button, logo);
  app.stage.addChild(container);

  return container;
};
