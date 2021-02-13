'use strict'

const User = use('App/Models/User')
const Password = use('App/Services/Password.js')

const CreatedException = use('App/Exceptions/CreatedException')

class UserController {

    async index({ response }) {

        try {

            const user = await User.query().fetch()

            return response.status(200).json(
                user.toJSON()
            )
        } catch (error) {

            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async store({ response, request, params }) {

        const user = new User()

        const { staff_id } = params

        const { username, phone, email, is_admin } = request.all()

        const password = await Password.generate()

        try {

            //#TODO Attach staff
            if (staff_id) {
                user.fill({
                    username: username,
                    phone: phone,
                    email: email,
                    password: password,
                    staff_id: staff_id,
                    is_staff: false,
                    is_active: true,
                    is_admin: is_admin
                })
            } else {
                user.fill({
                    username: username,
                    phone: phone,
                    email: email,
                    password: password,
                    is_staff: false,
                    is_active: true,
                    is_admin: is_admin
                })
            }

            await user.save()
            //#TODO Emaill password to new user, use events

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                user
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async show({ response, params }) {
        try {

            const { id } = params

            const user = await User.find(id)

            if (!user) {
                throw new CreatedException("User not found", 404, "NOT_FOUND")
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!',
                user
            })

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }


    async update({ response, request, params }) {

        try {

            const { username, phone, email, is_active, is_admin } = request.all()

            const { staff_id, id } = params

            const user = await User.find(id)

            if (staff_id) {
                user.merge({
                    username: username,
                    phone: phone,
                    email: email,
                    staff_id: staff_id,
                    is_staff: false,
                    is_active: true,
                    is_admin: is_admin
                })
            } else {
                user.merge({
                    username: username,
                    phone: phone,
                    email: email,
                    is_staff: false,
                    is_active: is_active,
                    is_admin: is_admin
                })
            }

            await user.save()

            return response.status(200).json(user.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }


    async destroy({ response, params, auth }) {

        const _auth = await auth.getUser()

        try {
            const { id } = params

            const user = await User.find(id)

            if(_auth.is_admin || _user.is_super_admin){
                await user.delete()
            }else{
                user.merge({
                    deleted: true
                })
                await user.save()
            }

            return response.status(200).json({
                status: true,
                message: 'Success!!!'
            })
            
        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }

    async reset({ response, request, params }) {

        const { password } = request.all()

        const { id } = params

        try {

            const user = await User.find(id)

            user.merge({
                password: password,
            })

            await user.save()

            return response.status(200).json(user.toJSON())

        } catch (error) {
            throw new CreatedException(error.message, error.status, error.code)
        }
    }
}

module.exports = UserController
