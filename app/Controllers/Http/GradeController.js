'use strict'

const Grade = use('App/Models/Grade')

const CreatedException = use('App/Exceptions/CreatedException')

class GradeController {

    async index({ response }) {
        try {
            
            const grade = await Grade.query().fetch()

            return response.status(200).json(
                grade.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const grade = new Grade()
            const { label, name, level} = request.all()

            grade.fill({
                name: name,
                label: label,
                level: level
            })

            await grade.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                grade
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const grade = await Grade.find(id)

            if (!grade) {
                throw new CreatedException("Grade not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                grade.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { label, name, level} = request.all()
            const grade = await Grade.find(id)

            if (!grade) {
                throw new CreatedException("Grade not found", 404, "NOT_FOUND")
            }

            grade.merge({
                label: label,
                name: name,
                level: level
            })

            await grade.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                grade
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const grade = await Grade.find(id)

            if (!grade) {
                throw new CreatedException("Grade not found", 404, "NOT_FOUND")
            }

            await grade.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = GradeController
