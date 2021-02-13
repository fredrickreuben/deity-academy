'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StudentBiodata extends Model {

    student() {
        return this.belongsTo('App/Models/Student')
    }
}

module.exports = StudentBiodata
