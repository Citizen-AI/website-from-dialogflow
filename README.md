# View a Dialogflow Agent as a website / JSON_LD

## Instructions

* Install dependencies with `npm install`
* Load the latest version of the agent with `npm run download-intents`
* Output a [JSON-LD FAQ-style](https://developers.google.com/search/docs/data-types/faqpage) file with `npm run make_json_ld`
* Or, start the webserver with `npm start`


## Todo

* Use multi-message answers
* Use MongoDB instead of file?
* Make FU links display
* Q&A schema: https://schema.org/docs/faq.html
* QR links
* Source links
* /topics should only be sent data necessary for that, not the whole lot