'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StudentLocation extends Model {

    student() {
        return this.belongsTo('App/Models/Student')
    }

    residence() {
        return this.belongsTo('App/Models/Residence')
    }
}

module.exports = StudentLocation
