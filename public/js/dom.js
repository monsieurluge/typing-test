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

const refresh = element => element.offsetWidth

const addClass = className => element => element.classList.add(className)

const removeClass = className => element => element.classList.remove(className)

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

const resetAnimation = className => element => {
  removeClass(className)(element)
  refresh(element)
  addClass(className)(element)
}

const resetFlashing = resetAnimation('flashing')

// -------------------------------------------------- DEDICATED DOM MANIPULATION

function enableBottomPanel(name) {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

function open(panel) {
  removeClass('closing')(panel)
  removeClass('closed')(panel)
  hardShow(panel)
}

function openBottomPanel(panel) {
  open(panel)
  addClass('opening')(panel)
  panel.offsetWidth
}

function opened(panel) {
  addClass('opened')(panel)
  removeClass('opening')(panel)
}

function close(panel) {
  removeClass('opening')(panel)
  removeClass('opened')(panel)
}

function closeBottomPanel(panel) {
  close(panel)
  addClass('closing')(panel)
  panel.offsetWidth
}

function closed(panel) {
  addClass('closed')(panel)
  removeClass('closing')(panel)
  hardHide(panel)
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
