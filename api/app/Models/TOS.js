'use strict'

const Model = use('Model')

class TOS extends Model {
    yos(){
        return this.belongsTo('App/Models/YOS', 'yos_id', 'id')
    }
}

module.exports = TOS
