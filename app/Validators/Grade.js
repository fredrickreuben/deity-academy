'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Grade {
  
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
        'label': `required|unique:grades,label,id,${id}`,
        'name': `required|unique:grades,name,${id}`,
      }
    }
    return {
      'label': 'required|unique:grades,label',
      'name': 'required|unique:grades,name',
    }
  }

  get messages() {
    return {
      'label.required': 'Grade label is required!.',
      'label.unique': 'Label already exist!.',
      'name.unique': 'Name already exist!.',
      'name.required': 'Lable Name is required!.',
    }
  }
}

module.exports = Grade
