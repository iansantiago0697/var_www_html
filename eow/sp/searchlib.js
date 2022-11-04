if (!window.EOW) window.EOW = {};
window.EOW.SessionStorageStore = function (e, c) {
    function d(a) {
        this.name = a
    }
    d.prototype._load = function () {
        var a = e.getItem(this.name);
        return a ? c.parse(a) : {}
    };
    d.prototype._save = function (a) {
//        return e.setItem(this.name, c.stringify(a));
        try {
            e.setItem(this.name, c.stringify(a));
        } catch(f) {
//            console.log(f);
        }
        return;
    };
    d.prototype.get = function (a) {
        var b = this._load();
        return b ? b[a] : b
    };
    d.prototype.set = function (a, b) {
        var c = this._load();
        c[a] = b;
        return this._save(c)
    };
    d.prototype.clear = function (a) {
        if (a) {
            var b = this._load();
            delete b[a];
            this._save(b)
        } else e.clear()
    };
    return d
}(window.sessionStorage, JSON);
window.EOW.ResultCache = function (e) {
    function c(b) {
        b = b || {};
        this.store = new e("eow-result-cache-" + a++);
        this.expirePeriod = b.expirePeriod || d
    }
    var d = 18E6,
        a = 0;
    c.prototype._makeKey = function (b, a) {
        return b + "?page=" + a
    };
    c.prototype.save = function (b, a, c) {
        return this.store.set(this._makeKey(b, a), {
            stored_at: new Date,
            body: c
        })
    };
    c.prototype.load = function (a, c) {
        var d = this._makeKey(a, c),
            e = this.store.get(d);
        if (!e) return null;
        return this.expirePeriod < new Date - new Date(e.stored_at) ? (this.store.clear(d), null) : e.body
    };
    c.prototype.reset =
        function () {
            this.store.clear()
    };
    return c
}(window.EOW.SessionStorageStore);
(function (e, k) {
    var h = e.History = e.History || {}, g = e.jQuery;
    if ("undefined" != typeof h.Adapter) throw Error("History.js Adapter has already been loaded...");
    h.Adapter = {
        bind: function (e, h, l) {
            g(e).bind(h, l)
        },
        trigger: function (e, h, l) {
            g(e).trigger(h, l)
        },
        extractEventData: function (e, g, h) {
            return g && g.originalEvent && g.originalEvent[e] || h && h[e] || k
        },
        onDomLoad: function (e) {
            g(e)
        }
    };
    "undefined" != typeof h.init && h.init()
})(window);
(function (e, k) {
    var h = e.console || k,
        g = e.document,
        j = e.navigator,
        m = e.sessionStorage || !1,
        l = e.setTimeout,
        p = e.clearTimeout,
        q = e.setInterval,
        s = e.clearInterval,
        i = e.JSON,
        t = e.alert,
        a = e.History = e.History || {}, o = e.history;
    i.stringify = i.stringify || i.encode;
    i.parse = i.parse || i.decode;
    if ("undefined" != typeof a.init) throw Error("History.js Core has already been loaded...");
    a.init = function () {
        return "undefined" == typeof a.Adapter ? !1 : ("undefined" != typeof a.initCore && a.initCore(), "undefined" != typeof a.initHtml4 && a.initHtml4(), !0)
    };
    a.initCore = function () {
        if ("undefined" != typeof a.initCore.initialized) return !1;
        a.initCore.initialized = !0;
        a.options = a.options || {};
        a.options.hashChangeInterval = a.options.hashChangeInterval || 100;
        a.options.safariPollInterval = a.options.safariPollInterval || 500;
        a.options.doubleCheckInterval = a.options.doubleCheckInterval || 500;
        a.options.storeInterval = a.options.storeInterval || 1E3;
        a.options.busyDelay = a.options.busyDelay || 250;
        a.options.debug = a.options.debug || !1;
        a.options.initialTitle = a.options.initialTitle ||
            g.title;
        a.intervalList = [];
        a.clearAllIntervals = function () {
            var b, c = a.intervalList;
            if ("undefined" != typeof c && null !== c) {
                for (b = 0; b < c.length; b++) s(c[b]);
                a.intervalList = null
            }
        };
        a.debug = function () {
            a.options.debug && a.log.apply(a, arguments)
        };
        a.log = function () {
            var a = "undefined" != typeof h && "undefined" != typeof h.log && "undefined" != typeof h.log.apply,
                c = g.getElementById("log"),
                d, f, e, n;
            a ? (f = Array.prototype.slice.call(arguments), d = f.shift(), "undefined" != typeof h.debug ? h.debug.apply(h, [d, f]) : h.log.apply(h, [d, f])) : d = "\n" +
                arguments[0] + "\n";
            for (f = 1, e = arguments.length; f < e; ++f) {
                n = arguments[f];
                if ("object" == typeof n && "undefined" != typeof i) try {
                    n = i.stringify(n)
                } catch (j) {}
                d += "\n" + n + "\n"
            }
            return c ? (c.value += d + "\n-----\n", c.scrollTop = c.scrollHeight - c.clientHeight) : a || t(d), !0
        };
        a.getInternetExplorerMajorVersion = function () {
            var b = a.getInternetExplorerMajorVersion,
                c;
            if ("undefined" != typeof a.getInternetExplorerMajorVersion.cached) c = a.getInternetExplorerMajorVersion.cached;
            else {
                c = 3;
                for (var d = g.createElement("div"), f = d.getElementsByTagName("i");
                    (d.innerHTML =
                        "<\!--[if gt IE " + ++c + "]><i></i><![endif]--\>") && f[0];);
                c = 4 < c ? c : !1
            }
            return b.cached = c
        };
        a.isInternetExplorer = function () {
            return a.isInternetExplorer.cached = "undefined" != typeof a.isInternetExplorer.cached ? a.isInternetExplorer.cached : Boolean(a.getInternetExplorerMajorVersion())
        };
        a.emulated = {
            pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(j.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(j.userAgent)),
            hashChange: Boolean(!("onhashchange" in
                e || "onhashchange" in g) || a.isInternetExplorer() && 8 > a.getInternetExplorerMajorVersion())
        };
        a.enabled = !a.emulated.pushState;
        a.bugs = {
            setHash: Boolean(!a.emulated.pushState && "Apple Computer, Inc." === j.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(j.userAgent)),
            safariPoll: Boolean(!a.emulated.pushState && "Apple Computer, Inc." === j.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(j.userAgent)),
            ieDoubleCheck: Boolean(a.isInternetExplorer() && 8 > a.getInternetExplorerMajorVersion()),
            hashEscape: Boolean(a.isInternetExplorer() &&
                7 > a.getInternetExplorerMajorVersion())
        };
        a.isEmptyObject = function (a) {
            for (var c in a) return !1;
            return !0
        };
        a.cloneObject = function (a) {
            var c, d;
            return a ? (c = i.stringify(a), d = i.parse(c)) : d = {}, d
        };
        a.getRootUrl = function () {
            var a = g.location.protocol + "//" + (g.location.hostname || g.location.host);
            g.location.port && (a += ":" + g.location.port);
            return a += "/", a
        };
        a.getBaseHref = function () {
            var a = g.getElementsByTagName("base"),
                c = "";
            return 1 === a.length && (a = a[0], c = null.href.replace(/[^\/]+$/, "")), c = c.replace(/\/+$/, ""), c && (c += "/"),
            c
        };
        a.getBaseUrl = function () {
            return a.getBaseHref() || a.getBasePageUrl() || a.getRootUrl()
        };
        a.getPageUrl = function () {
            var b;
            return b = ((a.getState(!1, !1) || {}).url || g.location.href).replace(/\/+$/, "").replace(/[^\/]+$/, function (a) {
                return /\./.test(a) ? a : a + "/"
            }), b
        };
        a.getBasePageUrl = function () {
            return g.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function (a) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/"
        };
        a.getFullUrl = function (b, c) {
            var d = b,
                f = b.substring(0, 1);
            return c = "undefined" == typeof c ? !0 : c,
                /[a-z]+\:\/\//.test(b) || ("/" === f ? d = a.getRootUrl() + b.replace(/^\/+/, "") : "#" === f ? d = a.getPageUrl().replace(/#.*/, "") + b : "?" === f ? d = a.getPageUrl().replace(/[\?#].*/, "") + b : c ? d = a.getBaseUrl() + b.replace(/^(\.\/)+/, "") : d = a.getBasePageUrl() + b.replace(/^(\.\/)+/, "")), d.replace(/\#$/, "")
        };
        a.getShortUrl = function (b) {
            var c = a.getBaseUrl(),
                d = a.getRootUrl();
            return a.emulated.pushState && (b = b.replace(c, "")), b = b.replace(d, "/"), a.isTraditionalAnchor(b) && (b = "./" + b), b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), b
        };
        a.store = {};
        a.idToState = a.idToState || {};
        a.stateToId = a.stateToId || {};
        a.urlToId = a.urlToId || {};
        a.storedStates = a.storedStates || [];
        a.savedStates = a.savedStates || [];
        a.normalizeStore = function () {
            a.store.idToState = a.store.idToState || {};
            a.store.urlToId = a.store.urlToId || {};
            a.store.stateToId = a.store.stateToId || {}
        };
        a.getState = function (b, c) {
            "undefined" == typeof b && (b = !0);
            "undefined" == typeof c && (c = !0);
            var d = a.getLastSavedState();
            return !d && c && (d = a.createStateObject()), b && (d = a.cloneObject(d), d.url = d.cleanUrl || d.url), d
        };
        a.getIdByState =
            function (b) {
                var c = a.extractId(b.url),
                    d;
                if (!c)
                    if (d = a.getStateString(b), "undefined" != typeof a.stateToId[d]) c = a.stateToId[d];
                    else if ("undefined" != typeof a.store.stateToId[d]) c = a.store.stateToId[d];
                else {
                    for (; !(c = (new Date).getTime() + ("" + Math.random()).replace(/\D/g, ""), "undefined" == typeof a.idToState[c] && "undefined" == typeof a.store.idToState[c]););
                    a.stateToId[d] = c;
                    a.idToState[c] = b
                }
                return c
        };
        a.normalizeState = function (b) {
            var c;
            if (!b || "object" != typeof b) b = {};
            if ("undefined" != typeof b.normalized) return b;
            if (!b.data || "object" != typeof b.data) b.data = {};
            c = {};
            c.normalized = !0;
            c.title = b.title || "";
            c.url = a.getFullUrl(a.unescapeString(b.url || g.location.href));
            c.hash = a.getShortUrl(c.url);
            c.data = a.cloneObject(b.data);
            c.id = a.getIdByState(c);
            c.cleanUrl = c.url.replace(/\??\&_suid.*/, "");
            c.url = c.cleanUrl;
            b = !a.isEmptyObject(c.data);
            if (c.title || b) c.hash = a.getShortUrl(c.url).replace(/\??\&_suid.*/, ""), /\?/.test(c.hash) || (c.hash += "?"), c.hash += "&_suid=" + c.id;
            return c.hashedUrl = a.getFullUrl(c.hash), (a.emulated.pushState ||
                a.bugs.safariPoll) && a.hasUrlDuplicate(c) && (c.url = c.hashedUrl), c
        };
        a.createStateObject = function (b, c, d) {
            b = {
                data: b,
                title: c,
                url: d
            };
            return b = a.normalizeState(b), b
        };
        a.getStateById = function (b) {
            b = "" + b;
            return a.idToState[b] || a.store.idToState[b] || k
        };
        a.getStateString = function (b) {
            var c, d, f;
            return c = a.normalizeState(b), d = {
                data: c.data,
                title: b.title,
                url: b.url
            }, f = i.stringify(d), f
        };
        a.getStateId = function (b) {
            var c, d;
            return c = a.normalizeState(b), d = c.id, d
        };
        a.getHashByState = function (b) {
            var c, d;
            return c = a.normalizeState(b),
            d = c.hash, d
        };
        a.extractId = function (a) {
            var c, d;
            return d = /(.*)\&_suid=([0-9]+)$/.exec(a), c = d ? "" + (d[2] || "") : "", c || !1
        };
        a.isTraditionalAnchor = function (a) {
            return !/[\/\?\.]/.test(a)
        };
        a.extractState = function (b, c) {
            var d = null,
                f, e;
            return c = c || !1, f = a.extractId(b), f && (d = a.getStateById(f)), d || (e = a.getFullUrl(b), f = a.getIdByUrl(e) || !1, f && (d = a.getStateById(f)), !d && c && !a.isTraditionalAnchor(b) && (d = a.createStateObject(null, null, e))), d
        };
        a.getIdByUrl = function (b) {
            return a.urlToId[b] || a.store.urlToId[b] || k
        };
        a.getLastSavedState =
            function () {
                return a.savedStates[a.savedStates.length - 1] || k
        };
        a.getLastStoredState = function () {
            return a.storedStates[a.storedStates.length - 1] || k
        };
        a.hasUrlDuplicate = function (b) {
            var c = !1,
                d;
            return d = a.extractState(b.url), c = d && d.id !== b.id, c
        };
        a.storeState = function (b) {
            return a.urlToId[b.url] = b.id, a.storedStates.push(a.cloneObject(b)), b
        };
        a.isLastSavedState = function (b) {
            var c, d, f;
            return a.savedStates.length && (c = b.id, d = a.getLastSavedState(), f = d.id, b = c === f), !1
        };
        a.saveState = function (b) {
            return a.isLastSavedState(b) ? !1 : (a.savedStates.push(a.cloneObject(b)), !0)
        };
        a.getStateByIndex = function (b) {
            var c;
            return "undefined" == typeof b ? c = a.savedStates[a.savedStates.length - 1] : 0 > b ? c = a.savedStates[a.savedStates.length + b] : c = a.savedStates[b], null
        };
        a.getHash = function () {
            return a.unescapeHash(g.location.hash)
        };
        a.unescapeString = function (a) {
            for (var c;;) {
                c = e.unescape(a);
                if (c === a) break;
                a = c
            }
            return a
        };
        a.unescapeHash = function (b) {
            b = a.normalizeHash(b);
            return b = a.unescapeString(b), b
        };
        a.normalizeHash = function (a) {
            return a.replace(/[^#]*#/,
                "").replace(/#.*/, "")
        };
        a.setHash = function (b, c) {
            var d, f, e;
            return !1 !== c && a.busy() ? (a.pushQueue({
                scope: a,
                callback: a.setHash,
                args: arguments,
                queue: c
            }), !1) : (d = a.escapeHash(b), a.busy(!0), f = a.extractState(b, !0), f && !a.emulated.pushState ? a.pushState(f.data, f.title, f.url, !1) : g.location.hash !== d && (a.bugs.setHash ? (e = a.getPageUrl(), a.pushState(null, null, e + "#" + d, !1)) : g.location.hash = d), a)
        };
        a.escapeHash = function (b) {
            b = a.normalizeHash(b);
            return b = e.escape(b), a.bugs.hashEscape || (b = b.replace(/\%21/g, "!").replace(/\%26/g,
                "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), b
        };
        a.getHashByUrl = function (b) {
            b = ("" + b).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = a.unescapeHash(b), b
        };
        a.setTitle = function (b) {
            var c = b.title,
                d;
            c || (d = a.getStateByIndex(0), d && d.url === b.url && (c = d.title || a.options.initialTitle));
            try {
                g.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {}
            return g.title = c, a
        };
        a.queues = [];
        a.busy = function (b) {
            "undefined" != typeof b ? a.busy.flag = b : "undefined" ==
                typeof a.busy.flag && (a.busy.flag = !1);
            if (!a.busy.flag) {
                p(a.busy.timeout);
                var c = function () {
                    var b, e, g;
                    if (!a.busy.flag)
                        for (b = a.queues.length - 1; 0 <= b; --b)
                            if (e = a.queues[b], 0 !== e.length) g = e.shift(), a.fireQueueItem(g), a.busy.timeout = l(c, a.options.busyDelay)
                };
                a.busy.timeout = l(c, a.options.busyDelay)
            }
            return a.busy.flag
        };
        a.busy.flag = !1;
        a.fireQueueItem = function (b) {
            return b.callback.apply(b.scope || a, b.args || [])
        };
        a.pushQueue = function (b) {
            return a.queues[b.queue || 0] = a.queues[b.queue || 0] || [], a.queues[b.queue || 0].push(b),
            a
        };
        a.queue = function (b, c) {
            return "function" == typeof b && (b = {
                callback: b
            }), "undefined" != typeof c && (b.queue = c), a.busy() ? a.pushQueue(b) : a.fireQueueItem(b), a
        };
        a.clearQueue = function () {
            return a.busy.flag = !1, a.queues = [], a
        };
        a.stateChanged = !1;
        a.doubleChecker = !1;
        a.doubleCheckComplete = function () {
            return a.stateChanged = !0, a.doubleCheckClear(), a
        };
        a.doubleCheckClear = function () {
            return a.doubleChecker && (p(a.doubleChecker), a.doubleChecker = !1), a
        };
        a.doubleCheck = function (b) {
            return a.stateChanged = !1, a.doubleCheckClear(), a.bugs.ieDoubleCheck &&
                (a.doubleChecker = l(function () {
                return a.doubleCheckClear(), a.stateChanged || b(), !0
            }, a.options.doubleCheckInterval)), a
        };
        a.safariStatePoll = function () {
            var b = a.extractState(g.location.href);
            if (!a.isLastSavedState(b)) return b || a.createStateObject(), a.Adapter.trigger(e, "popstate"), a
        };
        a.back = function (b) {
            return !1 !== b && a.busy() ? (a.pushQueue({
                scope: a,
                callback: a.back,
                args: arguments,
                queue: b
            }), !1) : (a.busy(!0), a.doubleCheck(function () {
                a.back(!1)
            }), o.go(-1), !0)
        };
        a.forward = function (b) {
            return !1 !== b && a.busy() ? (a.pushQueue({
                scope: a,
                callback: a.forward,
                args: arguments,
                queue: b
            }), !1) : (a.busy(!0), a.doubleCheck(function () {
                a.forward(!1)
            }), o.go(1), !0)
        };
        a.go = function (b, c) {
            var d;
            if (0 < b)
                for (d = 1; d <= b; ++d) a.forward(c);
            else {
                if (!(0 > b)) throw Error("History.go: History.go requires a positive or negative integer passed.");
                for (d = -1; d >= b; --d) a.back(c)
            }
            return a
        };
        if (a.emulated.pushState) {
            var r = function () {};
            a.pushState = a.pushState || r;
            a.replaceState = a.replaceState || r
        } else a.onPopState = function (b, c) {
            var d = !1,
                f = !1,
                h, i;
            return a.doubleCheckComplete(), h =
                a.getHash(), h ? (i = a.extractState(h || g.location.href, !0), i ? a.replaceState(i.data, i.title, i.url, !1) : (a.Adapter.trigger(e, "anchorchange"), a.busy(!1)), a.expectedStateId = !1, !1) : (d = a.Adapter.extractEventData("state", b, c) || !1, d ? f = a.getStateById(d) : a.expectedStateId ? f = a.getStateById(a.expectedStateId) : f = a.extractState(g.location.href), f || (f = a.createStateObject(null, null, g.location.href)), a.expectedStateId = !1, a.isLastSavedState(f) ? (a.busy(!1), !1) : (a.storeState(f), a.saveState(f), a.setTitle(f), a.Adapter.trigger(e,
                    "statechange"), a.busy(!1), !0))
        }, a.Adapter.bind(e, "popstate", a.onPopState), a.pushState = function (b, c, d, f) {
            if (a.getHashByUrl(d) && a.emulated.pushState) throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (!1 !== f && a.busy()) return a.pushQueue({
                scope: a,
                callback: a.pushState,
                args: arguments,
                queue: f
            }), !1;
            a.busy(!0);
            var g = a.createStateObject(b, c, d);
            return a.isLastSavedState(g) ? a.busy(!1) : (a.storeState(g), a.expectedStateId = g.id, o.pushState(g.id, g.title, g.url), a.Adapter.trigger(e,
                "popstate")), !0
        }, a.replaceState = function (b, c, d, f) {
            if (a.getHashByUrl(d) && a.emulated.pushState) throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (!1 !== f && a.busy()) return a.pushQueue({
                scope: a,
                callback: a.replaceState,
                args: arguments,
                queue: f
            }), !1;
            a.busy(!0);
            var g = a.createStateObject(b, c, d);
            return a.isLastSavedState(g) ? a.busy(!1) : (a.storeState(g), a.expectedStateId = g.id, o.replaceState(g.id, g.title, g.url), a.Adapter.trigger(e, "popstate")), !0
        }; if (m) {
            try {
                a.store =
                    i.parse(m.getItem("History.store")) || {}
            } catch (u) {
                a.store = {}
            }
            a.normalizeStore()
        } else a.store = {}, a.normalizeStore();
        a.Adapter.bind(e, "beforeunload", a.clearAllIntervals);
        a.Adapter.bind(e, "unload", a.clearAllIntervals);
        a.saveState(a.storeState(a.extractState(g.location.href, !0)));
        m && (a.onUnload = function () {
            var b, c;
            try {
                b = i.parse(m.getItem("History.store")) || {}
            } catch (d) {
                b = {}
            }
            b.idToState = b.idToState || {};
            b.urlToId = b.urlToId || {};
            b.stateToId = b.stateToId || {};
            for (c in a.idToState) a.idToState.hasOwnProperty(c) &&
                (b.idToState[c] = a.idToState[c]);
            for (c in a.urlToId) a.urlToId.hasOwnProperty(c) && (b.urlToId[c] = a.urlToId[c]);
            for (c in a.stateToId) a.stateToId.hasOwnProperty(c) && (b.stateToId[c] = a.stateToId[c]);
            a.store = b;
            a.normalizeStore();
//            m.setItem("History.store", i.stringify(b))
            try {
                m.setItem("History.store", i.stringify(b));
            } catch (d) {
//                console.log(d);
            }
        }, a.intervalList.push(q(a.onUnload, a.options.storeInterval)), a.Adapter.bind(e, "beforeunload", a.onUnload), a.Adapter.bind(e, "unload", a.onUnload));
        if (!a.emulated.pushState && (a.bugs.safariPoll && a.intervalList.push(q(a.safariStatePoll, a.options.safariPollInterval)),
            "Apple Computer, Inc." === j.vendor || "Mozilla" === (j.appCodeName || ""))) a.Adapter.bind(e, "hashchange", function () {
            a.Adapter.trigger(e, "popstate")
        }), a.getHash() && a.Adapter.onDomLoad(function () {
            a.Adapter.trigger(e, "hashchange")
        })
    };
    a.init()
})(window);

function TinySegmenter() {
    var b = {
        "[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u5104\u5146]": "M",
        "[\u4e00-\u9fa0\u3005\u3006\u30f5\u30f6]": "H",
        "[\u3041-\u3093]": "I",
        "[\u30a1-\u30f4\u30fc\uff71-\uff9d\uff9e\uff70]": "K",
        "[a-zA-Z\uff41-\uff5a\uff21-\uff3a]": "A",
        "[0-9\uff10-\uff19]": "N"
    };
    this.chartype_ = [];
    for (var i in b) {
        var c = RegExp();
        c.compile(i);
        this.chartype_.push([c, b[i]])
    }
    this.BIAS__ = -332;
    this.BC1__ = {
        HH: 6,
        II: 2461,
        KH: 406,
        OH: -1378
    };
    this.BC2__ = {
        AA: -3267,
        AI: 2744,
        AN: -878,
        HH: -4070,
        HM: -1711,
        HN: 4012,
        HO: 3761,
        IA: 1327,
        IH: -1184,
        II: -1332,
        IK: 1721,
        IO: 5492,
        KI: 3831,
        KK: -8741,
        MH: -3132,
        MK: 3334,
        OO: -2920
    };
    this.BC3__ = {
        HH: 996,
        HI: 626,
        HK: -721,
        HN: -1307,
        HO: -836,
        IH: -301,
        KK: 2762,
        MK: 1079,
        MM: 4034,
        OA: -1652,
        OH: 266
    };
    this.BP1__ = {
        BB: 295,
        OB: 304,
        OO: -125,
        UB: 352
    };
    this.BP2__ = {
        BO: 60,
        OO: -1762
    };
    this.BQ1__ = {
        BHH: 1150,
        BHM: 1521,
        BII: -1158,
        BIM: 886,
        BMH: 1208,
        BNH: 449,
        BOH: -91,
        BOO: -2597,
        OHI: 451,
        OIH: -296,
        OKA: 1851,
        OKH: -1020,
        OKK: 904,
        OOO: 2965
    };
    this.BQ2__ = {
        BHH: 118,
        BHI: -1159,
        BHM: 466,
        BIH: -919,
        BKK: -1720,
        BKO: 864,
        OHH: -1139,
        OHM: -181,
        OIH: 153,
        UHI: -1146
    };
    this.BQ3__ = {
        BHH: -792,
        BHI: 2664,
        BII: -299,
        BKI: 419,
        BMH: 937,
        BMM: 8335,
        BNN: 998,
        BOH: 775,
        OHH: 2174,
        OHM: 439,
        OII: 280,
        OKH: 1798,
        OKI: -793,
        OKO: -2242,
        OMH: -2402,
        OOO: 11699
    };
    this.BQ4__ = {
        BHH: -3895,
        BIH: 3761,
        BII: -4654,
        BIK: 1348,
        BKK: -1806,
        BMI: -3385,
        BOO: -12396,
        OAH: 926,
        OHH: 266,
        OHK: -2036,
        ONN: -973
    };
    this.BW1__ = {
        ",\u3068": 660,
        ",\u540c": 727,
        "B1\u3042": 1404,
        "B1\u540c": 542,
        "\u3001\u3068": 660,
        "\u3001\u540c": 727,
        "\u300d\u3068": 1682,
        "\u3042\u3063": 1505,
        "\u3044\u3046": 1743,
        "\u3044\u3063": -2055,
        "\u3044\u308b": 672,
        "\u3046\u3057": -4817,
        "\u3046\u3093": 665,
        "\u304b\u3089": 3472,
        "\u304c\u3089": 600,
        "\u3053\u3046": -790,
        "\u3053\u3068": 2083,
        "\u3053\u3093": -1262,
        "\u3055\u3089": -4143,
        "\u3055\u3093": 4573,
        "\u3057\u305f": 2641,
        "\u3057\u3066": 1104,
        "\u3059\u3067": -3399,
        "\u305d\u3053": 1977,
        "\u305d\u308c": -871,
        "\u305f\u3061": 1122,
        "\u305f\u3081": 601,
        "\u3063\u305f": 3463,
        "\u3064\u3044": -802,
        "\u3066\u3044": 805,
        "\u3066\u304d": 1249,
        "\u3067\u304d": 1127,
        "\u3067\u3059": 3445,
        "\u3067\u306f": 844,
        "\u3068\u3044": -4915,
        "\u3068\u307f": 1922,
        "\u3069\u3053": 3887,
        "\u306a\u3044": 5713,
        "\u306a\u3063": 3015,
        "\u306a\u3069": 7379,
        "\u306a\u3093": -1113,
        "\u306b\u3057": 2468,
        "\u306b\u306f": 1498,
        "\u306b\u3082": 1671,
        "\u306b\u5bfe": -912,
        "\u306e\u4e00": -501,
        "\u306e\u4e2d": 741,
        "\u307e\u305b": 2448,
        "\u307e\u3067": 1711,
        "\u307e\u307e": 2600,
        "\u307e\u308b": -2155,
        "\u3084\u3080": -1947,
        "\u3088\u3063": -2565,
        "\u308c\u305f": 2369,
        "\u308c\u3067": -913,
        "\u3092\u3057": 1860,
        "\u3092\u898b": 731,
        "\u4ea1\u304f": -1886,
        "\u4eac\u90fd": 2558,
        "\u53d6\u308a": -2784,
        "\u5927\u304d": -2604,
        "\u5927\u962a": 1497,
        "\u5e73\u65b9": -2314,
        "\u5f15\u304d": -1336,
        "\u65e5\u672c": -195,
        "\u672c\u5f53": -2423,
        "\u6bce\u65e5": -2113,
        "\u76ee\u6307": -724,
        "\uff22\uff11\u3042": 1404,
        "\uff22\uff11\u540c": 542,
        "\uff63\u3068": 1682
    };
    this.BW2__ = {
        "..": -11822,
        11: -669,
        "\u2015\u2015": -5730,
        "\u2212\u2212": -13175,
        "\u3044\u3046": -1609,
        "\u3046\u304b": 2490,
        "\u304b\u3057": -1350,
        "\u304b\u3082": -602,
        "\u304b\u3089": -7194,
        "\u304b\u308c": 4612,
        "\u304c\u3044": 853,
        "\u304c\u3089": -3198,
        "\u304d\u305f": 1941,
        "\u304f\u306a": -1597,
        "\u3053\u3068": -8392,
        "\u3053\u306e": -4193,
        "\u3055\u305b": 4533,
        "\u3055\u308c": 13168,
        "\u3055\u3093": -3977,
        "\u3057\u3044": -1819,
        "\u3057\u304b": -545,
        "\u3057\u305f": 5078,
        "\u3057\u3066": 972,
        "\u3057\u306a": 939,
        "\u305d\u306e": -3744,
        "\u305f\u3044": -1253,
        "\u305f\u305f": -662,
        "\u305f\u3060": -3857,
        "\u305f\u3061": -786,
        "\u305f\u3068": 1224,
        "\u305f\u306f": -939,
        "\u3063\u305f": 4589,
        "\u3063\u3066": 1647,
        "\u3063\u3068": -2094,
        "\u3066\u3044": 6144,
        "\u3066\u304d": 3640,
        "\u3066\u304f": 2551,
        "\u3066\u306f": -3110,
        "\u3066\u3082": -3065,
        "\u3067\u3044": 2666,
        "\u3067\u304d": -1528,
        "\u3067\u3057": -3828,
        "\u3067\u3059": -4761,
        "\u3067\u3082": -4203,
        "\u3068\u3044": 1890,
        "\u3068\u3053": -1746,
        "\u3068\u3068": -2279,
        "\u3068\u306e": 720,
        "\u3068\u307f": 5168,
        "\u3068\u3082": -3941,
        "\u306a\u3044": -2488,
        "\u306a\u304c": -1313,
        "\u306a\u3069": -6509,
        "\u306a\u306e": 2614,
        "\u306a\u3093": 3099,
        "\u306b\u304a": -1615,
        "\u306b\u3057": 2748,
        "\u306b\u306a": 2454,
        "\u306b\u3088": -7236,
        "\u306b\u5bfe": -14943,
        "\u306b\u5f93": -4688,
        "\u306b\u95a2": -11388,
        "\u306e\u304b": 2093,
        "\u306e\u3067": -7059,
        "\u306e\u306b": -6041,
        "\u306e\u306e": -6125,
        "\u306f\u3044": 1073,
        "\u306f\u304c": -1033,
        "\u306f\u305a": -2532,
        "\u3070\u308c": 1813,
        "\u307e\u3057": -1316,
        "\u307e\u3067": -6621,
        "\u307e\u308c": 5409,
        "\u3081\u3066": -3153,
        "\u3082\u3044": 2230,
        "\u3082\u306e": -10713,
        "\u3089\u304b": -944,
        "\u3089\u3057": -1611,
        "\u3089\u306b": -1897,
        "\u308a\u3057": 651,
        "\u308a\u307e": 1620,
        "\u308c\u305f": 4270,
        "\u308c\u3066": 849,
        "\u308c\u3070": 4114,
        "\u308d\u3046": 6067,
        "\u308f\u308c": 7901,
        "\u3092\u901a": -11877,
        "\u3093\u3060": 728,
        "\u3093\u306a": -4115,
        "\u4e00\u4eba": 602,
        "\u4e00\u65b9": -1375,
        "\u4e00\u65e5": 970,
        "\u4e00\u90e8": -1051,
        "\u4e0a\u304c": -4479,
        "\u4f1a\u793e": -1116,
        "\u51fa\u3066": 2163,
        "\u5206\u306e": -7758,
        "\u540c\u515a": 970,
        "\u540c\u65e5": -913,
        "\u5927\u962a": -2471,
        "\u59d4\u54e1": -1250,
        "\u5c11\u306a": -1050,
        "\u5e74\u5ea6": -8669,
        "\u5e74\u9593": -1626,
        "\u5e9c\u770c": -2363,
        "\u624b\u6a29": -1982,
        "\u65b0\u805e": -4066,
        "\u65e5\u65b0": -722,
        "\u65e5\u672c": -7068,
        "\u65e5\u7c73": 3372,
        "\u66dc\u65e5": -601,
        "\u671d\u9bae": -2355,
        "\u672c\u4eba": -2697,
        "\u6771\u4eac": -1543,
        "\u7136\u3068": -1384,
        "\u793e\u4f1a": -1276,
        "\u7acb\u3066": -990,
        "\u7b2c\u306b": -1612,
        "\u7c73\u56fd": -4268,
        "\uff11\uff11": -669
    };
    this.BW3__ = {
        "\u3042\u305f": -2194,
        "\u3042\u308a": 719,
        "\u3042\u308b": 3846,
        "\u3044.": -1185,
        "\u3044\u3002": -1185,
        "\u3044\u3044": 5308,
        "\u3044\u3048": 2079,
        "\u3044\u304f": 3029,
        "\u3044\u305f": 2056,
        "\u3044\u3063": 1883,
        "\u3044\u308b": 5600,
        "\u3044\u308f": 1527,
        "\u3046\u3061": 1117,
        "\u3046\u3068": 4798,
        "\u3048\u3068": 1454,
        "\u304b.": 2857,
        "\u304b\u3002": 2857,
        "\u304b\u3051": -743,
        "\u304b\u3063": -4098,
        "\u304b\u306b": -669,
        "\u304b\u3089": 6520,
        "\u304b\u308a": -2670,
        "\u304c,": 1816,
        "\u304c\u3001": 1816,
        "\u304c\u304d": -4855,
        "\u304c\u3051": -1127,
        "\u304c\u3063": -913,
        "\u304c\u3089": -4977,
        "\u304c\u308a": -2064,
        "\u304d\u305f": 1645,
        "\u3051\u3069": 1374,
        "\u3053\u3068": 7397,
        "\u3053\u306e": 1542,
        "\u3053\u308d": -2757,
        "\u3055\u3044": -714,
        "\u3055\u3092": 976,
        "\u3057,": 1557,
        "\u3057\u3001": 1557,
        "\u3057\u3044": -3714,
        "\u3057\u305f": 3562,
        "\u3057\u3066": 1449,
        "\u3057\u306a": 2608,
        "\u3057\u307e": 1200,
        "\u3059.": -1310,
        "\u3059\u3002": -1310,
        "\u3059\u308b": 6521,
        "\u305a,": 3426,
        "\u305a\u3001": 3426,
        "\u305a\u306b": 841,
        "\u305d\u3046": 428,
        "\u305f.": 8875,
        "\u305f\u3002": 8875,
        "\u305f\u3044": -594,
        "\u305f\u306e": 812,
        "\u305f\u308a": -1183,
        "\u305f\u308b": -853,
        "\u3060.": 4098,
        "\u3060\u3002": 4098,
        "\u3060\u3063": 1004,
        "\u3063\u305f": -4748,
        "\u3063\u3066": 300,
        "\u3066\u3044": 6240,
        "\u3066\u304a": 855,
        "\u3066\u3082": 302,
        "\u3067\u3059": 1437,
        "\u3067\u306b": -1482,
        "\u3067\u306f": 2295,
        "\u3068\u3046": -1387,
        "\u3068\u3057": 2266,
        "\u3068\u306e": 541,
        "\u3068\u3082": -3543,
        "\u3069\u3046": 4664,
        "\u306a\u3044": 1796,
        "\u306a\u304f": -903,
        "\u306a\u3069": 2135,
        "\u306b,": -1021,
        "\u306b\u3001": -1021,
        "\u306b\u3057": 1771,
        "\u306b\u306a": 1906,
        "\u306b\u306f": 2644,
        "\u306e,": -724,
        "\u306e\u3001": -724,
        "\u306e\u5b50": -1E3,
        "\u306f,": 1337,
        "\u306f\u3001": 1337,
        "\u3079\u304d": 2181,
        "\u307e\u3057": 1113,
        "\u307e\u3059": 6943,
        "\u307e\u3063": -1549,
        "\u307e\u3067": 6154,
        "\u307e\u308c": -793,
        "\u3089\u3057": 1479,
        "\u3089\u308c": 6820,
        "\u308b\u308b": 3818,
        "\u308c,": 854,
        "\u308c\u3001": 854,
        "\u308c\u305f": 1850,
        "\u308c\u3066": 1375,
        "\u308c\u3070": -3246,
        "\u308c\u308b": 1091,
        "\u308f\u308c": -605,
        "\u3093\u3060": 606,
        "\u3093\u3067": 798,
        "\u30ab\u6708": 990,
        "\u4f1a\u8b70": 860,
        "\u5165\u308a": 1232,
        "\u5927\u4f1a": 2217,
        "\u59cb\u3081": 1681,
        "\u5e02": 965,
        "\u65b0\u805e": -5055,
        "\u65e5,": 974,
        "\u65e5\u3001": 974,
        "\u793e\u4f1a": 2024,
        "\uff76\u6708": 990
    };
    this.TC1__ = {
        AAA: 1093,
        HHH: 1029,
        HHM: 580,
        HII: 998,
        HOH: -390,
        HOM: -331,
        IHI: 1169,
        IOH: -142,
        IOI: -1015,
        IOM: 467,
        MMH: 187,
        OOI: -1832
    };
    this.TC2__ = {
        HHO: 2088,
        HII: -1023,
        HMM: -1154,
        IHI: -1965,
        KKH: 703,
        OII: -2649
    };
    this.TC3__ = {
        AAA: -294,
        HHH: 346,
        HHI: -341,
        HII: -1088,
        HIK: 731,
        HOH: -1486,
        IHH: 128,
        IHI: -3041,
        IHO: -1935,
        IIH: -825,
        IIM: -1035,
        IOI: -542,
        KHH: -1216,
        KKA: 491,
        KKH: -1217,
        KOK: -1009,
        MHH: -2694,
        MHM: -457,
        MHO: 123,
        MMH: -471,
        NNH: -1689,
        NNO: 662,
        OHO: -3393
    };
    this.TC4__ = {
        HHH: -203,
        HHI: 1344,
        HHK: 365,
        HHM: -122,
        HHN: 182,
        HHO: 669,
        HIH: 804,
        HII: 679,
        HOH: 446,
        IHH: 695,
        IHO: -2324,
        IIH: 321,
        III: 1497,
        IIO: 656,
        IOO: 54,
        KAK: 4845,
        KKA: 3386,
        KKK: 3065,
        MHH: -405,
        MHI: 201,
        MMH: -241,
        MMM: 661,
        MOM: 841
    };
    this.TQ1__ = {
        BHHH: -227,
        BHHI: 316,
        BHIH: -132,
        BIHH: 60,
        BIII: 1595,
        BNHH: -744,
        BOHH: 225,
        BOOO: -908,
        OAKK: 482,
        OHHH: 281,
        OHIH: 249,
        OIHI: 200,
        OIIH: -68
    };
    this.TQ2__ = {
        BIHH: -1401,
        BIII: -1033,
        BKAK: -543,
        BOOO: -5591
    };
    this.TQ3__ = {
        BHHH: 478,
        BHHM: -1073,
        BHIH: 222,
        BHII: -504,
        BIIH: -116,
        BIII: -105,
        BMHI: -863,
        BMHM: -464,
        BOMH: 620,
        OHHH: 346,
        OHHI: 1729,
        OHII: 997,
        OHMH: 481,
        OIHH: 623,
        OIIH: 1344,
        OKAK: 2792,
        OKHH: 587,
        OKKA: 679,
        OOHH: 110,
        OOII: -685
    };
    this.TQ4__ = {
        BHHH: -721,
        BHHM: -3604,
        BHII: -966,
        BIIH: -607,
        BIII: -2181,
        OAAA: -2763,
        OAKK: 180,
        OHHH: -294,
        OHHI: 2446,
        OHHO: 480,
        OHIH: -1573,
        OIHH: 1935,
        OIHI: -493,
        OIIH: 626,
        OIII: -4007,
        OKAK: -8156
    };
    this.TW1__ = {
        "\u306b\u3064\u3044": -4681,
        "\u6771\u4eac\u90fd": 2026
    };
    this.TW2__ = {
        "\u3042\u308b\u7a0b": -2049,
        "\u3044\u3063\u305f": -1256,
        "\u3053\u308d\u304c": -2434,
        "\u3057\u3087\u3046": 3873,
        "\u305d\u306e\u5f8c": -4430,
        "\u3060\u3063\u3066": -1049,
        "\u3066\u3044\u305f": 1833,
        "\u3068\u3057\u3066": -4657,
        "\u3068\u3082\u306b": -4517,
        "\u3082\u306e\u3067": 1882,
        "\u4e00\u6c17\u306b": -792,
        "\u521d\u3081\u3066": -1512,
        "\u540c\u6642\u306b": -8097,
        "\u5927\u304d\u306a": -1255,
        "\u5bfe\u3057\u3066": -2721,
        "\u793e\u4f1a\u515a": -3216
    };
    this.TW3__ = {
        "\u3044\u305f\u3060": -1734,
        "\u3057\u3066\u3044": 1314,
        "\u3068\u3057\u3066": -4314,
        "\u306b\u3064\u3044": -5483,
        "\u306b\u3068\u3063": -5989,
        "\u306b\u5f53\u305f": -6247,
        "\u306e\u3067,": -727,
        "\u306e\u3067\u3001": -727,
        "\u306e\u3082\u306e": -600,
        "\u308c\u304b\u3089": -3752,
        "\u5341\u4e8c\u6708": -2287
    };
    this.TW4__ = {
        "\u3044\u3046.": 8576,
        "\u3044\u3046\u3002": 8576,
        "\u304b\u3089\u306a": -2348,
        "\u3057\u3066\u3044": 2958,
        "\u305f\u304c,": 1516,
        "\u305f\u304c\u3001": 1516,
        "\u3066\u3044\u308b": 1538,
        "\u3068\u3044\u3046": 1349,
        "\u307e\u3057\u305f": 5543,
        "\u307e\u305b\u3093": 1097,
        "\u3088\u3046\u3068": -4258,
        "\u3088\u308b\u3068": 5865
    };
    this.UC1__ = {
        A: 484,
        K: 93,
        M: 645,
        O: -505
    };
    this.UC2__ = {
        A: 819,
        H: 1059,
        I: 409,
        M: 3987,
        N: 5775,
        O: 646
    };
    this.UC3__ = {
        A: -1370,
        I: 2311
    };
    this.UC4__ = {
        A: -2643,
        H: 1809,
        I: -1032,
        K: -3450,
        M: 3565,
        N: 3876,
        O: 6646
    };
    this.UC5__ = {
        H: 313,
        I: -1238,
        K: -799,
        M: 539,
        O: -831
    };
    this.UC6__ = {
        H: -506,
        I: -253,
        K: 87,
        M: 247,
        O: -387
    };
    this.UP1__ = {
        O: -214
    };
    this.UP2__ = {
        B: 69,
        O: 935
    };
    this.UP3__ = {
        B: 189
    };
    this.UQ1__ = {
        BH: 21,
        BI: -12,
        BK: -99,
        BN: 142,
        BO: -56,
        OH: -95,
        OI: 477,
        OK: 410,
        OO: -2422
    };
    this.UQ2__ = {
        BH: 216,
        BI: 113,
        OK: 1759
    };
    this.UQ3__ = {
        BA: -479,
        BH: 42,
        BI: 1913,
        BK: -7198,
        BM: 3160,
        BN: 6427,
        BO: 14761,
        OI: -827,
        ON: -3212
    };
    this.UW1__ = {
        ",": 156,
        "\u3001": 156,
        "\u300c": -463,
        "\u3042": -941,
        "\u3046": -127,
        "\u304c": -553,
        "\u304d": 121,
        "\u3053": 505,
        "\u3067": -201,
        "\u3068": -547,
        "\u3069": -123,
        "\u306b": -789,
        "\u306e": -185,
        "\u306f": -847,
        "\u3082": -466,
        "\u3084": -470,
        "\u3088": 182,
        "\u3089": -292,
        "\u308a": 208,
        "\u308c": 169,
        "\u3092": -446,
        "\u3093": -137,
        "\u30fb": -135,
        "\u4e3b": -402,
        "\u4eac": -268,
        "\u533a": -912,
        "\u5348": 871,
        "\u56fd": -460,
        "\u5927": 561,
        "\u59d4": 729,
        "\u5e02": -411,
        "\u65e5": -141,
        "\u7406": 361,
        "\u751f": -408,
        "\u770c": -386,
        "\u90fd": -718,
        "\uff62": -463,
        "\uff65": -135
    };
    this.UW2__ = {
        ",": -829,
        "\u3001": -829,
        "\u3007": 892,
        "\u300c": -645,
        "\u300d": 3145,
        "\u3042": -538,
        "\u3044": 505,
        "\u3046": 134,
        "\u304a": -502,
        "\u304b": 1454,
        "\u304c": -856,
        "\u304f": -412,
        "\u3053": 1141,
        "\u3055": 878,
        "\u3056": 540,
        "\u3057": 1529,
        "\u3059": -675,
        "\u305b": 300,
        "\u305d": -1011,
        "\u305f": 188,
        "\u3060": 1837,
        "\u3064": -949,
        "\u3066": -291,
        "\u3067": -268,
        "\u3068": -981,
        "\u3069": 1273,
        "\u306a": 1063,
        "\u306b": -1764,
        "\u306e": 130,
        "\u306f": -409,
        "\u3072": -1273,
        "\u3079": 1261,
        "\u307e": 600,
        "\u3082": -1263,
        "\u3084": -402,
        "\u3088": 1639,
        "\u308a": -579,
        "\u308b": -694,
        "\u308c": 571,
        "\u3092": -2516,
        "\u3093": 2095,
        "\u30a2": -587,
        "\u30ab": 306,
        "\u30ad": 568,
        "\u30c3": 831,
        "\u4e09": -758,
        "\u4e0d": -2150,
        "\u4e16": -302,
        "\u4e2d": -968,
        "\u4e3b": -861,
        "\u4e8b": 492,
        "\u4eba": -123,
        "\u4f1a": 978,
        "\u4fdd": 362,
        "\u5165": 548,
        "\u521d": -3025,
        "\u526f": -1566,
        "\u5317": -3414,
        "\u533a": -422,
        "\u5927": -1769,
        "\u5929": -865,
        "\u592a": -483,
        "\u5b50": -1519,
        "\u5b66": 760,
        "\u5b9f": 1023,
        "\u5c0f": -2009,
        "\u5e02": -813,
        "\u5e74": -1060,
        "\u5f37": 1067,
        "\u624b": -1519,
        "\u63fa": -1033,
        "\u653f": 1522,
        "\u6587": -1355,
        "\u65b0": -1682,
        "\u65e5": -1815,
        "\u660e": -1462,
        "\u6700": -630,
        "\u671d": -1843,
        "\u672c": -1650,
        "\u6771": -931,
        "\u679c": -665,
        "\u6b21": -2378,
        "\u6c11": -180,
        "\u6c17": -1740,
        "\u7406": 752,
        "\u767a": 529,
        "\u76ee": -1584,
        "\u76f8": -242,
        "\u770c": -1165,
        "\u7acb": -763,
        "\u7b2c": 810,
        "\u7c73": 509,
        "\u81ea": -1353,
        "\u884c": 838,
        "\u897f": -744,
        "\u898b": -3874,
        "\u8abf": 1010,
        "\u8b70": 1198,
        "\u8fbc": 3041,
        "\u958b": 1758,
        "\u9593": -1257,
        "\uff62": -645,
        "\uff63": 3145,
        "\uff6f": 831,
        "\uff71": -587,
        "\uff76": 306,
        "\uff77": 568
    };
    this.UW3__ = {
        ",": 4889,
        1: -800,
        "\u2212": -1723,
        "\u3001": 4889,
        "\u3005": -2311,
        "\u3007": 5827,
        "\u300d": 2670,
        "\u3013": -3573,
        "\u3042": -2696,
        "\u3044": 1006,
        "\u3046": 2342,
        "\u3048": 1983,
        "\u304a": -4864,
        "\u304b": -1163,
        "\u304c": 3271,
        "\u304f": 1004,
        "\u3051": 388,
        "\u3052": 401,
        "\u3053": -3552,
        "\u3054": -3116,
        "\u3055": -1058,
        "\u3057": -395,
        "\u3059": 584,
        "\u305b": 3685,
        "\u305d": -5228,
        "\u305f": 842,
        "\u3061": -521,
        "\u3063": -1444,
        "\u3064": -1081,
        "\u3066": 6167,
        "\u3067": 2318,
        "\u3068": 1691,
        "\u3069": -899,
        "\u306a": -2788,
        "\u306b": 2745,
        "\u306e": 4056,
        "\u306f": 4555,
        "\u3072": -2171,
        "\u3075": -1798,
        "\u3078": 1199,
        "\u307b": -5516,
        "\u307e": -4384,
        "\u307f": -120,
        "\u3081": 1205,
        "\u3082": 2323,
        "\u3084": -788,
        "\u3088": -202,
        "\u3089": 727,
        "\u308a": 649,
        "\u308b": 5905,
        "\u308c": 2773,
        "\u308f": -1207,
        "\u3092": 6620,
        "\u3093": -518,
        "\u30a2": 551,
        "\u30b0": 1319,
        "\u30b9": 874,
        "\u30c3": -1350,
        "\u30c8": 521,
        "\u30e0": 1109,
        "\u30eb": 1591,
        "\u30ed": 2201,
        "\u30f3": 278,
        "\u30fb": -3794,
        "\u4e00": -1619,
        "\u4e0b": -1759,
        "\u4e16": -2087,
        "\u4e21": 3815,
        "\u4e2d": 653,
        "\u4e3b": -758,
        "\u4e88": -1193,
        "\u4e8c": 974,
        "\u4eba": 2742,
        "\u4eca": 792,
        "\u4ed6": 1889,
        "\u4ee5": -1368,
        "\u4f4e": 811,
        "\u4f55": 4265,
        "\u4f5c": -361,
        "\u4fdd": -2439,
        "\u5143": 4858,
        "\u515a": 3593,
        "\u5168": 1574,
        "\u516c": -3030,
        "\u516d": 755,
        "\u5171": -1880,
        "\u5186": 5807,
        "\u518d": 3095,
        "\u5206": 457,
        "\u521d": 2475,
        "\u5225": 1129,
        "\u524d": 2286,
        "\u526f": 4437,
        "\u529b": 365,
        "\u52d5": -949,
        "\u52d9": -1872,
        "\u5316": 1327,
        "\u5317": -1038,
        "\u533a": 4646,
        "\u5343": -2309,
        "\u5348": -783,
        "\u5354": -1006,
        "\u53e3": 483,
        "\u53f3": 1233,
        "\u5404": 3588,
        "\u5408": -241,
        "\u540c": 3906,
        "\u548c": -837,
        "\u54e1": 4513,
        "\u56fd": 642,
        "\u578b": 1389,
        "\u5834": 1219,
        "\u5916": -241,
        "\u59bb": 2016,
        "\u5b66": -1356,
        "\u5b89": -423,
        "\u5b9f": -1008,
        "\u5bb6": 1078,
        "\u5c0f": -513,
        "\u5c11": -3102,
        "\u5dde": 1155,
        "\u5e02": 3197,
        "\u5e73": -1804,
        "\u5e74": 2416,
        "\u5e83": -1030,
        "\u5e9c": 1605,
        "\u5ea6": 1452,
        "\u5efa": -2352,
        "\u5f53": -3885,
        "\u5f97": 1905,
        "\u601d": -1291,
        "\u6027": 1822,
        "\u6238": -488,
        "\u6307": -3973,
        "\u653f": -2013,
        "\u6559": -1479,
        "\u6570": 3222,
        "\u6587": -1489,
        "\u65b0": 1764,
        "\u65e5": 2099,
        "\u65e7": 5792,
        "\u6628": -661,
        "\u6642": -1248,
        "\u66dc": -951,
        "\u6700": -937,
        "\u6708": 4125,
        "\u671f": 360,
        "\u674e": 3094,
        "\u6751": 364,
        "\u6771": -805,
        "\u6838": 5156,
        "\u68ee": 2438,
        "\u696d": 484,
        "\u6c0f": 2613,
        "\u6c11": -1694,
        "\u6c7a": -1073,
        "\u6cd5": 1868,
        "\u6d77": -495,
        "\u7121": 979,
        "\u7269": 461,
        "\u7279": -3850,
        "\u751f": -273,
        "\u7528": 914,
        "\u753a": 1215,
        "\u7684": 7313,
        "\u76f4": -1835,
        "\u7701": 792,
        "\u770c": 6293,
        "\u77e5": -1528,
        "\u79c1": 4231,
        "\u7a0e": 401,
        "\u7acb": -960,
        "\u7b2c": 1201,
        "\u7c73": 7767,
        "\u7cfb": 3066,
        "\u7d04": 3663,
        "\u7d1a": 1384,
        "\u7d71": -4229,
        "\u7dcf": 1163,
        "\u7dda": 1255,
        "\u8005": 6457,
        "\u80fd": 725,
        "\u81ea": -2869,
        "\u82f1": 785,
        "\u898b": 1044,
        "\u8abf": -562,
        "\u8ca1": -733,
        "\u8cbb": 1777,
        "\u8eca": 1835,
        "\u8ecd": 1375,
        "\u8fbc": -1504,
        "\u901a": -1136,
        "\u9078": -681,
        "\u90ce": 1026,
        "\u90e1": 4404,
        "\u90e8": 1200,
        "\u91d1": 2163,
        "\u9577": 421,
        "\u958b": -1432,
        "\u9593": 1302,
        "\u95a2": -1282,
        "\u96e8": 2009,
        "\u96fb": -1045,
        "\u975e": 2066,
        "\u99c5": 1620,
        "\uff11": -800,
        "\uff63": 2670,
        "\uff65": -3794,
        "\uff6f": -1350,
        "\uff71": 551,
        "\uff78\uff9e": 1319,
        "\uff7d": 874,
        "\uff84": 521,
        "\uff91": 1109,
        "\uff99": 1591,
        "\uff9b": 2201,
        "\uff9d": 278
    };
    this.UW4__ = {
        ",": 3930,
        ".": 3508,
        "\u2015": -4841,
        "\u3001": 3930,
        "\u3002": 3508,
        "\u3007": 4999,
        "\u300c": 1895,
        "\u300d": 3798,
        "\u3013": -5156,
        "\u3042": 4752,
        "\u3044": -3435,
        "\u3046": -640,
        "\u3048": -2514,
        "\u304a": 2405,
        "\u304b": 530,
        "\u304c": 6006,
        "\u304d": -4482,
        "\u304e": -3821,
        "\u304f": -3788,
        "\u3051": -4376,
        "\u3052": -4734,
        "\u3053": 2255,
        "\u3054": 1979,
        "\u3055": 2864,
        "\u3057": -843,
        "\u3058": -2506,
        "\u3059": -731,
        "\u305a": 1251,
        "\u305b": 181,
        "\u305d": 4091,
        "\u305f": 5034,
        "\u3060": 5408,
        "\u3061": -3654,
        "\u3063": -5882,
        "\u3064": -1659,
        "\u3066": 3994,
        "\u3067": 7410,
        "\u3068": 4547,
        "\u306a": 5433,
        "\u306b": 6499,
        "\u306c": 1853,
        "\u306d": 1413,
        "\u306e": 7396,
        "\u306f": 8578,
        "\u3070": 1940,
        "\u3072": 4249,
        "\u3073": -4134,
        "\u3075": 1345,
        "\u3078": 6665,
        "\u3079": -744,
        "\u307b": 1464,
        "\u307e": 1051,
        "\u307f": -2082,
        "\u3080": -882,
        "\u3081": -5046,
        "\u3082": 4169,
        "\u3083": -2666,
        "\u3084": 2795,
        "\u3087": -1544,
        "\u3088": 3351,
        "\u3089": -2922,
        "\u308a": -9726,
        "\u308b": -14896,
        "\u308c": -2613,
        "\u308d": -4570,
        "\u308f": -1783,
        "\u3092": 13150,
        "\u3093": -2352,
        "\u30ab": 2145,
        "\u30b3": 1789,
        "\u30bb": 1287,
        "\u30c3": -724,
        "\u30c8": -403,
        "\u30e1": -1635,
        "\u30e9": -881,
        "\u30ea": -541,
        "\u30eb": -856,
        "\u30f3": -3637,
        "\u30fb": -4371,
        "\u30fc": -11870,
        "\u4e00": -2069,
        "\u4e2d": 2210,
        "\u4e88": 782,
        "\u4e8b": -190,
        "\u4e95": -1768,
        "\u4eba": 1036,
        "\u4ee5": 544,
        "\u4f1a": 950,
        "\u4f53": -1286,
        "\u4f5c": 530,
        "\u5074": 4292,
        "\u5148": 601,
        "\u515a": -2006,
        "\u5171": -1212,
        "\u5185": 584,
        "\u5186": 788,
        "\u521d": 1347,
        "\u524d": 1623,
        "\u526f": 3879,
        "\u529b": -302,
        "\u52d5": -740,
        "\u52d9": -2715,
        "\u5316": 776,
        "\u533a": 4517,
        "\u5354": 1013,
        "\u53c2": 1555,
        "\u5408": -1834,
        "\u548c": -681,
        "\u54e1": -910,
        "\u5668": -851,
        "\u56de": 1500,
        "\u56fd": -619,
        "\u5712": -1200,
        "\u5730": 866,
        "\u5834": -1410,
        "\u5841": -2094,
        "\u58eb": -1413,
        "\u591a": 1067,
        "\u5927": 571,
        "\u5b50": -4802,
        "\u5b66": -1397,
        "\u5b9a": -1057,
        "\u5bfa": -809,
        "\u5c0f": 1910,
        "\u5c4b": -1328,
        "\u5c71": -1500,
        "\u5cf6": -2056,
        "\u5ddd": -2667,
        "\u5e02": 2771,
        "\u5e74": 374,
        "\u5e81": -4556,
        "\u5f8c": 456,
        "\u6027": 553,
        "\u611f": 916,
        "\u6240": -1566,
        "\u652f": 856,
        "\u6539": 787,
        "\u653f": 2182,
        "\u6559": 704,
        "\u6587": 522,
        "\u65b9": -856,
        "\u65e5": 1798,
        "\u6642": 1829,
        "\u6700": 845,
        "\u6708": -9066,
        "\u6728": -485,
        "\u6765": -442,
        "\u6821": -360,
        "\u696d": -1043,
        "\u6c0f": 5388,
        "\u6c11": -2716,
        "\u6c17": -910,
        "\u6ca2": -939,
        "\u6e08": -543,
        "\u7269": -735,
        "\u7387": 672,
        "\u7403": -1267,
        "\u751f": -1286,
        "\u7523": -1101,
        "\u7530": -2900,
        "\u753a": 1826,
        "\u7684": 2586,
        "\u76ee": 922,
        "\u7701": -3485,
        "\u770c": 2997,
        "\u7a7a": -867,
        "\u7acb": -2112,
        "\u7b2c": 788,
        "\u7c73": 2937,
        "\u7cfb": 786,
        "\u7d04": 2171,
        "\u7d4c": 1146,
        "\u7d71": -1169,
        "\u7dcf": 940,
        "\u7dda": -994,
        "\u7f72": 749,
        "\u8005": 2145,
        "\u80fd": -730,
        "\u822c": -852,
        "\u884c": -792,
        "\u898f": 792,
        "\u8b66": -1184,
        "\u8b70": -244,
        "\u8c37": -1E3,
        "\u8cde": 730,
        "\u8eca": -1481,
        "\u8ecd": 1158,
        "\u8f2a": -1433,
        "\u8fbc": -3370,
        "\u8fd1": 929,
        "\u9053": -1291,
        "\u9078": 2596,
        "\u90ce": -4866,
        "\u90fd": 1192,
        "\u91ce": -1100,
        "\u9280": -2213,
        "\u9577": 357,
        "\u9593": -2344,
        "\u9662": -2297,
        "\u969b": -2604,
        "\u96fb": -878,
        "\u9818": -1659,
        "\u984c": -792,
        "\u9928": -1984,
        "\u9996": 1749,
        "\u9ad8": 2120,
        "\uff62": 1895,
        "\uff63": 3798,
        "\uff65": -4371,
        "\uff6f": -724,
        "\uff70": -11870,
        "\uff76": 2145,
        "\uff7a": 1789,
        "\uff7e": 1287,
        "\uff84": -403,
        "\uff92": -1635,
        "\uff97": -881,
        "\uff98": -541,
        "\uff99": -856,
        "\uff9d": -3637
    };
    this.UW5__ = {
        ",": 465,
        ".": -299,
        1: -514,
        E2: -32768,
        "]": -2762,
        "\u3001": 465,
        "\u3002": -299,
        "\u300c": 363,
        "\u3042": 1655,
        "\u3044": 331,
        "\u3046": -503,
        "\u3048": 1199,
        "\u304a": 527,
        "\u304b": 647,
        "\u304c": -421,
        "\u304d": 1624,
        "\u304e": 1971,
        "\u304f": 312,
        "\u3052": -983,
        "\u3055": -1537,
        "\u3057": -1371,
        "\u3059": -852,
        "\u3060": -1186,
        "\u3061": 1093,
        "\u3063": 52,
        "\u3064": 921,
        "\u3066": -18,
        "\u3067": -850,
        "\u3068": -127,
        "\u3069": 1682,
        "\u306a": -787,
        "\u306b": -1224,
        "\u306e": -635,
        "\u306f": -578,
        "\u3079": 1001,
        "\u307f": 502,
        "\u3081": 865,
        "\u3083": 3350,
        "\u3087": 854,
        "\u308a": -208,
        "\u308b": 429,
        "\u308c": 504,
        "\u308f": 419,
        "\u3092": -1264,
        "\u3093": 327,
        "\u30a4": 241,
        "\u30eb": 451,
        "\u30f3": -343,
        "\u4e2d": -871,
        "\u4eac": 722,
        "\u4f1a": -1153,
        "\u515a": -654,
        "\u52d9": 3519,
        "\u533a": -901,
        "\u544a": 848,
        "\u54e1": 2104,
        "\u5927": -1296,
        "\u5b66": -548,
        "\u5b9a": 1785,
        "\u5d50": -1304,
        "\u5e02": -2991,
        "\u5e2d": 921,
        "\u5e74": 1763,
        "\u601d": 872,
        "\u6240": -814,
        "\u6319": 1618,
        "\u65b0": -1682,
        "\u65e5": 218,
        "\u6708": -4353,
        "\u67fb": 932,
        "\u683c": 1356,
        "\u6a5f": -1508,
        "\u6c0f": -1347,
        "\u7530": 240,
        "\u753a": -3912,
        "\u7684": -3149,
        "\u76f8": 1319,
        "\u7701": -1052,
        "\u770c": -4003,
        "\u7814": -997,
        "\u793e": -278,
        "\u7a7a": -813,
        "\u7d71": 1955,
        "\u8005": -2233,
        "\u8868": 663,
        "\u8a9e": -1073,
        "\u8b70": 1219,
        "\u9078": -1018,
        "\u90ce": -368,
        "\u9577": 786,
        "\u9593": 1191,
        "\u984c": 2368,
        "\u9928": -689,
        "\uff11": -514,
        "\uff25\uff12": -32768,
        "\uff62": 363,
        "\uff72": 241,
        "\uff99": 451,
        "\uff9d": -343
    };
    this.UW6__ = {
        ",": 227,
        ".": 808,
        1: -270,
        E1: 306,
        "\u3001": 227,
        "\u3002": 808,
        "\u3042": -307,
        "\u3046": 189,
        "\u304b": 241,
        "\u304c": -73,
        "\u304f": -121,
        "\u3053": -200,
        "\u3058": 1782,
        "\u3059": 383,
        "\u305f": -428,
        "\u3063": 573,
        "\u3066": -1014,
        "\u3067": 101,
        "\u3068": -105,
        "\u306a": -253,
        "\u306b": -149,
        "\u306e": -417,
        "\u306f": -236,
        "\u3082": -206,
        "\u308a": 187,
        "\u308b": -135,
        "\u3092": 195,
        "\u30eb": -673,
        "\u30f3": -496,
        "\u4e00": -277,
        "\u4e2d": 201,
        "\u4ef6": -800,
        "\u4f1a": 624,
        "\u524d": 302,
        "\u533a": 1792,
        "\u54e1": -1212,
        "\u59d4": 798,
        "\u5b66": -960,
        "\u5e02": 887,
        "\u5e83": -695,
        "\u5f8c": 535,
        "\u696d": -697,
        "\u76f8": 753,
        "\u793e": -507,
        "\u798f": 974,
        "\u7a7a": -822,
        "\u8005": 1811,
        "\u9023": 463,
        "\u90ce": 1082,
        "\uff11": -270,
        "\uff25\uff11": 306,
        "\uff99": -673,
        "\uff9d": -496
    };
    return this
}
TinySegmenter.prototype.ctype_ = function (b) {
    for (var i in this.chartype_)
        if (b.match(this.chartype_[i][0])) return this.chartype_[i][1];
    return "O"
};
TinySegmenter.prototype.ts_ = function (b) {
    return b ? b : 0
};
TinySegmenter.prototype.segment = function (b) {
    if (null == b || void 0 == b || "" == b) return [];
    for (var i = [], c = ["B3", "B2", "B1"], f = ["O", "O", "O"], j = b.split(""), b = 0; b < j.length; ++b) c.push(j[b]), f.push(this.ctype_(j[b]));
    c.push("E1");
    c.push("E2");
    c.push("E3");
    f.push("O");
    f.push("O");
    f.push("O");
    for (var j = c[3], p = "U", g = "U", k = "U", b = 4; b < c.length - 3; ++b) {
        var a = this.BIAS__,
            n = c[b - 3],
            q = c[b - 2],
            l = c[b - 1],
            m = c[b],
            r = c[b + 1],
            t = c[b + 2],
            o = f[b - 3],
            e = f[b - 2],
            d = f[b - 1],
            h = f[b],
            s = f[b + 1],
            u = f[b + 2],
            a = a + this.ts_(this.UP1__[p]),
            a = a + this.ts_(this.UP2__[g]),
            a = a + this.ts_(this.UP3__[k]),
            a = a + this.ts_(this.BP1__[p + g]),
            a = a + this.ts_(this.BP2__[g + k]),
            a = a + this.ts_(this.UW1__[n]),
            a = a + this.ts_(this.UW2__[q]),
            a = a + this.ts_(this.UW3__[l]),
            a = a + this.ts_(this.UW4__[m]),
            a = a + this.ts_(this.UW5__[r]),
            a = a + this.ts_(this.UW6__[t]),
            a = a + this.ts_(this.BW1__[q + l]),
            a = a + this.ts_(this.BW2__[l + m]),
            a = a + this.ts_(this.BW3__[m + r]),
            a = a + this.ts_(this.TW1__[n + q + l]),
            a = a + this.ts_(this.TW2__[q + l + m]),
            a = a + this.ts_(this.TW3__[l + m + r]),
            a = a + this.ts_(this.TW4__[m + r + t]),
            a = a + this.ts_(this.UC1__[o]),
            a = a + this.ts_(this.UC2__[e]),
            a = a + this.ts_(this.UC3__[d]),
            a = a + this.ts_(this.UC4__[h]),
            a = a + this.ts_(this.UC5__[s]),
            a = a + this.ts_(this.UC6__[u]),
            a = a + this.ts_(this.BC1__[e + d]),
            a = a + this.ts_(this.BC2__[d + h]),
            a = a + this.ts_(this.BC3__[h + s]),
            a = a + this.ts_(this.TC1__[o + e + d]),
            a = a + this.ts_(this.TC2__[e + d + h]),
            a = a + this.ts_(this.TC3__[d + h + s]),
            a = a + this.ts_(this.TC4__[h + s + u]),
            a = a + this.ts_(this.UQ1__[p + o]),
            a = a + this.ts_(this.UQ2__[g + e]),
            a = a + this.ts_(this.UQ1__[k + d]),
            a = a + this.ts_(this.BQ1__[g + e + d]),
            a = a + this.ts_(this.BQ2__[g +
                d + h]),
            a = a + this.ts_(this.BQ3__[k + e + d]),
            a = a + this.ts_(this.BQ4__[k + d + h]),
            a = a + this.ts_(this.TQ1__[g + o + e + d]),
            a = a + this.ts_(this.TQ2__[g + e + d + h]),
            a = a + this.ts_(this.TQ3__[k + o + e + d]),
            a = a + this.ts_(this.TQ4__[k + e + d + h]),
            n = "O";
        0 < a && (i.push(j), j = "", n = "B");
        p = g;
        g = k;
        k = n;
        j += c[b]
    }
    i.push(j);
    return i
};