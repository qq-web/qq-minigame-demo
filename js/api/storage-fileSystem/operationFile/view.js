import { pButton, pText, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "operationFile",
    apiName: "write/read/append/copy/File&unlink"
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
  const pathBox = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    y: underline.height + underline.y + 80 * PIXI.ratio
  });
  const tipText = pText(PIXI, {
    content:
      "提示：如果文件不存在，就会先创建文件，再进行\n写入，这里我们创建的文件名是 hello.txt，而写入\n内容是 “hello, world” ",
    fontSize: 28 * PIXI.ratio,
    fill: 0x878b99,
    align: "center",
    lineHeight: 40 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const writeFileButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: pathBox.height + pathBox.y + 207 * PIXI.ratio
  });
  const readFileButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: writeFileButton.y + writeFileButton.height + 20 * PIXI.ratio
  });
  const appendFileButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: readFileButton.height + readFileButton.y + 20 * PIXI.ratio
  });
  const copyButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: appendFileButton.height + appendFileButton.y + 20 * PIXI.ratio
  });
  const unlinkButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: copyButton.height + copyButton.y + 20 * PIXI.ratio
  });

  let path;
  pathBox.addChild(
    pText(PIXI, {
      content: `路径`,
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: { containerHeight: pathBox.height }
    }),
    (path = pText(PIXI, {
      content: pathTextFn(),
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: pathBox.width,
        containerHeight: pathBox.height
      }
    }))
  );

  // 写文件 “按钮” 开始
  writeFileButton.myAddChildFn(
    pText(PIXI, {
      content: "写文件",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: writeFileButton.width,
        containerHeight: writeFileButton.height
      }
    })
  );
  writeFileButton.onClickFn(() => {
    callBack({
      status: "writeFile",
      drawFn() {
        path.turnText(pathTextFn("/hello.txt"));
        isVisibleFn(
          [readFileButton, appendFileButton, copyButton, unlinkButton],
          "showFn"
        );
      }
    });
  });
  // 写文件 “按钮” 结束

  // 读取文件内容 “按钮” 开始
  readFileButton.myAddChildFn(
    pText(PIXI, {
      content: "读取文件内容",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: readFileButton.width,
        containerHeight: readFileButton.height
      }
    })
  );
  readFileButton.onClickFn(() => {
    callBack({
      status: "readFile"
    });
  });
  // 读取文件内容 “按钮” 结束

  // 追加文件内容 “按钮” 开始
  appendFileButton.myAddChildFn(
    pText(PIXI, {
      content: "追加文件内容",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: appendFileButton.width,
        containerHeight: appendFileButton.height
      }
    })
  );
  appendFileButton.onClickFn(() => {
    callBack({
      status: "appendFile"
    });
  });
  // 追加文件内容 “按钮” 结束

  // 复制文件 “按钮” 开始
  copyButton.myAddChildFn(
    pText(PIXI, {
      content: "复制文件",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: copyButton.width,
        containerHeight: copyButton.height
      }
    })
  );
  copyButton.onClickFn(() => {
    callBack({
      status: "copyFile"
    });
  });
  // 复制文件 “按钮” 结束

  // 删除文件 “按钮” 开始
  unlinkButton.myAddChildFn(
    pText(PIXI, {
      content: "删除文件",
      fontSize: 36 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: unlinkButton.width,
        containerHeight: unlinkButton.height
      }
    })
  );
  unlinkButton.onClickFn(() => {
    callBack({
      status: "unlink",
      drawFn() {
        path.turnText(pathTextFn());
        isVisibleFn(
          [readFileButton, appendFileButton, copyButton, unlinkButton],
          "hideFn"
        );
      }
    });
  });
  // 删除文件 “按钮” 结束

  function isVisibleFn(arr, method) {
    for (let i = 0, len = arr.length; i < len; i++) {
      arr[i][method]();
    }
  }

  function pathTextFn(str) {
    return `${qq.env.USER_DATA_PATH}/fileA${str || ""}`;
  }

  isVisibleFn(
    [readFileButton, appendFileButton, copyButton, unlinkButton],
    "hideFn"
  );

  qq.getFileSystemManager().access({
    path: pathTextFn("/hello.txt"),
    success() {
      path.turnText(pathTextFn("/hello.txt"));
      isVisibleFn(
        [readFileButton, appendFileButton, copyButton, unlinkButton],
        "showFn"
      );
    }
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    pathBox,
    tipText,
    writeFileButton,
    readFileButton,
    appendFileButton,
    copyButton,
    unlinkButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
