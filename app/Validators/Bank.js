'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')



class Bank {
  
  get formatter () {
    return formatters.JsonApi
  }

  async authorize () {

    const user = await this.ctx.auth.getUser()

    if (!modules.has_access_administrator(user)) {
      throw new UnAuthorisedModuleAccessException()
    }
    
    return true
  }

  get rules () {
    return {
      'bank_name': 'required',
      'bank_account_name': 'required',
      'bank_account_number': 'required'
    }
  }

  get messages() {
    return {
      'bank_name.required': 'Bank name is required!.',
      'bank_account_name.required': 'Bank account name is required!.',
      'bank_account_number.required': 'Bank account number is required!.'
    }
  }
}

module.exports = Bank
