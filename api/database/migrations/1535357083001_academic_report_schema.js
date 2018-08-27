'use strict'

const Schema = use('Schema')

class AcademicReportSchema extends Schema {
  up () {
    this.create('academic_reports', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('tos_id').unsigned().references('id').inTable('tos').onDelete('cascade')
      table.integer('yos_id').unsigned().references('id').inTable('yos').onDelete('cascade')
      table.boolean('promoted').defaultTo(true)

    })
  }

  down () {
    this.drop('academic_reports')
  }
}

module.exports = AcademicReportSchema
