'use strict'

const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => { 
      table.increments()
      table.timestamps()
      table.integer('sos_id').unsigned().references('id').inTable('sos').onDelete('cascade')
      table.integer('teacher_id').unsigned().references('id').inTable('staff').onDelete('cascade')
      table.integer('stream_id').unsigned().references('id').inTable('streams').onDelete('cascade')
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassSchema
