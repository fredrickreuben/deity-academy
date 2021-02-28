'use strict'

const Residence = use('App/Models/Residence')
const CreatedException = use('App/Exceptions/CreatedException')

class ResidenceController {

    async index({ response }) {
        try {
            
            const residence = await Residence.query().fetch()

            return response.status(200).json(
                residence.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const residence = new Residence()
            const { name } = request.all()

            residence.fill({
                name: name
            })

            await residence.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                residence
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const residence = await Residence.find(id)

            if (!residence) {
                throw new CreatedException("Residence not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                residence.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {name } = request.all()
            const residence = await Residence.find(id)

            if (!residence) {
                throw new CreatedException("Residence not found", 404, "NOT_FOUND")
            }

            residence.merge({
                name: name,
            })

            await residence.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                residence
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const residence = await Residence.find(id)

            if (!residence) {
                throw new CreatedException("Residence not found", 404, "NOT_FOUND")
            }

            await residence.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = ResidenceController
