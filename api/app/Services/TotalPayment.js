'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const PYOS = use('App/Models/PYOS')
const Pupil = use('App/Models/Pupil')
const TotalPayment = use('App/Models/TotalPayment')

class TotalPayments{
    async store({response}, totalpayment) {

    }

    async update({response},totalpayment) {
        if (typeof totalpayment.pupil_id === 'undefined') {
            if (typeof totalpayment.sos_id !== 'undefined') {
                const sos_id = totalpayment.sos_id
                const pupils = await PYOS.query()
                    .where('sos_id', sos_id)
                    .where('current', true)
                    .fetch()

                for (let i = 0; i < pupils.length; i++) {
                    totalpayment.pupil_id = pupils[i].pupil_id
                    let totalPayment = await TotalPayment.query()
                        .where('pupil_id', totalpayment.pupil_id)
                        .where('tos_id', totalpayment.tos_id)
                        .fetch()
                    totalpayment.amount = totalPayment.amount + totalpayment.amount
                    
                    await TotalPayment.update(totalpayment)
                }

                return response.status(200).json({
                  status: true,
                  message: 'Success!!!'
                })
            }

            return response.status(400).json({
                message: 'Pupil Id is required'
            })
        }

        let totalPayment = await TotalPayment.query()
            .where('pupil_id', totalpayment.pupil_id)
            .where('tos_id', totalpayment.tos_id)
            .fetch()
        totalpayment.amount = totalPayment.amount + totalpayment.amount
            
        await TotalPayment.update(totalpayment)

        return response.status(200).json({
            status: true,
            message: 'Success!!!'
        })
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