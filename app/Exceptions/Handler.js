'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {

    console.log(error)

    if (error.name === "") {
      return response.status(500).json({
        code: "INTERNAL_ERROR",
        message: 'Internal sever error'
      })
    }

    if (error.name === 'ValidationException') {
      return response.status(400).json({
        code: "VALIDATION_FAILED",
        message: error.messages.errors[0].detail
      })
    }

    if (error.name === 'UserNotFoundException') {
      return response.status(401).json({
        code: "NOT_FOUND",
        message: 'User not found'
      })
    }

    if (error.name === 'PasswordMisMatchException') {
      return response.status(401).json({
        code: "INVALID",
        message: 'Invalid Password!'
      })
    }

    response.status(error.status).send(error.message)

    return super.handle(...arguments)
  
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    
  }
}

module.exports = ExceptionHandler
