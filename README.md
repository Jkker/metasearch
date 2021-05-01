<p align="center">
  <a href="https://github.com/Jkker/metasearch">
    <img src="https://pics-1304851365.file.myqcloud.com/img/20210421013957.png" alt="Logo" height=80>
  </a>
  <p align="center">
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

# About The Project

This project is an highly customizable aggregate search engine that helps users to lookup the same keyword on across multiple search engines, especially useful when conducting research, looking for resources, or simply browsing a subject of interest.![Index Page](https://pics-1304851365.file.myqcloud.com/img/index.jpeg)

| Default Theme                                                                        | Dark Theme                                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| ![search-results](https://pics-1304851365.file.myqcloud.com/img/search-results.jpeg) | ![Dark Mode](https://pics-1304851365.file.myqcloud.com/img/dark-mode.png) |

### Built With

- [NextJS](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- ❤

# Features

- 🔍 **Search Aggregator**: Lookup a keyword at all mainstream search engines simultaneously!

* 🖥 **Embedded Search Results**:  Search results from Google, Baidu, etc. are embedded on the current page with magic ✨.
* 📱 **Mobile-friendly**: Designed with responsiveness in mind! No more clunky pages on mobile devices.
* 🌓 **Dark Mode**: Built-in dark mode support! Embedded sites that do not support dark modes can be masked by a filter on demand.
* 🚀 **Blazingly Fast**: 90+ Lighthouse speed index. Comparable to a native app after first visit.
* ⌨ **Keyboard Shortcuts**: Navigate your search results with keyboard only! Checkout full list [here](#list-of-keyboard-shortcuts).
* 🧰 **PWA**: Installable as a stand-alone [Progressive WebApp](https://web.dev/what-are-pwas/) on mobile or desktop devices!
* ⚙ **Highly Customizable**: Search engines and links can be customized in `config.js`.

- 🌎 **Localization**: Automatically set the default search engine based on user’s locale.

## Work in Progress 🚧

- [x] Runtime search engines & links customization.
- [ ] Recommendation for optimal set of search engine url parameters.
- [x] Authentication & customization storage.
- [ ] Web proxy for search engines.
- [ ] Reverse image search aggregator.

## List of Keyboard Shortcuts ⌨

#### Input

| Shortcut Keys | Function                                                |
| ------------- | ------------------------------------------------------- |
| `/`           | Focus on & active the search bar to edit search keyword |
| `Esc`         | Blur (remove focus) the search bar                      |

#### Navigation

Available when the search bar is **not on focus** (after `Esc` is pressed)

| Shortcut Keys     | Function                                      |
| ----------------- | --------------------------------------------- |
| `Ctrl + ➡`        | Switch to the **next** search engine tab      |
| `Ctrl + ⬅`        | Switch to the **previous** search engine tab  |
| Holding `Shift`   | Select the 1st Link if none is selected.      |
| Releasing `Shift` | Open the currently selected Link in a new tab |
| `Shift + ➡`       | Select the **next** link                      |
| `Shift + ⬅`       | Select the **previous** link                  |

_**Note**: when the embedded search result page (`iFrame`) is focused, these keyboard shortcuts won’t work! Click anywhere on header to reactive them._

# Usage

You can use **Metasearch** directly at [search.jerrykjia.com](https://search.jerrykjia.com/)

## Set as Default Search Engine

# Development

## Getting Started

1. Fork / clone this repo
2. `npm install`
3. `npm run dev` to run the development server
4. Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Database Design

### Engines

Stores pre-supplied or user-defined search engine entries.

```js
{
    title: { type: String, required: true, trim: true, index: true },
    url: { type: String, required: true, trim: true }, //search key replaced with '%s'
    platform: {
      desktop: { type: Boolean, default: true },
      mobile: { type: Boolean, default: true },
    },
    priority: { type: Number, default: 0 }, // larger number = greater priority
    blockedRegions: { type: [String], default: [] }, // 2 letter ISO-3166-1 country codes (e.g. "US")
    locale: String, // BCP-47 language tag (e.g. "en-US")
    embeddable: { type: Boolean, default: false }, // true = embedded iframe; false = external link
    slug: { type: String },
    style: {
      // obtained from simple-icon using slugs
      hex: { type: String, default: '#FFFFFF' },
      svg: { type: String },
    },
  },
```

#### Example

```json
{
  "title": "Google",
  "url": "https://www.google.com/search?igu=1&q=%s&oq=%s",
  "priority": 0,
  "blockedRegions": ["CN", "CU", "IR", "KP", "SY", "VN", "MM"],
  "locale": null,
  "style": {
    "hex": "#4285F4",
    "svg": "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Google icon</title><path d=\"M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z\"/></svg>"
  },
  "slug": "google",
  "embeddable": true
  },
```

### Users

Stores information about registered users.

```js
{
	name: {
		type: String,
		required: [true, "can't be blank"],
		match: [UsernameRegexp, 'is invalid'],
		index: true,
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		match: [EmailRegexp, 'is invalid'],
		index: true,
	},
	image: String,
	hash: String,
	salt: String,
	frames: [{ type: Schema.Types.ObjectId, ref: 'Frame' }],
	links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
}
```

#### Example

```js
{
  name: 'Jkker',
  password: ********,
  email?: 'me@jerrykjia.com',
  telephone?: *********,
}
```

## Data Management

| Endpoint                | Data Fetching                                       |
| ----------------------- | --------------------------------------------------- |
| `search.js` @build time | Fetch default config via `getStaticProps()` for SSG |
| `search.js` @build time |                                                     |

## API References

### `configs` endpoint

`GET /api/configs/:username` (📖 read)

`GET /api/configs/:username/:engine` (📖 read)

`POST /api/configs/:username/:engine` (✍ write)

`PATCH /api/configs/:username/:engine` (✍ write)

`DELETE /api/configs/:username/:engine` (✍ write)

### `frames` endpoint

`GET /api/frames/:owner` (📖 read)

`GET /api/frames/:owner/:engine` (📖 read)

`POST /api/frames/:owner/:engine` (✍ write)

`PATCH /api/frames/:owner/:engine` (✍ write)

`DELETE /api/frames/:owner/:engine` (✍ write)

### `links` endpoint

`GET /api/links/:owner` (📖 read)

`GET /api/links/:owner/:engine` (📖 read)

`POST /api/links/:owner/:engine` (✍ write)

`PATCH /api/links/:owner/:engine` (✍ write)

`DELETE /api/links/:owner/:engine` (✍ write)

### `users` endpoint

Under construction 🚧

## Site Map

![Sitemap.jpeg](https://i.loli.net/2021/04/03/B1uWU5PGEIlhSRa.jpg)

## User Flow Chart

![Metasearch User Flow Chart.jpeg](https://i.loli.net/2021/04/03/lpsxSFdgN8M2AmK.jpg)
### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

Distributed under the MIT License.

# Contact

Email:

[me@jerrykjia.com](mailto:me@jerrykjia.com)

Project Link:

https://github.com/Jkker/metasearch

# Acknowledgements

Inspired by [ifrontend-xyz/research](https://github.com/ifrontend-xyz/research)

