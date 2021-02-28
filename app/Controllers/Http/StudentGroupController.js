'use strict'

const Group = use('App/Models/StudentGroup')
const CreatedException = use('App/Exceptions/CreatedException')

class StudentGroupController {

    async index({ response }) {
        try {
            
            const group = await Group.query().fetch()

            return response.status(200).json(
                group.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const group = new Group()
            const { name, description } = request.all()

            group.fill({
                name, description
            })

            await group.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                group
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const group = await Group.find(id)

            if (!group) {
                throw new CreatedException("Group not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                group.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {name, description } = request.all()
            const group = await Group.find(id)

            if (!group) {
                throw new CreatedException("Group not found", 404, "NOT_FOUND")
            }

            group.merge({
                name, description
            })

            await group.save()

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

module.exports = StudentGroupController
