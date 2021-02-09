'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TermSchema extends Schema {
  up () {
    this.create('terms', (table) => {
      table.increments()
      table.string('label', 60).unique()
      table.string('name', 60)
      table.boolean('current').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('terms')
  }
}

module.exports = TermSchema
