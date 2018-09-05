'use strict'

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const AuthorizationService = use('App/Services/AuthorizationService')
const Receipt = use('App/Models/Receipt')

class ReceiptController {
  async index ({response}) {
    //fetch all receipts
    const receipts = await Receipt.query().with('payment').fetch()

    return response.status(200).json(receipts)
  }

  async store ({response, request, params}) {
     //Prepare params
     const {payment_id} = params

     //Prepare model
     const receipt = new Receipt()

     //Persist data to db
     receipt.fill({
       payment_id
     })

     await receipt.save()

     return response.status(200).json({
       status: true,
       message: 'Success!!!'
     })
  }

  async show ({response, params}) {
    try {
      //Prepare params
      const {id} = params
      //Fetch receipt from databse
      const receipt = await Receipt.query()
        .where('id', id)
        .with('payment')
        .fetch()

      return response.status(200).json(receipt)

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params}) {
    try {
      //Prepare params
      const {payment_id, id} = params

      //Prepare model
      const receipt = await Receipt.find(id)

      //Persist data to db
      receipt.merge({
        payment_id
      })

      await receipt.save()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async destroy ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //Fetch Payment from db
      const {id} = params
      const receipt = await Receipt.find(id)

      //Drop receipt
      await receipt.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })
    } catch (error) {
      throw new ResourceNotFoundException
    }
  }
}

module.exports = ReceiptController
