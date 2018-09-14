'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const PYOS = use('App/Models/PYOS')
const Pupil = use('App/Models/Pupil')
const TotalPayment = use('App/Models/TotalPayment')

class TotalPayments{
    async store(totalpayment) { 
        //Fetch params
        const pupil_id = totalpayment.pupil_id
        const pyos = await PYOS.query()
            .where('pupil_id', pupil_id)
            .where('current', true)
            .then((res) => {
                return res.toJSON()
            })
        const tos_id = pyos[0].tos_id

        //Find fee structure
        const tos = await TOS.query().where('id',tos_id)
           .with('feestructure')
           .fetch()
           .then((res) => {
             return res.toJSON()
           })

        let amount = 0
        let duedate = moment().format('YYYY-MM-DD')
        const fee = tos.feestructure

        if (fee != null && typeof fee.amount != 'undefined') {
            amount = fee.amount
            duedate = fee.duedate
        }

        //Create new Pupil Total Payment
        await TotalPayment.create({
          pupil_id: pupil_id,
          tos_id: tos_id,
          amount: amount,
          duedate: duedate
        })

        return

    }

    async storeMany(totalpayment) {

        for (let i = 0; i < totalpayment.length; i++) {
            await this.store(totalpayment[i])
        }

    }

    async update(totalpayment) {
        //Fetch current pupil year of study
        const puipil_id = totalpayment.puipil_id
        const pyos = await PYOS.query()
            .where('puipil_id', puipil_id)
            .where('current', true)
            .fetch()
            .then((res) => {
                return res.toJSON()
            })
        const tos_id = pyos[0].tos_id

        //Update total payment
        await TotalPayment.query()
            .where('pupil_id', pupil_id)
            .where('tos_id', tos_id)
            .update({
                amount: totalpayment.amount,
                paid: totalpayment.paid,
            })

        return
    }

    async updateMany(totalpayment) {
        for (let i = 0; i < totalpayment.length; i++) {
            await this.update(totalpayment[i])
        }
    }

    async pupil(tos) {
        const pupils = Pupil.all()

        let pupil_id = []
        let tos_id = []

        for (let i = 0; i < pupils.length; i++) {
           pupil_id[i] = pupils.id 
           tos_id[i] = tos
        }

        await TotalPayment.createMany(pupil_id, tos_id)

    }
}

module.exports = new TotalPayments()