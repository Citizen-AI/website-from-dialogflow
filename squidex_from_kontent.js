// convert Kontent.ai JSON into Squidex JSON

const fs = require('fs')

const kontent_items = require('./data/lagbot-kontent.json').items


const remove_double_line_breaks = str => str?.replace(/\\n/g, '\n')


const kontent_to_squidex = ({ system, elements }) => ({
    name: system.name,
    exampleQuestions: [ { question: elements.example_question_s_.value } ],
    intentKey: elements.intent_key.value,
    answer: remove_double_line_breaks(elements.answer.value),
    source: elements.source.value
})


const squidexed = kontent_items.map(kontent_to_squidex)
const file_name = 'data/lagbot-for-squidex.json'
fs.writeFileSync(file_name, JSON.stringify(squidexed, null, 2))
console.log(`Wrote ${squidexed.length} items to ${file_name}`)





// sq content import topics ../website-from-dialogflow/data/topics.json --fields name,intentKey,answer,source,exampleQuestions --format JSON


// Kontent.ai exemplar:
// {
//   "system": {
//     "id": "9cfbb57b-8fc4-4b41-a2c9-bcca5ab16955",
//     "name": "Appeal – Appealing an Appeal",
//     "codename": "appeal___appealing_an_appeal",
//     "language": "default",
//     "type": "topic",
//     "sitemap_locations": [],
//     "last_modified": "2020-06-14T22:27:01.8271999Z"
//   },
//   "elements": {
//     "category": {
//       "type": "taxonomy",
//       "name": "category",
//       "taxonomy_group": "category",
//       "value": [
//         {
//           "name": "Court",
//           "codename": "court"
//         }
//       ]
//     },
//     "example_question_s_": {
//       "type": "text",
//       "name": "Example question(s)",
//       "value": "I lost my appeal – what can I do now?"
//     },
//     "intent_key": {
//       "type": "text",
//       "name": "Intent key",
//       "value": "a60c6076-09f3-41e8-ad81-e09f26ddfb15"
//     },
//     "answer": {
//       "type": "text",
//       "name": "Answer",
//       "value": "You should talk about your options with the lawyer who handled your appeal. They’ll be able to advise you about what options you might have.\nSometimes it’s possible to appeal all the way from the District Court, to the High Court, to the Court of Appeal, and finally to the Supreme Court. Cases that involve so many appeals are rare, but they’re possible when there’s a serious issue of justice or an area of the law that’s unclear"
//     },
//     "source": {
//       "type": "text",
//       "name": "Source",
//       "value": "LAG Law"
//     }
//   }
// },


// Squidex item exemplar:
// {
//   "name": "Disability - definition",
//   "exampleQuestions": [
//     {
//       "question": "What things count as a disability?"
//     }
//   ],
//   "intentKey": "008c3e38-ae9c-48d8-a48e-294b4224d8e0",
//   "answer": "Under the Human Rights Act ‘disability’ covers many things, including:\n• physical or psychiatric (mental) illness\n• physical, or intellectual or psychological disability or impairment, like a learning or neurological disability\n• loss or abnormality of psychological, physiological, or anatomical structure or function\n• being reliant on a guide dog, wheelchair, or other remedial means\n• having organisms in your body that can cause illness, like being HIV positive.\n\n[QR: Learn about reasonable accommodations, discrimination, or what questions you can be asked, or what you need to disclose, in an interview:; Accommmodations: Disability - reasonable accommodations; Discrimination: Discrimination - intro; Questions: Disability - interview questions; Disclosure: Disability - voluntary disclosing in interview]",
//   "source": "Human Rights Act 1993, s 21(1)(h)"
// },