import { pButton, pText, pLine, pBox } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();

  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "设置",
    apiName: "open/get/Setting"
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

  const settingObj = {
    "scope.userInfo": "用户信息",
    "scope.userLocation": "地理位置",
    "scope.qqrun": "QQ运动步数",
    "scope.record": "录音功能",
    "scope.writePhotosAlbum": "保存到相册",
    "scope.camera": "摄像头"
  };
  const divDeploy = {
    height: 0,
    y: underline.height + underline.y + (60 + 20) * PIXI.ratio
  };
  const divContainer = new PIXI.Container();
  const divContainerChildArr = [];

  for (
    let i = 0, arr = Object.keys(settingObj), len = arr.length;
    i < len;
    i++
  ) {
    divContainerChildArr[i] = pBox(PIXI, {
      height: 112 * PIXI.ratio,
      border: {
        width: PIXI.ratio | 0,
        color: 0xebedf5
      },
      y: i
        ? divContainerChildArr[i - 1].height +
          divContainerChildArr[i - 1].y -
          (PIXI.ratio | 0)
        : 0
    });

    divContainerChildArr[i].addChild(
      pText(PIXI, {
        content: settingObj[arr[i]],
        fontSize: 34 * PIXI.ratio,
        fill: 0x03081a,
        x: 32 * PIXI.ratio,
        relative_middle: { containerHeight: divContainerChildArr[i].height }
      }),
      // 设置项的勾
      (settingObj[arr[i]] = pLine(
        PIXI,
        {
          width: 5 * PIXI.ratio,
          color: 0x00cafc
        },
        [525 * PIXI.ratio, 50 * PIXI.ratio],
        [15 * PIXI.ratio, 15 * PIXI.ratio],
        [45 * PIXI.ratio, -15 * PIXI.ratio]
      ))
    );
    settingObj[arr[i]].visible = false;
  }

  divDeploy.height =
    divContainerChildArr[divContainerChildArr.length - 1].y +
    divContainerChildArr[divContainerChildArr.length - 1].height;

  const div = pBox(PIXI, divDeploy);
  divContainer.addChild(...divContainerChildArr);
  divContainer.mask = pBox(PIXI, {
    width: div.width - 30 * PIXI.ratio,
    height: divDeploy.height - 2 * PIXI.ratio,
    x: 30 * PIXI.ratio
  });
  div.addChild(divContainer, divContainer.mask);

  // 获取小游戏设置“按钮” 开始
  const getSettingBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    y: div.y + div.height + 40 * PIXI.ratio
  });
  getSettingBtn.addChild(
    pText(PIXI, {
      content: "获取小游戏设置",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getSettingBtn.width,
        containerHeight: getSettingBtn.height
      }
    })
  );
  getSettingBtn.onClickFn(() => {
    callBack({
      status: "getSetting",
      drawFn(data) {
        for (
          let i = 0, arr = Object.keys(settingObj), len = arr.length;
          i < len;
          i++
        ) {
          if (data[arr[i]]) {
            settingObj[arr[i]].visible = true;
          } else {
            settingObj[arr[i]].visible = false;
          }
        }
      }
    });
  });
  // 获取小游戏设置“按钮” 结束

  // 打开小游戏设置“按钮” 开始
  const openSettingBtn = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    height: 90 * PIXI.ratio,
    color: 0xffffff,
    y: getSettingBtn.y + getSettingBtn.height + 20 * PIXI.ratio
  });
  openSettingBtn.addChild(
    pText(PIXI, {
      content: "打开小游戏设置",
      fontSize: 34 * PIXI.ratio,
      fill: 0x03081a,
      relative_middle: {
        containerWidth: openSettingBtn.width,
        containerHeight: openSettingBtn.height
      }
    })
  );
  openSettingBtn.onClickFn(() => {
    callBack({
      status: "openSetting",
      drawFn(data) {
        for (
          let i = 0, arr = Object.keys(settingObj), len = arr.length;
          i < len;
          i++
        ) {
          if (data[arr[i]]) {
            settingObj[arr[i]].visible = true;
          } else {
            settingObj[arr[i]].visible = false;
          }
        }
      }
    });
  });
  // 打开小游戏设置“按钮” 结束

  container.addChild(
    apiName,
    underline,
    title,
    goBack,
    div,
    getSettingBtn,
    openSettingBtn,
    logo
  );
  app.stage.addChild(container);

  return container;
};
