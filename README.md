# View a Dialogflow Agent as a website / JSON_LD

## Instructions

* Install dependencies with `npm install`
* Load the latest version of the agent with `npm run download-intents`
* Start the webserver with `npm start`

## Optional environment variable

* **agent_client_uri**: The Dialogflow agent's link in the Dialogflow UI, e.g. https://dialogflow.cloud.google.com/#/agent/[your-agent-id]/


## Utilities

This has grown into a Dialogflow / Headless CMS utility belt. Whoops?

* Output a [JSON-LD FAQ-style](https://developers.google.com/search/docs/data-types/faqpage) file with `npm run make_json_ld`
* Output a [Squidex-style](https://squidex.io/) JSON file with `npm run intents-to-squidex`
* Convert a [Kontent-ai style](https://kontent.ai) JSON file to Squidex style with `npm run kontent-to-squidex`

## Useful Squidex CLI commands

* `sq use config workbot`
* `sq schemas get topic > workbot-topic-schema.json`
* `sq use config rentbot`
* `sq schemas sync workbot-topic-schema.json --name topic`
  (Note links between schemas don't export/import; so we need to link up the topic schema's linkedTopics & category fields)
* `sq content import topic topics.json --array --fields name,intentKey,answer,source,exampleQuestions --format JSON`


## Todo

* Use multi-message answers
* Use MongoDB instead of file?
* Make FU links display
* Q&A schema: https://schema.org/docs/faq.html
* QR links
* Source links
* /topics should only be sent data necessary for that, not the whole lot


## Thanks to

* [Alex](https://stackoverflow.com/a/4253415/1876628) for escaping newlines in proper JSON