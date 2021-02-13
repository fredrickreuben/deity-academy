'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffIdentifiersSchema extends Schema {
  up () {
    this.create('staff_identifiers', (table) => {
      table.increments()
      table.integer("staff_id").unsigned().references('id').inTable('staff').onDelete('cascade')
      table.integer("identifier_id").unsigned().references('id').inTable('identifiers').onDelete('cascade')
      table.string('identifier_no', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('staff_identifiers')
  }
}

module.exports = StaffIdentifiersSchema
