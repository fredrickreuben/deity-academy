'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class StaffBank {
  
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
      'acct_no': 'required',
    }
    
  }

  get messages() {
    return {
      'acct_no.required': 'Account number is required.',
    }
  }
}

module.exports = StaffBank
