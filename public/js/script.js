const cookieName = 'typing-test-config'
const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Escape']
const excludedTestKeys = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

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

// ----------------------------------------------------------- DATA MANIPULATION

function resetTestData() {
  accuracyStats = { correct: 0, incorrect: 0 }
  currentInput = ''
  currentWordElement = document.querySelector('#words .word')
  inputHistory = []
  testActive = false
}

// ------------------------------------------------------- SPECIALIZED FUNCTIONS

const loadAppConfig = loadCookie(cookieName)

const saveAppConfig = () => saveContentToCookie(cookieName)(config)

// ------------------------------------------------------------------- FUNCTIONS

function fetchCurrentWord() {
  return currentWordElement.getAttribute('data-value')
}

function newTest() {
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

function focusWords() {
  if (isHidden(wordsWrapperElement)) return
  wordsInputElement.focus()
  updateCaretPosition()
  showCaret()
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

// ----------------------------------------------------------------- APPLICATION

function startApp() {
  applyConfig(loadAppConfig(defaultConfig))
  prepareTest(newWordsSet)
  focusWords()
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

function showResult() {
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

function testCompleted() {
  const currentWordContent = fetchCurrentWord()
  return currentWordElement.nextElementSibling === null
    && currentInput.length === currentWordContent.length
    && (config.blindMode || currentInput.slice(-1) === currentWordContent.slice(-1))
}

function handleTyping(character) {
  const target = fetchCurrentWord().substring(currentInput.length, currentInput.length + 1)
  const isValid = (target === character)
  isValid
    ? accuracyStats.correct++
    : accuracyStats.incorrect++
  currentInput += character
  compareInput(!config.blindMode)
  updateCaretPosition()
  if (testCompleted()) jumpToNextWord()
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
  inputHistory.push(currentInput)
  currentInput = ''
  if (null === currentWordElement.nextSibling) {
    stopTest()
    return
  }
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
