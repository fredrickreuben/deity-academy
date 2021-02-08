'use strict'

const { formatters } = use('Validator')
const module = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class AuthLogin {

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  async authorize () {
    // const user = await this.ctx.auth.getUser()
    // if (module.has_access_accounting(user)) {
    //   throw new UnAuthorisedModuleAccessException()
    // }
    // return true
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
