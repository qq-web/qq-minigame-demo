import {
  pButton,
  pText,
  pLine,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "发送请求",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "request",
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
  const explain = pText(PIXI, {
    content: "点击向服务器发起请求",
    fontSize: 30 * PIXI.ratio,
    fill: 0x999999,
    y: underline.y + underline.height + 300 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const button = pButton(PIXI, {
    y: explain.y + explain.height + 300 * PIXI.ratio
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

  button.myAddChildFn(
    pText(PIXI, {
      content: "request",
      fontSize: 30 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );

  button.onClickFn(() => {
    callBack((res, time) => {
      explain.turnText(
        `数据包大小(字符长度)：${res.data.length || 0}\n请求耗时：${Date.now() -
          time}ms`
      );
    });
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    explain,
    button,
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
