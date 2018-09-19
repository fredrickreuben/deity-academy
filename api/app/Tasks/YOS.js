'use strict'

const Task = use('Task')
const Event = use('Event')
const moment = use('moment')

class YOS extends Task {
  static get schedule () {
    let time = '00 00 00 * * * '
    return time
  }

  async handle () {
    let date = moment().format('YYYY-MM-DD')
    Event.emit('yos::begin', date)
    //this.info('Task Yo handle')
  }
}

module.exports = YOS
