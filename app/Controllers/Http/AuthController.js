'use strict'
const User = use('App/Models/User');
const Hash = use('Hash');

class AuthController {

    async login({ request, auth, response }) {
        const { email, password } = request.all()
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({ "user": user, "access_token": accessToken })
            }
        }
        catch (e) {
            console.log(e)
            return response.json({ message: 'You first need to register!' })
        }
    }
}

module.exports = AuthController
