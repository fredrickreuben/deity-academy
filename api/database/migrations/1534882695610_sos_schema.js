'use strict'

const Schema = use('Schema')

class SosSchema extends Schema {
  up () {
    this.create('sos', (table) => {
      table.increments()
      table.timestamps()
      table.string('sos')
    })
  }

  down () {
    this.drop('sos')
  }
}

module.exports = SosSchema
