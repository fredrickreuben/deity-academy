'use strict'

const Model = use('Model')

class Department extends Model {
    staff() {
      return this.belongsTo('App/Models/Staff')
    }

    hod() {
      return this.hasOne('App/Models/Hod')
    }
}

module.exports = Department
