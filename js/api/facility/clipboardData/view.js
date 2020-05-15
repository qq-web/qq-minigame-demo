import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "剪贴板",
    apiName: "get/set/ClipboardData"
  });

  // let div;

  const clipboard = {
    Copy: Math.random()
      .toString(36)
      .substr(2),
    Paste: ""
  };
  const clipboardText = {
    Copy: "拷贝",
    Paste: "粘贴"
  };
  const divDeploy = {
    height: 0,
    border: {
      width: PIXI.ratio | 0,
      color: 0xe5e5e5
    },
    y: underline.height + underline.y + 80 * PIXI.ratio
  };
  const divContainer = new PIXI.Container();
  const divContainerChildArr = [];

  for (
    let i = 0, arr = Object.keys(clipboard), len = arr.length;
    i < len;
    i++
  ) {
    divContainerChildArr[i] = pBox(PIXI, {
      height: i ? 93 * PIXI.ratio : 87 * PIXI.ratio,
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
        content: clipboardText[arr[i]],
        fontSize: 34 * PIXI.ratio,
        x: 34 * PIXI.ratio,
        relative_middle: { containerHeight: divContainerChildArr[i].height }
      }),
      (clipboard[arr[i]] = pText(PIXI, {
        content: clipboard[arr[i]],
        fontSize: 34 * PIXI.ratio,
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
    width: div.width - 30 * PIXI.ratio,
    height: divDeploy.height - 2 * PIXI.ratio,
    x: 30 * PIXI.ratio
  });
  div.addChild(divContainer, divContainer.mask);

  // 复制 “按钮” 开始
  const copyButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: div.y + div.height + 90 * PIXI.ratio
  });
  copyButton.myAddChildFn(
    pText(PIXI, {
      content: "复制",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: copyButton.width,
        containerHeight: copyButton.height
      }
    })
  );

  // 复制 “按钮” 结束

  // 粘贴 “按钮” 开始
  const pasteButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: copyButton.y + copyButton.height + 20 * PIXI.ratio
  });
  pasteButton.myAddChildFn(
    pText(PIXI, {
      content: "粘贴",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: pasteButton.width,
        containerHeight: pasteButton.height
      }
    })
  );

  pasteButton.isTouchable(false);
  // 粘贴 “按钮” 结束

  // 更新字符串 “按钮” 开始
  const updateStringButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xebedf5,
    y: pasteButton.y + pasteButton.height + 20 * PIXI.ratio
  });
  updateStringButton.myAddChildFn(
    pText(PIXI, {
      content: "更新字符串",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: updateStringButton.width,
        containerHeight: updateStringButton.height
      }
    })
  );

  updateStringButton.isTouchable(false);
  // 更新字符串 “按钮” 结束

  // 切换“按钮”状态函数 开始
  function switchButtonState(buttonArr, color, boolead) {
    while (buttonArr.length) {
      const item = buttonArr.shift();
      item.isTouchable(boolead);
      item.children[0].children[0].turnColors(color);
    }
  }
  // 切换“按钮”状态函数 结束

  copyButton.onClickFn(() => {
    callBack({
      status: "setClipboardData",
      value: clipboard.Copy.text,
      drawFn() {
        !pasteButton.interactive &&
          switchButtonState([pasteButton, updateStringButton], 0x353535, true);
      }
    });
  });
  pasteButton.onClickFn(() => {
    callBack({
      status: "getClipboardData",
      drawFn(value) {
        clipboard.Paste.turnText(value);
      }
    });
  });
  updateStringButton.onClickFn(() => {
    clipboard.Copy.turnText(
      Math.random()
        .toString(36)
        .substr(2)
    );
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    div,
    copyButton,
    pasteButton,
    updateStringButton,
    logo
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
