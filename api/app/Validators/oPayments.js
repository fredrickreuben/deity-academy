'use strict'

class oPayments {
  get rules() {
    return {
      // validation rules
      amount: 'required|integer',
      item: 'required',
      description: 'required',
      duedate: 'required|date'
    }
  }

  get messages() {
    return {
      'amount.required': 'Amount is required',
      'amount.integer': 'Amount must be a valid number',
      'item.required': 'Vote Head is required',
      'duedate.date': 'Enter a valid date',
      'description.required': 'Description is required',
      'duedate.required': 'Date is required'
    }
  }
}

module.exports = oPayments
