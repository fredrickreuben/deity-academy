'use strict'

const Zone = use('App/Models/ResidenceZone')

const CreatedException = use('App/Exceptions/CreatedException')

class ResidenceZoneController {

    async store({ response, request, params }) {
        try {

            const data = request.only(['residence_id', 'transport_zone_id'])

            await Zone.saveMany(data)

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                zone
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {

            const data = request.only(['residence_id', 'transport_zone_id'])

            await Zone
                .query()
                .where('student_zone_id', request.student_zone_id)
                .delete()

            await Zone.saveMany(data)

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

module.exports = ResidenceZoneController
