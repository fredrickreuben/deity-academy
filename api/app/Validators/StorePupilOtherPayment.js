'use strict'

class StorePupilOtherPayment {
  get rules() {
    return {
      // validation rules
      pupil_id: 'required'
    }
  }

  get messages() {
    return {
      'pupil_id.required': 'Pupils is required',
      'sos_id.required': 'Stage of study is required',
    }
  }
}

module.exports = StorePupilOtherPayment
