'use strict'

const Department = use('App/Models/Department')

const CreatedException = use('App/Exceptions/CreatedException')

class DepartmentController {

    async index({ response }) {

        try {

            const departments = await Department.query().fetch()

            return response.status(200).json(
                departments.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const department = new Department()

            const { name } = request.all()

            department.fill({
                name: name,
            })

            await department.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                department
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const department = await Department.find(id)

            if (!department) {
                throw new CreatedException("Department not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                department
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const { staff_id, id } = params

            const department = await Department.find(id)

            if (!department) {
                throw new CreatedException("Department not found", 404, "NOT_FOUND")
            }

            const { name } = request.all()

            department.merge({
                staff_id: staff_id,
                name: name
            })

            await department.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                department
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const department = await Department.find(id)

            if (!department) {
                throw new CreatedException("Department not found", 404, "NOT_FOUND")
            }

            await department.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = DepartmentController
