'use strict'

const Schema = use('Schema')

class DismissalSchema extends Schema {
  up () {
    this.create('dismissals', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('cascade')
      table.boolean('pupil').defaultTo(true)
      table.date('date_dismissal')
      table.text('reason')
    })
  }
  
  down () {
    this.drop('dismissals')
  }
}

module.exports = DismissalSchema
