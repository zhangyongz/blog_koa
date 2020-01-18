const jwt = require('jsonwebtoken')
const { HttpException } = require('../core/http')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = ctx.request.header.token

      let errMsg = 'token不合法'
      if (!userToken) {
        throw new HttpException({
          message: errMsg
        })
      }

      try {
        var decode = jwt.verify(userToken, global.config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new HttpException({
          message: errMsg
        })
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new HttpException({
          message: errMsg
        })
      }

      // uid,scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }
}

module.exports = {
  Auth
}