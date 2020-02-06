require('./env')
const fs = require('fs')
const handlebars = require('handlebars')

const { get_topics } = require('./dialogflow')


const { chatbot_name, chatbot_description } = process.env
const folder = './data'
const jsonld_template = handlebars.compile(fs.readFileSync('./views/json-ld.handlebars', 'utf8'))
const topics = get_topics()

make_json_ld = () => {
  topics[topics.length - 1].last = true
  const json_ld = jsonld_template({ 
    topics,
    name: chatbot_name,
    description: chatbot_description
  })
  const path = `${folder}/json_ld.js`
  fs.writeFileSync(path, json_ld)
  console.log(`Wrote to ${path}`)
}

if(!module.parent) {
  make_json_ld()
}

