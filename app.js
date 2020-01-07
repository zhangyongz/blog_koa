const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
require('./app/models/article')
require('./app/models/category')
require('./app/models/tag')
require('./app/models/user')

const app = new Koa()
app.use(parser())

InitManager.initCore(app)

app.listen(3000)
