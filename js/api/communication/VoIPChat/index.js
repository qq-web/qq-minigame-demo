import view from "./view";
import hmacSHA256 from "../../../libs/crypto-js/hmac-sha256";
import { openIdUrl } from "../../../../config";

// const GroupId = "DEMO_156802202";
const appId = 1110325033;
let sessionKey;

// 指定大小写字母和数据为字符集
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// 返回指定长度的随机字符串
function genNonceStr(length = 32) {
  const max = CHARS.length;
  let nonce = "";
  for (let i = 0; i < length; i++) {
    nonce += CHARS.charAt(Math.floor(Math.random() * max));
  }
  return nonce;
}

let scopeRecord;
function authorization(callBack) {
  if (scopeRecord) return callBack(); // 下一次调用时，有授权直接回调

  qq.getSetting({
    success(res) {
      scopeRecord = res.authSetting["scope.record"];

      if (scopeRecord) return callBack(); // 首次调用时，有授权直接回调

      // 调起api触发授权弹窗
      qq.authorize({
        scope: "scope.record",
        success() {
          scopeRecord = true;
          callBack();
        },
        fail() {
          qq.hideLoading();
          scopeRecord = false;
          qq.showModal({
            title: "授权失败",
            content: "没有授权是无法加入 (创建) 实时语音通话"
          });
          window.router.delPage();
        }
      });
    }
  });
}

// 加入会话需要签名验证
// https://q.qq.com/wiki/develop/game/API/media/voip.html#joinvoipchat
function getSignature(groupId, nonceStr, timeStamp) {
  const signature = hmacSHA256(
    [appId, groupId, nonceStr, timeStamp].sort().join(""),
    sessionKey
  );
  return signature.toString();
}

function delNowPageFn(res) {
  window.router.delPage();
  setTimeout(() => {
    const { query } = window;
    window.router.navigateTo(query.pathName, query);
  }, 0);
  console.log("onVoIPChatInterrupted：", res);
}

function getSessionKey(callback) {
  qq.login({
    success(data) {
      qq.request({
        url: openIdUrl,
        method: "POST",
        data: {
          js_code: data.code,
          appType: "game"
        },
        success(res) {
          if (res.data.errcode === 0) {
            console.log("拉取用户session_key成功:", res.data.session_key);
            sessionKey = res.data.session_key;
            callback();
          } else {
            console.log(
              "拉取用户session_key失败，将无法正常使用开放接口等服务",
              res.data
            );
          }
        },
        fail(res) {
          console.log(
            "拉取用户session_key失败，将无法正常使用开放接口等服务",
            res
          );
          qq.showToast({
            title: "拉取用户session_key失败，请看log",
            icon: "none",
            duration: 2000
          });
        }
      });
    },
    fail(e) {
      console.log(e);
    }
  });
}

function joinVoIPChat({ groupId, muteConfig, callback }) {
  authorization(() => {
    getSessionKey(() => {
      const nonceStr = String(genNonceStr(18));
      const timeStamp = Number(String(Number(new Date())).substring(0, 10));
      const signature = getSignature(groupId, nonceStr, timeStamp);
      qq.joinVoIPChat({
        signature,
        nonceStr,
        timeStamp,
        groupId,
        muteConfig,
        success: callback,
        fail: e => {
          console.log(e);
        }
      });
    });
  });
}

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, data => {
    let { groupId, muteMicrophone, muteEarphone } = data;
    const { status, drawFn, reEnter, drawRoomNumFn } = data;

    function listeningFn() {
      // 监听实时语音通话成员在线状态变化事件。有成员加入/退出通话时触发回调
      qq.onVoIPChatMembersChanged(res => {
        console.log(res.openIdList);
        drawRoomNumFn(res.openIdList.length);
      });
      // 监听被动断开实时语音通话事件。包括小游戏切入后端时断开
      qq.onVoIPChatInterrupted(delNowPageFn);

      window.query = {
        pathName: window.router.getNowPageName(),
        roomName: groupId,
        reEnter: "返到当前房间"
      };
    }

    switch (status) {
      // 加入 (创建) 实时语音通话
      case "joinVoIPChat":
        // 判断groupId是否存在，不存在就创建房间否则进入房间
        if (!groupId) {
          qq.showLoading({ title: "正在创建房间" });

          groupId = `room_demo_${Math.random()
            .toString(36)
            .substr(2)}`;
          // groupId = GroupId;

          joinVoIPChat({
            groupId,
            muteConfig: { muteMicrophone, muteEarphone },
            callback: r => {
              qq.hideLoading();
              console.log(r);
              if (r.errCode) window.router.delPage();
              else {
                drawFn(r, groupId); // 更新UI
                listeningFn();
              }
            }
          });
        } else {
          qq.showLoading({ title: reEnter || "正在进入房间", mask: true });

          // 先获取有效 签名signature
          joinVoIPChat({
            groupId,
            muteConfig: { muteMicrophone, muteEarphone },
            callback: r => {
              qq.hideLoading();
              console.log(r);
              if (r.errCode) window.router.delPage();
              else {
                drawFn(r, groupId); // 更新UI
                listeningFn();
              }
            }
          });
        }
        break;
      case "shareAppMessage":
        qq.shareAppMessage({
          title: `快来加入我发起的语言对话房间`,
          imageUrl: canvas.toTempFilePathSync({
            x: 0,
            y: 0,
            width: canvas.width,
            height: (canvas.width * 4) / 5
          }),
          query: `pathName=${window.router.getNowPageName()}&roomName=${groupId}`
        });
        break;
      case "exitVoIPChat":
        // 退出（销毁）实时语音通话
        qq.showToast({ title: "你已退出房间" });

        qq.exitVoIPChat();

        window.query = null;
        break;
      case "updateVoIPChatMuteConfig":
        // 更新实时语音设置
        if (typeof muteMicrophone !== "undefined")
          muteMicrophone = { muteMicrophone };
        if (typeof muteEarphone !== "undefined")
          muteEarphone = { muteEarphone };

        qq.updateVoIPChatMuteConfig({
          muteConfig: { ...muteMicrophone, ...muteEarphone },
          success() {
            drawFn(); // 绘制UI
          }
        });
        break;
      default:
        break;
    }
  });
};
