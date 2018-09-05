'use strict'

const Model = use('Model')

class Scholarship extends Model {
    scholarshipType() {
      return this.belongsTo('App/Models/ScholarshipType')
    }

    pupil() {
      return this.belongsTo('App/Models/Pupil')
    }
}

module.exports = Scholarship
