function sucess(ctx, result={}, reInfo='操作成功') {
  ctx.body = {
    reCode: 200,
    result,
    reInfo
  }
}

class HttpException extends Error {
  constructor(message = '服务器异常', errorCode = 201) {
    super()
    this.message = message
    this.errorCode = errorCode
  }
}

module.exports = {
  sucess,
  HttpException
}
