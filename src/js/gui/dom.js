import { pipe } from '../lib/misc.js'

// ---------------------------------------------------------- FIXED DOM ELEMENTS

export const blindModeButtonElement  = document.getElementById('blind-mode-button')
export const bottomPanelsElement     = document.getElementById('bottom-panels')
export const caretElement            = document.getElementById('caret')
export const modePopupWrapperElement = document.getElementById('customMode2PopupWrapper')
export const modePopupElement        = document.getElementById('customMode2Popup')
export const modeSelectorElements    = document.querySelectorAll('#test-config button.mode-selector')
export const newTestButtonElement    = document.getElementById('new-test-button')
export const notificationElement     = document.getElementById('notification')
export const resetTestButtonElement  = document.getElementById('reset-test-button')
export const resultElement           = document.getElementById('result')
export const stopTestButtonElement   = document.getElementById('stop-test-button')
export const testElement             = document.getElementById('typing-test')
export const wordsElement            = document.getElementById('words')
export const wordsInputElement       = document.getElementById('wordsInput')
export const wordsWrapperElement     = document.getElementById('wordsWrapper')

// ---------------------------------------------------- GENERIC DOM MANIPULATION

export const refresh = element => {
  element.offsetWidth
  return element
}

export const addClass = className => element => {
  element.classList.add(className)
  return element
}

export const removeClass = className => element => {
  element.classList.remove(className)
  return element
}

export const isHidden = element => element.classList.contains('hidden')

export const isVisible = element => false === element.classList.contains('hidden')

export const hardHide = addClass('hidden')

export const hardShow = removeClass('hidden')

export const activate = addClass('active')

export const deactivate = removeClass('active')

export const correct = addClass('correct')

export const incorrect = addClass('error')

export const gotExtraCharacters = addClass('extra-characters')

export const lostExtraCharacters = removeClass('extra-characters')

export const resetAnimation = className => pipe(
  removeClass(className),
  refresh,
  addClass(className)
)

export const resetFlashing = resetAnimation('flashing')

export const open = pipe(
  removeClass('closing'),
  removeClass('closed'),
  hardShow
)

export const close = pipe(
  removeClass('opening'),
  removeClass('opened')
)

export const openBottomPanel = pipe(
  open,
  addClass('opening'),
  refresh
)

export const opened = pipe(
  addClass('opened'),
  removeClass('opening')
)

export const closeBottomPanel = pipe(
  close,
  addClass('closing'),
  refresh
)

export const closed = pipe(
  addClass('closed'),
  removeClass('closing'),
  hardHide
)

// -------------------------------------------------- DEDICATED DOM MANIPULATION

export function enableBottomPanel(name) {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

export function showTestConfigPanel() {
  enableBottomPanel('test-config')
}

export function showResultButtonsPanel() {
  enableBottomPanel('result-buttons')
}

export function showTestRunningPanel() {
  enableBottomPanel('test-running')
}

export function hideCaret() {
  hardHide(caretElement)
}

export function showCaret() {
  if (isVisible(resultElement)) return
  hardShow(caretElement)
  resetFlashing(caretElement)
}

export function enableFocus() {
  addClass('focus')(bottomPanelsElement)
  addClass('no-cursor')(document.querySelector('body'))
}

export function disableFocus() {
  removeClass('focus')(bottomPanelsElement)
  removeClass('no-cursor')(document.querySelector('body'))
}

export function showCustomMode2Popup(mode) {
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

export function showNotification(text, time) {
  clearTimeout(notificationTimer)
  notificationElement.textContent = text
  addClass('displayed')(notificationElement)
  notificationTimer = setTimeout(() => removeClass('displayed')(notificationElement), 4000)
}
