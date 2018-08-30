'use strict'

const Model = use('Model')

class Department extends Model {
    staff() {
      return this.belongsTo('App/Models/Staff')
    }
}

module.exports = Department
