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

modePopupWrapperElement.addEventListener('click', hideCustomMode2Popup)

modePopupElement.addEventListener('click', event => event.stopPropagation())

document.querySelector('#customMode2Popup .button').addEventListener('click', applyMode2Popup)

document.addEventListener('mousemove', disableFocus)

blindModeButtonElement.addEventListener('click', toggleBlindMode)

resetTestButtonElement.addEventListener('click', () => resetTest(false))

resetTestWithSameWordsetButtonElement.addEventListener('click', () => resetTest(true))

stopTestButtonElement.addEventListener('click', () => resetTest(true))

wordsWrapperElement.addEventListener('click', focusWords)

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

resetTestButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

stopTestButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

resetTestWithSameWordsetButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest(true)
})

document.querySelector('#customMode2Popup input').addEventListener('keyup', event => {
  if (event.code === 'Enter') applyMode2Popup()
})

wordsInputElement.addEventListener('focus', () => {
  showCaret()
  // testActive
  //   ? showTestRunningPanel()
  //   : showTestConfigPanel()
})

// ------------------------------------------------------------------- test keys

wordsInputElement.addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.code !== 'Backspace') return
  event.preventDefault()
  eraseCharacter()
})

wordsInputElement.addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.key !== ' ') return
  event.preventDefault()
  jumpToNextWord()
})

wordsInputElement.addEventListener('keydown', event => {
  if (excludedTestKeycodes.includes(event.code)) return
  if (excludedTestKeys.includes(event.key)) return
  if (false === testActive) startTest()
  enableFocus()
  handleTyping(event.key)
})

wordsInputElement.addEventListener('keydown', event => {
  if (event.code === 'Tab' && testActive) {
    disableFocus()
  }
})

// ----------------------------------------------------------------- misc events

wordsInputElement.addEventListener('blur', hideCaret)

window.addEventListener('beforeunload', event => {
  if (false === testActive) return
  event.returnValue = ''
  return ''
})
