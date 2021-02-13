'use strict'

const Biodata = use('App/Models/StudentBiodata')

const CreatedException = use('App/Exceptions/CreatedException')

class StudentBiodataController {

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

            const { student_id } = params

            if (!student_id) {
                throw new CreatedException("Student not found", 404, "NOT_FOUND")
            }

            const _biodata = await Biodata.query().where('student_id', student_id).first()

            if (_biodata) {
                throw new CreatedException("Biodata exist", 400, "ALREADY_EXIST")
            }

            const { blood_group, diseases, allergies} = request.all()

            biodata.fill({
                student_id: student_id,
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
            
            const { student_id, id } = params

            const biodata = await Biodata.find(id)

            const { blood_group, diseases, allergies} = request.all()

            biodata.merge({
                student_id: student_id,
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

module.exports = StudentBiodataController
