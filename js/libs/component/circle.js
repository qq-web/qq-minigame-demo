module.exports = function(PIXI, deploy = {}) {
  const {
    radius = 0,
    background = {
      color: 0xffffff,
      alpha: 1
    },
    border = {
      width: 0,
      color: 0xffffff,
      alpha: 1
    },
    x = radius,
    y = radius
  } = deploy;

  function Circle() {
    this.lineStyle(border.width, border.color, border.alpha)
      .beginFill(background.color, background.alpha)
      .drawCircle(0, 0, radius)
      .endFill();

    (this.setPositionFn = function(pos = {}) {
      pos = Object.assign({ x, y }, pos);
      this.position.set(pos.x, pos.y);
    }).call(this);

    this.onClickFn = function(callBack) {
      this.interactive = true;
      this.touchstart = e => {
        e.currentTarget.touchend = ev => {
          ev.target.touchend = null;
          if (Math.abs(ev.recordY - ev.data.global.y) < 5) {
            callBack(ev);
          }
        };
        e.recordY = e.data.global.y;
      };
    };

    this.onTouchMoveFn = function(callBack) {
      this.interactive = true;
      this.touchstart = e => {
        e.currentTarget.touchmove = ev => {
          callBack(ev);
        };
      };
    };

    this.turnColors = function(colorSetting = {}) {
      let { background: newBackground, border: newBorder } = colorSetting;

      newBackground = Object.assign({}, background, newBackground);
      newBorder = Object.assign({}, border, newBorder);

      this.clear();
      this.lineStyle(newBorder.width, newBorder.color, newBorder.alpha)
        .beginFill(newBackground.color, newBackground.alpha)
        .drawCircle(0, 0, radius)
        .endFill();
    };
    this.hideFn = function() {
      this.visible = false;
    };
    this.showFn = function() {
      this.visible = true;
    };
  }
  Circle.prototype = new PIXI.Graphics();
  return new Circle();
};
