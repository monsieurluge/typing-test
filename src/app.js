import { pipe, roundTo2, zipByIndexWith } from './js/lib/misc'
import { loadCookie, saveContentToCookie } from './js/lib/cookie'
import { words } from './js/dictionaries/english'
import {
  activate,
  close,
  closed,
  deactivate,
  disableDurationButton,
  disableFocus,
  disableWordsButton,
  enableDurationButton,
  enableFocus,
  enableWordsButton,
  generateWordTags,
  gotExtraCharacters,
  hideCaret,
  hideDurationSelector,
  hideResultPanel,
  hideTestPanel,
  hideWordsSelector,
  incorrect,
  isHidden,
  lostExtraCharacters,
  open,
  opened,
  resetFlashing,
  showCaret,
  showDurationSelector,
  showResultPanel,
  showTestConfigPanel,
  showTestPanel,
  showWordsSelector,
  showResultButtonsPanel,
  showTestRunningPanel,
  updateDurationButtonTitle,
  updateWordsButtonTitle,
} from './js/gui'

// ----------------------------------------------------------------------------
// GLOBAL VARIABLES
// ----------------------------------------------------------------------------

let accuracyStats      = { correct: 0, incorrect: 0 }
let currentInput       = ''
let currentWordElement = undefined
let inputHistory       = []
let resultCalculating  = false
let resultVisible      = false
let testActive         = false
let testEnd            = 0
let testStart          = 0
let timer              = null
let wordsList          = []

const modes = new Map([
  [ 'time', enableDurationMode ],
  [ 'words', enableWordsMode ],
])

const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Escape']
const excludedTestKeys = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

const cookieName = 'typing-test-config'

const defaultConfig = {
  blindMode: false,
  mode: 'time',
  numbers: false,
  punctuation: false,
  time: 30,
  words: 50,
}

let config = { ...defaultConfig }

let themeColors = {
  bg: "#282625",
  main: "#e15030",
  caret: "#e15030",
  sub: "#b3ab9d",
  text: "#e4dbcd",
  error: "#ca4754",
  errorExtra: "#7e2a33",
  colorfulError: "#ca4754",
  colorfulErrorExtra: "#7e2a33",
}

// ----------------------------------------------------------------------------
// GLOBAL FUNCTIONS
// ----------------------------------------------------------------------------

const loadAppConfig = loadCookie(cookieName)

const saveAppConfig = () => saveContentToCookie(cookieName)(config)

// ----------------------------------------------------------------------------
// GUI
// ----------------------------------------------------------------------------

const wordsCountInputElement  = document.querySelector('#words-selector input')
const durationInputElement    = document.querySelector('#duration-selector input')
const blindModeButtonElement  = document.getElementById('blind-mode-button')
const caretElement            = document.getElementById('caret')
const modeSelectorElements    = document.querySelectorAll('#test-config button.mode-selector')
const newTestButtonElement    = document.getElementById('new-test-button')
const resetTestButtonElement  = document.getElementById('reset-test-button')
const stopTestButtonElement   = document.getElementById('stop-test-button')
const wordsElement            = document.getElementById('words')
const wordsInputElement       = document.getElementById('wordsInput')
const wordsWrapperElement     = document.getElementById('wordsWrapper')

function prepareWords(container) {
  container.innerHTML = wordsList.reduce(generateWordTags, '<div class="filler"></div>')
}

// ----------------------------------------------------------------------------
// WORDS
// ----------------------------------------------------------------------------

function isWordCompleted() {
  const currentWordContent = fetchCurrentWord()
  return currentWordElement.nextElementSibling === null
    && currentInput.length === currentWordContent.length
    && (config.blindMode || currentInput.slice(-1) === currentWordContent.slice(-1))
}

function addWordToTest() {
  const word = words[Math.floor(Math.random() * words.length)]
  if (wordsList.slice(-2).includes(word)) return // cannot add a new word
  wordsList.push(word)
}

function newWordsSet() {
  wordsList = []
  const expectedLength = (config.mode === 'words') ? config.words : 60
  while (wordsList.length < expectedLength) {
    addWordToTest()
  }
}

function sameWordsSet() {} // do nothing, on purpose

// ----------------------------------------------------------------------------
// MENU BAR
// ----------------------------------------------------------------------------

function changeMode(target) {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  config.mode = target
  modes.get(target)()
}

// ----------------------------------------------------------------------------
// WORDS SELECTOR
// ----------------------------------------------------------------------------

function enableWordsMode() {
  disableDurationButton()
  enableWordsButton()
  hideDurationSelector()
  showWordsSelector()
  testActive
    ? generateTest()
    : prepareTest(newWordsSet)
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  wordsCountInputElement.value = config.words
  updateWordsButtonTitle(config)
}

wordsCountInputElement.addEventListener('change', event => {
  const words = event.target.value
  if (isNaN(words)) return
  changeWordCount(words)
  saveAppConfig()
  prepareTest(newWordsSet)
  focusWords()
})

// ----------------------------------------------------------------------------
// DURATION SELECTOR
// ----------------------------------------------------------------------------

function enableDurationMode() {
  disableWordsButton()
  enableDurationButton()
  hideWordsSelector()
  showDurationSelector()
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function changeDurationConfig(durationString) {
  const duration = parseInt(durationString)
  config.time = duration
  durationInputElement.value = duration
  updateDurationButtonTitle(duration)
}

durationInputElement.addEventListener('change', event => {
  const duration = event.target.value
  if (isNaN(duration)) return
  changeDurationConfig(duration)
  saveAppConfig()
  focusWords()
})

// ----------------------------------------------------------------------------
// CARET
// ----------------------------------------------------------------------------

function updateCaretPosition() {
  const inputLength = currentInput.length
  const wordLength = fetchCurrentWord().length - 1
  const targetLetter = currentWordElement.querySelectorAll('letter')[Math.min(inputLength, wordLength)]
  inputLength > wordLength
    ? moveCaretAfter(targetLetter)
    : moveCaretBefore(targetLetter)
  resetFlashing(caretElement)
}

function moveCaretBefore(letterElement) {
  const newPosition = letterElement.offsetLeft - caretElement.offsetWidth / 2
  caret.style.left = `${newPosition}px`
}

function moveCaretAfter(letterElement) {
  const newPosition = letterElement.offsetLeft + letterElement.offsetWidth - caretElement.offsetWidth / 2
  caret.style.left = `${newPosition}px`
}

// ----------------------------------------------------------------------------
// RESULTS
// ----------------------------------------------------------------------------

function showResult() {
  resultCalculating = true
  resultVisible = true
  testActive = false
  disableFocus()
  hideCaret(caretElement)
  showResultButtonsPanel()
  const stats = generateStats()
  const testtime = stats.time
  const correctcharpercent = roundTo2(
    ((stats.correctChars + stats.correctSpaces) /
      (stats.correctChars + stats.correctSpaces + stats.incorrectChars)) *
      100
  )
  hideTestPanel()
  document.querySelector('#result .main .wpm').textContent = ''.concat(Math.round(stats.wpm))
  document.querySelector('#result .main .wpm').setAttribute('aria-label', `${stats.wpm} (${roundTo2(stats.wpm * 5)}cpm)`)
  document.querySelector('#result .main .acc').textContent = `${Math.floor(stats.acc)}%`
  document.querySelector('#result .main .acc').setAttribute('aria-label', `${stats.acc}%`)
  document.querySelector('#result .details .time').textContent = `${Math.round(testtime)}s`
  document.querySelector('#result .details .char').textContent = `${testtime}s`
  document.querySelector('#result .details .char').setAttribute('aria-label', `${correctcharpercent}%`)
  document.querySelector('#result .details .char').textContent = `${stats.correctChars + stats.correctSpaces}/${stats.incorrectChars}`
  showResultPanel()
}

// ----------------------------------------------------------------------------
// STATS
// ----------------------------------------------------------------------------

function compare(left, right) {
  return Array.from(left)
    .map(zipByIndexWith(right))
    .reduce((accumulator, members) => {
        return members.left === members.right
          ? { ...accumulator, correct: accumulator.correct + 1 }
          : { ...accumulator, incorrect: accumulator.incorrect + 1 }
      },
      { correct: 0, incorrect: 0 }
    )
}

function computeStats(current, { left, right }) {
  const comparison = compare(left, right)
  return {
    ...current,
    correctChars: current.correctChars + comparison.correct,
    correctSpaces: current.correctSpaces + (right === left) ? 1 : 0,
    extraChars: current.extraChars + Math.max(0, right.length - left.length),
    incorrectChars: current.incorrectChars + comparison.incorrect,
    missingChars: current.missingChars + Math.max(0, left.length - right.length),
  }
}

function typingData() {
  const base = {
    correctChars: 0,
    correctSpaces: 0,
    extraChars: 0,
    incorrectChars: 0,
    missingChars: 0,
    spaces: wordsList.length - 1,
  }
  return inputHistory
    .map(zipByIndexWith(wordsList))
    .reduce(computeStats, base)
}

function generateStats() {
  const testSeconds = roundTo2((testEnd - testStart) / 1000)
  const chars = typingData()
  const wpm = roundTo2(((chars.correctChars + chars.correctSpaces) * (60 / testSeconds)) / 5)
  return {
    wpm: isNaN(wpm) ? 0 : wpm,
    acc: roundTo2((accuracyStats.correct / (accuracyStats.correct + accuracyStats.incorrect)) * 100),
    correctChars: chars.correctChars,
    incorrectChars: chars.incorrectChars + chars.extraChars + chars.missingChars,
    allChars: chars.correctChars + chars.spaces + chars.incorrectChars + chars.extraChars,
    time: testSeconds,
    spaces: chars.spaces,
    correctSpaces: chars.correctSpaces,
  }
}

// ----------------------------------------------------------------------------
// TYPING
// ----------------------------------------------------------------------------

function handleTyping(character) {
  const target = fetchCurrentWord().substring(currentInput.length, currentInput.length + 1)
  const isValid = (target === character)
  isValid
    ? accuracyStats.correct++
    : accuracyStats.incorrect++
  currentInput += character
  compareInput(!config.blindMode)
  updateCaretPosition()
  if (isWordCompleted()) jumpToNextWord()
}

function eraseCharacter() {
  if (currentInput.length === 0 && inputHistory.length === 0) return
  const currentWordLength = fetchCurrentWord().length
  if (currentInput.length > currentWordLength) {
    currentInput = currentInput.slice(0, currentWordLength)
  } else if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, - 1)
  } else {
    currentInput = inputHistory.pop()
    currentWordElement = currentWordElement.previousElementSibling
    if (currentWordElement.nextElementSibling.offsetTop > currentWordElement.offsetTop) {
      const wordHeight = currentWordElement.offsetHeight
      const currentLineOffset = wordsElement.style.marginTop
      wordsElement.style.marginTop = `calc(${currentLineOffset} + 2.3rem)`
    }
  }
  compareInput(!config.blindMode)
  updateCaretPosition()
}

function jumpToNextWord() {
  deactivate(currentWordElement)
  if (config.blindMode) currentWordElement.querySelectorAll('letter').forEach(correct)
  if (fetchCurrentWord() === currentInput) {
    accuracyStats.correct++
  } else {
    accuracyStats.incorrect++
    highlightBadWord(currentWordElement, !config.blindMode)
  }
  if (null === currentWordElement.nextSibling) {
    stopTest()
    return
  }
  inputHistory.push(currentInput)
  currentInput = ''
  currentWordElement = currentWordElement.nextElementSibling
  activate(currentWordElement)
  if (currentWordElement.previousElementSibling.offsetTop < currentWordElement.offsetTop) {
    const wordHeight = currentWordElement.offsetHeight
    const currentLineOffset = wordsElement.style.marginTop
    wordsElement.style.marginTop = `calc(${currentLineOffset} - 2.3rem)`
  }
  if (config.mode === 'time') addWordToTest()
  updateCaretPosition()
}

function compareInput(showError) {
  const currentWordContent = fetchCurrentWord()
  let ret = ''
  for (let i = 0; i < currentInput.length; i++) {
    const currentLetter = currentWordContent.charAt(i)
    const charCorrect = (currentLetter === currentInput[i])
    if (charCorrect || false === showError) {
      ret += `<letter class="correct">${currentLetter}</letter>`
    } else if (currentLetter !== '') {
      ret += `<letter class="incorrect">${currentLetter}</letter>`
    }
  }
  if (currentInput.length < currentWordContent.length) {
    for (let i = currentInput.length; i < currentWordContent.length; i++) {
      ret += `<letter>${currentWordContent[i]}</letter>`
    }
  }
  currentInput.length > currentWordContent.length
    ? gotExtraCharacters(currentWordElement)
    : lostExtraCharacters(currentWordElement)
  currentWordElement.innerHTML = ret
}

function highlightBadWord(element, showError) {
  if (false === showError) return
  incorrect(element)
}

function fetchCurrentWord() {
  return currentWordElement.getAttribute('data-value')
}

function focusWords() {
  if (isHidden(wordsWrapperElement)) return
  wordsInputElement.focus()
  updateCaretPosition()
  showCaret(caretElement)
}

// ----------------------------------------------------------------------------
// EVENTS
// ----------------------------------------------------------------------------

modeSelectorElements.forEach(button => button.addEventListener('click', event => {
  if (event.target.classList.contains('active')) return
  changeMode(event.target.getAttribute('mode'))
  saveAppConfig()
  deactivate(button)
  activate(event.target)
  focusWords()
}))

document.addEventListener('mousemove', disableFocus)

blindModeButtonElement.addEventListener('click', toggleBlindMode)

newTestButtonElement.addEventListener('click', () => generateTest())

resetTestButtonElement.addEventListener('click', () => resetTest())

stopTestButtonElement.addEventListener('click', () => resetTest())

wordsWrapperElement.addEventListener('click', focusWords)

document.querySelector('#test-config button:not(.custom)').addEventListener('click', focusWords)

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

wordsInputElement.addEventListener('blur', () => hideCaret(caretElement))

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

// ----------------------------------------------------------------------------
// STORAGE
// ----------------------------------------------------------------------------

function resetTestData() {
  accuracyStats = { correct: 0, incorrect: 0 }
  currentInput = ''
  currentWordElement = document.querySelector('#words .word')
  inputHistory = []
  testActive = false
}

// ----------------------------------------------------------------------------
// TIMER
// ----------------------------------------------------------------------------

function startTestTimer() {
  timer = window.setTimeout(stopTest, config.time * 1000)
}

function stopTestTimer() {
  window.clearTimeout(timer)
}

// ----------------------------------------------------------------------------
// TYPING TEST
// ----------------------------------------------------------------------------

function startTest() {
  resetTestData()
  testActive = true
  testStart = Date.now()
  if (config.mode === 'time') startTestTimer()
  showTestRunningPanel()
}

function stopTest() {
  testEnd = Date.now()
  testActive = false
  stopTestTimer()
  hideCaret(caretElement)
  inputHistory.push(currentInput)
  showResult()
}

function generateTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hideResultPanel()
  prepareTest(newWordsSet)
  showTestPanel()
  focusWords()
}

function resetTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hideResultPanel()
  prepareTest(sameWordsSet)
  showTestPanel()
  focusWords()
}

function prepareTest(before) {
  before()
  prepareWords(wordsElement)
  resetTestData()
  wordsElement.style.marginTop = 0
  activate(currentWordElement)
}

// ----------------------------------------------------------------------------
// USER CONFIG
// ----------------------------------------------------------------------------

function resetConfig() {
  applyConfig({ ...defaultConfig })
  saveAppConfig()
}

function applyConfig(configObj) {
  changeMode(configObj.mode)
  changeDurationConfig(configObj.time, true)
  changeWordCount(configObj.words, true)
  setBlindMode(configObj.blindMode, true)
  Object.keys(defaultConfig).forEach(configKey => {
    if (config[configKey] == undefined) {
      config[configKey] = defaultConfig[configKey]
    }
  })
  return configObj
}

function toggleBlindMode() {
  setBlindMode(!config.blindMode)
  saveAppConfig()
  focusWords()
}

function setBlindMode(blind) {
  config.blindMode = blind
  blind
    ? activate(blindModeButtonElement)
    : deactivate(blindModeButtonElement)
}

// ----------------------------------------------------------------------------
// APPLICATION
// ----------------------------------------------------------------------------

function App() {
  function start() {
    const previousConfig = loadAppConfig(config)
    applyConfig(previousConfig)
    prepareTest(newWordsSet)
    focusWords()
  }

  return Object.freeze({
    start,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const app = App()
  app.start()
})
