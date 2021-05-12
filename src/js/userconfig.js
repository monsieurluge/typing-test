import { loadCookie, saveContentToCookie } from './lib/cookie.js'
import { changeMode } from './gui/menu-bar/menu-bar.js'
import { changeDurationConfig } from './gui/menu-bar/duration-selector.js'
import { changeWordCount } from './gui/menu-bar/words-selector.js'

const cookieName = 'typing-test-config'

const defaultConfig = {
  blindMode: false,
  mode: 'time',
  numbers: false,
  punctuation: false,
  time: 30,
  words: 50,
}

export let config = { ...defaultConfig }

// --------------------------------------------------------- DEDICATED FUNCTIONS

export const loadAppConfig = loadCookie(cookieName)

export const saveAppConfig = () => saveContentToCookie(cookieName)(config)

// ------------------------------------------------------------------- FUNCTIONS

export function resetConfig() {
  applyConfig({ ...defaultConfig })
  saveAppConfig()
}

export function applyConfig(configObj) {
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

export function toggleBlindMode() {
  setBlindMode(!config.blindMode)
  saveAppConfig()
  focusWords()
}

export function setBlindMode(blind) {
  config.blindMode = blind
  blind
    ? activate(blindModeButtonElement)
    : deactivate(blindModeButtonElement)
}
