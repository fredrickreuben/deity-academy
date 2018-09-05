'use strict'

class UpdatePupilOtherPayment {
  
    get rules() {
      return {
        // validation rules
        pupils: 'required'
      }
    }

    get messages() {
      return {
        'pupils.required': 'Pupils is required',
        'sos_id.required': 'Stage of study is required',
      }
    }
}

module.exports = UpdatePupilOtherPayment
