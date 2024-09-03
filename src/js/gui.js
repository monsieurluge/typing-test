// ----------------------------------------------------------------------------
// ELEMENTS
// ----------------------------------------------------------------------------

const bottomPanelsElement = document.getElementById('bottom-panels')
const durationButtonElement = document.getElementById('duration-mode-button')
const durationSelectorElement = document.getElementById('duration-selector')
const resultElement = document.getElementById('result')
const testElement = document.getElementById('typing-test')
const wordsButtonElement = document.getElementById('words-mode-button')
const wordsSelectorElement = document.getElementById('words-selector')

// ----------------------------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------------------------

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

function generateLettersTags(letters) {
  return letters
    .map(letter => `<letter>${letter}</letter>`)
    .join('')
}

function enableBottomPanel(name) {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

const closed = pipe(
  addClass('closed'),
  removeClass('closing'),
  hardHide
)

function generateWordTags(content, word) {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
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

function hideCaret(caretElement) {
  hardHide(caretElement)
}

function showCaret(caretElement) {
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

function enableDurationButton() {
  activate(durationButtonElement)
}

function disableDurationButton() {
  deactivate(durationButtonElement)
}

function updateDurationButtonTitle(duration) {
  durationButtonElement.title = `${duration}s long`
}

function enableWordsButton() {
  activate(wordsButtonElement)
}

function disableWordsButton() {
  deactivate(wordsButtonElement)
}

function updateWordsButtonTitle(config) {
  wordsButtonElement.title = `${config.words} words`
}

function showDurationSelector() {
  hardShow(durationSelectorElement)
}

function hideDurationSelector() {
  hardHide(durationSelectorElement)
}

function showWordsSelector() {
  hardShow(wordsSelectorElement)
}

function hideWordsSelector() {
  hardHide(wordsSelectorElement)
}

function hideResultPanel() {
  hardHide(resultElement)
}

function showResultPanel() {
  hardShow(resultElement)
}

function hideTestPanel() {
  hardHide(testElement)
}

function showTestPanel() {
  hardShow(testElement)
}
