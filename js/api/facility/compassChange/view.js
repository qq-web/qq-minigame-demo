import { pButton, pText, pBox, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "监听罗盘数据",
    apiName: "on/off/CompassChange"
  });
  const bottomBg = new PIXI.Graphics();
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const prompt = pText(PIXI, {
    content: `旋转手机即可获取方位信息`,
    fontSize: 28 * PIXI.ratio,
    lineHeight: 34 * PIXI.ratio,
    fill: 0xb0b3bf,
    y: underline.y + underline.height + 100 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const imgContainer = pBox(PIXI, {
    width: 540 * PIXI.ratio,
    height: 540 * PIXI.ratio,
    background: { alpha: 0 },
    y: prompt.y + prompt.height + 70 * PIXI.ratio
  });
  const img = pImg(PIXI, {
    width: imgContainer.width,
    src: "images/Group 3.png",
    x: imgContainer.width / 2,
    y: imgContainer.height / 2
  });
  const text = pText(PIXI, {
    content: "0",
    fontSize: 160 * PIXI.ratio,
    fill: 0x353535,
    relative_middle: { containerWidth: img.width, containerHeight: img.height }
  });
  const unit = pText(PIXI, {
    content: "°",
    fontSize: 160 * PIXI.ratio,
    fill: 0x353535,
    x: text.x + text.width,
    relative_middle: { containerHeight: img.height }
  });

  img.setAnchor(0.5);
  imgContainer.addChild(
    img,
    pBox(PIXI, {
      width: 6 * PIXI.ratio,
      height: 56 * PIXI.ratio,
      background: { color: 0x00cafc },
      radius: 3 * PIXI.ratio,
      y: -16 * PIXI.ratio,
      parentWidth: imgContainer.width
    }),
    text,
    unit
  );

  // 开始监听“按钮” 开始
  const startListening = pButton(PIXI, {
    width: 336 * PIXI.ratio,
    height: 78 * PIXI.ratio,
    radius: 12 * PIXI.ratio,
    // alpha: 0,
    x: 32 * PIXI.ratio,
    color: 0xffffff,
    y: imgContainer.height + imgContainer.y + 100 * PIXI.ratio
  });
  startListening.myAddChildFn(
    pText(PIXI, {
      content: "开始监听",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: startListening.width,
        containerHeight: startListening.height
      }
    })
  );

  // 开始监听“按钮” 结束

  // 停止监听“按钮” 开始
  const stopListening = pButton(PIXI, {
    width: 336 * PIXI.ratio,
    height: 78 * PIXI.ratio,
    radius: 12 * PIXI.ratio,
    color: 0xffffff,
    // alpha: 0,
    x: obj.width - 368 * PIXI.ratio,
    y: startListening.y
  });
  stopListening.myAddChildFn(
    pText(PIXI, {
      content: "停止监听",
      fontSize: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: stopListening.width,
        containerHeight: stopListening.height
      }
    })
  );
  stopListening.onClickFn(() => {
    switchButtonState(
      { button: stopListening, enabled: false, color: 0xe9e9e9 },
      { button: startListening, enabled: true, color: 0x353535 }
    );
    callBack({
      status: "offCompassChange"
    });
  });
  stopListening.isTouchable(false);
  // 停止监听“按钮” 结束

  let run;
  startListening.onClickFn(
    (run = () => {
      switchButtonState(
        { button: startListening, enabled: false, color: 0xe9e9e9 },
        { button: stopListening, enabled: true, color: 0x353535 }
      );
      callBack({
        status: "onCompassChange",
        drawFn(res) {
          img.setRotation((~~res.direction * Math.PI) / 180);
          text.turnText(`${res.direction | 0}`);
          unit.setPositionFn({ x: text.x + text.width });
        }
      });
    })
  );

  // 切换“按钮”状态函数 开始
  function switchButtonState(...arr) {
    while (arr.length) {
      const item = arr.shift();
      item.button.isTouchable(item.enabled);
      item.button.turnColors({ border: { color: item.color } });
      item.button.children[0].children[0].turnColors(item.color);
    }
  }
  // 切换“按钮”状态函数 结束

  goBack.callBack = () => {
    switchButtonState(
      { button: stopListening, enabled: false, color: 0xe9e9e9 },
      { button: startListening, enabled: true, color: 0x353535 }
    );
    callBack({
      status: "offCompassChange"
    });
  };

  run();

  window.router.getNowPage(page => {
    page.reload = function() {
      run();
    };
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    prompt,
    imgContainer,
    startListening,
    stopListening,
    logo
  );
  app.stage.addChild(container);

  return container;
};
