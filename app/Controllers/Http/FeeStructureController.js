'use strict'

const Structure = use('App/Models/FeeStructure')
const CreatedException = use('App/Exceptions/CreatedException')

class FeeStructureController {

    async index({ response }) {
        try {

            const structure = await Structure.query().fetch()

            return response.status(200).json(
                structure.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const structure = new Structure()
            const { amount, votehead_id, grade_id, group_id, student_id, all, term_id, year_id, due_date } = request.all()

            structure.fill({
                amount, votehead_id, grade_id, group_id, student_id, all, term_id, year_id, due_date
            })

            await structure.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                structure
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const structure = await Structure.find(id)

            if (!structure) {
                throw new CreatedException("Structure not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                structure.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { amount, votehead_id, grade_id, group_id, student_id, all, term_id, year_id, due_date } = request.all()
            const structure = await Structure.find(id)

            if (!structure) {
                throw new CreatedException("Structure not found", 404, "NOT_FOUND")
            }

            structure.merge({
                amount, votehead_id, grade_id, group_id, student_id, all, term_id, year_id, due_date
            })

            await structure.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                structure
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const structure = await Structure.find(id)

            if (!structure) {
                throw new CreatedException("Structure not found", 404, "NOT_FOUND")
            }

            await structure.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = FeeStructureController
