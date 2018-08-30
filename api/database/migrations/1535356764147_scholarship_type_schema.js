'use strict'

const Schema = use('Schema')

class ScholarshipTypeSchema extends Schema {
  up () {
    this.create('scholarship_types', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 80)
      table.decimal('value')
      table.text('description')
    })
  }

  down () {
    this.drop('scholarship_types')
  }
}

module.exports = ScholarshipTypeSchema
