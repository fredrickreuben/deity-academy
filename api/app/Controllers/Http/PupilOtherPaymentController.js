'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const PupilOtherPayment = use('App/Models/PupilOtherPayment')
const OtherPayment = use('App/Models/OtherPayment')

class PupilOtherPaymentController {
  async index ({response}) {
    const pupilOtherPayments = await PupilOtherPayment.query()
      .with('otherPayment', (builder) => {
        builder.with('tos')
      })
      .with('pupil', (builder) => {
        builder.with('class')
      })
      .fetch()

    return response.status(200).json(
      pupilOtherPayments
    )
  }

  async store ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Get params
    const {opyt_id} = params
    const pupil_id = request.collect(['pupil_id'])
    const otherPayment = await OtherPayment.find(opyt_id)

    //Persit data to Pupil Pamyments to db
    await otherPayment.pupilOtherPayments().createMany(pupil_id)

    return response.status(200).json({
      status: true,
      message: 'Success'
    })
  }

  async show ({response, params}) {

    try {
      //fetch fee structure by id
      const {id} = params
      const pupilOtherPayment = await PupilOtherPayment.query().where('id', id)
        .with('otherPayment', (builder) => {
          builder.with('tos')
        })
        .with('pupil', (builder) => {
          builder.with('class')
        })
        .fetch()
      
      return response.status(200).json(
        pupilOtherPayment
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }


  async update ({request, response, params}) {
      //vrify user
      const roles = request.roles
      await AuthorizationService.verfyProAdmins(roles)

      try{
        //Get params
        const {opyt_id, id} = params
        const {pupils} = request.all()

        //Persit data to Pupil Pamyments to db
        for (let i = 0; i < pupils.length; i++) {
          await PupilOtherPayment.query()
            .where('id', id)
            .update({
              pupil_id: pupils[i],
              other_payment_id: opyt_id
            })
        }

        return response.status(200).json({
          status: true,
          message: 'Success'
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
      const pupilOtherPayment = await PupilOtherPayment.find(id)

      //delete fee structure
      await pupilOtherPayment.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = PupilOtherPaymentController
