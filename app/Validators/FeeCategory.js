'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeeCategory {
  
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
        'name': `required|unique:fee_categories,name,id,${id}`,
      }
    }
    return {
      'name': 'required|unique:fee_categories,name',
    }
  }

  get messages() {
    return {
      'name.unique': 'Category already exist!.',
      'name.required': 'Category name is required!.',
    }
  }
}

module.exports = FeeCategory
