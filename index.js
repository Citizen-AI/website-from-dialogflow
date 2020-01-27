require('./env')

const path = require('path'),
      _ = require('lodash')
const fastify = require('fastify')({ logger: true })

fastify.register(require('point-of-view'), { 
  engine: { handlebars: require('handlebars') },
  // layout: './views/layouts/main.handlebars'
})
fastify.register(require('fastify-static'), { root: path.join(__dirname, 'public') })

const { get_topics } = require('./dialogflow')

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
    reply.view('/views/json-ld.handlebars', { topics })
  })


fastify.listen(PORT || 3000)
  .then(addr => console.log(`Website live at ${addr}`))

