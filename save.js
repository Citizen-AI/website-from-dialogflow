const fs = require('fs')


const { google_creds } = process.env,
      credentials = JSON.parse(google_creds),
      { project_id } = credentials
const folder = './data'
const now = new Date().toISOString()


module.exports = {
  save_json_ld: json_ld => {
    fs.writeFileSync(`${folder}/json_ld.js`, json_ld)
  }
}