'use strict'

const Schema = use('Schema')

class DismissalSchema extends Schema {
  up () {
    this.create('dismissals', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('cascade')
      table.boolean('person').defaultTo(true)
      table.integer('status', 10)
      table.date('date_dismissal')
      table.integer('days', 10)
      table.text('reason') 
      table.boolean('attached_letter').defaultTo(false)
    })
  }
  
  down () {
    this.drop('dismissals')
  }
}

module.exports = DismissalSchema
