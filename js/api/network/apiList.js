module.exports = {
    request(callback) {
        qq.request({
            url: 'https://q.qq.com',
            success(res) {
                qq.showToast({
                    title: '请求成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(res);
            },
            fail() {
                qq.showToast({
                    title: '请求失败',
                    icon: 'success',
                    duration: 1000
                });
            }
        });
    },
    downloadFile(callback) {
        qq.downloadFile({
            url: 'https://qzonestyle.gtimg.cn/aoi/sola/20190717151707_2LoGUX7hZ1.png',
            success(res) {
                qq.showToast({
                    title: '下载成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(res);
            },
            fail() {
                qq.showToast({
                    title: '下载失败',
                    icon: 'success',
                    duration: 1000
                });
            }
        });
    },
    uploadFile(imageSrc, callback) {
        qq.showLoading({
            title: '上传中...',
            mask: true
        });
        qq.uploadFile({
            url: 'https://q.qq.com/upload',
            filePath: imageSrc,
            name: 'data',
            success(res) {
                qq.hideLoading();
                console.log('uploadImage success, res is:', res);
                qq.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(true);
            },
            fail({ errMsg }) {
                qq.hideLoading();
                console.log('uploadImage fail, errMsg is', errMsg);
                qq.showToast({
                    title: '上传失败',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(false);
            }
        });
    }
};
