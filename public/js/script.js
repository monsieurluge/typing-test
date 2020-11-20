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

const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight']
const excludedTestKeys     = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

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

// ----------------------------------------------------------- DATA MANIPULATION

const resetTestData = () => {
  accuracyStats = { correct: 0, incorrect: 0 }
  currentInput = ''
  currentWordElement = document.querySelector('#words .word')
  inputHistory = []
  testActive = false
}

// ------------------------------------------------------------------- FUNCTIONS

const hideCaret = hardHide(caretElement)

const showCaret = () => {
  if (false === isHidden(resultElement)) return
  updateCaretPosition()
  hardShow(caretElement)()
  addClass('flashing')(caretElement)
}

const loadCookie = fallback => {
  return document.cookie.split('; ')           // split all the cookies
    .filter(row => row.startsWith(cookieName)) // keep only the app configs
    .map(cookie => cookie.split('=')[1])       // take the configs data
    .map(JSON.parse)                           // convert them to an object
    .concat(fallback)                          // add the default config to the list
    [0]                                        // then return the first config
}

const resetTest = (withSameWordset = false) => {
  stopTestTimer()
  showTestConfigPanel()
  wordsElement.style.marginTop = 0
  softHide(resultElement)(() => {
    prepareTest(withSameWordset)
    softShow(testElement)(focusWords)
  })
}

const prepareTest = (withSameWordset = false) => {
  if (false === withSameWordset) newWordsSet()
  prepareWords(wordsElement)
  resetTestData()
  addClass('active')(currentWordElement)
  updateCaretPosition()
}

const focusWords = () => {
  if (isHidden(wordsWrapperElement)) return
  wordsInputElement.focus()
}

const enableTimeMode = () => {
  document.querySelectorAll('#test-config button.mode').forEach(removeClass('active'))
  addClass('active')(document.querySelector('#test-config button.mode[mode="time"]'))
  addClass('hidden')(document.querySelector('#test-config .wordCount'))
  document.querySelectorAll('#test-config .time').forEach(removeClass('hidden'))
  testActive
    ? resetTest()
    : prepareTest()
}

const enableWordsMode = () => {
  document.querySelectorAll('#test-config button.mode').forEach(removeClass('active'))
  addClass('active')(document.querySelector('#test-config button.mode[mode="words"]'))
  addClass('hidden')(document.querySelector('#test-config .time'))
  document.querySelectorAll('#test-config .wordCount').forEach(removeClass('hidden'))
  testActive
    ? resetTest()
    : prepareTest()
}

const changeMode = target =>  {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  modes.get(target)()
  config.mode = target
}

const enableFocus = () => {
  addClass('focus')(bottomPanelsElement)
  addClass('no-cursor')(document.querySelector('body'))
}

const disableFocus = () => {
  removeClass('focus')(bottomPanelsElement)
  removeClass('no-cursor')(document.querySelector('body'))
}

const addWordToTest = () => {
  const word = words[Math.floor(Math.random() * words.length)]
  if (wordsList.slice(-2).includes(word)) return // cannot add a new word
  wordsList.push(word)
}

const newWordsSet = () => {
  wordsList = []
  const expectedLength = (config.mode === 'words') ? config.words : 60
  while (wordsList.length < expectedLength) {
    addWordToTest()
  }
}

const modes = new Map([
  ['time', enableTimeMode],
  ['words', enableWordsMode],
])

// ----------------------------------------------------------------- APPLICATION

const startApp = () => {
  applyConfig(loadCookie(defaultConfig))
  prepareTest()
}
const generateLettersTags = letters => {
  return letters
    .map(letter => `<letter>${letter}</letter>`)
    .join('')
}

const generateWordTags = (content, word) => {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
}

const prepareWords = container => {
  container.innerHTML = wordsList.reduce(generateWordTags, '<div class="filler"></div>')
}

function compareInput(showError) {
  const currentWord = currentWordElement.getAttribute('data-value')
  let ret = ''
  for (let i = 0; i < currentInput.length; i++) {
    const currentLetter = currentWord.charAt(i)
    const charCorrect = (currentLetter === currentInput[i])
    if (charCorrect || false === showError) {
      ret += `<letter class="correct">${currentLetter}</letter>`
    } else if (currentLetter !== '') {
      ret += `<letter class="incorrect">${currentLetter}</letter>`
    }
  }
  if (currentInput.length < currentWord.length) {
    for (let i = currentInput.length; i < currentWord.length; i++) {
      ret += `<letter>${currentWord[i]}</letter>`
    }
  }
  currentInput.length > currentWord.length
    ? addClass('extra-characters')(currentWordElement)
    : removeClass('extra-characters')(currentWordElement)
  currentWordElement.innerHTML = ret
}

function highlightBadWord(element, showError) {
  if (false === showError) return
  addClass('error')(element)
}

const updateCaretPosition = () => {
  const inputLength = currentInput.length
  const currentLetterIndex = inputLength - 1 < 0 ? 0 : inputLength - 1
  const currentLetter = currentWordElement.querySelectorAll('letter')[currentLetterIndex]
  if (currentLetter === undefined) return
  const currentLetterPosLeft = currentLetter.offsetLeft
  const newLeft = (inputLength === 0)
    ? currentLetterPosLeft - caretElement.offsetWidth / 2
    : currentLetterPosLeft + currentLetter.offsetWidth - caretElement.offsetWidth / 2
  caret.style.left = `${newLeft}px`
  removeClass('flashing')(caretElement)
  caretElement.offsetWidth
  addClass('flashing')(caretElement)
}

function countChars() {
  let correctWordChars = 0;
  let correctChars = 0;
  let incorrectChars = 0;
  let extraChars = 0;
  let missedChars = 0;
  let spaces = 0;
  let correctspaces = 0;
  for (let i = 0; i < inputHistory.length; i++) {
    if (inputHistory[i] === "") {
      //last word that was not started
      continue;
    }
    if (inputHistory[i] == wordsList[i]) {
      //the word is correct
      correctWordChars += wordsList[i].length;
      correctChars += wordsList[i].length;
      if (i < inputHistory.length - 1) {
        correctspaces++;
      }
    } else if (inputHistory[i].length >= wordsList[i].length) {
      //too many chars
      for (let c = 0; c < inputHistory[i].length; c++) {
        if (c < wordsList[i].length) {
          //on char that still has a word list pair
          if (inputHistory[i][c] == wordsList[i][c]) {
            correctChars++;
          } else {
            incorrectChars++;
          }
        } else {
          //on char that is extra
          extraChars++;
        }
      }
    } else {
      //not enough chars
      for (let c = 0; c < wordsList[i].length; c++) {
        if (c < inputHistory[i].length) {
          //on char that still has a word list pair
          if (inputHistory[i][c] == wordsList[i][c]) {
            correctChars++;
          } else {
            incorrectChars++;
          }
        } else {
          //on char that is extra
          missedChars++;
        }
      }
    }
    if (i < inputHistory.length - 1) {
      spaces++;
    }
  }
  return {
    spaces: spaces,
    correctWordChars: correctWordChars,
    allCorrectChars: correctChars,
    incorrectChars: incorrectChars,
    extraChars: extraChars,
    missedChars: missedChars,
    correctSpaces: correctspaces,
  };
}

function calculateStats() {
  let testSeconds = roundTo2((testEnd - testStart) / 1000);
  let chars = countChars();
  let wpm = roundTo2(
    ((chars.correctWordChars + chars.correctSpaces) * (60 / testSeconds)) / 5
  );
  let wpmraw = roundTo2(
    ((chars.allCorrectChars +
      chars.spaces +
      chars.incorrectChars +
      chars.extraChars) *
      (60 / testSeconds)) /
      5
  );
  let acc = roundTo2(
    (accuracyStats.correct /
      (accuracyStats.correct + accuracyStats.incorrect)) *
      100
  );
  return {
    wpm: isNaN(wpm) ? 0 : wpm,
    wpmRaw: isNaN(wpmraw) ? 0 : wpmraw,
    acc: acc,
    correctChars: chars.correctWordChars,
    incorrectChars: chars.incorrectChars + chars.extraChars + chars.missedChars,
    allChars:
      chars.allCorrectChars +
      chars.spaces +
      chars.incorrectChars +
      chars.extraChars,
    time: testSeconds,
    spaces: chars.spaces,
    correctSpaces: chars.correctSpaces,
  };
}

function showResult(difficultyFailed = false) {
  resultCalculating = true
  resultVisible = true
  testActive = false
  disableFocus()
  hideCaret()
  showResultButtonsPanel()
  const stats = calculateStats()
  const testtime = stats.time
  const correctcharpercent = roundTo2(
    ((stats.correctChars + stats.correctSpaces) /
      (stats.correctChars + stats.correctSpaces + stats.incorrectChars)) *
      100
  )

  addClass('hidden')(testElement)
  document.querySelector('#result .main .wpm').textContent = ''.concat(Math.round(stats.wpm))
  document.querySelector('#result .main .wpm').setAttribute('aria-label', `${stats.wpm} (${roundTo2(stats.wpm * 5)}cpm)`)
  document.querySelector('#result .main .acc').textContent = `${Math.floor(stats.acc)}%`
  document.querySelector('#result .main .acc').setAttribute('aria-label', `${stats.acc}%`)
  document.querySelector('#result .details .time').textContent = `${Math.round(testtime)}s`
  document.querySelector('#result .details .char').textContent = `${testtime}s`
  document.querySelector('#result .details .char').setAttribute('aria-label', `${correctcharpercent}%`)
  document.querySelector('#result .details .char').textContent = `${stats.correctChars + stats.correctSpaces}/${stats.incorrectChars}`

  softShow(resultElement)(() => ({}))
}

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

function startTestTimer() {
  timer = window.setTimeout(stopTest, config.time * 1000)
}

function stopTestTimer() {
  window.clearTimeout(timer)
}

function showCustomMode2Popup(mode) {
  softShow(modePopupWrapperElement)(() => {
    if (mode === 'time') {
      document.querySelector('#customMode2Popup .title').textContent = 'Test length'
      modePopupElement.setAttribute('mode', 'time')
    } else if (mode === 'words') {
      document.querySelector('#customMode2Popup .title').textContent = 'Word amount'
      modePopupElement.setAttribute('mode', 'words')
    }
    focusWords()
  })
}

function hideCustomMode2Popup() {
  softHide(modePopupWrapperElement)(() => ({}))
}

function applyMode2Popup() {
  const mode = modePopupElement.getAttribute('mode')
  const val = document.querySelector('#customMode2Popup input').value
  if (mode === 'time') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeTimeConfig(val)
      saveConfigToCookie()
      hideCustomMode2Popup()
      resetTest()
    } else {
      showNotification('Custom time must be at least 1', 3000)
    }
  } else if (mode === 'words') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val)
      saveConfigToCookie()
      hideCustomMode2Popup()
      resetTest()
    } else {
      showNotification('Custom word amount must be at least 1', 3000)
    }
  }
}

function handleTyping(character) {
  const target = currentWordElement.getAttribute('data-value').substring(currentInput.length, currentInput.length + 1)
  const isValid = (target === character)
  isValid
    ? accuracyStats.correct++
    : accuracyStats.incorrect++
  currentInput += character
  compareInput(!config.blindMode)
  updateCaretPosition()
}

function eraseCharacter() {
  if (currentInput.length === 0 && inputHistory.length === 0) return
  const currentWord = currentWordElement.getAttribute('data-value')
  if (currentInput.length > currentWord.length) {
    currentInput = currentInput.slice(0, currentWord.length)
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
  removeClass('active')(currentWordElement)
  if (config.blindMode) currentWordElement.querySelectorAll('letter').forEach(addClass('correct'))
  if (currentWordElement.getAttribute('data-value') === currentInput) {
    accuracyStats.correct++
  } else {
    accuracyStats.incorrect++
    highlightBadWord(currentWordElement, !config.blindMode)
  }
  inputHistory.push(currentInput)
  currentInput = ''
  if (null === currentWordElement.nextSibling) {
    stopTest()
    return
  }
  currentWordElement = currentWordElement.nextElementSibling
  addClass('active')(currentWordElement)
  if (currentWordElement.previousElementSibling.offsetTop < currentWordElement.offsetTop) {
    const wordHeight = currentWordElement.offsetHeight
    const currentLineOffset = wordsElement.style.marginTop
    wordsElement.style.marginTop = `calc(${currentLineOffset} - 2.3rem)`
  }
  if (config.mode === 'time') addWordToTest()
  updateCaretPosition()
}
