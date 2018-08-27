'use strict'

const roles = use('App/Services/Roles')
class Roles {
  async handle ({ request, auth}, next) {
    // call next to advance the request
    const user = await auth.getUser()

    request.roles = {
      is_super_admin: await roles.is_super_admin(user),
      is_admin: await roles.is_admin(user),
      is_staff: await roles.is_staff(user),
      is_hod: await roles.is_hod(user),
      is_director: await roles.is_director(user),
      is_bod: await roles.is_bod(user),
      is_manager: await roles.is_manager(user),
      is_headteacher: await roles.is_headteacher(user),
      is_deputyheadteacher: await roles.is_deputyheadteacher(user),
      is_accountant: await roles.is_accountant(user),
      is_secretary: await roles.is_secretary(user),
      is_seniorteacher: await roles.is_seniorteacher(user),
      is_gurdian: await roles.is_gurdian(user)
    }
    await next()
  }
}

module.exports = Roles
