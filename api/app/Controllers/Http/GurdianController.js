'use strict'
const {validateAll} = use('Validator')
const User = use('App/Models/User')
const Gurdian = use('App/Models/Gurdian')
const Hash = use('Hash')
const AuthorizationService = use('App/Services/AuthorizationService')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')

class GurdianController {
  async index ({request, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    
    const gurdian = await Gurdian.query()
      .with('user')
      .with('payments')
      .fetch()
    return response.json(gurdian)
  }

  async store ({request, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
    
      const values = request.all()
      const gurdian = new Gurdian()
      
      //create the user
      const user = await User.create({
        email: values.email,
        phone: values.phone,
        pin: await Hash.make('0000'),
        password: values.password
      })
      
      //create gurdian
      gurdian.fill({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        address: values.address,
        county: values.county,
        subcounty: values.subcounty,
        eastate: values.eastate 
      })
      
      await user.gurdian().save(gurdian)

      return response.status(200).json({
        status: true,
        message: 'success!'
      })

    } catch (error) {
      return response.json({
        error: error
      })
    }
  }

  async show ({request, params, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    const {id} = params

    try {
      const gurdian = await Gurdian.query().where('id', id).with('user').fetch()
      return response.json(gurdian)
    } catch (error) {
      throw new UserNotFoundException()
    }
  }

  async update ({request, params, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      const {id} = params
      const values = request.all()
      const gurdian = await Gurdian.find(id)
      const user = await User.findBy('phone', values.phone)

      //#validate phone number
      if (user) {
        if (user.id != gurdian.user_id) {
          return response.status(400).json({
            message: "A user with this phone number already exist.",
            field: "phone"
          })
        }
      }

      //#validate email address
      if (values.email) {
        const mUser = await User.findBy('email', values.email)
        if (mUser) {
          if (mUser.id != gurdian.user_id) {
            return response.status(400).json({
              message: "A user with this email already exist.",
              field: "email"
            })
          }
        }
      }

      //update grudian
      gurdian.merge({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        address: values.address,
        county: values.county,
        subcounty: values.subcounty,
        eastate: values.eastate
      })

      await gurdian.save()
      await gurdian.user().update({
        email: values.email,
        phone: values.phone,
        is_active: values.is_active,
        pin: values.pin,
        password: values.password
      })
      return response.status(200).json({
        status: true,
        message: 'success!'
      })

    } catch (error) {
      return response.json({
        error: error
      })
    }
  }

  async destroy ({request, params, response}) {
    const {id} = params
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      const gurdian = await Gurdian.find(id)
      await gurdian.delete()
      return true
    } catch (error) {
      throw new UserNotFoundException()
    }
  }
}

module.exports = GurdianController
