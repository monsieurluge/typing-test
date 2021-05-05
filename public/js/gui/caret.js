function updateCaretPosition() {
  const inputLength = currentInput.length
  const wordLength = fetchCurrentWord().length - 1
  const targetLetter = currentWordElement.querySelectorAll('letter')[Math.min(inputLength, wordLength)]
  inputLength > wordLength
    ? moveCaretAfter(targetLetter)
    : moveCaretBefore(targetLetter)
  resetFlashing(caretElement)
}

function moveCaretBefore(letterElement) {
  const newPosition = letterElement.offsetLeft - caretElement.offsetWidth / 2
  caret.style.left = `${newPosition}px`
}

function moveCaretAfter(letterElement) {
  const newPosition = letterElement.offsetLeft + letterElement.offsetWidth - caretElement.offsetWidth / 2
  caret.style.left = `${newPosition}px`
}
