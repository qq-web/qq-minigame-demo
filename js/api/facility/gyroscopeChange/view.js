import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "监听陀螺仪数据",
    apiName: "on/off/GyroscopeChange"
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

  const div = pBox(PIXI, {
    height: 392 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: `X轴的角速度：${0} °/s\nY轴的角速度：${0} °/s\nZ轴的角速度：${0} °/s`,
    fontSize: 28 * PIXI.ratio,
    align: "center",
    fill: 0x03081a,
    y: 105 * PIXI.ratio,
    lineHeight: 68 * PIXI.ratio,
    relative_middle: { containerWidth: div.width }
  });

  div.addChild(text);

  // 开始监听“按钮” 开始
  const startListening = pButton(PIXI, {
    width: 336 * PIXI.ratio,
    height: 78 * PIXI.ratio,
    radius: 12 * PIXI.ratio,
    color: 0xffffff,
    x: 32 * PIXI.ratio,
    y: div.height + div.y + 438 * PIXI.ratio
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
    x: obj.width - 368 * PIXI.ratio,
    y: startListening.y
  });
  stopListening.myAddChildFn(
    pText(PIXI, {
      content: "停止监听",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: stopListening.width,
        containerHeight: stopListening.height
      }
    })
  );

  stopListening.isTouchable(false);
  // 停止监听“按钮” 结束

  // 切换“按钮”状态函数 开始
  function switchButtonState(...arr) {
    while (arr.length) {
      const item = arr.shift();
      item.button.isTouchable(item.boolead);
      item.button.turnColors({ border: { color: item.color } });
      item.button.children[0].children[0].turnColors(item.color);
    }
  }
  // 切换“按钮”状态函数 结束

  let run;
  startListening.onClickFn(
    (run = () => {
      switchButtonState(
        { button: startListening, boolead: false, color: 0xe9e9e9 },
        { button: stopListening, boolead: true, color: 0x353535 }
      );
      callBack({
        status: "onGyroscopeChange",
        drawFn(res) {
          text.turnText(
            `X轴的角速度：${res.x.toFixed(3)} °/s\nY轴的角速度：${res.y.toFixed(
              3
            )} °/s\nZ轴的角速度：${res.z.toFixed(3)} °/s`
          );
        }
      });
    })
  );

  stopListening.onClickFn(() => {
    switchButtonState(
      { button: stopListening, boolead: false, color: 0xe9e9e9 },
      { button: startListening, boolead: true, color: 0x353535 }
    );
    callBack({
      status: "offGyroscopeChange"
    });
  });

  goBack.callBack = () => {
    switchButtonState(
      { button: stopListening, boolead: false, color: 0xe9e9e9 },
      { button: startListening, boolead: true, color: 0x353535 }
    );
    callBack({
      status: "offGyroscopeChange"
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
    div,
    startListening,
    stopListening,
    logo
  );
  app.stage.addChild(container);

  return container;
};
