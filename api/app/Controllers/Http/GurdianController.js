'use strict'
const {validateAll} = use('Validator')
const User = use('App/Models/User')
const Gurdian = use('App/Models/Gurdian')
const Hash = use('Hash')
const AuthorizationService = use('App/Services/AuthorizationService')
const ValidationService = use('App/Services/ValidationService')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')

class GurdianController {
  async index ({request, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    const gurdian = await Gurdian.query().with('user').fetch()
    return response.json(gurdian)
  }

  async create () {
  }

  async store ({request, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)
    //validate form inputs
    const rules = {
      email: 'email|unique:users,email',
      f_name: 'required',
      l_name: 'required',
      national_id: 'required',
      phone: 'required|unique:users,phone'
    }

    const messages = {
      'email.unique': 'A user with this email address already exist.',
      'email.email': 'Enter a valid email address.',
      'f_name.required': 'First Name is required.',
      'l_name.required': 'Last Name is required.',
      'national_id.required': 'National ID is required.',
      'phone.required': 'Phone number is required',
      'phone.unique': 'A user with this phone number already exist'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      var withErrors = validation.messages()
      return response.json(withErrors)
    }

    //await ValidationService.validate(request.all(), rules, messages, response)

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
        address: values.phone,
        county: values.county,
        subcounty: values.subcounty,
        eastate: values.eastate
      })
      
      const data = await user.gurdian().save(gurdian)
      return data

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

  async edit () {
  }

  async update ({request, params, response}) {
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      const {id} = params
      const values = request.all()
      const gurdian = await Gurdian.find(id)

      const validation = await validateAll(request.all(), {
        phone: 'required',
        email: 'email',
        f_name: 'required',
        l_name: 'required',
        national_id: 'required',
      }, {
        'email.email': 'Enter a valid email address.',
        'f_name.required': 'First Name is required.',
        'l_name.required': 'Last Name is required.',
        'national_id.required': 'National ID is required.',
        'phone.required': 'Phone number is required'
      })

      if (validation.fails()) {
        var withErrors = validation.messages()
        return response.json(withErrors)
      }

      //await ValidationService.validate(request.all(), , , response)

      const user = await User.find(gurdian.user_id)
      
      if (values.phone !== user.phone) {
        //validate form inputs
        const validation = await validateAll(request.all(), {
          phone: 'unique:users,phone'
        }, {
          'phone.unique': 'A user with this phone number already exist'
        })

        if (validation.fails()) {
          var withErrors = validation.messages()
          return response.json(withErrors)
        }
      }

      //update grudian
      gurdian.merge({
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        national_id: values.national_id,
        address: values.phone,
        county: values.county,
        subcounty: values.subcounty,
        eastate: values.eastate
      })

      await gurdian.save()
      await gurdian.user().update({
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
