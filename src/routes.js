const express = require('express')
const path = require('path')
const fs = require('fs')

const routes = new express.Router()

routes.use('/public', express.static(__dirname + '/public'))

routes.get('/', (req, res) => {
   const filePath = path.join(__dirname, 'pages', 'index.html')

   fs.readFile(
      filePath,
      (err, content) => {
         if(err) throw err
         res.end(content)
      }
   )
})

routes.get('/loja', (req, res) => {

   const filePath = path.join(__dirname, 'pages/loja', 'index.html')

   fs.readFile(
      filePath,
      (err, content) => {
         if(err) throw err
         res.end(content)
      }
   )
})

routes.get('/a', (req, res) => {
   const filePath = path.join(__dirname, 'pages/loja', 'index.html')
   console.log(filePath)

   res.redirect('/')
   // res.render(filePath, function (err, html) {
   //    res.send(html)
   //  })
   // for other URLs, try responding with the page
   
   
   // read requested file
   //res.end(req.url)
})

module.exports = routes