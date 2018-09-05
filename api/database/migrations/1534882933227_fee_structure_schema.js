'use strict'

const Schema = use('Schema')

class FeeStructureSchema extends Schema { 
  up () {
    this.create('fee_structures', (table) => {
      table.increments()
      table.timestamps()
      table.integer('tos_id').unsigned().references('id').inTable('tos').onDelete('cascade')
      table.integer('sos_id').unsigned().references('id').inTable('sos').onDelete('cascade')
      table.decimal('amount')
      table.integer('rate', 10)
      table.string('vote_head', 80)
      table.text('description')
      table.date('duedate')
    })
  }

  down () {
    this.drop('fee_structures')
  }
}

module.exports = FeeStructureSchema
