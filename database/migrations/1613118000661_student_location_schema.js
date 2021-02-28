'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentLocationSchema extends Schema {
  up () {
    this.create('student_locations', (table) => {
      table.increments()
      table.integer("student_id").unsigned().references('id').inTable('students').onDelete('cascade')
      table.string('home_county', 255).notNullable()
      table.string('home_city', 255).notNullable()
      table.string('home_address', 255).notNullable()
      table.integer("residence_id").unsigned().references('id').inTable('')
      table.timestamps()
    })
  }

  down () {
    this.drop('student_locations')
  }
}

module.exports = StudentLocationSchema
