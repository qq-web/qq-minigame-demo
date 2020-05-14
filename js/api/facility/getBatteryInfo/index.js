import view from './view';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, drawFn } = data;
        switch (status) {
            case 'getBatteryInfo':
                // 获取设备电量。
                qq.getBatteryInfo({
                    success(res) {
                        console.log(res);
                        drawFn(res); //绘制UI
                    }
                });
                break;
        }
    });
};
