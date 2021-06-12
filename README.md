# Typing Test

A distraction free and minimalistic typing test.

## Why & Credits

The idea and the design comes from the wonderful "[Monkey Type](https://github.com/Miodec/monkeytype)" open source project by @miodec. But as I found this project too heavy and filled with features that I don't need I decided to reduce it to the lightest version possible.

## Features

- elegant and minimalistic design
- hide irrelevant informations
- "time" and "words" modes, with predefined and custom settings
- key shortcuts
- blind mode

## Features to come

*Note: this is an unordered list.*

 - [ ] punctuation
 - [ ] numbers
 - [ ] code
 - [ ] typing training
 - [ ] simple theming capability (drag and drop an "SVG theme file")
 - [ ] stats over time
 - [ ] global menu to access some settings and user data like the stats
 - [ ] heatmap

## Notes

Init the project:

`sudo docker run -v "$PWD":/usr/src/services --user $(id -u):$(id -g) -it -w /usr/src/services node:11 npm init`

Install the project:

`sudo docker run -v "$PWD":/usr/src/services --user $(id -u):$(id -g) -it -w /usr/src/services node:11 npm install`

Install a module:

`sudo docker run -v "$PWD":/usr/src/services --user $(id -u):$(id -g) -it -w /usr/src/services node:11 npm install [--only=dev] module-name`

Webpack compilation:

`sudo docker-compose -f docker-compose.builder.yml run --rm build`

Run project in dev mode:

`sudo docker-compose -f docker-compose.builder.yml run --rm start`
