'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeeVoteheadsSchema extends Schema {
  up () {
    this.create('fee_vote_heads', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('description', 455)
      table.boolean('type').defaultTo(true) //Mandatory or Optional
      table.boolean('is_transport').defaultTo(false)
      table.integer("priority"),
      table.integer("bank_id").unsigned().index("bank_id"),
      table.foreign("bank_id").references('banks.id')
      table.integer("category_id").unsigned().index("category_id"),
      table.foreign("category_id").references('categories.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('fee_vote_heads')
  }
}

module.exports = FeeVoteheadsSchema
