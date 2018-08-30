'use strict'

const Schema = use('Schema')

class GurdianPupilSchema extends Schema {
  up () {
    this.create('gurdian_pupil', (table) => {
      table.increments()
      table.integer('gurdian_id').unsigned().index('gurdian_id')
      table.integer('pupil_id').unsigned().index('pupil_id')
      table.foreign('gurdian_id').references('id').inTable('gurdians').onDelete('cascade')
      table.foreign('pupil_id').references('id').inTable('pupils').onDelete('cascade')
    })
  }

  down () {
    this.drop('gurdian_pupil')
  }
}

module.exports = GurdianPupilSchema
