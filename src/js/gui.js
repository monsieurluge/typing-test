import { pipe } from './lib/misc'

// ----------------------------------------------------------------------------
// ELEMENTS
// ----------------------------------------------------------------------------

const durationButtonElement = document.getElementById('duration-mode-button')
const durationSelectorElement = document.getElementById('duration-selector')
const wordsButtonElement = document.getElementById('words-mode-button')
const wordsSelectorElement = document.getElementById('words-selector')

// ----------------------------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------------------------

const refresh = element => {
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

const isVisible = element => false === element.classList.contains('hidden')

export const hardHide = addClass('hidden')

export const hardShow = removeClass('hidden')

export const activate = addClass('active')

export const deactivate = removeClass('active')

export const incorrect = addClass('error')

export const gotExtraCharacters = addClass('extra-characters')

export const lostExtraCharacters = removeClass('extra-characters')

const resetAnimation = className => pipe(
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

const openBottomPanel = pipe(
  open,
  addClass('opening'),
  refresh
)

export const opened = pipe(
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

export const closed = pipe(
  addClass('closed'),
  removeClass('closing'),
  hardHide
)

export function generateWordTags(content, word) {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
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

export function hideCaret(caretElement) {
  hardHide(caretElement)
}

export function showCaret({caretElement, resultElement}) {
  if (isVisible(resultElement)) return
  hardShow(caretElement)
  resetFlashing(caretElement)
}

export function enableFocus(bottomPanelsElement) {
  addClass('focus')(bottomPanelsElement)
  addClass('no-cursor')(document.querySelector('body'))
}

export function disableFocus(bottomPanelsElement) {
  removeClass('focus')(bottomPanelsElement)
  removeClass('no-cursor')(document.querySelector('body'))
}

export function enableDurationButton() {
  activate(durationButtonElement)
}

export function disableDurationButton() {
  deactivate(durationButtonElement)
}

export function updateDurationButtonTitle(duration) {
  durationButtonElement.title = `${duration}s long`
}

export function enableWordsButton() {
  activate(wordsButtonElement)
}

export function disableWordsButton() {
  deactivate(wordsButtonElement)
}

export function updateWordsButtonTitle(config) {
  wordsButtonElement.title = `${config.words} words`
}

export function showDurationSelector() {
  hardShow(durationSelectorElement)
}

export function hideDurationSelector() {
  hardHide(durationSelectorElement)
}

export function showWordsSelector() {
  hardShow(wordsSelectorElement)
}

export function hideWordsSelector() {
  hardHide(wordsSelectorElement)
}
