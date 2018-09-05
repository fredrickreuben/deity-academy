'use strict'

class Payment {
  get rules () {
    return {
      // validation rules
      amount: 'required|integer'
    }
  }

  get messages(){
    return {
      'amount.required': 'Amount is required',
      'amount.integer': 'Amount must be a valid number'
    }
  }
}

module.exports = Payment
