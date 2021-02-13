'use strict'

const Contact = use('App/Models/StaffContact')

const CreatedException = use('App/Exceptions/CreatedException')

class StaffContactController {

    async index({ response }) {

        try {

            const contact = await Contact.query().fetch()

            return response.status(200).json(
                contact.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async store({ response, request, params }) {
        try {

            const contact = new Contact()

            const { staff_id } = params

            const { phone_number, emergency_number, email_address, postal_address} = request.all()

            contact.fill({
                staff_id: staff_id,
                phone_number: phone_number,
                emergency_number: emergency_number,
                email_address: email_address,
                postal_address: postal_address
            })

            await contact.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                contact
            })

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)

        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const contact = await Contact.find(id)

            if (!contact) {
                throw new CreatedException("Contact not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                contact
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            
            const { staff_id, id } = params

            const contact = await Contact.find(id)

            const { phone_number, emergency_number, email_address, postal_address} = request.all()

            if (!contact) {
                throw new CreatedException("Contact not found", 404, "NOT_FOUND")
            }

            contact.merge({
                staff_id: staff_id,
                phone_number: phone_number,
                emergency_number: emergency_number,
                email_address: email_address,
                postal_address: postal_address
            })

            await contact.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                contact
            })
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const contact = await Contact.find(id)

            if (!contact) {
                throw new CreatedException("Contact not found", 404, "NOT_FOUND")
            }

            await contact.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = StaffContactController
