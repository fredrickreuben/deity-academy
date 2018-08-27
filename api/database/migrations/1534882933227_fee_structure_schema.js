'use strict'

const Schema = use('Schema')

class FeeStructureSchema extends Schema {
  up () {
    this.create('fee_structures', (table) => {
      table.increments()
      table.timestamps()
      table.integer('term_id').unsigned().references('id').inTable('terms').onDelete('cascade')
      table.integer('stage_id').unsigned().references('id').inTable('stages').onDelete('cascade')
      table.integer('amount')
      table.string('item', 80)
      table.text('description')
      table.date('duedate')
    })
  }

  down () {
    this.drop('fee_structures')
  }
}

module.exports = FeeStructureSchema
