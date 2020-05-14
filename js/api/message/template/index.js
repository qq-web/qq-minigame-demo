import view from "./view";
import { formIdUrl, templateMessageUrl } from "../../../../config";
/* 
  https://q.qq.com/wiki/develop/game/server/open-port/port_module.html
  小游戏没有form组件，平台为了给小游戏提供消息下发能力，会在用户登录小游戏时通过开发者在管理端配置的回调地址
  给开发者推送formid以及用户的openid。一个用户7天内无论登录多少次，平台最多给开发者推送一次formid
  这里的逻辑是回调接口中接受到平台的推送后，将formId保存到memcache中，再通过此处读取出来。
  如果没有收到推送(距上次推送7天内)，或推送到回调地址的formid没有保存（至少需要保存7天），否则这个空档期无法再得到formId。
 */
function requestFormId(param, callback) {
  const { openId } = param;
  if (openId) {
    qq.request({
      url: formIdUrl,
      method: "POST",
      data: {
        openId
      },
      success(res) {
        console.log("拉取formId成功", res);
        callback(res.data.formId);
      },
      fail(res) {
        console.log("拉取formId失败", res);
      }
    });
  } else {
    console.log("openid不存在，无法获取formid");
  }
}

function sendTemplateMsg(param) {
  const { openId, formId } = param;
  qq.request({
    url: templateMessageUrl,
    method: "POST",
    data: {
      openId,
      formId,
      template_id: "34d019eaf049b047eaa599f0e0382dc9",
      page: "message/template/index",
      appType: "game",
      template_data: {
        keyword1: {
          value: "抽奖1次"
        },
        keyword2: {
          value: "温馨提示：记得下班前抽奖哦"
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
      case "getFormId":
        requestFormId({ openId: app.globalData.openId }, formId => {
          app.globalData.formId = formId;
          qq.showToast({
            title: `formId拉取成功:${formId}`,
            icon: "none",
            duration: 2000
          });
        });
        break;
      case "sendTemplateMsg":
        if (!app.globalData.formId) {
          console.log("formid不存在，请点击上方按钮获取");
        } else {
          sendTemplateMsg({
            openId: app.globalData.openId,
            formId: app.globalData.formId
          });
        }
        break;
      default:
        break;
    }
  });

  return _view.container;
};
