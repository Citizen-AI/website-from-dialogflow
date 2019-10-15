require('./env')
const express = require('express'),
      exphbs = require('express-handlebars'),
      path = require('path'),
      _ = require('lodash')

const { get_topics } = require('./dialogflow')


const { port } = process.env || 3000
const app = express()
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


const listener = app.listen(port || 3000, () => console.log(`Website live at http://localhost:${listener.address().port}!`))