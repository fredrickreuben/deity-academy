'use strict'

class Department {
  get rules() {
    return {
      // validation rules
      'name': 'required'
    }
  }

  get messages() {
    return {
      //validation messages
      'name.required': 'Name is required.'
    }
  }
}

module.exports = Department
