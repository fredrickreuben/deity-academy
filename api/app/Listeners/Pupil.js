'use strict'

const Pupil = exports = module.exports = {}

const PupilService = ('App/Services/PupilService')
const PYOS = use('App/Models/PYOS')

Pupil.promote = async () => {
    const pyos = await PYOS.all()
    for (let i = 0; index < pyos.length; i++) {
        try {
           await PupilService.promote(pyos[i].pupil_id, pyos[i].sos, PYOS)
        } catch (error) {
            console.log(error)
        }
    }
}
