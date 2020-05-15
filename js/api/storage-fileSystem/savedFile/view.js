import { pButton, pText, pBox, pScroll } from "../../../libs/component/index";
import fixedTemplate from "../../../libs/template/fixed";

function dateFormat(time, fmt) {
  const o = {
    "M+": time.getMonth() + 1, // 月份
    "d+": time.getDate(), // 日
    "h+": time.getHours(), // 小时
    "m+": time.getMinutes(), // 分
    "s+": time.getSeconds(), // 秒
    "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${time.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  for (let i = 0, arr = Object.keys(o), len = arr.length; i < len; i++) {
    if (new RegExp(`(${arr[i]})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[arr[i]]
          : `00${o[arr[i]]}`.substr(`${o[arr[i]]}`.length)
      );
    }
  }

  return fmt;
}

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const { goBack, title, apiName, underline, logo } = fixedTemplate(PIXI, {
    obj,
    title: "本地缓存文件",
    apiName: "get/remove/SavedFile(List?)"
  });
  const bottomBg = new PIXI.Graphics();
  bottomBg
    .beginFill(0xf5f6fa)
    .drawRoundedRect(
      0,
      underline.y + 60 * PIXI.ratio,
      app.renderer.view.width,
      app.renderer.view.height
    )
    .endFill();

  const scroll = pScroll(PIXI, {
    height: 700 * PIXI.ratio,
    y: underline.height + underline.y + 80 * PIXI.ratio
  });
  const getSavedFileListButton = pButton(PIXI, {
    width: 686 * PIXI.ratio,
    y: underline.height + underline.y + 120 * PIXI.ratio
  });

  function showListFn(paperFile) {
    const divDeploy = {
      height: 0,
      border: { width: PIXI.ratio | 0, color: 0xe5e5e5 }
    };
    const divChildArr = [];
    const infoMapping = {
      filePath: {
        name: "文件路径",
        func(path, arr) {
          path = pText(PIXI, {
            content: path,
            fontSize: 28 * PIXI.ratio,
            fill: 0x03081a,
            lineHeight: 34 * PIXI.ratio,
            x: 216 * PIXI.ratio,
            y: arr[arr.length - 1].y
          });
          const boxWidth = 500 * PIXI.ratio;
          const textWidth = path.width;
          if (textWidth > boxWidth) {
            const textArr = [];
            const { text } = path;
            const len = path.text.length;
            let fontWidth = 0;
            let startValue = 0;
            let endValue = 0;

            fontWidth = text[0].width;

            for (let i = 0, num = ~~(textWidth / boxWidth); i <= num; i++) {
              let width = 0;
              while (width < boxWidth) {
                endValue += ~~((boxWidth - width) / fontWidth) || 1;
                if (len <= endValue) {
                  endValue++;
                  break;
                }

                path.text = text.slice(startValue, endValue);
                ({ width } = path);
              }
              endValue--;
              textArr.push(text.slice(startValue, endValue));
              if (len <= endValue) break;
              startValue = endValue;
            }
            path.turnText(textArr.join("\n"));
          }
          arr.push(path);
        }
      },
      size: {
        name: "文件大小",
        func(size, arr) {
          arr.push(
            pText(PIXI, {
              content: `${size}B`,
              fontSize: 28 * PIXI.ratio,
              fill: 0x03081a,
              lineHeight: 34 * PIXI.ratio,
              x: 216 * PIXI.ratio,
              y: arr[arr.length - 1].y
            })
          );
        }
      },
      createTime: {
        name: "储存时间",
        func(time, arr) {
          arr.push(
            pText(PIXI, {
              content: dateFormat(new Date(time * 1000), "yyyy-MM-dd hh:mm:ss"),
              fontSize: 28 * PIXI.ratio,
              fill: 0x03081a,
              lineHeight: 34 * PIXI.ratio,
              x: 216 * PIXI.ratio,
              y: arr[arr.length - 1].y
            })
          );
        }
      }
    };

    for (let i = 0, len = paperFile.length; i < len; i++) {
      const storageTextArr = [];
      const lineHeight = 15 * PIXI.ratio;
      for (
        let j = 0, arr = Object.keys(paperFile[i]), l = arr.length;
        j < l;
        j++
      ) {
        const index = j && j * 2 - 1;
        storageTextArr.push(
          pText(PIXI, {
            content: infoMapping[arr[j]].name,
            fontSize: 28 * PIXI.ratio,
            fill: 0x03081a,
            lineHeight: 34 * PIXI.ratio,
            x: 32 * PIXI.ratio,
            y: j
              ? storageTextArr[index].y +
                storageTextArr[index].height +
                lineHeight
              : lineHeight
          })
        );
        infoMapping[arr[j]].func(paperFile[i][arr[j]], storageTextArr);
      }
      const lastOne = storageTextArr[storageTextArr.length - 1];
      divChildArr[i] = pBox(PIXI, {
        height: lastOne.height + lastOne.y + lineHeight / 2,
        y:
          i &&
          divChildArr[i - 1].height + divChildArr[i - 1].y - (PIXI.ratio | 0)
      });

      divChildArr[i].addChild(...storageTextArr);
    }

    divDeploy.height =
      divChildArr[divChildArr.length - 1].y +
      divChildArr[divChildArr.length - 1].height;

    const div = pBox(PIXI, divDeploy);
    div.addChild(...divChildArr);
    scroll.myAddChildFn([div]);
    const whoHigh = div.height > scroll.height;
    scroll.isTouchable(whoHigh);

    const removeSavedFileButton = pButton(PIXI, {
      width: 686 * PIXI.ratio,
      height: 90 * PIXI.ratio,
      color: 0xffffff,
      y: (whoHigh ? scroll : div).height + scroll.y + 69 * PIXI.ratio
    });

    // 清空本地缓存文件列表 “按钮” 开始
    removeSavedFileButton.myAddChildFn(
      pText(PIXI, {
        content: "清空本地缓存文件列表",
        fontSize: 34 * PIXI.ratio,
        fill: 0x03081a,
        relative_middle: {
          containerWidth: removeSavedFileButton.width,
          containerHeight: removeSavedFileButton.height
        }
      })
    );
    removeSavedFileButton.onClickFn(() => {
      callBack({
        status: "removeSavedFile",
        paperFile,
        drawFn() {
          container.removeChild(scroll).destroy(true);
          container.removeChild(removeSavedFileButton).destroy(true);
          getSavedFileListButton.showFn();
        }
      });
    });
    // 清空本地缓存文件列表 “按钮” 结束

    container.addChild(scroll, removeSavedFileButton);
  }

  // 获取本地缓存文件列表 “按钮” 开始
  getSavedFileListButton.myAddChildFn(
    pText(PIXI, {
      content: "获取本地缓存文件列表",
      fontSize: 34 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: {
        containerWidth: getSavedFileListButton.width,
        containerHeight: getSavedFileListButton.height
      }
    })
  );
  getSavedFileListButton.onClickFn(() => {
    callBack({
      status: "getSavedFileList",
      drawFn(arr) {
        showListFn(arr);
        getSavedFileListButton.hideFn();
      }
    });
  });
  // 获取本地缓存文件列表 “按钮” 结束

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    bottomBg,
    getSavedFileListButton,
    logo
  );
  app.stage.addChild(container);

  return container;
};
