'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentGuardianSchema extends Schema {
  up () {
    this.create('student_guardians', (table) => {
      table.increments()
      table.integer("student_id").unsigned().index('student_id'),
      table.integer("guardian_id").unsigned().index("guardian_id"),
      table.foreign("student_id").references('students.id').onDelete('cascade'),
      table.foreign("guardian_id").references('guardians.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('student_guardians')
  }
}

module.exports = StudentGuardianSchema
