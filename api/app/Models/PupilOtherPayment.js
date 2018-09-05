'use strict'

const Model = use('Model')

class PupilOtherPayment extends Model {
    otherPayment() {
      return this.belongsTo('App/Models/OtherPayment')
    }

    pupil() {
      return this.belongsTo('App/Models/Pupil')
    }

    payment() {
      return this.hasMany('App/Models/Payment')
    }
}

module.exports = PupilOtherPayment
