require('dotenv').config()
const dialogflow = require('dialogflow'),
      fs = require('fs')


const { google_creds, agent_client_uri } = process.env,
      credentials = JSON.parse(google_creds),
      { project_id } = credentials,
      config = { credentials: credentials },
      intentsClient = new dialogflow.IntentsClient(config),
      projectAgentPath = intentsClient.projectAgentPath(project_id)


const download_intents = async () => {
  console.log(`Getting intents from Dialogflow project ${project_id}`)
  const [response] = await intentsClient.listIntents({ 
    parent: projectAgentPath,
    intentView: 'INTENT_VIEW_FULL'
  })
  const now = new Date().toISOString(),
        path = `data/intents-${project_id}-${now}.json`
  console.log('Writing to file:', path)
  fs.writeFileSync(path, JSON.stringify(response))
}
