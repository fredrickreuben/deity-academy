'use strict'

const { formatters } = use('Validator')

class AuthLogin {

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Email is required.',
      'email.email': 'Enter Valid email address.',
      'password.required': 'Password is required'
    }
  }
}

module.exports = AuthLogin
