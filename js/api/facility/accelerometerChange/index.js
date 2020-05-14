import view from './view';
module.exports = function(PIXI, app, obj) {
    let monitorFunc;
    return view(PIXI, app, obj, data => {
        let { status, drawFn } = data;
        switch (status) {
            case 'onAccelerometerChange':
                // 开启获取加速度数据
                qq.startAccelerometer({
                    interval: 'game'
                });

                if (monitorFunc) return;

                // 监听加速度数据变化事件。
                qq.onAccelerometerChange(
                    (monitorFunc = res => {
                        drawFn(res); //绘制UI
                    })
                );
                break;
            case 'offAccelerometerChange':
                // 停止获取罗盘数据
                qq.stopAccelerometer();

                // 取消监听加速度数据变化事件。
                if (monitorFunc && qq.offAccelerometerChange) {
                    qq.offAccelerometerChange(monitorFunc);
                    monitorFunc = null;
                }
                break;
        }
    });
};
