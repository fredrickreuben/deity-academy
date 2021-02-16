'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FeeStructure extends Model {

    votehead(){
        return this.belongsTo('App/Model/FeeVoteHead')
    }

    student(){
        return this.belongsTo('App/Model/Student')
    }

    grade(){
        return this.belongsTo('App/Model/Grade')
    }

    group(){
        return this.belongsTo('App/Model/StudentGroup')
    }

    term(){
        return this.belongsTo('App/Model/Term')
    }

    year(){
        return this.belongsTo('App/Model/Year')
    }
}

module.exports = FeeStructure
