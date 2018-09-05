'use strict'

const PYOS = use('App/Models/PYOS')
const YOS = use('App/Models/YOS')
const SOS = use('App/Models/SOS')
const moment = use('moment')
const DismissalService = use('App/Services/DismissalService')

class PupilService {
  async promote(pupil_id) {
    //Fetch new year of study.
    const yos = await YOS.findBy('current', true)
    //fetch pupil current year of study from db
    const pyos = await PYOS.query().where('pupil_id', pupil_id).where('current', true).fetch()

    //set pupil year of study
    const sos = await SOS.find(pyos.sos_id)
    const next_sos = psos.level + 1

    //verify that next stage exist
    const new_sos = await SOS.findBy('level', next_sos)

    if (typeof new_sos.id === 'undefined') {
       await DismissalService.dismiss({
          pupil_id: pupil_id,
          person: 1,
          status: 5,
          date_dismissal: moment().format('YYYY-MM-DD')
       })
       await pyos.merge({
         current: false
       })
       return false
    }

    await PYOS.create({
      pupil_id,
      sos_id: new_sos.id,
      yos_id: yos.id,
    })

    return true
  }
}

module.exports = new PupilService()