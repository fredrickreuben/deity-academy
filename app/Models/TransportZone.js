'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransportZone extends Model {

    residences() {
        return this.hasMany('App/Models/ResidenceZone')
    }

    votehead(){
        return this.belongsTo('App/Model/FeeVoteHead')
    }
}

module.exports = TransportZone
