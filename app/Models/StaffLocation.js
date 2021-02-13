'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StaffLocation extends Model {
    staff() {
        return this.belongsTo('App/Models/Staff')
    }
}

module.exports = StaffLocation
