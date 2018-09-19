'use strict'

const Model = use('Model')

class TotalPayment extends Model { 
    static boot() {
      super.boot()

      /**
       * A hook to hash the user password before saving
       * it to the database.
       */
      //this.addHook('beforeSave', 'TotalPaymentHook.update')
    }
    
    tos(){ 
        return this.belongsTo('App/Models/Tos', 'tos_id', 'id')
    }

    pupil() {
      return this.belongsTo('App/Models/Pupil')
    }
}

module.exports = TotalPayment
