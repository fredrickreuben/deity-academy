'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Module extends Model {
  static boot() {
    super.boot()
    this.addTrait('Slugify', {
      fields: {
        slug: 'name'
      },
      strategy: 'dbIncrement',
      disableUpdates: true
    })
  }
  modules() {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Module
