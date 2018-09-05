'use strict'

class DismissalService {
  async TotalExpense(model, id) {
    //persit dimissal to databse
    const PettyCash = await model.query().where('id', id).with('expenses').fetch().then( (res) => { 
        return res.toJSON()
    })

    const expenses = PettyCash[0].expenses

    //validate input
    if (typeof expenses === 'undefined' || expenses.length == 0) {
        return false
    }

    let TotalExpense = 0

    for (let i = 0; i < expenses.length; i++) {
        TotalExpense = TotalExpense + expenses[i].amount
    }

    return TotalExpense
  }
}

module.exports = new DismissalService()