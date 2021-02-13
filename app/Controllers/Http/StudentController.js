'use strict'

const Student = use('App/Models/Student')

const CreatedException = use('App/Exceptions/CreatedException')

class StudentController {

    async index({response, auth}) {

        const user = await auth.getUser()

        try {

            var student = await Student.all()

            if (!user.is_admin || !user.is_super_admin) {
                student = await Student.query().where('deleted', false).where('dismissed', false ).fetch()
            }

            return response.status(200).json(student.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
        
    }

    async store({ response, request, params }) {

        try {

            const student = new Student()

            const {grade_id, stream_id} = params

            var { adm_no, upi_no, f_name, l_name, m_name, gender, boarder, religion, birth_cert_no, date_of_birth, admission_date, religion } = request.all()

            if(!admission_date){ 
                admission_date = new Date()
            }

            student.fill({
                f_name: f_name,
                m_name: m_name,
                l_name: l_name,
                adm_no: adm_no,
                upi_no: upi_no,
                grade_id: grade_id,
                stream_id: stream_id,
                gender: gender,
                boarder: boarder,
                religion: religion,
                birth_cert_no: birth_cert_no,
                admission_date: admission_date,
                date_of_birth: date_of_birth,
                religion: religion
            })

            await student.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                student
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const student = await Student.find(id)

            if (!student) {
                throw new CreatedException("Student not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                student
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async update({ response, request, params }) {
        try {

            const {grade_id, stream_id, id} = params

            const student = await Student.find(id)

            var { adm_no, upi_no, f_name, l_name, m_name, gender, religion, birth_cert_no, date_of_birth, admission_date, religion, boarder } = request.all()

            if(!admission_date){ 
                admission_date = new Date()
            }

            student.merge({
                f_name: f_name,
                m_name: m_name,
                l_name: l_name,
                adm_no: adm_no,
                upi_no: upi_no,
                grade_id: grade_id,
                stream_id: stream_id,
                gender: gender,
                boarder: boarder,
                religion: religion,
                birth_cert_no: birth_cert_no,
                admission_date: admission_date,
                date_of_birth: date_of_birth,
                religion: religion
            })

            await student.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                student
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, auth }) {

        const user = await auth.getUser()

        try {
            const { id } = params

            const student = await Student.find(id)

            if (!student) {
                throw new CreatedException("Student not found", 404, "NOT_FOUND")
            }

            if (user.is_admin || user.is_super_admin) {
                await student.delete()
            } else {
                student.merge({
                    deleted: true
                })
                await student.save()
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

            const student = await Student.find(id)

            const { dismissed } = request.all()

            if (!student) {
                throw new CreatedException("Student not found", 404, "NOT_FOUND")
            }

            student.merge({
                dismissed: dismissed
            })

            await student.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
            
        }
    }
}

module.exports = StudentController
