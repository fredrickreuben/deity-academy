'use strict'

const Model = use('Model')

class TotalPayment extends Model {
    tos(){ 
        return this.belongsTo('App/Models/Tos', 'tos_id', 'id')
    }

    pupil() {
      return this.belongsTo('App/Models/Pupil')
    }
}

module.exports = TotalPayment
