'use strict'

const Model = use('Model')

class Class extends Model { 
    stream() {
      return this.belongsTo('App/Models/Stream')
    }

    teacher() {
      return this.belongsTo('App/Models/Staff', 'teacher_id', 'id')
    }

    sos() {
      return this.belongsTo('App/Models/SOS', 'sos_id', 'id')
    }

    pupils(){
      return this.hasMany('App/Models/Pupil')
    }
}

module.exports = Class
