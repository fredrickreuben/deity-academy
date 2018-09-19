'use strict'

class TOS {
  get rules() {
    return {
      // validation rules
      'start_date': 'required|date',
      'end_date': 'required|date'
    }
  }

  get messages() {
    return {
      //validation messages
      'start_date.required': 'Start date is required.',
      'start_date.date': 'Start date must be a valid date.',
      'start_date.unique': 'Term of study already exist.',
      'end_date.unique': 'Term of study already exist.',
      'end_date.required': 'End date is required.',
      'end_date.date': 'End date must  be a valid date.',
    }
  }
}

module.exports = TOS
