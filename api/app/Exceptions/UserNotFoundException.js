'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    return response.status(404).json({
      error: 'User Not Found!!!'
    })
  }
}

module.exports = UserNotFoundException
