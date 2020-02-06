# View a Dialogflow Agent as a website / JSON_LD

## Instructions

* Install dependencies with `npm install`
* Load the latest version of the agent with `npm run download-intents`
* Start the webserver with `npm start`
* Visit `http://127.0.0.1:3000/json` to output a [JSON-LD FAQ-style](https://developers.google.com/search/docs/data-types/faqpage) file `data/json_ld.js`

## Todo

* Use multi-message answers
* Use MongoDB instead of file?
* Make FU links display
* Q&A schema: https://schema.org/docs/faq.html
* QR links
* Source links
* /topics should only be sent data necessary for that, not the whole lot