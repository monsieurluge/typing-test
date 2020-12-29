const durationButtonElement = document.getElementById('duration-mode-button')
const durationButtonsElements = document.querySelectorAll('#duration-selector button')
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
  durationButtonsElements.forEach(deactivate)
  const durationText = ([15, 30, 60, 120].includes(duration))
    ? duration
    : 'custom'
  activate(durationSelectorElement.querySelector("[data-duration='" + durationText + "']"))
  durationButtonElement.title = `${config.time}s long`
}

durationButtonsElements.forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.duration
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeDurationConfig(value)
    saveAppConfig()
    focusWords()
  }
}))
