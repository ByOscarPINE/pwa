const CACHE_NAME = "cafecito-chido-v3";
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
