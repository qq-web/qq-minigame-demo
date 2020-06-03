import view from "./view";

module.exports = function(PIXI, app, obj) {
  let innerAudioContext;
  const removeEventFn = () => {
    // 取消监听音频播放进度更新事件
    innerAudioContext.offTimeUpdate();
    // 取消监听音频自然播放至结束的事件
    innerAudioContext.offEnded();

    innerAudioContext.isInterruption = false;
  };
  const interruptionFn = () => {
    // 阻止多次调用
    if (interruptionFn.isRun) return;
    interruptionFn.isRun = true;

    let rebooting;
    new Promise(resolve => {
      rebooting = resolve;

      // 监听音频中断结束事件
      qq.onAudioInterruptionEnd(rebooting);

      // 兼容安卓 Android 系统不兼容情况
      qq.onShow(rebooting);
    })
      .then(() => {
        interruptionFn.isRun = false;

        wx.offShow(rebooting);
        wx.offAudioInterruptionEnd(rebooting);

        if (innerAudioContext.isInterruption) {
          // 播放音频
          innerAudioContext.play();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return view(PIXI, app, obj, (status, drawFn) => {
    switch (status) {
      case "createInnerAudioContext":
        // 创建内部 audio 上下文 InnerAudioContext 对象。
        innerAudioContext = qq.createInnerAudioContext();
        innerAudioContext.src =
          "http://down.qq.com/qzone/demo_music/%E3%80%8A%E5%85%A8%E6%96%B0%E5%87%BA%E5%8F%91%E3%80%8BFN%20MMO.mp3";
        // 监听因加载音频来源所发生的错误
        innerAudioContext.onError(res => {
          qq.showModal({
            content: {
              10001: "系统错误",
              10002: "网络错误",
              10003: "文件错误",
              10004: "格式错误",
              "-1": "未知错误"
            }[res.errCode]
          });
        });
        // 监听音频暂停事件
        innerAudioContext.onPause(interruptionFn);

        break;

      case "play":
        // 开始播放
        innerAudioContext.play();
        // 监听音频播放进度更新事件
        innerAudioContext.onTimeUpdate(function() {
          drawFn(
            "upDate",
            innerAudioContext.duration,
            innerAudioContext.currentTime
          ); // 更新ui
        });
        // 监听音频自然播放至结束的事件
        innerAudioContext.onEnded(function() {
          drawFn("ended", innerAudioContext.duration); // 更新ui
          removeEventFn();
        });
        innerAudioContext.isInterruption = true;
        drawFn("play"); // 更新ui
        break;

      case "pause":
        // 暂停播放
        innerAudioContext.pause();
        removeEventFn();

        break;

      case "stop":
        // 终止播放
        innerAudioContext.stop();
        removeEventFn();
        break;
      case "destroy":
        break;
      default:
        break;
    }
  });
};
