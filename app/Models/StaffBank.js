'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StaffBank extends Model {
    staff() {
        return this.belongsTo('App/Models/Staff')
    }

    bank() {
        return this.belongsTo('App/Models/Bank')
    }
}

module.exports = StaffBank
