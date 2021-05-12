export const loadCookie = name => fallback => {
  return document.cookie.split('; ')     // split all the cookies
    .filter(row => row.startsWith(name)) // keep only the app configs
    .map(cookie => cookie.split('=')[1]) // take the cookie data
    .map(JSON.parse)                     // convert them to an object
    .concat(fallback)                    // add a default content to the list
    [0]                                  // then return the first content
}

export const saveContentToCookie = name => content => {
  document.cookie = `${name}=${JSON.stringify(content)}; max-age=31536000; SameSite=Lax`
}
