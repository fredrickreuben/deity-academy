'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const PYOS = use('App/Models/PYOS')
const TOS = use('App/Models/TOS')
const Pupil = use('App/Models/Pupil')
const moment = use('moment')
const Queue = use('BeeQueue')
const TotalPayment = use('App/Models/TotalPayment')

class TotalPayments{
    async amount(tos_id, pupil_id){
        try {
            //Get Year of Study
            const pyos = await PYOS.query()
                .where('pupil_id', pupil_id)
                .where('current',true)
                .fetch()
                .then((res) => { 
                    return res.toJSON()
                })
            const sos_id = pyos[0].sos_id

            //Get fee structure
            const tos = await TOS.query().where('id', tos_id)
              .with('feestructures', (builder) => {
                  builder.where('sos_id', sos_id)
              })
              .fetch()
              .then((res) => {
                return res.toJSON()
              })

            const feestructure = tos[0].feestructures[0]

            //Get Scholarships and OtherPayments
            const pupil = await Pupil.query().where('id', pupil_id)
              .with('scholarships', (builder) => {
                builder.with('scholarshipType')
              })
              .with('pupilOtherPayments', (builder) => {
                builder.with('otherPayment', (builder) => {
                    builder.where('tos_id', tos_id)
                })
              })
              .fetch()
              .then((res) => {
                return res.toJSON()
              })

            const scholarships = pupil[0].scholarships
            const otherpayments = pupil[0].pupilOtherPayments

            let amount = 0
            let scholarshipsTotal = 0
            let otherpaymentsTotal = 0
            let duedate = moment().format('YYYY-MM-DD')

            if (typeof scholarships !== 'undefined' && scholarships.length > 0) {
                for (let i = 0; i < scholarships.length; i++) {
                  scholarshipsTotal = scholarshipsTotal + scholarships[i].scholarshipType.value
                }
            }

            if (typeof otherpayments !== 'undefined' && otherpayments.length > 0) {
                for (let i = 0; i < otherpayments.length; i++) {
                    if (otherpayments[i].otherPayment != null) {
                        otherpaymentsTotal = otherpaymentsTotal + otherpayments[i].otherPayment.amount
                    }
                }
            }

            if (feestructure != null && typeof feestructure.amount != 'undefined') {
              amount = feestructure.amount
              duedate = feestructure.duedate
            }

            //Get amount minus scholarships with Total payments
            amount = (amount + otherpaymentsTotal) - scholarshipsTotal

            return {
              amount: amount,
              duedate: duedate
            }
        } catch (error) {
            return false
        }
    }
    
    async store(totalpayment) { 
        //Fetch params
        const pupil_id = totalpayment.pupil_id
        const tos = await TOS.query()
            .where('current', true)
            .fetch()
            .then((res) => {
                return res.toJSON()
            })
        const tos_id = tos[0].id

        //Create amount
        const amount = this.amount(tos_id, pupil_id)

        //Create new Pupil Total Payment
        await TotalPayment.create({
          pupil_id: pupil_id,
          tos_id: tos_id,
          amount: amount.amount,
          duedate: amount.duedate 
        })

        return {
            status: true,
            message: 'Total Payment Created'
        }

    }

    async storeMany(totalpayment) {

        if (typeof totalpayment[0] === 'undefined' && totalpayment.length <= 0) {
            return 'No pupils to create total payments'
        }

        for (let i = 0; i < totalpayment.length; i++) {
            const job = Queue.get('queue_payment').createJob(totalpayment[i])

            job.timeout(3000).retries(2).save().then((job) => {

            });

            job.on('progress', (progress) => {
              console.log(`Job ${job.id} reported progress: page ${progress.page} / ${progress.totalPages}`);
            });

            job.on('retrying', (job, err) => {
              console.log(`Job ${job.id} failed with error ${err} but is being retried!`);
            });

            job.on('stalled', (jobId) => {
              console.log(`Job ${jobId} stalled and will be reprocessed`);
            });

            job.on('failed', (job, err) => {
              console.log(`Job ${job.id} failed with error ${err.message}`);
            });

            job.on('error', (err) => {
              console.log(`A queue error happened: ${err.message}`);
            });
        }

        Queue.get('queue_payment').process( async (job) => {
            let Totalpayment = await this.store(job.data)
            return Totalpayment.status
        })
    }

    async update(totalpayment) {
        try {
            //Fetch current pupil year of study
            const pupil_id = totalpayment.pupil_id
            //const tos = await TOS.findBy('current', true)
            const tos_id = totalpayment.tos_id

            //Fetch Total Payment By Id
            const Totalpayment = await TotalPayment.query()
               .where('tos_id', tos_id)
               .where('pupil_id', pupil_id)
               .fetch()
               .then((res) => {
                   return res.toJSON()
               })

            //Create amount
            let t_paid = 0
            if (typeof totalpayment.paid !== 'undefined') {
                t_paid = totalpayment.paid
            }
            const amount = this.amount(tos_id, pupil_id)

            //Get paid amount
            const paid = t_paid + Totalpayment[0].paid

            //Update Total Payment
            const Totalpayment = await TotalPayment.query()
              .where('tos_id', tos_id)
              .where('pupil_id', pupil_id)
              .update({
                tos_id,
                amount: amount.amount,
                paid: paid,
                duedate: amount.duedate,
                nill: (Totalpayment[0].amount <= paid) ? true : false
             })

            return {
              status: true,
              message: 'Total Payment Updated'
            }
        } catch (error) {
            console.log(error)
            throw new ResourceNotFoundException()
        }
    }

    async updateMany(totalpayment) {
        for (let i = 0; i < totalpayment.length; i++) {

            const job = Queue.get('queue_payment').createJob(totalpayment[i])

            job.timeout(3000).retries(2).save().then((job) => {

            });

            job.on('progress', (progress) => {
              console.log(`Job ${job.id} reported progress: page ${progress.page} / ${progress.totalPages}`);
            });

            job.on('retrying', (job, err) => {
              console.log(`Job ${job.id} failed with error ${err} but is being retried!`);
            });

            job.on('stalled', (jobId) => {
              console.log(`Job ${jobId} stalled and will be reprocessed`);
            });

            job.on('failed', (job, err) => {
              console.log(`Job ${job.id} failed with error ${err.message}`);
            });

            job.on('error', (err) => {
              console.log(`A queue error happened: ${err.message}`);
            });
        }

        Queue.get('queue_payment').process( async (job) => {
            let Totalpayment = await this.update(job.data)

            return Totalpayment
        })
    }
}

module.exports = new TotalPayments()