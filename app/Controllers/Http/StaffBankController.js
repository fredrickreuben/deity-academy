'use strict'

const Bank = use('App/Models/StaffBank')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffBankController {

    async index({ response }) {

        try {

            const bank = await Bank.query().fetch()

            return response.status(200).json(
                bank.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const bank = new Bank()

            const { staff_id, bank_id } = params

            const { acct_no} = request.all()

            bank.fill({
                staff_id: staff_id,
                bank_id: bank_id,
                acct_no: acct_no
            })

            await bank.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                bank
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const bank = await Bank.find(id)

            if (!bank) {
                throw new CreatedException("Bank not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                bank
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const { staff_id, id } = params

            const bank = await Bank.find(id)

            const {acct_no} = request.all()

            if (!bank) {
                throw new CreatedException("Bank not found", 404, "NOT_FOUND")
            }

            bank.merge({
                acct_no: acct_no
            })

            await bank.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                bank
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const bank = await Bank.find(id)

            if (!bank) {
                throw new CreatedException("Bank not found", 404, "NOT_FOUND")
            }

            await bank.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = StaffBankController
