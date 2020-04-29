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

routes.get('/city3d', (req, res) => {
   const filePath = path.join(__dirname, 'pages/city3d', 'index.html')

   fs.readFile(
      filePath,
      (err, content) => {
         if(err) throw err
         res.end(content)
      }
   )
})

module.exports = routes