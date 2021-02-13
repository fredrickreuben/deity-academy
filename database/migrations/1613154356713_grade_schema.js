'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GradeSchema extends Schema {
  up () {
    this.create('grades', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('label', 100)
      table.integer('level', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('grades')
  }
}

module.exports = GradeSchema
