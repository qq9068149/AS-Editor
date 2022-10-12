const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
// https://console.cloud.tencent.com/cam/capi
const cos = new COS({
  SecretId: 'AKIDzmJbcMozu2tTmoZ3FBpCI7fwxjDRO4Tb',
  SecretKey: 'sTptgCRP5UhcHfoiKfjWyEEzUjiRvA9s',
})


// 腾讯云COS上传文件方法  参数为file文件对象
export const uploadCOS = (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      // 执行上传操作
      cos.putObject(
        {
          Bucket: 'git-1304113371' /* 存储桶 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 文件名 */,
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: file, // 上传文件对象
          onProgress: (progressData) => {
            // 上传进度
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          // 上传成功之后
          if (data.statusCode === 200) {
            resolve(`https://${data.Location}`)
          }
          if (err) reject(err)
        }
      )
    }
  })
}
