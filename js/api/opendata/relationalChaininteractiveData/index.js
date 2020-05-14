import view from "./view";
import ShareCanvas from "../openDataContext/ShareCanvas";

module.exports = function(PIXI, app, obj) {
  const SC = new ShareCanvas();

  const tick = () => {
    SC.rankTiker(PIXI, app);
  };
  const ticker = PIXI.ticker.shared;

  return view(PIXI, app, obj, (data, underline) => {
    const { status } = data;
    switch (status) {
      case "relationalChaininteractiveData":
        // 初始化
        if (!SC.friendRankShow) {
          SC.friendRankShow = true;
          ticker.add(tick);

          SC.openDataContext.postMessage({
            event: "relationalChaininteractiveData"
          });
        }

        // shareCanvas在上面初始化时还不知道下y座标。布局需要根据下划线的位置再往下移60，所以在知道下划线位置后更新一下canvas的位置。
        SC.updateSubViewPos(underline.y + 60);

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
};
