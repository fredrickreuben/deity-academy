'use strict'
const Event = use('Event')
const moment = use('moment')
const Task = use('Task')

class TOS extends Task {
  static get schedule () {
    let time = '00 30 00 * * * '
    return time
  }

  async handle () {
    let date = moment().format('YYYY-MM-DD')
    Event.emit('tos::begin', date)
    //this.info('Task To handle')
  }
}

module.exports = TOS
