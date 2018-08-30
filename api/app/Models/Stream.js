'use strict'

const Model = use('Model')

class Stream extends Model {
    classes() {
      return this.hasMany('App/Models/Class')
    }
}

module.exports = Stream
