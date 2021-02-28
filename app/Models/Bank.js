'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bank extends Model {
    
    staffbanks() {
        return this.hasMany('App/Models/StaffBank')
    }

    voteheads() {
        return this.hasMany('App/Models/FeeVoteHead')
    }

    payments() {
        return this.hasMany('App/Models/FeePayment')
    }
}

module.exports = Bank
