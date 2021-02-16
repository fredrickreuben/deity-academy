'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentGroupsSchema extends Schema {
  up () {
    this.create('student_groups', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('description', 455)
      table.timestamps()
    })
  }

  down () {
    this.drop('student_groups')
  }
}

module.exports = StudentGroupsSchema
