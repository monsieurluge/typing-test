export let accuracyStats      = { correct: 0, incorrect: 0 }
export let currentInput       = ''
export let currentWordElement = undefined
export let inputHistory       = []
export let notificationTimer  = null
export let resultCalculating  = false
export let resultVisible      = false
export let testActive         = false
export let testEnd            = 0
export let testStart          = 0
export let timer              = null
export let wordsList          = []

export function resetTestData() {
  accuracyStats = { correct: 0, incorrect: 0 }
  currentInput = ''
  currentWordElement = document.querySelector('#words .word')
  inputHistory = []
  testActive = false
}
