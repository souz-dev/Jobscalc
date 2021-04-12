const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"




const Profile = {
  data:{
    name: 'Hiago',
    avatar: 'https://avatars.githubusercontent.com/u/72813560?v=4',
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hours": 75
  },
  controllers: {
    index(req, res){
      return res.render(views +  'profile', { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body

      const weeksPeryear = 52

      const weeksPerMonth = (weeksPeryear - data["vacation-per-year"]) / 12

      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hours": valueHour
      }
      return res.redirect('/profile')
    }
  }
}




const Job = {
data: [
  
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
  
],

  controllers: {
    index(req, res){
        const updateJobs = Job.data.map((job) => {
          // calc dos Jobs
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
      
          return {
            ...job,
            remaining,
            status,
            budget: Profile.data["value-hours"] * job["total-hours"]
          }
        })
        
        return res.render(views +  'index', { Profile, jobs:updateJobs  })
    },
    create(req, res){
      return res.render(views +  'job')
    },
    save(req, res){
      const lastId = Job.data[Job.data.length - 1]?.id || 1;
    Job.data.push({
    id: lastId + 1,
		name: req.body.name,
		'daily-hours': req.body['daily-hours'],
		'total-hours': req.body['total-hours'],
    created_at: Date.now()
	})
	return res.redirect('/')
    },
  },

  services: {
    remainingDays(job){
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
  }
}





routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)


routes.get('/job/edit', (req, res) =>  res.render(views +  'job-edit'))
routes.get('/profile',Profile.controllers.index)
routes.post('/profile',Profile.controllers.update)


module.exports = routes
