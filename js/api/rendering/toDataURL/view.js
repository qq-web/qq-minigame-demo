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
  const goBack = pGoBackBtn(PIXI, "delPage", () => {
    app.ticker.remove(rotatingFn);
  });
  const title = pText(PIXI, {
    content: "转换为URL",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "toDataURL",
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

  // 绘制三角形 start
  const circumscribedRadius =
    (((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6)) /
    (4 * (box.width / 4) * (Math.sqrt(3) * (box.width / 12)));

  const trilateral = new PIXI.Graphics();
  trilateral
    .beginFill(0x1aad19)
    .drawPolygon([
      -(Math.sqrt(3) * (box.width / 12)),
      box.width / 4 - circumscribedRadius,
      Math.sqrt(3) * (box.width / 12),
      box.width / 4 - circumscribedRadius,
      0,
      -circumscribedRadius
    ])
    .endFill();
  trilateral.position.set(box.width / 2, box.height / 2);
  trilateral.scale.set(1.15, 1.15);
  box.addChild(trilateral);

  let rotatingFn = (() => {
    let angle = 0;
    return () => {
      angle > 360 && (angle -= 360);
      angle += 5;
      trilateral.rotation = (angle * Math.PI) / 180;
    };
  })();
  app.ticker.add(rotatingFn);
  // 绘制三角形 end

  // 转换为URL “按钮” 开始
  button.myAddChildFn(
    pText(PIXI, {
      content: `转换为URL`,
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
      status: "toDataURL"
    });
  });
  // 转换为URL “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    box,
    button,
    logo,
    logoName
  );

  app.stage.addChild(container);

  return container;
};
