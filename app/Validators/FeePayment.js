'use strict'

const { formatters } = use('Validator')
const modules = use('App/Services/Modules')
const UnAuthorisedModuleAccessException = use('App/Exceptions/UnAuthorisedModuleAccessException')

class FeePayment {

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
        'receipt_no': `required|unique:fee_payments,receipt_no,id,${id}`,
        'total': `required`,
        'term_id': 'required',
        'year_id': 'required',
        'student_id': 'required',
        'payment_mode_id': 'required',
        'bank_id': 'required'
      }
    }
    return {
      'receipt_no': 'required|number|unique:fee_payments,receipt_no',
      'total': `required`,
      'term_id': 'required',
      'year_id': 'required',
      'student_id': 'required',
      'payment_mode_id': 'required',
      'bank_id': 'required'
    }
  }

  get messages() {
    return {
      'receipt_no.required': 'Receipt number is required!.',
      'receipt_no.unique': 'Receipt number already exist!.',
      'receipt_no.number': 'Receipt number should be a number!.',
      'student_id.required': 'Student is required!.',
      'total.required': 'Total amount is required!.',
      'term_id.required': 'Term is required!.',
      'year_id.required': 'Year is required!.',
      'payment_mode_id.required': 'Mode is required!.',
      'bank_id.required': 'Bank is required!.',
    }
  }
}

module.exports = FeePayment
