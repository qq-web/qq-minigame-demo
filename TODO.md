## TODO list

1. 录音功能安卓未实现。recorderManager.onStart没有取消注册之前的内容导致重复调用。(基础库问题，folger跟进)
5. ios互动分享图片为空问题。（客户端修改）

## 测试注意事项

1. 需要基础库1.13.0（安卓8.3.3）以上。否则开放数据域的canvas会有问题
在IDE上需要基础库1.14.0以上，否则worker会出现问题（仅在IDE上）。
3. 主动分享——一键分享回原会话，目前安卓可能会拉起选择器，而没有直接分享回原会话。客户端在跟进。(gooyao, abnerjluo)
4. canvas.toTempFilePathSync接口有问题，导致分享的图片变形。客户端主要是比例不对，ide不起作用。（folger会跟进）
5. 模板消息7天内只能发一次……
6. 业务形态决定，createBannerButton一个页面上只允许创建一个bannerAD


## 开发注意
1. 关系链互动需要很新的IDE，才有上传jsserver的功能。
2. 模板消息需要的formId在IDE上登录不会触发平台推送
