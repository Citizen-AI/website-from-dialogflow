'use strict'

require('../env')
const dialogflow = require('dialogflow'),
      fs = require('fs'),
      Bottleneck = require('bottleneck')

const { 
  latest_intents,
  message_text
} = require('./library')


const { google_creds } = process.env,
      credentials = JSON.parse(google_creds),
      project_id = credentials.project_id,
      config = { credentials: credentials },
      sessionClient = new dialogflow.SessionsClient(config),
      sessionPath = sessionClient.sessionPath(project_id, 'dialogflow-annotator'),
      limiter = new Bottleneck({ minTime: 500 }),
      folder = './data'
      
if(!fs.existsSync(folder)) fs.mkdirSync(folder)


const dialogflow_query = async query => {
  const response = await sessionClient.detectIntent({ 
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'en-US'
      }
    }
  })
  return response[0]
}


const dialogflow_query_get_intent = async (query, from_intent_name) => {
  const response = await dialogflow_query(query)
  return {
    from: from_intent_name,
    to: response.queryResult.intent.name,
    confidence: response.queryResult.intentDetectionConfidence
  }
}


// add sources and QRs
const decorate_intents_with_FU_outputs = (intents) => {
  const matches = (str, regex) => str ? [...str.matchAll(regex)].map(m => m[1]) : null

  return intents.map(i => {
    const first_message = message_text(i)[0]
    return {
      name: i.name,
      displayName: i.displayName,
      first_message: first_message,
      follow_up_outputs: matches(first_message, /\[FU:.*?: ?(.*?)\]/gm)
    }
  })
}


const get_links_from_dialogflow = async decorated_intents => {
  const intents_with_fus = decorated_intents.filter(i => i.follow_up_outputs && i.follow_up_outputs.length)

  const all_tasks = intents_with_fus.flatMap(i => 
    i.follow_up_outputs.map(o => 
      limiter.schedule(() => dialogflow_query_get_intent(o, i.name))
    )
  )

  return Promise.all(all_tasks)
}


const intents_to_links = async intents => {
  const decorated_intents = decorate_intents_with_FU_outputs(intents)
  const links = await get_links_from_dialogflow(decorated_intents)

  console.log('Writing links to file')
  const now = new Date().toISOString()
  fs.writeFileSync(`data/links-${project_id}-${now}`, JSON.stringify(links, null, 2))
}

console.log('Getting follow-up links from Dialogflow (may take a few minutes)')
intents_to_links(latest_intents())