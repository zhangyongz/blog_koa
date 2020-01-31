const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Article extends Model {
  static async getAll(ctx) {
    var page = ctx.request.query.page || 1
    var article = await Article.findAll({
      order: [
        ['created_at', 'DESC']
      ],
      offset: 10 * (page - 1), limit: 10
    })
    return article
  }

  static async getAllCount() {
    let article = await Article.count()
    return article
  }

  static async getDetail(ctx) {
    var id = ctx.request.query.id
    var detail = await Article.findOne({
      where: {
        id
      }
    })
    return detail
  }

  static async getCount(ctx) {
    let id = ctx.request.body.id
    let count = await Article.count({
      where: {
        id
      }
    })
    return count
  }

  static async deleteArticle(ctx) {
    var id = ctx.request.body.id
    var data = await Article.destroy({
      where: {
        id
      }
    })
    return data
  }
}

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  value: Sequelize.TEXT('long'),
  render: Sequelize.TEXT('long'),
  describle: Sequelize.STRING,
  category: Sequelize.INTEGER,
  tag: Sequelize.STRING,
  cover_img: Sequelize.STRING
}, {
  sequelize,
  tableName: 'blog_article'
})

module.exports = {
  Article
}