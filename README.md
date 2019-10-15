# View a Dialogflow Agent as a website

## Instructions

* `.env` needs to include:
  * `google_creds`: set this to the contents of a Google Cloud json keyfile for a Dialogflow agent, with line breaks removed
  * `agent_client_uri`: set this to the Dialogflow agent's link in the Dialogflow UI, e.g. `https://dialogflow.cloud.google.com/#/agent/[your-agent-id]/`

* To download the latest intents file, run `npm run download-intents`

* Start the webserver with `npm start`


## Todo

* Q&A schema: https://schema.org/docs/faq.html
* FU & QR links
* Source links
