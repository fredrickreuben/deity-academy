'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentBiodataSchema extends Schema {
  up () {
    this.create('student_biodata', (table) => {
      table.increments()
      table.integer("student_id").unsigned().references('id').inTable('students').onDelete('cascade')
      table.string('blood_group', 255)
      table.json('diseases')
      table.json('allergies')
      table.timestamps()
    })
  }

  down () {
    this.drop('student_biodata')
  }
}

module.exports = StudentBiodataSchema
