import {
  pText,
  pLine,
  pImg,
  pBox,
  pCircle,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "navigateBack", () => {
    callBack({
      status: "destroy"
    });
  });
  const title = pText(PIXI, {
    content: "音频",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "Audio",
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const box = pBox(PIXI, {
    height: 369 * PIXI.ratio,
    y: underline.y + underline.height + 92 * PIXI.ratio
  });
  const timerText = pText(PIXI, {
    content: "00 : 00 : 00",
    fontSize: 60 * PIXI.ratio,
    y: 81 * PIXI.ratio,
    relative_middle: { containerWidth: box.width }
  });
  const progressBar = {
    gray: pBox(PIXI, {
      width: box.width - 170 * PIXI.ratio,
      height: 4 * PIXI.ratio,
      background: { color: 0xb5b6b5 },
      radius: 2,
      y: timerText.y + timerText.height + 80 * PIXI.ratio
    })
  };
  const startingTime = pText(PIXI, {
    content: "00 : 00",
    fontSize: 30 * PIXI.ratio,
    y: progressBar.gray.y + progressBar.gray.height + 56 * PIXI.ratio,
    relative_middle: { point: 117 * PIXI.ratio }
  });
  const finishTime = pText(PIXI, {
    content: "01 : 00",
    fontSize: 30 * PIXI.ratio,
    y: startingTime.y,
    relative_middle: { point: box.width - 117 * PIXI.ratio }
  });
  const hint = pText(PIXI, {
    content: "注意：离开当前页面后音乐将保持播放，但退出小游戏\n将停止",
    fontSize: 28 * PIXI.ratio,
    lineHeight: 40 * PIXI.ratio,
    fill: 0x9f9f9f,
    align: "center",
    y: box.y + box.height + 18 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const playButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/play.png",
    is_PIXI_loader: true,
    x: 300 * PIXI.ratio,
    y: box.y + box.height + 204 * PIXI.ratio
  });
  const stopButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/stop.png",
    is_PIXI_loader: true,
    x: 42 * PIXI.ratio,
    y: playButton.y
  });
  const pauseButton = pImg(PIXI, {
    width: 150 * PIXI.ratio,
    src: "images/pause.png",
    is_PIXI_loader: true,
    x: playButton.x,
    y: playButton.y
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
  });

  progressBar.green = pBox(PIXI, {
    width: progressBar.gray.width,
    height: progressBar.gray.height,
    background: { color: 0x09bb07 },
    radius: 2,
    y: progressBar.gray.y
  });
  progressBar.green.width = 0;

  progressBar.circle = pCircle(PIXI, {
    radius: 20 * PIXI.ratio,
    background: { color: 0x09bb07 },
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
          timingOperation(currentTime);
          progressBar.green.width =
            (progressBar.gray.width * (currentTime / duration)) | 0;
          progressBar.circle.setPositionFn({
            x: progressBar.green.x + progressBar.green.width
          });
          break;
        case "ended":
          switchButtonFn("showFn", "hideFn");
          timingOperation(duration);
          voiceBandEnded = true;
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
    timerText.turnText("00 : 00 : 00");
    progressBar.green.width = 0;
    progressBar.circle.setPositionFn({
      x: progressBar.green.x
    });
  }

  // 更新播放时间function 开始
  function timingOperation(currentTime) {
    const second = currentTime % 60 | 0;
    const minute = (currentTime / 60) | 0;

    timerText.turnText(
      `00 : ${minute / 60 < 10 ? `0${minute}` : minute} : ${
        second % 60 < 10 ? `0${second}` : second
      }`
    );
  }
  // 更新播放时间function 结束

  // 创建内部 audio 上下文 InnerAudioContext 对象 开始
  callBack("createInnerAudioContext");
  // 创建内部 audio 上下文 InnerAudioContext 对象 结束

  setTimeout(() => {
    window.router.getNowPage(page => {
      page.reload = function() {
        logo.turnImg({ src: "images/logo.png" });
      };
    });
  }, 0);

  box.addChild(
    timerText,
    progressBar.gray,
    progressBar.green,
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
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
