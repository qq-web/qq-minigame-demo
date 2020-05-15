import view from "./view";
import { request } from "../apiList";

module.exports = function(PIXI, app, obj) {
  return view(PIXI, app, obj, func => {
    const time = Date.now();
    request(res => {
      func(res, time); // 绘制信息
    });
  });
};
