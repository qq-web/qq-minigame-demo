import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "电量",
    apiName: "getBatteryInfo"
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

  const batteryInfo = {
    level: "当前电量",
    isCharging: "当前电池状态"
  };
  const divDeploy = {
    height: 0,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.height + underline.y + 75 * PIXI.ratio
  };
  const divContainer = new PIXI.Container();
  const divContainerChildArr = [];

  for (
    let i = 0, arr = Object.keys(batteryInfo), len = arr.length;
    i < len;
    i++
  ) {
    divContainerChildArr[i] = pBox(PIXI, {
      height: 112 * PIXI.ratio,
      border: {
        width: PIXI.ratio | 0,
        color: 0xe5e5e5
      },
      y: i
        ? divContainerChildArr[i - 1].height +
          divContainerChildArr[i - 1].y -
          (PIXI.ratio | 0)
        : 0
    });

    divContainerChildArr[i].addChild(
      pText(PIXI, {
        content: batteryInfo[arr[i]],
        fontSize: 34 * PIXI.ratio,
        fill: 0x03081e,
        x: 32 * PIXI.ratio,
        relative_middle: { containerHeight: divContainerChildArr[i].height }
      }),
      (batteryInfo[arr[i]] = pText(PIXI, {
        content: "未获取",
        fontSize: 28 * PIXI.ratio,
        fill: 0xb0b3bf,
        x: 634 * PIXI.ratio,
        relative_middle: {
          containerHeight: divContainerChildArr[i].height
        }
      }))
    );
  }

  divDeploy.height =
    divContainerChildArr[divContainerChildArr.length - 1].y +
    divContainerChildArr[divContainerChildArr.length - 1].height;

  const div = pBox(PIXI, divDeploy);
  divContainer.addChild(...divContainerChildArr);
  divContainer.mask = pBox(PIXI, {
    width: div.width - 30 * PIXI.ratio,
    height: divDeploy.height - 2 * PIXI.ratio,
    x: 30 * PIXI.ratio
  });
  div.addChild(divContainer, divContainer.mask);

  // 获取手机电池状态“按钮” 开始
  const getBatteryInfoBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: div.height + div.y + 40 * PIXI.ratio
  });
  getBatteryInfoBtn.addChild(
    pText(PIXI, {
      content: "获取手机电池状态",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getBatteryInfoBtn.width,
        containerHeight: getBatteryInfoBtn.height
      }
    })
  );
  getBatteryInfoBtn.onClickFn(() => {
    callBack({
      status: "getBatteryInfo",
      drawFn(data) {
        for (
          let i = 0, arr = Object.keys(batteryInfo), len = arr.length;
          i < len;
          i++
        ) {
          // batteryInfo[arr[i]].turnColors(0x000000);
          if (typeof data[arr[i]] === "boolean") {
            batteryInfo[arr[i]].turnText(data[arr[i]] ? "充电中" : "耗电中");
            continue;
          }
          batteryInfo[arr[i]].turnText(`${data[arr[i]]}%`);
        }
      }
    });
  });
  // 获取手机电池状态“按钮” 结束

  // 清空“按钮” 开始
  const emptyBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    color: 0xffffff,
    y: getBatteryInfoBtn.height + getBatteryInfoBtn.y + 20 * PIXI.ratio
  });
  emptyBtn.addChild(
    pText(PIXI, {
      content: "清空",
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: emptyBtn.width,
        containerHeight: emptyBtn.height
      }
    })
  );
  emptyBtn.onClickFn(() => {
    for (
      let i = 0, arr = Object.keys(batteryInfo), len = arr.length;
      i < len;
      i++
    ) {
      batteryInfo[arr[i]].turnColors(0xb0b3bf);
      batteryInfo[arr[i]].turnText("未获取");
    }
  });
  // 清空“按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    div,
    getBatteryInfoBtn,
    emptyBtn,
    logo
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
