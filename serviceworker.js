const CACHE_NAME = "cafecito-chido-v4"; // sube la versión al cambiar
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./manifest.json",
  "./images/icons/icon-96x96.png",
  "./images/icons/icon-128x128.png",
  "./images/icons/icon-144x144.png",
  "./images/icons/icon-152x152.png",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-384x384.png",
  "./images/icons/icon-512x512.png",
  "./images/01-espresso.jpg",
  "./images/02-cappuccino.jpg",
  "./images/03-iced-coffee.jpg",
  "./images/04-coffee-beans.jpg",
  "./images/05-french-press.jpg",
  "./images/06-turkish-coffee.jpg",
  "./images/07-latte-art.jpg",
  "./images/08-americano.jpg",
  "./images/09-pour-over.jpg",
  "./images/10-mocha.jpg"
];

// INSTALACIÓN: precarga tolerante a fallos (muestra cuál archivo falla)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of APP_SHELL) {
        try {
          await cache.add(url);
        } catch (err) {
          console.error("No se pudo cachear:", url, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

// ACTIVACIÓN: limpia cachés viejas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// CACHE FIRST con fallback offline
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  // Solo manejar mismo origen (Google Fonts etc. se dejan pasar)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          // Sin red y no está en caché: si es navegación, devolver el index
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});