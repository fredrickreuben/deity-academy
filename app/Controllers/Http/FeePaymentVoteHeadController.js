'use strict'

const VoteHead = use('App/Models/FeePaymentVoteHead')
const CreatedException = use('App/Exceptions/CreatedException')

class FeePaymentVoteHeadController {

    async index({ response }) {
        try {
            
            const votehead = await VoteHead.query().fetch()

            return response.status(200).json(
                votehead.toJSON()
            )

        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {
        try {

            const votehead = new VoteHead()
            const { amount, balance, fee_vote_head_id, fee_payment_id } = request.all()

            votehead.fill({
                amount, balance, fee_vote_head_id, fee_payment_id
            })

            await votehead.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                votehead
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {
            const { id } = params

            const votehead = await VoteHead.find(id)

            if (!votehead) {
                throw new CreatedException("VoteHead not found", 404, "NOT_FOUND")
            }

            return response.status(200).json(
                votehead.toJSON()
            )

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async update({ response, request, params }) {
        try {
            const { id } = params
            const { amount, balance, fee_vote_head_id, fee_payment_id } = request.all()
            const votehead = await VoteHead.find(id)

            if (!votehead) {
                throw new CreatedException("VoteHead not found", 404, "NOT_FOUND")
            }

            votehead.merge({
                amount, balance, fee_vote_head_id, fee_payment_id
            })

            await votehead.save()

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                votehead
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
    async destroy({ response, params, request }) {
        try {
            const { id } = params
            const votehead = await VoteHead.find(id)

            if (!votehead) {
                throw new CreatedException("VoteHead not found", 404, "NOT_FOUND")
            }

            await votehead.delete()

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = FeePaymentVoteHeadController
