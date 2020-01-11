const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = {
      msg: error,
      error_code: 201,
      request: `${ctx.method} ${ctx.path}`
    }
    ctx.status = 500
  }
}

module.exports = catchError