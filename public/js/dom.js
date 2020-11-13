const addClass = className => element => {
  element.classList.add(className)
}

const removeClass = className => element => {
  element.classList.remove(className)
}

const hardHide = element => () => {
  addClass('hidden')(element)
}

const hardShow = element => () => {
  removeClass('hidden')(element)
}

const softHide = element => onDone => {
  // element
  //   .stop(true, true)
  //   .animate({ opacity: 0 }, 125, onDone)
  //   .addClass('hidden')
  addClass('hidden')(element)
  onDone()
}

const softShow = element => onDone => {
  // element
  //   .stop(true, true)
  //   .removeClass('hidden')
  //   .animate({ opacity: 1 }, 125, onDone)
  removeClass('hidden')(element)
  onDone()
}

const isHidden = element => element.classList.contains('hidden')

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
