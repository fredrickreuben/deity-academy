'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeePaymentMode {

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
        'name': `required|unique:fee_payment_modes,name,id,${id}`,
      }
    }
    return {
      'name': 'required|unique:fee_payment_modes,name',
    }
  }

  get messages() {
    return {
      'name.unique': 'Payment mode already exist!.',
      'name.required': 'Payment mode is required!.',
    }
  }
}

module.exports = FeePaymentMode
