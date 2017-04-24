on-xmlhttprequest
=================

Monkey patch for `window.XMLHttpRequest` events

# Install

    npm i on-xmlhttprequest

# Usage

* `request` is an instance of `EventEmitter` with `method` and `url` properties added to it
* `response` is also the original `XMLHttpRequest` for your convenience

```
var onXhr = require('on-xmlhttprequest');

onXhr(function (request) {
  request.on('open', function (response) {
    console.log('open', request.method, request.url);
  });
  request.on('done', function (response) {
    console.log('done', request.method, request.url, response.status, response.responseText);
  });
  request.on('abort', function (response) {
    console.log('abort', request.method, request.url);
  });
  request.on('timeout', function (response) {
    console.log('timeout', request.method, request.url);
  });
  request.on('error', function (response) {
    console.log('error', request.method, request.url);
  });
});
```
