if (flucttag === undefined) var flucttag = {};
if (flucttag.alreadyXhrExecuted === undefined) flucttag.alreadyXhrExecuted = false;
if (flucttag.slots === undefined) flucttag.slots = [];
if (flucttag.enableAdx === undefined) flucttag.enableAdx = null;
if (flucttag.keyName === undefined) flucttag.keyName = 'pa';

if (flucttag.notifyXHRError === undefined) flucttag.notifyXHRError = function(level, kind, statusCode, response) {
  var loggerEndpoint = 'https://kinoko.hub.fluct.me/logs';
  var body = JSON.stringify({
    level: level,
    kind: kind,
    param: {
      url: location.href,
      ref: location.referrer,
      statusCode: statusCode,
      response: response,
    },
  });

  var req = new XMLHttpRequest();
  req.open('POST', loggerEndpoint, true);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(body);
};

if (flucttag.showDfpAd === undefined) flucttag.showDfpAd = function(slot) {
  var base = location.protocol + '//pa.adingo.jp/?u='
  var u = encodeURIComponent(location.host + location.pathname);
  var request = base + u;
  var timeout = 5000;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('loadend', function() {
    flucttag.enableAdx = 'ng';
    if (xhr.status === 200 && this.responseText) {
      try {
        var res = JSON.parse(this.responseText);
        if (res.violated === false) {
          flucttag.enableAdx = 'ok';
        }
      } catch (e) {
        flucttag.notifyXHRError('Info', 'PamApiJsonParseError', xhr.status, this.responseText);
      }
    } else {
      flucttag.notifyXHRError('Info', 'PamApiResponseError', xhr.status, '');
    }

    googletag.cmd.push(function() {
      googletag.pubads().setTargeting(flucttag.keyName, flucttag.enableAdx);
      flucttag.slots.forEach(function(slot) {
        googletag.display(slot.getSlotElementId());
      });
    });
  });

  xhr.addEventListener('timeout', function() {
    flucttag.notifyXHRError('Info', 'PamApiTimeout', 0, '');
  });

  if (flucttag.enableAdx !== null) {
    googletag.cmd.push(function() {
      googletag.display(slot.getSlotElementId());
    });
    return;
  }

  if (!flucttag.alreadyXhrExecuted) {
    flucttag.alreadyXhrExecuted = true;
    flucttag.slots.push(slot);
    xhr.open('GET', request);
    xhr.timeout = timeout;
    xhr.send();
    return;
  }

  flucttag.slots.push(slot);
};