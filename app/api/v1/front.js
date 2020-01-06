const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/front'
})

router.get('/article_list', async (ctx, next) => {
  ctx.body = {
    reCode: 200,
    result: {
      article: []
    }
  }
})

module.exports = router
