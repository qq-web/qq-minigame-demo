import style from "./render/style";
import tplFn from "./render/tplfn";
import {
  getFriendData,
  getGroupFriendData,
  setUserRecord,
  getUserInfo,
  findSelf,
  injectSelfToList,
  replaceSelfDataInList
} from "./data";
import Layout from "./engine";

import { interactive, directional, refreshDirected } from "./pushMessage";

let userinfo;
let selfData;
const key = "rankid";
let currentMaxScore = 0;
let selfIndex = 0;

const sharedCanvas = qq.getSharedCanvas();
const sharedContext = sharedCanvas.getContext("2d");
function draw(title, data = [], ...args) {
  Layout.clearAll();

  const isBillboard = typeof args[args.length - 1] !== "string";

  const template = tplFn({
    title: isBillboard ? title : null,
    data,
    self: selfData,
    selfIndex,
    isBillboard
  });
  Layout.init(template, style);
  Layout.layout(sharedContext);
}

function renderData(data, info, title = "排行榜", mock = false, type) {
  data.sort((a, b) => b.score - a.score);
  const find = findSelf(data, info);
  selfData = find.self;
  selfIndex = find.index + 1;

  /**
   * 拉取排行榜的时候无法确定排行榜中是否有自己，或者即便有自己分数也是旧的
   * 如果拉取排行榜之前先调用setUserCloudStorage来上报分数再拉取排行榜
   * 那么第一次渲染排行榜会非常之慢。针对这种场景需要根据情况处理：
   * 1. 如果拉取排行榜之前有调用分数上报接口，将每次上报的分数缓存起来，然后插入或者替换排行榜中的自己
   * 2. 如果拉取排行榜之前没有调用分数上报接口，忽略1的逻辑
   */
  if (!selfData && currentMaxScore !== undefined) {
    injectSelfToList(data, info, currentMaxScore);
    const findResult = findSelf(data, info);
    selfData = findResult.self;
    selfIndex = findResult.index + 1;
  } else if (selfData && currentMaxScore !== undefined) {
    // 替换自己的分数
    replaceSelfDataInList(data, info, currentMaxScore);
  }

  // mock
  if (mock) {
    //     for ( let i = data.length; i < 20; i++ ) {
    //         data[i] = JSON.parse(JSON.stringify(selfData));
    //         data[i].rank = i;
    //         data[i].score = 0;
    //         data[i].nickname = 'mock__user';
    //     }
  }

  draw(title, data, selfData, currentMaxScore, type);

  // 关系链互动
  type === "interaction" && interactive(data, selfData);
}

function showGroupRank(shareTicket) {
  /**
   * 用户信息会在子域初始化的时候去拉取
   * 但是存在用户信息还没有拉取完成就要求渲染排行榜的情况，这时候再次发起用信息请求再拉取排行榜
   */
  if (!userinfo) {
    getUserInfo(info => {
      userinfo = info;
      getGroupFriendData(key, shareTicket, data => {
        renderData(data, info, "群排行", false);
      });
    });
  } else {
    getGroupFriendData(key, shareTicket, data => {
      renderData(data, userinfo, "群排行", false);
    });
  }
}

// function mockData(){
//     // 创建mock数据
//     let item = {
//         nickname: "爱榴莲的芒果小姐",
//         rankScore: 1,
//         avatarUrl: 'https://res.qq.qq.com/wechatgame/product/webpack/userupload/20191119/wegoing.jpeg',
//         starSum: 1,
//     };
//     let datasource =  {
//         data     :[],
//         selfIndex: 0,
//         isBillboard:1,
//         self     : item,
//     }
//     for ( let i = 0; i < 20;i++ ) {
//         var cp = JSON.parse(JSON.stringify(item));
//         cp.rankScore = Math.floor(Math.random()*1000+1)
//         cp.nickname = cp.nickname + (i+1)
//         cp.starSum   = i + 1;
//         cp.score = cp.rankScore;
//         datasource.data.push(cp);
//     }
//     return datasource.data
// }
function showFriendRank(type) {
  /**
   * 用户信息会在子域初始化的时候去拉取
   * 但是存在用户信息还没有拉取完成就要求渲染排行榜的情况，这时候再次发起用信息请求再拉取排行榜
   */
  if (!userinfo) {
    getUserInfo(info => {
      userinfo = info;
      getFriendData(key, data => {
        console.log(data);
        renderData(data, info, "排行榜", true, type);
      });
    });
  } else {
    getFriendData(key, data => {
      console.log(data);
      renderData(data, userinfo, "排行榜", true, type);
    });
  }
}

// 显示当前用户对游戏感兴趣的未注册的好友名单
function showPotentialFriendList() {
  qq.getPotentialFriendList({
    success(res) {
      res.list.potential = true;
      res.list.length > 4 && res.list.pop();

      // 定向分享
      draw("", res.list, selfData, currentMaxScore, "directional");

      directional(res.list);
      refreshDirected(showPotentialFriendList);
    },
    fail(e) {
      console.log(e);
    }
  });
}

function init() {
  currentMaxScore = 0;

  qq.onMessage(data => {
    switch (data.event) {
      case "updateViewPort":
        Layout.updateViewPort(data.box);
        break;
      case "showFriendRank":
        showFriendRank();
        break;
      case "showGroupRank":
        showGroupRank(data.shareTicket);
        break;
      case "setUserRecord":
        setUserRecord(key, data.value);
        break;
      case "relationalChaininteractiveData":
        showFriendRank("interaction");
        break;
      case "directedSharing":
        showPotentialFriendList();
        break;
      case "close":
        Layout.clearAll();
        break;
      default:
        break;
    }
  });
}

init();
