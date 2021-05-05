const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Escape']
const excludedTestKeys = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

function handleTyping(character) {
  const target = fetchCurrentWord().substring(currentInput.length, currentInput.length + 1)
  const isValid = (target === character)
  isValid
    ? accuracyStats.correct++
    : accuracyStats.incorrect++
  currentInput += character
  compareInput(!config.blindMode)
  updateCaretPosition()
  if (isWordCompleted()) jumpToNextWord()
}

function eraseCharacter() {
  if (currentInput.length === 0 && inputHistory.length === 0) return
  const currentWordLength = fetchCurrentWord().length
  if (currentInput.length > currentWordLength) {
    currentInput = currentInput.slice(0, currentWordLength)
  } else if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, - 1)
  } else {
    currentInput = inputHistory.pop()
    currentWordElement = currentWordElement.previousElementSibling
    if (currentWordElement.nextElementSibling.offsetTop > currentWordElement.offsetTop) {
      const wordHeight = currentWordElement.offsetHeight
      const currentLineOffset = wordsElement.style.marginTop
      wordsElement.style.marginTop = `calc(${currentLineOffset} + 2.3rem)`
    }
  }
  compareInput(!config.blindMode)
  updateCaretPosition()
}

function jumpToNextWord() {
  deactivate(currentWordElement)
  if (config.blindMode) currentWordElement.querySelectorAll('letter').forEach(correct)
  if (fetchCurrentWord() === currentInput) {
    accuracyStats.correct++
  } else {
    accuracyStats.incorrect++
    highlightBadWord(currentWordElement, !config.blindMode)
  }
  if (null === currentWordElement.nextSibling) {
    stopTest()
    return
  }
  inputHistory.push(currentInput)
  currentInput = ''
  currentWordElement = currentWordElement.nextElementSibling
  activate(currentWordElement)
  if (currentWordElement.previousElementSibling.offsetTop < currentWordElement.offsetTop) {
    const wordHeight = currentWordElement.offsetHeight
    const currentLineOffset = wordsElement.style.marginTop
    wordsElement.style.marginTop = `calc(${currentLineOffset} - 2.3rem)`
  }
  if (config.mode === 'time') addWordToTest()
  updateCaretPosition()
}

function compareInput(showError) {
  const currentWordContent = fetchCurrentWord()
  let ret = ''
  for (let i = 0; i < currentInput.length; i++) {
    const currentLetter = currentWordContent.charAt(i)
    const charCorrect = (currentLetter === currentInput[i])
    if (charCorrect || false === showError) {
      ret += `<letter class="correct">${currentLetter}</letter>`
    } else if (currentLetter !== '') {
      ret += `<letter class="incorrect">${currentLetter}</letter>`
    }
  }
  if (currentInput.length < currentWordContent.length) {
    for (let i = currentInput.length; i < currentWordContent.length; i++) {
      ret += `<letter>${currentWordContent[i]}</letter>`
    }
  }
  currentInput.length > currentWordContent.length
    ? gotExtraCharacters(currentWordElement)
    : lostExtraCharacters(currentWordElement)
  currentWordElement.innerHTML = ret
}

function highlightBadWord(element, showError) {
  if (false === showError) return
  incorrect(element)
}

function fetchCurrentWord() {
  return currentWordElement.getAttribute('data-value')
}

function focusWords() {
  if (isHidden(wordsWrapperElement)) return
  wordsInputElement.focus()
  updateCaretPosition()
  showCaret()
}
