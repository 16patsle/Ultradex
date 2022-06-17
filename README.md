# Ultradex

A Pokédex app built using [Vue](https://vuejs.org/), [Bulma](https://bulma.io/) and data from the [pokéapi](https://pokeapi.co) and [Bulbapedia](https://bulbapedia.bulbagarden.net/).

## Features

The app shows you a list of all Pokémon, and let's you view more information on each one, including stats of different forms of the Pokémon, the Pokémon's types, the in-game Pokédex description, and the Pokémon's sprites.

In addition, you can read the relevant wiki entry from [Bulbapedia](https://bulbapedia.bulbagarden.net/), which gives additional insights about the Pokémon's biology and appearances in the Pokémon anime and manga, as well as some trivia.

## Project setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Parses Bulbapedia export and creates JSON files in /public

Runs automatically after `npm install`.

```sh
npm run bulbapedia
```

## Notes

### Font Awesome Pro

This project uses the Pro version of Font Awesome 5. To build the project as-is, you will need your own license key, and follow the npm/yarn setup instructions [on fontawesome.com](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro).

If you do not have a Pro license you can alter the project to use the free version. In that case, install `@fortawesome/free-solid-svg-icons` as a dependency instead of the equivalent pro package, and change the import in `src/main.js`.

Please note that the Pro version, in addition to alternate styles, includes more icons than the free version. If pro icons exists in the project, those will likely also need to be changed.

### Data exported from Bulbapedia

The wiki entry feature uses data exported from [Bulbapedia](https://bulbapedia.bulbagarden.net/). The raw export file can be found in `bulbapedia-data/bulbapedia-pokemon-export.xml`. The exported file is transformed using a script, and saves one exported JSON file in `public/data` for each Pokémon, labeled by the Pokémon's national Pokédex ID. Like Bulbapedia itself, both the raw export file and the processed data files are licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 2.5](https://creativecommons.org/licenses/by-nc-sa/2.5/) license.

## Disclaimer

**Pokémon © 2002-2022 Pokémon. © 1995-2022 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.**

**This project is not in any way affiliated with or endorsed by Nintendo/Creatures Inc./GAME FREAK inc./The Pokémon Company.**

## License

Copyright 2022 Patrick Sletvold

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 
You may obtain a copy of the License from the attached LICENSE file or at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License.