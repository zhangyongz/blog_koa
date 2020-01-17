const Router = require('koa-router')
const { sucess, HttpException } = require('../../../core/http')
const { User } = require('../../models/user')
const { Article } = require('../../models/article')
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

/** 上传文章 */
router.post('/uploadArticle', async (ctx, next) => {
  let body = ctx.request.body
  let title = body.title
  let value = body.value
  let render = body.render
  let category = body.category
  let tag
  if (body.tag) {
    tag = body.tag.join(',')
  }
  let describle = body.describle
  let coverImg = body.cover_img
  if (!title || !value || !render || !category || !tag || !describle || !coverImg) {
    throw new HttpException({
      message: '请传必填字段'
    })
  }
  let data = {
    title: title,
    value: value,
    render: render,
    category: category,
    tag: tag,
    describle: describle,
    cover_img: coverImg
  }
  await Article.create(data)
  sucess(ctx, {
    data
  })
})

module.exports = router
