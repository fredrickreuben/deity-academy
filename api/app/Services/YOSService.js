'use strict'

class YOSService {
  async current(YOS) {
    await YOS.query().where('current', true).update({
      current: false
    })
    return true
  }
}

module.exports = new YOSService()