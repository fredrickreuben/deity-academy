'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InternalErrorException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    return response.status(500).json({
      error: 'Internal sever error'
    })
  }
}

module.exports = InternalErrorException
