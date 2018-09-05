'use strict'

const Model = use('Model')

class SOS extends Model {
    class() {
      return this.hasMany('App/Models/Class', 'id', 'sos_id')
    }

    pyos() {
      return this.hasMany('App/Models/PYOS', 'id', 'sos_id')
    }

    feestructures() {
      return this.hasMany('App/Models/FeeStucture', 'id', 'sos_id')
    }
}

module.exports = SOS
