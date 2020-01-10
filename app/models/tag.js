const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Tag extends Model {
  static async getAll() {
    var tag = await Tag.findAll()
    return tag
  }
}

Tag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
}, {
  sequelize,
  tableName: 'blog_tag'
})

module.exports = {
  Tag
}