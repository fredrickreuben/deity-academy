'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {

    grade() {
        return this.belongsTo('App/Models/Grade')
    }

    stream() {
        return this.belongsTo('App/Models/Stream')
    }

    guardians() {
        return this.belongsToMany('App/Models/Guardian')
    }

    location() {
        return this.hasOne('App/Models/StudentLocation')
    }

    biodata() {
        return this.hasOne('App/Models/StudentBiodata')
    }
}

module.exports = Student
