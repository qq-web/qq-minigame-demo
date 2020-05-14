import view from "./view";

module.exports = function(PIXI, app, obj) {
  let btnAddFriend;

  const _view = view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "getAuthorization":
        // QQ登录
        qq.authorize({
          scope: "setting.addFriend",
          success() {
            qq.showToast({
              title: "授权成功",
              icon: "success",
              duration: 2000
            });
          },
          fail(e) {
            console.error(e);
          }
        });
        break;
      case "close":
        btnAddFriend && btnAddFriend.destroy();
        break;
      default:
        break;
    }
  });

  const { windowWidth } = qq.getSystemInfoSync();
  // 这里的windowWidth返回的宽度，单位是逻辑像素。
  // 在view里pixi用的是物理像素。物理像素 = 逻辑像素 * pixelRatio
  // PIXI.ratio = (windowWidth * pixelRatio) / 750; //PIXI.ratio相当于物理像素与视觉稿的比例

  // createAddFriendButton这里用的是逻辑像素。
  // 设计稿使用的是css像素（设计稿的windowWidth是750,而实际的windowWidth是360）
  // 所以用这个函数转换逻辑像素。
  function getLogicPixel(cssPixel) {
    return (cssPixel / 750) * windowWidth;
  }

  btnAddFriend = qq.createAddFriendButton({
    type: "text",
    text: "添加好友",
    style: {
      left: getLogicPixel(32),
      top: getLogicPixel(
        (_view.button1.y + _view.button1.height + 20) / PIXI.ratio
      ),
      width: getLogicPixel(686),
      height: getLogicPixel(90),
      lineHeight: getLogicPixel(90), // lineHeight不生效，可能客户端还有bug
      backgroundColor: "#00CAFC",
      color: "#ffffff",
      textAlign: "center",
      fontSize: getLogicPixel(34),
      borderRadius: 12
    },
    openid: "4AEA1DEC978CBB69EAE04B502EF27A0B" // 好友的openid
  });

  btnAddFriend.onTap(() => {
    console.log("add friend button clicked");
  });

  return _view.container;
};
