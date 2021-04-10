const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
	name: 'Hiago',
	avatar: 'https://avatars.githubusercontent.com/u/72813560?v=4',
	"monthly-budget": 3000,
	"days-per-week": 5,
	"hours-per-day": 5,
	"vacation-per-year": 4
}

const jobs = []

routes.get('/', (req, res) =>  res.render(views +  'index', { profile }))
routes.get('/job', (req, res) =>  res.render(views +  'job'))
routes.post('/job', (req, res) => {
//  name: 'shuaashu', 'daily-hours': '5', 'total-hours': '5' }

const job = req.body


	jobs.push()
	return res.redirect('/') 
})
routes.get('/job/edit', (req, res) =>  res.render(views +  'job-edit'))
routes.get('/profile', (req, res) =>  res.render(views +  'profile', { profile }))

module.exports = routes
