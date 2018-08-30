'use strict'

const Model = use('Model')

class PYOS extends Model { 
    yos(){ 
        return this.belongsTo('App/Models/YOS', 'yos_id', 'id')
    }

    pupils(){ 
        return this.belongsTo('App/Models/Pupil')
    }

    sos(){ 
        return this.belongsTo('App/Models/SOS', 'sos_id', 'id')
    }
}

module.exports = PYOS
