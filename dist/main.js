/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_userconfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/userconfig.js */ \"./src/js/userconfig.js\");\n/* harmony import */ var _js_typing_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/typing-test.js */ \"./src/js/typing-test.js\");\n/* harmony import */ var _js_words_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/words.js */ \"./src/js/words.js\");\n/* harmony import */ var _js_gui_typing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/gui/typing.js */ \"./src/js/gui/typing.js\");\n/* harmony import */ var _js_gui_typing_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_gui_typing_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction App(config) {\n  function start() {\n    (0,_js_userconfig_js__WEBPACK_IMPORTED_MODULE_0__.applyConfig)((0,_js_userconfig_js__WEBPACK_IMPORTED_MODULE_0__.loadAppConfig)(config))\n    ;(0,_js_typing_test_js__WEBPACK_IMPORTED_MODULE_1__.prepareTest)(_js_words_js__WEBPACK_IMPORTED_MODULE_2__.newWordsSet)\n    ;(0,_js_gui_typing_js__WEBPACK_IMPORTED_MODULE_3__.focusWords)()\n  }\n\n  return Object.freeze({\n    start,\n  })\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const defaultConfig = {\n    blindMode: false,\n    mode: 'time',\n    numbers: false,\n    punctuation: false,\n    time: 30,\n    words: 50,\n  }\n  const app = App(defaultConfig)\n  app.start()\n})\n\n\n//# sourceURL=webpack://typingtest/./src/app.js?");

/***/ }),

/***/ "./src/js/gui/dom.js":
/*!***************************!*\
  !*** ./src/js/gui/dom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"blindModeButtonElement\": () => (/* binding */ blindModeButtonElement),\n/* harmony export */   \"bottomPanelsElement\": () => (/* binding */ bottomPanelsElement),\n/* harmony export */   \"caretElement\": () => (/* binding */ caretElement),\n/* harmony export */   \"modePopupWrapperElement\": () => (/* binding */ modePopupWrapperElement),\n/* harmony export */   \"modePopupElement\": () => (/* binding */ modePopupElement),\n/* harmony export */   \"modeSelectorElements\": () => (/* binding */ modeSelectorElements),\n/* harmony export */   \"newTestButtonElement\": () => (/* binding */ newTestButtonElement),\n/* harmony export */   \"notificationElement\": () => (/* binding */ notificationElement),\n/* harmony export */   \"resetTestButtonElement\": () => (/* binding */ resetTestButtonElement),\n/* harmony export */   \"resultElement\": () => (/* binding */ resultElement),\n/* harmony export */   \"stopTestButtonElement\": () => (/* binding */ stopTestButtonElement),\n/* harmony export */   \"testElement\": () => (/* binding */ testElement),\n/* harmony export */   \"wordsElement\": () => (/* binding */ wordsElement),\n/* harmony export */   \"wordsInputElement\": () => (/* binding */ wordsInputElement),\n/* harmony export */   \"wordsWrapperElement\": () => (/* binding */ wordsWrapperElement),\n/* harmony export */   \"refresh\": () => (/* binding */ refresh),\n/* harmony export */   \"addClass\": () => (/* binding */ addClass),\n/* harmony export */   \"removeClass\": () => (/* binding */ removeClass),\n/* harmony export */   \"isHidden\": () => (/* binding */ isHidden),\n/* harmony export */   \"isVisible\": () => (/* binding */ isVisible),\n/* harmony export */   \"hardHide\": () => (/* binding */ hardHide),\n/* harmony export */   \"hardShow\": () => (/* binding */ hardShow),\n/* harmony export */   \"activate\": () => (/* binding */ activate),\n/* harmony export */   \"deactivate\": () => (/* binding */ deactivate),\n/* harmony export */   \"correct\": () => (/* binding */ correct),\n/* harmony export */   \"incorrect\": () => (/* binding */ incorrect),\n/* harmony export */   \"gotExtraCharacters\": () => (/* binding */ gotExtraCharacters),\n/* harmony export */   \"lostExtraCharacters\": () => (/* binding */ lostExtraCharacters),\n/* harmony export */   \"resetAnimation\": () => (/* binding */ resetAnimation),\n/* harmony export */   \"resetFlashing\": () => (/* binding */ resetFlashing),\n/* harmony export */   \"open\": () => (/* binding */ open),\n/* harmony export */   \"close\": () => (/* binding */ close),\n/* harmony export */   \"openBottomPanel\": () => (/* binding */ openBottomPanel),\n/* harmony export */   \"opened\": () => (/* binding */ opened),\n/* harmony export */   \"closeBottomPanel\": () => (/* binding */ closeBottomPanel),\n/* harmony export */   \"closed\": () => (/* binding */ closed),\n/* harmony export */   \"enableBottomPanel\": () => (/* binding */ enableBottomPanel),\n/* harmony export */   \"showTestConfigPanel\": () => (/* binding */ showTestConfigPanel),\n/* harmony export */   \"showResultButtonsPanel\": () => (/* binding */ showResultButtonsPanel),\n/* harmony export */   \"showTestRunningPanel\": () => (/* binding */ showTestRunningPanel),\n/* harmony export */   \"hideCaret\": () => (/* binding */ hideCaret),\n/* harmony export */   \"showCaret\": () => (/* binding */ showCaret),\n/* harmony export */   \"enableFocus\": () => (/* binding */ enableFocus),\n/* harmony export */   \"disableFocus\": () => (/* binding */ disableFocus),\n/* harmony export */   \"showCustomMode2Popup\": () => (/* binding */ showCustomMode2Popup),\n/* harmony export */   \"showNotification\": () => (/* binding */ showNotification)\n/* harmony export */ });\n/* harmony import */ var _lib_misc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/misc.js */ \"./src/js/lib/misc.js\");\n\n\n// ---------------------------------------------------------- FIXED DOM ELEMENTS\n\nconst blindModeButtonElement  = document.getElementById('blind-mode-button')\nconst bottomPanelsElement     = document.getElementById('bottom-panels')\nconst caretElement            = document.getElementById('caret')\nconst modePopupWrapperElement = document.getElementById('customMode2PopupWrapper')\nconst modePopupElement        = document.getElementById('customMode2Popup')\nconst modeSelectorElements    = document.querySelectorAll('#test-config button.mode-selector')\nconst newTestButtonElement    = document.getElementById('new-test-button')\nconst notificationElement     = document.getElementById('notification')\nconst resetTestButtonElement  = document.getElementById('reset-test-button')\nconst resultElement           = document.getElementById('result')\nconst stopTestButtonElement   = document.getElementById('stop-test-button')\nconst testElement             = document.getElementById('typing-test')\nconst wordsElement            = document.getElementById('words')\nconst wordsInputElement       = document.getElementById('wordsInput')\nconst wordsWrapperElement     = document.getElementById('wordsWrapper')\n\n// ---------------------------------------------------- GENERIC DOM MANIPULATION\n\nconst refresh = element => {\n  element.offsetWidth\n  return element\n}\n\nconst addClass = className => element => {\n  element.classList.add(className)\n  return element\n}\n\nconst removeClass = className => element => {\n  element.classList.remove(className)\n  return element\n}\n\nconst isHidden = element => element.classList.contains('hidden')\n\nconst isVisible = element => false === element.classList.contains('hidden')\n\nconst hardHide = addClass('hidden')\n\nconst hardShow = removeClass('hidden')\n\nconst activate = addClass('active')\n\nconst deactivate = removeClass('active')\n\nconst correct = addClass('correct')\n\nconst incorrect = addClass('error')\n\nconst gotExtraCharacters = addClass('extra-characters')\n\nconst lostExtraCharacters = removeClass('extra-characters')\n\nconst resetAnimation = className => (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  removeClass(className),\n  refresh,\n  addClass(className)\n)\n\nconst resetFlashing = resetAnimation('flashing')\n\nconst open = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  removeClass('closing'),\n  removeClass('closed'),\n  hardShow\n)\n\nconst close = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  removeClass('opening'),\n  removeClass('opened')\n)\n\nconst openBottomPanel = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  open,\n  addClass('opening'),\n  refresh\n)\n\nconst opened = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  addClass('opened'),\n  removeClass('opening')\n)\n\nconst closeBottomPanel = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  close,\n  addClass('closing'),\n  refresh\n)\n\nconst closed = (0,_lib_misc_js__WEBPACK_IMPORTED_MODULE_0__.pipe)(\n  addClass('closed'),\n  removeClass('closing'),\n  hardHide\n)\n\n// -------------------------------------------------- DEDICATED DOM MANIPULATION\n\nfunction enableBottomPanel(name) {\n  document.querySelectorAll('.bottom-panel').forEach(panel => {\n    panel.id === name\n      ? openBottomPanel(panel)\n      : closeBottomPanel(panel)\n  })\n}\n\nfunction showTestConfigPanel() {\n  enableBottomPanel('test-config')\n}\n\nfunction showResultButtonsPanel() {\n  enableBottomPanel('result-buttons')\n}\n\nfunction showTestRunningPanel() {\n  enableBottomPanel('test-running')\n}\n\nfunction hideCaret() {\n  hardHide(caretElement)\n}\n\nfunction showCaret() {\n  if (isVisible(resultElement)) return\n  hardShow(caretElement)\n  resetFlashing(caretElement)\n}\n\nfunction enableFocus() {\n  addClass('focus')(bottomPanelsElement)\n  addClass('no-cursor')(document.querySelector('body'))\n}\n\nfunction disableFocus() {\n  removeClass('focus')(bottomPanelsElement)\n  removeClass('no-cursor')(document.querySelector('body'))\n}\n\nfunction showCustomMode2Popup(mode) {\n  hardShow(modePopupWrapperElement)\n  if (mode === 'time') {\n    document.querySelector('#customMode2Popup .title').textContent = 'Test length'\n    modePopupElement.setAttribute('mode', 'time')\n  } else if (mode === 'words') {\n    document.querySelector('#customMode2Popup .title').textContent = 'Word amount'\n    modePopupElement.setAttribute('mode', 'words')\n  }\n  focusWords()\n}\n\nfunction showNotification(text, time) {\n  clearTimeout(notificationTimer)\n  notificationElement.textContent = text\n  addClass('displayed')(notificationElement)\n  notificationTimer = setTimeout(() => removeClass('displayed')(notificationElement), 4000)\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/gui/dom.js?");

/***/ }),

/***/ "./src/js/gui/menu-bar/duration-selector.js":
/*!**************************************************!*\
  !*** ./src/js/gui/menu-bar/duration-selector.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"durationButtonElement\": () => (/* binding */ durationButtonElement),\n/* harmony export */   \"durationInputElement\": () => (/* binding */ durationInputElement),\n/* harmony export */   \"durationSelectorElement\": () => (/* binding */ durationSelectorElement),\n/* harmony export */   \"enableDurationMode\": () => (/* binding */ enableDurationMode),\n/* harmony export */   \"changeDurationConfig\": () => (/* binding */ changeDurationConfig)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ \"./src/js/gui/dom.js\");\n/* harmony import */ var _words_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./words-selector.js */ \"./src/js/gui/menu-bar/words-selector.js\");\n/* harmony import */ var _typing_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typing-test.js */ \"./src/js/typing-test.js\");\n/* harmony import */ var _words_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../words.js */ \"./src/js/words.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../storage.js */ \"./src/js/storage.js\");\n\n\n\n\n\n\nconst durationButtonElement = document.getElementById('duration-mode-button')\nconst durationInputElement = document.querySelector('#duration-selector input')\nconst durationSelectorElement = document.getElementById('duration-selector')\n\nfunction enableDurationMode() {\n  ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.deactivate)(_words_selector_js__WEBPACK_IMPORTED_MODULE_1__.wordsButtonElement)\n  ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.activate)(durationButtonElement)\n  ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.hardHide)(_words_selector_js__WEBPACK_IMPORTED_MODULE_1__.wordsSelectorElement)\n  ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.hardShow)(durationSelectorElement)\n  _storage_js__WEBPACK_IMPORTED_MODULE_4__.testActive\n    ? (0,_typing_test_js__WEBPACK_IMPORTED_MODULE_2__.resetTest)()\n    : (0,_typing_test_js__WEBPACK_IMPORTED_MODULE_2__.prepareTest)(_words_js__WEBPACK_IMPORTED_MODULE_3__.newWordsSet)\n}\n\nfunction changeDurationConfig(durationString) {\n  const duration = parseInt(durationString)\n  config.time = duration\n  durationInputElement.value = duration\n  durationButtonElement.title = `${duration}s long`\n}\n\ndurationInputElement.addEventListener('change', event => {\n  const duration = event.target.value\n  if (isNaN(duration)) return\n  changeDurationConfig(duration)\n  saveAppConfig()\n  focusWords()\n})\n\n\n//# sourceURL=webpack://typingtest/./src/js/gui/menu-bar/duration-selector.js?");

/***/ }),

/***/ "./src/js/gui/menu-bar/menu-bar.js":
/*!*****************************************!*\
  !*** ./src/js/gui/menu-bar/menu-bar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeMode\": () => (/* binding */ changeMode),\n/* harmony export */   \"applyMode2Popup\": () => (/* binding */ applyMode2Popup)\n/* harmony export */ });\n/* harmony import */ var _duration_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./duration-selector.js */ \"./src/js/gui/menu-bar/duration-selector.js\");\n/* harmony import */ var _words_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./words-selector.js */ \"./src/js/gui/menu-bar/words-selector.js\");\n/* harmony import */ var _userconfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../userconfig.js */ \"./src/js/userconfig.js\");\n\n\n\n\nconst modes = new Map([\n  [ 'time', _duration_selector_js__WEBPACK_IMPORTED_MODULE_0__.enableDurationMode ],\n  [ 'words', _words_selector_js__WEBPACK_IMPORTED_MODULE_1__.enableWordsMode ],\n])\n\nfunction changeMode(target) {\n  if (false === modes.has(target)) throw `cannot change to unknown mode \"${target}\"`\n  _userconfig_js__WEBPACK_IMPORTED_MODULE_2__.config.mode = target\n  modes.get(target)()\n}\n\nfunction applyMode2Popup() {\n  const mode = modePopupElement.getAttribute('mode')\n  const val = document.querySelector('#customMode2Popup input').value\n  if (mode === 'time') {\n    if (val !== null && !isNaN(val) && val > 0) {\n      changeDurationConfig(val)\n      saveAppConfig()\n      hardHide(modePopupWrapperElement)\n      resetTest()\n    } else {\n      showNotification('Custom time must be at least 1', 3000)\n    }\n  } else if (mode === 'words') {\n    if (val !== null && !isNaN(val) && val > 0) {\n      changeWordCount(val)\n      saveAppConfig()\n      hardHide(modePopupWrapperElement)\n      generateTest()\n    } else {\n      showNotification('Custom word amount must be at least 1', 3000)\n    }\n  }\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/gui/menu-bar/menu-bar.js?");

/***/ }),

/***/ "./src/js/gui/menu-bar/words-selector.js":
/*!***********************************************!*\
  !*** ./src/js/gui/menu-bar/words-selector.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"wordsButtonElement\": () => (/* binding */ wordsButtonElement),\n/* harmony export */   \"wordsSelectorElement\": () => (/* binding */ wordsSelectorElement),\n/* harmony export */   \"wordsCountInputElement\": () => (/* binding */ wordsCountInputElement),\n/* harmony export */   \"enableWordsMode\": () => (/* binding */ enableWordsMode),\n/* harmony export */   \"changeWordCount\": () => (/* binding */ changeWordCount)\n/* harmony export */ });\nconst wordsButtonElement = document.getElementById('words-mode-button')\nconst wordsSelectorElement = document.getElementById('words-selector')\nconst wordsCountInputElement = document.querySelector('#words-selector input')\n\nfunction enableWordsMode() {\n  deactivate(durationButtonElement)\n  activate(wordsButtonElement)\n  hardHide(durationSelectorElement)\n  hardShow(wordsSelectorElement)\n  testActive\n    ? generateTest()\n    : prepareTest(newWordsSet)\n}\n\nfunction changeWordCount(wordCountString) {\n  const wordCount = parseInt(wordCountString)\n  config.words = wordCount\n  wordsCountInputElement.value = config.words\n  wordsButtonElement.title = `${config.words} words`\n}\n\nwordsCountInputElement.addEventListener('change', event => {\n  const words = event.target.value\n  if (isNaN(words)) return\n  changeWordCount(words)\n  saveAppConfig()\n  prepareTest(newWordsSet)\n  focusWords()\n})\n\n\n//# sourceURL=webpack://typingtest/./src/js/gui/menu-bar/words-selector.js?");

/***/ }),

/***/ "./src/js/gui/typing.js":
/*!******************************!*\
  !*** ./src/js/gui/typing.js ***!
  \******************************/
/***/ (() => {

eval("const excludedTestKeycodes = ['Backspace', 'Delete', 'Enter', 'Tab', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Escape']\nconst excludedTestKeys = [' ', 'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']\n\nfunction handleTyping(character) {\n  const target = fetchCurrentWord().substring(currentInput.length, currentInput.length + 1)\n  const isValid = (target === character)\n  isValid\n    ? accuracyStats.correct++\n    : accuracyStats.incorrect++\n  currentInput += character\n  compareInput(!config.blindMode)\n  updateCaretPosition()\n  if (isWordCompleted()) jumpToNextWord()\n}\n\nfunction eraseCharacter() {\n  if (currentInput.length === 0 && inputHistory.length === 0) return\n  const currentWordLength = fetchCurrentWord().length\n  if (currentInput.length > currentWordLength) {\n    currentInput = currentInput.slice(0, currentWordLength)\n  } else if (currentInput.length > 0) {\n    currentInput = currentInput.slice(0, - 1)\n  } else {\n    currentInput = inputHistory.pop()\n    currentWordElement = currentWordElement.previousElementSibling\n    if (currentWordElement.nextElementSibling.offsetTop > currentWordElement.offsetTop) {\n      const wordHeight = currentWordElement.offsetHeight\n      const currentLineOffset = wordsElement.style.marginTop\n      wordsElement.style.marginTop = `calc(${currentLineOffset} + 2.3rem)`\n    }\n  }\n  compareInput(!config.blindMode)\n  updateCaretPosition()\n}\n\nfunction jumpToNextWord() {\n  deactivate(currentWordElement)\n  if (config.blindMode) currentWordElement.querySelectorAll('letter').forEach(correct)\n  if (fetchCurrentWord() === currentInput) {\n    accuracyStats.correct++\n  } else {\n    accuracyStats.incorrect++\n    highlightBadWord(currentWordElement, !config.blindMode)\n  }\n  if (null === currentWordElement.nextSibling) {\n    stopTest()\n    return\n  }\n  inputHistory.push(currentInput)\n  currentInput = ''\n  currentWordElement = currentWordElement.nextElementSibling\n  activate(currentWordElement)\n  if (currentWordElement.previousElementSibling.offsetTop < currentWordElement.offsetTop) {\n    const wordHeight = currentWordElement.offsetHeight\n    const currentLineOffset = wordsElement.style.marginTop\n    wordsElement.style.marginTop = `calc(${currentLineOffset} - 2.3rem)`\n  }\n  if (config.mode === 'time') addWordToTest()\n  updateCaretPosition()\n}\n\nfunction compareInput(showError) {\n  const currentWordContent = fetchCurrentWord()\n  let ret = ''\n  for (let i = 0; i < currentInput.length; i++) {\n    const currentLetter = currentWordContent.charAt(i)\n    const charCorrect = (currentLetter === currentInput[i])\n    if (charCorrect || false === showError) {\n      ret += `<letter class=\"correct\">${currentLetter}</letter>`\n    } else if (currentLetter !== '') {\n      ret += `<letter class=\"incorrect\">${currentLetter}</letter>`\n    }\n  }\n  if (currentInput.length < currentWordContent.length) {\n    for (let i = currentInput.length; i < currentWordContent.length; i++) {\n      ret += `<letter>${currentWordContent[i]}</letter>`\n    }\n  }\n  currentInput.length > currentWordContent.length\n    ? gotExtraCharacters(currentWordElement)\n    : lostExtraCharacters(currentWordElement)\n  currentWordElement.innerHTML = ret\n}\n\nfunction highlightBadWord(element, showError) {\n  if (false === showError) return\n  incorrect(element)\n}\n\nfunction fetchCurrentWord() {\n  return currentWordElement.getAttribute('data-value')\n}\n\nfunction focusWords() {\n  if (isHidden(wordsWrapperElement)) return\n  wordsInputElement.focus()\n  updateCaretPosition()\n  showCaret()\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/gui/typing.js?");

/***/ }),

/***/ "./src/js/lib/cookie.js":
/*!******************************!*\
  !*** ./src/js/lib/cookie.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadCookie\": () => (/* binding */ loadCookie),\n/* harmony export */   \"saveContentToCookie\": () => (/* binding */ saveContentToCookie)\n/* harmony export */ });\nconst loadCookie = name => fallback => {\n  return document.cookie.split('; ')     // split all the cookies\n    .filter(row => row.startsWith(name)) // keep only the app configs\n    .map(cookie => cookie.split('=')[1]) // take the cookie data\n    .map(JSON.parse)                     // convert them to an object\n    .concat(fallback)                    // add a default content to the list\n    [0]                                  // then return the first content\n}\n\nconst saveContentToCookie = name => content => {\n  document.cookie = `${name}=${JSON.stringify(content)}; max-age=31536000; SameSite=Lax`\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/lib/cookie.js?");

/***/ }),

/***/ "./src/js/lib/misc.js":
/*!****************************!*\
  !*** ./src/js/lib/misc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pipe\": () => (/* binding */ pipe),\n/* harmony export */   \"roundTo2\": () => (/* binding */ roundTo2),\n/* harmony export */   \"zipByIndexWith\": () => (/* binding */ zipByIndexWith)\n/* harmony export */ });\nconst pipe = (...funcs) => argument => funcs.reduce((result, func) => func(result), argument)\n\nconst roundTo2 = num => Math.round((num + Number.EPSILON) * 100) / 100\n\nconst zipByIndexWith = right => (left, index) => ({ left, right: right[index] })\n\n\n//# sourceURL=webpack://typingtest/./src/js/lib/misc.js?");

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"accuracyStats\": () => (/* binding */ accuracyStats),\n/* harmony export */   \"currentInput\": () => (/* binding */ currentInput),\n/* harmony export */   \"currentWordElement\": () => (/* binding */ currentWordElement),\n/* harmony export */   \"inputHistory\": () => (/* binding */ inputHistory),\n/* harmony export */   \"notificationTimer\": () => (/* binding */ notificationTimer),\n/* harmony export */   \"resultCalculating\": () => (/* binding */ resultCalculating),\n/* harmony export */   \"resultVisible\": () => (/* binding */ resultVisible),\n/* harmony export */   \"testActive\": () => (/* binding */ testActive),\n/* harmony export */   \"testEnd\": () => (/* binding */ testEnd),\n/* harmony export */   \"testStart\": () => (/* binding */ testStart),\n/* harmony export */   \"timer\": () => (/* binding */ timer),\n/* harmony export */   \"wordsList\": () => (/* binding */ wordsList),\n/* harmony export */   \"resetTestData\": () => (/* binding */ resetTestData)\n/* harmony export */ });\nlet accuracyStats      = { correct: 0, incorrect: 0 }\nlet currentInput       = ''\nlet currentWordElement = undefined\nlet inputHistory       = []\nlet notificationTimer  = null\nlet resultCalculating  = false\nlet resultVisible      = false\nlet testActive         = false\nlet testEnd            = 0\nlet testStart          = 0\nlet timer              = null\nlet wordsList          = []\n\nfunction resetTestData() {\n  accuracyStats = { correct: 0, incorrect: 0 }\n  currentInput = ''\n  currentWordElement = document.querySelector('#words .word')\n  inputHistory = []\n  testActive = false\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/storage.js?");

/***/ }),

/***/ "./src/js/typing-test.js":
/*!*******************************!*\
  !*** ./src/js/typing-test.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"startTest\": () => (/* binding */ startTest),\n/* harmony export */   \"stopTest\": () => (/* binding */ stopTest),\n/* harmony export */   \"generateTest\": () => (/* binding */ generateTest),\n/* harmony export */   \"resetTest\": () => (/* binding */ resetTest),\n/* harmony export */   \"prepareTest\": () => (/* binding */ prepareTest)\n/* harmony export */ });\nfunction startTest() {\n  resetTestData()\n  testActive = true\n  testStart = Date.now()\n  if (config.mode === 'time') startTestTimer()\n  showTestRunningPanel()\n}\n\nfunction stopTest() {\n  testEnd = Date.now()\n  testActive = false\n  stopTestTimer()\n  hideCaret()\n  inputHistory.push(currentInput)\n  showResult()\n}\n\nfunction generateTest() {\n  stopTestTimer()\n  disableFocus()\n  showTestConfigPanel()\n  hardHide(resultElement)\n  prepareTest(newWordsSet)\n  hardShow(testElement)\n  focusWords()\n}\n\nfunction resetTest() {\n  stopTestTimer()\n  disableFocus()\n  showTestConfigPanel()\n  hardHide(resultElement)\n  prepareTest(sameWordsSet)\n  hardShow(testElement)\n  focusWords()\n}\n\nfunction prepareTest(before) {\n  before()\n  prepareWords(wordsElement)\n  resetTestData()\n  wordsElement.style.marginTop = 0\n  activate(currentWordElement)\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/typing-test.js?");

/***/ }),

/***/ "./src/js/userconfig.js":
/*!******************************!*\
  !*** ./src/js/userconfig.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"loadAppConfig\": () => (/* binding */ loadAppConfig),\n/* harmony export */   \"saveAppConfig\": () => (/* binding */ saveAppConfig),\n/* harmony export */   \"resetConfig\": () => (/* binding */ resetConfig),\n/* harmony export */   \"applyConfig\": () => (/* binding */ applyConfig),\n/* harmony export */   \"toggleBlindMode\": () => (/* binding */ toggleBlindMode),\n/* harmony export */   \"setBlindMode\": () => (/* binding */ setBlindMode)\n/* harmony export */ });\n/* harmony import */ var _lib_cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookie.js */ \"./src/js/lib/cookie.js\");\n/* harmony import */ var _gui_menu_bar_menu_bar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gui/menu-bar/menu-bar.js */ \"./src/js/gui/menu-bar/menu-bar.js\");\n/* harmony import */ var _gui_menu_bar_duration_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gui/menu-bar/duration-selector.js */ \"./src/js/gui/menu-bar/duration-selector.js\");\n/* harmony import */ var _gui_menu_bar_words_selector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gui/menu-bar/words-selector.js */ \"./src/js/gui/menu-bar/words-selector.js\");\n\n\n\n\n\nconst cookieName = 'typing-test-config'\n\nconst defaultConfig = {\n  blindMode: false,\n  mode: 'time',\n  numbers: false,\n  punctuation: false,\n  time: 30,\n  words: 50,\n}\n\nlet config = { ...defaultConfig }\n\n// --------------------------------------------------------- DEDICATED FUNCTIONS\n\nconst loadAppConfig = (0,_lib_cookie_js__WEBPACK_IMPORTED_MODULE_0__.loadCookie)(cookieName)\n\nconst saveAppConfig = () => (0,_lib_cookie_js__WEBPACK_IMPORTED_MODULE_0__.saveContentToCookie)(cookieName)(config)\n\n// ------------------------------------------------------------------- FUNCTIONS\n\nfunction resetConfig() {\n  applyConfig({ ...defaultConfig })\n  saveAppConfig()\n}\n\nfunction applyConfig(configObj) {\n  (0,_gui_menu_bar_menu_bar_js__WEBPACK_IMPORTED_MODULE_1__.changeMode)(configObj.mode)\n  ;(0,_gui_menu_bar_duration_selector_js__WEBPACK_IMPORTED_MODULE_2__.changeDurationConfig)(configObj.time, true)\n  ;(0,_gui_menu_bar_words_selector_js__WEBPACK_IMPORTED_MODULE_3__.changeWordCount)(configObj.words, true)\n  setBlindMode(configObj.blindMode, true)\n  Object.keys(defaultConfig).forEach(configKey => {\n    if (config[configKey] == undefined) {\n      config[configKey] = defaultConfig[configKey]\n    }\n  })\n  return configObj\n}\n\nfunction toggleBlindMode() {\n  setBlindMode(!config.blindMode)\n  saveAppConfig()\n  focusWords()\n}\n\nfunction setBlindMode(blind) {\n  config.blindMode = blind\n  blind\n    ? activate(blindModeButtonElement)\n    : deactivate(blindModeButtonElement)\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/userconfig.js?");

/***/ }),

/***/ "./src/js/words.js":
/*!*************************!*\
  !*** ./src/js/words.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isWordCompleted\": () => (/* binding */ isWordCompleted),\n/* harmony export */   \"addWordToTest\": () => (/* binding */ addWordToTest),\n/* harmony export */   \"newWordsSet\": () => (/* binding */ newWordsSet),\n/* harmony export */   \"sameWordsSet\": () => (/* binding */ sameWordsSet),\n/* harmony export */   \"generateLettersTags\": () => (/* binding */ generateLettersTags),\n/* harmony export */   \"generateWordTags\": () => (/* binding */ generateWordTags),\n/* harmony export */   \"prepareWords\": () => (/* binding */ prepareWords)\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/js/storage.js\");\n\n\nfunction isWordCompleted() {\n  const currentWordContent = fetchCurrentWord()\n  return currentWordElement.nextElementSibling === null\n    && currentInput.length === currentWordContent.length\n    && (config.blindMode || currentInput.slice(-1) === currentWordContent.slice(-1))\n}\n\nfunction addWordToTest() {\n  const word = words[Math.floor(Math.random() * words.length)]\n  if (_storage__WEBPACK_IMPORTED_MODULE_0__.wordsList.slice(-2).includes(word)) return // cannot add a new word\n  _storage__WEBPACK_IMPORTED_MODULE_0__.wordsList.push(word)\n}\n\nfunction newWordsSet() {\n  _storage__WEBPACK_IMPORTED_MODULE_0__.wordsList = []\n  const expectedLength = (config.mode === 'words') ? config.words : 60\n  while (_storage__WEBPACK_IMPORTED_MODULE_0__.wordsList.length < expectedLength) {\n    addWordToTest()\n  }\n}\n\nfunction sameWordsSet() {} // do nothing, on purpose\n\nfunction generateLettersTags(letters) {\n  return letters\n    .map(letter => `<letter>${letter}</letter>`)\n    .join('')\n}\n\nfunction generateWordTags(content, word) {\n  return content.concat(\n    `<div class=\"word\" data-value=\"${word}\">`,\n    generateLettersTags(word.split('')),\n    '</div>'\n  )\n}\n\nfunction prepareWords(container) {\n  container.innerHTML = _storage__WEBPACK_IMPORTED_MODULE_0__.wordsList.reduce(generateWordTags, '<div class=\"filler\"></div>')\n}\n\n\n//# sourceURL=webpack://typingtest/./src/js/words.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;