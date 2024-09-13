function Cookie(name) {
    const load = (fallback) => {
        return document.cookie
            .split('; ') // split all the cookies
            .filter((row) => row.startsWith(name)) // keep only the app configs
            .map((cookie) => cookie.split('=')[1]) // take the cookie data
            .map(JSON.parse) // convert them to an object
            .concat(fallback)[0] // add a default content to the list // then return the first content
    }

    const save = (content) => {
        document.cookie = `${name}=${JSON.stringify(content)}; max-age=31536000; SameSite=Lax`
    }

    return Object.freeze({
        load,
        save,
    })
}
