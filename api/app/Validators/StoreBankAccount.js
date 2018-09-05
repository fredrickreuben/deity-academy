'use strict'

class StoreBankAccount {
   get rules() {
    return {
      // validation rules
      bank_name: 'required|string',
      account_no: 'required|integer|unique:bank_accounts,account_no',
    }
  }

  get messages() {
    return {
      //validation messages
      'bank_name.required': 'Bank Name is required.',
      'bank_name.string': 'Bank Name must be a string.',
      'account_no.required': 'Account Number is required.',
      'account_no.integer': 'Account Number must an integer.',
      'account_no.unique': 'Account Number already exist.'
      
    }
  }
}

module.exports = StoreBankAccount
