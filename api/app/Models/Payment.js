'use strict'

const Model = use('Model')

class Payment extends Model { 
    pupil(){ 
        return this.belongsTo('App/Models/Pupil')
    }
    
    paidby() {
      return this.belongsTo('App/Models/Gurdian')
    }

    bank() {
      return this.belongsTo('App/Models/BankAccount')
    }

    otherpayment() {
      return this.belongsTo('App/Models/PupilOtherPayment')
    }

    feestructure() {
      return this.belongsTo('App/Models/FeeStructure')
    }

    receipts(){ 
      return this.hasMany('App/Models/Receipt')
    }
}

module.exports = Payment
