'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeePaymentVoteHead {

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
                'amount': `required|number`,
                'balance': 'required|number',
                'student_id': 'required',
                'fee_payment_id': 'required',
                'fee_vote_head_id': 'required'
            }
        }
        return {
            'amount': `required|number`,
            'balance': 'required|number',
            'student_id': 'required',
            'fee_payment_id': 'required',
            'fee_vote_head_id': 'required'
        }
    }

    get messages() {
        return {
            'amount.required': 'Amount is required!.',
            'amount.number': 'Amount should be a valid number!.',
            'student_id.required': 'Student is required!.',
            'balance.required': 'Balance is required!.',
            'balance.number': 'Balance should be a valid number!.',
            'fee_vote_head_id.required': 'VoteHead is required!.',
            'fee_payment_id.required': 'Payment is required!.',
        }
    }
}

module.exports = FeePaymentVoteHead
