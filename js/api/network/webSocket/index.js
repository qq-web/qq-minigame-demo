import view from './view';
import show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, (status, func) => {
        switch (status) {
            case 'connection':
                qq.showLoading({
                    title: '连接中...',
                    mask: true
                });
                qq.onSocketOpen(() => {
                    qq.hideLoading();
                    console.log('WebSocket 已连接');
                    show.Toast('Socket已连接', 'success', 1000);
                    func(); // 更新 UI
                });

                qq.onSocketClose(() => {
                    console.log('WebSocket 已断开');
                });

                qq.onSocketError(error => {
                    qq.hideLoading();
                    show.Modal(JSON.stringify(error), '发生错误');
                    console.error('socket error:', error);
                });

                // 监听服务器推送消息
                qq.onSocketMessage(message => {
                    show.Toast('收到服务器响应', 'success', 1000);
                    console.log('socket message:', message);
                });

                // 打开信道
                qq.connectSocket({
                    url: 'wss://echo.websocket.org'
                });
                break;
            case 'disconnect':
                qq.closeSocket({
                    success() {
                        show.Toast('Socket已断开', 'success', 1000);
                        func && func(); // 更新 UI
                    }
                });
                break;
            case 'sendMessage':
                qq.sendSocketMessage({
                    data: 'Hello, MiniGame!'
                });
                break;
        }
    });
};
