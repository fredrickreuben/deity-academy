'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.integer('adm_no', 10) 
      table.string('f_name', 80)
      table.string('m_name', 80)
      table.string('l_name', 80)
      table.boolean('gender').defaultTo(true)
      table.integer('grade_id').unsigned().references('id').inTable('grades')
      table.integer('stream_id').unsigned().references('id').inTable('streams')
      table.string('upi_no', 80)
      table.string('birth_cert_no', 80)
      table.date('date_of_birth')
      table.date('admission_date')
      table.string('religion', 80)
      table.boolean('boarder').defaultTo(false)
      table.boolean('dismissed').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
