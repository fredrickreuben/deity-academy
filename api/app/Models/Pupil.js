'use strict'

const Model = use('Model')

class Pupil extends Model {  
    static boot() {
      super.boot()
      this.addTrait('App/Models/Traits/Pupil')
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

    pupilOtherPayments() {
      return this.hasMany('App/Models/PupilOtherPayment')
    }

    scholarships() {
      return this.hasMany('App/Models/Scholarship')
    }

    totalpayment() {
      return this.hasMany('App/Models/OtherPayment')
    }

    payment() {
      return this.hasMany('App/Models/Payment')
    }
}

module.exports = Pupil
