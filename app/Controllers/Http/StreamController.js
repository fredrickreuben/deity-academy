'use strict'

const Stream = use('App/Models/Stream')

const CreatedException = use('App/Exceptions/CreatedException')

class StreamController {

    async index({ response }) {
        try {
            
            const stream = await Stream.query().fetch()

            return response.status(200).json(
                stream.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const stream = new Stream()
            const { label, name} = request.all()

            stream.fill({
                name: name,
                label: label
            })

            await stream.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                stream
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const stream = await Stream.find(id)

            if (!stream) {
                throw new CreatedException("Stream not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                stream.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { label, name} = request.all()
            const stream = await Stream.find(id)

            if (!stream) {
                throw new CreatedException("Stream not found", 404, "NOT_FOUND")
            }

            stream.merge({
                label: label,
                name: name
            })

            await stream.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                stream
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const stream = await Stream.find(id)

            if (!stream) {
                throw new CreatedException("Stream not found", 404, "NOT_FOUND")
            }

            await stream.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

}

module.exports = StreamController
