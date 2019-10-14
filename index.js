require('dotenv').config()
const express = require('express'),
      exphbs = require('express-handlebars'),
      path = require('path'),
      _ = require('lodash')

const { get_topics } = require('./dialogflow')


const app = express()
const port = 3000
app.set('views', __dirname + '/views')
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

const topics = get_topics()


app.get('/', (_, res) => res.render('home', { 
  topics: topics
}))

app.get('/:topic', (req, res) => res.render('topic', { 
  topic: _.find(topics, { link: req.params.topic } )
}))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))