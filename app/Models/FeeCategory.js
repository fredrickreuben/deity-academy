'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FeeCategory extends Model {

  static boot() {
    super.boot()
    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'name'
      },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }

  voteheads() {
    return this.hasMany('Apps/Model/FeeVoteHead')
  }
}

module.exports = FeeCategory
