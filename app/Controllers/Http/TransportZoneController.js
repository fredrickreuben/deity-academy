'use strict'

const Zone = use('App/Models/TransportZone')
const CreatedException = use('App/Exceptions/CreatedException')

class TransportZoneController {

    async index({ response }) {
        try {

            const zone = await Zone.query().fetch()

            return response.status(200).json(
                zone.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const zone = new Zone()
            const { name, description, amount, vote_head_id} = request.all()

            zone.fill({
                name, description, amount, vote_head_id
            })

            await zone.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                zone
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const zone = await Zone.find(id)

            if (!zone) {
                throw new CreatedException("Zone not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                zone.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { name, description, amount, vote_head_id} = request.all()
            const zone = await Zone.find(id)

            if (!zone) {
                throw new CreatedException("Zone not found", 404, "NOT_FOUND")
            }

            zone.merge({
                name, description, amount, vote_head_id
            })

            await zone.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                zone
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const zone = await Zone.find(id)

            if (!zone) {
                throw new CreatedException("Zone not found", 404, "NOT_FOUND")
            }

            await zone.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = TransportZoneController
