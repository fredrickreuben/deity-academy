'use strict'

class PYOSService{
    async reset(PYOS, pupil_id) {
        await PYOS.query()
            .where('current', true )
            .where('pupil_id', pupil_id)
            .update({current: false})

         return true
    }

}

module.exports = new PYOSService()