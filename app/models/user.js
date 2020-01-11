const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class User extends Model {

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