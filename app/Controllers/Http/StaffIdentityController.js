'use strict'

const Identifier = use('App/Models/StaffIdentifier')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffIdentifierController {

    async index({ response }) {

        try {

            const identifier = await Identifier.query().fetch()

            return response.status(200).json(
                identifier.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const identifier = new Identifier()

            const { staff_id, identifier_id } = params

            const {identifier_no} = request.all()

            identifier.fill({
                staff_id: staff_id,
                identifier_id: identifier_id,
                identifier_no: identifier_no
            })

            await identifier.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                identifier
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const identifier = await Identifier.find(id)

            if (!identifier) {
                throw new CreatedException("Identifier not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                identifier
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const {id, staff_id, identifier_id } = params

            const {identifier_no} = request.all()

            const identifier = await Identifier.find(id)

            if (!identifier) {
                throw new CreatedException("Identifier not found", 404, "NOT_FOUND")
            }

            identifier.merge({
                staff_id: staff_id,
                identifier_id: identifier_id,
                identifier_no: identifier_no
            })

            await identifier.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                identifier
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const identifier = await Identifier.find(id)

            if (!identifier) {
                throw new CreatedException("Identifier not found", 404, "NOT_FOUND")
            }

            await identifier.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = StaffIdentifierController
