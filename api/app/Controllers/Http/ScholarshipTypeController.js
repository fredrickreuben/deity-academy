'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const ScholarshipType = use('App/Models/ScholarshipType')

class ScholarshipTypeController {
  async index ({response}) {

    const scholarshipType = await ScholarshipType.query()
      .with('scholarships')
      .fetch()

    return response.status(200).json(
      scholarshipType
    )
  }

  async store ({response, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare params
    const {name, value, description} = request.all()

    //Prepare model
    const scholarshipType = new ScholarshipType()

    scholarshipType.fill({
      name,
      value,
      description
    })

    await scholarshipType.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    //fetch scholarship by id
    const {id} = params
    const scholarshipType = await ScholarshipType.query()
       .where('id',id )
       .with('scholarships')
       .fetch()

    return response.status(200).json(
      scholarshipType
    )
  }

  async update ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //Prepare params
      const {id} = params
      const {name, value, description} = request.all()

      //Prepare model
      const scholarshipType = await ScholarshipType.find(id)

      scholarshipType.merge({
        name,
        value,
        description
      })

      await scholarshipType.save()

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
      //Find Scholarship by id
      const {id} = params
      const scholarshipType = await ScholarshipType.find(id)

      //delete scholarship
      await scholarshipType.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = ScholarshipTypeController
