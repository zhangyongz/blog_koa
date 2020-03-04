const multer = require('koa-multer');
//配置    
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'static/images/')  //注意路径必须存在
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".")
    cb(null, fileFormat[0] + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})

//加载配置
let upload = multer({ storage: storage })

module.exports = upload
