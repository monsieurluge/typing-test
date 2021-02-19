const wordsButtonElement     = document.getElementById('words-mode-button')
const wordsButtonsElements   = document.querySelectorAll('#words-selector button')
const wordsSelectorElement   = document.getElementById('words-selector')
const wordsCountInputElement = document.querySelector('#words-selector input')

function enableWordsMode() {
  deactivate(durationButtonElement)
  activate(wordsButtonElement)
  hardHide(durationSelectorElement)
  hardShow(wordsSelectorElement)
  testActive
    ? newTest()
    : prepareTest(newWordsSet)
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  wordsButtonsElements.forEach(deactivate)
  const wordCountToDisplay = ([10, 25, 50, 100, 200].includes(wordCount))
    ? wordCount
    : 'custom'
  activate(wordsSelectorElement.querySelector('[data-total="' + wordCountToDisplay + '"]'))
  wordsCountInputElement.value = config.words
  wordsButtonElement.title = `${config.words} words`
}

wordsButtonsElements.forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.total
  if (value === 'custom') {
    showCustomMode2Popup('words')
  } else {
    changeWordCount(value)
    saveAppConfig()
    prepareTest(newWordsSet)
    focusWords()
  }
}))

wordsCountInputElement.addEventListener('change', event => {
    const words = event.target.value
    if (isNaN(words)) return
    changeWordCount(words)
    saveAppConfig()
    prepareTest(newWordsSet)
    focusWords()
})
