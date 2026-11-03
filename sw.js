const CACHE_NAME = 'kapda-register-v6';
const APP_FILES = ['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_FILES))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('kapda-register-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim();})()); });
self.addEventListener('fetch', event => {
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}
 event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request)));
});
