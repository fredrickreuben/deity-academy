'use strict'

const School = use('App/Models/School')
const CreatedException = use('App/Exceptions/CreatedException')

class SchoolController {


    async store({ response, request, params }) {

        try {
            const school = new School()

            const { name, photo, phone, email, address, location, latlong } = request.all()

            school.fill({
                name: name,
                photo: photo,
                phone: phone,
                email: email,
                address: address,
                location: location,
                latlong, latlong
            })

            await school.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                school
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {

        try {

            const { id } = params
            const school = await School.query().where('id', id).fetch()

            if (id == "undefined") {
                throw new CreatedException("Invalid School Id", 400, "INVALID_REQUEST")
            }

            return response.status(200).json(
                school.toJSON()
            )
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }

    }

    async update({ response, params, request }) {

        try {

            const { id } = params

            const school = await School.find(id)

            const { name, photo, phone, email, address, location, latlong } = request.all()

            school.merge({
                name: name,
                photo: photo,
                phone: phone,
                email: email,
                address: address,
                location: location,
                latlong, latlong
            })

            await school.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                school
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }

    }

    async destroy({ response, params, request }) {

        try {
            const { id } = params

            const school = await School.find(id)

            await school.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = SchoolController
