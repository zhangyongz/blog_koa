const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
require('./app/models/article')

const app = new Koa()
app.use(parser())

InitManager.initCore(app)

app.listen(3000)
