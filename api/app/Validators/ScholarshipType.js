'use strict'

class ScholarshipType {
  get rules() {
    return {
      // validation rules
      name: 'required',
      value: 'required|integer',
      description: 'required'
    }
  }

  get messages() {
    return {
      //messsages
      'name.required': 'Scholarship Name is required.',
      'value.required': 'Scholarship value is required.',
      'value.integer': 'Scholarship value must be a valid number.',
      'description.required': 'Scholarship description is required'
    }
  }
}

module.exports = ScholarshipType
