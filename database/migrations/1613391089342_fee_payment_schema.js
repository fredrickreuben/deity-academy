'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeePaymentSchema extends Schema {
  up () {
    this.create('fee_payments', (table) => {
      table.increments()
      table.integer("receipt_no")
      table.date("date")
      table.string("paid_by", 244)
      table.string("code", 244)
      table.text("note")
      table.decimal("total")
      table.integer('staff_id').unsigned().references('id').inTable('staff')
      table.integer('revoke_by_id').unsigned().references('id').inTable('staff')
      table.integer('term_id').unsigned().references('id').inTable('terms')
      table.integer('year_id').unsigned().references('id').inTable('years')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.integer('payment_mode_id').unsigned().references('id').inTable('fee_payment_modes')
      table.integer('bank_id').unsigned().references('id').inTable('banks')
      table.boolean('complete').defaultTo(false)
      table.boolean('revoked').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_payments')
  }
}

module.exports = FeePaymentSchema
