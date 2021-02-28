'use strict'

const Identifier = use('App/Models/Identifier')
const CreatedException = use('App/Exceptions/CreatedException')


class IdentifierController {

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
            const { name } = request.all()

            identifier.fill({
                name: name
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

            return response.status(200).json(
                identifier.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {name } = request.all()
            const identifier = await Identifier.find(id)

            if (!identifier) {
                throw new CreatedException("Identifier not found", 404, "NOT_FOUND")
            }

            identifier.merge({
                name: name,
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

module.exports = IdentifierController
