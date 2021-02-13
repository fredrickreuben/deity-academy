'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Guardian {

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
        'l_name': 'required',
        'f_name': 'required',
        'm_name': 'required'
      }
    }else{
      return {
        'l_name': 'required',
        'f_name': 'required',
        'm_name': 'required'
      }
    }
    
  }

  get messages() {
    return {
      'f_name.required': 'First Name is required!.',
      'l_name.required': 'Last Name is required!.',
      'm_name.required': 'Middle Name is required!.',
    }
  }
}

module.exports = Guardian
