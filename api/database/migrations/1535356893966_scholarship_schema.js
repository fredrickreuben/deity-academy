'use strict'

const Schema = use('Schema')

class ScholarshipSchema extends Schema {
  up () {
    this.create('scholarships', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('scholarship_type_id').unsigned().references('id').inTable('scholarship_types').onDelete('cascade')
    })
  }

  down () {
    this.drop('scholarships')
  }
}

module.exports = ScholarshipSchema
