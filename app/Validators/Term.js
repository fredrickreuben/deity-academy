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

    if (!modules.has_access_administrator(user)) {
      throw new UnAuthorisedModuleAccessException()
    }
    
    return true
  }

  get rules () {
    const { id } = this.ctx.params 
    if(id){
      return {
        'label': `required|unique:terms,label,id,${id}`,
        'name': `required`,
      }
    }
    return {
      'label': 'required|unique:terms,lable',
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
