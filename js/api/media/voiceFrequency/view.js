import { pBox, pCircle, pText, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "音频",
    apiName: "Audio"
  });
  const bg = new PIXI.Graphics();
  container.addChild(bg);
  bg.beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();
  goBack.callBack = () => {
    callBack({
      status: "destroy"
    });
  };

  const box = pBox(PIXI, {
    height: 341 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const timerText = pText(PIXI, {
    content: "00:00:00",
    fontSize: 62 * PIXI.ratio,
    fill: 0x030b1a,
    y: 60 * PIXI.ratio,
    relative_middle: { containerWidth: box.width }
  });
  const progressBar = {
    gray: pBox(PIXI, {
      width: box.width - 122 * PIXI.ratio,
      height: 4 * PIXI.ratio,
      background: { color: 0xe4e7e4 },
      radius: 2,
      y: timerText.y + timerText.height + 59 * PIXI.ratio,
      relative_middle: { containerWidth: box.width }
    })
  };
  const startingTime = pText(PIXI, {
    content: "00:00",
    fill: 0x03081a,
    fontSize: 24 * PIXI.ratio,
    y: progressBar.gray.y + progressBar.gray.height + 29 * PIXI.ratio,
    relative_middle: { point: 62 * PIXI.ratio }
  });
  const finishTime = pText(PIXI, {
    content: "00:00",
    fill: 0x03081a,
    fontSize: 24 * PIXI.ratio,
    y: startingTime.y,
    relative_middle: { point: box.width - 62 * PIXI.ratio }
  });
  const hint = pText(PIXI, {
    content: "注意：离开当前页面后音乐将保持播放，但退出小游戏\n将停止",
    fontSize: 28 * PIXI.ratio,
    lineHeight: 40 * PIXI.ratio,
    fill: 0x878b99,
    y: box.y + box.height + 16 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const playButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/play.png",
    is_PIXI_loader: true,
    x: 300 * PIXI.ratio,
    y: box.y + box.height + 232 * PIXI.ratio
  });
  const stopButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/stop.png",
    is_PIXI_loader: true,
    x: 53 * PIXI.ratio,
    y: playButton.y
  });
  const pauseButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/pause.png",
    is_PIXI_loader: true,
    x: playButton.x,
    y: playButton.y
  });

  progressBar.blue = pBox(PIXI, {
    width: progressBar.gray.width,
    height: progressBar.gray.height,
    background: { color: 0x00cafc },
    radius: 2,
    y: progressBar.gray.y,
    relative_middle: { containerWidth: box.width }
  });
  progressBar.blue.width = 0;

  progressBar.circle = pCircle(PIXI, {
    radius: 20 * PIXI.ratio,
    border: {
      width: PIXI.ratio,
      color: 0x03081a,
      alpha: 0.3
    },
    background: { color: 0xffffff },
    x: progressBar.gray.x,
    y: progressBar.gray.y + progressBar.gray.height / 2
  });

  // 播放“按钮”开始
  let voiceBandEnded = false;
  playButton.onClickFn(() => {
    callBack("play", (status, duration, currentTime) => {
      switch (status) {
        case "play":
          if (voiceBandEnded) {
            resetProgressBar();
            voiceBandEnded = false;
          }
          switchButtonFn("hideFn", "showFn");
          break;
        case "upDate":
          setDuration(duration);
          timingOperation(currentTime);
          progressBar.blue.width =
            (progressBar.gray.width * (currentTime / duration)) | 0;
          progressBar.circle.setPositionFn({
            x: progressBar.blue.x + progressBar.blue.width
          });
          break;
        case "ended":
          switchButtonFn("showFn", "hideFn");
          timingOperation(duration);
          voiceBandEnded = true;
          break;
        default:
          break;
      }
    });
  });
  // 播放“按钮”结束

  // 暂停“按钮”开始
  pauseButton.onClickFn(() => {
    callBack("pause");
    switchButtonFn("showFn", "hideFn");
  });
  pauseButton.hideFn();
  // 暂停“按钮”结束

  // 终止“按钮”开始
  stopButton.onClickFn(() => {
    callBack("stop");
    switchButtonFn("showFn", "hideFn");
    resetProgressBar();
  });
  stopButton.hideFn();
  // 终止“按钮”结束

  function switchButtonFn(...funcNames) {
    playButton[funcNames[0]]();
    pauseButton[funcNames[1]]();
    stopButton[funcNames[1]]();
  }

  function resetProgressBar() {
    timerText.turnText("00:00:00");
    progressBar.blue.width = 0;
    progressBar.circle.setPositionFn({
      x: progressBar.blue.x
    });
  }

  function setDuration(duration) {
    const second = duration % 60 | 0;
    const minute = (duration / 60) | 0;

    finishTime.turnText(
      `00:${minute / 60 < 10 ? `0${minute}` : minute}:${
        second % 60 < 10 ? `0${second}` : second
      }`
    );
  }

  // 更新播放时间function 开始
  function timingOperation(currentTime) {
    const second = currentTime % 60 | 0;
    const minute = (currentTime / 60) | 0;

    timerText.turnText(
      `00:${minute / 60 < 10 ? `0${minute}` : minute}:${
        second % 60 < 10 ? `0${second}` : second
      }`
    );
  }
  // 更新播放时间function 结束

  // 创建内部 audio 上下文 InnerAudioContext 对象 开始
  callBack("createInnerAudioContext");
  // 创建内部 audio 上下文 InnerAudioContext 对象 结束

  box.addChild(
    timerText,
    progressBar.gray,
    progressBar.blue,
    progressBar.circle,
    startingTime,
    finishTime
  );
  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    box,
    hint,
    stopButton,
    playButton,
    pauseButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
