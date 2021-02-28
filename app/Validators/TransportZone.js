'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class TransportZone {
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
        'name': `required|unique:transport_zones,name,id,${id}`,
        'amount': 'required|number',
      }
    }
    return {
      'name': 'required|unique:transport_zones,name',
      'amount': 'required|number',
    }
  }

  get messages() {
    return {
      'name.unique': 'Name already exist!.',
      'name.required': 'Zone name is required!.',
      'amount.required': 'Amount is required!.',
      'amount.number': 'Amount should be a valid number!.',
    }
  }
}

module.exports = TransportZone
