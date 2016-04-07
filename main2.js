var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
    btn = document.getElementById('btn'),
    content = document.querySelector('.content'),
    send_msg = document.querySelector('#send_msg'),
    logs = document.querySelector('#logs'),
    scope = { scope: '/' },
    // sw = 'service_worker2.js';
    sw = 'https://terrylee7788.github.io/service_worker2.js';

function postMessage () {
  console.log('hi');
}

function btnText (r) {
  // console.log(r);
  var tmp, cur;
  if (r) {
    tmp = btn.getAttribute('data-tmp');
    cur = btn.innerHTML;
    btn.setAttribute('data-tmp', cur);
    btn.innerHTML = tmp;
    // btn.disabled = true;
  }
}

function deniedMsg () {
  var lock_text = 'Click the lock to give Chrome permission to send you desktop notifications.';
  var div = document.createElement('div');
  var notify_denied = document.getElementById('notify_denied');
  div.id = 'notify_denied';
  div.innerHTML = lock_text;
  if (notify_denied) { return; }
  document.body.appendChild(div);
  setTimeout(function() {
    document.body.removeChild(div);
  }, 5000);
}

function initialiseState (registration) {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in registration)) {
    console.warn('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    deniedMsg();
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported.');
    return;
  }

  // get user's "subscription"
  return registration.pushManager.getSubscription().then(function (subscription) {
    // if user have "subscription"
    if (subscription) {
      // console.log(subscription);
      return subscription
    }
    // otherwise set "userVisibleOnly" to says, "we are not allow any notifications."
    return registration.pushManager.subscribe({ userVisibleOnly: true });
  }).then(function (subscription) {
    console.log('***** success reg!!!');
    console.log(navigator.serviceWorker.controller);

    setTimeout(function () {
      
      // if (!navigator.serviceWorker.controller) { regSW() }
      if (!navigator.serviceWorker.controller) { console.clear(); }
    }, 1000);

    navigator.serviceWorker.getRegistration(sw).then(btnText);
    // console.log(subscription);
    // console.log(is_chrome);
    var html = '';
    var endpoint = subscription.endpoint;
    if (is_chrome) {
      var key = "AIzaSyBMY4OJQFt9cfggUs4RJq0CSJvojikw-d0";
      var text = '/send';
      var num = endpoint.indexOf(text);
      var fixed_length = num + text.length;
      var start = endpoint.slice(0, fixed_length);
      var end = endpoint.slice(fixed_length + 1, endpoint.length);
      html = 'curl --header "Authorization: key='+ key + '" --header Content-Type:"application/json" ';

      // html += start + ' --data-ascii "{\\"registration_ids\\":[\\"' + end + '\\"], \\"data\\": { \\"name\\" : \\"terry\\"} }"';
      // html += start + ' -d "{\\"registration_ids\\":[\\"' + end + '\\"], \\"data\\": { \\"name\\" : \\"terry\\"} }"';
      // html += start + ' -d "{\\"registration_ids\\":[\\"' + end + '\\"], \\"data.name\\": \\"terry\\" }"';
      html += start + ' -d "{\\"registration_ids\\":[\\"' + end + '\\"]}"';
    } else {
      html = 'curl -I -X POST --header "ttl: 60" ' + endpoint;
    }

    document.getElementById('curl').textContent = html;
    content.style.opacity = 1;

  }).catch(function (err) {
    // if (Notification.permission === 'default') { return unRegSW(); }
    // console.log('gggg');
    // console.log(err.toString());
    // for (var i in err) {
    //   console.log('1: %o, 2: %o', i, err[i]);
    // }
    var err_msg = err.message;
    console.log(err_msg);
    if ( err_msg.indexOf('permission') != -1 ) {
      unRegSW();
    } else {
      regSW();
    }
    // regSW();
  })

}

function unRegSW (checked) {
  var checked = checked || false;
  navigator.serviceWorker.getRegistration(sw).then(function (r) {
    // stop = false
    console.log('unRegSW');
    console.log(r);
    if (r) {
      r.unregister().then(function (boolean) {
        if (boolean) {
          if (Notification.permission === 'default') { return ; }
          btnText(r);
          content.style.opacity = 0;
        }
      });
    }
  }).catch(function (err) {
    console.log('unRegSW failed...');
    console.log(err);
    logMsg(err);
  });
}

function regSW () {
  // if (Notification.permission === 'default') { return unRegSW(); }
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register(sw, scope)
    navigator.serviceWorker.register(sw)
      .then(initialiseState);
  }
}

function checkSubScribe () {
  navigator.serviceWorker.getRegistration(sw).then(function (r) {
    // stop = false
    console.log(r);
    if (r) {
      console.log('checkSubScribe - ' + 1);
      unRegSW();
    } else {
      console.log('checkSubScribe - ' + 2);
      regSW();
    }
  }).catch(function (err) {
    console.log(err);
    logMsg(err);
  });
}

function checkSubScribeStatus () {
  navigator.serviceWorker.getRegistration(sw).then(function (r) {
    // stop = false
    console.log(r);
    if (r) {
      // btnText(r);
      console.log('checkSubScribeStatus - initialiseState');
      initialiseState(r);
    }
  }).catch(function (err) {
    console.log(err);
    logMsg(err);
  });
}

function sendMessage(message) {
  navigator.serviceWorker.getRegistration(sw).then(function (r) {
    console.log(r);
  })
  // This wraps the message posting/response in a promise, which will
  // resolve if the response doesn't contain an error, and reject with
  // the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler
  // independently of a promise, but this is a convenient wrapper.
  /*
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      message: 'test terry!!!'
    })
  } else {
    console.log('gg');
  }
  */
  return new Promise(function(resolve, reject) {
     var messageChannel = new MessageChannel();
     messageChannel.port1.onmessage = function(event) {
       if (event.data.error) {
         reject(event.data.error);
       } else {
         resolve(event.data);
       }
     };

     // This sends the message data as well as transferring messageChannel.port2 to the service worker.
     // The service worker can then use the transferred port to reply via postMessage(), which
     // will in turn trigger the onmessage handler on messageChannel.port1.
     // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
     // Was an issue with using controller vs active registration but i can't repro anymore
     // registration.active.postMessage(message, [messageChannel.port2]);
     try  {
       navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
     } catch (err) {
       console.log(err);
       logMsg(err);
     }

     /*
      * navigator.serviceWorker.controller return null... but not resolved...
      * http://www.resolvinghere.com/sof/30256390.shtml
      * https://www.w3.org/TR/2015/WD-service-workers-20150205/
      * https://github.com/slightlyoff/ServiceWorker/issues/
      */
  })
}

function logMsg (message) {
  logs.innerHTML += '<p>' + message + '</p>';
}

function sendCustomizeMessage (msg) {
  navigator.serviceWorker.ready.then(function (reg) {
    console.log(reg);
    reg.active.postMessage(msg);
  });  
}

window.addEventListener('load', function () {
  console.log('done!!');
  checkSubScribeStatus();

  btn.addEventListener('click', function () {
    if (Notification.permission === 'denied') {
      deniedMsg();
      return ;
    }
    checkSubScribe();
  });

  send_msg.addEventListener('click', function () {
    var value = document.querySelector('#my_message').value;
    console.log(value);
    // sendMessage(value);
    sendCustomizeMessage(value);
  });
})
