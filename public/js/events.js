// ----------------------------------------------------------- mouse interaction

$(document).on('click', '#test-config button.mode', event => {
  if ($(event.currentTarget).hasClass('active')) return
  changeMode($(event.currentTarget).attr('mode'))
  saveConfigToCookie()
  $('#test-config button.mode').removeClass('active')
  $(event.currentTarget).addClass('active')
  resetTest()
})

$(document).on('click', '#test-config .time button', event => {
  const value = $(event.currentTarget).attr('timeConfig')
  if (value === 'custom') {
    showCustomMode2Popup('time')
  } else {
    changeTimeConfig(value)
    saveConfigToCookie()
    $('#wordsInput').focus()
  }
})

$(document).on('click', '#test-config .wordCount button', event => {
  const value = $(event.currentTarget).attr('wordCount')
  if (value === 'custom') {
    showCustomMode2Popup('words')
  } else {
    changeWordCount(value)
    saveConfigToCookie()
    $('#wordsInput').focus()
    resetTest()
  }
})

// $(document).on('click', '#punctuationMode', () => {
//   togglePunctuation()
//   resetTest()
// })

// $(document).on('click', '#numbersMode', () => {
//   toggleNumbers()
//   resetTest()
// })

$(document).on('click', '#blindMode', () => {
  toggleBlindMode()
  focusWords()
})

$(document.body).on('click', '#reset-test-button', resetTest)

$(document.body).on('click', '#reset-test-button-with-same-wordset', () => resetTest(true))

$(document).on('click', '#stop-test-button', resetTest)

$(document).mousemove(event => {
  if (event.originalEvent.movementX > 0 || event.originalEvent.movementY > 0) {
    disableFocus()
  }
})

$('#customMode2PopupWrapper').click(event => {
  if ($(event.target).attr('id') === 'customMode2PopupWrapper') hideCustomMode2Popup()
})

$('#customMode2Popup .button').click(applyMode2Popup)

$('#wordsWrapper').on('click', focusWords)

// --------------------------------------------------------- shortcuts and menus

document.addEventListener('keyup', event => {
  if (event.code === 'KeyN' && event.shiftKey && false === testActive) {
    console.log('reset test')
    resetTest()
  }
  if (event.code === 'KeyR' && event.shiftKey && false === testActive) {
    console.log('reset test with same word set')
    resetTest(true)
  }
  if (event.code === 'KeyC' && event.ctrlKey && testActive) {
    console.log('stop and reset the test with the same wordset')
    resetTest(true)
  }
})

$('#reset-test-button').keypress(event => {
  if (event.code === 'Enter') resetTest()
})

$('#stop-test-button').keypress(event => {
  if (event.code === 'Enter') resetTest()
})

$('#reset-test-button-with-same-wordset').keypress(event => {
  if (event.code === 'Enter') resetTest(true)
})

$("#customMode2Popup input").keypress(event => {
  if (event.code === 'Enter') applyMode2Popup()
})

$('#wordsInput').on('focus', () => {
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

// ----------------------------------------------------------------- misc events

$('#wordsInput').on('focusout', hideCaret)

window.addEventListener('beforeunload', event => {
  if (false === testActive) return
  event.returnValue = ''
  return ''
})
