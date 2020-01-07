const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Tag extends Model {

}

Tag.init({
  tag_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tag_name: Sequelize.STRING
}, {
  sequelize,
  tableName: 'blog_tag'
})

module.exports = {
  Tag
}