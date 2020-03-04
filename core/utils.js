const jwt = require('jsonwebtoken')
const moment = require('moment')

const generateToken = function(uid, scope){
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign({
      uid,
      scope
  },secretKey,{
      expiresIn
  })
  return token
}

const formatDateforList = function (list) {
  for (let i = 0; i < list.length; i++) {
    list[i].dataValues.created_at = moment(list[i].created_at).format('YYYY-MM-DD')
  }
  return list
}

module.exports = {
  generateToken,
  formatDateforList
}