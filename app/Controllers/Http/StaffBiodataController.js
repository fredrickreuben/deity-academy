'use strict'

const Biodata = use('App/Models/StaffBiodata')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffBiodataController {

    async index({ response }) {

        try {

            const biodata = await Biodata.query().fetch()

            return response.status(200).json(
                biodata.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const biodata = new Biodata()

            const { staff_id } = params

            const { blood_group, diseases, allergies} = request.all()

            biodata.fill({
                staff_id: staff_id,
                blood_group: blood_group,
                diseases: diseases,
                allergies: allergies
            })

            await biodata.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                biodata
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const biodata = await Biodata.find(id)

            if (!biodata) {
                throw new CreatedException("Biodata not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                biodata
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const { staff_id, id } = params

            const biodata = await Biodata.find(id)

            const { blood_group, diseases, allergies} = request.all()

            biodata.merge({
                staff_id: staff_id,
                blood_group: blood_group,
                diseases: diseases,
                allergies: allergies
            })

            await biodata.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                biodata
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const biodata = await Biodata.find(id)

            await biodata.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = StaffBiodataController
