'use strict'

class FeeStructure {
  get rules() {
    return {
      // validation rules
      amount: 'required|integer',
      vote_head: 'required',
      description: 'required',
      duedate: 'required|date'
    }
  }

  get messages() {
    return {
      'amount.required': 'Amount is required',
      'amount.integer': 'Amount must be a valid number',
      'vote_head.required': 'Vote Head is required',
      'duedate.date': 'Enter a valid date',
      'description.required': 'Description is required',
      'duedate.required': 'Date is required'
    }
  }
}

module.exports = FeeStructure
