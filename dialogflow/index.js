'use strict'

const { 
  latest_intents,
  message_text
} = require('./library')


const { agent_client_uri } = process.env

const intents = latest_intents()


const get_topics = () => {
  const tp_text = tp => tp && tp.parts ? tp.parts.map(t => t.text).reduce((a, b) => a + b, '') : null

  const last = array => [...array].pop()

  const linkify = title => title.replace(/ /g, '-').replace('?', '').toLowerCase()
  const df_link = name => agent_client_uri + 'editIntent' + name.replace(/projects.*intents/, '') + '/'

  const sorted_intents = intents.filter(i => 
    !i.displayName.match(/^\[CA|Meta|App|Small talk\]|Default Fallback Intent/i)
    && i.trainingPhrases.length > 0
    && i.messages.length > 0)

  return sorted_intents.map(i => {
    const question = tp_text(last(i.trainingPhrases))
    const answer = message_text(i).map(a => a.replace(/\n/g, '\\n'))
 
    return {
      name: i.name,
      question: question,
      link: linkify(question),
      answer: answer,
      df_link: df_link(i.name)
    }
  })
}


module.exports = {
  get_topics
}