const durationButtonElement = document.getElementById('duration-button')

function enableDurationMode() {
  document.querySelectorAll('#test-config button.mode').forEach(deactivate)
  activate(document.querySelector('#test-config button.mode[mode="time"]'))
  hardHide(document.querySelector('#test-config .wordCount'))
  document.querySelectorAll('#test-config .time').forEach(hardShow)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function changeDurationConfig(durationString) {
  const duration = parseInt(durationString)
  config.time = duration
  document.querySelectorAll('#test-config .time button').forEach(deactivate)
  const durationText = ([15, 30, 60, 120].includes(duration))
    ? duration
    : 'custom'
  activate(document.querySelector("#test-config .time button[timeConfig='" + durationText + "']"))
  durationButtonElement.textContent = `${config.time}s long`
}

document.querySelectorAll('#test-config .time button').forEach(button => button.addEventListener('click', () => {
  const value = button.getAttribute('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeDurationConfig(value)
    saveAppConfig()
    focusWords()
  }
}))
