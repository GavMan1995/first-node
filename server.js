const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()
const port = process.env.PORT || 8080

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('serer.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res) => {
//   res.render('maint.hbs')
// })


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Home Page',
    message: 'Hey there how are you doing?',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page',
  })
})

app.get('/bad', (req, res) => {
  res.send(
    {
      message: 'ERROR ERROR BAD REQUEST'
    }
  )
})

app.listen(port, () => {
  console.log(`server is up on ${port}`)
})
