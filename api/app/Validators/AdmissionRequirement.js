'use strict'

class AdmissionRequirement {
  get rules() {
    return {
      // validation rules
      item: 'required',
      description: 'required'
    }
  }

  get messages() {
    return {
      'item.required': 'Vote Head is required',
      'description.required': 'Description is required'
    }
  }
}

module.exports = AdmissionRequirement
