import { applyConfig, loadAppConfig } from './js/userconfig.js'
import { prepareTest } from './js/typing-test.js'
import { newWordsSet } from './js/words.js'
import { focusWords } from './js/gui/typing.js'

function App(config) {
  function start() {
    applyConfig(loadAppConfig(config))
    prepareTest(newWordsSet)
    focusWords()
  }

  return Object.freeze({
    start,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultConfig = {
    blindMode: false,
    mode: 'time',
    numbers: false,
    punctuation: false,
    time: 30,
    words: 50,
  }
  const app = App(defaultConfig)
  app.start()
})
