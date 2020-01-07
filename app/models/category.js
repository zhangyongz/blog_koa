const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Category extends Model {

}

Category.init({
  category_id: {
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