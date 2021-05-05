function compare(left, right) {
  return Array.from(left)
    .map(zipByIndexWith(right))
    .reduce((accumulator, members) => {
        return members.left === members.right
          ? { ...accumulator, correct: accumulator.correct + 1 }
          : { ...accumulator, incorrect: accumulator.incorrect + 1 }
      },
      { correct: 0, incorrect: 0 }
    )
}

function computeStats(current, { left, right }) {
  const comparison = compare(left, right)
  return {
    ...current,
    correctChars: current.correctChars + comparison.correct,
    correctSpaces: current.correctSpaces + (right === left) ? 1 : 0,
    extraChars: current.extraChars + Math.max(0, right.length - left.length),
    incorrectChars: current.incorrectChars + comparison.incorrect,
    missingChars: current.missingChars + Math.max(0, left.length - right.length),
  }
}

function typingData() {
  const base = {
    correctChars: 0,
    correctSpaces: 0,
    extraChars: 0,
    incorrectChars: 0,
    missingChars: 0,
    spaces: wordsList.length - 1,
  }
  return inputHistory
    .map(zipByIndexWith(wordsList))
    .reduce(computeStats, base)
}

function generateStats() {
  const testSeconds = roundTo2((testEnd - testStart) / 1000)
  const chars = typingData()
  const wpm = roundTo2(((chars.correctChars + chars.correctSpaces) * (60 / testSeconds)) / 5)
  return {
    wpm: isNaN(wpm) ? 0 : wpm,
    acc: roundTo2((accuracyStats.correct / (accuracyStats.correct + accuracyStats.incorrect)) * 100),
    correctChars: chars.correctChars,
    incorrectChars: chars.incorrectChars + chars.extraChars + chars.missingChars,
    allChars: chars.correctChars + chars.spaces + chars.incorrectChars + chars.extraChars,
    time: testSeconds,
    spaces: chars.spaces,
    correctSpaces: chars.correctSpaces,
  }
}
