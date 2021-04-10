const express = require('express') 
const server = express()
const routes = require('./routes')

// template engine
server.set('view engine', 'ejs')

//habilitar arquivos static
server.use(express.static('public'))

// usar o req.body
server.use(express.urlencoded({extended: true}))

// rotas
server.use(routes)

// server
server.listen(3000, () => console.log('Rodou serv'))