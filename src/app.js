import { pipe, roundTo2, zipByIndexWith } from './js/lib/misc'
import { loadCookie, saveContentToCookie } from './js/lib/cookie'
import { words } from './js/dictionaries/english'

// ----------------------------------------------------------------------------
// GLOBAL VARIABLES
// ----------------------------------------------------------------------------

let accuracyStats      = { correct: 0, incorrect: 0 }
let currentInput       = ''
let currentWordElement = undefined
let inputHistory       = []
let notificationTimer  = null
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

const wordsButtonElement = document.getElementById('words-mode-button')
const wordsSelectorElement = document.getElementById('words-selector')
const wordsCountInputElement = document.querySelector('#words-selector input')

const durationButtonElement = document.getElementById('duration-mode-button')
const durationInputElement = document.querySelector('#duration-selector input')
const durationSelectorElement = document.getElementById('duration-selector')

const blindModeButtonElement  = document.getElementById('blind-mode-button')
const bottomPanelsElement     = document.getElementById('bottom-panels')
const caretElement            = document.getElementById('caret')
const modePopupWrapperElement = document.getElementById('customMode2PopupWrapper')
const modePopupElement        = document.getElementById('customMode2Popup')
const modeSelectorElements    = document.querySelectorAll('#test-config button.mode-selector')
const newTestButtonElement    = document.getElementById('new-test-button')
const notificationElement     = document.getElementById('notification')
const resetTestButtonElement  = document.getElementById('reset-test-button')
const resultElement           = document.getElementById('result')
const stopTestButtonElement   = document.getElementById('stop-test-button')
const testElement             = document.getElementById('typing-test')
const wordsElement            = document.getElementById('words')
const wordsInputElement       = document.getElementById('wordsInput')
const wordsWrapperElement     = document.getElementById('wordsWrapper')

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

function generateLettersTags(letters) {
  return letters
    .map(letter => `<letter>${letter}</letter>`)
    .join('')
}

function generateWordTags(content, word) {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
}

function prepareWords(container) {
  container.innerHTML = wordsList.reduce(generateWordTags, '<div class="filler"></div>')
}

// ----------------------------------------------------------------------------
// MENU BAR
// ----------------------------------------------------------------------------

function changeMode(target) {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  config.mode = target
  modes.get(target)()
}

function applyMode2Popup() {
  const mode = modePopupElement.getAttribute('mode')
  const val = document.querySelector('#customMode2Popup input').value
  if (mode === 'time') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeDurationConfig(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      resetTest()
    } else {
      showNotification('Custom time must be at least 1', 3000)
    }
  } else if (mode === 'words') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      generateTest()
    } else {
      showNotification('Custom word amount must be at least 1', 3000)
    }
  }
}

// ----------------------------------------------------------------------------
// WORDS SELECTOR
// ----------------------------------------------------------------------------

function enableWordsMode() {
  deactivate(durationButtonElement)
  activate(wordsButtonElement)
  hardHide(durationSelectorElement)
  hardShow(wordsSelectorElement)
  testActive
    ? generateTest()
    : prepareTest(newWordsSet)
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  wordsCountInputElement.value = config.words
  wordsButtonElement.title = `${config.words} words`
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
  deactivate(wordsButtonElement)
  activate(durationButtonElement)
  hardHide(wordsSelectorElement)
  hardShow(durationSelectorElement)
  testActive
    ? resetTest()
    : prepareTest(newWordsSet)
}

function changeDurationConfig(durationString) {
  const duration = parseInt(durationString)
  config.time = duration
  durationInputElement.value = duration
  durationButtonElement.title = `${duration}s long`
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
// DOM
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// RESULTS
// ----------------------------------------------------------------------------

function showResult() {
  resultCalculating = true
  resultVisible = true
  testActive = false
  disableFocus()
  hideCaret()
  showResultButtonsPanel()
  const stats = generateStats()
  const testtime = stats.time
  const correctcharpercent = roundTo2(
    ((stats.correctChars + stats.correctSpaces) /
      (stats.correctChars + stats.correctSpaces + stats.incorrectChars)) *
      100
  )
  hardHide(testElement)
  document.querySelector('#result .main .wpm').textContent = ''.concat(Math.round(stats.wpm))
  document.querySelector('#result .main .wpm').setAttribute('aria-label', `${stats.wpm} (${roundTo2(stats.wpm * 5)}cpm)`)
  document.querySelector('#result .main .acc').textContent = `${Math.floor(stats.acc)}%`
  document.querySelector('#result .main .acc').setAttribute('aria-label', `${stats.acc}%`)
  document.querySelector('#result .details .time').textContent = `${Math.round(testtime)}s`
  document.querySelector('#result .details .char').textContent = `${testtime}s`
  document.querySelector('#result .details .char').setAttribute('aria-label', `${correctcharpercent}%`)
  document.querySelector('#result .details .char').textContent = `${stats.correctChars + stats.correctSpaces}/${stats.incorrectChars}`
  hardShow(resultElement)
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
// THEMING
// ----------------------------------------------------------------------------

function refreshThemeColorObject() {
  const computedStyle = getComputedStyle(document.body)

  themeColors.bg = computedStyle.getPropertyValue("--bg-color").replace(" ", "")
  themeColors.main = computedStyle.getPropertyValue("--accent-color").replace(" ", "")
  themeColors.caret = computedStyle.getPropertyValue("--accent-color").replace(" ", "")
  themeColors.sub = computedStyle.getPropertyValue("--sub-color").replace(" ", "")
  themeColors.text = computedStyle.getPropertyValue("--text-color").replace(" ", "")
  themeColors.error = computedStyle.getPropertyValue("--error-color").replace(" ", "")
  themeColors.errorExtra = computedStyle.getPropertyValue("--error-extra-color").replace(" ", "")
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
  showCaret()
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
  hideCaret()
  inputHistory.push(currentInput)
  showResult()
}

function generateTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hardHide(resultElement)
  prepareTest(newWordsSet)
  hardShow(testElement)
  focusWords()
}

function resetTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hardHide(resultElement)
  prepareTest(sameWordsSet)
  hardShow(testElement)
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