const { Sequelize, Model } = require('sequelize')
const {unset, clone, isArray} = require('lodash')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci' 
    },
    timestamps: true
  }
})

sequelize.sync({
  force: false
})

Model.prototype.toJSON= function(){
  let data = clone(this.dataValues)
  // unset(data, 'updated_at')
  // unset(data, 'created_at')
  // unset(data, 'deleted_at')

  if(isArray(this.exclude)){
      this.exclude.forEach(
          (value)=>{
              unset(data,value)
          }
      )
  }
  return data
}

module.exports = {
  sequelize
}
