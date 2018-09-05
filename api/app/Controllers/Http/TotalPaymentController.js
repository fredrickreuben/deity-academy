'use strict'

const Event = use('Event')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const TotalPayment = use('App/Models/TotalPayment')

class TotalPaymentController {
  async index ({response}) {

    const totalpayment = await TotalPayment.query()
      .with('pupil')
      .with('tos')
      .fetch()

    return response.status(200).json(
      totalpayment
    )
  }

  async store ({response, params, request}) {
      //Prepare params
      const {tos_id, pupil_id} = params
      const {amount, paid} = request.all()

      //prepare db data
      const totalpayment = {tos_id, pupil_id, amount, paid}

      //Emit Update Total Payment Event
      Event.emit('totalpayments::store', totalpayment)

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
  }

  async show ({response, params}) {
    try {
      //fetch total payment by id
      const {id} = params
      const totalpayment = await TotalPayment.query()
        .where('id',id )
        .with('pupil')
        .with('tos')
        .fetch()

      return response.status(200).json(
        totalpayment
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
      //Prepare params
      const {tos_id, pupil_id, id} = params
      const {amount, paid} = request.all()

      //prepare db data
      const totalpayment = {tos_id, pupil_id, amount, paid, id}

      //Emit Update Total Payment Event
      Event.emit('totalpayments::update', totalpayment)

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
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
      //Find Total Payment by id
      const {id} = params
      const totalpayment = await TotalPayment.find(id)

      //delete total
      await totalpayment.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = TotalPaymentController
