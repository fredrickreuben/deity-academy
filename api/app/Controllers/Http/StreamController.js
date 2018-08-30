'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const Stream = use('App/Models/Stream')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class StreamController {
  async index ({response}) {
     const streams = await Stream.query()
       .with('classes')
       .fetch()

     return response.status(200).json(
       streams.toJSON()
     )
  }
  
  async store ({response, request}) {

    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //create new stream
    const stream = new Stream()
    const {name} = request.all()

    stream.fill({
      name
    })

    await stream.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //find department by id
      const {id} = params
      const stream = await Stream.query().where('id', id)
        .with('classes')
        .fetch()

      return response.status(200).json(
        stream.toJSON()
      )
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //find stream by id
    const {id} = params
    const {name} = request.all()
    const stream = await Stream.find(id)

    stream.merge({
      name
    })

    await stream.save()

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
      //find stream
      const {id} = params
      const stream = await Stream.find(id)
      
      await stream.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = StreamController
