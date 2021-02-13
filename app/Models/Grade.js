'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Grade extends Model {

    students() {
        return this.hasMany('App/Models/Student')
    }

    teachers() {
        return this.hasMany('App/Models/Staff')
    }

}

module.exports = Grade
