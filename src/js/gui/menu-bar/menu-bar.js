import { enableDurationMode } from './duration-selector.js'
import { enableWordsMode } from './words-selector.js'
import { config } from '../../userconfig.js'

const modes = new Map([
  [ 'time', enableDurationMode ],
  [ 'words', enableWordsMode ],
])

export function changeMode(target) {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  config.mode = target
  modes.get(target)()
}

export function applyMode2Popup() {
  const mode = modePopupElement.getAttribute('mode')
  const val = document.querySelector('#customMode2Popup input').value
  if (mode === 'time') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeDurationConfig(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      resetTest()
    } else {
      showNotification('Custom time must be at least 1', 3000)
    }
  } else if (mode === 'words') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val)
      saveAppConfig()
      hardHide(modePopupWrapperElement)
      generateTest()
    } else {
      showNotification('Custom word amount must be at least 1', 3000)
    }
  }
}
