'use strict'

require('../env')
const dialogflow = require('dialogflow'),
      fs = require('fs')


const { google_creds, agent_client_uri } = process.env,
      credentials = JSON.parse(google_creds),
      { project_id } = credentials,
      config = { credentials: credentials },
      intentsClient = new dialogflow.IntentsClient(config),
      projectAgentPath = intentsClient.projectAgentPath(project_id),
      folder = './data'

      
if(!fs.existsSync(folder)) fs.mkdirSync(folder)

console.log(`Getting intents from Dialogflow project ${project_id}`)
intentsClient.listIntents({ 
  parent: projectAgentPath,
  intentView: 'INTENT_VIEW_FULL'
}).then(([response]) => {
  const now = new Date().toISOString(),
  path = `${folder}/intents-${project_id}-${now}.json`
  console.log('Writing to file:', path)
  fs.writeFileSync(path, JSON.stringify(response, null, 2))
})
