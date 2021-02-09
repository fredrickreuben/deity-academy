'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Year {
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
      'ac_year': 'required|unique:years,year'
    }
  }

  get messages() {
    return {
      'ac_year.required': 'Academic Year is required!.',
      'ac_year.unique': 'Academic Year already exist!.'
    }
  }
}

module.exports = Year
