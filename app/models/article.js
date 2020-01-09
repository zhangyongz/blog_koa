const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Article extends Model {
  static async getAll() {
    var article = await Article.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })
    return article
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