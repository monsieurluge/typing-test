const durationButtonElement = document.getElementById('duration-mode-button')
const durationInputElement = document.querySelector('#duration-selector input')
const durationSelectorElement = document.getElementById('duration-selector')

function enableDurationMode() {
  deactivate(wordsButtonElement)
  activate(durationButtonElement)
  hardHide(wordsSelectorElement)
  hardShow(durationSelectorElement)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function changeDurationConfig(durationString) {
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
