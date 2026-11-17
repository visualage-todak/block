// 간단한 서비스 워커: 최신 파일을 먼저 받고, 끊기면 저장해 둔 것을 씀
const CACHE='escape-sim-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)).catch(()=>{}); return r; })
    .catch(()=>caches.match(e.request)));
});
