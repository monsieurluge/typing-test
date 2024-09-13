function App({ configuration, dictionaries }) {
    function run() {
        configuration.load()
        const test = Test({
            defaultConfig: configuration.value(),
            dictionary: dictionaries.english,
        })
        test.start()
    }

    return Object.freeze({
        run,
    })
}
