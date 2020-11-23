// ---------------------------------------------------------- FIXED DOM ELEMENTS

const resultElement                         = document.getElementById('result')
const caretElement                          = document.getElementById('caret')
const notificationElement                   = document.getElementById('notification')
const modePopupWrapperElement               = document.getElementById('customMode2PopupWrapper')
const modePopupElement                      = document.getElementById('customMode2Popup')
const resetTestButtonElement                = document.getElementById('reset-test-button')
const resetTestWithSameWordsetButtonElement = document.getElementById('reset-test-button-with-same-wordset')
const stopTestButtonElement                 = document.getElementById('stop-test-button')
const blindModeButtonElement                = document.getElementById('blindMode')
const wordsWrapperElement                   = document.getElementById('wordsWrapper')
const wordsInputElement                     = document.getElementById('wordsInput')
const wordsElement                          = document.getElementById('words')
const testElement                           = document.getElementById('typingTest')
const bottomPanelsElement                   = document.getElementById('bottom-panels')

// ---------------------------------------------------- GENERIC DOM MANIPULATION

const addClass = className => element => {
  element.classList.add(className)
}

const removeClass = className => element => {
  element.classList.remove(className)
}

const hardHide = element => () => {
  addClass('hidden')(element)
}

const hardShow = element => () => {
  removeClass('hidden')(element)
}

const isHidden = element => element.classList.contains('hidden')

// -------------------------------------------------- DEDICATED DOM MANIPULATION

const enableBottomPanel = name => {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

const openBottomPanel = panel => {
  removeClass('closing')(panel)
  removeClass('closed')(panel)
  removeClass('hidden')(panel)
  addClass('opening')(panel)
  panel.offsetWidth
}

const closeBottomPanel = panel => {
  removeClass('opening')(panel)
  removeClass('opened')(panel)
  addClass('closing')(panel)
  panel.offsetWidth
}

const showTestConfigPanel = () => {
  enableBottomPanel('test-config')
}

const showResultButtonsPanel = () => {
  enableBottomPanel('result-buttons')
}

const showTestRunningPanel = () => {
  enableBottomPanel('test-running')
}

const hideCaret = hardHide(caretElement)

const showCaret = () => {
  if (false === isHidden(resultElement)) return
  updateCaretPosition()
  hardShow(caretElement)()
  addClass('flashing')(caretElement)
}

const enableFocus = () => {
  addClass('focus')(bottomPanelsElement)
  addClass('no-cursor')(document.querySelector('body'))
}

const disableFocus = () => {
  removeClass('focus')(bottomPanelsElement)
  removeClass('no-cursor')(document.querySelector('body'))
}

function showCustomMode2Popup(mode) {
  hardShow(modePopupWrapperElement)()
  if (mode === 'time') {
    document.querySelector('#customMode2Popup .title').textContent = 'Test length'
    modePopupElement.setAttribute('mode', 'time')
  } else if (mode === 'words') {
    document.querySelector('#customMode2Popup .title').textContent = 'Word amount'
    modePopupElement.setAttribute('mode', 'words')
  }
  focusWords()
}
