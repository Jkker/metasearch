if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,t,a)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const n={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return i;case"module":return n;default:return e(s)}}))).then((e=>{const s=a(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/WJbWkt-87xf4XCk0NmyEi/_buildManifest.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/WJbWkt-87xf4XCk0NmyEi/_ssgManifest.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/29107295-0a512dfc9452434e3c9c.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/494-317900c66b05da303081.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/61-272bf975c9baa5486a6f.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/987-7a85c3e7dee9d4d9094e.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/commons-f436ca329ec12c64032d.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/framework-ae14f5de0458f2b32cb2.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/main-bd15832584a6f3e96e7a.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/pages/_app-01c57f34eb3daceb6a18.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/pages/_error-de49ebb8b80a28bcc93b.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/pages/index-4aeeb03c7beeb2fe316d.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/pages/search-dd026fd93f8382eb64bd.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/chunks/webpack-18da5843a2c4d648f11e.js",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/css/f54e8d093acfccb7ae32.css",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/_next/static/css/fa3165393aabeddde60d.css",revision:"WJbWkt-87xf4XCk0NmyEi"},{url:"/static/icons/android-chrome-192x192.png",revision:"8a37143e422fc58ac43609414a2e4ebd"},{url:"/static/icons/android-chrome-512x512.png",revision:"38d1c427b4f9b7246487f335775baf30"},{url:"/static/icons/apple-touch-icon.png",revision:"352735ccc3ea1fd1ad7910c6762583a1"},{url:"/static/icons/browserconfig.xml",revision:"465989b6c09c1e5a41352804a0c5ea02"},{url:"/static/icons/favicon-16x16.png",revision:"a8e9ef61f1645199ce3e855c3ecc03a6"},{url:"/static/icons/favicon-32x32.png",revision:"629206ae557adb4a620e5c3bbcae45a9"},{url:"/static/icons/favicon.ico",revision:"b2c6deb7591c57bfcbe4276dbd69f597"},{url:"/static/icons/mstile-150x150.png",revision:"b24306e225edd529ef7a0b3d7ed0d542"},{url:"/static/icons/safari-pinned-tab.svg",revision:"8ebcbf811f8d6aa3b3481583a6303253"},{url:"/static/images/avatar.jpeg",revision:"fcfe2027515c8ea2b56ec7456d3b04e5"},{url:"/static/images/index-logo.png",revision:"29b39f85857de4a22f1044803c2d7d61"},{url:"/static/images/search-logo.png",revision:"4f326c19e7eca326ece222ee19e9f0db"},{url:"/static/manifest.json",revision:"cf7d654c0ddf931890562b4a318d0d63"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/api\/(?!auth\/callback\/).*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/(?!api\/).*$/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
