'use strict'

const Model = use('Model')

class Dismissal extends Model { 
    pupil() {
      return this.belongsTo('App/Models/Pupil')
    }

    staff() {
      return this.belongsTo('App/Models/Staff')
    }
}

module.exports = Dismissal
