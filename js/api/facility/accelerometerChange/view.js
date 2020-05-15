import { pButton, pText, pCircle } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "重力感应",
    apiName: "on/off/AccelerometerChange"
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
    content: `倾斜手机即可移动下方小球`,
    fontSize: 28 * PIXI.ratio,
    fill: 0xb0b3bf,
    y: underline.y + underline.height + 100 * PIXI.ratio,
    relative_middle: {
      containerWidth: obj.width
    }
  });
  const circle = pCircle(PIXI, {
    radius: 270 * PIXI.ratio,
    x: obj.width / 2,
    y: prompt.y + prompt.height + 336.5 * PIXI.ratio
  });
  const childCircle = pCircle(PIXI, {
    radius: 18 * PIXI.ratio,
    background: {
      color: 0x00cafc
    }
  });
  const text = {
    x: pText(PIXI, {
      content: `X：0`,
      fontSize: 28 * PIXI.ratio,
      fill: 0x4a4a4a,
      y: circle.height / 2 + circle.y + 100 * PIXI.ratio,
      relative_middle: {
        point: obj.width / 5
      }
    })
  };

  circle.addChild(childCircle);

  text.y = pText(PIXI, {
    content: `Y：0`,
    fontSize: 28 * PIXI.ratio,
    fill: 0x4a4a4a,
    y: text.x.y,
    relative_middle: {
      point: obj.width / 2
    }
  });
  text.z = pText(PIXI, {
    content: `Z：0`,
    fontSize: 28 * PIXI.ratio,
    fill: 0x4a4a4a,
    y: text.x.y,
    relative_middle: {
      point: (4 * obj.width) / 5
    }
  });

  // 开始监听“按钮” 开始
  const startListening = pButton(PIXI, {
    width: 336 * PIXI.ratio,
    height: 78 * PIXI.ratio,
    radius: 12 * PIXI.ratio,
    color: 0xffffff,
    x: 32 * PIXI.ratio,
    y: circle.height / 2 + circle.y + 189 * PIXI.ratio
  });
  startListening.myAddChildFn(
    pText(PIXI, {
      content: "开始监听",
      fontSize: 32 * PIXI.ratio,
      fill: 0x353535,
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
    radius: 10 * PIXI.ratio,
    color: 0xffffff,
    x: obj.width - 368 * PIXI.ratio,
    y: startListening.y
  });
  stopListening.myAddChildFn(
    pText(PIXI, {
      content: "停止监听",
      fontSize: 32 * PIXI.ratio,
      fill: 0xe9e9e9,
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
      item.button.isTouchable(item.enabled);
      item.button.turnColors({
        border: {
          color: item.color
        }
      });
      item.button.children[0].children[0].turnColors(item.color);
    }
  }
  // 切换“按钮”状态函数 结束

  let run;
  startListening.onClickFn(
    (run = () => {
      switchButtonState(
        {
          button: startListening,
          enabled: false,
          color: 0xe9e9e9
        },
        {
          button: stopListening,
          enabled: true,
          color: 0x353535
        }
      );
      callBack({
        status: "onAccelerometerChange",
        drawFn(res) {
          for (
            let i = 0, arr = Object.keys(res), len = arr.length;
            i < len;
            i++
          )
            text[arr[i]].turnText(
              `${arr[i].toLocaleUpperCase()}：${res[arr[i]].toFixed(2)}`
            );

          const x = childCircle.x + res.x * 20 * PIXI.ratio;
          const y = childCircle.y - res.y * 20 * PIXI.ratio;
          if (
            Math.sqrt(x ** 2 + y ** 2) <=
            (circle.width - childCircle.width) / 2
          )
            childCircle.setPositionFn({
              x,
              y
            });
        }
      });
    })
  );

  stopListening.onClickFn(() => {
    switchButtonState(
      {
        button: stopListening,
        enabled: false,
        color: 0xe9e9e9
      },
      {
        button: startListening,
        enabled: true,
        color: 0x353535
      }
    );
    callBack({
      status: "offAccelerometerChange"
    });
  });

  goBack.callBack = () => {
    switchButtonState(
      {
        button: stopListening,
        enabled: false,
        color: 0xe9e9e9
      },
      {
        button: startListening,
        enabled: true,
        color: 0x353535
      }
    );
    callBack({
      status: "offAccelerometerChange"
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
    circle,
    text.x,
    text.y,
    text.z,
    startListening,
    stopListening,
    logo
  );
  app.stage.addChild(container);

  return container;
};
