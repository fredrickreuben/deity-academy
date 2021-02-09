'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CreatedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}

  constructor (message, status, code) {
    super(message, status, code)
  }
}

module.exports = CreatedException
