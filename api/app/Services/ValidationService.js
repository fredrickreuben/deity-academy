'use strict'

const {validateAll} = use('Validator')

class ValidationService{
    async validate(request, rules, messages, response) {

        const validation = await validateAll(request, rules, messages)

        if (validation.fails()) {
          var withErrors = validation.messages()
          return response.json(withErrors)
        }
    }
}

module.exports = new ValidationService()