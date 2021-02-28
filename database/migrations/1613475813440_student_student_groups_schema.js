'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentStudentGroupsSchema extends Schema {
  up () {
    this.create('student_student_groups', (table) => {
      table.increments()
      table.integer("student_id").unsigned().references('id').inTable('students').onDelete('cascade')
      table.integer("student_group_id").unsigned().references('id').inTable('student_groups').onDelete('cascade')
    })
  }

  down () {
    this.drop('student_student_groups')
  }
}

module.exports = StudentStudentGroupsSchema
