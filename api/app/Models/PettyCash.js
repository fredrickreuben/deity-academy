'use strict'

const Model = use('Model')

class PettyCash extends Model {
    expenses(){ 
        return this.hasMany('App/Models/Expense')
    }
    passedBy(){ 
        return this.belongsTo('App/Models/Staff', 'passed_by', 'id')
    }

    checkedBy() {
      return this.belongsTo('App/Models/Staff', 'checked_by', 'id')
    }
}

module.exports = PettyCash
