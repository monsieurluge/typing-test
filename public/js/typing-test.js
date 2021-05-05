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
