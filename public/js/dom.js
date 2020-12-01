// ---------------------------------------------------------- FIXED DOM ELEMENTS

const resultElement           = document.getElementById('result')
const caretElement            = document.getElementById('caret')
const notificationElement     = document.getElementById('notification')
const modePopupWrapperElement = document.getElementById('customMode2PopupWrapper')
const modePopupElement        = document.getElementById('customMode2Popup')
const newTestButtonElement    = document.getElementById('new-test-button')
const resetTestButtonElement  = document.getElementById('reset-test-button')
const stopTestButtonElement   = document.getElementById('stop-test-button')
const blindModeButtonElement  = document.getElementById('blindMode')
const wordsWrapperElement     = document.getElementById('wordsWrapper')
const wordsInputElement       = document.getElementById('wordsInput')
const wordsElement            = document.getElementById('words')
const testElement             = document.getElementById('typing-test')
const bottomPanelsElement     = document.getElementById('bottom-panels')

// ---------------------------------------------------- GENERIC DOM MANIPULATION

const refresh = element => {
  element.offsetWidth
  return element
}

const addClass = className => element => {
  element.classList.add(className)
  return element
}

const removeClass = className => element => {
  element.classList.remove(className)
  return element
}

const isHidden = element => element.classList.contains('hidden')

const isVisible = element => false === element.classList.contains('hidden')

const hardHide = addClass('hidden')

const hardShow = removeClass('hidden')

const activate = addClass('active')

const deactivate = removeClass('active')

const correct = addClass('correct')

const incorrect = addClass('error')

const gotExtraCharacters = addClass('extra-characters')

const lostExtraCharacters = removeClass('extra-characters')

const resetAnimation = className => pipe(
  removeClass(className),
  refresh,
  addClass(className)
)

const resetFlashing = resetAnimation('flashing')

const open = pipe(
  removeClass('closing'),
  removeClass('closed'),
  hardShow
)

const close = pipe(
  removeClass('opening'),
  removeClass('opened')
)

const openBottomPanel = pipe(
  open,
  addClass('opening'),
  refresh
)

const opened = pipe(
  addClass('opened'),
  removeClass('opening')
)

const closeBottomPanel = pipe(
  close,
  addClass('closing'),
  refresh
)

const closed = pipe(
  addClass('closed'),
  removeClass('closing'),
  hardHide
)

// -------------------------------------------------- DEDICATED DOM MANIPULATION

function enableBottomPanel(name) {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

function showTestConfigPanel() {
  enableBottomPanel('test-config')
}

function showResultButtonsPanel() {
  enableBottomPanel('result-buttons')
}

function showTestRunningPanel() {
  enableBottomPanel('test-running')
}

function hideCaret() {
  hardHide(caretElement)
}

function showCaret() {
  if (isVisible(resultElement)) return
  hardShow(caretElement)
  resetFlashing(caretElement)
}

function enableFocus() {
  addClass('focus')(bottomPanelsElement)
  addClass('no-cursor')(document.querySelector('body'))
}

function disableFocus() {
  removeClass('focus')(bottomPanelsElement)
  removeClass('no-cursor')(document.querySelector('body'))
}

function showCustomMode2Popup(mode) {
  hardShow(modePopupWrapperElement)
  if (mode === 'time') {
    document.querySelector('#customMode2Popup .title').textContent = 'Test length'
    modePopupElement.setAttribute('mode', 'time')
  } else if (mode === 'words') {
    document.querySelector('#customMode2Popup .title').textContent = 'Word amount'
    modePopupElement.setAttribute('mode', 'words')
  }
  focusWords()
}

function showNotification(text, time) {
  clearTimeout(notificationTimer)
  notificationElement.textContent = text
  addClass('displayed')(notificationElement)
  notificationTimer = setTimeout(() => removeClass('displayed')(notificationElement), 4000)
}
