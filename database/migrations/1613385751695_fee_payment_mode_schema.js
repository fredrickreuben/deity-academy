'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeesPaymentModeSchema extends Schema {
  up () {
    this.create('fee_payment_modes', (table) => {
      table.increments()
      table.string('slug', 60).notNullable()
      table.string('name', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_payment_modes')
  }
}

module.exports = FeesPaymentModeSchema
