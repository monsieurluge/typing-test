const modes = new Map([
  [ 'time', enableTimeMode ],
  [ 'words', enableWordsMode ],
])

function enableTimeMode() {
  document.querySelectorAll('#test-config button.mode').forEach(deactivate)
  activate(document.querySelector('#test-config button.mode[mode="time"]'))
  hardHide(document.querySelector('#test-config .wordCount'))
  document.querySelectorAll('#test-config .time').forEach(hardShow)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function enableWordsMode() {
  document.querySelectorAll('#test-config button.mode').forEach(deactivate)
  activate(document.querySelector('#test-config button.mode[mode="words"]'))
  hardHide(document.querySelector('#test-config .time'))
  document.querySelectorAll('#test-config .wordCount').forEach(hardShow)
  testActive
    ? newTest()
    : prepareTest(newWordsSet)
}

function changeMode(target) {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  config.mode = target
  modes.get(target)()
}

function applyMode2Popup() {
  const mode = modePopupElement.getAttribute('mode')
  const val = document.querySelector('#customMode2Popup input').value
  if (mode === 'time') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeTimeConfig(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      resetTest()
    } else {
      showNotification('Custom time must be at least 1', 3000)
    }
  } else if (mode === 'words') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      newTest()
    } else {
      showNotification('Custom word amount must be at least 1', 3000)
    }
  }
}

