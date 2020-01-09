const Router = require('koa-router')

const {
  Article
} = require('../../models/article')

const router = new Router({
  prefix: '/v1/front'
})

router.get('/article_list', async (ctx, next) => {
  var article = await Article.getAll()
  ctx.body = {
    reCode: 200,
    result: {
      article: article
    }
  }
})

module.exports = router
