'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    return response.status(404).json({
      error: error,
      message: 'Resource Not Found!!!'
    })
  }
}

module.exports = ResourceNotFoundException
