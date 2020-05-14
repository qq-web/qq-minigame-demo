import { pButton, pText, pBox, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "获取用户信息",
    apiName: "getUserInfo"
  });
  const bottomBg = new PIXI.Graphics();
  container.addChild(bottomBg);
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const div = pBox(PIXI, {
    height: obj.width / 1.53,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const prompt = pText(PIXI, {
    content: "未获取\n点击蓝色按钮可获取用户头像及昵称",
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    align: "center",
    lineHeight: 34 * PIXI.ratio,
    y: 202 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  div.addChild(
    pText(PIXI, {
      content: "用户信息",
      fontSize: 34 * PIXI.ratio,
      y: 40 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerWidth: div.width }
    }),
    prompt
  );

  const wipeData = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: div.y + div.height + 150 * PIXI.ratio
  });

  let image;
  let nickName;

  // 清空“按钮”开始
  wipeData.myAddChildFn(
    pText(PIXI, {
      content: "清空",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: wipeData.width,
        containerHeight: wipeData.height
      }
    })
  );
  wipeData.onClickFn(() => {
    if (prompt.visible) return;
    if (image) {
      image.hideFn();
      nickName.hideFn();
    }
    prompt.showFn();
  });

  // 清空“按钮”结束
  goBack.callBack = () => {
    callBack({
      status: "destroyUserInfoButton"
    });
  };

  container.addChild(goBack, title, apiName, underline, div, wipeData, logo);
  app.stage.addChild(container);

  callBack({
    status: "createUserInfoButton",
    left: wipeData.x / obj.pixelRatio,
    top: (wipeData.y - (20 + 90) * PIXI.ratio) / obj.pixelRatio,
    width: wipeData.width / obj.pixelRatio,
    height: wipeData.height / obj.pixelRatio,
    // 取得用户信息后渲染函数
    drawFn(res) {
      prompt.hideFn();
      if (!image) {
        image = pImg(PIXI, {
          src: res.avatarUrl,
          width: 120 * PIXI.ratio,
          height: 120 * PIXI.ratio,
          mask: "circle",
          y: 199 * PIXI.ratio,
          relative_middle: { containerWidth: obj.width }
        });

        nickName = pText(PIXI, {
          content: res.nickName,
          fontSize: 34 * PIXI.ratio,
          fill: 0x03081a,
          y: image.y + image.height + 20 * PIXI.ratio,
          relative_middle: { containerWidth: div.width }
        });
        div.addChild(image, nickName);
      } else {
        image.turnImg({ src: res.avatarUrl });
        nickName.turnText(res.nickName);
        image.showFn();
        nickName.showFn();
      }
    }
  });

  return container;
};
