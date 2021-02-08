'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnAuthorisedModuleAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    response.status(401).unauthorized('You can not access this module!')
  }
}

module.exports = UnAuthorisedModuleAccessException
