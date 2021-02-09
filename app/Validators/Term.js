'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Term {

  get formatter () {
    return formatters.JsonApi
  }

  async authorize () {

    const user = await this.ctx.auth.getUser()

    if (!modules.has_access_administrator(user)  || !user.is_super_admin) {
      throw new UnAuthorisedModuleAccessException()
    }
    
    return true
  }

  get rules () {
    return {
      'label': 'required|unique:years,year',
      'name': 'required',
    }
  }

  get messages() {
    return {
      'label.required': 'Term label is required!.',
      'label.unique': 'Term already exist!.',
      'name.required': 'Term Name is required!.',
    }
  }
}

module.exports = Term
