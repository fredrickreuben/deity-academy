'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const Dismissal = use('App/Models/Dismissal')

class DismissalController {
  async index ({response, params}) {
    //fetch all dismissals from the database
    const {person_id} = params

    const dismissal = await Dismissal.query()
      .with('pupil')
      .with('staff')
      .fetch()

      return response.status(200).json(
        dismissal.toJSON()
      )
  }

  async store ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //persit dimissal to databse
    const dismissal = new Dismissal()
    const {person_id} = params
    const values = request.all()

    const pupil_id = (values.person === 1) ? person_id : null
    const staff_id = (values.person === 0) ? person_id : null

    dismissal.fill({
      pupil_id: pupil_id,
      staff_id: staff_id,
      person: values.person,
      status: values.status,
      date_dismissal: values.date_dismissal,
      days: values.days,
      reason: values.reason,
      attached_letter: values.attached_letter
    })

    await dismissal.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //fetch dimissal from database
      const {id} = params
      const dismissal = await Dismissal.query()
        .where('id', id )
        .with('pupil')
        .with('staff')
        .fetch()

        return response.status(200).json(
          dismissal.toJSON()
        )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //persit dimissal to databse
    const {person_id, id} = params
    const dismissal = await Dismissal.find(id)
    const values = request.all()

    const pupil_id = (values.person == 1) ? person_id : null
    const staff_id = (values.person == 0) ? person_id : null

    dismissal.merge({
      pupil_id: pupil_id,
      staff_id: staff_id,
      person: values.person,
      status: values.status,
      date_dismissal: values.date_dismissal,
      days: values.days,
      reason: values.reason,
      attached_letter: values.attached_letter
    })

    await dismissal.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async destroy ({response, params, request}) {
    
      try {
        //verfiy user
        const roles = request.roles
        await AuthorizationService.verfyProAdmins(roles)

        //find dimmissal from the database
        const {id} = params
        const dismissal = await Dismissal.find(id)

        //delete user
        await dismissal.delete()

        return response.status(200).json({
          status: true,
          message: 'Success!!!'
        })

      } catch (error) {
        throw new ResourceNotFoundException()
      }
  }
}

module.exports = DismissalController
