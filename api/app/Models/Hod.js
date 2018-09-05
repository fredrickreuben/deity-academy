'use strict'

const Model = use('Model')

class Hod extends Model {
    staff(){ 
        return this.belongsTo('App/Models/Staff', 'hod', 'id')
    }

    department (){ 
        return this.belongsTo('App/Models/Department')
    }
}

module.exports = Hod
