'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StaffBiodata extends Model {
    staff() {
        return this.belongsTo('App/Models/Staff')
    }
}

module.exports = StaffBiodata
