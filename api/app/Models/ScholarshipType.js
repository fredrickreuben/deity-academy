'use strict'

const Model = use('Model')

class ScholarshipType extends Model {
    scholarships() {
      return this.hasMany('App/Models/Scholarship')
    }
} 

module.exports = ScholarshipType
