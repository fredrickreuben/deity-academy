'use strict'

const Model = use('Model')

class Pupil extends Model {
    gurdians() {
      return this.belongsToMany('App/Models/Gurdian')
    }
}

module.exports = Pupil
