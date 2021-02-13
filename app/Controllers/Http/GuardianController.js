'use strict'

const Guardian = use('App/Models/Guardian')

const CreatedException = use('App/Exceptions/CreatedException')

class GuardianController {
   
    async index({response, auth}) {

        const user = await auth.getUser()

        try {

            var guardian = await Guardian.all()

            if (!user.is_admin || !user.is_super_admin) {
                guardian = await Guardian.query().where('deleted', false).where('dismissed', false ).fetch()
            }

            return response.status(200).json(guardian.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
        
    }

    async store({ response, request, params }) {

        try {

            const guardian = new Guardian()

            var { f_name, l_name, m_name, gender, relationship, national_id_no, phone_no, email, nationality, residence } = request.all()

            guardian.fill({
                f_name: f_name,
                m_name: m_name,
                l_name: l_name,
                relationship: relationship,
                national_id_no: national_id_no,
                gender: gender,
                phone_no: phone_no,
                email: email,
                nationality: nationality,
                residence: residence
            })

            await guardian.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                guardian
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const guardian = await Guardian.find(id)

            if (!guardian) {
                throw new CreatedException("Guardian not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                guardian
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async update({ response, request, params }) {
        try {

            const {id} = params

            const guardian = await Guardian.find(id)

            var { f_name, l_name, m_name, gender, relationship, national_id_no, phone_no, email, nationality, residence } = request.all()

            guardian.merge({
                f_name: f_name,
                m_name: m_name,
                l_name: l_name,
                relationship: relationship,
                national_id_no: national_id_no,
                gender: gender,
                phone_no: phone_no,
                email: email,
                nationality: nationality,
                residence: residence
            })

            await guardian.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                guardian
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, auth }) {

        const user = await auth.getUser()

        try {
            const { id } = params

            const guardian = await Guardian.find(id)

            if (!guardian) {
                throw new CreatedException("Guardian not found", 404, "NOT_FOUND")
            }

            if (user.is_admin || user.is_super_admin) {
                await guardian.delete()
            } else {
                guardian.merge({
                    deleted: true
                })
                await guardian.save()
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
}

module.exports = GuardianController
