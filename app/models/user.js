const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { HttpException } = require('../../core/http')

class User extends Model {
  static async verifyPassword(username, password) {
    const user = await User.findOne({
      where: {
        username
      }
    })
    if (!user) {
      throw new HttpException({
        message: '账号不存在'
      })
    }
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new HttpException({
        message: '密码不正确'
      })
    }
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  }
}, {
  sequelize,
  tableName: 'blog_user'
})

module.exports = {
  User
}