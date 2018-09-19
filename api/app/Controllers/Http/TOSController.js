'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const Event = use('Event')
const TOS = use('App/Models/TOS')

class TOSController {
  async index ({response}) {
    //list all terms
    const tos = await TOS.query()
    .with('yos')
    .with('feestructures')
    .fetch()
    return response.status(200).json(
      tos.toJSON()
    )
  }

  async store ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //create new term of study
    const tos = new TOS()
    const {yos_id} = params
    const {start_date, end_date, current} = request.all()
    
    tos.fill({
      start_date,
      end_date,
      yos_id,
      current
    })

    await tos.save()

    if(current) {
      await TOS.query()
        .where('current', true)
        .update({ current: false  })
      Event.emit('tos::begun', start_date) 
    }

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //find Terms of Study By Id
      const {id} = params
      const tos = await TOS.query().where('id', id )
        .with('yos')
        .with('feestructures')
        .fetch()

      return response.status(200).json(
        tos.toJSON()
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //create new term of study
    const {yos_id, id} = params
    const tos = await TOS.find(id)
    const {start_date, end_date, current} = request.all()

    //Emit events based on current condtions
    if (tos.current && !current) {
      Event.emit('tos::notbegun', {
        tos_id: id
      })
    }

    if (!tos.current && current) {
      await TOS.query()
        .where('current', true)
        .update({ current: false  })
      Event.emit('tos::begun', null)
    } 


    tos.merge({
      start_date,
      end_date,
      current,
      yos_id
    })

    await tos.save()   

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })
  }

  async destroy ({response, params}) {
    //find Term of Study
    try {
      const {id} = params
      const tos = await TOS.find(id)

      //destroy term of study if exist
      await tos.delete()

      return response.status(200).json({
        status: true,
        message: "Success!!!"
      })
    } catch (error) {
       throw new ResourceNotFoundException()
    }    
  }
}

module.exports = TOSController
