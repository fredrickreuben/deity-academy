'use strict'

const Schema = use('Schema')

class StreamSchema extends Schema {
  up () {
    this.create('streams', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 80)
    })
  }

  down () {
    this.drop('streams')
  }
}

module.exports = StreamSchema
