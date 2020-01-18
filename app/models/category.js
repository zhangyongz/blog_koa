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

  static async getAllCount() {
    let category = await Category.count()
    return category
  }

  static async getCount(ctx) {
    let id = ctx.request.body.id
    let count = await Category.count({
      where: {
        id
      }
    })
    return count
  }

  static async addCategory(ctx) {
    let name = ctx.request.body.name
    let category = await Category.create({
      name
    })
    return category
  }

  static async deleteCategory(ctx) {
    let id = ctx.request.body.id
    let data = await Category.destroy({
      where: {
        id
      }
    })
    return data
  }

  static async updateCategory(ctx) {
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    let category = await Category.update({
      name
    }, {
      where: {
        id
      }
    })
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