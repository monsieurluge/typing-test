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

// ----------------------------------------------------------------- APPLICATION

function startApp() {
  applyConfig(loadAppConfig(defaultConfig))
  prepareTest(newWordsSet)
  focusWords()
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

function isWordCompleted() {
  const currentWordContent = fetchCurrentWord()
  return currentWordElement.nextElementSibling === null
    && currentInput.length === currentWordContent.length
    && (config.blindMode || currentInput.slice(-1) === currentWordContent.slice(-1))
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
