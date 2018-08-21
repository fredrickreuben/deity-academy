'use strict'
const {validateAll} = use('Validator')
const User = use('App/Models/User')

class AuthController {
    async staff({ request, response, auth }){
        //validate form inputs
        const rules = {
          phone: 'required',
          pin: 'required'
        }

        const messages = {
          'phone.required': 'Phone Number is required.',
          'pin.required': 'Enter your Secrete pin'
        }

        const validation = await validateAll(request.all(), rules, messages)

        if (validation.fails()) {
            var withErrors = validation.messages()
            return response.json(withErrors)
        }

        try {
            const {phone, pin} = request.all()
            //Retrive use based on form data
            const user = await User.query().where('phone', phone).first()

            if (user.is_staff === 1) {
                if (user.is_active === 1) {
                    try {
                        const token = await auth.attempt(phone, pin)
                        return response.status(200).json({
                          token: token
                        })
                    } catch (error) {
                        console.log(error)
                        return response.status(404).json({
                            message: error
                        })
                    }
                }
            }

            return response.status(404).json({
                message: 'Staff member not found.'
            })

        } catch (error) {
            
        }
    }
}

module.exports = AuthController
