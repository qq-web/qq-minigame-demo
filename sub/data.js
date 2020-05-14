function getCurrTime() {
  return parseInt(+new Date() / 1000, 10);
}

function none() {}

/**
 * 获取用户信息
 */
export function getUserInfo(callback = none) {
  qq.getUserInfo({
    openIdList: ["selfOpenId"],
    success: userRes => {
      callback(userRes.data[0] || {});
    },
    fail: callback
  });
}

export function getDataFromSource(item) {
  let source;
  try {
    source = JSON.parse(item.KVDataList[0].value);
  } catch (e) {
    source = {
      qqgame: {
        score: 0,
        updateTime: getCurrTime()
      }
    };
  }

  return source.qqgame;
}

/**
 * 从后台排行榜列表里面找出自己的信息
 * @param { Array } list
 * @param { Object } selfData: 通过getUserInfo拿到的用户信息
 */

export function findSelf(list, selfData) {
  const result = {
    index: -1,
    self: null
  };

  list.forEach((item, index) => {
    if (item.avatarUrl === selfData.avatarUrl) {
      result.self = item;
      const { score, updateTime } = getDataFromSource(item);

      result.self.score = score;
      result.self.updateTime = updateTime;
      result.index = index;
    }
  });

  return result;
}

/**
 * 用户第一次玩游戏的时候拉取排行榜自身肯定不在列表
 * 如果先setUserCloudStorage -> getFriendCloudStorage串行调用会导致拉取速度很慢
 * 所以如果拉取排行榜之前已经知道用户的分数了，可以getFriendCloudStorage然后手动插入数据
 * 可以大大提高拉取速度
 */
export function injectSelfToList(list, userinfo, score) {
  const item = {
    rank: 1,
    score,
    avatarUrl: userinfo.avatarUrl,
    nickname: userinfo.nickname || userinfo.nickName
  };

  list.push(item);
}

export function replaceSelfDataInList(list, info, score) {
  list.forEach(item => {
    if (item.avatarUrl === info.avatarUrl && score > item.score) {
      item.score = score;
    }
  });
}

// 获取群排行榜
export function getGroupFriendData(key, shareTicket, callback = none) {
  qq.getGroupCloudStorage({
    keyList: [key],
    shareTicket,
    success: res => {
      res.data = res.data.filter(item => item.KVDataList.length);

      const data = res.data.map(item => {
        const { score, updateTime } = getDataFromSource(item);
        item.score = score;
        item.updateTime = updateTime;

        return item;
      });

      for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
      }

      callback(data);
    }
  });
}

/**
 * 获取好友排行榜列表
 */
export function getFriendData(key, callback = none) {
  qq.getFriendCloudStorage({
    keyList: [key],
    success: res => {
      res.data = res.data.filter(item => item.KVDataList.length);

      const data = res.data.map(item => {
        const { score, updateTime } = getDataFromSource(item);
        item.score = score;
        item.updateTime = updateTime;

        return item;
      });

      for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
      }

      callback(data);
    }
  });
}

/**
 * 拉取用户当前的分数记录，如果当前分数大于历史最高分数，执行上报
 */
export function setUserRecord(key, score) {
  const time = getCurrTime();
  qq.setUserCloudStorage({
    KVDataList: [
      {
        key,
        value: JSON.stringify({
          qqgame: {
            score,
            updateTime: time
          }
        })
      }
    ]
  });
}
