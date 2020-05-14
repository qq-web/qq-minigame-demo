## TODO list

1. 开放数据域——群排行，从分享的消息中打开并未显示群排行。——done。
4. 首页列表滚去，最后一行展开后滚动有问题，拉不上去。  --done
5. 分享图片为空问题。

## 测试注意事项

1. 需要基础库1.13.0（安卓8.3.3）以上。否则开放数据域的canvas会有问题
2. createXXXButton这一类的api有lineHeight问题，导致按钮文字没有垂直居中。客户端836修复。http://tapd.oa.com/QYY/bugtrace/bugs/view?bug_id=1020394322078315821
3. 主动分享——一键分享回原会话，目前安卓可能会拉起选择器，而没有直接分享回原会话。客户端在跟进。(gooyao, abnerjluo)
4. canvas.toTempFilePathSync接口有问题，导致分享的图片变形。客户端主要是比例不对，ide不起作用。（folger会跟进）
5. 模板消息7天内只能发一次……
6. 业务形态决定，createBannerButton一个页面上只允许创建一个bannerAD

## 开发注意
1. 关系链互动需要很新的IDE，才有上传jsserver的功能。
2. 模板消息需要的formId在IDE上登录不会触发平台推送
