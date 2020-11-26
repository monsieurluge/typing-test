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
const testElement             = document.getElementById('typingTest')
const bottomPanelsElement     = document.getElementById('bottom-panels')

// ---------------------------------------------------- GENERIC DOM MANIPULATION

const addClass = className => element => element.classList.add(className)

const removeClass = className => element => element.classList.remove(className)

const hardHide = addClass('hidden')

const hardShow = removeClass('hidden')

const activate = addClass('active')

const deactivate = removeClass('active')

const isHidden = element => element.classList.contains('hidden')

// -------------------------------------------------- DEDICATED DOM MANIPULATION

function enableBottomPanel(name) {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

function openBottomPanel(panel) {
  removeClass('closing')(panel)
  removeClass('closed')(panel)
  hardShow(panel)
  addClass('opening')(panel)
  panel.offsetWidth
}

function closeBottomPanel(panel) {
  removeClass('opening')(panel)
  removeClass('opened')(panel)
  addClass('closing')(panel)
  panel.offsetWidth
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
  if (false === isHidden(resultElement)) return
  updateCaretPosition()
  hardShow(caretElement)
  addClass('flashing')(caretElement)
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
