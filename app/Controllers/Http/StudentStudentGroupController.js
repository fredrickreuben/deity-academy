'use strict'

const Group = use('App/Models/StudentStudentGroup')

const CreatedException = use('App/Exceptions/CreatedException')

class StudentStudentGroupController {

    async store({ response, request, params }) {
        try {

            const data = request.only(['student_id', 'student_group_id'])

            await Group.createMany(data)

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                group
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {

            const data = request.only(['student_id', 'student_group_id'])

            await Group
                .query()
                .where('student_group_id', request.student_group_id)
                .delete()

            await Group.saveMany(data)

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                group
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const group = await Group.find(id)

            if (!group) {
                throw new CreatedException("Group not found", 404, "NOT_FOUND")
            }

            await group.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = StudentStudentGroupController
