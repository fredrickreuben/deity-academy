'use strict'

const Year = use('App/Models/Year')
const CreatedException = use('App/Exceptions/CreatedException')

class YearController {

    async index({ response }) {

        try {

            const year = await Year.query().fetch()

            return response.status(200).json(
                year.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }

    }
    async store({ response, request, params }) {
        try {

            const year = new Year()

            const { ac_year, current } = request.all()

            year.fill({
                year: ac_year,
                current: current
            })

            if(current == 1){
                try {
                    await Year.query().where('current', true).update({ current: false}) 
                } catch (error) {
                    
                }
            }

            await year.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                year
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async show({ response, params }) {
        try {
            const { id } = params
            const year = await Year.find(id)

            if (id == "undefined") {
                throw new CreatedException("Invalid School Id", 400, "INVALID_REQUEST")
            }

            return response.status(200).json(
                year.toJSON()
            )
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try{
        const { id } = params

            const year = await Year.find(id)

            const { ac_year, current } = request.all()

            if(current == 1){
                try {
                    await Year.query().where('current', true).update({ current: false}) 
                } catch (error) {
                    
                }
            }

            year.merge({
                year: ac_year,
                current: current
            })

            await year.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                year
            })
        }catch(error){
            throw new CreatedException(error.message, error.status, error.code)
        }
     }
    async destroy({ response, params, request }) {
        try {

            const { id } = params

            const year = await Year.find(id)

            await year.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }   
    }
}

module.exports = YearController
