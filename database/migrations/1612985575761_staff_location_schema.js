'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffLocationSchema extends Schema {
  
  up () {
    this.create('staff_locations', (table) => {
      table.increments()
      table.integer("staff_id").unsigned().references('id').inTable('staff').onDelete('cascade')
      table.string('home_county', 255).notNullable()
      table.string('home_city', 255).notNullable()
      table.string('home_address', 255).notNullable()
      table.string('residence_address', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('staff_locations')
  }
}

module.exports = StaffLocationSchema
