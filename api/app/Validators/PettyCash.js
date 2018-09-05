'use strict'

class PettyCash {
  get rules() {
    return {
      // validation rules
      paid_to: 'required|string'
    }
  }

  get messages() {
    return {
      //messsages
      'paid_to.required': 'A/c is required.',
      'paid_to.string': 'A/c must be a string.',
    }
  }
}

module.exports = PettyCash
