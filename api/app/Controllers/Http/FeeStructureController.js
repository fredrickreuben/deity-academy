'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const FeeStructure = use('App/Models/FeeStructure')

class FeeStructureController { 
  async index ({response, params}) {
    //fetch params
    const {sos_id, tos_id, to_id} = params
    let feeStructure = ''

    if (to_id == 1) {
      feeStructure = await FeeStructure.query().where('sos_id', sos_id)
        .with('sos')
        .with('tos')
        .fetch()
    }else if(to_id == 2){
       feeStructure = await FeeStructure.query().where('tos_id', tos_id)
         .with('sos')
         .with('tos')
         .fetch()
    }else{
      feeStructure = await FeeStructure.query()
        .with('sos')
        .with('tos')
        .fetch()
    }


    return response.status(200).json(
      feeStructure
    )
  }

  async store ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare Model
    const feeStructure = new FeeStructure()

    //Ge params
    const {sos_id, tos_id} = params
    const {amount, vote_head, rate, description, duedate} = request.all() 

    feeStructure.fill({
      sos_id, tos_id, rate, amount, vote_head, description, duedate
    })

    await feeStructure.save()

    return response.status(200).json({
      status:  true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {

    try {
      //fetch fee structure by id
      const {id} = params
      const feeStructure = await FeeStructure.query().where('id',id)
        .with('sos')
        .with('tos')
        .fetch()
      
      return response.status(200).json(
        feeStructure
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({request, response, params}) {
      //vrify user
      const roles = request.roles
      await AuthorizationService.verfyProAdmins(roles)

      try {
        //Ge params
        const {sos_id, tos_id, id} = params
        const {amount, rate, vote_head, description, duedate} = request.all()

        //Prepare Model
        const feeStructure = await FeeStructure.find(id)

        feeStructure.merge({
          sos_id, tos_id, rate, amount, vote_head, description, duedate
        })

        await feeStructure.save()

        return response.status(200).json({
          status:  true,
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
      //find fee structure by id
      const {id} = params
      const feeStructure = await FeeStructure.find(id)

      //delete fee structure
      await feeStructure.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = FeeStructureController
