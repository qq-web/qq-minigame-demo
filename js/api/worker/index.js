import view from "./view";

module.exports = function(PIXI, app, obj) {
  const worker = qq.createWorker("workers/index.js");

  return view(PIXI, app, obj, res => {
    let num;
    let fabonacci;
    const { status, fabonacciIndex } = res;
    switch (status) {
      case "noWorker":
        fabonacci = n => {
          return n < 2 ? n : fabonacci(n - 1) + fabonacci(n - 2);
        };

        num = fabonacci(fabonacciIndex);

        qq.showModal({
          content: `${num}`,
          title: "计算结果"
        });
        break;
      case "Worker":
        console.log(1);
        worker.postMessage({
          msg: fabonacciIndex
        });
        console.log(2);
        worker.onMessage(m => {
          qq.showModal({
            content: `${m.msg}`,
            title: "计算结果"
          });
          console.log(110);
        });
        break;
      default:
        break;
    }
  });
};
