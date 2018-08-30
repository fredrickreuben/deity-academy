'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const PYOS = use('App/Models/PYOS')

class PYOSController {
  async index ({response}) {
    //fetch Pupils Year of Study from database
    const pyos = await PYOS.query()
      .with('yos')
      .with('pupils')
      .with('sos')
      .fetch()

      return response.status(200).json(
        pyos.toJSON()
      )
  }

  async store ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //fetch parameters
    const {pupil_id, sos_id, yos_id} = params

    //validate parameters
    if (!pupil_id || !sos_id || !yos_id) {
       return response.status(400).json({
          status: false,
          message: 'Invalid Entries'
       })
    }

    //store new pupil year of study
    const pyos = new PYOS()

    pyos.fill({
      pupil_id, 
      sos_id, 
      yos_id
    })

    await pyos.save()

    return response.status(400).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //fetch pupil year of study from db
      const {id} = params
      const pyos = await PYOS.query().where('id', id )
        .with('yos')
        .with('sos')
        .with('pupils')
        .fetch()

      return response.status(200).json(
        pyos.toJSON()
      )

    } catch (error) {
       throw new ResourceNotFoundException()
    }
    
  }

  async update ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //fetch parameters
    const {pupil_id, sos_id, yos_id, id} = params

    //validate parameters
    if (!pupil_id || !sos_id || !yos_id) {
       return response.status(400).json({
          status: false,
          message: 'Invalid Inputs'
       })
    }

    //store new pupil year of study
    const pyos = await PYOS.find(id)

    pyos.merge({
      pupil_id, 
      sos_id, 
      yos_id
    })

    await pyos.save()

    return response.status(400).json({
      status: true,
      message: 'Success!!!'
    })
  }

  async destroy ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //fetch pupil year of study from database
      const {id} = params
      const pyos = await PYOS.find(id)

      //delete pupil Year Of Study
      await pyos.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }

  }
}

module.exports = PYOSController
