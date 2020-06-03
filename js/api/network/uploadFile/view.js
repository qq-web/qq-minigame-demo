import { pBox, pLine, pText, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "上传文件",
    apiName: "uploadFile"
  });
  const bg = new PIXI.Graphics();
  container.addChild(bg);
  bg.beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const box = pBox(PIXI, {
    y: underline.y + underline.height + 80 * PIXI.ratio,
    height: 296 * PIXI.ratio
  });
  const boxChild = new PIXI.Container();

  let sprite = null;

  // boxChild.y = -20 * PIXI.ratio;
  boxChild.addChild(
    pLine(
      PIXI,
      {
        width: 4 * PIXI.ratio,
        color: 0xb0b3bf
      },
      [335 * PIXI.ratio, 119 * PIXI.ratio],
      [80 * PIXI.ratio, 0]
    ),
    pLine(
      PIXI,
      {
        width: 4 * PIXI.ratio,
        color: 0xb0b3bf
      },
      [375 * PIXI.ratio, 81 * PIXI.ratio],
      [0, 80 * PIXI.ratio]
    ),
    pText(PIXI, {
      content: "选择图片",
      fontSize: 28 * PIXI.ratio,
      fill: 0xb0b3bf,
      y: 181 * PIXI.ratio,
      relative_middle: { containerWidth: box.width }
    })
  );

  box.addChild(boxChild);
  box.onClickFn(() => {
    box.interactive = false;
    qq.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album"],
      success(res) {
        console.log("chooseImage success, temp path is", res.tempFilePaths[0]);
        const imageSrc = res.tempFilePaths[0];
        callBack(imageSrc, bool => {
          if (bool) {
            PIXI.loader.reset(); // ios版本每次选择同一图片文件名相同。如果重复选择同名图片，不reset会因加载同名资料而出错。
            PIXI.loader.add(imageSrc).load(() => {
              let width;
              let height;
              sprite = pImg(PIXI, {
                src: imageSrc,
                is_PIXI_loader: true,
                y: -PIXI.ratio | 0
              });
              if (sprite.width > sprite.height) {
                ({ width } = box);
                height = (width * sprite.height) / sprite.width;
                if (box.height / height < 1) {
                  width = (box.height * width) / height;
                  height = box.height - ~~PIXI.ratio * 3;
                }
              } else {
                width = (box.height * sprite.width) / sprite.height;
                height = box.height - ~~PIXI.ratio * 3;
              }
              sprite.width = width;
              sprite.height = height;
              sprite.setPositionFn({
                relative_middle: {
                  containerWidth: box.width,
                  containerHeight: box.height
                }
              });
              boxChild.visible = false;
              box.addChild(sprite);
            });
            return;
          }
          box.interactive = true;
        });
      },
      fail({ errMsg }) {
        box.interactive = true;
        console.log("chooseImage fail, err is", errMsg);
      }
    });
  });

  container.addChild(goBack, title, apiName, underline, box, logo);

  app.stage.addChild(container);

  return container;
};
