'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FeePaymentVoteHead extends Model {

    payment(){
        return this.belongsTouse('App/Models/FeePayment')
    }
}

module.exports = FeePaymentVoteHead
