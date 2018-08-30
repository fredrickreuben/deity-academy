'use strict'

const Schema = use('Schema')

class SosSchema extends Schema {
  up () {
    this.create('sos', (table) => {
      table.increments()
      table.timestamps()
      table.string('sos')
      table.integer('level', 10)
    })
  }

  down () {
    this.drop('sos')
  }
}

module.exports = SosSchema
