'use strict'

class Pupil {
  get rules() {
    return {
      // validation rules
      f_name: 'required',
      l_name: 'required',
      adm_date: 'required|date',
      dob: 'required|date',
    }
  }

  get messages() {
    return {
      //messsages
      'f_name.required': 'First Name is required.',
      'l_name.required': 'Last Name is required.',
      'dob.required': 'Date of birth is required.',
      'dob.date': 'Date of Birth must be a valid date',
      'adm_date.required': 'Admission date is required',
      'adm_date.date': 'Date of Admission must be a valid date'
    }
  }
}

module.exports = Pupil
