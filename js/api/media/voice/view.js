import { pImg, pText } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "录音",
    apiName: "RecorderManager、InnerAudioContext"
  });
  const totalTime = pText(PIXI, {
    content: "00:00:00",
    fontSize: 62 * PIXI.ratio,
    fill: 0x03081e,
    y: underline.y + underline.height + 120 * PIXI.ratio,
    relative_middle: { point: obj.width / 2 }
  });
  const writeTime = pText(PIXI, {
    content: "00:00:00",
    fontSize: 34 * PIXI.ratio,
    fill: 0x03081e,
    y: underline.y + underline.height + 207 * PIXI.ratio,
    relative_middle: { point: obj.width / 2 }
  });
  const recordButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    y: underline.y + underline.height + 307 * PIXI.ratio,
    src: "images/record.png",
    relative_middle: { containerWidth: obj.width }
  });
  /*   const stopRecordButton = pCircle(PIXI, {
    radius: 55 * PIXI.ratio,
    border: { width: 20 * PIXI.ratio, color: 0xff0000 },
    background: { color: 0xf55c23 },
    x: obj.width / 2,
    y: underline.y + underline.height + 358 * PIXI.ratio
  }); */
  const stopRecordButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    y: recordButton.y,
    src: "images/recording.png",
    relative_middle: { containerWidth: obj.width }
  });
  const playVoiceButton = pImg(PIXI, {
    width: recordButton.width,
    y: underline.y + underline.height + 307 * PIXI.ratio,
    src: "images/play.png",
    relative_middle: { containerWidth: obj.width }
  });
  const stopVoiceButton = pImg(PIXI, {
    width: recordButton.width,
    x: 83 * PIXI.ratio,
    y: playVoiceButton.y,
    src: "images/stop_black.png"
  });
  const trashButton = pImg(PIXI, {
    width: recordButton.width,
    x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio,
    y: playVoiceButton.y,
    src: "images/trash.png"
  });

  const clockArr = [];
  let clock;
  let time = 0;
  let playTime = 0;
  let runStopRecord;
  let runStopVoice;
  let i = 0;
  writeTime.hideFn();

  // 开始录音 “按钮” 开始
  recordButton.onClickFn(() => {
    callBack({
      status: "record",
      drawFn(type) {
        i = i + 1;
        console.log(type, i);
        if (type) return recordButton.hideFn();
        stopRecordButton.showFn();
        clock = setInterval(() => {
          time += 1;
          totalTimeFn(time);
          console.log(Number(new Date()));
        }, 1000);
        clockArr.push(clock);
        console.log(`current timer id: ${clock}`);
      }
    });
  });
  // 开始录音 “按钮” 结束

  // 结束录音 “按钮” 开始
  stopRecordButton.onClickFn(
    (runStopRecord = () => {
      stopRecordButton.visible &&
        callBack({
          status: "stopRecord",
          drawFn(type) {
            if (type === "hide") return stopRecordButton.hideFn();

            if (type === +type) {
              clearClock();
              correctTimeFn(Math.round(type / 1000), true);
              isVisibleFn([writeTime, playVoiceButton, trashButton], "showFn");
            }
          }
        });
    })
  );
  stopRecordButton.hideFn();
  // 结束录音 “按钮” 结束

  // 播放音频 “按钮” 开始
  playVoiceButton.onClickFn(() => {
    totalTimeFn(0);
    callBack({
      status: "playVoice",
      drawFn(status, duration) {
        switch (status) {
          case "play":
            clock = setInterval(() => {
              playTime += 1;
              totalTimeFn(playTime);
            }, 1000);
            clockArr.push(clock);
            playVoiceButton.hideFn();
            stopVoiceButton.showFn();
            trashButton.setPositionFn({
              x: stopVoiceButton.x + stopVoiceButton.width + 288 * PIXI.ratio
            });
            break;
          case "ended":
            clearClock();
            playTime = 0;
            correctTimeFn(Math.round(duration || time));
            playStopSwitchUI();
            callBack({ status: "stopVoic" });
            break;
          case "stop":
            runStopVoice();
            break;
          default:
            break;
        }
      }
    });
  });
  playVoiceButton.hideFn();
  // 播放音频 “按钮” 结束

  // 终止播放 “按钮” 开始
  stopVoiceButton.onClickFn(
    (runStopVoice = () => {
      callBack({
        status: "stopVoic",
        drawFn() {
          playTime = 0;
          totalTimeFn(0);
          clearClock();
          playStopSwitchUI();
        }
      });
    })
  );
  stopVoiceButton.hideFn();
  // 终止播放 “按钮” 结束

  // 销毁音频 “按钮” 开始
  trashButton.onClickFn(() => {
    callBack({
      status: "trash",
      drawFn() {
        isVisibleFn([stopVoiceButton, playVoiceButton, trashButton], "hideFn");
        trashButton.setPositionFn({
          x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio
        });

        time = 0;
        playTime = 0;
        totalTimeFn(0);
        clearClock();
        recordButton.showFn();
        writeTime.hideFn();
      }
    });
  });
  trashButton.hideFn();
  // 销毁音频 “按钮” 结束

  function totalTimeFn(_time) {
    const hour = (_time / 3600) | 0;
    const minute = ((_time % 3600) / 60) | 0;
    const second = (_time % 3600) % 60;
    try {
      totalTime.turnText(
        [hour, minute, second]
          .map(item => `00${item}`.slice(`${item}`.length))
          .join(":")
      );
    } catch (e) {
      new Promise(res => {
        res(
          [hour, minute, second]
            .map(item => `00${item}`.slice(`${item}`.length))
            .join(":")
        );
      })
        .then(timeText => {
          totalTime.turnText(timeText);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function correctTimeFn(actualTime, reset) {
    time = actualTime;
    totalTimeFn(time);
    writeTime.turnText(totalTime.text);
    reset && totalTimeFn(0);
  }

  function isVisibleFn(arr, method) {
    for (let i = 0, len = arr.length; i < len; i++) {
      arr[i][method]();
    }
  }

  function playStopSwitchUI() {
    playVoiceButton.showFn();
    stopVoiceButton.hideFn();
    trashButton.setPositionFn({
      x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio
    });
  }

  qq.onShow(runStopRecord);
  qq.onHide(clearClock);
  function clearClock() {
    while (clockArr.length > 0) {
      const c = clockArr.pop();
      clearInterval(c);
      console.log(`clear timer id: ${c}`);
    }
    // clearInterval(clock);
    // console.log(`clear timer id: ${clock}`);
  }

  goBack.callBack = () => {
    callBack({ status: "stopRecord" });
    clearClock();
    callBack({ status: "trash" });
    qq.offShow(runStopRecord);
    qq.offHide(clearClock);
  };

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    totalTime,
    writeTime,
    recordButton,
    stopRecordButton,
    playVoiceButton,
    stopVoiceButton,
    trashButton,
    logo
  );

  app.stage.addChild(container);

  return container;
};
