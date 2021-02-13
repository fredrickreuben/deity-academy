'use strict'

const Location = use('App/Models/StaffLocation')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffLocationController {

    async index({ response }) {

        try {

            const location = await Location.query().fetch()

            return response.status(200).json(
                location.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const location = new Location()

            const { staff_id } = params

            if (!staff_id) {
                throw new CreatedException("Staff not found", 404, "NOT_FOUND")
            }

            const _location = await Location.query().where('staff_id', staff_id).first()

            const { home_county, home_city, home_address, residence_address } = request.all()

            if (_location) {
                throw new CreatedException("Location exist", 400, "ALREADY_EXIST")
            }

            location.fill({
                staff_id: staff_id,
                home_county: home_county,
                home_city: home_city,
                home_address: home_address,
                residence_address: residence_address
            })

            await location.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                location
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const location = await Location.find(id)

            if (!location) {
                throw new CreatedException("Location not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                location
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const { staff_id, id } = params

            const location = await Location.find(id)

            const { home_county, home_city, home_address, residence_address } = request.all()

            if (!location) {
                throw new CreatedException("Location not found", 404, "NOT_FOUND")
            }

            location.merge({
                staff_id: staff_id,
                home_county: home_county,
                home_city: home_city,
                home_address: home_address,
                residence_address: residence_address
            })

            await location.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                location
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {
            const { id } = params

            const location = await Location.find(id)

            if (!location) {
                throw new CreatedException("Location not found", 404, "NOT_FOUND")
            }

            await location.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = StaffLocationController
