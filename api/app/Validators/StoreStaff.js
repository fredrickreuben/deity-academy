'use strict'

class StoreStaff {
  get rules() {
    return {
      // validation rules
      email: 'unique:users,email',
      f_name: 'required',
      l_name: 'required',
      national_id: 'required',
      phone: 'required|unique:users,phone'
    }
  }

  get messages() {
    return {
      'email.required': 'Email field is required.',
      'email.unique': 'A user with this email address already exist.',
      'email.email': 'Enter a valid email address.',
      'f_name.required': 'First Name is required.',
      'l_name.required': 'Last Name is required.',
      'national_id.required': 'National ID is required.',
      'phone.required': 'Phone number is required',
      'phone.unique': 'A user with this phone number already exist'
    }
  }
}

module.exports = StoreStaff
