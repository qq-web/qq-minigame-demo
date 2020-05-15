import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "显示操作菜单",
    apiName: "showActionSheet"
  });
  // 弹出action sheet “按钮” 开始
  const button = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0x00cafc,
    y: underline.y + underline.height + 120 * PIXI.ratio
  });
  button.addChild(
    pText(PIXI, {
      content: "弹出action sheet",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    callBack({
      status: "showActionSheet"
    });
  });
  // 弹出action sheet “按钮” 结束

  container.addChild(goBack, title, apiName, underline, button, logo);
  app.stage.addChild(container);

  return container;
};
