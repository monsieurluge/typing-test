const wordsButtonElement = document.getElementById('words-mode-button')
const wordsSelectorElement = document.getElementById('words-selector')
const wordsCountInputElement = document.querySelector('#words-selector input')

function enableWordsMode() {
  deactivate(durationButtonElement)
  activate(wordsButtonElement)
  hardHide(durationSelectorElement)
  hardShow(wordsSelectorElement)
  testActive
    ? generateTest()
    : prepareTest(newWordsSet)
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  wordsCountInputElement.value = config.words
  wordsButtonElement.title = `${config.words} words`
}

wordsCountInputElement.addEventListener('change', event => {
  const words = event.target.value
  if (isNaN(words)) return
  changeWordCount(words)
  saveAppConfig()
  prepareTest(newWordsSet)
  focusWords()
})
