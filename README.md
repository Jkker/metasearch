<p align="center">
  <a href="https://github.com/Jkker/metasearch">
    <img src="https://pics-1304851365.file.myqcloud.com/img/metasearch-logo-full-black.png" alt="Logo" height=80>
  </a>
  <p align="center">https://pics-1304851365.cos.ap-nanjing.myqcloud.com/img/metasearch-logo-full-black.png
    An aggregated search engine with high usability and customizability.
    <br />
    <br />
    <a href="https://search.jerrykjia.com/">View Demo</a>
    ·
    <a href="https://github.com/Jkker/metasearch/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jkker/metasearch/issues">Request Feature</a>
  </p>
</p>


<details open="open">
  <summary><b style="display: inline-block">Table of Contents</b></summary>
  <ol>
    <li><a href="#about-the-project">About The Project ℹ</a></li>
		<li><a href="#features">Features 🌟</a></li>
    <li><a href="#usage">Usage 🚓</a></li>
    <li><a href="#development">Developmehnt 🔨</a></li>
    <li><a href="#contributing">Contributing 💦</a></li>
    <li><a href="#license">License 📃</a></li>
    <li><a href="#contact">Contact 📧</a></li>
    <li><a href="#acknowledgements">Acknowledgements 🎉</a></li>
  </ol>
</details>


## About The Project

An aggregated search engine with high usability and customizability.

![Index Page](https://pics-1304851365.file.myqcloud.com/img/index.jpeg)

| Default Theme                                                | Dark Theme                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![search-results](https://pics-1304851365.file.myqcloud.com/img/search-results.jpeg) | ![Dark Mode](https://pics-1304851365.file.myqcloud.com/img/dark-mode.png) |

### Built With

* [NextJS](https://nextjs.org/)
* [Tailwindcss](https://tailwindcss.com/)
* [Ant Design](https://ant.design/)
* ❤

## Features

* 🔍 **Search Aggregator**: Lookup a keyword at all mainstream search engines simultaneously!

* 🖥 **Embedded Search Results**:  Search results from Google, Baidu, etc. are embedded on the current page with magic ✨.
*  📱 **Mobile-friendly**: Designed with responsiveness in mind! No more clunky pages on mobile devices.
* 🌓 **Dark Mode**: Built-in dark mode support! Embedded sites that do not support dark modes can be masked by a filter on demand.
* 🚀 **Blazingly Fast**: 90+ Lighthouse speed index. Comparable to a native app after first visit.
* ⌨ **Keyboard Shortcuts**: Navigate your search results with keyboard only! Checkout full list [here](#list-of-keyboard-shortcuts).
* 🧰 **PWA**: Installable as a stand-alone [Progressive WebApp](https://web.dev/what-are-pwas/) on mobile or desktop devices!
* ⚙ **Highly Customizable**: Search engines and links can be customized in `config.js`.

* 🌎 **Localization**: Automatically set the default search engine based on user’s locale.

### Work in Progress 🚧

- [ ] Runtime search engines & links customization.
- [ ] Recommendation for optimal set of search engine url parameters.
- [ ] Authentication & customization storage.
- [ ] Web proxy for search engines.
- [ ] Reverse image search aggregator.

### List of Keyboard Shortcuts ⌨

#### Input

| Shortcut Keys | Function                                                |
| ------------- | ------------------------------------------------------- |
| `/`           | Focus on & active the search bar to edit search keyword |
| `Esc`         | Blur (remove focus) the search bar                      |

#### Navigation

Available when the search bar is **not on focus** (after `Esc`  is pressed)


| Shortcut Keys     | Function                                      |
| ----------------- | --------------------------------------------- |
| `Ctrl + ➡`        | Switch to the **next** search engine tab      |
| `Ctrl + ⬅`        | Switch to the **previous** search engine tab  |
| Holding `Shift`   | Select the 1st Link if none is selected.      |
| Releasing `Shift` | Open the currently selected Link in a new tab |
| `Shift + ➡`       | Select the **next** link                      |
| `Shift + ⬅`       | Select the **previous** link                  |

_**Note**: when the embedded search result page (`iFrame`) is focused, these keyboard shortcuts won’t work! Click anywhere on header to reactive them._

## Usage

You can use **Metasearch** directly at [search.jerrykjia.com](https://search.jerrykjia.com/)

**Set as Default Search Engine**

* Edge: [Change your default search engine in Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/change-your-default-search-engine-in-microsoft-edge-cccaf51c-a4df-a43e-8036-d4d2c527a791)
* Chrome: [Set your default search engine - Computer - Google Chrome Help](https://support.google.com/chrome/answer/95426?co=GENIE.Platform%3DDesktop&hl=en)
* Firefox: [Change your default search settings in Firefox | Firefox Help (mozilla.org)](https://support.mozilla.org/en-US/kb/change-your-default-search-settings-firefox)

## Development

1. Fork / clone this repo
2. `npm install`
3. `npm run dev` to run the development server
4. Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.


[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## License
Distributed under the MIT License.

## Contact
Email:

[me@jerrykjia.com](mailto:me@jerrykjia.com)

Project Link:

https://github.com/Jkker/metasearch

## Acknowledgements

Inspired by [ifrontend-xyz/research](https://github.com/ifrontend-xyz/research)