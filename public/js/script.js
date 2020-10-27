let accuracyStats = { correct: 0, incorrect: 0 }
let caretAnimating = true
let currentInput = ''
let currentTestLine = 0
let currentWordElement = undefined
let currentWordElementIndex = 0
let currentWordIndex = 0
let inputHistory = []
let lineTransition = false
let resultCalculating = false
let resultVisible = false
let sameWordset = false
let testActive = false
let testEnd = 0
let testStart = 0
let time = 0
let timer = null
let wordsList = []

const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight']
const excludedTestKeys = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

const state = {
  current: 'warm up',
  transitions: [
    {
      from: 'warm up',
      to: 'test running',
      validation: () => {
        return (false === testActive && $('#wordsInput').is(':focus'))
      }
    }
  ],
  to: target => callback => {
    const candidates = state.transitions.filter(transition => (state.current === transition.from && target === transition.to))
    if (candidates.length === 0) {
      throw `cannot update the app state from "${state.current}" to "${target}": no transition found`
    }
    if (candidates.length > 1) {
      throw `cannot update the app state from "${state.current}" to "${target}": too many transitions found`
    }
    const valid = candidates.reduce((result, transition) => result && transition.validation(), true)
    if (valid) {
      callback()
    } else {
      throw `cannot update the app state from "${state.current}" to "${target}": invalid context`
    }
  }
}

// -------------------------------------------------------- ELEMENT MANIPULATION

const addClass = className => element => {
  element.classList.add(className)
}

const removeClass = className => element => {
  element.classList.remove(className)
}

const hardHide = element => () => {
  element.addClass('hidden')
}

const hardShow = element => () => {
  element.removeClass('hidden')
}

const softHide = element => onDone => {
  element
    .stop(true, true)
    .animate({ opacity: 0 }, 125, onDone)
    .addClass('hidden')
}

const softShow = element => onDone => {
  element
    .stop(true, true)
    .removeClass('hidden')
    .animate({ opacity: 1 }, 125, onDone)
}

const isHidden = element => element.hasClass('hidden')

const hideBottomPanel = panel => {
  removeClass('opened')(panel)
  removeClass('open')(panel)
  addClass('close')(panel)
}

const enableBottomPanel = name => {
  document.querySelectorAll('.bottom-panel').forEach(hideBottomPanel)
  removeClass('closed')(document.getElementById(name))
  addClass('open')(document.getElementById(name))
}

const showTestConfigPanel = () => {
  enableBottomPanel('test-config')
}

const showResultButtonsPanel = () => {
  enableBottomPanel('result-buttons')
}

const showTestRunningPanel = () => {
  enableBottomPanel('test-running')
}

const hideCaret = hardHide($('#caret'))

const showCaret = () => {
  if (false === isHidden($('#result'))) return
  updateCaretPosition()
  startCaretAnimation()
  hardShow($('#caret'))()
}

const stopCaretAnimation = () => {
  if (false === caretAnimating) return
  $('#caret').css('animation-name', 'none')
  $('#caret').css('opacity', '1')
  caretAnimating = false
}

const startCaretAnimation = () => {
  if (caretAnimating) return
  $('#caret').css('animation-name', 'caretFlash')
  caretAnimating = true
}

// ----------------------------------------------------------- DATA MANIPULATION

const resetTestData = () => {
  accuracyStats = { correct: 0, incorrect: 0 }
  currentInput = ''
  currentTestLine = 0
  currentWordElement = document.querySelector('#words .word')
  currentWordIndex = 0
  currentWordElementIndex = 0
  inputHistory = []
  testActive = false
  time = 0
}

// ------------------------------------------------------------------- FUNCTIONS

const loadCookie = fallback => {
  return document.cookie.split('; ')           // split all the cookies
    .filter(row => row.startsWith(cookieName)) // keep only the app configs
    .map(cookie => cookie.split('=')[1])       // take the configs data
    .map(JSON.parse)                           // convert them to an object
    .concat(fallback)                          // add the default config to the list
    [0]                                        // then return the first config
}

const resetTest = (withSameWordset = false) => {
  stopTestTimer()
  hideCaret()
  disableFocus()
  showTestConfigPanel()
  sameWordset = withSameWordset
  document.getElementById('words').style.marginTop = 0

  softHide($('#result'))(() => {
    if (false === withSameWordset) newWordsSet()
    prepareWords($('#words'))
    resetTestData()
    addClass('active')(currentWordElement)
    updateCaretPosition();
    softShow($('#typingTest'))(focusWords)
  })
}

const focusWords = () => {
  if (isHidden($('#wordsWrapper'))) return
  $('#wordsInput').focus()
}

const enableTimeMode = () => {
  $('#test-config button.mode').removeClass('active')
  $("#test-config button.mode[mode='time']").addClass('active')
  $('#test-config .wordCount').addClass('hidden')
  $('#test-config .time').removeClass('hidden')
}

const enableWordsMode = () => {
  $('#test-config button.mode').removeClass('active')
  $("#test-config button.mode[mode='words']").addClass('active')
  $('#test-config .wordCount').removeClass('hidden')
  $('#test-config .time').addClass('hidden')
}

const changeMode = target =>  {
  if (false === modes.has(target)) throw `cannot change to unknown mode "${target}"`
  modes.get(target)()
  config.mode = target
}

const enableFocus = () => {
  $('#bottom-panels').addClass('focus')
  $('body').css('cursor', 'none')
}

const disableFocus = () => {
  testActive
    ? stopCaretAnimation()
    : startCaretAnimation()
  $('#bottom-panels').removeClass('focus');
  $('body').css('cursor', 'default');
}

const addWordToTest = () => {
  const word = words[Math.floor(Math.random() * words.length)]
  if (wordsList.slice(-2).includes(word)) return // cannot add a new word
  wordsList.push(word)
}

const newWordsSet = () => {
  wordsList = []
  const expectedLength = (config.mode === 'words') ? config.words : 60
  while (wordsList.length < expectedLength) {
    addWordToTest()
  }
}

const isLongTest = () => {
  return (config.mode === 'words' && config.words > 1000)
    || (config.mode === 'time' && config.time > 3600)
}

const clearTimeouts = timeouts => {
  timeouts.forEach(timeout => {
    clearTimeout(timeout)
    timeout = null
  })
}

const modes = new Map([
  ['time', enableTimeMode],
  ['words', enableWordsMode],
])

// ----------------------------------------------------------------- APPLICATION

const startApp = () => {
  applyConfig(loadCookie(defaultConfig))
  // state.to('test running')(resetTest)
  resetTest()
}

// function punctuateWord(previousWord, currentWord, index, maxindex) {
//   let word = currentWord;
//   if (
//     index == 0 ||
//     getLastChar(previousWord) == "." ||
//     getLastChar(previousWord) == "?" ||
//     getLastChar(previousWord) == "!"
//   ) {
//     //always capitalise the first word or if there was a dot
//     word = capitalizeFirstLetter(word);
//   } else if (
//     //10% chance to end a sentence
//     (Math.random() < 0.1 &&
//       getLastChar(previousWord) != "." &&
//       index != maxindex - 2) ||
//     index == maxindex - 1
//   ) {
//     let rand = Math.random();
//     if (rand <= 0.8) {
//       word += ".";
//     } else if (rand > 0.8 && rand < 0.9) {
//       word += "?";
//     } else {
//       word += "!";
//     }
//   } else if (
//     Math.random() < 0.01 &&
//     getLastChar(previousWord) != "," &&
//     getLastChar(previousWord) != "."
//   ) {
//     //1% chance to add quotes
//     word = `"${word}"`;
//   } else if (Math.random() < 0.01) {
//     //1% chance to add a colon
//     word = word + ":";
//   } else if (
//     Math.random() < 0.01 &&
//     getLastChar(previousWord) != "," &&
//     getLastChar(previousWord) != "." &&
//     previousWord != "-"
//   ) {
//     //1% chance to add a dash
//     word = "-";
//   } else if (Math.random() < 0.2 && getLastChar(previousWord) != ",") {
//     //2% chance to add a comma
//     word += ",";
//   }
//   return word;
// }

// function addWord() {
//   let bound = 60;
//   if (
//     wordsList.length - inputHistory.length > bound
//     || (config.mode === "words" && wordsList.length >= config.words)
//   ) return;
//   const wordset = words;
//   let randomWord = wordset[Math.floor(Math.random() * wordset.length)];
//   previousWord = wordsList[wordsList.length - 1];
//   previousWordStripped = previousWord.replace(/[.?!":\-,]/g, "").toLowerCase();
//   previousWord2Stripped = wordsList[wordsList.length - 2]
//     .replace(/[.?!":\-,]/g, "")
//     .toLowerCase();

//   while (
//     previousWordStripped == randomWord
//     || previousWord2Stripped == randomWord
//     || randomWord.indexOf(" ") > -1
//     || (!config.punctuation && randomWord == "I")
//   ) {
//     randomWord = wordset[Math.floor(Math.random() * wordset.length)];
//   }

//   if (config.punctuation) {
//     randomWord = punctuateWord(previousWord, randomWord, wordsList.length, 0);
//   }
//   if (config.numbers) {
//     if (Math.random() < 0.1) {
//       randomWord = getNumbers(4);
//     }
//   }

//   wordsList.push(randomWord);

//   let w = "<div class='word'>";
//   for (let c = 0; c < randomWord.length; c++) {
//     w += "<letter>" + randomWord.charAt(c) + "</letter>";
//   }
//   w += "</div>";
//   $("#words").append(w);
// }

const generateLettersTags = letters => {
  return letters
    .map(letter => `<letter>${letter}</letter>`)
    .join('')
}

const generateWordTags = (content, word) => {
  return content.concat(
    `<div class="word" data-value="${word}">`,
    generateLettersTags(word.split('')),
    '</div>'
  )
}

const prepareWords = container => {
  container.html(wordsList.reduce(generateWordTags, '<div class="filler"></div>'))
}

const activeWordTop = () => currentWordElement.offsetTop

function compareInput(showError) {
  const currentWord = currentWordElement.getAttribute('data-value')
  let ret = ''
  for (let i = 0; i < currentInput.length; i++) {
    const currentLetter = currentWord.charAt(i)
    const charCorrect = (currentLetter === currentInput[i])
    if (charCorrect) {
      ret += `<letter class="correct">${currentLetter}</letter>`
    } else if (currentLetter !== '') {
      ret += `<letter class="incorrect">${currentLetter}</letter>`
    }
  }
  if (currentInput.length < currentWord.length) {
    for (let i = currentInput.length; i < currentWord.length; i++) {
      ret += `<letter>${currentWord[i]}</letter>`
    }
  }
  currentInput.length > currentWord.length
    ? addClass('extra-characters')(currentWordElement)
    : removeClass('extra-characters')(currentWordElement)
  currentWordElement.innerHTML = ret
}

function highlightBadWord(element, showError) {
  if (false === showError) return
  addClass('error')(element)
}

const updateCaretPosition = () => {
  const caret = $('#caret')
  const inputLength = currentInput.length
  const currentLetterIndex = inputLength - 1 < 0 ? 0 : inputLength - 1
  const currentLetter = currentWordElement.querySelectorAll('letter')[currentLetterIndex]
  if ($(currentLetter).length === 0) return
  const currentLetterPosLeft = currentLetter.offsetLeft
  const newLeft = (inputLength === 0)
    ? currentLetterPosLeft - caret.width() / 2
    : currentLetterPosLeft + $(currentLetter).width() - caret.width() / 2
  caret
    .stop(true, true)
    .animate({ left: newLeft }, 100)
}

function countChars() {
  let correctWordChars = 0;
  let correctChars = 0;
  let incorrectChars = 0;
  let extraChars = 0;
  let missedChars = 0;
  let spaces = 0;
  let correctspaces = 0;
  for (let i = 0; i < inputHistory.length; i++) {
    if (inputHistory[i] === "") {
      //last word that was not started
      continue;
    }
    if (inputHistory[i] == wordsList[i]) {
      //the word is correct
      correctWordChars += wordsList[i].length;
      correctChars += wordsList[i].length;
      if (i < inputHistory.length - 1) {
        correctspaces++;
      }
    } else if (inputHistory[i].length >= wordsList[i].length) {
      //too many chars
      for (let c = 0; c < inputHistory[i].length; c++) {
        if (c < wordsList[i].length) {
          //on char that still has a word list pair
          if (inputHistory[i][c] == wordsList[i][c]) {
            correctChars++;
          } else {
            incorrectChars++;
          }
        } else {
          //on char that is extra
          extraChars++;
        }
      }
    } else {
      //not enough chars
      for (let c = 0; c < wordsList[i].length; c++) {
        if (c < inputHistory[i].length) {
          //on char that still has a word list pair
          if (inputHistory[i][c] == wordsList[i][c]) {
            correctChars++;
          } else {
            incorrectChars++;
          }
        } else {
          //on char that is extra
          missedChars++;
        }
      }
    }
    if (i < inputHistory.length - 1) {
      spaces++;
    }
  }
  return {
    spaces: spaces,
    correctWordChars: correctWordChars,
    allCorrectChars: correctChars,
    incorrectChars: incorrectChars,
    extraChars: extraChars,
    missedChars: missedChars,
    correctSpaces: correctspaces,
  };
}

function calculateStats() {
  let testSeconds = roundTo2((testEnd - testStart) / 1000);
  let chars = countChars();
  let wpm = roundTo2(
    ((chars.correctWordChars + chars.correctSpaces) * (60 / testSeconds)) / 5
  );
  let wpmraw = roundTo2(
    ((chars.allCorrectChars +
      chars.spaces +
      chars.incorrectChars +
      chars.extraChars) *
      (60 / testSeconds)) /
      5
  );
  let acc = roundTo2(
    (accuracyStats.correct /
      (accuracyStats.correct + accuracyStats.incorrect)) *
      100
  );
  return {
    wpm: isNaN(wpm) ? 0 : wpm,
    wpmRaw: isNaN(wpmraw) ? 0 : wpmraw,
    acc: acc,
    correctChars: chars.correctWordChars,
    incorrectChars: chars.incorrectChars + chars.extraChars + chars.missedChars,
    allChars:
      chars.allCorrectChars +
      chars.spaces +
      chars.incorrectChars +
      chars.extraChars,
    time: testSeconds,
    spaces: chars.spaces,
    correctSpaces: chars.correctSpaces,
  };
}

function showCustomMode2Popup(mode) {
  if (isHidden($("#customMode2PopupWrapper"))) {
    $("#customMode2PopupWrapper")
      .stop(true, true)
      .css("opacity", 0)
      .removeClass("hidden")
      .animate({ opacity: 1 }, 100, (e) => {
        if (mode == "time") {
          $("#customMode2Popup .text").text("Test length");
          $("#customMode2Popup").attr("mode", "time");
        } else if (mode == "words") {
          $("#customMode2Popup .text").text("Word amount");
          $("#customMode2Popup").attr("mode", "words");
        }
        $("#customMode2Popup input").focus().select();
      });
  }
}

function hideCustomMode2Popup() {
  if (false === isHidden($("#customMode2PopupWrapper"))) {
    $("#customMode2PopupWrapper")
      .stop(true, true)
      .css("opacity", 1)
      .animate(
        {
          opacity: 0,
        },
        100,
        (e) => {
          $("#customMode2PopupWrapper").addClass("hidden");
        }
      );
  }
}

function applyMode2Popup() {
  let mode = $("#customMode2Popup").attr("mode");
  let val = $("#customMode2Popup input").val();

  if (mode == "time") {
    if (val !== null && !isNaN(val) && val > 0) {
      changeTimeConfig(val);
      saveConfigToCookie()
      manualRestart = true;
      restartTest();
      if (val >= 1800) {
        showNotification("Stay safe and take breaks!", 3000);
      }
    } else {
      showNotification("Custom time must be at least 1", 3000);
    }
  } else if (mode == "words") {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val);
      saveConfigToCookie()
      manualRestart = true;
      restartTest();
      if (val > 2000) {
        showNotification("Stay safe and take breaks!", 3000);
      }
    } else {
      showNotification("Custom word amount must be at least 1", 3000);
    }
  }

  hideCustomMode2Popup();
}

function showResult(difficultyFailed = false) {
  resultCalculating = true;
  resultVisible = true;
  testActive = false;
  disableFocus();
  hideCaret();
  showResultButtonsPanel();
  const stats = calculateStats();
  const testtime = stats.time;

  $("#typingTest").addClass("hidden");
  $("#result .main .wpm").text(Math.round(stats.wpm));
  $("#result .main .wpm").attr("aria-label", stats.wpm + ` (${roundTo2(stats.wpm * 5)} cpm)`);
  $("#result .main .acc").text(Math.floor(stats.acc) + "%");
  $("#result .main .acc").attr("aria-label", stats.acc + "%");
  $("#result .details .time").text(Math.round(testtime) + "s");

  let correctcharpercent = roundTo2(
    ((stats.correctChars + stats.correctSpaces) /
      (stats.correctChars + stats.correctSpaces + stats.incorrectChars)) *
      100
  );
  $("#result .details .char").text(testtime + "s");
  $("#result .details .char").attr("aria-label", `${correctcharpercent}%`);
  $("#words").removeClass("blurred");
  $("#result .details .char").text(stats.correctChars + stats.correctSpaces + "/" + stats.incorrectChars);

  setTimeout(function () {
    $("#result").removeClass("hidden").css("opacity", 0).animate(
      {
        opacity: 1,
      },
      125
    );
  }, 125);
}

function startTest() {
  resetTestData()
  testActive = true
  testStart = Date.now()
  if (config.mode === 'time') startTestTimer()
  showTestRunningPanel()
}

function stopTest() {
  testEnd = Date.now()
  testActive = false
  stopTestTimer()
  hideCaret()
  inputHistory.push(currentInput)
  showResult()
}

function startTestTimer() {
  timer = window.setTimeout(stopTest, config.time * 1000)
}

function stopTestTimer() {
  window.clearTimeout(timer)
}

function showCustomMode2Popup(mode) {
  softShow($('#customMode2PopupWrapper'))(() => {
    if (mode === 'time') {
      $('#customMode2Popup .text').text('Test length')
      $('#customMode2Popup').attr('mode', 'time')
    } else if (mode === 'words') {
      $('#customMode2Popup .text').text('Word amount')
      $('#customMode2Popup').attr('mode', 'words')
    }
    $('#customMode2Popup input').focus().select()
  })
}

function hideCustomMode2Popup() {
  softHide($("#customMode2PopupWrapper"))(() => ({}))
}

function applyMode2Popup() {
  const mode = $('#customMode2Popup').attr('mode')
  const val = $('#customMode2Popup input').val()
  if (mode === 'time') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeTimeConfig(val)
      saveConfigToCookie()
      hideCustomMode2Popup()
      resetTest()
    } else {
      showNotification('Custom time must be at least 1', 3000)
    }
  } else if (mode === 'words') {
    if (val !== null && !isNaN(val) && val > 0) {
      changeWordCount(val)
      saveConfigToCookie()
      hideCustomMode2Popup()
      resetTest()
    } else {
      showNotification('Custom word amount must be at least 1', 3000)
    }
  }
}

function handleTyping(character) {
  const target = currentWordElement.getAttribute('data-value').substring(currentInput.length, currentInput.length + 1)
  const isValid = (target === character)
  isValid
    ? accuracyStats.correct++
    : accuracyStats.incorrect++
  currentInput += character
  stopCaretAnimation()
  compareInput(!config.blindMode)
  updateCaretPosition()
}

function eraseCharacter() {
  if (currentInput.length === 0 && inputHistory.length === 0) return
  const currentWord = currentWordElement.getAttribute('data-value')
  if (currentInput.length > currentWord.length) {
    currentInput = currentInput.slice(0, currentWord.length)
  } else if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, - 1)
  } else {
    currentInput = inputHistory.pop()
    currentWordElement = currentWordElement.previousElementSibling
    if (currentWordElement.nextElementSibling.offsetTop > currentWordElement.offsetTop) {
      const wordHeight = currentWordElement.offsetHeight
      const currentLineOffset = document.getElementById('words').style.marginTop
      document.getElementById('words').style.marginTop = `calc(${currentLineOffset} + 2.3rem)`
    }
  }
  compareInput(!config.blindMode)
  updateCaretPosition()
}

function jumpToNextWord() {
  removeClass('active')(currentWordElement)
  if (config.blindMode) addClass('correct')(currentWordElement.querySelectorAll('.letter'))
  if (currentWordElement.getAttribute('data-value') === currentInput) {
    accuracyStats.correct++
  } else {
    accuracyStats.incorrect++
    highlightBadWord(currentWordElement, !config.blindMode)
  }
  inputHistory.push(currentInput)
  currentInput = ''
  if (null === currentWordElement.nextSibling) {
    stopTest()
    return
  }
  currentWordElement = currentWordElement.nextElementSibling
  addClass('active')(currentWordElement)
  if (currentWordElement.previousElementSibling.offsetTop < currentWordElement.offsetTop) {
    const wordHeight = currentWordElement.offsetHeight
    const currentLineOffset = document.getElementById('words').style.marginTop
    document.getElementById('words').style.marginTop = `calc(${currentLineOffset} - 2.3rem)`
  }
  if (config.mode === 'time') addWordToTest()
  updateCaretPosition()
}
