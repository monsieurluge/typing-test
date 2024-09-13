function CookieConfig({ cookie, defaultConfig }) {
    let config = { ...defaultConfig }

    function apply(configObj) {
        Object.keys(defaultConfig).forEach((configKey) => {
            if (config[configKey] == undefined) {
                config[configKey] = defaultConfig[configKey]
            }
        })
        cookie.save(config)
        dispatch('config changed', config)
    }

    function load() {
        const previousConfig = cookie.load(defaultConfig)
        apply(previousConfig)
    }

    function reset() {
        applyConfig({ ...defaultConfig })
        cookie.save(config)
    }

    function value() {
        return { ...config }
    }

    return Object.freeze({
        apply,
        load,
        reset,
        value,
    })
}
