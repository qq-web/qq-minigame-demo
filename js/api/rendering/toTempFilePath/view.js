import {
  pText,
  pLine,
  pImg,
  pBox,
  pButton,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "截图生成一个临时文件",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "toTempFilePath",
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const box = pBox(PIXI, {
    height: 372 * PIXI.ratio,
    y: underline.y + underline.height + 23 * PIXI.ratio
  });
  const img = pImg(PIXI, {
    width: 620 * PIXI.ratio,
    height: 224 * PIXI.ratio,
    src: "images/weapp.jpg",
    relative_middle: {
      containerWidth: box.width,
      containerHeight: box.height
    }
  });
  const button = pButton(PIXI, {
    width: 580 * PIXI.ratio,
    y: box.height + box.y + 80 * PIXI.ratio
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
  });
  let temporaryImg;

  box.addChild(img);

  // 截图生成一个临时文件 “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `截图生成一个临时文件`,
      fontSize: 36 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: button.width,
        containerHeight: button.height
      }
    })
  );
  button.onClickFn(() => {
    callBack({
      status: "toTempFilePath",
      deploy: {
        x: img.x,
        y: box.y + img.y,
        width: img.width,
        height: img.height
      },
      drawFn(res) {
        if (!temporaryImg) {
          temporaryImg = pImg(PIXI, {
            width: 492 * PIXI.ratio,
            height: ((492 * PIXI.ratio) / img.width) * img.height,
            src: res.tempFilePath,
            y: 150 * PIXI.ratio,
            relative_middle: { containerWidth: modalDetails.width }
          });
          modalDetails.addChild(temporaryImg);
        } else {
          temporaryImg.turnImg({ src: res.tempFilePath });
        }
        modalBox.showFn();
        button.isTouchable(false);
        goBack.isTouchable(false);
      }
    });
  });
  // 截图生成一个临时文件 “按钮” 结束

  // 模态对话框 开始
  let modalBox = pBox(PIXI, {
    height: obj.height,
    background: { color: 0x000000, alpha: 0.5 }
  });
  let modalDetails = pBox(PIXI, {
    width: 560 * PIXI.ratio,
    height: 503 * PIXI.ratio,
    y: (modalBox.height - 553 * PIXI.ratio) / 2
  });
  const modalButton = pButton(PIXI, {
    width: modalDetails.width,
    height: 100 * PIXI.ratio,
    parentWidth: modalDetails.width,
    border: { width: PIXI.ratio | 0, color: 0xd2d3d5 },
    y: 403 * PIXI.ratio,
    alpha: 0
  });
  modalDetails.mask = pBox(PIXI, {
    width: modalDetails.width,
    height: modalDetails.height,
    radius: 8 * PIXI.ratio,
    parentWidth: modalDetails.width
  });
  modalButton.myAddChildFn(
    pText(PIXI, {
      content: `确定`,
      fontSize: 36 * PIXI.ratio,
      fill: 0x02bb00,
      relative_middle: {
        containerWidth: modalButton.width,
        containerHeight: modalButton.height
      }
    })
  );
  modalButton.onClickFn(() => {
    modalBox.hideFn();
    button.isTouchable(true);
    goBack.isTouchable(true);
  });
  modalDetails.addChild(
    modalDetails.mask,
    pText(PIXI, {
      content: "截图成功",
      fontSize: 36 * PIXI.ratio,
      y: 57 * PIXI.ratio,
      relative_middle: { point: modalDetails.width / 2 }
    }),
    modalButton
  );
  modalBox.addChild(modalDetails);
  modalBox.hideFn();
  // 模态对话框 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    box,
    button,
    logo,
    logoName,
    modalBox
  );

  app.stage.addChild(container);

  return container;
};
