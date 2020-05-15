import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "显示操作菜单",
    apiName: "showActionSheet"
  });

  // 有标题的模态弹窗“按钮” 开始
  const withTitleBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: underline.y + underline.height + 60 * PIXI.ratio
  });
  withTitleBtn.addChild(
    pText(PIXI, {
      content: "有标题的modal",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: withTitleBtn.width,
        containerHeight: withTitleBtn.height
      }
    })
  );
  withTitleBtn.onClickFn(() => {
    callBack({
      status: "with title"
    });
  });
  // 有标题的模态弹窗“按钮” 结束

  // 无标题的模态弹窗“按钮” 开始
  const withoutTitleBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: withTitleBtn.y + withTitleBtn.height + 20 * PIXI.ratio
  });
  withoutTitleBtn.addChild(
    pText(PIXI, {
      content: "无标题的modal",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: withoutTitleBtn.width,
        containerHeight: withoutTitleBtn.height
      }
    })
  );
  withoutTitleBtn.onClickFn(() => {
    callBack({
      status: "without title"
    });
  });
  // 无标题的模态弹窗“按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    withTitleBtn,
    withoutTitleBtn,
    logo
  );
  app.stage.addChild(container);

  return container;
};
