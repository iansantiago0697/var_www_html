if (flucttag === undefined) var flucttag = {};
if (flucttag.alreadyXhrExecuted === undefined) flucttag.alreadyXhrExecuted = false;
if (flucttag.slots === undefined) flucttag.slots = [];
if (flucttag.kvs === undefined) flucttag.kvs = null;
if (flucttag.sendToHaste === undefined) flucttag.sendToHaste = function(kind, level, obj) {
    var params = obj;
    params['userAgent'] = navigator.userAgent;
    params['url'] = location.href;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs.adingo.jp/taglog');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({'kind': kind, 'level': level, 'params': params}));
};


if (flucttag.kvParams == undefined) flucttag.kvParams = {
    "units": [
        "/62532913/p_alc_728x90_top01_21945",
        "/62532913/p_alc_728x90_top02_21945",
        "/62532913/p_alc_300x250_1strec_21945",
        "/62532913/p_alc_300x250_2ndrec_21945",
        "/62532913/p_alc_300x250_3rdrec_21945",
        "/62532913/p_alc_300x600_4threc_21945",
        "/62532913/p_alc_728x90_footer_21945",
        "/62532913/p_alc_728x90_litetop01_21945",
        "/62532913/p_alc_300x250_lite1strec_21945",
        "/62532913/p_alc_300x250_lite2ndrec_21945",
        "/62532913/p_alc_300x250_lite3rdrec_21945",
        "/62532913/p_alc_300x250_litefooter01_21945",
        "/62532913/p_alc_300x250_litefooter02_21945",
        "/62532913/p_alc_999x999_infeed_21945",
    ],
    "url": document.URL
};

if (flucttag.showDfpAd === undefined) flucttag.showDfpAd = function(slot) {
    try {
        var timeout = 5000;
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('loadend', function() {
            flucttag.kvs = {};
            if (xhr.status === 200 && this.responseText) {
                try {
                    var res = JSON.parse(this.responseText);
                    flucttag.kvs = res;
                } catch (e) {
                    var message = new Object();
                    message['units'] = flucttag.kvParams['units'];
                    message['statusCode'] = xhr.status;
                    message['responseText'] = this.responseText;
                    flucttag.sendToHaste('PAInvalidJsonResponse', 'Warn', message);
                }
            } else {
                var message = new Object();
                message['units'] = flucttag.kvParams['units'];
                message['statusCode'] = xhr.status;
                flucttag.sendToHaste('PAResponseError', 'Warn', message);
            }

            googletag.cmd.push(function() {
                for (var i=0; i< flucttag.slots.length; i++) {
                    var targetSlot = flucttag.slots[i];
                    var unitPath = targetSlot.getAdUnitPath();
                    if (flucttag.kvs !== null) {
                        var unitKvs = flucttag.kvs[unitPath];
                        if (unitKvs !== undefined) {
                            unitKvs.forEach(function(kv) {
                                targetSlot.setTargeting(kv.k, kv.v);
                            });
                        }
                    }
                    googletag.display(targetSlot.getSlotElementId());
                }
            });
        });

        xhr.addEventListener('timeout', function() {
            var message = new Object();
            message['units'] = flucttag.kvParams['units'];
            flucttag.sendToHaste('PATimeout', 'Info', message);
        });

        if (flucttag.kvs !== null) {
            googletag.cmd.push(function() {
                var unitPath = slot.getAdUnitPath();
                var unitKvs = flucttag.kvs[unitPath];
                if (unitKvs !== undefined) {
                    unitKvs.forEach(function(kv) {
                        slot.setTargeting(kv.k, kv.v);
                    });
                }
                googletag.display(slot.getSlotElementId());
            });
            return;
        }

        if (!flucttag.alreadyXhrExecuted) {
            flucttag.alreadyXhrExecuted = true;
            flucttag.slots.push(slot);

            var endPoint = location.protocol + '//pa.adingo.jp/kv';
            xhr.open('POST', endPoint);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.timeout = timeout;

            xhr.send(JSON.stringify(flucttag.kvParams));
            return;
        }

        flucttag.slots.push(slot);
    } catch(e) {
        var message = new Object();
        message['exception'] = e;
        flucttag.sendToHaste('PAException', 'Error', message);
    }
};