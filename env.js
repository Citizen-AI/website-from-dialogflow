'use strict'

require('dotenv').config()
const envalid = require('envalid')
const { url, json } = envalid
envalid.cleanEnv(process.env, {
  google_creds: json({ desc: 'The contents of a Google Cloud json keyfile for a Dialogflow agent, with line breaks removed' }),
  agent_client_uri: url({ desc: "The Dialogflow agent's link in the Dialogflow UI, e.g. https://dialogflow.cloud.google.com/#/agent/[your-agent-id]/"})
})