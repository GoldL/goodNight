const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('./db')

class GoodNight extends Model {}

GoodNight.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动增长
  },
  content: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'goodnight'
})

module.exports = {
  GoodNight
}