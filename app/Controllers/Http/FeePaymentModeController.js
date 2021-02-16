'use strict'

const PaymentMode = use('App/Models/FeePaymentMode')
const CreatedException = use('App/Exceptions/CreatedException')

class FeePaymentModeController {

    async index({ response }) {
        try {
            
            const mode = await PaymentMode.query().fetch()

            return response.status(200).json(
                mode.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const mode = new PaymentMode()
            const { name } = request.all()

            mode.fill({
                name: name
            })

            await mode.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                mode
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const mode = await PaymentMode.find(id)

            if (!mode) {
                throw new CreatedException("PaymentMode not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                mode.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {name } = request.all()
            const mode = await PaymentMode.find(id)

            if (!mode) {
                throw new CreatedException("PaymentMode not found", 404, "NOT_FOUND")
            }

            mode.merge({
                name: name,
            })

            await mode.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                mode
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const mode = await PaymentMode.find(id)

            if (!mode) {
                throw new CreatedException("PaymentMode not found", 404, "NOT_FOUND")
            }

            await mode.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = FeePaymentModeController
