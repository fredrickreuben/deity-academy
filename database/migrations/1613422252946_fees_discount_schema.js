'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

//#TODO Finish student fee discount

class FeesDiscountSchema extends Schema {
  up () {
    this.create('fees_discounts', (table) => {
      table.increments()
      table.string("name")
      table.text("description")
      table.decimal("amount")
      table.integer('votehead_id').unsigned().references('id').inTable('fee_vote_heads')
      table.integer('grade_id').unsigned().references('id').inTable('grades')
      table.integer('group_id').unsigned().references('id').inTable('student_groups')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.boolean('all').defaultTo(false) //if true, this applies to all student
      table.integer('term_id').unsigned().references('id').inTable('terms')
      table.integer('year_id').unsigned().references('id').inTable('years')
      table.timestamps()
    })
  }

  down () {
    this.drop('fees_discounts')
  }
}

module.exports = FeesDiscountSchema
