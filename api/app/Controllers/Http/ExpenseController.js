'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const Expense = use('App/Models/Expense')

class ExpenseController {
  async index ({response}) {

    const expense = await Expense.query()
      .with('pettycash')
      .fetch()

    return response.status(200).json(
      expense
    )
  }

  async store ({response, request, params}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare params
    const {pettycash_id} = params
    const {vote_head, amount} = request.all()

    //Prepare Model
    const expense = new Expense()
    
    expense.fill({
      petty_cash_id: pettycash_id,

      vote_head,
      amount
    })

    await expense.save()

    return response.status(200).json({
      status: true,
      messge: 'Success'
    })
  }

  async show ({response, params}) {
    try {
      //fetch scholarship by id
      const {id} = params
      const expense = await Expense.query()
        .where('id',id )
        .with('pettycash')
        .fetch()

      return response.status(200).json(
        expense
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //vrify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    
    try{
      //Prepare params
      const {pettycash_id, id} = params
      const {vote_head, amount} = request.all()

      //Prepare Model
      const expense = await Expense.find(id)
      
      expense.merge({
        petty_cash_id: pettycash_id,
        vote_head,
        amount
      })

      await expense.save()

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
      //Find Expense by id
      const {id} = params
      const expense = await Expense.find(id)

      //delete expense
      await expense.delete()

      return response.status(200).json({
        status: true,
        messge: 'Success'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = ExpenseController
