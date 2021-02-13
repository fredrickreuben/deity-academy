'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffContactSchema extends Schema {
  up () {
    this.create('staff_contacts', (table) => {
      table.increments()
      table.integer("staff_id").unsigned().references('id').inTable('staff').onDelete('cascade')
      table.string('phone_number', 255)
      table.string('emergency_number', 255)
      table.string('email_address', 255)
      table.string('postal_address', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('staff_contacts')
  }
}

module.exports = StaffContactSchema
