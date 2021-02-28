'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransportZonesSchema extends Schema {
  up () {
    this.create('transport_zones', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('description')
      table.decimal('amount')
      table.integer("vote_head_id").unsigned().references('id').inTable('fee_vote_heads')
      table.timestamps()
    })
  }

  down () {
    this.drop('transport_zones')
  }
}

module.exports = TransportZonesSchema
