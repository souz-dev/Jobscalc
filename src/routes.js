const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
	name: 'Hiago',
	avatar: 'https://avatars.githubusercontent.com/u/72813560?v=4',
	"monthly-budget": 3000,
	"days-per-week": 5,
	"hours-per-day": 5,
	"vacation-per-year": 4,
  "value-hours": 75
}

const jobs = [
  {
    id: 1,
		name: 'Pizzaria Master pão',
		'daily-hours': 2,
		'total-hours': 1,
    created_at: Date.now(),
    
  },
  {
    id: 2,
		name: ' pão master pizza',
		'daily-hours': 3,
		'total-hours': 47,
    created_at: Date.now()
  }
]

function remainingDays(job){
  const  remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

  const createdDate = new Date(job.created_at)
  const dueDay = createdDate.getDate() + Number(remainingDays)
  const dueDate = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDate - Date.now()

  // transform Ms in Day

  const dayInMs = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMs / dayInMs)

  return dayDiff

  //restam x dias
}

routes.get('/', (req, res) => { 
  
  const updateJobs = jobs.map((job) => {
    
    // calc dos Jobs
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'

    return {
      ...job,
      remaining,
      status,
      budget: profile["value-hours"] * job["total-hours"]
    }
  })
  
  return res.render(views +  'index', { profile, jobs:updateJobs  })
})
routes.get('/job', (req, res) =>  res.render(views +  'job'))
routes.post('/job', (req, res) => {
//  name: 'shuaashu', 'daily-hours': '5', 'total-hours': '5' }

const lastId = jobs[jobs.length - 1]?.id || 1;

	jobs.push({
    id: lastId + 1,
		name: req.body.name,
		'daily-hours': req.body['daily-hours'],
		'total-hours': req.body['total-hours'],
    created_at: Date.now()
	})
	return res.redirect('/') 
})
routes.get('/job/edit', (req, res) =>  res.render(views +  'job-edit'))
routes.get('/profile', (req, res) =>  res.render(views +  'profile', { profile }))

module.exports = routes
