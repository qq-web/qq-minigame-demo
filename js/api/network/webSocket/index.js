import view from "./view";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, (status, func) => {
    switch (status) {
      case "connection":
        qq.showLoading({
          title: "连接中...",
          mask: true
        });
        qq.onSocketOpen(() => {
          qq.hideLoading();
          console.log("WebSocket 已连接");
          qq.showToast({
            title: "Socket已连接",
            icon: "success",
            duration: 1000
          });
          func(); // 更新 UI
        });

        qq.onSocketClose(() => {
          console.log("WebSocket 已断开");
        });

        qq.onSocketError(error => {
          qq.hideLoading();
          qq.showModal({
            content: JSON.stringify(error),
            title: "发生错误"
          });
          console.error("socket error:", error);
        });

        // 监听服务器推送消息
        qq.onSocketMessage(message => {
          qq.showToast({
            title: "收到服务器响应",
            icon: "success",
            duration: 1000
          });
          console.log("socket message:", message);
          func(message.data);
        });

        // 打开信道
        qq.connectSocket({
          url: "wss://echo.websocket.org"
        });
        break;
      case "disconnect":
        qq.closeSocket({
          success() {
            qq.showToast({
              title: "Socket已断开",
              icon: "success",
              duration: 1000
            });
            func && func(); // 更新 UI
          }
        });
        break;
      case "sendMessage":
        qq.sendSocketMessage({
          data: `Hello, MiniGame! msgid: ${Math.random()
            .toString(36)
            .substr(2)}`
        });
        break;
      default:
        break;
    }
  });
};
