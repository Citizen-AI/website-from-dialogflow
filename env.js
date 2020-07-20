'use strict'

require('dotenv').config()
const envalid = require('envalid')
const { url, json } = envalid
envalid.cleanEnv(process.env, {
  google_creds: json({ desc: 'The contents of a Google Cloud json keyfile for a Dialogflow agent, with line breaks removed' })
})