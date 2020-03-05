const Router = require('koa-router')
const { sequelize } = require('@core/db')
const { sucess } = require('@core/http')
const { Article } = require('@models/article')
const { Category } = require('@models/category')
const { Tag } = require('@models/tag')
const moment = require('moment')
const { formatDateforList } = require('@core/utils')

const router = new Router({
  prefix: '/v1/front'
})

/** 文章列表 */
router.get('/articleList', async (ctx, next) => {
  let data = await Article.getAll(ctx)
  let articleList = data.article
  let count = data.count
  let categoryList = await Category.getAll()
  // 添加分类
  for (let i = 0; i < categoryList.length; i++) {
    let element = categoryList[i]
    for (let j = 0; j < articleList.length; j++) {
      if (element.id === articleList[j].category) {
        articleList[j].dataValues.category_name = element.name
      }
    }
  }
  // 添加标签
  let tagList = await Tag.getAll()
  for (let i = 0; i < articleList.length; i++) {
    let tagArr = articleList[i].tag.split(',')
    let tagNameArr = [];
    for (let j = 0; j < tagArr.length; j++) {
      for (let k = 0; k < tagList.length; k++) {
        if (tagList[k].id.toString() === tagArr[j]) {
          tagNameArr.push(tagList[k].name)
        }
      }
    }
    articleList[i].tag = tagNameArr.join(',')
  }
  sucess(ctx, {
    articleList,
    count,
    pageSize: 10
  })
})

/** 分类列表 */
router.get('/categoryList', async (ctx, next) => {
  let categoryList = await Category.getAll()
  for (let i = 0; i < categoryList.length; i++) {
    let element = categoryList[i]
    let article = await Article.count({
      where: {
        category: element.id
      }
    })
    categoryList[i].setDataValue('count', article)
  }
  sucess(ctx, {
    categoryList
  })
})

/** 标签列表 */
router.get('/tagList', async (ctx, next) => {
  let tagList = await Tag.getAll()
  let articleList = await Article.findAll()
  for (let i = 0; i < tagList.length; i++) {
    let element = tagList[i]
    element.setDataValue('count', 0)
    for (let j = 0; j < articleList.length; j++) {
      if (articleList[j].tag.indexOf(element.id) >= 0) {
        element.setDataValue('count', element.dataValues.count + 1)
      }
    }
  }
  sucess(ctx, {
    tagList
  })
})

/** 文章详情 */
router.get('/article', async (ctx, next) => {
  let id = ctx.request.query.id
  let detail = await Article.getDetail(ctx)
  let tagList = await Tag.getAll()
  let tagArr = detail.tag.split(',')
  let tagNameArr = []
  for (let i = 0; i < tagArr.length; i++) {
    for (let j = 0; j < tagList.length; j++) {
      if (tagList[j].id.toString() === tagArr[i]) {
        tagNameArr.push(tagList[j].name)
      }
    }
  }
  detail.setDataValue('tag_name', tagNameArr)
  sucess(ctx, {
    detail
  })
})

/** 数量 */
router.get('/count', async (ctx, next) => {
  let article = await Article.getAllCount()
  let category = await Category.getAllCount()
  let tag = await Tag.getAllCount()
  let data = {
    article: await article,
    category: await category,
    tag: await tag
  }
  sucess(ctx, data)
})

/** 文章列表类别分组 */
router.get('/articleListByCategory', async (ctx, next) => {
  let categoryId = ctx.request.query.categoryId
  // 文章列表
  let articleList = await Article.findAll({
    where: {
      category: categoryId
    }
  })
  // 分类名称
  let category = await Category.findOne({
    where: {
      id: categoryId
    }
  })
  let data = {
    name: category.name,
    list: formatDateforList(articleList)
  };
  sucess(ctx, data)
})

/** 文章列表标签分组 */
router.get('/articleListByTag', async (ctx, next) => {
  let tagId = ctx.request.query.tagId
  // 文章列表
  let list = await Article.findAll()
  let articleList = []
  for (let i = 0; i < list.length; i++) {
    let tag = list[i].tag.split(',')
    if (tag.indexOf(tagId) > -1) {
      articleList.push(list[i])
    }
  }
  // 分类名称
  let tag = await Tag.findOne({
    where: {
      id: tagId
    }
  })
  let data = {
    name: tag.name,
    list: formatDateforList(articleList)
  };
  sucess(ctx, data)
})

/** 文章列表时间分组 */
router.get('/articleListByDate', async (ctx, next) => {
  // 文章列表
  let articleList = await Article.findAll()
  // 查询时间分组各项
  let group = await sequelize.query(
    'SELECT created_at FROM blog_article GROUP BY DATE_FORMAT(created_at, "%m-%Y") ORDER BY created_at ASC')
  group = group[0]
  // 循环各项添加文章列表
  let groupList = [];
  for (let i = 0; i < group.length; i++) {
    let date = group[i]
    date.created_at = moment(date.created_at).format('YYYY-MM')
    groupList[i] = {
      time: date.created_at,
      children: []
    }
    for (let j = 0; j < articleList.length; j++) {
      if (moment(articleList[j].created_at).format('YYYY-MM') === groupList[i].time) {
        groupList[i].children.push(articleList[j])
        articleList[j].dataValues.created_at = moment(articleList[j].created_at).format('YYYY-MM-DD')
      }
    }
  }
  sucess(ctx, groupList)
})

module.exports = router
