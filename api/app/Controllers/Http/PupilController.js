'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')
const Class = use('App/Models/Class')
const Pupil = use('App/Models/Pupil')

class PupilController {
  async index ({response}) {

    //list all pupils
    const pupils = await Pupil.query().with('gurdians').with('class').fetch()

    return response.status(200).json(
      pupils.toJSON()
    )
  }

  async store ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //persist user to db
    const pupil = new Pupil()
    const values = request.all()
    const {class_id} = params
    const pClass = await Class.find(class_id)
    const gurdians = values.gurdians

    if (!pClass) {
      return response.status(400).json({
        status: false,
        message: 'Class does not exist!!!'
      })
    }

    if (gurdians && gurdians.length == 0) {
      return response.status(400).json({
        status: false,
        message: 'A pupil must have a gurdian!!!'
      })
    }

    pupil.fill({
       f_name: values.f_name,
       m_name: values.m_name,
       l_name: values.l_name,
       dob: values.dob,
       adm_date: values.adm_date,
       boarder: values.boarder,
       class_id: class_id
    })

    await pupil.save()

    await pupil.gurdians().attach(gurdians)

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async show ({response, params}) {

    try {
      //find pupil by id
      const {id} = params
      const pupil = await Pupil.query().where('id', id)
      .with('gurdians')
      .with('class')
      .fetch()

      return response.status(200).json(
        pupil.toJSON()
      )
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //persist user to db
    const values = request.all()
    const {class_id, id} = params
    const pupil = await Pupil.find(id)
    const pClass = await Class.find(class_id)
    const gurdians = values.gurdians

    if (!pClass) {
      return response.status(400).json({
        status: false,
        message: 'Class does not exist!!!'
      })
    }

    if (gurdians && gurdians.length == 0) {
      return response.status(400).json({
        status: false,
        message: 'A pupil must have a gurdian!!!'
      })
    }

    pupil.merge({
       f_name: values.f_name,
       m_name: values.m_name,
       l_name: values.l_name,
       dob: values.dob,
       adm_date: values.adm_date,
       boarder: values.boarder,
       class_id: class_id
    })

    await pupil.save()

    await pupil.gurdians().detach()
    await pupil.gurdians().attach(gurdians)

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })

  }

  async destroy ({response, params,  request}) {
    //verify user
     const roles = request.roles
     await AuthorizationService.verfyProAdmins(roles)

     try {
        //find  pupil by id
        const {id} = params
        const pupil = await Pupil.find(id)

        //delete pupil
        await pupil.delete()

        return response.status(200).json({
           status: true,
           message: 'Success!!!'
        })

     } catch (error) {
        throw new UserNotFoundException()
     }
  }
}

module.exports = PupilController
