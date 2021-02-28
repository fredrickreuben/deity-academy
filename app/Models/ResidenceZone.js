'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ResidenceZone extends Model {

    zone() {
        return this.belongsTo('App/Models/TransportZone')
    }

    residence() {
        return this.belongsTo('App/Models/Residence')
    }
}

module.exports = ResidenceZone
