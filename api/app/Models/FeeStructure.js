'use strict'

const Model = use('Model') 

class FeeStructure extends Model {
    sos() {
      return this.belongsTo('App/Models/SOS', 'sos_id', 'id')
    }

    tos() {
      return this.belongsTo('App/Models/TOS', 'tos_id', 'id')
    }

    payment() {
      return this.hasMany('App/Models/Payment')
    }
}

module.exports = FeeStructure
