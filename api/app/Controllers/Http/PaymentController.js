'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const Payment = use('App/Models/Payment')

class PaymentController {
  async index ({response}) {
    //Fetch all payments from databse
    const payment = await Payment.query()
      .with('pupil')
      .with('paidby')
      .with('bank')
      .with('otherpayment')
      .with('feestructure')
      .with('receipts')
      .fetch()

      return response.status(200).json(payment)
  }

  async store ({response, request, params}) {
     //Prepare params
     const {pupil_id, paidby_id, bank_id, payment_id, feestructure_id} = params
     const {balance, amount, fee} = request.all()

     //Prepare model
     const payment = new Payment()

     //Persist data to db
     payment.fill({
       pupil_id,
       gurdian_id: paidby_id,
       bank_account_id: bank_id,
       pupil_other_payment_id: payment_id,
       fee_structure_id: feestructure_id,
       balance,
       amount,
       fee
     })

     await payment.save()

     return response.status(200).json({
       status: true,
       message: 'Success!!!'
     })
  }

  async show ({response, params}) {
    try {
      //Prepare params
      const {id} = params
      //Fetch all payments from databse
      const payment = await Payment.query()
        .where('id', id)
        .with('pupil')
        .with('paidby')
        .with('bank')
        .with('otherpayment')
        .with('feestructure')
        .with('receipts')
        .fetch()

      return response.status(200).json(payment)
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params}) {
    try {
      //Prepare params
      const {pupil_id, paidby_id, bank_id, payment_id, feestructure_id, id} = params
      const {balance, amount, fee} = request.all()

      //Prepare model
      const payment = await Payment.find(id)

      //Persist data to db
      payment.merge({
        pupil_id,
        paidBy: paidby_id,
        fee_structure_id: bank_id,
        pupil_other_payment_id: payment_id,
        fee_structure_id: feestructure_id,
        balance,
        amount,
        fee
      })

      await payment.save()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async destroy ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //Fetch Payment from db
      const {id} = params
      const payment = await Payment.find(id)

      //Drop payment
      await payment.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException
    }
  }
}

module.exports = PaymentController
