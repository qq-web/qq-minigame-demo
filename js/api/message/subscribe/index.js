import view from "./view";
import { subscribeMessageUrl } from "../../../../config";

function sendSubscribeMsg(param) {
  const { openId } = param;
  qq.request({
    url: subscribeMessageUrl,
    method: "POST",
    data: {
      openId,
      template_id: "d9193533d13f72668e41fb96adeca921",
      page: "message/subscribe/index",
      appType: "game",
      template_data: {
        keyword1: {
          value: "贪玩蓝月"
        },
        keyword2: {
          value: `${new Date()}`
        },
        keyword3: {
          value: "大家吼，我是渣渣辉，是兄弟就来砍我"
        }
      }
    },
    success(result) {
      let msg = "发送成功";
      console.log("======", result);
      if (result.data.code || result.data.errcode) {
        // errorcode不为0
        console.log(result.data);
        msg = "发送失败，请看Log";
      }

      qq.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    fail(e) {
      console.log(e);
    }
  });
}

module.exports = function(PIXI, app, obj) {
  const _view = view(PIXI, app, obj, data => {
    const { status } = data;
    switch (status) {
      case "getAuthorization":
        qq.subscribeAppMsg({
          subscribe: true,
          success(res) {
            console.log("----subscribeAppMsg----success", res);
            qq.showToast({
              title: "授权成功",
              icon: "success",
              duration: 2000
            });
          },
          fail(res) {
            console.log("----subscribeAppMsg----fail", res);
          }
        });
        break;

      case "sendSubscribeMsg":
        if (!app.globalData.openId) {
          console.log("openId不存在，请重启");
        } else {
          sendSubscribeMsg({
            openId: app.globalData.openId
          });
        }
        break;
      default:
        break;
    }
  });

  return _view.container;
};
