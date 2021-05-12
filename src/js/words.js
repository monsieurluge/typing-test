import { wordsList } from './storage'

export function isWordCompleted() {
  const currentWordContent = fetchCurrentWord()
  return currentWordElement.nextElementSibling === null
    && currentInput.length === currentWordContent.length
    && (config.blindMode || currentInput.slice(-1) === currentWordContent.slice(-1))
}

export function addWordToTest() {
  const word = words[Math.floor(Math.random() * words.length)]
  if (wordsList.slice(-2).includes(word)) return // cannot add a new word
  wordsList.push(word)
}

export function newWordsSet() {
  wordsList = []
  const expectedLength = (config.mode === 'words') ? config.words : 60
  while (wordsList.length < expectedLength) {
    addWordToTest()
  }
}

export function sameWordsSet() {} // do nothing, on purpose

export function generateLettersTags(letters) {
  return letters
    .map(letter => `<letter>${letter}</letter>`)
    .join('')
}

export function generateWordTags(content, word) {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
}

export function prepareWords(container) {
  container.innerHTML = wordsList.reduce(generateWordTags, '<div class="filler"></div>')
}
