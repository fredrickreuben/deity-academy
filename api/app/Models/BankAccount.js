'use strict'

const Model = use('Model')

class BankAccount extends Model {
    payment() {
      return this.hasMany('App/Models/Payment')
    }
}

module.exports = BankAccount
