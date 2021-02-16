'use strict'

const Payment = use('App/Models/FeePayment')
const Receipt = use('App/Services/Receipt')
const PaymentService = use('App/Services/Payment')
const CreatedException = use('App/Exceptions/CreatedException')

class FeePaymentController {

    async index({ response }) {
        try {

            const payment = await Payment.query().fetch()

            return response.status(200).json(
                payment.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const payment = new Payment()
            const { receipt_no, date, paid_by, code, note, total, staff_id, term_id, year_id, student_id, payment_mode_id, bank_id, voteheads } = request.all()

            payment.fill({
                receipt_no, date, paid_by, code, note, total, staff_id, term_id, year_id, student_id, payment_mode_id, bank_id
            })

            await payment.save()

            var _voteheads = [], i = 0

            voteheads.forEach((val) => {
                if(val.amount > 0 ){
                    val['fee_payment_id'] = payment.id
                    _voteheads.push(val)
                }
                i++
            })

            await PaymentService.add(_voteheads)

            payment.complete = true
            
            await payment.save()

            await payment.load('voteheads')
 
            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                payment
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const payment = await Payment.find(id)

            if (!payment) {
                throw new CreatedException("Payment not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                payment.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { reciept_no, date, paid_by, code, note, total, staff_id, term_id, year_id, student_id, payment_mode_id, bank_id } = request.all()
            const payment = await Payment.find(id)

            if (!payment) {
                throw new CreatedException("Payment not found", 404, "NOT_FOUND")
            }

            payment.merge({
                reciept_no, date, paid_by, code, note, total, staff_id, term_id, year_id, student_id, payment_mode_id, bank_id 
            })

            await payment.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                payment
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const payment = await Payment.find(id)

            if (!payment) {
                throw new CreatedException("Payment not found", 404, "NOT_FOUND")
            }

            await payment.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async receipt({ response}) {
        try {
            const number = await Receipt.number()            

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                number: number
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = FeePaymentController
