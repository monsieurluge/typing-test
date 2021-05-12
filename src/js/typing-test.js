export function startTest() {
  resetTestData()
  testActive = true
  testStart = Date.now()
  if (config.mode === 'time') startTestTimer()
  showTestRunningPanel()
}

export function stopTest() {
  testEnd = Date.now()
  testActive = false
  stopTestTimer()
  hideCaret()
  inputHistory.push(currentInput)
  showResult()
}

export function generateTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hardHide(resultElement)
  prepareTest(newWordsSet)
  hardShow(testElement)
  focusWords()
}

export function resetTest() {
  stopTestTimer()
  disableFocus()
  showTestConfigPanel()
  hardHide(resultElement)
  prepareTest(sameWordsSet)
  hardShow(testElement)
  focusWords()
}

export function prepareTest(before) {
  before()
  prepareWords(wordsElement)
  resetTestData()
  wordsElement.style.marginTop = 0
  activate(currentWordElement)
}
