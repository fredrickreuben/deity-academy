'use strict'

const TotalPaymentService = use('App/Services/TotalPayment')
const TotalPayment = use('App/Models/TotalPayment')
const PYOS = use('App/Models/PYOS')
const TOS = use('App/Models/TOS')


class TOSService{
    async createPyaments(){
        const pyos = await PYOS.query().where('current', true).fetch().then((res) => {
          return res.toJSON()
        })
        return await TotalPaymentService.storeMany(pyos)
    }

    async begin(date) {
        try {
           const tos = await TOS.findBy('start_date', date)

           if (tos && tos.current == false) {
             await TOS.query().where('current', true).update({
               current: false
             })

             tos.current = true
             await tos.save()

             return await this.createPyaments()

           }

           return false

        } catch (error) {
           console.log(error)
           return false 
        }
        
    }

    async begun(){

        return await this.createPyaments()
    }

    async notbegun(tos) {
        try {
            await TotalPayment.query().where('tos_id', tos.tos_id).delete()
            return true
        } catch (error) {
            console.log(error)
            return false 
        }
    }
}

module.exports = new TOSService()