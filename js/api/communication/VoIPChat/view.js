import { pButton, pText, pBox, pImg } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "语音对话房间",
    apiName: "join/exit/VoIPChat"
  });
  const bottomBg = new PIXI.Graphics();
  container.addChild(bottomBg);
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const muteMicrophoneBox = pBox(PIXI, {
    height: 111 * PIXI.ratio,
    width: app.renderer.view.width,
    border: { width: PIXI.ratio, color: 0xebedf5 },
    y: underline.height + underline.y + (60 + 20) * PIXI.ratio
  });
  const muteEarphoneBox = pBox(PIXI, {
    height: 112 * PIXI.ratio,
    width: app.renderer.view.width,
    y: muteMicrophoneBox.height + muteMicrophoneBox.y
  });
  const showRoomNumBox = pBox(PIXI, {
    height: 392 * PIXI.ratio,
    y: muteEarphoneBox.height + muteEarphoneBox.y + 20 * PIXI.ratio
  });
  const roomNumText = pText(PIXI, {
    content: "当前房间人数：",
    fontSize: 28 * PIXI.ratio,
    fill: 0x03081a,
    relative_middle: {
      containerWidth: showRoomNumBox.width,
      containerHeight: showRoomNumBox.height
    }
  });
  showRoomNumBox.addChild(roomNumText);

  let roomName;

  // 是否静音麦克风 start
  const muteMicrophoneImgBox = pBox(PIXI, {
    width: 94 * PIXI.ratio,
    height: 111 * PIXI.ratio,
    x: muteMicrophoneBox.width - 124 * PIXI.ratio
  });

  const muteMicrophoneOff = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/off.png",
    y: 30 * PIXI.ratio
  });

  const muteMicrophoneOn = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/on.png",
    y: 30 * PIXI.ratio
  });
  muteMicrophoneImgBox.addChild(muteMicrophoneOff, muteMicrophoneOn);
  muteMicrophoneOff.hideFn();
  muteMicrophoneOff.onClickFn(e => {
    updateVoIPChatMuteConfigFn(e, "muteMicrophone", false, () => {
      muteMicrophoneOff.hideFn();
      muteMicrophoneOn.showFn();
    });
  });
  muteMicrophoneOn.onClickFn(e => {
    updateVoIPChatMuteConfigFn(e, "muteMicrophone", true, () => {
      muteMicrophoneOff.showFn();
      muteMicrophoneOn.hideFn();
    });
  });
  muteMicrophoneBox.addChild(
    pText(PIXI, {
      content: `麦克风`,
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      relative_middle: { containerHeight: muteMicrophoneBox.height }
    }),
    muteMicrophoneImgBox
  );
  // 是否静音麦克风 end

  // 是否静音耳机 start
  const muteEarphoneImgBox = pBox(PIXI, {
    width: 94 * PIXI.ratio,
    height: 111 * PIXI.ratio, // muteEarphoneBox.height * PIXI.ratio,
    x: muteEarphoneBox.width - 124 * PIXI.ratio
  });
  const muteEarphoneOff = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/off.png",
    y: 30 * PIXI.ratio
  });
  const muteEarphoneOn = pImg(PIXI, {
    width: 94 * PIXI.ratio,
    height: 52 * PIXI.ratio,
    src: "images/on.png",
    y: 30 * PIXI.ratio
  });
  muteEarphoneImgBox.addChild(muteEarphoneOff, muteEarphoneOn);
  muteEarphoneOff.hideFn();
  muteEarphoneOff.onClickFn(e => {
    updateVoIPChatMuteConfigFn(e, "muteEarphone", false, () => {
      muteEarphoneOff.hideFn();
      muteEarphoneOn.showFn();
    });
  });
  muteEarphoneOn.onClickFn(e => {
    updateVoIPChatMuteConfigFn(e, "muteEarphone", true, () => {
      muteEarphoneOff.showFn();
      muteEarphoneOn.hideFn();
    });
  });
  muteEarphoneBox.addChild(
    pText(PIXI, {
      content: `耳机`,
      fontSize: 34 * PIXI.ratio,
      x: 32 * PIXI.ratio,
      relative_middle: { containerHeight: muteEarphoneBox.height }
    }),
    muteEarphoneImgBox
  );
  // 是否静音耳机 end

  function updateVoIPChatMuteConfigFn(e, name, boolean, Fn) {
    const { target } = e;
    if (target.clickOnce) return;
    target.clickOnce = !target.clickOnce;
    callBack({
      status: "updateVoIPChatMuteConfig",
      [name]: boolean,
      drawFn() {
        target.clickOnce = !target.clickOnce;
        Fn && Fn();
      }
    });
  }

  // 分享房间 start
  const share = pButton(PIXI, {
    y: showRoomNumBox.height + showRoomNumBox.y + 38 * PIXI.ratio
  });
  share.myAddChildFn(
    pText(PIXI, {
      content: `邀请好友进入房间`,
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: share.width,
        containerHeight: share.height
      }
    })
  );
  share.onClickFn(() => {
    callBack({
      status: "shareAppMessage",
      groupId: roomName
    });
  });
  // 分享房间 end

  // 退出房间按钮 start
  const leave = pButton(PIXI, {
    border: { width: (2 * PIXI.ratio) | 0, color: 0xd1d1d1 },
    y: share.height + share.y + 32 * PIXI.ratio,
    alpha: 0
  });
  leave.myAddChildFn(
    pText(PIXI, {
      content: "退出房间",
      fontSize: 34 * PIXI.ratio,
      fill: 0x353535,
      relative_middle: {
        containerWidth: leave.width,
        containerHeight: leave.height
      }
    })
  );
  leave.onClickFn(() => {
    callBack({
      status: "exitVoIPChat"
    });
    window.router.delPage();
  });
  // 退出房间按钮 end

  function isShowChildFn(isShow) {
    for (let i = 0, len = container.children.length; i < len; i++) {
      container.children[i].visible = isShow;
    }
  }

  !qq.joinVoIPChat && qq.joinVoIPChat();

  goBack.callBack = () => {
    callBack({ status: "exitVoIPChat" });
  };

  callBack({
    status: "joinVoIPChat",
    groupId: obj.roomName,
    reEnter: obj.re_enter,
    drawFn(res, name) {
      roomName = name;
      roomNumText.turnText(`当前房间人数：${res.openIdList.length} 人`);

      !obj.pathName && isShowChildFn(true);
    },
    drawRoomNumFn(num) {
      roomNumText.turnText(`当前房间人数：${num} 人`);
    }
  });

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    muteMicrophoneBox,
    muteEarphoneBox,
    showRoomNumBox,
    share,
    leave,
    logo
  );
  !obj.pathName && isShowChildFn(false);
  app.stage.addChild(container);

  return container;
};
