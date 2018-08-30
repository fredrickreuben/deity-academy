'use strict'

const {validateAll} = use('Validator')
const User = use('App/Models/User')

class UserController {
  async index ({response}) {
    const users = await User.all()
    return response.status(200).json({
      users
    })
  }

  async registergurdian(request, session, response) {
    //validate form inputs
    const rules = {
      phone: 'required'
    }
    const messages = {
      'phone.required': 'Phone number is required'

    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      var withErrors = validation.messages()
      return response.json(withErrors)
    }
    try {
      //create the user
      const user = await User.create({
        phone: request.input('phone'),
        role: request.input('role')
      })

      return user

    } catch (error) {
      return error
    }
  }

  async store ({request,session,response}) {
    
      const role = request.input('role')
      if (role == 20) {
        return await this.registergurdian(request, session, response)
      }

      return await this.registerstaff(request, session, response)
  }

  async show () {
  }

  async edit () {
  }

  async update () {
  }

  async destroy ({params}) {
    const {id} = params
    try {
      const user = await User.find(id)
      await user.delete()
      return true
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
