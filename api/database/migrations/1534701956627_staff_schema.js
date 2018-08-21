'use strict'

const Schema = use('Schema')

class StaffSchema extends Schema {
  up () {
    this.create('staff', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('f_name').notNullable()
      table.string('m_name')
      table.string('l_name')
      table.integer('national_id').notNullable()
      table.integer('staff_id').notNullable().unique()
      table.integer('role', 10)
    })
  }

  down () {
    this.drop('staff')
  }
}

module.exports = StaffSchema
