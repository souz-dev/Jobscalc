const express = require('express') 
const server = express()
const routes = require('./routes')
const path = require('path')
// template engine
server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos static
server.use(express.static('public'))

// usar o req.body
server.use(express.urlencoded({extended: true}))

// rotas
server.use(routes)

// server
server.listen(3000, () => console.log('Rodou serv'))