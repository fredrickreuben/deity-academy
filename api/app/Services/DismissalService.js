'use strict'

const Dismissal = use('App/Models/Dismissal')

class DismissalService {
  async dismiss(person) {
      //persit dimissal to databse
      const dismissal = new Dismissal()
      const pupil_id = (person.person === 1) ? person.person_id : null
      const staff_id = (person.person === 0) ? person.person_id : null

      dismissal.fill({
        pupil_id: pupil_id,
        staff_id: staff_id,
        person: person.person,
        status: person.status,
        date_dismissal: person.date_dismissal,
        days: person.days,
        reason: person.reason,
        attached_letter: person.attached_letter
      })

      await dismissal.save()

  }
}

module.exports = new DismissalService()