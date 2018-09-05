'use strict'
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const BankAccount = use('App/Models/BankAccount')

class BankAccountController {
  async index ({response}) {

    //fetch all Accounts from db
    const bankAccount = await BankAccount.all()

    return response.status(200).json(
      bankAccount
    )
  }

  async store ({response, request}) {
    //Verfiy user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Prepare params
    const {bank_name, account_no} = request.all()

    //Prepare Models
    const bankAccount = new BankAccount()

    //Persit data to Db
    bankAccount.fill({
      bank_name,
      account_no
    })

    await bankAccount.save()

    return response.status(200).json({
      status: true,
      message:'Success!!!'
    })
  }

  async show ({response, params}) {
    try {
      //Prepare Params
      const {id} = params

      //fetch bank account from db
      const bankAccount = await BankAccount.find(id)

      return response.status(200).json(bankAccount)

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //Verfiy user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //Prepare params
      const {id} = params
      const {bank_name, account_no} = request.all()

      //Prepare Models
      const bankAccount = await BankAccount.find(id)

      //Persit data to Db
      bankAccount.merge({
        bank_name,
        account_no
      })

      await bankAccount.save()

      return response.status(200).json({
        status: true,
        message:'Success!!!'
      })
    } catch (error) {
      
    }
  }

  async destroy ({response, request, params}) {
    try {
      //Prepare Params
      const {id} = params

      //fetch bank account from db
      const bankAccount = await BankAccount.find(id)

      await bankAccount.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = BankAccountController
