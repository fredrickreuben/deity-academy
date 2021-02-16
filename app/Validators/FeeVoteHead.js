'use strict'
const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeeVoteHead {

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
    const { id } = this.ctx.params
    if (id) {
      return {
        'name': `required|unique:fee_vote_heads,name,id,${id}`,
        'priority': `required|unique:fee_vote_heads,priority,id,${id}`,
      }
    }
    return {
      'name': 'required|unique:fee_vote_heads,name',
      'priority': 'required|unique:fee_vote_heads,priority',
    }
  }

  get messages() {
    return {
      'name.required': 'VoteHead name is required!.',
      'name.unique': 'VoteHead already exist!.',
      'priority.required': 'Priority is required!.',
      'priority.unique': 'Priority level has been taken!.'
    }
  }
}

module.exports = FeeVoteHead
