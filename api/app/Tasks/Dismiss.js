'use strict'

const Task = use('Task')

class Dismiss extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    this.info('Task Dismiss handle')
  }
}

module.exports = Dismiss
