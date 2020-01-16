const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = {
      reInfo: err.message,
      reCode: err.errerrorCode || 201,
      request: `${ctx.method} ${ctx.path}`
    }
    ctx.status = 200
  }
}

module.exports = catchError