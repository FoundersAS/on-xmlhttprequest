var EventEmitter = require('events').EventEmitter;
var oldOpen = window.XMLHttpRequest.prototype.open;

module.exports = function (onrequest) {
  function open () {
    var emitter = new EventEmitter();
    var xhr = this;

    emitter.method = arguments[0];
    emitter.url = arguments[1];
    emitter.xhr = xhr;

    onrequest(emitter);

    xhr.addEventListener('readystatechange', onreadystatechange.bind(xhr));
    xhr.addEventListener('abort', onabort.bind(xhr));
    xhr.addEventListener('error', onerror.bind(xhr));
    xhr.addEventListener('timeout', ontimeout.bind(xhr));

    oldOpen.apply(xhr, arguments);

    function removeListeners (xhrInstance) {
      xhrInstance.removeEventListener('readystatechange', onreadystatechange);
      xhrInstance.removeEventListener('abort', onabort);
      xhrInstance.removeEventListener('error', onerror);
      xhrInstance.removeEventListener('timeout', onabort);
    }

    function onreadystatechange (e) {
      if (xhr.readyState === window.XMLHttpRequest.OPENED) {
        return emitter.emit('open', xhr);
      }
      if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status) {
        removeListeners(xhr);
        return emitter.emit('done', xhr);
      }
    }

    function onabort (e) {
      removeListeners(xhr);
      return emitter.emit('abort', xhr);
    }

    function onerror (e) {
      removeListeners(xhr);
      return emitter.emit('error', xhr);
    }

    function ontimeout (e) {
      removeListeners(xhr);
      return emitter.emit('timeout', xhr);
    }
  }

  window.XMLHttpRequest.prototype.open = open;
};
