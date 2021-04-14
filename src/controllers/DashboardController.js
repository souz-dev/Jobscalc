const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {

    const jobs = Job.get()
    const profile = Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length

    }

    // total de horas por dia de cada job em progresso
    let jobTotalHours = 0

    const updateJobs = jobs.map((job) => {
      // calc dos Jobs
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
      
      statusCount[status] += 1
      
      
      jobTotalHours = status == 'progress' ? jobTotalHours + 
      Number(job['daily-hours']) 
      : jobTotalHours

      
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hours"])
      }
    })

    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render('index', {jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
  }

}
