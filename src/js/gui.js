import { pipe } from './lib/misc'

export const refresh = element => {
  element.offsetWidth
  return element
}

export const addClass = className => element => {
  element.classList.add(className)
  return element
}

export const removeClass = className => element => {
  element.classList.remove(className)
  return element
}

export const isHidden = element => element.classList.contains('hidden')

export const isVisible = element => false === element.classList.contains('hidden')

export const hardHide = addClass('hidden')

export const hardShow = removeClass('hidden')

export const activate = addClass('active')

export const deactivate = removeClass('active')

export const correct = addClass('correct')

export const incorrect = addClass('error')

export const gotExtraCharacters = addClass('extra-characters')

export const lostExtraCharacters = removeClass('extra-characters')

export const resetAnimation = className => pipe(
  removeClass(className),
  refresh,
  addClass(className)
)

export const resetFlashing = resetAnimation('flashing')

export const open = pipe(
  removeClass('closing'),
  removeClass('closed'),
  hardShow
)

export const close = pipe(
  removeClass('opening'),
  removeClass('opened')
)

export const openBottomPanel = pipe(
  open,
  addClass('opening'),
  refresh
)

export const opened = pipe(
  addClass('opened'),
  removeClass('opening')
)

export const closeBottomPanel = pipe(
  close,
  addClass('closing'),
  refresh
)

export const closed = pipe(
  addClass('closed'),
  removeClass('closing'),
  hardHide
)

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
