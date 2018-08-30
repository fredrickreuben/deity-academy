'use strict'

const Model = use('Model')

class YOS extends Model {
    tos() {
      return this.hasMany('App/Models/TOS', 'id', 'yos_id')
    }

    pyos() {
      return this.hasMany('App/Models/PYOS', 'id', 'yos_id')
    }
}

module.exports = YOS
