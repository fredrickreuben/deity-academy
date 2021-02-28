'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResidenceZoneSchema extends Schema {
  up () {
    this.create('residence_zones', (table) => {
      table.increments()
      table.integer("residence_id").unsigned().references('id').inTable('residences').onDelete('cascade')
      table.integer("transport_zone_id").unsigned().references('id').inTable('transport_zones').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('residence_zones')
  }
}

module.exports = ResidenceZoneSchema
