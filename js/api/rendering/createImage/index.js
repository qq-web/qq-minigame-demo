import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, res => {
    const { status, drawFn } = res;
    let img;
    switch (status) {
      case "createImage":
        img = qq.createImage();
        qq.showModal({
          content: `已创建成功，确认后进行加载图片`,
          title: "创建成功",
          success(response) {
            if (response.confirm) {
              img.src = "images/someImage.png";
              img.onload = () => {
                drawFn(img);
              };
            }
          }
        });
        break;
      default:
        break;
    }
  });
};
