'use strict'

class UpdateGurdian {
  get rules () {
    return {
      // validation rules
      phone: 'required',
      email: 'email',
      f_name: 'required',
      l_name: 'required',
      national_id: 'required',
    }
  }

  get messages (){
    return {
      'email.email': 'Enter a valid email address.',
      'f_name.required': 'First Name is required.',
      'l_name.required': 'Last Name is required.',
      'national_id.required': 'National ID is required.',
      'phone.required': 'Phone number is required'
    }
  }
}

module.exports = UpdateGurdian
