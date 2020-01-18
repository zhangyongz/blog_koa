const Router = require('koa-router')
const { sucess, HttpException } = require('../../../core/http')
const { User } = require('../../models/user')
const { Article } = require('../../models/article')
const { Category } = require('../../models/category')
const { Tag } = require('../../models/tag')
const { generateToken } = require('../../../core/utils')
const { Auth } = require('../../../middlewares/auth')

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
  let token = generateToken(user.id, Auth.ADMIN)
  sucess(ctx, {
    token
  })
})

/** 上传文章 */
router.post('/uploadArticle', new Auth().m, async (ctx, next) => {
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
    article: data
  })
})

/** 更新文章 */
router.post('/updateArticle', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body
  let id = body.id
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
  if (!id || !title || !value || !render || !category || !tag || !describle || !coverImg) {
    throw new HttpException({
      message: '请传必填字段'
    })
  }
  let article = await Article.getCount(ctx)
  if (!article) {
    throw new HttpException({
      message: '此文章不存在'
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
  await Article.update(data, {
    where: {
      id
    }
  })
  sucess(ctx, {
    article: data
  })
})

/** 删除文章 */
router.post('/deleteArticle', new Auth().m, async (ctx, next) => {
  let article = await Article.getCount(ctx)
  if (!article) {
    throw new HttpException({
      message: '此文章不存在'
    })
  }
  let data = await Article.deleteArticle(ctx)
  sucess(ctx, data)
})

/** 添加分类 */
router.post('/addCategory', new Auth().m, async (ctx, next) => {
  let category = await Category.addCategory(ctx)
  sucess(ctx, category)
})

/** 删除分类 */
router.post('/deleteCategory', new Auth().m, async (ctx, next) => {
  let category = await Category.getCount(ctx)
  if (!category) {
    throw new HttpException({
      message: '此分类不存在'
    })
  }
  let data = await Category.deleteCategory(ctx)
  sucess(ctx, data)
})

/** 编辑分类 */
router.post('/editCategory', new Auth().m, async (ctx, next) => {
  let category = await Category.getCount(ctx)
  if (!category) {
    throw new HttpException({
      message: '此分类不存在'
    })
  }
  let data = await Category.updateCategory(ctx)
  sucess(ctx, data)
})

/** 添加标签 */
router.post('/addTag', new Auth().m, async (ctx, next) => {
  let tag = await Tag.addTag(ctx)
  sucess(ctx, tag)
})

/** 删除标签 */
router.post('/deleteTag', new Auth().m, async (ctx, next) => {
  let tag = await Tag.getCount(ctx)
  if (!tag) {
    throw new HttpException({
      message: '此标签不存在'
    })
  }
  let data = await Tag.deleteTag(ctx)
  sucess(ctx, data)
})

/** 编辑标签 */
router.post('/editTag', new Auth().m, async (ctx, next) => {
  let tag = await Tag.getCount(ctx)
  if (!tag) {
    throw new HttpException({
      message: '此标签不存在'
    })
  }
  let data = await Tag.updateTag(ctx)
  sucess(ctx, data)
})

module.exports = router
