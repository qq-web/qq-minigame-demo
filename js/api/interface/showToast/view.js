import { pButton, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "显示操作菜单",
    apiName: "showActionSheet"
  });

  // 点击弹出默认toast“按钮” 开始
  const toast1Tap = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: underline.y + underline.height + 60 * PIXI.ratio
  });
  toast1Tap.addChild(
    pText(PIXI, {
      content: "点击弹出默认toast",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 13 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast1Tap.width,
        containerHeight: toast1Tap.height
      }
    })
  );
  toast1Tap.onClickFn(() => {
    callBack({
      status: "toast1Tap"
    });
  });
  // 点击弹出默认toast“按钮” 结束

  // 点击弹出设置duration的toast“按钮” 开始
  const toast2Tap = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: toast1Tap.y + toast1Tap.height + 20 * PIXI.ratio
  });
  toast2Tap.addChild(
    pText(PIXI, {
      content: "点击弹出设置duration的toast",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 10 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast2Tap.width,
        containerHeight: toast2Tap.height
      }
    })
  );
  toast2Tap.onClickFn(() => {
    callBack({
      status: "toast2Tap"
    });
  });
  // 点击弹出设置duration的toast“按钮” 结束

  // 点击弹出显示loading的toast“按钮” 开始
  const toast3Tap = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: toast2Tap.y + toast2Tap.height + 20 * PIXI.ratio
  });
  toast3Tap.addChild(
    pText(PIXI, {
      content: "点击弹出设置loading的toast",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 10 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast3Tap.width,
        containerHeight: toast3Tap.height
      }
    })
  );
  toast3Tap.onClickFn(() => {
    callBack({
      status: "toast3Tap"
    });
  });
  // 点击弹出显示loading的toast“按钮” 结束

  // 点击隐藏toast“按钮” 开始
  const hideToast = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: toast3Tap.y + toast3Tap.height + 20 * PIXI.ratio
  });
  hideToast.addChild(
    pText(PIXI, {
      content: "点击隐藏toast",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      fontWeight: "bold",
      relative_middle: {
        containerWidth: hideToast.width,
        containerHeight: hideToast.height
      }
    })
  );
  hideToast.onClickFn(() => {
    callBack({
      status: "hideToast"
    });
  });
  // 点击隐藏toast“按钮” 结束

  goBack.callBack = () => {
    qq.hideToast();
  };
  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    toast1Tap,
    toast2Tap,
    toast3Tap,
    hideToast,
    logo
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
