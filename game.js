import "./js/libs/weapp-adapter";
import * as PIXI from "./js/libs/pixi.min";
import pmgressBar from "./js/libs/pmgressBar";
import share from "./js/libs/share";
import { openIdUrl } from "./config";

// qq.cloud.init({ env: 'example-69d3b' });

const { pixelRatio, windowWidth, windowHeight } = qq.getSystemInfoSync();

// 初始化canvas
const app = new PIXI.Application({
  width: windowWidth * pixelRatio,
  height: windowHeight * pixelRatio,
  view: canvas,
  backgroundColor: 0xffffff,
  preserveDrawingBuffer: true,
  antialias: true,
  resolution: 1
});

// 存放全局变量（例如登录后的openid）
app.globalData = {};

// 因为在小游戏里canvas是全屏的，所以映射起来就很简单暴力

PIXI.interaction.InteractionManager.prototype.mapPositionToPoint = (
  point,
  x,
  y
) => {
  point.x = x * pixelRatio;
  point.y = y * pixelRatio;
};

PIXI.ratio = (windowWidth * pixelRatio) / 750;

const loadingFn = pmgressBar(PIXI, app, {
  width: windowWidth * pixelRatio,
  height: windowHeight * pixelRatio
});

PIXI.loader
  .add([
    "images/storage-fileSystem.png",
    "images/rendering.png",
    "images/network.png",
    "images/media.png",
    "images/play.png",
    "images/pause.png",
    "images/stop.png",
    "images/worker.png",
    "images/star.png",
    "images/facility.png",
    "images/right.png",
    "images/interface.png",
    "images/close.png",
    "images/bottom_logo.png",
    "images/APIicon.png",

    "images/abilityBasic.png",
    "images/communication.png",
    "images/AD.png",
    "images/opendata.png",
    "images/relationship.png",
    "images/share.png",
    "images/message.png"
  ])
  .load(() => {
    qq.loadSubpackage({
      name: "api",
      success() {
        const router = require("./js/api/game");
        const options = qq.getLaunchOptionsSync();
        const { query } = options;

        share(); // 全局分享

        router(PIXI, app, {
          width: windowWidth * pixelRatio,
          height: windowHeight * pixelRatio,
          pixelRatio
        });

        if (Object.keys(query).length && query.pathName)
          window.router.navigateTo(query.pathName, query, options);

        qq.onShow(res => {
          const _query = Object.assign(window.query || {}, res.query);
          const noNavigateToRequired = !["VoIPChat"].includes(_query.pathName);

          if (Object.keys(_query).length && _query.pathName) {
            noNavigateToRequired &&
              _query.pathName === window.router.getNowPageName() &&
              window.router.navigateBack();

            !window.query &&
              !noNavigateToRequired &&
              window.router.navigateTo(_query.pathName, _query, res);
            noNavigateToRequired &&
              window.router.navigateTo(_query.pathName, _query, res);
          }
          noNavigateToRequired && (window.query = null);
        });
        loadingFn(100);
      }
    }).onProgressUpdate(res => {
      loadingFn(res.progress);
    });
  });

qq.login({
  success(data) {
    qq.request({
      url: openIdUrl,
      method: "POST",
      data: {
        js_code: data.code,
        appType: "game"
      },
      success(res) {
        console.log("拉取openid完成", res);
        if (res.data.openid) {
          console.log(res.data.openid);
          app.globalData.openId = res.data.openid;
        }
      },
      fail(res) {
        console.log("拉取用户openid失败，将无法正常使用开放接口等服务", res);
      }
    });
  },
  fail(err) {
    console.log("qq.login 接口调用失败，将无法正常使用开放接口等服务", err);
  }
});
