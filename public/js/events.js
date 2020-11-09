// ----------------------------------------------------------- mouse interaction

document.querySelectorAll('#test-config button.mode').forEach(button => button.addEventListener('click', event => {
  if (event.target.classList.contains('active')) return
  changeMode(event.target.getAttribute('mode'))
  saveConfigToCookie()
  removeClass('active')(button)
  addClass('active')(event.target)
}))

document.querySelectorAll('#test-config .time button').forEach(button => button.addEventListener('click', () => {
  const value = button.getAttribute('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeTimeConfig(value)
    saveConfigToCookie()
    focusWords()
  }
}))

document.querySelectorAll('#test-config .wordCount button').forEach(button => button.addEventListener('click', () => {
  const value = button.getAttribute('wordCount')
  if (value === 'custom') {
    showCustomMode2Popup('words')
  } else {
    changeWordCount(value)
    saveConfigToCookie()
    focusWords()
    resetTest()
  }
}))

document.getElementById('customMode2PopupWrapper').addEventListener('click', hideCustomMode2Popup)

document.getElementById('customMode2Popup').addEventListener('click', event => event.stopPropagation())

document.querySelector('#customMode2Popup .button').addEventListener('click', applyMode2Popup)

document.addEventListener('mousemove', disableFocus)

document.getElementById('blindMode').addEventListener('click', toggleBlindMode)

document.getElementById('reset-test-button').addEventListener('click', () => resetTest(false))

document.getElementById('reset-test-button-with-same-wordset').addEventListener('click', () => resetTest(true))

document.getElementById('stop-test-button').addEventListener('click', () => resetTest(true))

document.getElementById('wordsWrapper').addEventListener('click', focusWords)

document.querySelector('#test-config button:not(.custom)').addEventListener('click', focusWords)

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
