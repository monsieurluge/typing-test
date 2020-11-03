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
    ? addClass('active')(document.getElementById('blindMode'))
    : removeClass('active')(document.getElementById('blindMode'))
}

function changeTimeConfig(timeString) {
  const time = parseInt(timeString)
  config.time = time
  removeClass('active')(document.querySelector('#test-config .time button'))
  const timeToDisplay = ([15, 30, 60, 120].includes(time))
    ? time
    : 'custom'
  addClass('active')(document.querySelector("#test-config .time button[timeConfig='" + timeString + "']"))
}

function changeWordCount(wordCountString) {
  const wordCount = parseInt(wordCountString)
  config.words = wordCount
  removeClass('active')(document.querySelector('#test-config .wordCount button'))
  const wordCountToDisplay = ([10, 25, 50, 100, 200].includes(wordCount))
    ? wordCount
    : 'custom'
  addClass('active')(document.querySelector("#test-config .wordCount button[wordCount='" + wordCountString + "']"))
}
