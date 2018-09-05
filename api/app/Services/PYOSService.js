'use strict'

class PYOSService{
    async current(PYOS, pupil_id) {
        const pyos = await PYOS.query()
        .where('current', true )
        .where('pupil_id', pupil_id)
        .fetch()

        for (let i = 0; i < pyos.length; i++) {
            pyos[i].current = false
            await pyos[i].save()
        }
    }

}

module.exports = new PYOSService()