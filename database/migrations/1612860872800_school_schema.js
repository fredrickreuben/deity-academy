'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchoolSchema extends Schema {
  up () {
    this.create('schools', (table) => {
      table.increments()
      table.string('name', 60)
      table.string('photo', 245)
      table.string('phone', 50)
      table.string('email', 50)
      table.string('address', 50)
      table.string('location', 50)
      table.json('latlong')
      table.timestamps()
    })
  }

  down () {
    this.drop('schools')
  }
}

module.exports = SchoolSchema
