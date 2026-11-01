const VERSION='shanghai-city-edit-v6-ux2';
const BASE=new URL('./',self.location.href);
const url=p=>new URL(p,BASE).href;
let manifestPromise;
function files(){return manifestPromise||(manifestPromise=fetch(url('offline-manifest.json'),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Liste des ressources indisponible');return r.json()}))}
self.addEventListener('install',event=>{event.waitUntil((async()=>{const list=await files(),cache=await caches.open(VERSION);await cache.addAll(list.map(url));})())});
// New versions wait for all old tabs to close. Never clear personal IndexedDB/localStorage.
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('shanghai-city-edit-')&&k!==VERSION).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type!=='DOWNLOAD_OFFLINE')return;event.waitUntil((async()=>{const port=event.ports[0];try{const list=await files(),cache=await caches.open(VERSION);for(let i=0;i<list.length;i++){const request=url(list[i]);let hit=await cache.match(request);if(!hit){const r=await fetch(request,{cache:'reload'});if(!r.ok||r.type==='opaque')throw Error('Ressource inaccessible : '+list[i]);await cache.put(request,r);hit=await cache.match(request)}if(!hit?.ok)throw Error('Ressource manquante : '+list[i]);port.postMessage({count:i+1,total:list.length})}port.postMessage({done:true})}catch(e){port.postMessage({error:e.message})}})())});
self.addEventListener('fetch',event=>{const req=event.request,u=new URL(req.url);if(req.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(BASE.pathname))return;event.respondWith((async()=>{const cache=await caches.open(VERSION);const key=req.mode==='navigate'?url('index.html'):req;const hit=await cache.match(key);if(hit)return hit;return fetch(req)})())});
