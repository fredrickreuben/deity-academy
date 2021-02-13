'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Staff extends Model {

    static formatDates (field, value) {
        if (field === 'admission_date') {
            console.log(field)
          return value.format('DD-MM-YYYY')
        }
        return super.formatDates(field, value)
      }

    departments() {
        return this.hasMany('App/Models/Department')
    }

    guardian() {
        return this.hasOne('App/Models/Guardian')
    }

    Locations() {
        return this.hasOne('App/Models/StaffLocation')
    }

    banks() {
        return this.hasMany('App/Models/StaffBank')
    }

    biodata() {
        return this.hasOne('App/Models/StaffBiodata')
    }

    contact() {
        return this.hasOne('App/Models/StaffContact')
    }

    identities() {
        return this.hasMany('App/Models/StaffContact')
    }
}

module.exports = Staff
