'use strict'

const Queue = use('BeeQueue')
const PYOS = use('App/Models/PYOS')
const YOS = use('App/Models/YOS')
const SOS = use('App/Models/SOS')
const Class = use('App/Models/Class')
const moment = use('moment')
const DismissalService = use('App/Services/DismissalService')

class PupilService {
  //Promote pupil
  async promote(pupil_id) {
    //Fetch new year of study.
    const yos = await YOS.findBy('current', true)

    //fetch pupil current year of study from db
    const pyos = await PYOS.query().where('pupil_id', pupil_id).where('current', true).fetch()

    //set pupil year of study
    const sos = await SOS.find(pyos.sos_id)
    const next_sos = sos.level + 1

    //verify that next stage exist
    const new_sos = await SOS.findBy('level', next_sos)

    if (new_sos == null || typeof new_sos.id === 'undefined') {
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

  //Promote Many pupils
  async promoteMany() {
    const yos = await YOS.query().where('current', true).fetch().then((res) => {
      return res.toJSON()
    })
    const pyos = await PYOS.query().where('current', true).fetch().then((res) => {
      return res.toJSON()
    })

    //Create pupils array
    let pyos_data = []
    let dismissed = []

    for (let i = 0; i < pyos.length; i++) {
        let sos = await SOS.find(pyos[i].sos_id).then((res) => {
              return res.toJSON()
            })
        let level = sos.level + 1
        let next_sos = await SOS.findBy('level', level)
      
        if (next_sos == null || typeof next_sos.id == 'undefined') {
          await DismissalService.dismiss({
              person_id : pyos[i].pupil_id,
              person: 1,
              status: 5,
              date_dismissal: moment().format('YYYY-MM-DD')
          })
          dismissed[i] = pyos[i].pupil_id

          return dismissed

        }else{
          pyos_data[i] = {
            yos_id: yos[0].id,
            pupil_id: pyos[i].pupil_id,
            sos_id: next_sos.id
          }
        }

    }

    try {

        await PYOS.query().where('current', true).update({
          current: false
        })

        await PYOS.createMany(pyos_data)

        return true

    } catch (error) {
        console.log(error)
    }
  }

  //Promote pupils in queue
  async queue(){

    //Get current stage of study
    const yos = await YOS.query().where('current', true).fetch().then((res) => {
      return res.toJSON()
    })

    //Get pupils with current year of study
    const pyos = await PYOS.query().where('current', true).fetch().then((res) => {
      return res.toJSON()
    })

    const job = Queue.get('queue_promote').createJob({
        x: 2,
        y: 3,
        z: 8
      })
    
    job.setId(100)
        .timeout(3000)
        .retries(2)
        .save()
        .then((job) => {
          console.log(job.data)
        });

    job.on('progress', (progress) => {
      console.log(`Job ${job.id} reported progress: page ${progress.page} / ${progress.totalPages}`);
    });

    job.on('retrying', (job, err) => {
      console.log(`Job ${job.id} failed with error ${err.message} but is being retried!`);
    });

    job.on('stalled', (jobId) => {
      console.log(`Job ${jobId} stalled and will be reprocessed`);
    });

    job.on('failed', (job, err) => {
      console.log(`Job ${job.id} failed with error ${err.message}`);
    });

    job.on('error', (err) => {
      console.log(`A queue error happened: ${err.message}`);
    });
      
    Queue.get('queue_promote').process(async (job) => {
      console.log(`Processing job ${job.id}`);
      let result = job.data.x + job.data.y;
      console.log(result)
      return result
    });

  }

  //Create pupil year of study
  async pyos(pupil) {
    //Prepare params
    const yos = await YOS.findBy('current', true)
    const pClass = await Class.find(pupil.class_id)

    await PYOS.create({
       yos_id: yos.id,
       pupil_id: pupil.id,
       sos_id: pClass.sos_id
    })

    return true
  }
}

module.exports = new PupilService()