'use strict'

class YOSService {
  async current(YOS) {
    const yos = await YOS.query().where('current', true).fetch()

    for (let i = 0; i < yos.length; i++) {
      yos[i].current = false
      await yos[i].save()
    }
  }
}

module.exports = new YOSService()