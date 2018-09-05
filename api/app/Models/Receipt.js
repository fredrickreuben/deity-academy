'use strict'

const Model = use('Model')

class Receipt extends Model {
    payment() {
      return this.belongsTo('App/Models/Payment')
    }
}

module.exports = Receipt
