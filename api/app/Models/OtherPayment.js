'use strict'

const Model = use('Model')

class OtherPayment extends Model {
    tos(){ 
        return this.belongsTo('App/Models/TOS', 'tos_id', 'id')
    }
    
    pupilOtherPayments() {
        return this.hasMany('App/Models/PupilOtherPayment')
    }
}

module.exports = OtherPayment
