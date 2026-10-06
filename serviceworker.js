const CACHE_NAME = "cafecito-chido-v2";
const APP_SHELL = [
	"./",
	"./index.html",
	"./css/style.css",
	"./js/app.js",
	"./manifest.json",
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

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames
					.filter((cacheName) => cacheName !== CACHE_NAME)
					.map((cacheName) => caches.delete(cacheName))
			)
		)
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;

			return fetch(event.request).then((networkResponse) => {
				const responseCopy = networkResponse.clone();
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseCopy);
				});
				return networkResponse;
			});
		})
	);
});
