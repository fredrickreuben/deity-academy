'use strict'

const Event = use('Event')
const Task = use('Task')

class PromotePupil extends Task {
  static get schedule () {
    // second (0 - 59, OPTIONAL), minute (0 - 59),hour (0 - 23), day of month (1 - 31), month (1 - 12),  day of week (0 - 7) (0 or 7 is Sun)
    //return '0 35 * * * *'
    return '0 */1 * * * *'
  }

  async handle () {
    Event.fire('promote::pupil', null)
  }
}

module.exports = PromotePupil
