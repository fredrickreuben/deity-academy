'use strict'

class Expense {
  get rules() {
    return {
      // validation rules
      vote_head: 'required|string',
      amount: 'required|integer'
    }
  }

  get messages() {
    return {
      'vote_head.required': 'Vote Head is required',
      'vote_head.string': 'Vote Head must be a string',
      'amount.required': 'Amount is required',
      'amount.integer': 'Amount must be an integer'
    }
  }
}

module.exports = Expense
