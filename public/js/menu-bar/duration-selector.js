const timeModeButton = document.getElementById('time-mode-button')

function enableTimeMode() {
  document.querySelectorAll('#test-config button.mode').forEach(deactivate)
  activate(document.querySelector('#test-config button.mode[mode="time"]'))
  hardHide(document.querySelector('#test-config .wordCount'))
  document.querySelectorAll('#test-config .time').forEach(hardShow)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function changeTimeConfig(timeString) {
  const time = parseInt(timeString)
  config.time = time
  document.querySelectorAll('#test-config .time button').forEach(deactivate)
  const timeToDisplay = ([15, 30, 60, 120].includes(time))
    ? time
    : 'custom'
  activate(document.querySelector("#test-config .time button[timeConfig='" + timeToDisplay + "']"))
  timeModeButton.textContent = `${config.time}s long`
}

document.querySelectorAll('#test-config .time button').forEach(button => button.addEventListener('click', () => {
  const value = button.getAttribute('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeTimeConfig(value)
    saveAppConfig()
    focusWords()
  }
}))
