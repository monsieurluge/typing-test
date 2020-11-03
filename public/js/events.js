// ----------------------------------------------------------- mouse interaction

$(document).on('click', '#test-config button.mode', event => {
  if ($(event.currentTarget).hasClass('active')) return
  changeMode($(event.currentTarget).attr('mode'))
  saveConfigToCookie()
  removeClass('active')(document.querySelector('#test-config button.mode'))
  addClass('active')(event.currentTarget)
  resetTest()
})

$(document).on('click', '#test-config .time button', event => {
  const value = $(event.currentTarget).attr('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeTimeConfig(value)
    saveConfigToCookie()
    document.getElementById('wordsInput').focus()
  }
})

$(document).on('click', '#test-config .wordCount button', event => {
  const value = $(event.currentTarget).attr('wordCount')
  if (value === 'custom') {
    showCustomMode2Popup('words')
  } else {
    changeWordCount(value)
    saveConfigToCookie()
    document.getElementById('wordsInput').focus()
    resetTest()
  }
})

$(document).on('click', '#blindMode', () => {
  toggleBlindMode()
  focusWords()
})

$(document.body).on('click', '#reset-test-button', () => resetTest(false))

$(document.body).on('click', '#reset-test-button-with-same-wordset', () => resetTest(true))

$(document).on('click', '#stop-test-button', resetTest)

$(document).mousemove(event => {
  if (event.originalEvent.movementX > 0 || event.originalEvent.movementY > 0) {
    disableFocus()
  }
})

document.getElementById('customMode2PopupWrapper').addEventListener('click', event => {
  if (event.target.attr('id') === 'customMode2PopupWrapper') hideCustomMode2Popup()
})

document.querySelector('#customMode2Popup .button').addEventListener('click', applyMode2Popup)

document.getElementById('wordsWrapper', focusWords)

// --------------------------------------------------------- shortcuts and menus

document.addEventListener('keyup', event => {
  if (event.code === 'KeyN' && event.shiftKey && false === testActive) {
    resetTest()
  }
  if (event.code === 'KeyR' && event.shiftKey && false === testActive) {
    resetTest(true)
  }
  if (event.code === 'KeyC' && event.ctrlKey && testActive) {
    resetTest(true)
  }
})

document.getElementById('reset-test-button').addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

document.getElementById('stop-test-button').addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

document.getElementById('reset-test-button-with-same-wordset').addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest(true)
})

document.querySelector('#customMode2Popup input').addEventListener('keyup', event => {
  if (event.code === 'Enter') applyMode2Popup()
})

document.getElementById('wordsInput').addEventListener('focus', () => {
  showCaret()
  testActive
    ? showTestRunningPanel()
    : showTestConfigPanel()
})

// ------------------------------------------------------------------- test keys

document.getElementById('wordsInput').addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.code !== 'Backspace') return
  event.preventDefault()
  eraseCharacter()
})

document.getElementById('wordsInput').addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.key !== ' ') return
  event.preventDefault()
  jumpToNextWord()
})

document.getElementById('wordsInput').addEventListener('keydown', event => {
  if (excludedTestKeycodes.includes(event.code)) return
  if (excludedTestKeys.includes(event.key)) return
  if (false === testActive) startTest()
  enableFocus()
  handleTyping(event.key)
})

document.getElementById('wordsInput').addEventListener('keydown', event => {
  if (event.code === 'Tab' && testActive) {
    disableFocus()
  }
})

// ----------------------------------------------------------------- misc events

document.getElementById('wordsInput').addEventListener('blur', hideCaret)

window.addEventListener('beforeunload', event => {
  if (false === testActive) return
  event.returnValue = ''
  return ''
})
