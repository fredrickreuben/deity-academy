'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AdmissionRequirement = use('App/Models/AdmissionRequirement')

class AdmissionRequirementController {
  async index ({response}) {
    //fetch admission requirements from database
    const admissionRequirements = await AdmissionRequirement.all()

    return response.status(200).json(
      admissionRequirements
    )
  }

  async store ({response, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Fetch params
    const {item, description} = request.all()

    //prepare model
    const admissionRequirements = new AdmissionRequirement()

    //Persit Params to DB
    admissionRequirements.fill({
      item, 
      description
    })

    await admissionRequirements.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })
  }

  async show ({response, params}) {
    try {
      //find Admission Requirements
      const {id} = params
      const admissionRequirement = await AdmissionRequirement.find(id)

      return response.status(200).json(
        admissionRequirement
      )
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, request, params}) {
    try {
      //verify user
      const roles = request.roles
      await AuthorizationService.verfyProAdmins(roles)

      //Fetch params
      const {id} = params
      const {item, description} = request.all()

      //prepare model
      const admissionRequirements = await AdmissionRequirement.find(id)

      //Persit Params to DB
      admissionRequirements.merge({
        item, 
        description
      })

      await admissionRequirements.save()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async destroy ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //find Admission requrement
      const {id} = params
      const admissionRequirement = await AdmissionRequirement.find(id)

      //delete admission requirement
      await admissionRequirement.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = AdmissionRequirementController
