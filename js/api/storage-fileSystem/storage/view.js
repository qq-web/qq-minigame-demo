import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "数据储存",
    apiName: "get/set/clear/Storage"
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

  const storage = {
    key: "miniGame",
    value: Math.random()
      .toString(36)
      .substr(2)
  };
  const divDeploy = {
    height: 0,
    y: underline.height + underline.y + 80 * PIXI.ratio
  };
  const divContainer = new PIXI.Container();
  const divContainerChildArr = [];

  for (let i = 0, arr = Object.keys(storage), len = arr.length; i < len; i++) {
    divContainerChildArr[i] = pBox(PIXI, {
      height: 112 * PIXI.ratio,
      border: {
        width: PIXI.ratio | 0,
        color: 0xebedf5
      },
      y:
        i &&
        divContainerChildArr[i - 1].height +
          divContainerChildArr[i - 1].y -
          (PIXI.ratio | 0)
    });

    divContainerChildArr[i].addChild(
      pText(PIXI, {
        content: arr[i],
        fontSize: 34 * PIXI.ratio,
        x: 32 * PIXI.ratio,
        fill: 0x03081a,
        relative_middle: { containerHeight: divContainerChildArr[i].height }
      }),
      (storage[arr[i]] = pText(PIXI, {
        content: storage[arr[i]],
        fontSize: 34 * PIXI.ratio,
        fill: 0xb0b3bf,
        relative_middle: {
          containerWidth: divContainerChildArr[i].width,
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
    width: div.width - 32 * PIXI.ratio,
    height: divDeploy.height - 2 * PIXI.ratio,
    x: 32 * PIXI.ratio
  });
  div.addChild(divContainer, divContainer.mask);

  // 存储数据 “按钮” 开始
  const setStorageButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: div.height + div.y + 40 * PIXI.ratio
  });
  setStorageButton.myAddChildFn(
    pText(PIXI, {
      content: `存储数据`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: setStorageButton.width,
        containerHeight: setStorageButton.height
      }
    })
  );
  setStorageButton.onClickFn(() => {
    callBack({
      status: "setStorage",
      key: storage.key.text,
      value: storage.value.text
    });
  });
  // 存储数据 “按钮” 结束

  // 读取数据 “按钮” 开始
  const getStorageButton = pButton(PIXI, {
    fill: 0x03081a,
    color: 0xffffff,
    width: 686 * PIXI.ratio,
    y: setStorageButton.height + setStorageButton.y + 20 * PIXI.ratio
  });
  getStorageButton.myAddChildFn(
    pText(PIXI, {
      content: `读取数据`,
      fill: 0x03081a,
      fontSize: 34 * PIXI.ratio,
      relative_middle: {
        containerWidth: getStorageButton.width,
        containerHeight: getStorageButton.height
      }
    })
  );
  getStorageButton.onClickFn(() => {
    callBack({ status: "getStorage", key: storage.key.text });
  });
  // 读取数据 “按钮” 结束

  // 清理数据 “按钮” 开始
  const clearStorageButton = pButton(PIXI, {
    fill: 0x03081a,
    color: 0xffffff,
    width: 686 * PIXI.ratio,
    y: getStorageButton.height + getStorageButton.y + 20 * PIXI.ratio
  });
  clearStorageButton.myAddChildFn(
    pText(PIXI, {
      content: `清理数据`,
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: clearStorageButton.width,
        containerHeight: clearStorageButton.height
      }
    })
  );
  clearStorageButton.onClickFn(() => {
    callBack({ status: "clearStorage" });
  });
  // 清理数据 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    div,
    setStorageButton,
    getStorageButton,
    clearStorageButton,
    logo
  );

  app.stage.addChild(container);

  return container;
};
