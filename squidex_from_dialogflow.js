const fs = require('fs')

require('./env')
const { get_topics } = require('./dialogflow')

const sources_tag = /\[sources?: ?(.+?)\]/i
const topics = get_topics()


const row = topic => {
  const remove_line_breaks = str => str?.replace("\n", '')
  const remove_double_line_breaks = str => str?.replace(/\\n/g, '\n')

  const answer = topic.answer[0]?.replace(sources_tag, '')
  const source = topic.answer[0].match(sources_tag)?.[1]

  return {
    name: topic.displayName,
    exampleQuestions: [ { question: topic.question } ],
    intentKey: topic.intent_key,
    answer: remove_double_line_breaks(answer),
    source: remove_line_breaks(source)
  }
}


const squidexed = topics.map(row)
const file_name = 'data/topics.json'
fs.writeFileSync(file_name, JSON.stringify(squidexed, null, 2))
console.log('Wrote to', file_name)



