'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class StaffLocation {

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

    return {
      'home_county': 'required',
      'home_city': 'required',
      'home_address': 'required',
      'residence_address': 'required'
    }
    
  }

  get messages() {
    return {
      'home_county.required': 'Home county is required!.',
      'home_city.required': 'Home city is required!.',
      'home_address.required': 'Home address is required!.',
      'residence_address.required': 'Residence address is required!.',
    }
  }
}

module.exports = StaffLocation
