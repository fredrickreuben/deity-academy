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

    if (!modules.has_access_administrator(user)) {
      throw new UnAuthorisedModuleAccessException()
    }
    
    return true
  }

  get rules () {
    const { id } = this.ctx.params 
    if(id){
      return {
        'ac_year': `required|unique:years,year,id,${id}`
      }
    }
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
