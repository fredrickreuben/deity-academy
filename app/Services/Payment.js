'use strict'
const VoteHead = use('App/Models/FeePaymentVoteHead')
const CreatedException = use('App/Exceptions/CreatedException')

class Payment{


    async add(voteheads){

        try {

            const payments = await VoteHead.createMany(voteheads)

            return payments

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }

    }
}

module.exports = new Payment()

