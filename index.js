require('./env')

const path = require('path'),
      _ = require('lodash')
const fastify = require('fastify')({ logger: true })
const handlebars = require('handlebars')
const fs = require('fs')

fastify.register(require('point-of-view'), { 
  engine: { handlebars }
})
fastify.register(require('fastify-static'), { root: path.join(__dirname, 'public') })

const { get_topics } = require('./dialogflow')
const { save_json_ld } = require('./save')

const { PORT, chatbot_name, chatbot_description } = process.env
const topics = get_topics()
const jsonld_template = handlebars.compile(fs.readFileSync('./views/json-ld.handlebars', 'utf8'))

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
    topics[topics.length - 1].last = true
    const json_ld = jsonld_template({ 
      topics,
      name: chatbot_name,
      description: chatbot_description
    })
    save_json_ld(json_ld)
    reply.send('All done')
  })


fastify.listen(PORT || 3000)
  .then(addr => console.log(`Website live at ${addr}`))

