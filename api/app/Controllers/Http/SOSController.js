'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const SOS = use('App/Models/SOS')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class SOSController {
  async index ({response}) {
     const sos = await SOS.all()

     return response.status(200).json({
       sos
     })
  }
  
  async store ({response, request}) {

    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //create new stage of study
    const sos = new SOS()

    sos.fill({
      sos : request.input('sos'),
      level: request.input('level')
    })

    await sos.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //find department by id
      const {id} = params
      const sos = await SOS.find(id)

      return response.status(200).json({
        sos
      })
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //find sos by id
    const {id} = params
    const sos = await SOS.find(id)
    const nSOS = await SOS.findBy('level', request.input('level'))

    if (nSOS) {
      if (sos.id != nSOS.id) {
        return response.status(400).json({
           message: 'Level already exist',
           field: 'level'
        })
      }
    }

    sos.merge({
      sos: request.input('sos'),
      level: request.input('level')
    })

    await sos.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })
  }

  async destroy ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //find sos
      const {id} = params
      const sos = await SOS.find(id)
      
      await sos.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = SOSController
