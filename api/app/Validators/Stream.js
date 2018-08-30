'use strict'

class Stream {
  get rules() {
    return {
      // validation rules
      'name': 'required'
    }
  }

  get messages() {
    return {
      //validation messages
      'name.required': 'Name is required.'
    }
  }
}

module.exports = Stream
