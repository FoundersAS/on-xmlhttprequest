on-xmlhttprequest
=================

A listener for all `XMLHttpRequest` requests in the browser.

Implemented by monkey patching `window.XMLHttpRequest`.

# Install

    npm i on-xmlhttprequest

# Usage

* `request` is an event emitter with `method` and `url` properties. Also has `xhr` property which is the original `XMLHttpRequest` object

```
var onXhr = require('on-xmlhttprequest');

onXhr(function (request) {
  console.log(request.method, request.url);
  console.log(request.xhr); // just the original XMLHttpRequest

  request.on('open', function () {
    console.log('open');
  });
  request.on('done', function (response) {
    console.log('done', response.status, response.responseText);
  });
  request.on('abort', function () {
    console.log('abort');
  });
  request.on('timeout', function () {
    console.log('timeout');
  });
  request.on('error', function () {
    console.log('error');
  });
});
```
