'use strict'

const Staff = use('App/Models/Staff')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffController {

    async index({response, auth}) {

        const user = await auth.getUser()

        try {

            var staff = await Staff.all()

            if (!user.is_admin || !user.is_super_admin) {
                staff = await Staff.query().where('deleted', false).where('dismissed', false ).fetch()
            }

            return response.status(200).json(staff.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
        
    }

    async store({ response, request }) {

        try {

            const staff = new Staff()

            var { staff_id, first_name, last_name, middle_name, gender, teaching, admission_date, nationality } = request.all()

            if(!admission_date){ 
                admission_date = new Date()
            }

            staff.fill({
                staff_id: staff_id,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                gender: gender,
                teaching: teaching,
                admission_date: admission_date,
                nationality: nationality
            })

            await staff.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                staff
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const staff = await Staff.find(id)

            if (!staff) {
                throw new CreatedException("Staff not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                staff
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async update({ response, request, params }) {
        try {

            const { id } = params

            const staff = await Staff.find(id)

            var { staff_id, first_name, last_name, middle_name, gender, teaching, admission_date, nationality } = request.all()

            if(!admission_date){ 
                admission_date = new Date()
            }

            if (!staff) {
                throw new CreatedException("Staff not found", 404, "NOT_FOUND")
            }

            staff.merge({
                staff_id: staff_id,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                gender: gender,
                teaching: teaching,
                admission_date: admission_date,
                nationality: nationality,
            })

            await staff.save()

            return response.status(200).json(staff.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, auth }) {

        const user = await auth.getUser()

        try {
            const { id } = params

            const staff = await Staff.find(id)

            if (!staff) {
                throw new CreatedException("Staff not found", 404, "NOT_FOUND")
            }

            if (user.is_admin || user.is_super_admin) {
                await staff.delete()
            } else {
                staff.merge({
                    deleted: true
                })
                await staff.save()
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async dismiss({ response, params, request }) {

        try {

            const { id } = params

            const staff = await Staff.find(id)

            const { dismissed } = request.all()

            if (!staff) {
                throw new CreatedException("Staff not found", 404, "NOT_FOUND")
            }

            staff.merge({
                dismissed: dismissed
            })

            await staff.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
            
        }
    }
}

module.exports = StaffController
