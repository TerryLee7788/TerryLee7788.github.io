var targetUrl = 'http://cams.com';
var json = {
  title: 'test web worker',
  body: 'Test la!!!!!!'
};
// var targetUrl = 'http://yahoo.com'

function myShowNotification (obj) {
  console.log(obj);
  var data = obj;
  self.registration.showNotification(data.title, {
    body: data.body
  })
}

self.addEventListener('push', function(event) {
  // setTimeout(function() {
  //   console.log('invoke push event!!');
  // }, 60000);

  console.log(event);
  // for (var i in event) {
  //   console.log('i: %o, event[i]: %o', i, event[i]);
  // }
  // why is this event?
  event.waitUntil(
    myShowNotification(json)
  );

  self.registration.pushManager.getSubscription().then(function(subscription) {
    console.log(subscription);
  });

});

self.addEventListener('registration', function(event) {
  console.log('registration: ', event);
});

self.addEventListener('message', function (e) {
  console.log(e);
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('fetch', function(event) {
  console.log('fetch!!');
  console.log(event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
  console.log(self.localStorage);
  var mydata = {
    title: 'Hi!! I\'m waiting for 10 seconds',
    body: 'Wait sooooo long...'
  }
  /*
  setTimeout(function() {
    console.log('Wait 10 second Activated');
    myShowNotification(mydata);
  }, 10000);
  */
});

// Click notification event
// self.onnotificationclick = function(){
self.addEventListener('notificationclick', function (e) {
  console.log(e);
  clients.openWindow(targetUrl);
});

// localStorage.setItem('test', 'hi');
// console.log(localStorage);

console.dir(self);