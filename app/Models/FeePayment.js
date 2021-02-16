'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FeePayment extends Model {

    voteheads(){
        return this.hasMany('App/Models/FeePaymentVoteHead')
    }
}

module.exports = FeePayment
