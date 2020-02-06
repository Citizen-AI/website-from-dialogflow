require('./env')

const path = require('path'),
      _ = require('lodash')
const fastify = require('fastify')({ logger: true })
const handlebars = require('handlebars')


fastify.register(require('point-of-view'), { engine: { handlebars } })
fastify.register(require('fastify-static'), { root: path.join(__dirname, 'public') })

const { get_topics } = require('./dialogflow')
const make_json_ld = require('./make_json_ld')

const { PORT } = process.env
const topics = get_topics()

fastify
  .get('/', (req, reply) => {
    reply.view('/views/home.handlebars', { topics })
  })
  .get('/:topic', (req, reply) => {
    reply.view('/views/topic.handlebars', { 
      topic: _.find(topics, { link: req.params.topic } ) 
    })
  })
  .get('/json', (req, reply) => {
    make_json_ld()
    reply.send('All done')
  })


fastify.listen(PORT || 3000)
  .then(addr => console.log(`Website live at ${addr}`))

