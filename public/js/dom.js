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

const softShow = element => onDone => {
  // element
  //   .stop(true, true)
  //   .removeClass('hidden')
  //   .animate({ opacity: 1 }, 125, onDone)
  hardShow(element)()
  onDone()
}

const isHidden = element => element.classList.contains('hidden')

const enableBottomPanel = name => {
  document.querySelectorAll('.bottom-panel').forEach(panel => {
    panel.id === name
      ? openBottomPanel(panel)
      : closeBottomPanel(panel)
  })
}

const openBottomPanel = panel => {
  removeClass('closing')(panel)
  removeClass('closed')(panel)
  removeClass('hidden')(panel)
  addClass('opening')(panel)
  panel.offsetWidth
}

const closeBottomPanel = panel => {
  removeClass('opening')(panel)
  removeClass('opened')(panel)
  addClass('closing')(panel)
  panel.offsetWidth
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
