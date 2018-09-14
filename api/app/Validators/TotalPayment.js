'use strict'

class TotalPayment {
  get rules () {
    return {
      // validation rules
      paid: 'required|integer',
    }
  }

  get messages (){
    return {
      'amount.required': 'Total amount is required',
      'amount.integer': 'Total amount must be a valid number',
      'paid.required': 'Paid amount is required',
      'paid.integer': 'Paid amount must be a valid number',
    }
  }
}

module.exports = TotalPayment
