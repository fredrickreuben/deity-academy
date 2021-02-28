'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Residence extends Model {

    studentLocation() {
        return this.hasOne('App/Models/StudentLocation')
    }

    staffLocation() {
        return this.hasOne('App/Models/StaffLocation')
    }

    zone() {
        return this.hasOne('App/Models/ResidenceZone')
    }
}

module.exports = Residence
