'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const PettyCashService = use('App/Services/Pettycash')
const PettyCash = use('App/Models/PettyCash')

class PettyCashController {
  async index ({response}) {

    const pettycash = await PettyCash.query()
      .with('passedBy')
      .with('checkedBy')
      .with('expenses')
      .fetch()

    return response.status(200).json(
      pettycash
    )
  }

  async store ({response, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare params
    const {paid_to} = request.all()

    //Prepare model
    const pettycash = new PettyCash()

    pettycash.fill({
      paid_to
    })

    await pettycash.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    try {
      //fetch scholarship by id
      const {id} = params
      const pettyCash = await PettyCash.query()
        .where('id',id )
        .with('passedBy')
        .with('checkedBy')
        .with('expenses')
        .fetch()

      return response.status(200).json(
        pettyCash
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
      const {id, passedby_id, checkedby_id} = params
      const TotalExpense = await PettyCashService.TotalExpense(PettyCash, id)
      
      //Make sure expenses is not empty
      if (TotalExpense === false) {
        return response.status(400).json({
          Message: 'Add at least One Expense'
        })
      }

      //Prepare model
      const pettyCash = await PettyCash.find(id)

      pettyCash.merge({
        passed_by:passedby_id,
        checked_by:checkedby_id,
        total: TotalExpense
      })

      await pettyCash.save()

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
      //Find PettyCash by id
      const {id} = params
      const pettycash = await PettyCash.find(id)

      //delete pettycash
      await pettycash.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = PettyCashController
