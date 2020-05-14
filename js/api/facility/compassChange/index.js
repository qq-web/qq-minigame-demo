import view from './view';
module.exports = function(PIXI, app, obj) {
    let monitorFunc;
    return view(PIXI, app, obj, data => {
        let { status, drawFn } = data;
        switch (status) {
            case 'onCompassChange':
                // 开启获取罗盘数据
                qq.startCompass({
                    interval: 'game'
                });

                if (monitorFunc) return;

                // 监听设备方向变化事件。
                qq.onCompassChange(
                    (monitorFunc = res => {
                        drawFn(res); //绘制UI
                    })
                );
                break;
            case 'offCompassChange':
                // 停止获取罗盘数据
                qq.stopCompass();

                // 取消监听设备方向变化事件。
                if (monitorFunc && qq.offCompassChange) {
                    qq.offCompassChange(monitorFunc);
                    monitorFunc = null;
                }
                break;
        }
    });
};
