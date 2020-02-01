require('module-alias/register')
const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
require('@models/article')
require('@models/category')
require('@models/tag')
require('@models/user')

const app = new Koa()
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000)
