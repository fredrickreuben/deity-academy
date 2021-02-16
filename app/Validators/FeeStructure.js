'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeeStructure {
  
  get formatter() {
    return formatters.JsonApi
  }

  async authorize() {

    const user = await this.ctx.auth.getUser()

    if (!modules.has_access_administrator(user)) {
      throw new UnAuthorisedModuleAccessException()
    }

    return true
  }

  get rules() {
    return {
      'amount': 'required',
      'votehead_id': 'required',
      'term_id': 'required',
      'year_id': 'required',
    }
  }

  get messages() {
    return {
      'amount.required': 'Amount name is required!.',
      'votehead_id.required': 'VoteHead is required!.',
      'term_id.required': 'Term is required!.',
      'year_id.required': 'year is required!.',
    }
  }
}

module.exports = FeeStructure
