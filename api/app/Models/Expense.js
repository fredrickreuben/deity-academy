'use strict'

const Model = use('Model')

class Expense extends Model {
    pettycash(){ 
        return this.belongsTo('App/Models/PettyCash')
    }
}

module.exports = Expense
