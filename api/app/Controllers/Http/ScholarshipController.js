'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const Scholarship = use('App/Models/Scholarship')

class ScholarshipController {
  async index ({response}) {
    //fetch all scholarships from db
    const scholarship = await Scholarship.query()
     .with('scholarshipType')
     .with('pupil')
     .fetch()

    return response.status(200).json(
      scholarship
    )
  }

  async store ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Fetch params
    const {pupil_id, scholarshiptype_id} = params
    const scholarship = new Scholarship()

    scholarship.fill({
      pupil_id,
      scholarship_type_id: scholarshiptype_id
    })
    
    await scholarship.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    try {
      //fetch fee structure by id
      const {id} = params
      const scholarship = await Scholarship.query().where('id', id)
        .with('scholarshipType')
        .with('pupil')
        .fetch()
      
      return response.status(200).json(
        scholarship
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //Fetch params
      const {id, pupil_id, scholarshiptype_id} = params
      const scholarship = await Scholarship.find(id)

      scholarship.merge({
        pupil_id,
        scholarship_type_id: scholarshiptype_id
      })

      await scholarship.save()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
       throw new ResourceNotFoundException()
    }
  }

  async destroy ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //fetch scholarship from database
      const {id} = params
      const scholarship = await Scholarship.find(id)
      await scholarship.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = ScholarshipController
