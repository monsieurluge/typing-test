window.dispatch ??= ((element) => (name, data) => element.dispatchEvent(new CustomEvent(name, { detail: data })))(document)

window.listen ??= ((element) => (name, fn) => element.addEventListener(name, ({ detail }) => fn(detail)))(document)
