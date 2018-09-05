'use strict'

class Pupil {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
    /*const adm_no = this.addHook('afterCreate', 'PupilHook.AdmissionNo')
    
    let m = new Model()

    m.adm_no = adm_no

    m.save()*/
  }
}

module.exports = Pupil
