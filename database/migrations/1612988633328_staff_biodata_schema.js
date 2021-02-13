'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffBiodataSchema extends Schema {
  up () {
    this.create('staff_biodata', (table) => {
      table.increments()
      table.integer("staff_id").unsigned().references('id').inTable('staff').onDelete('cascade')
      table.string('blood_group', 255)
      table.json('diseases')
      table.json('allergies')
      table.timestamps()
    })
  }

  down () {
    this.drop('staff_biodata')
  }
}

module.exports = StaffBiodataSchema
