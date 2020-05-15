const signIn = [
  {
    label: "小游戏示例",
    name: "APIentry",
    path: "APIentry/index",
    tabBar: "index",
    children: [
      {
        label: "开放数据域",
        name: "opendata",
        children: [
          {
            label: "开放数据域",
            name: "openDataContext",
            path: "opendata/openDataContext/index"
          },
          {
            label: "关系链互动",
            name: "relationalChaininteractiveData",
            path: "opendata/relationalChaininteractiveData/index"
          },
          {
            label: "定向分享",
            name: "directedSharing",
            path: "opendata/directedSharing/index"
          }
        ]
      },

      {
        label: "关系链玩法",
        name: "relationship", // relationship
        children: [
          {
            label: " 添加好友",
            name: "addFriend",
            path: "relationship/addFriend/index"
          },
          {
            label: " 一键加群（打开群资料卡）",
            name: "addQun",
            path: "relationship/addQun/index"
          }
        ]
      },
      {
        label: "分享强化",
        name: "share",
        children: [
          {
            label: "主动分享",
            name: "share",
            path: "share/index"
          },
          {
            label: "转发",
            name: "onShareAppMessage",
            path: "onShareAppMessage/index"
          }
        ]
      },
      {
        label: "消息触达",
        name: "message",
        children: [
          {
            label: "模板消息",
            name: "template",
            path: "message/template/index"
          },
          {
            label: "订阅消息",
            name: "subscribe",
            path: "message/subscribe/index"
          }
        ]
      },
      {
        label: "广告组件",
        name: "AD",
        children: [
          {
            label: "banner 广告",
            name: "createBannerAd",
            path: "AD/createBannerAd/index"
          },
          {
            label: "激励视频广告",
            name: "createRewardedVideoAd",
            path: "AD/createRewardedVideoAd/index"
          },
          {
            label: "插屏广告",
            name: "createInterstitialAd",
            path: "AD/createInterstitialAd/index"
          }
        ]
      },
      {
        label: "多人对战&音视频",
        name: "communication",
        children: [
          {
            label: "实时语音",
            name: "VoIPChat",
            path: "communication/VoIPChat/index"
          }
        ]
      },
      {
        label: "基础能力",
        name: "abilityBasic",
        children: [
          {
            label: "用户登录",
            name: "login",
            path: "abilityBasic/login/index"
          },
          {
            label: "获取用户信息",
            name: "getUserInfo",
            path: "abilityBasic/getUserInfo/index"
          },
          {
            label: "设置",
            name: "setting",
            path: "abilityBasic/setting/index"
          }
        ]
      },
      {
        label: "界面",
        name: "interface",
        children: [
          {
            label: "显示操作菜单",
            name: "showActionSheet",
            path: "interface/showActionSheet/index"
          },
          {
            label: "显示模态弹窗",
            name: "showModal",
            path: "interface/showModal/index"
          },
          {
            label: "显示消息提示框",
            name: "showToast",
            path: "interface/showToast/index"
          }
        ]
      },
      {
        label: "渲染",
        name: "rendering",
        children: [
          {
            label: "画布内容转换为URL",
            name: "toDataURL",
            path: "rendering/toDataURL/index"
          },
          {
            label: "截图生成一个临时文件",
            name: "toTempFilePath",
            path: "rendering/toTempFilePath/index"
          },
          {
            label: "渲染帧率",
            name: "setPreferredFramesPerSecond",
            path: "rendering/setPreferredFramesPerSecond/index"
          },
          {
            label: "加载自定义字体文件",
            name: "loadFont",
            path: "rendering/loadFont/index"
          },
          {
            label: "创建一个图片对象",
            name: "createImage",
            path: "rendering/createImage/index"
          }
        ]
      },
      {
        label: "设备",
        name: "facility",
        children: [
          {
            label: "振动",
            name: "vibrate",
            path: "facility/vibrate/index"
          },
          {
            label: "剪贴板",
            name: "clipboardData",
            path: "facility/clipboardData/index"
          },
          {
            label: "获取手机网络状态",
            name: "getNetworkType",
            path: "facility/getNetworkType/index"
          },
          {
            label: "监听手机网络变化",
            name: "onNetworkStatusChange",
            path: "facility/onNetworkStatusChange/index"
          },
          {
            label: "获取设备电量状态",
            name: "getBatteryInfo",
            path: "facility/getBatteryInfo/index"
          },
          {
            label: "屏幕亮度",
            name: "screenBrightness",
            path: "facility/screenBrightness/index"
          },
          {
            label: "设置保持常亮状态",
            name: "setKeepScreenOn",
            path: "facility/setKeepScreenOn/index"
          },
          {
            label: "监听罗盘数据",
            name: "compassChange",
            path: "facility/compassChange/index"
          },
          {
            label: "重力感应",
            name: "accelerometerChange",
            path: "facility/accelerometerChange/index"
          },
          {
            label: "监听设备方向",
            name: "deviceMotionChange",
            path: "facility/deviceMotionChange/index"
          },
          {
            label: "监听陀螺仪数据",
            name: "gyroscopeChange",
            path: "facility/gyroscopeChange/index"
          },
          {
            label: "横竖屏切换",
            name: "deviceOrientationChange",
            path: "facility/deviceOrientationChange/index"
          }
        ]
      },
      {
        label: "网络",
        name: "network",
        children: [
          {
            label: "发送请求",
            name: "request",
            path: "network/request/index"
          },
          {
            label: "下载文件",
            name: "downloadFile",
            path: "network/downloadFile/index"
          },
          {
            label: "上传文件",
            name: "uploadFile",
            path: "network/uploadFile/index"
          },
          {
            label: "WebSocket",
            name: "WebSocket",
            path: "network/webSocket/index"
          }
        ]
      },
      {
        label: "媒体",
        name: "media",
        children: [
          {
            label: "视频",
            name: "video",
            path: "media/video/index"
          },
          {
            label: "音频",
            name: "voiceFrequency",
            path: "media/voiceFrequency/index"
          },
          {
            label: "录音",
            name: "voice",
            path: "media/voice/index"
          }
        ]
      },
      {
        label: "数据与文件系统",
        name: "storage-fileSystem",
        children: [
          {
            label: "创建/删除目录",
            name: "dir",
            path: "storage-fileSystem/dir/index"
          },
          {
            label: "判断文件/目录是否存在",
            name: "access",
            path: "storage-fileSystem/access/index"
          },
          {
            label: "重命名",
            name: "rename",
            path: "storage-fileSystem/rename/index"
          },
          {
            label: "保存临时文件到本地",
            name: "saveFile",
            path: "storage-fileSystem/saveFile/index"
          },
          {
            label: "查看目录内容",
            name: "readdir",
            path: "storage-fileSystem/readdir/index"
          },
          {
            label: "操作文件",
            name: "operationFile",
            path: "storage-fileSystem/operationFile/index"
          },
          {
            label: "获取文件信息",
            name: "getFileInfo",
            path: "storage-fileSystem/getFileInfo/index"
          },
          {
            label: "判断文件路径是否是目录",
            name: "stat",
            path: "storage-fileSystem/stat/index"
          },
          {
            label: "解压文件",
            name: "unzip",
            path: "storage-fileSystem/unzip/index"
          },
          {
            label: "本地缓存文件",
            name: "savedFile",
            path: "storage-fileSystem/savedFile/index"
          },
          {
            label: "数据缓存",
            name: "storage",
            path: "storage-fileSystem/storage/index"
          }
        ]
      },
      {
        label: "多线程",
        name: "worker",
        path: "worker/index"
      }
    ]
  }
];

function router(PIXI, app, parameter) {
  const treePage = {};
  function regroup(circularArr) {
    circularArr = circularArr.slice(0);
    while (circularArr.length) {
      const page = circularArr.shift();
      parameter = { ...parameter };
      parameter.name = page.name;
      parameter.isTabBar = !!page.tabBar;
      page.path &&
        (treePage[page.name] = {
          label: page.label,
          path: page.path,
          parameter
        });
      if ((page.children || []).length) {
        circularArr.unshift(...page.children.slice(0));
      }
    }
  }
  regroup(signIn);

  for (let i = 0, len = signIn.length; i < len; i++) {
    const { name } = signIn[i];
    treePage[name].page = require(treePage[name].path)(
      PIXI,
      app,
      treePage[name].parameter,
      signIn[i].children
    );
    treePage[name].init = true;
  }

  window.router = new (function() {
    this.treeView = ["APIentry"];
    this.navigateTo = function(newPage, query, res) {
      const lastOne = this.treeView.length - 1;
      const name = this.treeView[lastOne];
      if (name === newPage) return;

      this.treeView.push(newPage);
      treePage[newPage].reload && treePage[newPage].reload();

      try {
        if (!treePage[newPage].init) {
          treePage[newPage].page = require(treePage[newPage].path)(PIXI, app, {
            ...treePage[newPage].parameter,
            ...query,
            ...res
          });
          treePage[newPage].init = true;
        }

        treePage[name].page.visible = false;
        treePage[newPage].page.visible = true;
      } catch (e) {
        console.error(e);
        this.treeView.pop();
        qq.showModal({
          content: "你的QQ版本过低，无法演示该功能！",
          showCancel: false,
          confirmColor: "#02BB00"
        });
      }
    };
    this.navigateBack = function() {
      if (this.treeView.length < 2) return;

      if (!treePage[this.getNowPageName()].reload) return this.delPage();

      treePage[this.treeView.pop()].page.visible = false;
      treePage[this.getNowPageName()].page.visible = true;
    };
    this.delPage = function() {
      if (this.treeView.length < 2) return;
      const name = this.treeView.pop();
      treePage[name].page.visible = false;
      app.stage.removeChild(treePage[name].page).destroy(true);
      treePage[name].page = null;
      treePage[name].init = false;
      treePage[this.getNowPageName()].page.visible = true;
    };
    this.getNowPageName = function() {
      return this.treeView[this.treeView.length - 1];
    };
    this.getNowPageLabel = function() {
      return treePage[this.treeView[this.treeView.length - 1]].label;
    };
    this.getNowPage = function(callBack) {
      callBack(treePage[this.treeView[this.treeView.length - 1]]);
    };
  })();
}
module.exports = router;
