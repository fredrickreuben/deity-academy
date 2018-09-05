'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const YOSService = use('App/Services/YOSService')
const YOS = use('App/Models/YOS')

class YOSController {
  async index ({response}) {
    const yos = await YOS.query().with('tos').fetch()
    return response.status(200).json(
      yos
    ) 
  }

  async store ({response, request}) {

    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //save create new year of study
    const yos = new YOS()
    const {start_date, end_date, current} = request.all()

    //unset previos current
    if (current == 1) {
      await YOSService.current(YOS)
    }

    yos.fill({
      start_date,
      end_date,
      current
    })

    await yos.save()

    return response.status(200).json({
      status: true,
      message: 'ok'
    })
  }

  async show ({response, params}) {
    
    try {
      //Find Year Of Study
      const {id} = params
      const yos = await YOS.query().where('id', id )
         .with('tos')
         .fetch()

      return response.status(200).json(
        yos.toJSON()
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //update year of study
    const {id} = params
    const yos = await YOS.find(id)
    const {start_date, end_date, current} = request.all()

    //unset previos current
    if (current == 1 && yos.current == 0) {
      await YOSService.current(YOS)
    }

    yos.merge({
      start_date,
      end_date,
      current
    })

    await yos.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async destroy ({response, params}) {
    try {
      //find year of study
      const {id} = params
      const yos = await YOS.find(id)

      //delete year of stidy
       await yos.delete()

       return response.status(200).json({
         status: true,
         message: 'Success'
       })
    } catch (error) {
       throw new ResourceNotFoundException()
    }
  }
}

module.exports = YOSController
