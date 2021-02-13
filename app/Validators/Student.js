'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class Student {

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
        'adm_no': `required|unique:students,adm_no,id,${id}`,
        'l_name': 'required',
        'f_name': 'required',
        'm_name': 'required'
      }
    }else{
      return {
        'adm_no': 'required|unique:students,adm_no',
        'l_name': 'required',
        'f_name': 'required',
        'm_name': 'required'
      }
    }
    
  }

  get messages() {
    return {
      'adm_no.required': 'Admission number is required!.',
      'adm_no.unique': 'Admission number already exist!.',
      'f_name.required': 'First Name is required!.',
      'l_name.required': 'Last Name is required!.',
      'm_name.required': 'Middle Name is required!.',
    }
  }
}

module.exports = Student
