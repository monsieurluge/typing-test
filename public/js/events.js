// ----------------------------------------------------------- MOUSE INTERACTION

modeSelectorElements.forEach(button => button.addEventListener('click', event => {
  if (event.target.classList.contains('active')) return
  changeMode(event.target.getAttribute('mode'))
  saveAppConfig()
  deactivate(button)
  activate(event.target)
  focusWords()
}))

modePopupWrapperElement.addEventListener('click', hardHide(modePopupWrapperElement))

modePopupElement.addEventListener('click', event => event.stopPropagation())

document.querySelector('#customMode2Popup .button').addEventListener('click', applyMode2Popup)

document.addEventListener('mousemove', disableFocus)

blindModeButtonElement.addEventListener('click', toggleBlindMode)

newTestButtonElement.addEventListener('click', () => generateTest())

resetTestButtonElement.addEventListener('click', () => resetTest())

stopTestButtonElement.addEventListener('click', () => resetTest())

wordsWrapperElement.addEventListener('click', focusWords)

document.querySelector('#test-config button:not(.custom)').addEventListener('click', focusWords)

// --------------------------------------------------------- SHORTCUTS AND MENUS

document.addEventListener('keyup', event => {
  if (event.code === 'KeyN' && event.shiftKey && false === testActive) generateTest()
  if (event.code === 'KeyR' && event.shiftKey && false === testActive) resetTest()
  if (event.code === 'KeyC' && event.ctrlKey && testActive) resetTest()
})

newTestButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') generateTest()
})

stopTestButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

resetTestButtonElement.addEventListener('keyup', event => {
  if (event.code === 'Enter') resetTest()
})

document.querySelector('#customMode2Popup input').addEventListener('keyup', event => {
  if (event.code === 'Enter') applyMode2Popup()
})

// ------------------------------------------------------------------- TEST KEYS

wordsInputElement.addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.code !== 'Backspace') return
  event.preventDefault()
  eraseCharacter()
})

wordsInputElement.addEventListener('keydown', event => {
  if (false === testActive) return
  if (event.key !== ' ') return
  if (currentInput.length === 0) return
  event.preventDefault()
  jumpToNextWord()
})

wordsInputElement.addEventListener('keydown', event => {
  if (excludedTestKeycodes.includes(event.code)) return
  if (excludedTestKeys.includes(event.key)) return
  if (event.ctrlKey) return
  if (false === testActive) startTest()
  enableFocus()
  handleTyping(event.key)
})

wordsInputElement.addEventListener('keydown', event => {
  if (event.code === 'Tab' && testActive) {
    disableFocus()
  }
})

// ----------------------------------------------------------------- MISC EVENTS

wordsInputElement.addEventListener('blur', hideCaret)

window.addEventListener('beforeunload', event => {
  if (false === testActive) return
  event.returnValue = ''
  return ''
})

document.querySelectorAll('.bottom-panel').forEach(panel => {
  panel.addEventListener('animationstart', event => {
    if (event.animationName === 'open-bottom-panel') {
      open(event.target)
    }
    if (event.animationName === 'close-bottom-panel') {
      close(event.target)
    }
  })

  panel.addEventListener('animationend', event => {
    if (event.animationName === 'open-bottom-panel') {
      opened(event.target)
    }
    if (event.animationName === 'close-bottom-panel') {
      closed(event.target)
    }
  })
})
