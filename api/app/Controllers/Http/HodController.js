'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const HOD = use('App/Models/Hod')

class HodController {
  async index ({response}) {
    //fetch all hods
    const hod = await HOD.query()
      .with('staff')
      .with('department')
      .fetch()

    return response.status(200).json(
      hod
    )
  }

  async store ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare params
    const {staff_id, department_id} = params

    //prepare mode
    const hod = new HOD()

    //Pesist to database
    hod.fill({
      hod: staff_id,
      department_id
    })

    await hod.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    try {
      //fetch data from db
      const {id} = params
      const hod = await HOD.query().where('id', id)
        .with('staff')
        .with('department')
        .fetch()

      return response.status(200).json(
        hod
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
      const {staff_id, department_id, id} = params

      //prepare model
      const hod = await HOD.find(id)

      //Pesist to database
      hod.merge({
        hod: staff_id,
        department_id
      })

      await hod.save()

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
      //Prepare params
      const {id} = params

      //prepare model
      const hod = await HOD.find(id)

      //Delete HOD
      await hod.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = HodController
