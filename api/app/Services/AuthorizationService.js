'use strict'

const InvalidAccessException = use('App/Exceptions/InvalidAccessException')

class AuthorizationService {
    async verfyProAdmins(roles){
        if (!roles.is_super_admin && !roles.is_admin && !roles.is_deputyheadteacher) {
          throw new InvalidAccessException()
        }
    }

}

module.exports = new AuthorizationService()