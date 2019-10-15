'use strict'

const fs = require('fs'),
      _ = require('lodash')

const { agent_client_uri } = process.env
const folder = './data'

try {
  const latest_file_name = _.max(fs.readdirSync(folder))
  const intents = JSON.parse(fs.readFileSync(folder + '/' + latest_file_name))
} catch (e) {
  throw new Error('No intents file found. Run *npm run download-intents*')
}

const get_topics = () => {
  const tp_text = tp => tp && tp.parts ? tp.parts.map(t => t.text).reduce((a, b) => a + b, '') : null

  const last = array => [...array].pop()

  const message_text = intent => {
    const default_text_response = _.find(intent.messages, { platform: 'PLATFORM_UNSPECIFIED' })
    return default_text_response && default_text_response.text ?
      default_text_response.text.text :
      new Error('error')
  }

  const linkify = title => title.replace(/ /g, '-').replace('?', '')
  const df_link = name => agent_client_uri + 'editIntent' + name.replace(/projects.*intents/, '') + '/'

  const sorted_intents = intents.filter(i => 
    !i.displayName.match(/^\[CA|Meta|App|Small talk\]|Default Fallback Intent/i)
    && i.trainingPhrases.length > 0
    && i.messages.length > 0)

  return sorted_intents.map(i => {
    const question = tp_text(last(i.trainingPhrases))

    return {
      name: i.name,
      question: question,
      link: linkify(question),
      answer: message_text(i),
      df_link: df_link(i.name)
    }
  })
}


module.exports = {
  get_topics
}