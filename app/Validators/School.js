'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class School {

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
      'name': 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'School Name is required!.'
    }
  }
}

module.exports = School
