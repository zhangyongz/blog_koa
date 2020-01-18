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

  static async getAllCount() {
    let tag = await Tag.count()
    return tag
  }

  static async getCount(ctx) {
    let id = ctx.request.body.id
    let count = await Tag.count({
      where: {
        id
      }
    })
    return count
  }

  static async addTag(ctx) {
    let name = ctx.request.body.name
    let tag = await Tag.create({
      name
    })
    return tag
  }

  static async deleteTag(ctx) {
    let id = ctx.request.body.id
    let data = await Tag.destroy({
      where: {
        id
      }
    })
    return data
  }

  static async updateTag(ctx) {
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    let category = await Tag.update({
      name
    }, {
      where: {
        id
      }
    })
    return category
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