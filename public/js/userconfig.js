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

// --------------------------------------------------------- DEDICATED FUNCTIONS

const loadAppConfig = loadCookie(cookieName)

const saveAppConfig = () => saveContentToCookie(cookieName)(config)

// ------------------------------------------------------------------- FUNCTIONS

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
