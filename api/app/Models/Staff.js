'use strict'

const RandomString = require('random-string')
const Model = use('Model')

class Staff extends Model {
    static boot() {
      super.boot()
      /**
       * A hook to hash the user password before saving
       * it to the database.
       */
      this.addHook('beforeCreate', async (staffInstance) => {
        const ID = RandomString({
          length: 6
        })
        staffInstance.staff_id = ID.toUpperCase()
      })
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    department() {
      return this.belongsTo('App/Models/Department')
    }

    gurdian() { 
      return this.belongsTo('App/Models/Gurdian')
    }

    class() {
      return this.hasOne('App/Models/Class', 'id', 'teacher_id')
    }

    dismissals() {
      return this.hasMany('App/Models/Dismissal')
    }
}

module.exports = Staff
