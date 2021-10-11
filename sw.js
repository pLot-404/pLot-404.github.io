//通知
self.onnotificationclick = function(event) {
  // close notification
  event.notification.close();

  event.waitUntil(
    clients.matchAll({includeUncontrolled: true}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == "/" && 'focus' in client) {
          return client.focus(); 
        }
      }
    })
  );
};

//コピペ　https://pisuke-code.com/web-way-to-convert-site-to-pwa/
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
});
 
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
 
// サービスワーカー有効化に必須
self.addEventListener('fetch', function(event) {});
