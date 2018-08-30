'use strict'

const Model = use('Model')

class Pupil extends Model {  
    static boot() {
      super.boot()
      this.addHook('beforeCreate', 'PupilHook.AdmissionNo')
    }
    gurdians() {
      return this.belongsToMany('App/Models/Gurdian')
    }

    class() {
      return this.belongsTo('App/Models/Class')
    } 

    dismissals() {
      return this.hasMany('App/Models/Dismissal')
    }

    pyos() {
      return this.hasMany('App/Models/PYOS', 'id', 'pyos_id')
    }
}

module.exports = Pupil
