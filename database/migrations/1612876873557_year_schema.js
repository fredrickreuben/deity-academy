'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class YearSchema extends Schema {
  up () {
    this.create('years', (table) => {
      table.increments()
      table.string('year').unique()
      table.boolean('current').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('years')
  }
}

module.exports = YearSchema
