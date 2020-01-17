const { sequelize } = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Category extends Model {
  static async getAll() {
    var category = await Category.findAll()
    return category
  }

  static async getCount() {
    let category = await Category.findAndCountAll()
    return category
  }
}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
}, {
  sequelize,
  tableName: 'blog_category'
})

module.exports = {
  Category
}