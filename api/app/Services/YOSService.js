'use strict'

const YOS = use('App/Models/YOS')

class YOSService {
  async current() {
    await YOS.query().where('current', true).update({
      current: false
    })
    return true
  } 
  
  async setCurrent(date){
    try {
       //find year of study by date
       const yos = await YOS.findBy('start_date', date)
       if (yos && yos.current == false) {
          await this.current()
          yos.current = true
          await  yos.save()

          return yos
       }

       return false

    } catch (error) {
      console.log(error)
      return false
    }
  }

}

module.exports = new YOSService()