'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class UserStore {
  
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
        'username': `required|unique:users,username,id,${id}`,
        'email': `required|unique:users,email,id,${id}`,
      }
    }

    return {
      'username': 'required|unique:users,username',
      'email': 'required|unique:users,email',
    }
    
  }

  get messages() {
    return {
      'username.required': 'Username is required!.',
      'username.unique': 'Username already exist!.',
      'email.required': 'Email is required!.',
      'email.unique': 'Email already exist!.',
    }
  }
  
}

module.exports = UserStore
