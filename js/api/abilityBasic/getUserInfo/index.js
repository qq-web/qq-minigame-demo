import view from "./view";
import show from "../../../libs/show";

const { windowWidth } = qq.getSystemInfoSync();

function getLogicPixel(cssPixel) {
  return (cssPixel / 750) * windowWidth;
}

module.exports = function(PIXI, app, obj) {
  let userInfoButton = null;
  return view(PIXI, app, obj, data => {
    switch (data.status) {
      case "createUserInfoButton":
        // 调用qq.createUserInfoButton(),返回一个“用户信息按钮”对象
        userInfoButton = qq.createUserInfoButton({
          type: "text",
          text: "获取用户信息",
          style: {
            left: data.left,
            top: data.top,
            width: data.width,
            height: data.height,
            lineHeight: data.height,
            backgroundColor: "#00cafc",
            color: "#ffffff",
            textAlign: "center",
            fontSize: getLogicPixel(34),
            borderRadius: getLogicPixel(12)
          }
        });
        userInfoButton.onTap(res => {
          if (res.errMsg === "getUserInfo:fail auth deny")
            return show.Modal("用户不授权是无法获取到用户信息的", "授权失败");

          qq.getUserInfo({
            success(r) {
              show.Toast("获取成功", "success", 1000);
              data.drawFn(r.userInfo); // 绘制UI
              console.log(r);
            }
          });
        });

        break;
      case "destroyUserInfoButton":
        // 销毁对象
        userInfoButton && userInfoButton.destroy();
        break;
      default:
        break;
    }
  });
};
