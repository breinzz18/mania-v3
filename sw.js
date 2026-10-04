// Offline support: pages and data come from the network first (so edits show up at once), with the cache as a fallback.
// Images/fonts/vendor come from the cache first. Bump VERSION to clear old caches.
var VERSION = "mania3-v1";
var CORE = ["./", "index.html", "assets/app.css", "assets/app.js", "assets/i18n.js", "data/site.js", "data/menu.js", "images/manifest.js",
  "brand/logo.svg", "fonts/bricolage-grotesque-subset.woff2", "fonts/atkinson-hyperlegible-next-subset.woff2"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  var static_ = /\/(images|fonts|vendor|menu-pages|brand)\//.test(u.pathname);
  if (static_) {
    e.respondWith(caches.match(r).then(function (hit) { return hit || fetch(r).then(function (res) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(r, cp); }); return res; }); }));
  } else {
    e.respondWith(fetch(r).then(function (res) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(r, cp); }); return res; })
      .catch(function () { return caches.match(r, { ignoreSearch: true }).then(function (hit) { return hit || caches.match("index.html"); }); }));
  }
});
