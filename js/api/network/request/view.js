import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "发送请求",
    apiName: "request"
  });
  const explain = pText(PIXI, {
    content: "点击向服务器发起请求",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    y: underline.y + underline.height + 280 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const button = pButton(PIXI, {
    y: explain.y + explain.height + 120 * PIXI.ratio
  });

  button.myAddChildFn(
    pText(PIXI, {
      content: "request",
      fontSize: 34 * PIXI.ratio,
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

  container.addChild(goBack, title, apiName, underline, explain, button, logo);
  app.stage.addChild(container);

  return container;
};
