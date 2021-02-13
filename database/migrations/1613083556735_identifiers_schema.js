'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdentifiersSchema extends Schema {
  up () {
    this.create('identifiers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('identifiers')
  }
}

module.exports = IdentifiersSchema
