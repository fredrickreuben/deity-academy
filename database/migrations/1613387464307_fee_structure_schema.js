'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeeStructureSchema extends Schema {
  up () {
    this.create('fee_structures', (table) => {
      table.increments()
      table.integer('votehead_id').unsigned().references('id').inTable('fee_vote_heads')
      table.integer('grade_id').unsigned().references('id').inTable('grades')
      table.integer('group_id').unsigned().references('id').inTable('student_groups')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.boolean('all').defaultTo(false) //if true, this applies to all student
      table.integer('term_id').unsigned().references('id').inTable('terms')
      table.integer('year_id').unsigned().references('id').inTable('years')
      table.date('due_date')
      table.decimal('amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_structures')
  }
}

module.exports = FeeStructureSchema
