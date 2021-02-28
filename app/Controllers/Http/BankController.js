'use strict'

const Bank = use('App/Models/Bank')
const CreatedException = use('App/Exceptions/CreatedException')

class BankController {

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
            const { bank_name, bank_account_name, bank_account_number, bank_swift_code, bank_phone, bank_email } = request.all()

            bank.fill({
                bank_name, bank_account_name, bank_account_number, bank_swift_code, bank_phone, bank_email
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

            return response.status(200).json(
                bank.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {bank_name, bank_account_name, bank_account_number, bank_swift_code, bank_phone, bank_email } = request.all()
            const bank = await Bank.find(id)

            if (!bank) {
                throw new CreatedException("Bank not found", 404, "NOT_FOUND")
            }

            bank.merge({
                bank_name, bank_account_name, bank_account_number, bank_swift_code, bank_phone, bank_email
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

module.exports = BankController
