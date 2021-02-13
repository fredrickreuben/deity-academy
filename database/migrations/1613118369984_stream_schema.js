'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StreamSchema extends Schema {
  up () {
    this.create('streams', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('label', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('streams')
  }
}

module.exports = StreamSchema
