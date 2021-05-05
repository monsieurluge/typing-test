function App(config) {
  function start() {
    applyConfig(loadAppConfig(config))
    prepareTest(newWordsSet)
    focusWords()
  }

  return Object.freeze({
    start,
  })
}
