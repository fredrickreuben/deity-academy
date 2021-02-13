'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffSchema extends Schema {
  up () {
    this.create('staff', (table) => {
      table.increments()
      table.string('staff_id', 255).notNullable()
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('middle_name', 255)
      table.boolean('gender').notNullable()
      table.boolean('teaching').defaultTo(false)
      table.date('admission_date', 250).notNullable()
      table.string('nationality', 250).notNullable()
      table.boolean('dismissed').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('staff')
  }
}

module.exports = StaffSchema
