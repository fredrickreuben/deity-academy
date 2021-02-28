'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Identifier {
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
    const { id } = this.ctx.params 
    if(id){
      return {
        'name': `required|unique:identifiers,name,id,${id}`,
      }
    }
    return {
      'name': 'required|unique:identifiers,name',
    }
  }

  get messages() {
    return {
      'name.unique': 'Identifiers already exist!.',
      'name.required': 'Identifiers name is required!.',
    }
  }
}

module.exports = Identifier
