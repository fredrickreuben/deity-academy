'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeeCategorySchema extends Schema {
  up () {
    this.create('fee_categories', (table) => {
      table.increments()
      table.string('slug', 60).notNullable()
      table.string('name', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_categories')
  }
}

module.exports = FeeCategorySchema
