import view from "./view";

const Image = qq.createImage();
const offScreenCanvas = qq.createCanvas();
const ctx = offScreenCanvas.getContext("2d");

Image.src = "images/someImage.png";
Image.onload = () => {
  offScreenCanvas.width = Image.width;
  offScreenCanvas.height = Image.height;
  ctx.drawImage(Image, 0, 0);
};
module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status, drawFn } = res;
    let base64;
    switch (status) {
      case "toDataURL":
        // 把画布内容转换为URL
        base64 = offScreenCanvas.toDataURL();
        qq.showModal({
          content: base64,
          title: "转换成功"
        });
        drawFn(base64);
        console.log(base64);
        break;
      default:
        break;
    }
  });
};
