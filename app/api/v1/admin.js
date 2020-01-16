const Router = require('koa-router')
const { sucess, HttpException } = require('../../../core/http')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/utils')

const router = new Router({
  prefix: '/v1/admin'
})

/** 注册 */
router.post('/reg', async (ctx, next) => {
  let body = ctx.request.body
  let username = body.username
  let password = body.password
  let password2 = body.password2
  if (password !== password2) {
    throw new HttpException({
      message: '两次输入密码不一致'
    })
  }
  const user = await User.findOne({
    where: {
      username
    }
  })
  if (user) {
    throw new HttpException({
      message: '用户名已存在'
    })
  }
  const userInfo = {
    username,
    password
  }
  await User.create(userInfo)
  sucess(ctx, {
    userInfo
  })
})

/** 登录 */
router.post('/login', async (ctx, next) => {
  let body = ctx.request.body
  let username = body.username
  let password = body.password
  const user = await User.verifyPassword(username, password)
  let token = generateToken(user.id)
  sucess(ctx, {
    token
  })
})


module.exports = router
