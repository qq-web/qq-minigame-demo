import * as TweenMax from "./TweenMax.min";
function pixiScroll(PIXI, app, property) {
  function ScrollContainer() {
    this.po = new PIXI.Container();
    this.scrollContainer = new PIXI.Container();
    this.po.addChild(this.scrollContainer);
    this.items = [];

    this.mask = new PIXI.Graphics();
    this.mask
      .beginFill(0xffffff)
      .drawRect(
        0,
        135 * (property.height / 1334),
        property.width,
        property.height
      )
      .endFill();
    this.po.addChild(this.mask);
    this.scrollContainer.mask = this.mask;

    this.itemHeight = 0;

    var _this = this;

    var mousedown = false;
    var lastPos = null;
    var lastDiff = null;
    var scrollTween = null;
    // var maxVel = 0;

    function onmousemove(e) {
      var clientY = e.data.global.y;

      if (mousedown) {
        lastDiff = clientY - lastPos.y;
        lastPos.y = clientY;

        if (-_this.scrollContainer.y < 0) {
          _this.scrollContainer.y += lastDiff / 2;
        } else {
          _this.scrollContainer.y += lastDiff;
        }
      }
    }
    function onmousedown(e) {
      var clientY = e.data.global.y;
      mousedown = true;
      if (scrollTween) scrollTween.kill();
      lastPos = {
        y: clientY
      };
    }
    function onmouseup() {
      var goY = _this.scrollContainer.y + lastDiff * 10,
        ease = "Quad.easeOut",
        time = Math.abs(lastDiff / _this.itemHeight),
        contentHigh = property.height;

      if (goY < -_this.itemHeight + contentHigh) {
        goY = -_this.itemHeight + contentHigh;
        ease = "Back.easeOut";
        time = 0.1 + Math.abs(lastDiff / _this.itemHeight);
      }
      if (goY > 0) {
        goY = 0;
        ease = "Back.easeOut";
        time = 0.1 + Math.abs(lastDiff / _this.itemHeight);
      }

      if (_this.scrollContainer.y > 0) {
        time = Math.abs(_this.scrollContainer.y / (contentHigh * 2));
        ease = "Linear";
      }
      if (_this.scrollContainer.y < -_this.itemHeight + contentHigh) {
        time = Math.abs(_this.scrollContainer.y / (contentHigh * 2));
        ease = "Linear";
      }

      scrollTween = TweenMax.to(_this.scrollContainer, time, {
        y: goY,
        ease: ease
      });

      mousedown = false;
      lastPos = null;
      lastDiff = null;
    }

    this.po.interactive = true;
    this.po.touchmove = onmousemove;
    this.po.touchstart = onmousedown;
    this.po.touchend = onmouseup;
  }

  function ListItem(value, apiName) {
    this.po = new PIXI.Container();
    this.bg = new PIXI.Graphics();
    this.po.addChild(this.bg);
    this.width = property.width;
    this.drawHeight = 112 * PIXI.ratio;
    this.cornerRadius = 2 * PIXI.ratio;

    if ((value.children || []).length) {
      this.child = new ChildListItem(this, value.children);
      this.child.po.y = this.drawHeight - this.cornerRadius;
      this.childHeight = this.child.po.height - this.cornerRadius;
      this.po.addChild(this.child.po);
    }

    this.bg
      .beginFill(0xffffff)
      .drawRoundedRect(0, 0, this.width, this.drawHeight, this.cornerRadius)
      .endFill();
    // this.po.x = 30 * PIXI.ratio;

    if (property.isTabBar) {
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources[`images/${apiName}.png`].texture
      );
      this.bg.addChild(sprite);
      sprite.width = sprite.height = 56 * PIXI.ratio;
      sprite.position.set(
        this.width - sprite.width - 32 * PIXI.ratio,
        28 * PIXI.ratio
      );
      text1.call(this, 34, 39);

      let sprite2 = new PIXI.Sprite(
        PIXI.loader.resources[`images/close.png`].texture
      );
      this.bg.addChild(sprite2);
      sprite2.width = sprite2.height = 18 * PIXI.ratio;
      sprite2.position.set(
        32 * PIXI.ratio + sprite2.width / 2,
        47 * PIXI.ratio + sprite2.height / 2
      );
      sprite2.anchor.x = sprite2.anchor.y = 0.5;

      // let line = new PIXI.Graphics();
      // this.bg.addChild(line);
      // line.lineStyle(PIXI.ratio | 0, 0xd8d8d8)
      // .moveTo(32 * PIXI.ratio, 20)
      // .lineTo(parent.width - 32 * PIXI.ratio, 20);
    } else {
      // 这里貌似没有什么用，
      text1.call(this, 26, 26);
      text2.call(this);
    }

    let line = new PIXI.Graphics();
    line.lineStyle(2 * PIXI.ratio, 0xf5f6fa, 1);
    // line.lineStyle(10, 0xF5F6FA, 1);
    line.moveTo(32, 0);
    line.lineTo(this.width, 0);
    line.x = 0;
    line.y = this.drawHeight;
    this.bg.addChild(line);

    // this.drawHeight += 20 * PIXI.ratio;

    this.bg.interactive = true;
    this.bg.apiName = apiName;
    this.bg.touchstart = e => {
      e.target.recordY = e.data.global.y;
    };
    this.bg.touchend = e => {
      if (Math.abs(e.target.recordY - e.data.global.y) < 5) {
        if (this.child) {
          this.child.po.visible = !this.child.po.visible;
          e.target.children[0].alpha = this.child.po.visible ? 0.4 : 1;
          e.target.children[1].alpha = e.target.children[0].alpha;
          e.target.children[2].alpha = e.target.children[0].alpha;
          e.target.children[2].rotation = this.child.po.visible
            ? ((2 * Math.PI) / 360) * 90
            : 0;

          // 这里的取反是因为有展开和收起两种操作。通过正负号标记这里的状态，这样位置上移或下移都可以直接相减。
          this.childHeight = -this.childHeight;

          // 对于当前展开菜单以下的一级菜单，位置统统往下（上）移childHeight(子菜单的总高度)
          for (
            let i = sc.items.indexOf(this) + 1, len = sc.items.length;
            i < len;
            i++
          ) {
            sc.items[i].po.y = sc.items[i].po.y - this.childHeight;
          }

          let lastOne = sc.items.length - 1;

          // 如果当前展开菜单项是列表中的最后一项，因为一级菜单不需要移动位置，
          // 当展开时需要在总高度这里加上子菜单的高度；（当收起时仍然按最后一项的y + ItemHeight计算就可以。）
          // 如果不是最后一项，但是此时最后一项是展开的，则需要总高度=最后一项的y+ItemHeight + 子菜单的高度
          // 如果以上皆不是，则总高度直接=最后一项的y+ItemHeight
          if (sc.items.indexOf(this) === lastOne) {
            if (this.child.po.visible) {
              //visible==true表示展开，false表示收起
              sc.itemHeight =
                sc.items[lastOne].po.y +
                sc.items[lastOne].drawHeight -
                this.childHeight;
            } else {
              sc.itemHeight =
                sc.items[lastOne].po.y + sc.items[lastOne].drawHeight;
            }
          } else {
            if (sc.items[lastOne].child.po.visible) {
              sc.itemHeight =
                sc.items[lastOne].po.y +
                sc.items[lastOne].drawHeight -
                sc.items[lastOne].childHeight;
            } else {
              sc.itemHeight =
                sc.items[lastOne].po.y + sc.items[lastOne].drawHeight;
            }
          }
          return;
        }
        let methods = property.methods,
          callback = methods[methods.indexOf(value)].callback;
        if (callback) return callback(e);
        window.router.navigateTo(e.target.apiName);
      }
    };

    function text1(fontSize, y) {
      let text1 = new PIXI.Text(value.label, {
        fontSize: `${fontSize * PIXI.ratio}px`
      });
      text1.position.set(66 * PIXI.ratio, y * PIXI.ratio);

      this.bg.addChild(text1);
    }

    function text2() {
      let text2 = new PIXI.Text(apiName, {
        fontSize: `${32 * PIXI.ratio}px`
      });
      text2.position.set(32 * PIXI.ratio, 65 * PIXI.ratio);
      this.bg.addChild(text2);
    }
  }

  function ChildListItem(parent, itemList) {
    let po = new PIXI.Graphics(),
      line,
      text,
      icon;
    for (let i = 0, item, len = itemList.length; i < len; i++) {
      item = new PIXI.Graphics();
      item
        .beginFill(0xffffff)
        .drawRect(0, 0, parent.width, 112 * PIXI.ratio)
        .endFill();
      if (i === len - 1) {
        line = new PIXI.Graphics()
          .lineStyle(2 * PIXI.ratio, 0xf5f6fa, 1)
          .moveTo(32 * PIXI.ratio, 112 * PIXI.ratio)
          .lineTo(parent.width, 112 * PIXI.ratio);
        item.addChild(line);
      }

      text = new PIXI.Text(itemList[i].label, {
        fontSize: `${32 * PIXI.ratio}px`,
        lineHeight: 34 * PIXI.ratio
      });
      text.position.set(62 * PIXI.ratio, (item.height - text.height) / 2);

      icon = new PIXI.Sprite(PIXI.loader.resources["images/right.png"].texture);
      icon.width = 13.7 * PIXI.ratio;
      icon.height = 22.9 * PIXI.ratio;
      icon.position.set(
        item.width - icon.width - 33.7 * PIXI.ratio,
        (item.height - icon.height) / 2
      );

      item.y = i * item.height + parent.cornerRadius;

      item.interactive = true;
      item.touchstart = e => {
        if (!e.switchColorFn) e.switchColorFn = switchColorFn;
        e.currentTarget.touchmove = e => {
          if (Math.abs(e.recordY - e.data.global.y) > 4) {
            e.currentTarget.touchmove = e.currentTarget.touchend = null;
            e.switchColorFn.call(item, 0xffffff);
          }
        };
        e.currentTarget.touchend = e => {
          e.target.touchmove = e.target.touchend = null;
          if (Math.abs(e.recordY - e.data.global.y) < 5) {
            let callback = itemList[i].callback;
            callback ? callback(e) : window.router.navigateTo(itemList[i].name);
            e.switchColorFn.call(item, 0xffffff);
          }
        };
        e.recordY = e.data.global.y;
        e.switchColorFn.call(item, 0xededed);
      };
      item.addChild(text, icon);
      po.addChild(item);
      this.totalHeight = item.y + item.height;
    }

    function switchColorFn(color) {
      this.clear();
      this.beginFill(color)
        .drawRect(0, 0, parent.width, 96 * PIXI.ratio)
        .endFill();
    }

    po.beginFill(0xffffff)
      .drawRoundedRect(
        0,
        0,
        parent.width,
        this.totalHeight,
        parent.cornerRadius
      )
      .endFill();

    po.visible = false;
    this.po = po;
  }

  function Headline() {
    let div = new PIXI.Container(),
      sprite = new PIXI.Sprite(
        PIXI.loader.resources["images/APIicon.png"].texture
      );
    let bg = new PIXI.Graphics();
    bg.beginFill(0xffffff)
      .drawRoundedRect(0, 152 * PIXI.ratio, property.width, 332 * PIXI.ratio)
      .endFill();
    div.addChild(bg);
    sprite.width = sprite.height = 96 * PIXI.ratio;
    sprite.position.set(
      (property.width - sprite.width) / 2,
      200 * (property.height / 1334)
    );
    bg.addChild(sprite);

    let text = new PIXI.Text("以下将演示小游戏组件能力，具体属性参数", {
      fontSize: `${28 * PIXI.ratio}px`,
      fill: 0x878b99,
      lineHeight: 42 * PIXI.ratio,
      align: "center"
    });
    text.position.set(
      (property.width - text.width) / 2,
      sprite.y + sprite.height + 40 * PIXI.ratio
    );
    let text2 = new PIXI.Text("详见", {
      fontSize: `${28 * PIXI.ratio}px`,
      fill: 0x878b99,
      lineHeight: 42 * PIXI.ratio,
      align: "center"
    });

    let text3 = new PIXI.Text("QQ小程序开发文档", {
      fontSize: `${28 * PIXI.ratio}px`,
      fill: 0x4d94ff,
      lineHeight: 42 * PIXI.ratio,
      align: "center"
    });

    text2.position.set(
      (property.width - text2.width - text3.width) / 2,
      sprite.y + sprite.height + text.height + 40 * PIXI.ratio
    );
    text3.position.set(
      (property.width - text2.width - text3.width) / 2 + text2.width,
      sprite.y + sprite.height + text.height + 40 * PIXI.ratio
    );
    bg.addChild(text);
    bg.addChild(text2);
    bg.addChild(text3);
    // this.drawHeight = bg.y + bg.height + 20 * PIXI.ratio;
    this.drawHeight = text.y + text.height + text2.height + 80 * PIXI.ratio;
    this.po = div;
    sc.scrollContainer.addChild(this.po);
  }

  function PlaceholderDiv() {
    let div = new PIXI.Graphics();
    div
      .beginFill(0xffffff, 0)
      .drawRect(0, 0, 0, 135 * (property.height / 1334))
      .endFill();
    this.drawHeight = div.height;
    this.po = div;
    sc.scrollContainer.addChild(this.po);
  }
  function GoBack() {
    this.button = new PIXI.Graphics();
    this.arrow = new PIXI.Graphics();
    this.button.position.set(0, 52 * Math.ceil(PIXI.ratio));
    this.button
      .beginFill(0xffffff, 0)
      .drawRect(0, 0, 80 * PIXI.ratio, 80 * PIXI.ratio)
      .endFill();
    this.arrow
      .lineStyle(5 * PIXI.ratio, 0x333333)
      .moveTo(50 * PIXI.ratio, 20 * PIXI.ratio)
      .lineTo(30 * PIXI.ratio, 40 * PIXI.ratio)
      .lineTo(50 * PIXI.ratio, 60 * PIXI.ratio);
    this.button.interactive = true;
    this.button.touchend = () => {
      window.router.navigateBack();
    };

    this.button.addChild(this.arrow);
  }
  function Title() {
    this.box = new PIXI.Graphics();
    this.box
      .beginFill(0xffffff)
      .drawRect(0, 0, property.width, 132 * PIXI.ratio)
      .endFill();
    this.text = new PIXI.Text("小游戏官方组件展示", {
      fontSize: `${34 * PIXI.ratio}px`,
      fill: 0x000
    });
    this.text.position.set(
      (property.width - this.text.width) / 2,
      63 * PIXI.ratio
    );
    this.box.addChild(this.text);
  }

  var sc = new ScrollContainer();
  sc.items.push(property.isTabBar ? new Headline() : new PlaceholderDiv());
  sc.itemHeight += sc.items[0].drawHeight;

  function drawItemsFn(methods) {
    for (var i = 0, len = methods.length; i < len; i++) {
      var li = new ListItem(methods[i], methods[i].name);
      sc.scrollContainer.addChild(li.po);
      li.po.y = sc.items[i].po.y + sc.items[i].drawHeight;
      sc.itemHeight += li.drawHeight;
      sc.items.push(li);
    }
  }

  drawItemsFn(property.methods);

  property.isTabBar
    ? sc.po.addChild(new Title().box)
    : sc.po.addChild(new GoBack().button);

  app.stage.addChild(sc.po);
  return sc.po;
}

module.exports = pixiScroll;
