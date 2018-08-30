'use strict'

const User = use('App/Models/User')
const Staff = use('App/Models/Staff')
const Hash = use('Hash')
const AuthorizationService = use('App/Services/AuthorizationService')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')


class StaffController {
  async index ({request,response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    const staff = await Staff.query().with('user').fetch()
    return response.json(staff)
  }

  async store ({request, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
  
    try {
    
      const values = request.all()
      const staff = new Staff()
      
      //create the user
      const user = await User.create({
        email: values.email,
        phone: values.phone,
        is_staff: true,
        pin: await Hash.make('0000'),
        password: values.password
      })
      
      //create staff
      staff.fill({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        role: values.role,
        teaching: values.teaching
      })
      
      await user.staff().save(staff)

      return response.status(200).json({
        status: true,
        message: 'success'
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
      const staff = await Staff.query().where('id', id).with('user').fetch()
      return response.json(staff)
    } catch (error) {
      throw new UserNotFoundException()
    }
  }

  async update ({request, response, params}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    try {
      const {id} = params
      const values = request.all()
      const staff = await Staff.find(id)
      const user = await User.findBy('phone', values.phone)
      //#validate phone number
      if (user) {
        if (user.id != staff.user_id) {
          return response.status(400).json({
            message: "A user with this phone number already exist.",
            field: "phone"
          })
        }
      }

       //validate email address    
      if (values.email) {
        const mUser = await User.findBy('email', values.email)
        if (mUser) {
          if (mUser.id != staff.user_id) {
            return response.status(400).json({
              message: "A user with this email already exist.",
              field: "email"
            })
          }
        }
      }

      //update staff
      staff.merge({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        role: values.role,
        teaching: values.teaching
      })

      await staff.save()
      await staff.user().update({
        email: values.email,
        phone: values.phone,
        is_active: values.is_active,
        pin: values.pin,
        password: values.password
      })

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      return response.json({
        error: error
      })
    }
  }

  async destroy ({request, params}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    const {id} = params
    try {
      const user = await Staff.find(id)
      await user.delete()
      return true
    } catch (error) {
      throw new UserNotFoundException()
    }
  }
}

module.exports = StaffController
