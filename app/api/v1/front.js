const Router = require('koa-router')
const { Article } = require('../../models/article')
const { Category } = require('../../models/category')
const { Tag } = require('../../models/tag')
const { clone } = require('lodash')

const router = new Router({
  prefix: '/v1/front'
})

/** 文章列表 */
router.get('/article_list', async (ctx, next) => {
  let articleList = await Article.getAll(ctx)
  let categoryList = await Category.getAll()
  // 添加分类
  for (let i = 0; i < categoryList.length; i++) {
    let element = categoryList[i];
    for (let j = 0; j < articleList.length; j++) {
      if (element.id === articleList[j].category) {
        articleList[j].category = element.name;
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
  ctx.body = {
    reCode: 200,
    result: {
      articleList
    }
  }
})

/** 分类列表 */
router.get('/category_list', async (ctx, next) => {
  let categoryList = await Category.getAll()
  for (let i = 0; i < categoryList.length; i++) {
    let element = categoryList[i]
    let article = await Article.findAndCountAll({
       where: {
          category: element.id
       }
    })
    categoryList[i].count = article.count
    // for (let j = 0; j < articleList.length; j++) {
    //   if (element.category_id === articleList[j].category) {
    //     element.count += 1;
    //   }
    // }
  }
  ctx.body = {
    reCode: 200,
    result: {
      categoryList
    }
  }
})

/** 标签列表 */
router.get('/tag_list', async (ctx, next) => {
  let tag = await Tag.getAll()
  ctx.body = {
    reCode: 200,
    result: {
      tag
    }
  }
})

/** 文章详情 */
router.get('/article', async (ctx, next) => {
  let id = ctx.request.query.id
  let detail = await Article.getDetail(ctx)
  ctx.body = {
    reCode: 200,
    result: {
      detail
    }
  }
})

module.exports = router
