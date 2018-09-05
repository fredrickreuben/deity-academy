'use strict'

const Model = use('Model')

class Gurdian extends Model {
    pupils() {
      return this.belongsToMany('App/Models/Pupil')
    }

    user() {
      return this.belongsTo('App/Models/User')
    }

    staff() {
      return this.hasOne('App/Models/Staff')
    }

    payments() {
      return this.hasMany('App/Models/Payment')
    }
}

module.exports = Gurdian
