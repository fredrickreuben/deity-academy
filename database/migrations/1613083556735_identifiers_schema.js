'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdentifiersSchema extends Schema {
  up () {
    this.create('identifiers', (table) => {
      table.increments()
      table.string('name', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('identifiers')
  }
}

module.exports = IdentifiersSchema
