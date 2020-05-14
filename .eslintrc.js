module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "promise"],
  rules: {
    // 不准使用 console
    "no-console": [0],
    // 不许修改参数内容
    "no-param-reassign": [0],
    // reject 必须返回 Error 对象
    "prefer-promise-reject-errors": [0],
    // 字符串和正则里加不必要的斜线也报错
    "no-useless-escape": [0],
    // 这个可能会导致短路判断报错
    "no-unused-expressions": [2, { allowShortCircuit: true }],
    // 不知道为什么, 解析 mixin 好像会炸
    "import/no-unresolved": [2, { ignore: ["imgBehavior.js"] }],
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "no-nested-ternary": "off",
    "array-callback-return": "off",
    "consistent-return": "off",

    // 函数入参是可以允许定义了不使用的
    "no-unused-vars": ["error", { args: "none" }],

    "no-underscore-dangle": "off",
    "no-use-before-define": ["error", { functions: false }],

    // promise 必须 catch 或者 return，防止将错误抛到全局
    "promise/catch-or-return": "error",

    // 需要优化函数太长问题的时候，把这个打开
    // 'max-lines-per-function': [1, { max: 50, skipBlankLines: true }],

    // 下面这坨设置其实是不合理的，不过为了现在的代码能通过lint，先设置成 warning，未来改回 error
    eqeqeq: [1],
    "no-plusplus": [1, { allowForLoopAfterthoughts: true }],
    "no-bitwise": [1],
    "no-continue": [1]
  },
  globals: {
    getApp: true,
    getCurrentPages: true,

    App: true,
    Page: true,
    Component: true,
    Behavior: true,

    qq: true,
    wx: true,
    canvas: true,
    window: true
  }
};
