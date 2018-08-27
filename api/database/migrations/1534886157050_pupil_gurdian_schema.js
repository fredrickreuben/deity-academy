'use strict'

const Schema = use('Schema')

class PupilGurdianSchema extends Schema {
  up () {
    this.create('pupil_gurdian', (table) => {
      table.increments()
      table.integer('pupil_id').unsigned().index('pupil_id').references('id').inTable('pupils').onDelete('cascade')
      table.integer('gurdian_id').unsigned().index('gurdian_id').references('id').inTable('gurdians').onDelete('cascade')
    })
  }

  down () {
    this.drop('pupil_gurdian')
  }
}

module.exports = PupilGurdianSchema
