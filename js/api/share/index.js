import view from "./view";

let hash = "";
// let btn = "";

qq.getLaunchOptionsSync(options => {
  console.log(`on launch`, JSON.stringify(options));
  if (options && options.entryDataHash) {
    hash = options.entryDataHash;
  }
});
qq.onShow(options => {
  console.log(`on show`, JSON.stringify(options));
  if (options && options.entryDataHash) {
    hash = options.entryDataHash;
    // btn && btn.color = 0xebedf5;
  } else {
    // btn && btn.color = 0xffffff;
  }
});

module.exports = function(PIXI, app, obj) {
  const { container } = view(PIXI, app, obj, data => {
    // btn = btnFastShare;
    const { status } = data;
    switch (status) {
      case "showShareMenu":
        qq.showShareMenu({
          showShareItems: ["qq", "qzone"],
          success: () => {
            console.log("success");
          },
          fail: e => {
            console.log(e);
          }
        });
        break;
      case "showShareMenuAll":
        qq.showShareMenu({
          showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
          success: () => {
            console.log("success");
          },
          fail: e => {
            console.log(e);
          }
        });
        break;
      case "fastShareList":
        console.log("fastShareList click");
        qq.shareAppMessage({
          imageUrl: canvas.toTempFilePathSync({
            x: 0,
            y: 0,
            width: canvas.width,
            height: (canvas.width * 4) / 5
          }),
          shareAppType: "qqFastShareList"
        });
        break;
      case "fastShare":
        doFastShare();
        break;
      default:
        break;
    }
  });

  function doFastShare() {
    if (hash) {
      console.log(`do fash share, entryDataHash:${hash}`);
      qq.shareAppMessage({
        imageUrl: canvas.toTempFilePathSync({
          x: 0,
          y: 0,
          width: canvas.width,
          height: (canvas.width * 4) / 5
        }),
        shareAppType: "qqFastShare",
        entryDataHash: hash
      });
    } else {
      console.log("btnFastShare clicked. no entryDataHash");
    }
  }

  return container;
};
