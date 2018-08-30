'use strict'

const moment = require('moment')

const PupilHook = exports = module.exports = {}

PupilHook.AdmissionNo = async (pupilInstance) => {
    const adm_date = pupilInstance.adm_date
    const adm_no = pupilInstance.id
    pupilInstance.Adm_no = 'DE/' + adm_no + '/' + moment(adm_date).format('YYYY')
}
