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

  static async getCount(options) {
    let article = await Article.findAndCountAll(options)
    return article
  }

  static async getDetail(ctx) {
    var id = ctx.request.query.id
    var detail = await Article.findOne({
      id
    })
    return detail
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