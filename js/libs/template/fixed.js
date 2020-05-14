import { pGoBackBtn, pLine, pText, pImg } from "../component/index";

module.exports = function(PIXI, { obj, title, apiName, underline = true }) {
  const goBack = pGoBackBtn(PIXI, "navigateBack");

  title &&
    (title = pText(PIXI, {
      content: title,
      fontSize: 36 * PIXI.ratio,
      fill: 0x000000,
      y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
      relative_middle: { containerWidth: obj.width }
    }));

  apiName &&
    (apiName = pText(PIXI, {
      content: apiName,
      fontSize: 28 * PIXI.ratio,
      fill: 0xb0b3bf,
      lineHeight: 40 * PIXI.ratio,
      y: title.height + title.y + 78 * PIXI.ratio,
      relative_middle: { containerWidth: obj.width }
    }));

  underline &&
    (underline = pLine(
      PIXI,
      {
        width: PIXI.ratio * 2,
        color: 0xebedf5
      },
      [
        (obj.width - 150 * PIXI.ratio) / 2,
        apiName.y + apiName.height + 24 * PIXI.ratio
      ],
      [150 * PIXI.ratio, 0]
    ));

  const logo = pImg(PIXI, {
    width: 205 * PIXI.ratio,
    height: 40 * PIXI.ratio,
    x: (obj.width - 205 * PIXI.ratio) / 2,
    y: obj.height - 60 * PIXI.ratio,
    src: "images/bottom_logo.png"
  });

  return {
    goBack,
    title,
    apiName,
    underline,
    logo
  };
};
