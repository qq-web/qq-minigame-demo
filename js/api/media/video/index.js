import view from "./view";
import * as errMsgObj from "../../../errMsg/index";

module.exports = function(PIXI, app, obj) {
  let video;
  return view(PIXI, app, obj, res => {
    const { status, data } = res;
    switch (status) {
      case "createVideo":
        // 调起视频控件
        video = qq.createVideo({
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
          // 显示默认的视频控件
          controls: true,
          enablePlayGesture: true,
          // 传入
          src: "https://down.qq.com/qzone/demo_music/185.mp4"
        });
        video.onError(e => {
          for (
            let i = 0, errMsglist = Object.keys(errMsgObj);
            i < errMsglist.length;
            i++
          ) {
            if (e.errMsg.includes(errMsglist[i])) {
              errMsgObj[errMsglist[i]]({
                callback(err) {
                  qq.showModal({
                    content: err,
                    title: "发生错误"
                  });
                }
              });
              break;
            }
          }
        });
        video.onEnded(() => {
          qq.showToast({
            title: "播放结束",
            icon: "success",
            duration: 1000
          });
        });
        video.onPause(() => {
          qq.showToast({
            title: "暂停成功",
            icon: "success",
            duration: 1000
          });
        });
        video.onPlay(() => {
          qq.showToast({
            title: "播放成功",
            icon: "success",
            duration: 1000
          });
        });
        video.onWaiting(() => {
          qq.showToast({
            title: "视频缓冲中",
            icon: "success",
            duration: 1000
          });
        });
        break;
      case "destroy": // 销毁当前视频控件
        video.destroy();
        break;
      default:
        break;
    }
  });
};
