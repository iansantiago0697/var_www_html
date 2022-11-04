(function (d) {
    function n(a, b, e, c) {
        c = {
            data: c || (b ? b.data : {}),
            _wrap: b ? b._wrap : null,
            tmpl: null,
            parent: b || null,
            nodes: [],
            calls: A,
            nest: B,
            wrap: C,
            html: D,
            update: E
        };
        a && d.extend(c, a, {
            nodes: [],
            parent: b
        });
        if (e) c.tmpl = e, c._ctnt = c._ctnt || c.tmpl(d, c), c.key = ++o, (r.length ? p : j)[o] = c;
        return c
    }

    function k(a, b, e) {
        var c, e = e ? d.map(e, function (b) {
                return "string" === typeof b ? a.key ? b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + m + '="' + a.key + '" $2') : b : k(b, a, b._ctnt)
            }) : a;
        if (b) return e;
        e = e.join("");
        e.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
            function (a, b, e, i) {
                c = d(e).get();
                u(c);
                b && (c = s(b).concat(c));
                i && (c = c.concat(s(i)))
            });
        return c ? c : s(e)
    }

    function s(a) {
        var b = document.createElement("div");
        b.innerHTML = a;
        return d.makeArray(b.childNodes)
    }

    function v(a) {
        return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + d.trim(a).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
            function (b, a, c, g, h, f, i) {
                b = d.tmpl.tag[c];
                if (!b) throw "Template command not found: " + c;
                c = b._default || [];
                f && !/\w$/.test(h) && (h += f, f = "");
                h ? (h = t(h), i = i ? "," + t(i) + ")" : f ? ")" : "", i = f ? -1 < h.indexOf(".") ? h + f : "(" + h + ").call($item" + i : h, f = f ? i : "(typeof(" + h + ")==='function'?(" + h + ").call($item):(" + h + "))") : f = i = c.$1 || "null";
                g = t(g);
                return "');" + b[a ? "close" : "open"].split("$notnull_1").join(h ? "typeof(" + h + ")!=='undefined' && (" + h + ")!=null" : "true").split("$1a").join(f).split("$1").join(i).split("$2").join(g ? g.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,
                    function (a, b, c, d) {
                        return (d = d ? "," + d + ")" : c ? ")" : "") ? "(" + b + ").call($item" + d : a
                    }) : c.$2 || "") + "_.push('"
            }) + "');}return _;")
    }

    function w(a, b) {
        a._wrap = k(a, !0, d.isArray(b) ? b : [x.test(b) ? b : d(b).html()]).join("")
    }

    function t(a) {
        return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function u(a) {
        function b(a) {
            function b(a) {
                var F;
                a += e;
                F = h[a] = h[a] || n(f, j[f.parent.key + e] || f.parent, null, !0), f = F
            }
            var c, g = a,
                f, i;
            if (i = a.getAttribute(m)) {
                for (; g.parentNode && 1 === (g = g.parentNode).nodeType && !(c = g.getAttribute(m)););
                if (c !==
                    i) {
                    g = g.parentNode ? 11 === g.nodeType ? 0 : g.getAttribute(m) || 0 : 0;
                    if (!(f = j[i])) f = p[i], f = n(f, j[g] || p[g], null, !0), f.key = ++o, j[o] = f;
                    l && b(i)
                }
                a.removeAttribute(m)
            } else if (l && (f = d.data(a, "tmplItem"))) b(f.key), j[f.key] = f, g = (g = d.data(a.parentNode, "tmplItem")) ? g.key : 0;
            if (f) {
                for (c = f; c && c.key != g;) c.nodes.push(a), c = c.parent;
                delete f._ctnt;
                delete f._wrap;
                d.data(a, "tmplItem", f)
            }
        }
        var e = "_" + l,
            c, g, h = {}, f, i, k;
        for (f = 0, i = a.length; f < i; f++)
            if (1 === (c = a[f]).nodeType) {
                g = c.getElementsByTagName("*");
                for (k = g.length - 1; 0 <= k; k--) b(g[k]);
                b(c)
            }
    }

    function A(a, b, d, c) {
        if (!a) return r.pop();
        r.push({
            _: a,
            tmpl: b,
            item: this,
            data: d,
            options: c
        })
    }

    function B(a, b, e) {
        return d.tmpl(d.template(a), b, e, this)
    }

    function C(a, b) {
        var e = a.options || {};
        e.wrapped = b;
        return d.tmpl(d.template(a.tmpl), a.data, e, a.item)
    }

    function D(a, b) {
        var e = this._wrap;
        return d.map(d(d.isArray(e) ? e.join("") : e).filter(a || "*"), function (a) {
            if (b) a = a.innerText || a.textContent;
            else {
                var d;
                if (!(d = a.outerHTML)) d = document.createElement("div"), d.appendChild(a.cloneNode(!0)), d = d.innerHTML;
                a = d
            }
            return a
        })
    }

    function E() {
        var a = this.nodes;
        d.tmpl(null, null, null, this).insertBefore(a[0]);
        d(a).remove()
    }
    var y = d.fn.domManip,
        m = "_tmplitem",
        x = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        j = {}, p = {}, q, z = {
            key: 0,
            data: {}
        }, o = 0,
        l = 0,
        r = [];
    d.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        d.fn[a] = function (e) {
            var c = [],
                e = d(e),
                g, h, f;
            g = 1 === this.length && this[0].parentNode;
            q = j || {};
            if (g && 11 === g.nodeType && 1 === g.childNodes.length && 1 === e.length) e[b](this[0]), c = this;
            else {
                for (h = 0, f = e.length; h < f; h++) l = h, g = (0 < h ? this.clone(!0) : this).get(), d.fn[b].apply(d(e[h]), g), c = c.concat(g);
                l = 0;
                c = this.pushStack(c, a, e.selector)
            }
            e = q;
            q = null;
            d.tmpl.complete(e);
            return c
        }
    });
    d.fn.extend({
        tmpl: function (a, b, e) {
            return d.tmpl(this[0], a, b, e)
        },
        tmplItem: function () {
            return d.tmplItem(this[0])
        },
        template: function (a) {
            return d.template(a, this[0])
        },
        domManip: function (a, b, e) {
            if (a[0] && a[0].nodeType) {
                for (var c = d.makeArray(arguments), g = a.length, h = 0, f; h < g && !(f = d.data(a[h++], "tmplItem")););
                1 < g && (c[0] = [d.makeArray(a)]);
                f && l && (c[2] = function (a) {
                    d.tmpl.afterManip(this, a, e)
                });
                y.apply(this, c)
            } else y.apply(this, arguments);
            l = 0;
            !q && d.tmpl.complete(j);
            return this
        }
    });
    d.extend({
        tmpl: function (a, b, e, c) {
            var g = !c;
            if (g) c = z, a = d.template[a] || d.template(null, a), p = {};
            else if (!a) return a = c.tmpl, j[c.key] = c, c.nodes = [], c.wrapped && w(c, c.wrapped), d(k(c, null, c.tmpl(d, c)));
            if (!a) return [];
            "function" === typeof b && (b = b.call(c || {}));
            e && e.wrapped && w(e, e.wrapped);
            b = d.isArray(b) ? d.map(b, function (b) {
                return b ? n(e, c, a, b) : null
            }) : [n(e, c, a, b)];
            return g ?
                d(k(c, null, b)) : b
        },
        tmplItem: function (a) {
            var b;
            for (a instanceof d && (a = a[0]); a && 1 === a.nodeType && !(b = d.data(a, "tmplItem")) && (a = a.parentNode););
            return b || z
        },
        template: function (a, b) {
            return b ? ("string" === typeof b ? b = v(b) : b instanceof d && (b = b[0] || {}), b.nodeType && (b = d.data(b, "tmpl") || d.data(b, "tmpl", v(b.innerHTML))), "string" === typeof a ? d.template[a] = b : b) : a ? "string" !== typeof a ? d.template(null, a) : d.template[a] || d.template(null, x.test(a) ? a : d(a)) : null
        },
        encode: function (a) {
            return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    d.extend(d.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function () {
            j = {}
        },
        afterManip: function (a, b, e) {
            var c = 11 === b.nodeType ? d.makeArray(b.childNodes) : 1 === b.nodeType ? [b] : [];
            e.call(a, b);
            u(c);
            l++
        }
    })
})(jQuery);
String.prototype.isEmpty = function () {
    return /^\s*$/.test(this)
};
jQuery.cookie = function (c, f, d) {
    if ("undefined" != typeof f || c && "string" != typeof c)
        if ("string" == typeof c) {
            d = d || {};
            if (null === f) f = "", d.expires = -1;
            var b = "";
            if (d.expires && ("number" == typeof d.expires || d.expires.toUTCString)) "number" == typeof d.expires ? (b = new Date, b.setTime(b.getTime() + 864E5 * d.expires)) : b = d.expires, b = "; expires=" + b.toUTCString();
            var h = d.path ? "; path=" + d.path : "",
                l = d.domain ? "; domain=" + d.domain : "",
                d = d.secure ? "; secure" : "";
            document.cookie = c + "=" + encodeURIComponent(f) + b + h + l + d
        } else
            for (b in c) jQuery.cookie(b,
                c[b], f || d);
        else {
            f = {};
            if (document.cookie) {
                d = document.cookie.split(";");
                for (b = 0; b < d.length; b++)
                    if (h = jQuery.trim(d[b]), c) {
                        if (h.substr(0, c.length + 1) == c + "=") {
                            f = decodeURIComponent(h.substr(c.length + 1));
                            break
                        }
                    } else l = h.indexOf("="), f[h.substr(0, l)] = decodeURIComponent(h.substr(l + 1))
            }
            return f
        }
};
(function (c) {
    c.fn.clearable = function (f) {
        var d = {
            id: "clearable-${idx}",
            btnId: "clearable-btn-${idx}",
            adjustStructure: !0
        };
        c.extend(d, f);
        return this.each(function (b) {
            var h = c(this),
                f = d.id.replace("${idx}", b.toString()),
                b = d.btnId.replace("${idx}", b.toString()),
                i;
            d.adjustStructure && (h.replaceWith("<span id='" + f + "'></span>"), c("span#" + f).append(h).append("<span id='" + b + "'></span>").addClass("clearable"), c("span#" + f).css("height", h.get(0).offsetHeight), c("span#" + b, h).css("height", h.height()));
            var f = c("span#" +
                f),
                k = c("span#" + b, f);
            h.val().length ? k.show() : k.hide();
            h.bind("focus", function () {
                i = setInterval(function () {
                    0 < h.val().length ? k.show() : k.hide()
                }, 100)
            });
            h.bind("focusout", function () {
                clearInterval(i)
            });
            k.bind("click", function () {
                h.val("");
                document.getElementById(h.attr("id")).focus()
            })
        })
    }
})(jQuery);
var eowApp = function (c) {
    function f(a, e) {
        var g = c.Deferred(),
            b = document.createElement("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("src", a + e);
        b.onreadystatechange = function () {
            if ("complete" === this.readyState) g.resolve(), this.onreadystatechange = null
        };
        b.onload = function () {
            g.resolve()
        };
        document.getElementsByTagName("head")[0].appendChild(b);
        return g.promise()
    }
    var d = eowConfig.apiBaseUrl,
        b = function () {
            eowConfig && eowConfig.loggable && console.log.apply(console, Array.prototype.slice.apply(arguments))
        };
    (function (a, c) {
        var g = document.createElement("link");
        g.setAttribute("rel", "stylesheet");
        g.setAttribute("href", a + c);
        document.getElementsByTagName("head")[0].appendChild(g)
    })(eowConfig.cdnUrl + "stylesheets/", "dict2.css");
    var h = function (a, e) {
        if ("header" !== a.tagName.toLowerCase()) throw Error("Invalid Element: not header");
        var g = [],
            b = c.extend({
                navi: !0,
                settingsButton: !0
            }, e);
        b.navi && g.push('<p class="nav">', '<a href="${homeUrl}" title="アルクのホームページ" id="alc_top"><img src="${resourceUrl}images/go_top2.png"></a>');
        b.navi && b.settingsButton && g.push('<a href="#" title="Settings" id="search_settings"><img src="${resourceUrl}images/search_settings.png"></a>');
        b.navi && g.push("</p>");
        g.push('<form action="${rootUrl}search.html" method="get" id="search_form">', '<span id="input-with-clearbutton" class="clearable" >', '<input id="q" type="text" autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="\u82f1\u8f9e\u90ce on the WEB" name="q" data-role="none"/>', '<span id="clearbutton"></span>', "</span>", '<div id="word_suggest"></div>',
            '<input type="submit" value="search" data-role="none"/>', '<a href="${eowpUrl}" title="Pro\u7248\u30ed\u30b0\u30a4\u30f3" id="pro_login"><img src="${resourceUrl}images/pro_login.png"></a>', "</form>");
        c.tmpl(g.join("\n"), {
            homeUrl: eowConfig.homeUrl,
            resourceUrl: eowConfig.resourceUrl,
            rootUrl: eowConfig.rootUrl,
            eowpUrl: eowConfig.eowpUrl
        }).appendTo(a)
    }, l = function (a, c) {
            var a = a.replace(/\&/g, "&amp;");
            c && (a = "<div>" + a + "</div>");
/*
            var b = (new DOMParser).parseFromString(a, "text/xml");
            if (!b) return a;
            var q = {
                div: "",
                li: "",
                md: "",
                mt: "",
                span: "",
                ol: ""
            },
                d = function (a, c) {
                    for (var e = c.childNodes, b, j, f = 0; f < e.length; f++)
                        if (b = e.item(f), 3 === b.nodeType) {
                            if ("lb" === b.parentNode.tagName) {
                                j = "\u3010\uff20\u3011" === b.nodeValue ? a.createTextNode("\u30ab\u30ca") : a.createTextNode(b.nodeValue.replace(/[\u3010\u3011]/g, ""));
                                b.parentNode.replaceChild(j, b);
                            }
                        } else
                            1 === b.nodeType && d(a, b)
                };
            d(b, b.documentElement);
            return (new XMLSerializer).serializeToString(b)
*/
            return a;
        },
        i = {
            saveToCache: function (a) {
                return null;
//                if (!this._cache) this._cache = new EOW.ResultCache;
//                return this._cache.save(this.escapedWord, this.page, a)
            },
            loadFromCache: function () {
                return null;
//                if (!this._cache) this._cache = new EOW.ResultCache;
//                return this._cache.load(this.escapedWord, this.page)
            },
            page: -1,
            go: function (a) {
                c("#word_suggest").hide();
                location.href = eowConfig.rootUrl + "search.html?q=" + a
            },
            query: function (a, e, g) {
                a = c.trim(a);
                b("on query word=" + a + ", page=" + e + ", push=" + g);
                var j = a;
                try {
                    ga('send', 'event', 'EOW', 'Show', 'j', 0);
                } catch (d) {}
                c(document).trigger("searchstart", a);
                c('input[type="submit"]').focus();
                if ("string" === typeof a && !a.isEmpty())
                    if (this.word === a && this.page === e) b("Searching same word and page to previous one, search canceled.");
                    else {
                        this.word =
                            a;
                        this.escapedWord = encodeURIComponent(this.word);
                        this.page = e ? e : 1;
                        if ("undefined" === typeof g || !1 !== g) b("handling history"), a = {
                            word: this.word,
                            page: this.page
                        }, e = eowConfig.rootUrl + "search.html?q=" + this.word + "&pg=" + this.page, eowApp.initLoad ? (b("replaced " + e), window.History.replaceState(a, "\u82f1\u8f9e\u90ce on the WEB", e), eowApp.initLoad = !1) : (b("pushed " + e), window.History.pushState(a, "\u82f1\u8f9e\u90ce on the WEB", e));
                        this.load()
                    } else b("Illegal word, search canceled.")
            },
            _renderResults: function (a) {
                var e =
                    this,
                    b = {
                        isNext: -1 !== e.page
                    }, j = function () {
                        "undefined" !== typeof e.selectedElement && (e.selectedElement.removeClass("selected_word"), delete e.selectedElement)
                    };
                if (0 === a.sum) {
                    b.word = e.word;
                    if (!a.suggest.isEmpty()) b.suggest = a.suggest;
                    e.el.html(c("#not_found_tmpl").tmpl(b))
                } else {
                    document.title = "\u201c" + e.word + "\u201d\u306e\u691c\u7d22\u7d50\u679c\uff08" + a.sum + "\u4ef6\uff09\uff1a\u82f1\u8f9e\u90ce on the WEB";
                    b.definitions = a.definitions;
                    b.next = a.pgs > a.pg;
                    if (1 === a.pg && !a.gradable.isEmpty()) b.definitions[0].gradable =
                        a.gradable;
                    e.el.html(c("#definitions_tmpl").tmpl(b));
                    var d = e.el.find(".tip"),
                        a = d.find("button.menu_copy");
                    o(a, function () {});
                    a = d.find("button.menu_search");
                    o(a, function () {
                        if ("undefined" !== typeof e.selectedElement) {
                            var a = c.trim(e.selectedElement.text());
                            i.query(a)
                        }
                    });
                    e.onBodyClick = function () {
                        j();
                        d.css("display", "none")
                    };
                    eowConfig.contextMenu && e.el.find(".word_piece").bind("click", function (a) {
                        var b = c(this);
                        if ("" !== c.trim(b.text())) {
                            if (e.selectedElement !== b) j(), b.addClass("selected_word"), e.selectedElement =
                                b;
                            if ("undefined" !== typeof e.selectedElement) {
                                d.css("top", e.selectedElement.position().top - d.height() - 3 + "px");
                                var b = e.selectedElement.position().left,
                                    g = e.selectedElement.width(),
                                    f = e.selectedElement.offsetParent().width(),
                                    h = d.width(),
                                    i = b - Math.floor(h / 3);
                                0 > i ? i = 0 : i + h > f && (i = f - h);
                                d.css("left", i + "px");
                                d.find(".menu_arrow").css("left", b + Math.floor(g / 2) - i + "px");
                                d.css("display", "block")
                            }
                            a.stopPropagation()
                        }
                    });
                    a = e.el.find(".next > a");
                    o(a, function () {
                        var a = c(this);
                        a.data("longtouch") || e.next();
                        a.removeData("longtouch")
                    }, !1)
                }
                e.el.find("sp, hk").bind("click", function () {
                    i.query(c(this).text())
                });
                e.el.find(".refvocab").bind("click", function () {
                	i.query(c(this).text().replace(/^[Tt]he /, ""))
                })
            },
            load: function () {
                var a = this;
                a._xhr && (b("Cancel existing XHR."), a._xhr.abort());
                a.el = c("#results");
                p(a.word);
                a.el.empty();
                k(!0);
                var e = a.loadFromCache();
                e ? (b("get from cache: " + a.word + "?page=" + a.page), a._renderResults(e), a.loaded = !0, k(!1), c(document).trigger("searchend", a.word)) : (e = d + "sp/api/search?q=" + a.escapedWord, e += -1 === a.page ? "&pm=pf" : "&dc=" + eowConfig.defaults.count + "&pg=" + a.page, b("get:" + e), a._xhr = c.getJSON(e, function (e) {
                    if (e.ret == -99) {
                        a.el.html(c("#block_tmpl").tmpl());
                        k(!1);
                        return !1
                      }
                    if (e.ret == -9) {
//                      location.href = eowConfig.homeUrl;
                      a.el.html(c("#error_tmpl").tmpl({
                        failStr: "Exception"
                      }));
                      k(!1);
                      return !1
                    }
                    b("start parse...");
                    e = a._parse(e);
                    a.saveToCache(e);
                    b(e);
                    b("parsed");
                    a._renderResults(e);
                    a.loaded = !0;
                    k(!1);
                    c(document).trigger("searchend", a.word)
                    
                    window.scrollTo(0,0);
                    
                }), a._xhr.error(function (b) {
                    if ((b.responseText != "") && (b.responseText.indexOf("<title>ブロック中"))) {
                        a.el.html(c("#block_tmpl").tmpl());
                        k(!1);
                        return !1;
                      }
                    a.el.html(c("#error_tmpl").tmpl({
                        failStr: b.statusText
                    }));
                    k(!1)
                }))
            },
            next: function () {
                this.query(this.word, parseInt(this.page, 10) + 1);
                return !1
            },
            _parse: function (a) {
              if (a.sum) {
                a.definitions = [];
                for (var i in a.list){
                  a.definitions.push({
                    definition: l(a.list[i], !0)
                  })
                }
              }
              return a
            }
        }, k = function (a) {
            a ? c("#loading").addClass("show") : c("#loading").removeClass("show")
        }, p = function (a) {
            c("#q").val(a)
        }, o = function (a, e, g, d) {
            var f = null,
                h = function () {
                    a.hover(function () {
                        f = c(this).addClass("hover")
                    }, function () {
                        f = null;
                        c(this).removeClass("hover")
                    })
                }, i = !1,
                k = function (a) {
                    b("clicked:" +
                        i);
                    i || e.call(this, a)
                };
            a.bind("touchstart", function (d) {
                a.unbind("mouseenter mouseleave");
                f && f.removeClass("hover");
                var j = d.originalEvent.touches ? d.originalEvent.touches[0] : d,
                    k = j.pageX,
                    l = j.pageY,
                    n = !1,
                    o = !1,
                    m = c(this);
                m.removeData("longtouch");
                f = m;
                b("touchstart hover");
                m.addClass("hover");
                if (g) var p = setTimeout(function () {
                    n || (o = !0, m.trigger("longtouch"))
                }, 1E3);
                m.bind("touchmove", function (a) {
                    j = a.originalEvent.touches ? a.originalEvent.touches[0] : a;
                    if (10 < Math.abs(j.pageY - l) || 10 < Math.abs(j.pageX - k)) n = !0, m.removeClass("hover")
                }).one("touchend",
                    function () {
                        m.unbind("touchmove");
                        g && clearTimeout(p);
                        m.removeClass("hover");
                        f = null;
                        !n && !o && e && e && (i = !0, e.call(m), setTimeout(function () {
                            i = !1
                        }, 1E3));
                        setTimeout(h, 500)
                    })
            });
            h();
            g && d && a.bind("longtouch.eow", d);
            e && a.bind("click.eow", k)
        }, n = {
            init: function () {
                this.wordList = c("<div class='word_list'></ul>").appendTo(c("#word_suggest"));
                this.stop = !1
            },
            stopSuggest: function () {
                this.stop = !0
            },
            suppressSuggest: function (a) {
                this.suppress = a
            },
            suggest: function (a) {
                this.stop = !1;
                var e = this,
                    g = RegExp("(" + a.replace(/([\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,
                        "\\$1") + ")", "gi"),
                    a = c.trim(a);
                if (!(e.searchText === a || this.suppress)) e.searchText = a, 0 === a.length ? e.wordList.empty() : (b("suggest: " + a), c.ajax({
                    type: "get",
                    url: d + "/eow/sg/",
                    data: {
                        q: a
                    },
                    context: {
                        input: a
                    },
                    success: function (a) {
                        e.searchText !== this.input || this.suppress || (e.wordList.empty(), c("#word_suggest").show(), e.stop || c(a).find("word").each(function () {
                            var a = decodeURIComponent(c(this).text()),
                                d = a.replace(g, '<span class="highlight">$1</span>'),
                                a = c.tmpl('<button type="button" value="${suggestWord}" data-role="none">{{html spannedWord}}</button>', {
                                    suggestWord: a,
                                    spannedWord: d
                                });
                            a.bind("click", function (a) {
                                b("suggest clicked", a);
                                b("suggest value: " + a.target.value.toString());
                                c("#word_suggest").hide();
                                document.getElementById("q").value = a.target.value.toString();
                                c("#search_form").trigger("submit")
                            });
                            e.wordList.append(a)
                        }))
                    }
                }))
            },
            select: function (a) {
                i.go(c(a).attr("word"))
            },
            clear: function () {
                c("#word_suggest").hide();
                c("#word_suggest #word_list").empty()
            }
        };
    return {
        settings: {
            pronunciation: eowConfig.defaults.pronunciation,
            suggest: eowConfig.defaults.suggest,
            suggestStart: 1,
            fontSize: eowConfig.defaults.fontSize
        },
        init: function () {
            var a = this;
            a.initLoad = !0;
            a.settings.suggest = "1" === c.cookie("suggest") ? !0 : "0" === c.cookie("suggest") ? !1 : a.settings.suggest;
            a.settings.pronunciation = "1" === c.cookie("pronunciation") ? !0 : "0" === c.cookie("pronunciation") ? !1 : a.settings.pronunciation;
            a.settings.fontSize = parseInt(c.cookie("fontSize"), 10) || a.settings.fontSize;
            c(document).click(function () {
                try {
                    i.onBodyClick()
                } catch (a) {}
            });
            a.refreshSettings();
            var e = new Date;
            c("#search_form").submit(function (a) {
                var d =
                    new Date - e;
                b("elapsed time from last submit", d);
                if (1E3 > d) b("supress submit"), a.preventDefault();
                else {
                    e = new Date;
                    c("#word_suggest").hide();
                    var d = c("#q", this),
                        f = c.trim(d.val());
                    if (0 === f.length) d.focus(), a.preventDefault();
                    else if (eowConfig.searchPage) return b("Cancel default submit."), c("#word_suggest .wordlist").empty(), eowApp.search(f), a.preventDefault(), a.stopPropagation(), !1
                }
            });
            eowConfig.searchPage && window.History.Adapter.bind(window, "statechange", function () {
                b("pop history");
                var a = window.History.getState();
                a && b("pop history with state: ", a);
                if (a && a.data && a.data.word) {
                    if (a.data.word === i.word && a.data.page === i.page) return b("Maybe fired by pushState, ignore event."), !1;
                    eowApp.search(a.data.word, a.data.page, !1);
                    return !1
                }
            });
            c("#search_settings").click(function (b) {
                c("#settings").length ? c("#settings:visible").length ? c("#settings").slideUp() : c("#settings").slideDown() : (c("header").after("<div id='settings'></div>"), c("#settings").load(eowConfig.rootUrl + "settings.html #settings_content", function () {
                    var b = c(this).find("input[name=font_size][value=" +
                        a.settings.fontSize + "]");
                    0 === b.length && (b = c(this).find("input[name=font_size]").first());
                    b.attr("checked", !0);
                    c(this).find("input[name=suggest]").attr("checked", a.settings.suggest);
                    c(this).find("input[name=pronunciation]").attr("checked", a.settings.pronunciation);
                    c(this).slideDown()
                }));
                b.preventDefault()
            });
            n.init()
        },
        suggest: function (a) {
            this.settings.suggest && n.suggest(a)
        },
        search: function e(c, d, f) {
            b("search=" + c + ", page=" + d + ", push=" + f + ", caller=" + e.caller);
            n.stopSuggest();
            i.query(c, d, f)
        },
        saveSettings: function () {
            this.settings.fontSize =
                parseInt(c("#settings input[name=font_size]:checked").val(), 10);
            this.settings.suggest = c("#settings input[name=suggest]").is(":checked");
            this.settings.pronunciation = c("#settings input[name=pronunciation]").is(":checked");
            var b = {
                expires: 30,
                domain: ".alc.co.jp",
                path: "/"
            };
            c.cookie("fontSize", this.settings.fontSize, b);
            c.cookie("suggest", this.settings.suggest ? 1 : 0, b);
            c.cookie("pronunciation", this.settings.pronunciation ? 1 : 0, b);
            c("#settings").slideUp();
            this.refreshSettings()
        },
        cancelSettings: function () {
            c("#settings").slideUp()
        },
        applyFontSettings: function () {
            20 === this.settings.fontSize ? c(".slide").removeClass("b").addClass("bb") : 17 === this.settings.fontSize ? c(".slide").removeClass("bb").addClass("b") : c(".slide").removeClass("bb").removeClass("b")
        },
        applyPronunciationSettings: function () {
            this.settings.pronunciation ? c("#pronunciation").html("") : c("#pronunciation").html(".kana { display: none }")
        },
        refreshSettings: function () {
            this.applyFontSettings();
            this.applyPronunciationSettings()
        },
        cancelSuggest: function () {
            n.stopSuggest()
        },
        suppressSuggest: function (b) {
            n.suppressSuggest(b)
        },
        clearSuggest: function () {
            n.clear()
        },
        goHome: function () {
            location.href = eowConfig.homeUrl
        },
        fillHeader: function () {
            h.apply(this, Array.prototype.slice.call(arguments))
        },
        loadDeps: function (b) {
            var d = new c.Deferred;
//            c.when(b ? f(eowConfig.resourceUrl + "javascripts/", "searchlib.js") : !0).done(function () {
            c.when(b ? f(eowConfig.rootUrl, "searchlib.js") : !0).done(function () {
                d.resolve()
            });
            return d.promise()
        }
    }
}(jQuery),
    loaddeps = eowApp.loadDeps(eowConfig.searchPage);
$(function () {

    $.when(loaddeps).done(function () {
        setTimeout(scrollTo, 100, 0, 1);
        eowApp.init();
        var c = location.href.match("[\\?&]q=([^&#]+)(&pg=(\\d+))?");
        if (c && c[1]) {
            var f = decodeURIComponent(c[1].replace(/\+/g, " "));
            $("#q").val(f);
            f && (c[3] ? eowApp.search(f, c[3]) : eowApp.search(f, 1))
        }
        $(".nav img").retina();
        $("#pro_login img").retina();
        $(".retina, input").retina({
            "retina-background": !0
        });
        $("#q").clearable({
            id: "input-with-clearbutton",
            btnId: "clearbutton",
            adjustStructure: !1
        });
        $("#clearbutton").retina({
            "retina-background": !0
        });
        var d;
        $("#q").bind("focus", function () {
            d && clearInterval(d);
            eowApp.cancelSuggest();
            d = setInterval(function () {
                eowApp.suggest(document.getElementById("q").value)
            }, 200)
        });
        $("#clearbutton").bind("click", eowApp.clearSuggest());
        $("#q").bind("blur", function () {
            d && clearInterval(d);
            eowApp.cancelSuggest()
        });
        $("header").bind("touchstart", eowApp.clearSuggest);
        $("#word_suggest").bind("touchstart", function (b) {
            b.stopPropagation()
        });
        $("#content").bind("touchstart", function () {
            eowApp.clearSuggest()
        });
        $("#q").bind("focus",
            function () {
                window.scrollTo(0, $("#q").offset().top - 17)
            })
    })
    if(navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('Safari') > 0 && (navigator.userAgent.indexOf('OS 8_4_0') > 0 || navigator.userAgent.indexOf('OS 8_4_1') > 0)){
    
    }else{
        $('#search_header').exFlexFixed({
             watchPosition : true,
             container : 'body'
         });
     }
});


(function(global) {
    global.degitalice = function() {
      valDegitalice = [
        '<script type="text/javascript">',
        'var DIGITALICE_CID = "ev1xzIGCbPmd";',
        'var DIGITALICE_SID = "0pkuBNcAAV7_";',
        '(function() {',
        'var io = document.createElement(\'script\');',
        'io.type = \'text/javascript\';',
        'io.src = (\'https:\' == document.location.protocol ? \'//\' : \'//\') + \'c.iogous.com/js/banner/DIGITALICE_REC.js\';',
        'var s = document.getElementsByTagName(\'script\')[0];',
        's.parentNode.insertBefore(io, s);',
        '})();',
        '</script>'
      ].join('\n');
    document.write(valDegitalice);
    }
      global.yahoomt = function() {
    valYahoomt = [
        '<script type="text/javascript">',
        '/* <![CDATA[ */',
        'var yahoo_ss_retargeting_id = 1000048702;',
        'var yahoo_sstag_custom_params = window.yahoo_sstag_params;',
        'var yahoo_ss_retargeting = true;',
        '/* ]]> */',
        '</script>',
        '<script type="text/javascript" src="//s.yimg.jp/images/listing/tool/cv/conversion.js">',
        '</script>'
    ].join('\n');
    document.write(valYahoomt);
  };
}(window));
