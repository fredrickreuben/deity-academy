'use strict'

class Dismissal {
  get rules () {
    return {
      // validation rules
      date_dismissal: 'required|date',
      status: 'required'
    }
  }

  get messages(){
    return {
      'date_dismissal.required': 'Date of Dismissal is required',
      'date_dismissal.date': 'Enter a valid date',
      'status.required': 'Type of dismissal is required'
    }
  }
}

module.exports = Dismissal
