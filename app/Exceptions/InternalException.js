'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InternalException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    response
      .status(500)
      .send("Internal sever error!")
  }
}

module.exports = InternalException
