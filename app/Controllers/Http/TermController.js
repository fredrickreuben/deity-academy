'use strict'

const YearController = require("./YearController")

const Term = use('App/Models/Term')

const CreatedException = use('App/Exceptions/CreatedException')

class TermController {

    async index({ response }) {
        try {
            const term = await Term.query().fetch()

            return response.status(200).json(
                term.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const term = new Term()
            const { label, name, current } = request.all()

            term.fill({
                name: name,
                label: label,
                current: current
            })

            if (current == 1) {
                try {
                    await Term.query().where('current', true).update('current', false)
                } catch (error) {

                }
            }

            await term.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                term
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const term = await Term.find(id)

            return response.status(200).json(
                term.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { label, name, current } = request.all()
            const term = await Term.find(id)

            if (current == 1) {
                try {
                    await Term.query().where('current', true).update('current', false)
                } catch (error) {

                }
            }

            term.merge({
                label: label,
                name: name,
                current: current
            })

            await term.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                term
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const term = await Term.find(id)

            await term.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = TermController
