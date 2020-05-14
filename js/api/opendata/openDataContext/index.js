import view from "./view";
import ShareCanvas from "./ShareCanvas";

function showTip() {
  qq.showToast({
    title: "若分享成功，请从群里点击会话查看群排行榜",
    icon: "none",
    duration: 2000
  });

  qq.offShow(showTip);
}

module.exports = function(PIXI, app, obj) {
  const SC = new ShareCanvas();

  const tick = () => {
    SC.rankTiker(PIXI, app);
  };
  const ticker = PIXI.ticker.shared;

  const { container, underline, close } = view(PIXI, app, obj, data => {
    // shareCanvas在上面初始化时还不知道下y座标。布局需要根据下划线的位置再往下移60，所以在知道下划线位置后更新一下canvas的位置。
    SC.updateSubViewPos(underline.y + 60);

    let { score } = data;
    const { status } = data;
    switch (status) {
      case "shareAppMessage":
        if (!SC.friendRankShow) {
          qq.shareAppMessage({
            title: "高手如云，看看群里你排第几",
            query: "showGroup=1&pathName=openDataContext",
            imageUrl: canvas.toTempFilePathSync({
              x: 0,
              y: 0,
              width: canvas.width,
              height: (canvas.width * 4) / 5
            })
          });

          qq.onShow(showTip);
        }

        break;

      // 上报随机分数
      case "setUserRecord":
        if (!SC.friendRankShow) {
          score = Math.floor(Math.random() * 1000 + 1);
          qq.setUserCloudStorage({
            KVDataList: [
              {
                key: "rankid",
                value: JSON.stringify({
                  qqgame: {
                    score,
                    update_time: parseInt(+new Date() / 1000, 10)
                  }
                })
              }
            ],
            success: () => {
              qq.showToast({
                title: `分数上报成功: ${score}分`,
                icon: "none",
                duration: 2000
              });
            }
          });
        }
        break;

      case "showFriendRank":
        if (!SC.friendRankShow) {
          SC.friendRankShow = true;
          ticker.add(tick);

          SC.openDataContext.postMessage({
            event: "showFriendRank"
          });
        }

        break;
      case "close":
        SC.friendRankShow = false;

        ticker.remove(tick);

        SC.rankTiker(PIXI, app);

        SC.openDataContext.postMessage({
          event: "close"
        });

        qq.triggerGC(); // 垃圾回收

        break;
      default:
        break;
    }
  });

  function detectToShowGroup(options) {
    // 初次打开发现要求渲染群排行榜
    if (
      options &&
      options.shareTicket &&
      options.query &&
      options.query.showGroup === "1"
    ) {
      console.log("showGroupRank");
      SC.openDataContext.postMessage({
        event: "showGroupRank",
        shareTicket: options.shareTicket
      });

      container.addChild(close);

      if (!SC.friendRankShow) {
        SC.friendRankShow = true;
        ticker.add(tick);
      }
    }
  }

  qq.onShow(detectToShowGroup);
  detectToShowGroup(obj);

  return container;
};
