'use strict'

const Pupil = exports = module.exports = {}

const PupilService = use('App/Services/Pupil')

Pupil.promote = async () => {
    try {
       await PupilService.promoteMany()
    } catch (error) {
        console.log(error)
    }
}
