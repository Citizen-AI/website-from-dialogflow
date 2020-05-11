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
  const make_df_link = name => agent_client_uri + 'editIntent' + name.replace(/projects.*intents/, '') + '/'

  const sorted_intents = intents.filter(i => 
    !i.displayName.match(/^\[CA|Meta|App|Small talk\]|Default Fallback Intent/i)
    && i.trainingPhrases.length > 0
    && i.messages.length > 0)

  const sorted_intents_with_q_and_a = sorted_intents.map(i => {
    const question = tp_text(last(i.trainingPhrases))
    const link = linkify(question)
    const { name, displayName } = i
    const intent_key = i.name.match(/.*\/(.*)$/)[1]
    const df_link = make_df_link(name)
    let answer = null
    try {
      answer = message_text(i).map(a => a.replace(/\n/g, '\\n'))  
    } catch (error) {
      console.error(`Can't find answer in '${question}' / ${df_link}`)
    }

    return {
      name,
      displayName,
      intent_key,
      question,
      link,
      answer,
      df_link
    }
  })

  const intents_with_answers = sorted_intents_with_q_and_a.filter(i => i.answer && i.answer.length > 0)
  return intents_with_answers
}


module.exports = {
  get_topics
}