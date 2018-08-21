'use strict'

const {validateAll} = use('Validator')
const User = use('App/Models/User')
const Staff = use('App/Models/Staff')

class StaffController {
  async index ({response}) {
    const staff = await Staff.query().with('user').fetch()
    return response.json(staff)
  }

  async create () {
  }

  async store ({request, response}) {

    //validate form inputs
    const rules = {
      email: 'required|email|unique:users,email',
      f_name: 'required',
      l_name: 'required',
      national_id: 'required',
    }

    const messages = {
      'email.required': 'Email field is required.',
      'email.unique': 'A user with this email address already exist.',
      'email.email': 'Enter a valid email address.',
      'f_name.required': 'First Name is required.',
      'l_name.required': 'Last Name is required.',
      'national_id.required': 'National ID is required.',
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      var withErrors = validation.messages()
      return response.json(withErrors)
    }

    try {
    
      const values = request.all()
      const staff = new Staff()
      
      //create the user
      const user = await User.create({
        email: values.email,
        is_staff: true,
        pin: await Hash.make('0000'),
      })
      
      //create staff
      staff.fill({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        role: values.role
      })
      
      const data = await user.staff().save(staff)
      return data

    } catch (error) {
      return response.json({
        error: error
      })
    }
  }

  async show ({params, response}) {

    const {id} = params
    const staff = await Staff.query().where('id', id).with('user').fetch()
    return response.json(staff)

  }

  async edit () {
  }

  async update ({request, response, params}) {
    try {
      const {id} = params
      const values = request.all()
      const staff = await Staff.find(id)
      try {
        const user = await User.findBy('email', values.email)
        if (user.id == staff.user_id) {
          //validate form inputs
          const rules = {
            email: 'required|email',
            password: 'required|min:6|max:30|alpha_numeric|confirmed',
            password_confirmation: 'required'
          }

          const messages = {
            'email.required': 'Email field is required.',
            'email.unique': 'A user with this email address already exist.',
            'email.email': 'Enter a valid email address.',
            'password.required': 'Password is required.',
            'password.min': 'Password must be at least 6 character long.',
            'password.max': 'Password is too long, you need a maximum of 30 characters',
            'password.alpha_numeric': 'Password must contain at least Numbers,Uppercase and Lowercase',
            'password.confirmed': 'Passwords do not match.',
            'password.required': 'Password is required.'
          }

          const validation = await validateAll(request.all(), rules, messages)

          if (validation.fails()) {
            var withErrors = validation.messages()
            return response.json(withErrors)
          }
          
        }else{
          //validate form inputs
          const rules = {
            email: 'required|email|unique:users,email',
            password: 'required|min:6|max:30|alpha_numeric|confirmed',
            password_confirmation: 'required'
          }

          const messages = {
            'email.required': 'Email field is required.',
            'email.unique': 'A user with this email address already exist.',
            'email.email': 'Enter a valid email address.',
            'password.required': 'Password is required.',
            'password.min': 'Password must be at least 6 character long.',
            'password.max': 'Password is too long, you need a maximum of 30 characters',
            'password.alpha_numeric': 'Password must contain at least Numbers,Uppercase and Lowercase',
            'password.confirmed': 'Passwords do not match.',
            'password.required': 'Password is required.'
          }

          const validation = await validateAll(request.all(), rules, messages)

          if (validation.fails()) {
            var withErrors = validation.messages()
            return response.json(withErrors)
          }
        }

      } catch (error) {
          //validate form inputs
          const rules = {
            email: 'required|email|unique:users,email',
            password: 'required|min:6|max:30|alpha_numeric|confirmed',
            password_confirmation: 'required'
          }

          const messages = {
            'email.required': 'Email field is required.',
            'email.unique': 'A user with this email address already exist.',
            'email.email': 'Enter a valid email address.',
            'password.required': 'Password is required.',
            'password.min': 'Password must be at least 6 character long.',
            'password.max': 'Password is too long, you need a maximum of 30 characters',
            'password.alpha_numeric': 'Password must contain at least Numbers,Uppercase and Lowercase',
            'password.confirmed': 'Passwords do not match.',
            'password.required': 'Password is required.'
          }

          const validation = await validateAll(request.all(), rules, messages)

          if (validation.fails()) {
            var withErrors = validation.messages()
            return response.json(withErrors)
          }
      }

      //update staff
      staff.merge({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        role: values.role
      })

      await staff.save()
      await staff.user().update({
        email: values.email,
        phone: values.phone,
        password: values.password
      })
      return true

    } catch (error) {
      return response.json({
        error: error
      })
    }
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

module.exports = StaffController
