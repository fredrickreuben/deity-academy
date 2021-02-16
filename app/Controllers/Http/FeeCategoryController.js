'use strict'

const Category = use('App/Models/FeeCategory')
const CreatedException = use('App/Exceptions/CreatedException')

class FeeCategoryController {

    async index({ response }) {
        try {
            
            const category = await Category.query().fetch()

            return response.status(200).json(
                category.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const category = new Category()
            const { name } = request.all()

            category.fill({
                name: name
            })

            await category.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                category
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const category = await Category.find(id)

            if (!category) {
                throw new CreatedException("Category not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                category.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const {name } = request.all()
            const category = await Category.find(id)

            if (!category) {
                throw new CreatedException("Category not found", 404, "NOT_FOUND")
            }

            category.merge({
                name: name,
            })

            await category.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                category
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const category = await Category.find(id)

            if (!category) {
                throw new CreatedException("Category not found", 404, "NOT_FOUND")
            }

            await category.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = FeeCategoryController
