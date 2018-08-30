'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const Department = use('App/Models/Department')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class DepartmentController { 
  async index ({response}) {
     const departments = await Department.all()

     return response.status(200).json({
       departments
     })
  }

  async store ({response, request}) {

    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //create new depatment
    const department = new Department()
    const {name} = request.all()

    department.fill({
      name
    })

    await department.save()

    return response.status(200).json({
      status: true,
      message: 'Success!!!'
    })


  }

  async show ({response, params}) {

    try {
      //find department by id
      const {id} = params
      const department = await Department.find(id)

      return response.status(200).json({
        department
      })
      
    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }

  async update ({response, params, request}) {
    //verify user
    const roles = request.roles
    await AuthorizationService.verfyProAdmins(roles)

    //find depatment by id
    const {id} = params
    const {name} = request.all()
    const department = await Department.find(id)

    department.merge({
      name
    })

    await department.save()

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
      //find department
      const {id} = params
      const department = await Department.find(id)
      
      await department.delete()

      return response.status(200).json({
        status: true,
        message: 'Success!!!'
      })

    } catch (error) {
      throw new ResourceNotFoundException()
    }
  }
}

module.exports = DepartmentController
