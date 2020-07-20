# View a Dialogflow Agent as a website / JSON_LD

## Instructions

* Install dependencies with `npm install`
* Load the latest version of the agent with `npm run download-intents`
* Start the webserver with `npm start`


## Utilities

This has grown into a Dialogflow / Headless CMS utility belt. Whoops?

* Output a [JSON-LD FAQ-style](https://developers.google.com/search/docs/data-types/faqpage) file with `npm run make_json_ld`
* Output a [Squidex-style](https://squidex.io/) JSON file with `npm run intents-to-squidex`
* Convert a [Kontent-ai style](https://kontent.ai) JSON file to Squidex style with `npm run kontent-to-squidex`

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