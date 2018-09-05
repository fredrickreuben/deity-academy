'use strict'

const Schema = use('Schema')

class PupilOtherPaymentsSchema extends Schema {
  up () {
    this.create('pupil_other_payments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('other_payment_id').unsigned().references('id').inTable('other_payments').onDelete('cascade')
      table.boolean('paid').defaultTo(false)
    })
  }

  down () {
    this.drop('pupil_other_payments')
  }
}

module.exports = PupilOtherPaymentsSchema
