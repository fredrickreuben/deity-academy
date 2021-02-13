'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaffBankSchema extends Schema {
  up () {
    this.create('staff_banks', (table) => {
      table.increments()
      table.integer("staff_id").unsigned().references('id').inTable('staff').onDelete('cascade')
      table.integer("bank_id").unsigned().references('id').inTable('banks').onDelete('cascade')
      table.string('acct_no', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('staff_banks')
  }
}

module.exports = StaffBankSchema
