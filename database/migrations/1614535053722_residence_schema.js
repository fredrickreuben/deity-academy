'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResidenceSchema extends Schema {
  up () {
    this.create('residences', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.json('latlong')
      table.timestamps()
    })
  }

  down () {
    this.drop('residences')
  }
}

module.exports = ResidenceSchema
