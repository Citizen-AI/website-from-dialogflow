'use strict'

const _ = require('lodash'),
      fs = require('fs')


const folder = './data'
const { google_creds } = process.env
const credentials = JSON.parse(google_creds)
const { project_id } = credentials


module.exports = {
  latest_intents: () => {
    try {
      const latest_file_name = _.max(fs.readdirSync(folder).filter(filename => filename.match(`intents-${project_id}`)))
      console.log(`Using intents file ${latest_file_name}`)
      return JSON.parse(fs.readFileSync(folder + '/' + latest_file_name))
    } catch (e) {
      console.log(e)
      throw new Error('No intents file found. Run *npm run download-intents*')
    }  
  },


  message_text: intent => {
    const default_text_response =
      _.find(intent.messages, { platform: 'PLATFORM_UNSPECIFIED' }) ||
      _.find(intent.messages, { platform: 'FACEBOOK' })
    return default_text_response && default_text_response.text ?
      default_text_response.text.text :
      new Error(intent.messages)
  }
}
