'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Staff {
  
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
        'staff_id': `required|unique:staff,staff_id,id,${id}`,
        'last_name': 'required',
        'first_name': 'required',
        'gender': 'required',
        'nationality': 'required'
      }
    }else{
      return {
        'staff_id': 'required|unique:staff,staff_id',
        'last_name': 'required',
        'first_name': 'required',
        'gender': 'required',
        'nationality': 'required'
      }
    }
    
  }

  get messages() {
    return {
      'staff_id.required': 'Staff ID is required!.',
      'staff_id.unique': 'ID already exist!.',
      'first_name.required': 'First Name is required!.',
      'last_name.required': 'Last Name is required!.',
    }
  }
}

module.exports = Staff
