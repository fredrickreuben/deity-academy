'use strict'

const Model = use('Model')

class TOS extends Model {
    yos(){
        return this.belongsTo('App/Models/YOS', 'yos_id', 'id')
    }

    feestructures() {
      return this.hasMany('App/Models/FeeStucture', 'id', 'tos_id')
    }

    otherpayments() {
      return this.hasMany('App/Models/OtherPayment', 'id', 'tos_id')
    }

    totalpayments() {
      return this.hasMany('App/Models/OtherPayment', 'id', 'tos_id')
    }
}

module.exports = TOS
