'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnAuthorizedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    response.unauthorized('You can not access this page')
  }
}

module.exports = UnAuthorizedException
