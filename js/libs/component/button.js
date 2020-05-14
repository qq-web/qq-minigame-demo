module.exports = function(PIXI, deploy = {}) {
  const {
    width = canvas.width - 80 * PIXI.ratio,
    height = 90 * PIXI.ratio,
    parentWidth = canvas.width,
    color = 0x00cafc,
    alpha = 1,
    border = {
      width: 0,
      color: 0xffffff,
      alpha: 1
    },
    x = (parentWidth - width) / 2,
    y = 0,
    radius = 12
  } = deploy;

  function Button() {
    const kind = new PIXI.Graphics();
    const maskLayer = new PIXI.Graphics();
    const shape = radius ? "drawRoundedRect" : "drawRect";

    this.position.set(x, y);
    this.addChild(kind, maskLayer);

    kind
      .lineStyle(border.width, border.color, border.alpha)
      .beginFill(color, alpha);
    kind[shape](0, 0, width, height, radius).endFill();

    maskLayer.lineStyle(border.width, 0x000000, 0.1).beginFill(0x000000, 0.1);
    maskLayer[shape](0, 0, width, height, radius).endFill();
    maskLayer.visible = false;

    this.onClickFn = function(callBack) {
      this.interactive = true;
      this.touchstart = e => {
        maskLayer.visible = true;
        e.recordY = e.data.global.y;
        e.currentTarget.touchend = evt => {
          maskLayer.visible = false;
          evt.target.touchend = null;
          if (Math.abs(evt.recordY - evt.data.global.y) < 5) {
            callBack(evt);
          }
        };
      };
    }.bind(kind);

    this.offClickFn = function() {
      this.interactive = false;
      this.touchstart = null;
    }.bind(kind);

    this.isTouchable = function(boolean) {
      this.interactive = boolean;
    }.bind(kind);

    this.turnColors = function(_deploy = {}) {
      const { color: newColor, alpha: newAlpha } = _deploy;
      let { border: newBorder } = _deploy;
      newBorder = Object.assign({}, border, newBorder);

      this.clear();
      this.lineStyle(newBorder.width, newBorder.color, newBorder.alpha)
        .beginFill(newColor || color, newAlpha || alpha)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill();
    }.bind(kind);

    this.myAddChildFn = function(...arr) {
      this.addChild(...arr);
    }.bind(kind);

    this.hideFn = function() {
      this.visible = false;
    };
    this.showFn = function() {
      this.visible = true;
    };
  }
  Button.prototype = new PIXI.Container();
  return new Button();
};
