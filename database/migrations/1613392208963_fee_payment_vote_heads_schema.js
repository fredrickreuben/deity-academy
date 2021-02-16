'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeePaymentVoteHeadsSchema extends Schema {
  up () {
    this.create('fee_payment_vote_heads', (table) => {
      table.increments()
      table.decimal("amount")
      table.decimal("balance")
      table.integer('fee_vote_head_id').unsigned().references('id').inTable('fee_vote_heads')
      table.integer('fee_payment_id').unsigned().references('id').inTable('fee_payments')
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_payment_vote_heads')
  }
}

module.exports = FeePaymentVoteHeadsSchema
