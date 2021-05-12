export function startTestTimer() {
  timer = window.setTimeout(stopTest, config.time * 1000)
}

export function stopTestTimer() {
  window.clearTimeout(timer)
}
