'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const Class = use('App/Models/Class')
const SOS = use('App/Models/SOS')
const Stream = use('App/Models/Stream')
const Staff = use('App/Models/Staff')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class ClassController {
  async index ({response, params}) {
    const {sos_id, teacher_id, stream_id} = params
    const classes = await Class.query()
        .with('stream')
        .with('teacher')
        .with('sos')
        .with('pupils')
        .fetch()

    return response.status(200).json(
      classes.toJSON()
    )
  }

  async store ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Store new class to db
    const cclass = new Class()
    const {sos_id, stream_id, teacher_id} = params
    const sos = await SOS.find(sos_id)
    const staff = await Staff.find(teacher_id)
    const stream = await Stream.find(stream_id)

    //validate entries
    if (!sos || !staff || !stream) {
      return response.status(400).json({
        status: false,
        message: 'Invalid Entries'
      })
    }

    //Check if a class already exists
    const Classes = await Class.query()
      .where('sos_id', sos_id)
      .where('teacher_id', teacher_id)
      .where('stream_id', stream_id)
      .fetch()
    
    const classes = Classes.toJSON()

    if (classes.length) {
      return response.status(400).json({
        status: false,
        message: 'Class Already exist!!!'
      })
    }

    cclass.fill({
      sos_id,
      stream_id,
      teacher_id
    })

    await cclass.save()

    //return response on success
    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })
  } 

  async show ({response, params}) {

    try {
      //find department by id
      const {id} = params
      const pClass = await Class.query().where('id', id)
        .with('stream')
        .with('teacher')
        .with('sos')
        .with('pupils')
        .fetch()

      return response.status(200).json(
        pClass.toJSON()
      )
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, request, params}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //Store new class to db
    const {sos_id, stream_id, teacher_id, id} = params
    const cclass = await Class.find(id)
    const sos = await SOS.find(sos_id)
    const staff = await Staff.find(teacher_id)
    const stream = await Stream.find(stream_id)

    //validate entries
    if (!sos || !staff || !stream) {
      return response.status(400).json({
        status: false,
        message: 'Invalid Entries'
      })
    }

    //check if class already exist
    const Classes = await Class.query()
      .where('sos_id', sos_id)
      .where('teacher_id', teacher_id)
      .where('stream_id', stream_id)
      .fetch()

    const classes = Classes.toJSON()

    if (classes.length) {
      return response.status(400).json({
        status: false,
        message: 'Class Already exist!!!'
      })
    }

    cclass.merge({
      sos_id,
      stream_id,
      teacher_id
    })

    await cclass.save()

    //return response on success
    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })
  }

   async destroy ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    try {
      //find stream
      const {id} = params
      const pClass = await Class.find(id)
      
      await pClass.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = ClassController
