import { activate, deactivate, hardHide, hardShow } from '../dom.js'
import { wordsButtonElement, wordsSelectorElement } from './words-selector.js'
import { prepareTest, resetTest } from '../../typing-test.js'
import { newWordsSet } from '../../words.js'
import { testActive } from '../../storage.js'

export const durationButtonElement = document.getElementById('duration-mode-button')
export const durationInputElement = document.querySelector('#duration-selector input')
export const durationSelectorElement = document.getElementById('duration-selector')

export function enableDurationMode() {
  deactivate(wordsButtonElement)
  activate(durationButtonElement)
  hardHide(wordsSelectorElement)
  hardShow(durationSelectorElement)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

export function changeDurationConfig(durationString) {
  const duration = parseInt(durationString)
  config.time = duration
  durationInputElement.value = duration
  durationButtonElement.title = `${duration}s long`
}

durationInputElement.addEventListener('change', event => {
  const duration = event.target.value
  if (isNaN(duration)) return
  changeDurationConfig(duration)
  saveAppConfig()
  focusWords()
})
