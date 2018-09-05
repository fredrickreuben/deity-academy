'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const OtherPayment = use('App/Models/OtherPayment')

class OtherPaymentController { 
  async index ({response}) {
    const otherPayments = await OtherPayment.query()
        .with('pupilOtherPayments')
        .with('tos')
        .fetch()

    return response.status(200).json(
      otherPayments
    )
  }

  async store ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //fetch params
    const {tos_id} = params
    const {amount, rate, item, description, duedate} = request.all()

    //prepare mode
    const otherPayment = new OtherPayment()

    otherPayment.fill({
      amount, item, description, duedate, tos_id
    })

    await otherPayment.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    try {
      //fetch fee structure by id
      const {id} = params
      const otherPayment = await OtherPayment.query().where('id',id)
        .with('pupilOtherPayments')
        .with('tos')
        .fetch()
      
      return response.status(200).json(
        otherPayment
      )
    } catch (error) {

      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //fetch params
      const {amount, rate, item, description, duedate} = request.all()
      const {id, tos_id} = params

      //prepare modes
      const otherPayment = await OtherPayment.find(id)

      otherPayment.merge({
        amount, item, description, duedate, tos_id
      })

      await otherPayment.save()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
       throw new ResourceNotFoundException()
    }
  }

  async destroy ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //find fee structure by id
      const {id} = params
      const otherPayment = await OtherPayment.find(id)

      //delete fee structure
      await otherPayment.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = OtherPaymentController
