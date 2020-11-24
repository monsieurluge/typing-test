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

async function saveConfigToCookie() {
  document.cookie = `${cookieName}=${JSON.stringify(config)}; max-age=31536000; SameSite=Lax`
}

function resetConfig() {
  applyConfig({ ...defaultConfig })
  saveConfigToCookie()
}

function applyConfig(configObj) {
  changeMode(configObj.mode)
  changeTimeConfig(configObj.time, true)
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
  saveConfigToCookie()
}

function setBlindMode(blind) {
  config.blindMode = blind
  blind
    ? activate(blindModeButtonElement)
    : deactivate(blindModeButtonElement)
}

function changeTimeConfig(timeString) {
  const time = parseInt(timeString)
  config.time = time
  document.querySelectorAll('#test-config .time button').forEach(deactivate)
  const timeToDisplay = ([15, 30, 60, 120].includes(time))
    ? time
    : 'custom'
  activate(document.querySelector("#test-config .time button[timeConfig='" + timeToDisplay + "']"))
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  document.querySelectorAll('#test-config .wordCount button').forEach(deactivate)
  const wordCountToDisplay = ([10, 25, 50, 100, 200].includes(wordCount))
    ? wordCount
    : 'custom'
  activate(document.querySelector("#test-config .wordCount button[wordCount='" + wordCountToDisplay + "']"))
}
