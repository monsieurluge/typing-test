const durationButtonElement = document.getElementById('duration-button')
const durationButtonsElements = document.querySelectorAll('#duration-selector button')
const durationSelectorElement = document.getElementById('duration-selector')

function enableDurationMode() {
  deactivate(wordsModeButton)
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
  activate(durationSelectorElement.querySelector("[timeConfig='" + durationText + "']"))
  durationButtonElement.title = `${config.time}s long`
}

durationButtonsElements.forEach(button => button.addEventListener('click', () => {
  const value = button.getAttribute('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeDurationConfig(value)
    saveAppConfig()
    focusWords()
  }
}))
