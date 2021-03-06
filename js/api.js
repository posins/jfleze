(function e$$0(m, q, e) {
    function f(d, c) {
        if (!q[d]) {
            if (!m[d]) {
                var b = "function" == typeof require && require;
                if (!c && b) return b(d, !0);
                if (l) return l(d, !0);
                throw Error("Cannot find module '" + d + "'");
            }
            b = q[d] = {
                exports: {}
            };
            m[d][0].call(b.exports, function(a) {
                var k = m[d][1][a];
                return f(k ? k : a)
            }, b, b.exports, e$$0, m, q, e)
        }
        return q[d].exports
    }
    for (var l = "function" == typeof require && require, h = 0; h < e.length; h++) f(e[h]);
    return f
})({
    1: [function(g, m, q) {
        m = g("./includes/clay");
        g("./includes/load");
        m.constants = g("./includes/adsonly");
        m.callbacks = g("./includes/callbacks");
        m.constants = g("./includes/constants");
        m.dependencies = g("./includes/dependencies");
        m.events = g("./includes/events");
        m.offline = g("./includes/offline");
        m.Game = g("./features/game");
        m.Achievement = g("./features/achievement");
        m.Advertisement = g("./features/advertisement");
        m.Test = g("./features/test");
        m.Bar = g("./features/bar");
        m.Environment = g("./features/environment");
        m.Facebook = g("./features/facebook");
        m.Game = g("./features/game");
        m.GameManager = g("./features/gamemanager");
        m.Google = g("./features/google");
        m.Kik = g("./features/kik");
        m.BBM = g("./features/bbm");
        m.Leaderboard = g("./features/leaderboard");
        m.Links = g("./features/links");
        m.Messages = g("./features/messages");
        m.Menu = g("./features/menu");
        m.Payment = g("./features/payment");
        m.Ratings = g("./features/ratings");
        m.Rooms = g("./features/rooms");
        m.Screenshot = g("./features/screenshot");
        m.Social = g("./features/social");
        m.Stats = g("./features/stats");
        m.Stream = g("./features/stream");
        m.Twitter = g("./features/twitter");
        m.UI = g("./features/ui");
        m.UI.Menu = m.Menu;
        m.Player = g("./features/player")
    }, {
        "./features/achievement": 2,
        "./features/advertisement": 3,
        "./features/bar": 4,
        "./features/bbm": 5,
        "./features/environment": 6,
        "./features/facebook": 7,
        "./features/game": 8,
        "./features/gamemanager": 9,
        "./features/google": 10,
        "./features/kik": 11,
        "./features/leaderboard": 12,
        "./features/links": 13,
        "./features/menu": 14,
        "./features/messages": 15,
        "./features/payment": 16,
        "./features/player": 17,
        "./features/ratings": 18,
        "./features/rooms": 19,
        "./features/screenshot": 20,
        "./features/social": 21,
        "./features/stats": 22,
        "./features/stream": 23,
        "./features/test": 24,
        "./features/twitter": 25,
        "./features/ui": 26,
        "./includes/adsonly": 27,
        "./includes/callbacks": 28,
        "./includes/clay": 30,
        "./includes/constants": 32,
        "./includes/dependencies": 33,
        "./includes/events": 34,
        "./includes/load": 35,
        "./includes/offline": 37
    }],
    2: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b, a;
            h = g("../includes/clay");
            b = g("../features/player");
            d = g("../includes/events");
            c = g("../includes/offline");
            f = g("../includes/callbacks");
            a = g("../features/ui");
            l = g("../includes/cheatprevention");
            e = function() {
                function k(a) {
                    this.options = a;
                    "object" !== typeof this.options && (h.log("This form of passing achievement ID is deprecated"), this.options = {
                        id: this.options
                    });
                    this.instanceId = Math.random();
                    c.offline || d.socketListen("achievement", this, !1, !1)
                }
                k.achievementsAwarded = {};
                k.achievementObjs = {};
                k.prototype.award = function(a) {
                    var b;
                    if (!l.validCall()) return "Achievement awarded!";
                    b = this.options.id || this.options.jwt;
                    a = f.add(a);
                    if (k.achievementsAwarded[b]) return f.execute(a, [{}]);
                    k.achievementsAwarded[b] = !0;
                    return
//         c.offline ?
         (h.log("Achievement earned offline"), b = {
                        title: "Test",
                        description: "Description"
                    }, this.show(b, a), c.save("achievement", "award", this.options.id, this.options, !0))
//         : d.socketEmit("achievement", "award", this.options, this.instanceId, a)
                };
                k.prototype.show = function(k, c) {
                    var d;
                    d = window.location !== window.parent.location ? document.referrer : document.location.href;
                    k.success && (~d.indexOf(h.DOMAIN) || k.showExternally) && !k.hideUI && ("clay" !== b.clearance && (k.description +=
                        "<br /><a href='javascript: void( 0 );' onclick='Clay.player.login();'>Login</a> to claim"), a.createNotification({
                        title: k.title,
                        html: k.description,
                        icon: k.icon,
                        type: "achievement"
                    }));
                    return f.execute(c, [k])
                };
                k.showAll = function(a, k) {
                    var b;
                    null == k && (k = !1);
                    k && (b = f.add(k));
                    return d.socketEmit("achievement", "showAll", a, null, b)
                };
                k.fetchAll = function(a, k) {
                    null == a && (a = {});
                    null == k && (k = !1);
                    a.fetch = !0;
                    return this.showAll(a, k)
                };
                k.showAllCallback = function(k, b) {
                    var c, d, n, e, w, h;
                    null == b && (b = !1);
                    n = [];
                    d = k.data;
                    e = 0;
                    if (d &&
                        d.length)
                        for (w = 0, h = d.length; w < h; w++) c = d[w], e % 2 || n.push("<div class='clay-achievement-row'>"), n.push("<div class='clay-achievement-single"), c.icon && n.push(" clay-achievement-with-icon"), c.earned && n.push(" clay-achievement-single-achieved' title='You&#39;ve earned this achievement!'"), c.earned || n.push("' title='You haven&#39;t earned this achievement yet.'"), n.push(">"), n.push("<div class='clay-achievement-single-inner'>"), c.earned ? (n.push("<div class='clay-checkmark-before'"), c.icon && n.push(" style='background-image: url( " +
                                c.icon + " );'"), n.push("></div><div class='clay-checkmark'></div><div class='clay-checkmark-after'></div>")) : (n.push("<div class='clay-xmark-before'"), c.icon && n.push(" style='background-image: url( " + c.icon + " );'"), n.push("></div><div class='clay-xmark'></div><div class='clay-xmark-after'>&times;</div>")), n.push(c.title), n.push(" <span class='clay-achievement-points' title='" + c.points + " points'>(" + c.points + ")</span>"), n.push("<div class='clay-achievement-single-description'>" + c.description + "</div>"),
                            n.push("</div>"), n.push("</div>"), e % 2 && n.push("</div>"), e++;
                    else n.push("This game does not have any achievements!");
                    c = {
                        title: "Achievements",
                        html: n,
                        id: "clay-achievements-wrapper"
                    };
                    k.DOMid && (c.DOMid = k.DOMid);
                    return a.createModal(c, function() {
                        var a;
                        if (a = document.querySelector(".clay-achievement-single-description")) a.style.width = "100%";
                        if (b) return f.execute(b, [k])
                    })
                };
                k.fetchAllCallback = function(a, k) {
                    null == k && (k = !1);
                    if (k) return f.execute(k, [a])
                };
                return k
            }();
            h.readyFunctions.push(function() {
                return d.socketListen("achievement",
                    e, !1, !1)
            });
            m.exports = e
        }).call(this)
    }, {
        "../features/player": 17,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/cheatprevention": 29,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/offline": 37
    }],
    3: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b;
            c = g("../includes/local");
            f = g("../includes/clay");
            h = g("../includes/events");
            l = g("../features/environment");
            d = g("../features/game");
            b = g("../features/ui");
            e = function() {
                function a(a) {
                    this.options = null != a ? a : {};
                    a = !1;
                    this.device = l.type;
                    "desktop" ===
                    this.options.devices && "mobile" === this.device ? a = !0 : "mobile" === this.options.devices && "desktop" === this.device && (a = !0);
                    this.options.position && this.options.position.parent && "string" === typeof this.options.position.parent && (this.options.position.parent = document.getElementById(this.options.position.parent));
                    a || (this.checkFormat(), "preroll" === this.options.size || "preroll-video" === this.options.size ? this.loadPrerollAd() : this.loadStandardAd(), this.visible = !0)
                }
                a.prototype.visible = !1;
                a.prototype.skippable = !1;
                a.prototype.innerAd =
                    null;
                a.prototype.loadPrerollAd = function() {
                    var k, c, r = this;
                    if ("kik" === l.platform) return !1;
                    "undefined" === typeof this.options.duration && (this.options.duration = 15E3);
                    k = [];
                    k.push("<div class='clay-preroller-wrapper' id='clay-preroller-wrapper'>");
                    c = "mobile" === this.device ? "wall" : "preroll-video" === this.options.size ? "video" : "300x250";
                    k.push("\t<div class='clay-preroller" + ("wall" === c || "video" === c ? "-full" : "") + "'>");
                    k.push("\t\t<h4>Advertisement</h4>");
                    k.push("\t\t<div class='clay-preroller-content' id='clay-preroller-content'>\t");
                    k.push("\t\t</div>");
                    k.push("\t\t<div class='clay-load-bar' id='clay-load-bar'>");
                    k.push("\t\t\t<div class='clay-load-bar-progress' id='clay-load-bar-progress'></div>");
                    k.push("\t\t\t<div class='clay-load-bar-text' id='clay-load-bar-text'>Loading " + (d.data && d.data.name ? d.data.name : f.gameKey) + "...</div>");
                    k.push("\t\t</div>");
                    k.push("\t</div>");
                    k.push("</div>");
                    return b.addToContainer(k, function() {
                        r.innerAd = new a({
                            size: c,
                            position: {
                                inline: !0,
                                parent: document.getElementById("clay-preroller-content")
                            }
                        });
                        return r.startLoadBar(r.options.duration)
                    })
                };
                a.prototype.loadProgress = 0;
                a.prototype.timePass = 0;
                a.prototype.startLoadBar = function(a) {
                    var b, c = this;
                    this.loadBar = document.getElementById("clay-load-bar-progress");
                    if (this.options.duration) return b = (new Date).getTime(), this.loaderInterval = setInterval(function() {
                        var d;
                        d = (new Date).getTime();
                        c.timePassed = d - b;
                        c.loadProgress = d = c.timePassed / a * 100;
                        c.updateLoadBar();
                        100 <= d && (clearInterval(c.loaderInterval), c.loadProgress = 100, c.hidePreroll());
                        if (c.timePassed >= c.options.skipDuration &&
                            !c.skippable) return c.startSkip()
                    }, 100)
                };
                a.prototype.updateLoadBar = function() {
                    if (this.loadBar) return this.loadBar.style.width = this.loadProgress + "%"
                };
                a.prototype.hidePreroll = function() {
                    b.removeElement("clay-preroller-wrapper");
                    this.loaderInterval && clearInterval(this.loaderInterval);
                    if (this.options.onHide) return this.options.onHide()
                };
                a.prototype.done = function() {
                    !0 === this.options.allowSkip && !1 !== this.options.duration ? this.startSkip() : this.hidePreroll();
                    return this
                };
                a.prototype.startSkip = function() {
                    var a,
                        b, c = this;
                    if (a = document.getElementById("clay-load-bar-text"))
                        if (a.innerHTML = "", b = document.createElement("a"), b.href = "#", b.onclick = function(a) {
                                a.preventDefault();
                                return c.hidePreroll()
                            }, b.appendChild(document.createTextNode("Skip")), a.appendChild(b), this.skippable = !0, this.options.onSkipStart) return this.options.onSkipStart()
                };
                a.prototype.loadStandardAd = function() {
         //decamincow
//                    var a, b, d, e = this;
//                    "localhost" !== document.location.hostname && "127.0.0.1" !== document.location.hostname || "cross-promotion-bar" === this.options.size ?
//                        (a = document.createElement("iframe"), a.className = "clay-ad", a.src = "cross-promotion-bar" === this.options.size ? f.BASEURL + "/api/bar?key=" + f.gameKey : f.BASEURL + "/api/ad?key=" + f.gameKey + "&size=" + this.options.size + "&pub=" + f.publisherID, a.frameBorder = 0) : (a = document.createElement("div"), a.style.background = "#000", a.style.padding = "10px", a.style.boxSizing = "border-box", b = document.createTextNode("Ads do not show on localhost"), a.appendChild(b));
//                    "cross-promotion-bar" === this.options.size ? ("mobile" === this.device ? (d =
//                        "320px", b = "50px") : this.options.position ? (d = this.options.position.width, b = this.options.position.height) : (d = "100%", b = "80px"), this.size = [parseInt(d), parseInt(b)], a.style.width = d, a.style.height = b, a.src += "&height=" + b + "&width=" + d) : "video" === this.options.size || "wall" === this.options.size ? (this.size = ["100%", "100%"], a.style.width = this.size[0], a.style.height = this.size[1]) : (this.size = this.options.size.split("x"), a.style.width = this.size[0] + "px", a.style.height = this.size[1] + "px");
//                    a.style.overflow = "hidden";
//                    "undefined" !==
//                    typeof this.options.show && !1 === this.options.show && (a.style.display = "none");
//                    this.frame = a;
//                    this.options.position && this.options.position.inline ? this.options.position.parent.appendChild(a) : (a.style.position = "absolute", a.style.zIndex = 9999, this.options.position ? this.setPosition(this.options.position) : (a.style.top = 0, a.style.left = 0), this.updatePosition(), h.addEvent("resize", function() {
//                        return e.updatePosition()
//                    }), c.container && c.container.appendChild(a));
//                    if (this.options.refreshInterval) return this.refreshInterval =
//                        setInterval(function() {
//                            return e.refresh()
//                        }, 1E3 * this.options.refreshInterval)
                };
                a.prototype.setRefreshInterval = function(a) {
                    var b = this;
                    clearInterval(this.refreshInterval);
                    this.refreshInterval = setInterval(function() {
                        return b.refresh()
                    }, 1E3 * a);
                    return this
                };
                a.prototype.parsePosition = function() {
                    var a, b, c, d, e, n, h, w, f;
                    c = {};
                    (d = this.options).position || (d.position = []);
                    d = ["top", "left", "right", "bottom"];
                    e = "top left right bottom webkitTransform mozTransform msTransform".split(" ");
                    b = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    };
                    this.options.position.parent && (b = this.getOffset(this.options.position.parent), b = {
                        top: b.top,
                        left: b.left,
                        right: document.body.clientWidth - b.left,
                        bottom: document.body.clientHeight - b.top
                    });
                    w = 0;
                    for (f = e.length; w < f; w++)
                        if (n = e[w], a = this.options.position[n], "undefined" !== typeof a && -1 !== d.indexOf(n)) {
                            "string" === typeof a && -1 !== a.indexOf("%") && this.options.position.parent && (a = "left" === n || "right" === n ? parseInt(a) / 100 * this.options.position.parent.offsetWidth : parseInt(a) / 100 * this.options.position.parent.offsetHeight,
                                a = parseInt(a));
                            if ("string" !== typeof a || -1 === a.indexOf("%") && -1 === a.indexOf("px")) a += b[n], a += "px";
                            c[n] = a;
                            "center" === this.options.position.reference && (h = this.options.position.scaleWidth || this.size[0], a = this.options.position.scaleHeight || this.size[1], "left" === n ? c["margin-left"] = -1 * h / 2 + "px" : "right" === n ? c["margin-right"] = -1 * h / 2 + "px" : "top" === n ? c["margin-top"] = -1 * a / 2 + "px" : "bottom" === n && (c["margin-bottom"] = -1 * a / 2 + "px"))
                        }
                    if (this.options.position.scaleWidth || this.options.position.scaleHeight) e = this.options.position.scaleWidth ?
                        this.options.position.scaleWidth / this.size[0] : 1, d = this.options.position.scaleHeight ? this.options.position.scaleHeight / this.size[1] : 1, d = "scale( " + e + ", " + d + " )", c["-webkit-transform"] = d, c["-moz-transform"] = d, c["-ms-transform"] = d, c.transform = d, c["-webkit-transform-origin"] = "0 0", c["-moz-transform"] = "0 0", c["-ms-transform"] = "0 0", c.transform = "0 0";
                    return c
                };
                a.prototype.getOffset = function(a) {
                    var b, c;
                    for (c = b = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
                    return {
                        top: c,
                        left: b
                    }
                };
                a.validFormats = "160x600 728x90 300x250 120x600 200x200 468x60 125x125 320x50 preroll preroll-video cross-promotion-bar video wall".split(" ");
                a.prototype.checkFormat = function() {
                    var b;
                    (b = this.options).size || (b.size = "");
                    this.options.size = this.options.size.toLowerCase(); - 1 === a.validFormats.indexOf(this.options.size) && (this.options.size = a.validFormats[0]);
                    return this.options.size
                };
                a.prototype.show = function() {
                    this.visible = !0;
                    "preroll" === this.options.size || "preroll-video" === this.options.size ?
                        f.log("Advertisement.show() is not a valid method for preroll advertisements. Prerolls are shown automatically on creation.") : this.frame && (this.frame.style.display = "block");
                    return this
                };
                a.prototype.hide = function() {
                    this.visible = !1;
                    "preroll" === this.options.size || "preroll-video" === this.options.size ? this.done() : this.frame && (this.frame.style.display = "none");
                    return this
                };
                a.prototype.remove = function() {
                    this.visible = !1;
                    "preroll" === this.options.size || "preroll-video" === this.options.size ? this.done() : (this.frame &&
                        b.removeElement(this.frame), clearInterval(this.refreshInterval));
                    return this
                };
                a.prototype.lastRefresh = 0;
                a.prototype.refresh = function() {
                    var a;
                    a = (new Date).getTime();
                    this.frame.parentNode || clearInterval(this.refreshInterval);
                    this.visible && 3E4 < a - this.lastRefresh && (this.frame && (this.frame.src = this.frame.src), this.lastRefresh = a);
                    return this
                };
                a.prototype.setProgress = function(a) {
                    this.loadProgress = 100 * a;
                    this.updateLoadBar();
                    return this
                };
                a.prototype.getDurationRemaining = function(a) {
                    null == a && (a = "load");
                    if ("load" ===
                        a) return a = this.options.duration - this.timePassed, 0 < a ? a : 0;
                    if ("skip" === a) return a = this.options.skipDuration - this.timePassed, 0 < a ? a : 0
                };
                a.prototype.setPosition = function(a) {
                    var b, c;
                    for (b in a) c = a[b], this.options.position[b] = c;
                    a && a.parent && (this.options.position.parent = a.parent);
                    "undefined" === typeof this.options.position.top && "undefined" === this.options.position.right && "undefined" === this.options.position.bottom && "undefined" === this.options.position.left && (this.options.position.top = 0, this.options.position.left =
                        0);
                    this.updatePosition();
                    return this
                };
                a.prototype.updatePosition = function() {
                    var a, b, c, d;
                    if (this.frame) {
                        b = this.parsePosition();
                        d = [];
                        for (a in b) c = b[a], d.push(this.frame.style.setProperty(a, c));
                        return d
                    }
                };
                return a
            }();
            m.exports = e
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/game": 8,
        "../features/ui": 26,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36
    }],
    4: [function(g, m, q) {
        (function() {
            var e, f, l, h = {}.hasOwnProperty,
                d = function(c, b) {
                    function a() {
                        this.constructor = c
                    }
                    for (var k in b) h.call(b,
                        k) && (c[k] = b[k]);
                    a.prototype = b.prototype;
                    c.prototype = new a;
                    c.__super__ = b.prototype;
                    return c
                };
            g("../includes/local");
            f = g("../includes/clay");
            g("../includes/events");
            g("../features/environment");
            g("../features/game");
            l = g("../features/ui");
            e = function(c) {
                function b(a, c) {
                    var d, e;
                    null == a && (a = {});
                    a.size = "cross-promotion-bar";
                    a.position || (a.position = {});
                    (d = a.position).width || (d.width = "100%");
                    (e = a.position).height || (e.height = "80px");
                    a.position.parent && !1 !== a.position.inline && (a.position.inline = !0);
                    b.__super__.constructor.call(this,
                        a)
                }
                d(b, c);
                return b
            }(g("../features/advertisement"));
            f.Suggestions = function() {
                return function(c, b) {
                    var a;
                    null == c && (c = {});
                    a = {
                        title: "More Games",
                        html: "",
                        id: "clay-suggestions-wrapper"
                    };
                    c.DOMid && (a.DOMid = c.DOMid);
                    l.createModal(a, function() {
                        c = {
                            position: {
                                width: "300px",
                                height: "300px",
                                left: "50%",
                                top: "50%",
                                reference: "center",
                                parent: "clay-suggestions-wrapper-content-inner"
                            }
                        };
                        return new e(c)
                    })
                }
            }();
            m.exports = e
        }).call(this)
    }, {
        "../features/advertisement": 3,
        "../features/environment": 6,
        "../features/game": 8,
        "../features/ui": 26,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36
    }],
    5: [function(g, m, q) {
        (function() {
            var e, f, l;
            l = g("../features/player");
            f = g("../includes/events");
            e = function() {
                function e() {}
                e.linked = !1;
                e.post = function(d, c) {
                    null == d && (d = {});
                    return blackberry.invoke.invoke({
                        target: "sys.bbm.sharehandler",
                        action: "bb.action.SHARE",
                        data: d.message,
                        mimeType: "text/plain"
                    })
                };
                e.connect = function(d, c) {
                    var b;
                    null == d && (d = {});
                    null == c && (c = !1);
                    b = blackberry.bbm.platform.self;
                    l.data || (l.data = {});
                    l.data.name = b.displayName;
                    if (l.loggedIn && "clay" === l.clearance) c && c();
                    else if (e.linked || blackberry.bbm.platform.register({
                            uuid: "2c9fddda-5f69-11e3-8118-d231feb1dc81"
                        }), blackberry.bbm.platform.self.getDisplayPicture(function(a) {
                            l.data.picture = a;
                            a = {
                                username: "bbm-" + b.handle.replace("=", ""),
                                name: b.displayName,
                                picture: a
                            };
                            return f.socketEmit("user", "signupOrLogin", a)
                        }), c) return c()
                };
                e.invite = function(d, c) {
                    null == d && (d = {});
                    null == c && (c = !1);
                    return this.post(d, c)
                };
                return e
            }();
            "object" === typeof blackberry && blackberry.event && blackberry.event.addEventListener("onaccesschanged",
                function(h, d) {
                    if ("unregistered" === d) return e.linked = !1;
                    if ("allowed" === d) return e.linked = !0
                }, !1);
            m.exports = e
        }).call(this)
    }, {
        "../features/player": 17,
        "../includes/events": 34
    }],
    6: [function(g, m, q) {
        (function() {
            var e, f, l;
            e = g("../includes/clay");
            l = g("../includes/local");
            f = function() {
                function e() {}
                e.browser = "unknown";
                e.os = "unknown";
                e.platform = "web";
                e.type = "unknown";
                e.version = 0;
                e.externalResourcesAllowed = !0;
                e.popupsAllowed = !0;
                e.popupListener = !0;
                e.popupBlocker = !0;
                e.check = function() {
                    var d, c = this;
                    d = navigator.userAgent; - 1 !== d.indexOf("Chrome") ? this.browser = "chrome" : -1 !== d.indexOf("Firefox") ? this.browser = "firefox" : -1 !== d.indexOf("MSIE") || -1 !== d.indexOf("Trident/7") ? this.browser = "ie" : -1 !== d.indexOf("Safari") ? this.browser = "safari" : -1 !== d.indexOf("Opera") ? this.browser = "opera" : -1 !== d.indexOf("BB10") && (this.browser = "blackberry");
                    d.match(/(iPad|iPhone|iPod)/) ? this.os = "ios" : -1 !== d.indexOf("Android") ? this.os = "android" : -1 !== d.indexOf("Mobile") && -1 !== d.indexOf("Gecko") && -1 !== d.indexOf("Firefox") ? this.os = "firefoxos" : -1 !== d.indexOf("BB10") &&
                        (this.os = "blackberry");
                    setTimeout(function() {
                        var b;
                        return "function" === typeof(b = window.Clay).client ? b.client({
                            method: "kik.isEnabled"
                        }).then(function(a) {
                            if (a) return c.platform = "kik"
                        }) : void 0
                    }, 1E3);
                    "undefined" !== typeof cards && cards.kik ? this.platform = "kik" : "undefined" !== typeof blackberry && (blackberry.bbm || blackberry.invoke) ? (this.platform = "blackberry", this.popupBlocker = !1) : "firefoxos" === this.os ? this.platform = "firefoxos" : -1 !== d.indexOf("FBIOS") ? this.platform = "facebook-webview" : -1 !== d.indexOf("Twitter for iPhone") ?
                        this.platform = "twitter-webview" : d.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) ? this.platform = "generic-webview" : -1 !== d.indexOf("AmazonWebAppPlatform") ? (this.platform = "amazon", this.popupListener = this.popupsAllowed = !1) : -1 !== d.indexOf("MSAppHost") && "undefined" !== typeof Windows ? (this.platform = "windows8-app", this.popupsAllowed = this.externalResourcesAllowed = !1) : window.CocoonJS && window.CocoonJS.App && (this.platform = "cocoonjs", this.popupsAllowed = !1);
                    "android" === this.os ? this.version = parseFloat(d.slice(d.indexOf("Android") +
                        8)) : "ios" === this.os && (this.version = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || 0);
                    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(d) ||
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(d.substr(0,
                            4)) ? this.type = "mobile" : this.type = "desktop"
                };
                e.platformSpecifics = function() {
                    if ("cocoonjs" === this.platform) return l.container.addEventListener("click", function(d) {
                        if ("A" === d.target.tagName && d.target.href && "http" === d.target.href.substring(0, 4)) return CocoonJS.App.openURL(d.target.href), d.preventDefault()
                    });
                    if ("firefoxos" === e.os) return l.container.className = "clay-firefoxos"
                };
                e.normalizeURL = function(d) {
                    return "kik" === this.platform ? d.replace(/http(s)?:/, "card$1:") : d
                };
                return e
            }();
            f.check();
            e.ready(function() {
                return f.check()
            });
            m.exports = f
        }).call(this)
    }, {
        "../includes/clay": 30,
        "../includes/local": 36
    }],
    7: [function(g, m, q) {
        (function() {
            var e, f = {}.hasOwnProperty,
                l = function(e, d) {
                    function c() {
                        this.constructor = e
                    }
                    for (var b in d) f.call(d, b) && (e[b] = d[b]);
                    c.prototype = d.prototype;
                    e.prototype = new c;
                    e.__super__ = d.prototype;
                    return e
                };
            e = function(e) {
                function d() {}
                l(d, e);
                d.post = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "facebook";
                    return this.superPost(c, b)
                };
                d.getShareURL = function(c) {
//                    return "https://www.facebook.com/dialog/feed?app_id=176274425805503&display=popup&caption=" +
//                        encodeURIComponent(c.message) + (c.link ? "&link=" + encodeURIComponent(c.link) : "") + (c.image ? "&picture=" + encodeURIComponent(c.image) : "") + "&redirect_uri=http://clay.io/api/postreturn"
                };
                d.prototype.post = function(c, b) {
                    null == b && (b = !1);
                    d.post(c, b)
                };
                d.connect = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "facebook";
                    return this.superConnect(c, b)
                };
                d.invite = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "facebook";
                    return this.superInvite(c, b)
                };
                return d
            }(g("../features/social"));
            m.exports = e
        }).call(this)
    }, {
        "../features/social": 21
    }],
    8: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b;
            d = g("../includes/local");
            f = g("../includes/clay");
            h = g("../includes/events");
            c = g("../includes/offline");
            e = g("../includes/callbacks");
            l = g("../features/environment");
            b = g("../features/ui");
            m.exports = {
                listening: !1,
                data: {},
                set: function(a, b) {
                    var c, d;
                    null == a && (a = {});
                    null == b && (b = !1);
                    this.listening || (h.socketListen("game", "Game", null, !1), this.listening = !0);
                    window && window.location && window.location.hash && (a.hash = window.location.hash.replace("#",
                        ""), h.socketListen("links", "Links", null, !0));
                    f.gameKey = a.key;
                    a.version = f.VERSION;
                    a.referrer = window.location !== window.parent.location ? document.referrer : document.location.href;
                    d = l.platform;
                    a.referrer && "web" === d || (a.referrer = d);
                    a.platform = d;
                    b && (c = e.add(b));
                    return h.socketEmit("game", "set", a, null, c)
                },
                store: function(a, b) {
                    var c, r;
                    null == b && (b = !1);
                    this.data = a;
                    f.gameID = a.id;
                    d.curTime = a.serverTime;
                    a.css && l.externalResourcesAllowed && (c = document.createElement("style"), c.appendChild(document.createTextNode(a.css)),
                        r = document.getElementsByTagName("script")[0], r.parentNode.insertBefore(c, r));
                    b && e.execute(b, [a]);
                    return this.checkForUpdates(a.lastUpdate)
                },
                checkForUpdates: function(a) {},
                checkForUpdatesCallback: function(a) {
                    c.set("game", "storage", "lastUpdate", a.lastUpdate, !0);
                    return c.set("achievements", "all", "all", a.achievemens, !0)
                },
                failedLoadCallback: function() {
                    if (f.options && f.options.fail) return f.options.fail()
                },
                error: function(a) {
                    f.log(a);
                    return b.error(a)
                }
            }
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36,
        "../includes/offline": 37
    }],
    9: [function(g, m, q) {
        (function() {
            var e, f, l;
            g("../includes/clay");
            f = g("../includes/events");
            e = g("../includes/callbacks");
            g("../features/ui");
            l = function() {
                function h(d) {
                    this.instanceId = Math.random();
                    this.games = {};
                    f.socketListen("gamemanager", this, null, !1)
                }
                h.prototype.fetchGames = function(d, c) {
                    var b;
                    c && (b = e.add(c));
                    return f.socketEmit("gamemanager", "fetchGames", {
                            limit: d.limit
                        }, this.instanceId,
                        b)
                };
                h.prototype.showGames = function(d, c) {
                    d.show = !0;
                    return this.fetchGames(d, c)
                };
                h.prototype.fetchGamesCallback = function(d, c) {
                    this.games = d.games || {};
                    this.gamesLoaded = !0;
                    d.show && this.showGamesCallback(d);
                    return e.execute(c, [d])
                };
                h.prototype.showGamesCallback = function(d) {};
                h.prototype.getGames = function() {
                    return this.games
                };
                h.prototype.newGame = function(d, c) {
                    var b;
                    null == d && (d = {});
                    null == c && (c = !1);
                    c && (b = e.add(c));
                    return f.socketEmit("gamemanager", "newGame", {
                            to: d.to,
                            data: d.data,
                            reuse: d.reuse
                        }, this.instanceId,
                        b)
                };
                h.prototype.newGameCallback = function(d, c) {
                    d.success && (this.game = d.id, this.games[d.id] = {
                        name: d.name,
                        count: d.count
                    });
                    if (c) return e.execute(c, [this.rooms[d.id]])
                };
                h.prototype.refresh = function(d) {};
                return h
            }();
            (function() {
                function h(d) {
                    this.instanceId = Math.random();
                    this.games = {};
                    f.socketListen("gamemanager", this, null, !1);
                    this.fetchGames()
                }
                h.prototype.send = function(d, c) {
                    var b;
                    c && (b = e.add(c));
                    return f.socketEmit("gamemanager", "fetchGames", {}, this.instanceId, b)
                };
                return h
            })();
            m.exports = l
        }).call(this)
    }, {
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34
    }],
    10: [function(g, m, q) {
        (function() {
            var e, f = {}.hasOwnProperty,
                l = function(e, d) {
                    function c() {
                        this.constructor = e
                    }
                    for (var b in d) f.call(d, b) && (e[b] = d[b]);
                    c.prototype = d.prototype;
                    e.prototype = new c;
                    e.__super__ = d.prototype;
                    return e
                };
            e = function(e) {
                function d() {
                    d.__super__.constructor.apply(this, arguments)
                }
                l(d, e);
                d.post = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "google";
                    return this.superPost(c, b)
                };
                d.getShareURL =
                    function(c) {
                        return "https://plus.google.com/share?url=" + encodeURIComponent(c.link)
                    };
                d.connect = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "google";
                    return this.superConnect(c, b)
                };
                d.invite = function(c, b) {};
                return d
            }(g("../features/social"));
            m.exports = e
        }).call(this)
    }, {
        "../features/social": 21
    }],
    11: [function(g, m, q) {
        (function() {
            var e, f, l, h;
            h = g("../features/player");
            f = g("../includes/events");
            e = g("../includes/callbacks");
            l = function() {
                function d() {}
                d.listening = !1;
                d.listen = function(c) {
                    if (!this.listening) return f.socketListen("kik",
                        this, !1, !1), this.listening = !0
                };
                d.activate = function(c) {
                    null == c && (c = {});
                    f.socketEmit("kik", "activate", {
                        email: c.email,
                        source: c.source
                    });
                    return Clay.Player.data.status = "activated"
                };
                d.invite = function(c, b) {
                    var a, k = this;
                    null == c && (c = {});
                    null == b && (b = !1);
                    a = {
                        onAction: c.onAction
                    };
                    return this.findFriends({
                        maxResults: 1
                    }, function(d) {
                        if (d.befriended && d.befriended.length) d = d.befriended[0];
                        else if (d.needToInvite && d.needToInvite.length) d = d.needToInvite[0];
                        else return;
                        a.to = d.id;
                        c.to = d.username.replace("kik-", "");
                        f.socketEmit("kik",
                            "invite", a);
                        return k.post(c, b)
                    })
                };
                d.post = function(c, b) {
                    var a, k, d;
                    null == c && (c = {});
                    null == b && (b = !1);
                    d = c.message || "";
                    a = c.data || {};
                    k = c.image || "";
                    a = {
                        title: c.title || "Join me",
                        text: d,
                        data: a,
                        noForward: c.noForward || !1
                    };
                    k && (a.pic = k, a.big = !0);
                    c.to ? cards.kik.send(c.to, a) : cards.kik.send(a);
                    if (b) return b()
                };
                d.grabAnonymousToken = function() {
                    if (cards.kik.push && cards.kik.push.getToken && !this.connecting && !this.connected && !localStorage.anonTokenStored || 864E4 < localStorage.anonTokenStored - Date.now()) return cards.kik.push.getToken(function(c) {
                        localStorage.anonTokenStored =
                            Date.now();
                        return f.socketEmit("kik", "storeAnonymousToken", {
                            token: c
                        })
                    })
                };
                d.connecting = !1;
                d.connected = !1;
                d.connect = function(c, b) {
                    var a, k = this;
                    null == c && (c = {});
                    null == b && (b = !1);
                    if (h.loggedIn && "clay" === h.clearance || !Clay.client && null == ("undefined" !== typeof cards && null !== cards ? cards.kik : void 0)) b && b({
                        success: !0
                    });
                    else if (a = function(a) {
                            k.connecting = !1;
                            if (a) return k.connected = !0, cards.push.getToken(function(c) {
                                var k;
                                h.data || (h.data = {});
                                h.data.name = a.fullName;
                                h.data.username = "kik-" + a.username;
                                h.data.picture =
                                    a.thumbnail;
                                k = {
                                    username: "kik-" + a.username,
                                    name: a.fullName,
                                    picture: a.pic
                                };
                                if (!localStorage.tokenStored || 864E4 < localStorage.tokenStored - Date.now()) k.kikToken = c, localStorage.tokenStored = Date.now();
                                if (b) Clay.Player.onLogin(b);
                                return f.socketEmit("user", "signupOrLogin", k)
                            });
                            k.grabAnonymousToken();
                            if (b) return b({
                                success: !1
                            })
                        }, Clay.client) Clay.client({
                        method: "kik.getUser",
                        params: [a]
                    }).then(function(a, b) {
                        return console.log(b)
                    });
                    else return this.connecting = !0, cards.kik.getUser(a)
                };
                d.findFriends = function(c,
                    b) {
                    var a, k = this;
                    null == c && (c = {});
                    null == b && (b = !1);
                    a = e.add(b);
                    return cards.kik.pickUsers(c, function(c) {
                        var d, e, h, n;
                        if (c) {
                            e = [];
                            h = 0;
                            for (n = c.length; h < n; h++) d = c[h], e.push({
                                username: d.username,
                                name: d.fullName,
                                picture: d.pic
                            });
                            c = {
                                users: e,
                                platform: "kik"
                            };
                            k.listen();
                            return f.socketEmit("user", "bulkBefriend", c, !1, a)
                        }
                        b({
                            error: !0,
                            success: !1
                        })
                    })
                };
                d.findFriendsCallback = function(c, b) {
                    null == b && (b = !1);
                    console.log(c);
                    return e.execute(b, [c])
                };
                return d
            }();
            m.exports = l
        }).call(this)
    }, {
        "../features/player": 17,
        "../includes/callbacks": 28,
        "../includes/events": 34
    }],
    12: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b, a, k, p, r, s, u, n;
            k = g("../includes/local");
            l = g("../includes/clay");
            d = g("../includes/events");
            p = g("../includes/offline");
            e = g("../includes/callbacks");
            n = g("../features/ui");
            b = g("../features/game");
            r = g("../features/player");
            h = g("../features/environment");
            f = g("../includes/cheatprevention");
            s = g("../features/social");
            u = g("../features/twitter");
            c = g("../features/facebook");
            g("../features/google");
            a = function() {
                function a(b) {
                    this.options =
                        b;
                    "object" !== typeof this.options && (l.log("This form of passing leaderboard ID is deprecated"), this.options = {
                        id: this.options
                    });
                    this.instanceId = Math.random();
                    p.offline || d.socketListen("leaderboard", this, !1, !1)
                }
                a.prototype.challenge = null;
                a.prototype.setData = function(a) {
                    return this.options.data = a.data
                };
                a.prototype.update = function(a, b) {
                    var c, k, d, e, p, r, f;
                    if (a) {
                        e = document.querySelectorAll(".clay-leaderboard-entry");
                        p = document.querySelector(".clay-leaderboard-table-wrapper tbody");
                        c = [];
                        r = 0;
                        for (f = a.length; r <
                            f; r++) k = a[r], d = this.trFromRow(k, k.rank, {
                            dynamicInsert: !0
                        }), d.events && (c = c.concat(d.events)), document.getElementById("clay-leaderboard-entry-" + k.id) || (p && e[k.rank - 1] ? p.insertBefore(d.html, e[k.rank - 1]) : p && p.appendChild(d.html));
                        return n.handleEvents(c)
                    }
                };
                a.prototype.fetch = function(a, b) {
                    null == a && (a = {});
                    null == b && (b = !1);
                    a.fetch = !0;
                    return this.show(a, b)
                };
                a.prototype.show = function(a, b) {
                    var c, k, p = this;
                    null == a && (a = {});
                    null == b && (b = !1);
                    this.options.id && !a.id && (a.id = this.options.id);
                    this.options.data && !a.data &&
                        (a.data = this.options.data);
                    this.options.tabs && !a.tabs && (a.tabs = this.options.tabs);
                    this.options.filters && !a.filters && (a.filters = this.options.filters);
                    this.prevTab = 0;
                    this.tabs = {};
                    a.fetch || (k = {
                        title: "Loading Leaderboard...",
                        html: "",
                        id: "clay-leaderboard-wrapper",
                        loading: !0
                    }, n.createModal(k, function() {
                        if (a.listen) return d.addEvent("closemodal", function() {
                            return p.stopListening()
                        }, !1, !0, document.getElementById(k.id))
                    }));
                    b && (c = e.add(b));
                    return d.socketEmit("leaderboard", "show", a, this.instanceId, c)
                };
                a.prototype.stopListening =
                    function() {
                        return d.socketEmit("leaderboard", "stopListening", {}, this.instanceId)
                    };
                a.prototype.returnJSON = function(a, b) {
                    var c;
                    c = a.data || {};
                    a.getRank && (c = {
                        data: c,
                        rank: a.rank
                    });
                    if (b) return e.execute(b, [c])
                };
                a.prototype.display = function(a, b) {
                    var c, k, d, p, f, h, l, g, s, t, u, m, q = this;
                    null == b && (b = !1);
                    this.tabs[this.prevTab] = a;
                    p = [];
                    a.name || (a.name = "");
                    k = [];
                    g = [];
                    h = "";
                    if (a.requireLogin) p.push("<p>You must <a href='#' id='clay-leaderboard-login'>login</a> to Clay.io to view your friends' scores</p>"), k = [{
                        id: "clay-leaderboard-login",
                        action: "click",
                        handler: function() {
                            r.login(function() {
                                a.reloadUser = !0;
                                a.requireLogin = !1;
                                return q.show(a)
                            });
                            return !1
                        }
                    }];
                    else {
                        a.html && p.push("<div class='clay-leaderboard-custom-html'>" + a.html + "</div>");
                        a.personal && p.push("<div class='clay-leaderboard-personal' id='clay-leaderboard-personal-" + this.instanceId + "'>" + a.personal + "</div>");
                        if (a.tabs && 1 < a.tabs.length)
                            for (s = a.tabs, h = function() {
                                    var a, b;
                                    a = d;
                                    b = l;
                                    return g.push({
                                        name: l.title,
                                        focused: q.prevTab === a,
                                        callback: function() {
                                            b.index = a;
                                            return q.setTab(b)
                                        }
                                    })
                                },
                                d = c = 0, f = s.length; c < f; d = ++c) l = s[d], h();
                        p.push("<div class='clay-leaderboard-table-wrapper' id='clay-leaderboard-table-" + this.instanceId + "'>");
                        h = this.getTable(a);
                        p.push(h.html.join(""));
                        p.push("</div>");
                        h.events && h.events.length && (k = k.concat(h.events));
                        h = "<div class='clay-td-first' style='width: 15%; min-width: 65px;'>Rank</div>";
                        a.header && (this.header = a.header);
                        m = a.header;
                        d = t = 0;
                        for (u = m.length; t < u; d = ++t) c = m[d], f = d === a.header.length - 1 ? "-last" : "", s = 85 / a.header.length, "Name" === c && (s = Math.round(14 * s) / 10),
                            "Score" === c && (s = Math.round(6 * s) / 10), h += "<div class='clay-td" + f + "' style='width: " + s + "%'>" + c + "</div>"
                    }
                    c = document.getElementById("clay-leaderboard-wrapper");
                    k = {
                        title: a.name || "Leaderboard",
                        html: p,
                        id: a.DOMid || "clay-leaderboard-wrapper",
                        events: k,
                        tabs: g,
                        subnav: h,
                        loading: !1
                    };
                    c && "none" !== c.style.display ? n.updateModal(k) : n.createModal(k);
                    if (b) return e.execute(b, [a])
                };
                a.prototype.hide = function() {
                    return n.closeModal("clay-leaderboard-wrapper")
                };
                a.prototype.setTabs = function(a) {
                    return this.options.tabs = a.tabs
                };
                a.prototype.setTab = function(a) {
                    var b, c;
                    b = "undefined" !== typeof a.selected;
                    (c = document.getElementById("clay-leaderboard-tab-" + this.prevTab)) && !b && (c.className = "");
                    (c = document.getElementById("clay-leaderboard-tab-" + a.index)) && !b && (c.className = "clay-tab-focus");
                    c = document.getElementById("clay-leaderboard-wrapper-scroll-indicator");
                    n.removeElement(c);
                    this.prevTab = a.index;
                    this.prevTabFilter = b = a.index + (b ? "-" + a.selected : "");
                    if (this.tabs[b]) this.setTabCallback(this.tabs[b]);
                    else return b = {
                        title: "Loading Leaderboard...",
                        html: "",
                        id: "clay-leaderboard-wrapper",
                        loading: !0
                    }, n.updateModal(b), d.socketEmit("leaderboard", "setTab", a, this.instanceId)
                };
                a.prototype.setTabCallback = function(a) {
                    var b, c;
                    (b = this.tabs)[c = this.prevTabFilter] || (b[c] = a);
                    return this.display(a)
                };
                a.prototype.removeEntry = function(a) {
                    n.removeElement("clay-leaderboard-entry-" + a.id);
                    return d.socketEmit("leaderboard", "removeEntry", a, this.instanceId)
                };
                a.prototype.removeEntryCallback = function(a) {
                    if (a.error) return l.log("There was an error deleting that leaderboard score! " +
                        a.error)
                };
                a.prototype.share = function(a) {
                    var d, n, p, e, r, f, l, s, g;
                    if ("cocoonjs" !== h.platform && "windows8-app" !== h.platform) {
                        if (d = document.getElementById("clay-leaderboard-share-wrapper-" + a.id)) return d.parentNode.removeChild(d);
                        f = document.getElementById("clay-leaderboard-entry-" + a.id);
                        s = document.createElement("div");
                        s.className = "clay-share-score-wrapper";
                        s.id = "clay-leaderboard-share-wrapper-" + a.id;
                        (n = document.getElementsByClassName("clay-leaderboard-entry")) && n.length && n[n.length - 1].id === f.id && (s.className +=
                            " clay-share-score-wrapper-top");
                        l = f.getAttribute("data-score");
                        r = f.getAttribute("data-rank");
                        n = r.charAt(r.length - 1);
                        r = "1" === n ? r + "st" : "2" === n ? r + "nd" : "3" === n ? r + "rd" : r + "th";
                        p = k.getGameLink();
                        n = document.createElement("a");
                        n.className = "clay-share-score-facebook";
                        n.href = "#";
                        n.onclick = function(k) {
                            var n;
                            n = "I just scored " + l + " and am ranked " + r + " in " + b.data.name + ". Think you can beat my score?";
                            c ? (new c).post({
                                message: n + " " + p
                            }) : window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + p + "&p[title]=" +
                                b.data.name + "&p[summary]=" + encodeURIComponent(n));
                            (d = document.getElementById("clay-leaderboard-share-wrapper-" + a.id)) && d.parentNode.removeChild(d);
                            return k.preventDefault()
                        };
                        f = document.createTextNode("Share on Facebook");
                        n.appendChild(f);
                        g = document.createElement("a");
                        g.className = "clay-share-score-twitter";
                        g.href = "#";
                        g.onclick = function(c) {
                            var k;
                            k = "I just scored " + l + " and am ranked " + r + " in " + b.data.name + ". Think you can beat my score? " + p;
                            u ? (new u).post({
                                message: k
                            }) : window.open("http://twitter.com/home?status=" +
                                encodeURIComponent(k));
                            (d = document.getElementById("clay-leaderboard-share-wrapper-" + a.id)) && d.parentNode.removeChild(d);
                            return c.preventDefault()
                        };
                        f = document.createTextNode("Share on Twitter");
                        g.appendChild(f);
                        s.appendChild(n);
                        s.appendChild(g);
                        if (e = document.getElementById("clay-leaderboard-share-" + a.id)) e = e.parentNode;
                        if (e) return setTimeout(function() {
                            return e.appendChild(s)
                        }, 0)
                    }
                };
                a.prototype.getTable = function(a) {
                    var b, c, k, d, n, p, e, r, f = this;
                    d = [];
                    c = [];
                    k = !1;
                    if (a.filters && 1 < a.filters.length) {
                        k = [];
                        k.push("<select id='clay-leaderboard-filters'>");
                        r = a.filters;
                        n = p = 0;
                        for (e = r.length; p < e; n = ++p) b = r[n], k.push("<option value='" + n + "'" + (b.selected ? " selected='selected'" : "") + ">"), k.push(b.title), k.push("</option>");
                        c.push({
                            id: "clay-leaderboard-filters",
                            action: "change",
                            handler: function() {
                                var b, c;
                                if (b = document.getElementById("clay-leaderboard-filters")) return c = JSON.parse(JSON.stringify(a.filters[b.value])), c.index = f.prevTab || 0, c.selected = b.value, f.setTab(c, b.value)
                            }
                        })
                    }
                    d.push("<table>");
                    d.push("<thead>");
                    k && (b = a.header && a.header.length ? a.header.length +
                        1 : 0, d.push("<tr><th class='clay-leaderboard-filters' colspan='" + b + "'>"), d.push("Filter by: " + k.join("")), d.push("</th></tr>"));
                    d.push("</thead>");
                    d.push("<tbody>");
                    if (a.data && 0 !== a.data.length && 0 !== a.data[0].length) {
                        n = a.data;
                        p = k = 0;
                        for (b = n.length; k < b; p = ++k) e = n[p], p = this.trFromRow(e, p + 1, a), d.push(p.html.join("")), p.events && p.events.length && (c = c.concat(p.events));
                        a.rank && a.rank.rank > a.data.length && (a.rank.rank > a.data.length + 1 && d.push("<tr class='clay-leaderboard-filler-row'><td colspan='" + (a.header.length +
                            1) + "'>...</td></tr>"), a.ignoreCSSRank = !0, p = this.trFromRow(a.rank.row, a.rank.rank, a), d.push(p.html.join("")), p.events && p.events.length && (c = c.concat(p.events)))
                    } else b = a.header.length || "", d.push("<tr><td colspan='" + b + "'>No high scores yet!</td></tr>");
                    d.push("</tbody>");
                    d.push("</table>");
                    return {
                        html: d,
                        events: c
                    }
                };
                a.prototype.trFromRow = function(a, b, c) {
                    var d, n, p, e, f, s, g, t, u, m, q = this;
                    f = [];
                    p = [];
                    c.dynamicInsert ? (n = document.createElement("tr"), n.className = (a.me ? "clay-leaderboard-me" : "") + " clay-leaderboard-entry",
                        n.id = a.id ? "clay-leaderboard-entry-" + a.id : "clay-leaderboard-entry-" + b, n.setAttribute("data-score", a.score), n.setAttribute("data-rank", b)) : f.push("<tr class='" + (a.me ? "clay-leaderboard-me" : "") + " clay-leaderboard-entry' id='" + (a.id ? "clay-leaderboard-entry-" + a.id : "clay-leaderboard-entry-" + b) + "' data-score='" + a.score + "' data-rank='" + b + "'>");
                    f.push("<td class='clay-leaderboard-rank' style='width: 15%; min-width: 65px;'><span><span>" + b + "</span></span></td>");
                    d = c.customData ? Object.keys(a) : ["name", "score"];
                    u = 0;
                    for (m = d.length; u < m; u++) s = d[u], t = a[s], (e = c.header && c.header.length ? c.header : this.header && this.header.length ? this.header : !1) ? (e = e.length, e = 85 / e, "name" === s && (e = Math.round(14 * e) / 10), "score" === s && (e = Math.round(6 * e) / 10), f.push("<td style='width: " + e + "%;'>")) : f.push("<td>"), f.push("<div class='relative'>"), "number" === typeof t && (t = t.toString(), -1 !== t.indexOf(".") ? (e = t.split("."), t = e[0], t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ","), e = e[1], t = t + "." + e) : t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ",")), "name" === s && a.user_id ?
                        (f.push("<img src='" + a.photo_url + "' /> "), f.push("<a href='" + l.BASEURL + "/userid/" + a.user_id + "' class='clay-pad-link' target='_blank'>"), f.push(k.htmlEntities(t)), f.push("</a>")) : (c.allowHTML ? f.push(t) : f.push(k.htmlEntities(t)), a.me && "score" === s && r.loggedIn && "clay" === r.clearance && "kik" !== h.platform && (g = a.id || b, t = function(a) {
                                q.share({
                                    id: g
                                });
                                a.preventDefault();
                                return a.stopPropagation()
                            }, f.push("<div class='clay-share-score'>"), f.push("\t<a href='#' id='clay-leaderboard-share-" + g + "' class='clay-share-score-link'>share</a>"),
                            f.push("</div>"), p.push({
                                id: "clay-leaderboard-share-" + g,
                                action: "click",
                                handler: t
                            })), c.admin && "score" === s && function() {
                            g = a.id;
                            f.push("<a id='clay-leaderboard-remove-" + a.id + "' class='clay-close'></a>");
                            return p.push({
                                id: "clay-leaderboard-remove-" + a.id,
                                action: "click",
                                handler: function() {
                                    q.removeEntry({
                                        id: g
                                    });
                                    return !1
                                }
                            })
                        }()), f.push("</div>"), f.push("</td>");
                    c.dynamicInsert ? (n.innerHTML = f.join(""), f = n) : f.push("</tr>");
                    return {
                        html: f,
                        events: p
                    }
                };
                a.prototype.post = function(a, b) {
                    var c, k = this;
                    if (!f.validCall()) return "Score posted! Scoreboard update soon.";
                    c = function() {
                        var c, n;
                        "object" !== typeof a && (l.log("This form of passing leaderboard score is deprecated"), a = {
                            score: a
                        });
                        a.id = k.options.id;
                        b && (c = e.add(b));
                        return p.offline ? (n = {
                            title: "Score Saved",
                            content: "Your score will be posted to the globl leaderboard when you connect to the internet"
                        }, k.postCallback(n, c), p.save("leaderboard", "post", a.id, a, !0)) : d.socketEmit("leaderboard", "post", a, k.instanceId, c)
                    };
                    return p.offline || a.name ? c() : r.requireLogin(function() {
                        return c()
                    })
                };
                a.prototype.postCallback = function(b,
                    c) {
                    var k, d;
                    b.hideUI || n.createNotification({
                        title: b.title,
                        html: b.content
                    });
                    a.challenge && a.challenge.leaderboard_id === b.leaderboard_id && b.score > a.challenge.score && (d = [], d.push("<div class='clay-challenge-text'><strong>Congratulations, scored</strong></div>"), d.push("<h1 class='clay-challenge-score'>You scored " + b.score + "</h1>"), d.push("<div class='clay-challenge-text'>You surpassed " + a.challenge.name + "'s score of " + a.challenge.score + "</div>"), d.push("<div><input type='submit' value='Share Your Accomplishment' id='clay-challenge-share-button' /></div>"),
                        k = [], k.push({
                            id: "clay-challenge-share-button",
                            handler: function() {
                                return Links.create({
                                    type: "challenge",
                                    scoreId: b.id
                                }, function(b) {
                                    return s.share({
                                        message: "I just beat " + a.challenge.name + "'s score in " + l.Game.data.name + ". Think you can beat my score? " + b.url
                                    })
                                })
                            }
                        }), k = {
                            id: "clay-challenge-wrapper",
                            title: "You've Been Challenged!",
                            html: d,
                            events: k
                        }, n.createModal(k));
                    return e.execute(c, [b])
                };
                a.prototype.challenge = function(a, b) {
                    var k, p, e = this;
                    k = [];
                    p = [];
                    p.push("<h3 class='clay-challenge-score'>500</h3>");
                    p.push("<div id='clay-challenge-direct-link-wrapper'>Generating direct link...</div>");
                    u && p.push("<label for='clay-challenge-twitter'><input type='checkbox' id='clay-challenge-twitter' /> Post Challenge to Twitter</label>");
                    c && p.push("<label for='clay-challenge-facebook'><input type='checkbox' id='clay-challenge-facebook' /> Post Challenge to Facebook</label>");
                    p.push("<label for='clay-challenge-friends'><input type='checkbox' id='clay-challenge-friends' /> Challenge Facebook Friends</label>");
                    p.push("<div id='clay-challenge-friends-frame'></div>");
                    p.push("<div><input type='submit' id='clay-challenge-button' value='Challene Friends' /></div>");
                    k.push({
                        id: "clay-challenge-friends",
                        action: "change",
                        handler: function() {
                            var a;
                            a = document.createElement("iframe");
                            a.src = l.BASEURL + "/api/facebookchallenge?id=" + l.gameID;
                            a.frameBorder = 0;
                            return document.getElementById("clay-challenge-friends-frame").appendChild(a)
                        }
                    });
                    k.push({
                        parentElementId: "clay-challenge-button",
                        action: "click",
                        handler: function() {
                            return e.postChallenge()
                        }
                    });
                    n.createModal({
                        title: "Challenge a Friend",
                        html: p,
                        id: "clay-challenge-wrapper",
                        events: k
                    });
                    return d.socketEmit("leaderboard", "getDirectLink",
                        this.options, this.instanceId)
                };
                a.prototype.directLinkCallback = function(a) {
                    var b, c;
                    c = document.getElementById("clay-challenge-direct-link-wrapper");
                    c.innerHTML = "";
                    b = document.createElement("text");
                    b.id = "clay-challenge-direct-link";
                    b.value = a.link;
                    c.appendChild(b);
                    return b.onclick = b.select()
                };
                a.prototype.postChallenge = function() {
                    return (new c).post({
                        message: "",
                        link: ""
                    })
                };
                return a
            }();
            m.exports = a
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/facebook": 7,
        "../features/game": 8,
        "../features/google": 10,
        "../features/player": 17,
        "../features/social": 21,
        "../features/twitter": 25,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/cheatprevention": 29,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36,
        "../includes/offline": 37
    }],
    13: [function(g, m, q) {
        (function() {
            var e, f, l, h, d;
            f = g("../includes/events");
            e = g("../includes/callbacks");
            l = g("../features/leaderboard");
            d = g("../features/ui");
            h = {
                create: function(c, b) {
                    var a;
                    null == c && (c = {});
                    null == b && (b = !1);
                    b && (a = e.add(b));
                    f.socketListen("links",
                        "Links", null, !0);
                    return f.socketEmit("links", "create", c, null, a)
                },
                createCallback: function(c, b) {
                    null == b && (b = !1);
                    c.updateCurrent && (history && history.pushState ? history.pushState({
                        module: "leave"
                    }, document.title, "#" + c.hash) : window.location.hash = c.hash);
                    c.url = window.location.origin + window.location.pathname + "#" + c.hash;
                    if (b) return e.execute(b, [c])
                },
                processHash: function(c) {
                    null == c && (c = {});
                    "data" === c.type || "challenge" === c.type ? (this.data = c.data, this.dataCallback && this.dataCallback(this.data)) : "room" === c.type &&
                        (this.rooms = new Clay.Rooms, this.rooms.joinRoom({
                            id: c.roomId
                        }));
                    if ("challenge" === c.type) return this.displayChallenge(), l.challenge = this.data
                },
                displayChallenge: function() {
                    var c, b;
                    b = [];
                    b.push("<div class='clay-challenge-text'><strong>" + this.data.name + "</strong> challenged you to beat their score of: </div>");
                    b.push("<h1 class='clay-challenge-score'>" + this.data.score + "</h1>");
                    b.push("<div class='clay-challenge-text'>Think you have what it takes?</div>");
                    b.push("<div><a href='#' class='clay-button' id='clay-challenge-play-button'>Play " +
                        Clay.Game.data.name + "</a></div>");
                    c = [];
                    c.push({
                        id: "clay-challenge-play-button",
                        handler: function() {
                            return d.closeModal("clay-challenge-wrapper")
                        }
                    });
                    return d.createModal({
                        id: "clay-challenge-wrapper",
                        title: "You've Been Challenged!",
                        html: b,
                        events: c
                    })
                },
                data: null,
                dataCallback: null,
                getData: function(c) {
                    null == c && (c = !1);
                    null !== this.data && c ? c(h.data) : c && (this.dataCallback = c);
                    return this.data
                },
                getChallenge: function(c) {
                    null == c && (c = !1);
                    return this.getData(c)
                },
                share: function() {}
            };
            m.exports = h
        }).call(this)
    }, {
        "../features/leaderboard": 12,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/events": 34
    }],
    14: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c;
            e = g("../includes/clay");
            h = g("../includes/local");
            f = g("../features/environment");
            c = g("../features/player");
            g("../includes/callbacks");
            l = g("../includes/events");
            d = function() {
                function b() {}
                b.container = null;
                b.menuState = "hidden";
                b.init = function(a) {
                    var c, d, e;
                    this.options = a;
                    c = document.createElement("div");
                    c.id = "clay-swipe-menu";
                    this.container = c;
                    d = document.createElement("div");
                    d.id = "clay-swipe-menu-button";
                    e = document.createElement("div");
                    e.id = "clay-swipe-menu-button-inner";
                    d.appendChild(e);
                    b.menuContents = document.createElement("div");
                    b.menuContents.id = "clay-swipe-menu-contents";
                    b.menuContents = b.renderItems(b.menuContents, a.items);
                    b.container.appendChild(d);
                    b.container.appendChild(b.menuContents);
                    h.container && h.container.appendChild(c);
                    b.wrapperOverlay = document.createElement("div");
                    b.wrapperOverlay.id = "clay-wrapper-overlay";
                    b.wrapperOverlay.style.display = "none";
                    h.container && h.container.appendChild(b.wrapperOverlay);
                    return b.ready()
                };
                b.renderItems = function(a, c) {
                    var d, e, f, h, n;
                    e = document.createElement("h2");
                    e.innerHTML = "Clay.io Menu";
                    f = document.createElement("ul");
                    f.className = "clay-ul";
                    c || (c = {});
                    "undefined" !== typeof Mobile && Mobile.subscribeToEmailUpdates && c.push({
                        title: "Email Updates",
                        handler: Mobile.subscribeToEmailUpdates
                    });
                    h = 0;
                    for (n = c.length; h < n; h++) d = c[h], b.renderItem(f, d);
                    a.appendChild(e);
                    a.appendChild(f);
                    return a
                };
                b.renderItem = function(a, c) {
                    var d, e, f;
                    f = document.createElement("li");
                    d = document.createElement("a");
                    d.innerHTML = "<span>" + c.title + "</span>";
                    "Share This" === c.title ? d.className = "clay-share-this" : c.className && (d.className = c.className);
                    c.handler && (e = function(a) {
                        a.preventDefault();
                        b.hideSwipe();
                        "undefined" !== typeof _gaq && _gaq.push(["_trackEvent", "Swipe Bar", "Action", c.title]);
                        return c.handler(a)
                    }, l.addEvent("fastclick", e, !1, !1, d));
                    f.appendChild(d);
                    return a.appendChild(f)
                };
                b.achievementsVisible = !1;
                b.renderAchievements = function(a) {
                    var k, d, r, f;
                    b.achievementsVisible = !0;
                    (f = document.getElementById("clay-swipe-menu-achievements")) ?
                    (k = !0, f.innerHTML = "") : (f = document.createElement("div"), f.id = "clay-swipe-menu-achievements");
                    d = document.createElement("h2");
                    d.innerHTML = "Achievements";
                    r = document.createElement("ul");
                    r.className = "clay-ul";
                    e.ready(function() {
                        return e.Player.onLogin(function() {
                            if ("kik" === c.data.status) return b.renderItem(r, {
                                title: "Enable Achievements",
                                handler: function() {
                                    if (Mobile && Mobile.subscribeToEmailUpdates) return Mobile.subscribeToEmailUpdates({
                                            message: "Update your email address to enable achievements",
                                            source: "enable-achievements"
                                        },
                                        function() {
                                            return b.achievementsVisible = !1
                                        })
                                }
                            });
                            b.renderItem(r, {
                                title: "Show All",
                                handler: function() {
                                    return e.Achievement.showAll()
                                }
                            });
                            return e.Achievement.fetchAll({}, function(a) {
                                var c, k, d, e, p;
                                a = a.data;
                                p = [];
                                d = 0;
                                for (e = a.length; d < e; d++) c = a[d], k = c.earned ? "clay-swipe-menu-achievement clay-swipe-menu-achievement-achieved" : "clay-swipe-menu-achievement", c = {
                                    title: c.title,
                                    className: k,
                                    handler: function() {}
                                }, p.push(b.renderItem(r, c));
                                return p
                            })
                        })
                    });
                    f.appendChild(d);
                    f.appendChild(r);
                    k || a.appendChild(f);
                    return a
                };
                b.crossPromotionVisible = !1;
                b.renderCrossPromotion = function() {
                    var a, c;
                    b.crossPromotionVisible = !0;
                    a = document.createElement("div");
                    a.className = "clay-cross-promotion";
                    c = [];
                    c.push("<h2>Suggestions</h2>");
                    c.push("<ul id='clay-cross-promotion-icons' class='clay-ul'><li>Loading...</li></ul>");
                    l.socketListen("menu", this, !1, !1);
                    l.socketEmit("crosspromotion", "grabIcons");
                    a.innerHTML = c.join("");
                    return b.menuContents.appendChild(a)
                };
                b.grabIconsCallback = function(a) {
                    var b, c, d, e, h, n, g, w, m, x;
                    h = document.getElementById("clay-cross-promotion-icons");
                    h.innerHTML = "";
                    m = a.icons;
                    n = function(a, b) {
                        var c;
                        c = function(d) {
                            var k = this;
                            d.preventDefault();
                            d = function() {
                                if ("Poker!" === a.name) k.children[1].innerHTML = "Coming soon!", l.removeEvent("click", c, !1, k), l.removeEvent("touchstart", c, !1, k);
                                else return window.location.href = b.href
                            };
                            return "undefined" !== typeof _gaq ? (_gaq.push(["_trackEvent", "Swipe XPromotion", a.url, "Swipe Ad Click"]), _gaq.push(d)) : d()
                        };
                        return l.addEvent("fastclick", c, !1, !1, b)
                    };
                    x = [];
                    g = 0;
                    for (w = m.length; g < w; g++) a = m[g], d = document.createElement("li"),
                        b = document.createElement("a"), b.className = "clay-cross-promotion-icon", b.href = f.normalizeURL(a.url), c = document.createElement("img"), c.src = a.icon, e = document.createElement("span"), e.innerHTML = a.name, b.appendChild(c), b.appendChild(e), "undefined" !== typeof _gaq && _gaq.push(["_trackEvent", "Swipe XPromotion", a.url, "Swipe Ad View"]), n(a, b), d.appendChild(b), x.push(h.appendChild(d));
                    return x
                };
                b.ready = function() {
                    var a, c;
                    if (a = document.getElementById("clay-swipe-menu-button")) c = function(a) {
                        a.preventDefault();
                        return "hidden" ===
                            b.menuState ? b.showSwipe() : b.hideSwipe()
                    }, l.addEvent("fastclick", c, !1, !1, a), l.addEvent("fastclick", c, !1, !1, b.wrapperOverlay);
                    return setTimeout(b.resize, 0)
                };
                b.resize = function() {
                    return b.container.style.minHeight = window.innerHeight + "px"
                };
                b.showSwipe = function() {
                    b.container.style.right = 0;
                    b.wrapperOverlay.style.display = "block";
                    b.menuState = "visible";
                    "undefined" !== typeof _gaq && _gaq.push(["_trackEvent", "Swipe Bar", window.location.href, "show"]);
                    "ios" === f.os && 5 > f.version && (b.container.style.top = window.scrollY +
                        "px", b.container.style.position = "absolute", this.scrollListenerAdded || window.addEventListener("scroll", function() {
                            return b.container.style.top = window.scrollY + "px"
                        }), this.scrollListenerAdded = !0);
                    b.crossPromotionVisible || b.renderCrossPromotion();
                    b.achievementsVisible || this.options.hideAchievements || b.renderAchievements(b.menuContents);
                    "undefined" !== typeof cards && cards.browser && cards.browser.back && cards.browser.back(b.hideSwipe);
                    return !1
                };
                b.hideSwipe = function() {
                    b.container.style.right = "-200px";
                    b.wrapperOverlay.style.display =
                        "none";
                    b.menuState = "hidden";
                    "undefined" !== typeof cards && cards.browser && cards.browser.unbindBack && cards.browser.unbindBack(b.hideSwipe);
                    return !1
                };
                b.hasCSSProperty = function(a) {
                    return window.getComputedStyle ? window.getComputedStyle(document.body, null)[a] : document.body.currentStyle[a]
                };
                b.supportOverflowScrolling = function() {
                    return this.hasCSSProperty("overflow-scrolling") || this.hasCSSProperty("-webkit-overflow-scrolling") || this.hasCSSProperty("-moz-overflow-scrolling") || this.hasCSSProperty("-o-overflow-scrolling")
                };
                return b
            }();
            m.exports = d
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/player": 17,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36
    }],
    15: [function(g, m, q) {
        (function() {
            var e, f, l, h, d;
            h = g("../features/player");
            d = g("../features/ui");
            e = g("../includes/callbacks");
            l = g("../includes/local");
            f = g("../includes/events");
            m.exports = {
                listening: !1,
                listen: function() {
                    if (!this.listening) return f.socketListen("messages", "Messages", !1, !1), this.listening = !0
                },
                modalOpen: function() {
                    return !!document.getElementById("clay-messages-wrapper")
                },
                compose: function(c, b) {
                    var a, k, e, f = this;
                    null == c && (c = {});
                    null == b && (b = !1);
                    k = [];
                    a = [];
                    k.push("<div class='clay-message-compose'>");
                    k.push("\t<div class='clay-message-compose-to'><label for='clay-message-to'>To: </label>");
                    c.to ? k.push(c.to) : k.push("\t\t<input type='text' id='clay-message-to' class='inline default-input' placeholder='Enter a username...' />");
                    k.push("</div>");
                    k.push("\t<div class='clay-message-compose-subject'><label for='clay-message-subject'>Subject: </label>");
                    k.push("\t\t<input type='text' id='clay-message-subject' class='inline default-input' placeholder='Enter a subject...' />");
                    k.push("</div>");
                    e = c.message || "";
                    k.push("\t<textarea id='clay-message-compose-text' placeholder='Enter a message...'>" + e + "</textarea>");
                    k.push("\t<input type='submit' id='clay-message-compose-button' />");
                    a.push({
                        id: "clay-message-compose-button",
                        handler: function(a) {
                            var b, d;
                            a.preventDefault();
                            a = document.getElementById("clay-message-compose-text");
                            e = a.value;
                            a.value = "";
                            d = (d = document.getElementById("clay-message-to")) ? d.value : c.to;
                            b = (b = document.getElementById("clay-message-subject")) ? b.value : c.subject;
                            if (a) return f.send({
                                to: d,
                                subject: b,
                                message: e
                            })
                        }
                    });
                    a = {
                        title: "Compose a Message",
                        html: k,
                        id: "clay-messages-wrapper",
                        events: a
                    };
                    this.modalOpen() || (a.tabs = this.getTabs("compose"));
                    c.DOMid && (a.DOMid = c.DOMid);
                    return d.createModal(a)
                },
                send: function(c, b) {
                    var a, d;
                    null == b && (b = !1);
                    if (c.message) {
                        if (d = document.getElementById("clay-messages")) d.innerHTML = this.displayMessage({
                            message: c.message,
                            from_id: h.data.id
                        }) + d.innerHTML;
                        b && (a = e.add(b));
                        this.listen();
                        return f.socketEmit("messages", "send", c, null, a)
                    }
                },
                sendCallback: function(c,
                    b) {
                    if (!c.reply) return this.show({
                        id: c.id
                    })
                },
                getTabs: function(c) {
                    var b, a = this;
                    b = [];
                    b.push({
                        name: "Inbox",
                        focused: "inbox" === c,
                        callback: function() {
                            return a.showAll()
                        }
                    });
                    b.push({
                        name: "Compose",
                        focused: "compose" === c,
                        callback: function() {
                            return a.compose()
                        }
                    });
                    return b
                },
                show: function(c, b) {
                    var a;
                    null == b && (b = !1);
                    b && (a = e.add(b));
                    this.listen();
                    return f.socketEmit("messages", "show", c, null, a)
                },
                showCallback: function(c, b) {
                    var a, k, e, f, h, g, n = this;
                    null == b && (b = !1);
                    k = [];
                    a = [];
                    f = c.data;
                    if (f.length) {
                        k.push("<a href='#' id='clay-message-inbox-link'>&laquo; Inbox</a>");
                        e = function(a) {
                            a.preventDefault();
                            return n.showAll()
                        };
                        a.push({
                            id: "clay-message-inbox-link",
                            handler: e
                        });
                        k.push("<div class='clay-message-reply'>");
                        k.push("\t<textarea id='clay-message-reply-text' placeholder='Enter a message...'></textarea>");
                        k.push("\t<input type='submit' id='clay-message-reply-button' />");
                        e = function(a) {
                            var b;
                            a.preventDefault();
                            b = document.getElementById("clay-message-reply-text");
                            a = b.value;
                            b.value = "";
                            if (b) return n.send({
                                to: f[0].from_id,
                                message: a,
                                threadId: f[0].thread_id,
                                reply: !0
                            })
                        };
                        a.push({
                            id: "clay-message-reply-button",
                            handler: e
                        });
                        k.push("</div>");
                        k.push("<div class='clay-message-subject'>");
                        k.push(f[0].subject);
                        k.push("</div>");
                        k.push("<div id='clay-messages'>");
                        h = 0;
                        for (g = f.length; h < g; h++) e = f[h], k.push(this.displayMessage(e));
                        k.push("</div>")
                    } else k.push("Thread not found!");
                    a = {
                        title: "View Message",
                        html: k,
                        id: "clay-messages-wrapper",
                        events: a
                    };
                    this.modalOpen() || (a.tabs = this.getTabs("inbox"));
                    c.DOMid && (a.DOMid = c.DOMid);
                    return d.createModal(a)
                },
                displayMessage: function(c, b) {
                    var a;
                    a = [];
                    a.push("<div class='clay-message'>");
                    a.push("\t<div class='clay-message-header'>");
                    a.push("\t\t<img src='" + Clay.BASEURL + "/avatar/" + c.from_id + "/20' /> ");
                    a.push("\t\tSent by " + (c.other_username ? c.other_username : "you") + " ");
                    "undefined" === typeof c.time ? a.push("\t\tjust now") : a.push(l.formatTime(c.time));
                    a.push("\t</div>");
                    a.push("\t<div class='clay-message-message'>");
                    a.push(c.message.replace("\n", "<br />"));
                    a.push("\t</div>");
                    a.push("</div>");
                    return a.join("")
                },
                showAll: function(c, b) {
                    var a;
                    null ==
                        b && (b = !1);
                    b && (a = e.add(b));
                    this.listen();
                    return f.socketEmit("messages", "showAll", c, null, a)
                },
                showAllCallback: function(c, b) {
                    var a, k, p, f, h, g, n, t = this;
                    null == b && (b = !1);
                    k = [];
                    a = [];
                    (f = c.data) && f.length || k.push("You do not have any messages!");
                    h = function(b) {
                        k.push("<div class='clay-message-thread' id='clay-message-thread-" + b.thread_id + "'>");
                        k.push("\t<div class='clay-message-thread-icon'>");
                        k.push("\t\t<img src='" + Clay.BASEURL + "/avatar/" + b.other_id + "/40' />");
                        k.push("\t</div>");
                        k.push("\t<div class='clay-message-header'>");
                        k.push("\t\tSent by " + (b.other_username ? b.other_username : "you") + " ");
                        "undefined" === typeof b.time ? k.push("\t\tjust now") : k.push(l.formatTime(b.time));
                        k.push("\t</div>");
                        k.push("\t<div class='clay-message-thread-subject'>");
                        k.push(b.subject);
                        k.push("\t</div>");
                        k.push("\t<div class='clay-message-thread-body'>");
                        k.push(200 < b.message.length ? b.message.substring(0, 200) + "..." : b.message);
                        k.push("\t</div>");
                        k.push("</div>");
                        return a.push({
                            id: "clay-message-thread-" + b.thread_id,
                            action: "click",
                            handler: function() {
                                return t.show({
                                    threadId: b.thread_id
                                })
                            }
                        })
                    };
                    g = 0;
                    for (n = f.length; g < n; g++) p = f[g], h(p);
                    p = {
                        title: "Messages",
                        html: k,
                        id: "clay-messages-wrapper",
                        events: a
                    };
                    this.modalOpen() || (p.tabs = this.getTabs("inbox"));
                    c.DOMid && (p.DOMid = c.DOMid);
                    d.createModal(p);
                    if (b) return e.execute(b, [c])
                }
            }
        }).call(this)
    }, {
        "../features/player": 17,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/events": 34,
        "../includes/local": 36
    }],
    16: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b;
            f = g("../includes/clay");
            c = g("../features/player");
            e = g("../includes/callbacks");
            h = g("../includes/offline");
            l = g("../includes/events");
            b = g("../features/ui");
            d = function() {
                function a() {
                    this.items = {};
                    this.itemCallback = [];
                    this.instanceId = Math.random();
                    h.offline || l.socketListen("payment", this, null, !1)
                }
                a.prototype.addItem = function(a, b) {
                    var c;
                    null == b && (b = !1);
                    if (h.offline) h.showWarning("purchase an item");
                    else if ("object" !== typeof a && (a = {
                            id: a,
                            type: "item"
                        }, f.log("This form of passing item ID is deprecated")), c = a.id, this.items[c]) {
                        if (this.items[c].quantity++, b) return b(this.items[c].data)
                    } else return c = e.add(b), l.socketEmit("payment",
                        "addItem", a, this.instanceId, c)
                };
                a.prototype.addCustomItem = function(a, b) {
                    null == b && (b = !1);
                    this.items[a.id] = {
                        type: a.type || "custom",
                        quantity: 1,
                        data: a
                    };
                    if (b) return b()
                };
                a.prototype.addItemStore = function(a, b) {
                    null == b && (b = !1);
                    a.success && (this.items[a.id] = {
                        type: a.type || "item",
                        quantity: 1,
                        data: a
                    });
                    if (b) return e.execute(b, [a])
                };
                a.prototype.getItemIds = function() {
                    var a, b, c, d, e, n;
                    b = [];
                    e = this.items;
                    for (a in e)
                        for (c = e[a], d = 1, n = c.quantity; 1 <= n ? d <= n : d >= n; 1 <= n ? ++d : --d) b.push(c.type + "_" + a);
                    return b
                };
                a.prototype.getItemsForURL =
                    function() {
                        var a, b, c, d, e, n;
                        c = [];
                        e = this.items;
                        for (a in e)
                            for (b = e[a], d = 1, n = b.quantity; 1 <= n ? d <= n : d >= n; 1 <= n ? ++d : --d) b.data && b.data.data ? c.push({
                                type: b.type,
                                data: b.data.data
                            }) : b.data && b.data.id && c.push({
                                type: b.type,
                                id: b.data.id
                            });
                        return encodeURIComponent(JSON.stringify(c))
                    };
                a.prototype.removeItem = function(a) {
                    "object" !== typeof a && (a = {
                        id: a
                    }, f.log("This form of passing item ID is deprecated"));
                    if (this.items[a.id] && 1 < this.items[a.id].quantity) return this.items[a.id].quantity--, document.getElementById("clay-item-quantity-" +
                        a.id).innerHTML = this.items[a.id].quantity;
                    delete this.items[a.id];
                    return b.removeElement(document.getElementById("clay-item-" + a.id))
                };
                a.prototype.checkout = function(a, c) {
                    var d, e, f, n, g, l, m = this;
                    null == a && (a = {});
                    if (h.offline) h.showWarning("purchase an item");
                    else {
                        m = this;
                        "object" !== typeof a && (c = a);
                        d = [];
                        n = [];
                        n.push("<table>");
                        n.push("\t<thead>");
                        n.push("\t\t<tr>");
                        n.push("\t\t\t<th class='th-item-name'>Item Name</th>");
                        n.push("\t\t\t<th class='th-quantity'>Quantity</th>");
                        n.push("\t\t\t<th class='th-item-price'>Item Price</th>");
                        n.push("\t\t\t<th class='th-remove'>Remove</th>");
                        n.push("\t\t</tr>");
                        n.push("\t</thead>");
                        n.push("\t<tbody>");
                        g = this.items;
                        for (e in g) f = g[e], n.push("\t<tr id='clay-item-" + e + "'>"), n.push("\t\t<td>" + f.data.name + "</td>"), n.push("\t\t<td id='clay-item-quantity-" + e + "'>" + f.quantity + "</td>"), n.push("\t\t<td id='clay-item-quantity-" + e + "'>$" + f.data.price + "</td>"), n.push("\t\t<td><a href='#' id='clay-remove-link-" + e + "'>&times;</a></td>"), n.push("\t</tr>");
                        n.push("\t</tbody>");
                        n.push("</table>");
                        n.push("<input type='submit' id='clay-submit-button' value='Checkout'></span>");
                        d.push({
                            id: "clay-submit-button",
                            handler: function() {
                                return m.pay(c)
                            }
                        });
                        l = this.items;
                        g = function(a) {
                            return d.push({
                                id: "clay-remove-link-" + a,
                                handler: function() {
                                    m.removeItem(a);
                                    return !1
                                }
                            })
                        };
                        for (e in l) f = l[e], g(e);
                        e = {
                            title: "Purchase",
                            html: n,
                            id: "clay-payment-wrapper",
                            events: d,
                            DOMid: a.id
                        };
                        return b.createModal(e)
                    }
                };
                a.prototype.pay = function(a) {
                    var d;
                    d = this;
                    return c.requireLogin(function() {
                        var c, e;
                        if (e = document.getElementById("clay-payment-wrapper")) e.style.maxWidth = "339px";
                        c = f.options && f.options.debug ? "&debug" :
                            "";
                        c = {
                            src: f.BASEURL + "/api/payment/?items=" + d.getItemsForURL() + "&game_id=" + f.gameID + c,
                            id: "clay-payment-iframe"
                        };
                        b.updateModal({
                            title: "Purchase",
                            html: [],
                            iframe: c,
                            id: "clay-payment-wrapper",
                            loading: !0,
                            src: f.BASEURL + "/images/api/clay_shopping_cart.png"
                        });
                        return l.addEvent("message", function(c) {
                            var n;
                            if (~f.BASEURL.indexOf(c.origin)) {
                                n = JSON.parse(c.data);
                                if (n.height) return document.getElementById("clay-payment-iframe").style.height = n.height + "px", document.getElementById("clay-payment-iframe").style.width =
                                    n.width + "px", e && (e.style.maxWidth = parseInt(n.width) + 30 + "px"), b.centerModal("clay-payment-wrapper");
                                if (n.popup) return b.showPopupNotifier(n.popup);
                                if (n.popupClose) return b.hidePopupNotifier(n.popupClose);
                                if (n.backToCart) {
                                    if (e = document.getElementById("clay-payment-wrapper")) e.style.maxWidth = null;
                                    return d.checkout()
                                }
                                d.paymentCallback(n, a);
                                return l.removeEvent("message", arguments.callee)
                            }
                        })
                    }, !0)
                };
                a.prototype.paymentCallback = function(a, c) {
                    b.closeModal("clay-payment-wrapper");
                    c && c(a);
                    return l.socketEmit("payment",
                        "complete", a)
                };
                return a
            }();
            m.exports = d
        }).call(this)
    }, {
        "../features/player": 17,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/offline": 37
    }],
    17: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b, a, k, p, r, s, u;
            k = g("../includes/local");
            f = g("../includes/clay");
            h = g("../includes/events");
            p = g("../includes/offline");
            e = g("../includes/callbacks");
            u = g("../features/ui");
            c = g("../features/game");
            l = g("../features/environment");
            s = g("../features/twitter");
            d = g("../features/facebook");
            b = g("../features/google");
            a = g("../features/kik");
            r = {
                loggedIn: !1,
                clearance: "site",
                installed: !1,
                identifier: 0,
                callbacks: [],
                localStorageChecked: !1,
                socketListen: function() {
                    return h.socketListen("user", r, null, !1)
                },
                setUsername: function(a) {
                    return h.socketEmit("user", {
                        username: a
                    })
                },
                maxSavesPerMinute: 20,
                saveUserData: function(a, b, c) {
                    var d = this;
                    null == b && (b = !1);
                    "string" === typeof a && (a = {
                        key: a,
                        data: b
                    }, b = c);
                    this.savesThisMinuteInterval || (this.savesThisMinuteInterval = setInterval(function() {
                        return d.savesThisMinute =
                            0
                    }, 12E4));
                    if (!(this.savesThisMinute > this.maxSavesPerMinute)) return this.savesThisMinute || (this.savesThisMinute = 0), this.savesThisMinute++, b = e.add(b), p.offline ? (this.saveUserDataCallback(null, b), p.save("user", "userData", a.key, a, !0)) : h.socketEmit("user", "saveUserData", a, !1, b)
                },
                saveUserDataCallback: function(a, b) {
                    return e.execute(b, [a])
                },
                fetchUserData: function(a, b) {
                    var c, d;
                    null == a && (a = {});
                    null == b && (b = !1);
                    "string" === typeof a && (a = {
                        key: a
                    });
                    c = e.add(b);
                    return p.offline && !a.userId ? (d = p.fetch("user", "userData",
                        key), d = {
                        data: d ? d : null,
                        success: !0,
                        key: key
                    }, this.fetchUserDataCallback(d, c)) : h.socketEmit("user", "fetchUserData", a, !1, c)
                },
                fetchUserDataCallback: function(a, b) {
                    return e.execute(b, [a])
                },
                storeUserData: function(a, b, c) {
                    null == c && (c = !1);
                    localStorage.clayData || (localStorage.clayData = {});
                    localStorage.clayData[a] = b;
                    return c({
                        success: !0,
                        key: a
                    })
                },
                fetchUserDataLocal: function(a, b) {
                    null == b && (b = !1);
                    return b({
                        success: !0,
                        key: a,
                        data: [dataKey]
                    })
                },
                getUsers: function(a, b) {
                    var c;
                    null == a && (a = {});
                    null == b && (b = !1);
                    c = e.add(b);
                    return h.socketEmit("user",
                        "getUsers", a, !1, c)
                },
                getUsersCallback: function(a, b) {
                    null == b && (b = !1);
                    if (a) return e.execute(b, [a])
                },
                getFriends: function(a, b) {
                    var c;
                    null == a && (a = {});
                    null == b && (b = !1);
                    c = e.add(b);
                    return a.friendsOf ? h.socketEmit("user", "getFriendsOfFriends", a, !1, c) : h.socketEmit("user", "getFriends", a, !1, c)
                },
                getFriendsCallback: function(a, b) {
                    null == b && (b = !1);
                    if (a) return e.execute(b, [a])
                },
                befriend: function(a, b) {},
                fetchItems: function(a) {
                    a = e.add(a);
                    return h.socketEmit("user", "fetchItems", {}, !1, a)
                },
                fetchItemsCallback: function(a, b) {
                    return e.execute(b, [a])
                },
                grantItem: function(a, b) {
                    var c;
                    null == b && (b = !1);
                    c = e.add(b);
                    return h.socketEmit("user", "grantItem", a, !1, c)
                },
                grantItemCallback: function(a, b) {
                    a.error || u.createNotification({
                        title: "Item Granted!",
                        html: "You just got " + a.quantity + ": " + a.item.name + "!"
                    });
                    return e.execute(b, [a])
                },
                removeItem: function(a, b) {
                    var c;
                    null == b && (b = !1);
                    c = e.add(b);
                    return h.socketEmit("user", "removeItem", a, !1, c)
                },
                removeItemCallback: function(a, b) {
                    return e.execute(b, [a])
                },
                purchaseGame: function(a) {
                    var b;
                    b = new f.Payment;
                    return b.addItem({
                        type: "game",
                        id: f.gameID
                    }, function() {
                        return b.checkout(a)
                    })
                },
                hasInstalled: function() {
                    return this.installed
                },
                getName: function() {
                    return this.data.name || this.data.username
                },
                onUserReadyFunctions: [],
                onUserReady: function(a) {
                    return this.identifier ? a({
                        identifier: this.identifier
                    }) : this.onUserReadyFunctions.push(a)
                },
                onLoginFunctions: [],
                onLogin: function(a) {
                    return this.identifier && this.data ? a({
                        name: this.getName(),
                        identifier: this.identifier,
                        success: !0
                    }) : this.onLoginFunctions.push(a)
                },
                doLogin: function(a) {
                    var c, p, h, g, r, l;
                    f.log("Clay.io is ready");
                    this.identifier = a.identifier || "no-identifier";
                    if (this.onUserReadyFunctions && 0 < this.onUserReadyFunctions.length)
                        for (l = this.onUserReadyFunctions, g = 0, r = l.length; g < r; g++) c = l[g], "function" === typeof c && c({
                            identifier: this.identifier
                        });
                    if (a.success) {
                        this.clearance = a.clearance || "site";
                        this.installed = a.installed || !1;
                        d && (d.linked = a.facebookLinked, d.permission = a.facebookPermission);
                        s && (s.linked = a.twitterLinked, s.permission = a.twitterPermission);
                        b && (b.linked = a.googleLinked, b.permission = a.googlePermission);
                        if (a.notifications)
                            for (r =
                                a.notifications, h = 0, g = r.length; h < g; h++) c = r[h], this.notify(c);
                        this.loggedIn = !0;
                        this.data = a.data;
                        if (this.onLoginFunctions && 0 < this.onLoginFunctions.length)
                            for (r = this.onLoginFunctions, h = 0, g = r.length; h < g; h++) c = r[h], "function" === typeof c && c({
                                identifier: this.identifier,
                                name: this.getName(),
                                success: !0
                            });
                        h = this.callbacks;
                        for (p in h) c = h[p], e.execute(c, [{
                            success: !0,
                            error: !1
                        }]);
                        this.successfulJSON && "clay" === this.clearance && localStorage.setItem("clayLogin", JSON.stringify(this.successfulJSON));
                        a.fromPrompt && u.closeModal("clay-login-wrapper", !1)
                    } else a.loginPrompt ? !this.localStorageChecked && (h = localStorage.getItem("clayLogin")) ? (h = JSON.parse(h), this.sendLogin(h), this.localStorageChecked = !0) : this.login({
                        signup: !0
                    }) : a.error && f.log(a.error);
                    return k.callReadies()
                },
                tryLogin: function() {
                    f.log("Trying Login");
//                    if (p.offline)
         return f.log("Initiating Offline Mode");
//                    if (!localStorage.getItem("clayLogin") && "kik" !== f.Environment.platform) return k.xdr("APIGetUserInfo", {
//                        type: "POST",
//                        withCredentials: !0
//                    }, this.loginXDRCallback)
                },
                loginXDRCallback: function(a) {
                    var b;
                    b = function(a) {
                        return f.loaded ? h.socketEmit("user", "login", a) : setTimeout(function() {
                            return b(a)
                        }, 100)
                    };
                    return b(a)
                },
                setLoginTab: function(a) {
                    var b;
                    if (b = document.getElementById("clay-login-iframe")) b.style.height = "";
                    b = document.getElementById("clay-login-wrapper");
                    b.className = b.className.replace(/clay-signup-wrapper|clay-guest-wrapper|clay-login-wrapper/, "clay-" + a + "-wrapper");
                    return k.sendMessageToFrame({
                        tab: a
                    })
                },
                login: function(p, g, r) {
                    var m, q, z, y, B, C, A, D = this;
                    null == p && (p = {});
                    null == g && (g = !1);
                    null == r &&
                        (r = !1);
                    "object" !== typeof p && (C = g, g = p, p = r || {}, r = C);
                    r || (r = p.signup);
                    p || (p = {});
                    if ("kik" === l.platform) a.connect(p, g);
                    else return g && this.callbacks.push(e.add(g)), g = [], C = [], r && C.push("signup"), p.requireLogin && C.push("require"), p.signupType && C.push("signup_type=" + p.signupType), q = document.getElementById("clay-login-wrapper"), A = [], A.push({
                            name: "Login",
                            focused: !r,
                            callback: function() {
                                return D.setLoginTab("login")
                            }
                        }), p.requireLogin || c.data.forceSignup || A.push({
                            name: "Guest",
                            focused: !1,
                            callback: function() {
                                return D.setLoginTab("guest")
                            }
                        }),
                        A.push({
                            name: "Signup",
                            focused: r,
                            callback: function() {
                                return D.setLoginTab("signup")
                            }
                        }), m = r ? "clay-signup-wrapper" : "clay-login-wrapper", "kik" !== l.platform && (g.push("<div class='clay-divider'></div>"), g.push("<div class='clay-login-bottom'>"), g.push("\t<div class='clay-action-icons clearfix' style='float: none; margin: 0 auto;'>"), g.push("\t\t<a href='#' class='clay-facebook-icon' id='clay-connect-facebook'></a>"), g.push("\t\t<a href='#' class='clay-twitter-icon' id='clay-connect-twitter'></a>"), g.push("\t\t<span class='clay-google-icon customGPlusSignIn' id='clay-connect-google'></span>"),
                            g.push("\t\t</span>"), g.push("\t\t<p>Social Login Options</p>"), g.push("\t</div>"), g.push("</div>")), z = [], z.push({
                            id: "clay-connect-facebook",
                            handler: function() {
                                return d.connect({}, B)
                            }
                        }), z.push({
                            id: "clay-connect-twitter",
                            handler: function() {
                                return s.connect({}, B)
                            }
                        }), z.push({
                            id: "clay-connect-google",
                            handler: function() {
                                return b.connect({}, B)
                            }
                        }), m = {
                            title: p.title || "Enable Clay.io",
                            html: g,
                            id: "clay-login-wrapper",
                            "class": m,
                            tabs: A,
                            DOMid: p.id,
                            events: z
                        }, y = "https://" + f.DOMAIN + "/api/login/" + f.gameKey + "?" + C.join("&"),
                        p.prerenderedFrame ? (m.html = "<div id='clay-login-prerender-wrapper'></div>" + g.join(""), k.focusedFrame = p.prerenderedFrame, y = k.focusedFrame.src, r = function() {
                            var a;
                            p.prerenderedFrame.style.display = "block";
                            if (a = document.getElementById("clay-login-prerender-wrapper")) return a.appendChild(p.prerenderedFrame)
                        }) : (m.iframe = {
                            src: y,
                            id: "clay-login-iframe",
                            "class": "clay-" + (r ? "signup" : "login") + "-iframe",
                            order: "prepend"
                        }, r = !1), q && "none" !== q.style.display || u.createModal(m, r), h.addEvent("closemodal", function() {
                            var a,
                                b, d, k;
                            if (c.data.forceSignup || p.requireLogin || D.loggedIn) {
                                if (D.loggedIn) {
                                    d = D.callbacks;
                                    k = [];
                                    for (b in d) a = d[b], k.push(e.execute(a, [{
                                        success: !0,
                                        error: !1
                                    }]));
                                    return k
                                }
                                d = D.callbacks;
                                k = [];
                                for (b in d) a = d[b], k.push(e.execute(a, [{
                                    success: !1,
                                    error: "Not logged in"
                                }]));
                                return k
                            }
                            return D.sendLogin({
                                name: "Anonymous"
                            })
                        }, !1, !0, document.getElementById(m.id)), B = function() {
                            u.closeModal("clay-login-wrapper", !1);
                            return h.removeEvent("message", arguments.callee)
                        }, r = function(a) {
                            if (~y.indexOf(a.origin)) {
                                a = JSON.parse(a.data);
                                a.popup ? u.showPopupNotifier(a.popup) : a.popupClose && u.hidePopupNotifier(a.popupClose);
                                a.openCocoonJSLink && CocoonJS.App.openURL(openCocoonJSLink);
                                if (a.height) {
                                    if (q = document.getElementById("clay-login-iframe")) q.style.height = a.height + "px";
                                    u.centerModal("clay-login-wrapper")
                                }
                                a.tab && D.setLoginTab(a.tab);
                                if (a.success || a.hash || a.name) return D.sendLogin(a), B()
                            }
                        }, h.addEvent("message", r)
                },
                logout: function(a, b) {
                    var c, d, k = this;
                    null == a && (a = {});
                    null == b && (b = !1);
                    c = e.add(b);
                    d = {
                        title: "Logout",
                        html: null,
                        id: "clay-logout-wrapper",
                        iframe: {
                            src: f.BASEURL + "/api/logout/" + f.gameKey,
                            id: "clay-logout-iframe",
                            "class": "clay-logout-iframe"
                        },
                        DOMid: a.id
                    };
                    u.createModal(d);
                    h.addEvent("closemodal", function() {
                        return e.execute(c, [{
                            success: !0,
                            error: "Window closed without logging out"
                        }])
                    }, !1, !0, document.getElementById(d.id));
                    return h.addEvent("message", function(a) {
                        var b, d;
                        if (~f.BASEURL.indexOf(a.origin)) {
                            d = JSON.parse(a.data);
                            if (d.height) {
                                if (b = document.getElementById("clay-logout-iframe")) b.style.height = d.height + "px";
                                return u.centerModal("clay-logout-wrapper")
                            }
                            u.closeModal("clay-logout-wrapper", !1);
                            h.removeEvent("message", arguments.callee);
                            e.execute(c, [{
                                success: !0,
                                error: !1
                            }]);
                            k.clearance = "none";
                            k.installed = !1;
                            k.identifier = "no-identifier";
                            k.loggedIn = !1;
                            k.data = {};
                            return localStorage.removeItem("clayLogin")
                        }
                    })
                },
                signup: function(a, b) {
                    var c;
                    null == a && (a = {});
                    "object" !== typeof a && (c = b, b = a, a = c || {});
                    a.signup = !0;
                    return this.login(a, b)
                },
                sendLogin: function(a) {
                    var b;
                    a.identifier && (this.identifier = a.identifier);
                    b = a.hash ? {
                        fromPrompt: !0,
                        hash: a.hash,
                        identifier: a.identifier
                    } : {
                        fromPrompt: !0,
                        username: a.name
                    };
                    this.successfulJSON = a;
                    h.socketEmit("user", "login", b);
                    return f.log("Logging in...")
                },
                requireLogin: function(a, b) {
                    var c = this;
                    null == a && (a = !1);
                    null == b && (b = !1);
                    return !this.loggedIn || b && "clay" !== this.clearance ? this.login({
                        signup: !0,
                        requireLogin: b
                    }, function() {
                        if (c.loggedIn && (!b || "clay" === c.clearance)) return a({
                            success: !0,
                            error: !1
                        })
                    }) : a({
                        success: !0,
                        error: !1
                    })
                },
                notify: function(a) {
                    console.log(JSON.stringify(a));
                    if (a.ticker) return f.UI.createNotification({
                        title: "New Notification!",
                        html: a.ticker
                    })
                },
                fetchNotifications: function(a,
                    b) {
                    var c;
                    c = e.add(b);
                    return h.socketEmit("user", "fetchNotifications", a, !1, c)
                },
                fetchNotificationsCallback: function(a, b) {
                    console.log(a);
                    return e.execute(b, [a])
                },
                pushNotify: function(a) {
                    return h.socketEmit("user", "sendPushNotification", a)
                }
            };
            m.exports = r
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/facebook": 7,
        "../features/game": 8,
        "../features/google": 10,
        "../features/kik": 11,
        "../features/twitter": 25,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36,
        "../includes/offline": 37
    }],
    18: [function(g, m, q) {
        (function() {
            var e, f, l, h, d;
            e = g("../includes/clay");
            l = g("../includes/offline");
            f = g("../includes/events");
            d = g("../features/ui");
            h = function() {
                return function(c) {
                    var b, a;
                    null == c && (c = {});
                    l.offline ? l.showWarning("rate a game") : (a = [], a.push("<iframe src='" + e.BASEURL + "/api/rate/?id=" + e.gameID + "' id='clay-rate-iframe' frameBorder='0'></iframe>"), a = {
                            title: "Rate this Game",
                            html: a,
                            id: "clay-rate-wrapper"
                        }, c.id && (b = document.getElementById(c.id)) ? b.innerHTML = html.join("") :
                        d.createModal(a), c = function(a) {
                            if (~e.BASEURL.indexOf(a.origin) && (a = JSON.parse(a.data), a.height)) return b = document.getElementById("clay-rate-iframe"), b.height = a.height, b.style.height = a.height + "px", d.centerModal("clay-rate-wrapper")
                        }, f.addEvent("message", c))
                }
            }();
            m.exports = h
        }).call(this)
    }, {
        "../features/ui": 26,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/offline": 37
    }],
    19: [function(g, m, q) {
        (function() {
            var e, f, l, h, d;
            f = g("../includes/clay");
            l = g("../includes/events");
            e = g("../includes/callbacks");
            d = g("../features/ui");
            h = function() {
                function c(b) {
                    var a, c;
                    null == b && (b = {});
                    "function" === typeof b ? this.fullCallback = b : (this.fullCallback = b.fullCallback, a = b.callback);
                    this.instanceId = Math.random();
                    this.rooms = {};
                    this.roomsLoaded = this.room = !1;
                    l.socketListen("rooms", this, null, !1);
                    a && (c = e.add(a));
                    l.socketEmit("rooms", "fetch", {
                        show: !1
                    }, this.instanceId, c)
                }
                c.prototype.setFullCallback = function(b) {
                    this.fullCallback = b
                };
                c.prototype.show = function(b) {
                    b = e.add(b);
                    return l.socketEmit("rooms", "fetch", {
                            show: !0
                        }, this.instanceId,
                        b)
                };
                c.prototype.fetchCallback = function(b, a) {
                    var c, p, f, g, h, n, l, m = this,
                        m = this;
                    this.rooms = b.rooms || {};
                    this.roomsLoaded = !0;
                    if (b.show) {
                        f = [];
                        f.push("<table>");
                        f.push("<thead>");
                        l = b.header;
                        h = 0;
                        for (n = l.length; h < n; h++) p = l[h], f.push("<th>" + p + "</th>");
                        f.push("<tbody id='clay-rooms'>");
                        h = b.rooms;
                        for (g in h)
                            if (p = h[g]) f.push("<tr id='clay-room-" + g + "'>"), f.push(this.getRoomTd(p, !1, !1, !0)), f.push("</tr>");
                        f.push("</tbody>");
                        f.push("</table>");
                        f.push("<span id='clay-room-add'>");
                        f.push("\t<input type='text' id='clay-room-name' placeholder='New Room Name' /> <input type='submit' value='Create Room' id='clay-create-room-button' />");
                        f.push("</span>");
                        c = [];
                        h = b.rooms;
                        for (g in h)(p = h[g]) && p.count < p.max && function(a) {
                            return c.push({
                                id: "clay-join-" + a + "-link",
                                handler: function() {
                                    m.joinRoom(a);
                                    return !1
                                }
                            })
                        }(g);
                        c.push({
                            id: "clay-create-room-button",
                            handler: function() {
                                return m.createRoom()
                            }
                        });
                        f = {
                            title: "Rooms",
                            html: f,
                            id: "clay-rooms-wrapper",
                            events: c
                        };
                        d.createModal(f)
                    }
                    return e.execute(a, [this.rooms])
                };
                c.prototype.getRooms = function() {
                    return this.rooms
                };
                c.prototype.createRoom = function(b, a) {
                    var c, d;
                    null == b && (b = {});
                    null == a && (a = !1);
                    a && (c = e.add(a));
                    if (d = document.getElementById("clay-room-name")) b.name || (b.name = d.value);
                    return l.socketEmit("rooms", "createRoom", {
                        name: b.name
                    }, this.instanceId, c)
                };
                c.prototype.createRoomCallback = function(b, a) {
                    var c, d;
                    if (b.success) {
                        d = document.getElementById("clay-rooms");
                        c = this.getRoomTd(b, !0);
                        d && c && d.appendChild(c);
                        if (c = document.getElementById("clay-room-add")) c.innerHTML = "Room created, waiting for more players...";
                        this.room = b.id;
                        this.rooms[b.id] = {
                            name: b.name,
                            count: b.count
                        };
                        this.rooms[b.id].count >= b.max && this.roomFull(b)
                    }
                    if (a) return e.execute(a, [this.rooms[b.id]])
                };
                c.prototype.getRoomTd = function(b, a, c, d) {
                    var e;
                    null == a && (a = !1);
                    null == c && (c = !1);
                    null == d && (d = !1);
                    if (d) return c = [], c.push("<td>" + b.name + "</td>"), c.push("<td>" + b.count + "</td>"), c.push("<td id='clay-join-" + b.id + "-link-wrapper'>" + (a ? "In Room" : b.count >= b.max ? "Room Full" : "<a href='#' id='clay-join-" + b.id + "-link'>Join Room</a>") + "</td>"), c.join("");
                    c ? c.innerHTML = "" : (c = document.createElement("tr"), c.id = "clay-room-" + b.id);
                    d = document.createElement("td");
                    e = document.createTextNode(b.name);
                    d.appendChild(e);
                    c.appendChild(d);
                    d = document.createElement("td");
                    e = document.createTextNode(b.count);
                    d.appendChild(e);
                    c.appendChild(d);
                    d = document.createElement("td");
                    d.id = "clay-join-" + b.id + "-link-wrapper";
                    a ? (e = document.createTextNode("In Room"), d.appendChild(e)) : b.count >= b.max ? (e = document.createTextNode("Room Full"), d.appendChild(e)) : (a = document.createElement("a"), a.id = "clay-join-" + b.id + "-link", e = document.createTextNode("Room Full"), a.appendChild(e), d.appendChild(a));
                    c.appendChild(d);
                    return c
                };
                c.prototype.joinRoom =
                    function(b, a) {
                        var c;
                        null == a && (a = !1);
                        "object" !== typeof b && (b = {
                            id: b
                        }, f.log("This form of passing item ID is deprecated"));
                        a && (c = e.add(a));
                        return l.socketEmit("rooms", "joinRoom", b, this.instanceId, c)
                    };
                c.prototype.joinRoomCallback = function(b, a) {
                    b.success ? (this.room = b.id, this.rooms[b.id].count++, this.refreshTd(b.id, !0), this.rooms[b.id].count >= b.max && this.roomFull(b)) : d.error(b.error, "clay-rooms-wrapper-content");
                    if (a) return e.execute(a, [this.rooms[b.id]])
                };
                c.prototype.leaveRoom = function(b) {
                    var a;
                    null ==
                        b && (b = !1);
                    b && (a = e.add(b));
                    return l.socketEmit("rooms", "leaveRoom", {}, this.instanceId, a)
                };
                c.prototype.leaveRoomCallback = function(b, a) {
                    if (a) return e.execute(a)
                };
                c.prototype.refresh = function(b) {
                    this.rooms[b.id] = {
                        name: b.name,
                        count: b.count
                    };
                    this.refreshTd(b.id);
                    if (b.count >= b.max) return this.roomFull(b)
                };
                c.prototype.roomFull = function(b) {
                    this.room === b.id && (b.instance = this, this.fullCallback && this.fullCallback(b), d.closeModal("clay-rooms-wrapper"));
                    d.removeElement(document.getElementById("clay-room-" + b.id));
                    return delete this.rooms[b.id]
                };
                c.prototype.refreshTd = function(b, a) {
                    var c, e, f, h = this;
                    null == a && (a = !1);
                    e = this.rooms[b];
                    e.id = b;
                    (c = document.getElementById("clay-room-" + b)) && 0 < e.count ? this.getRoomTd(e, a, c) : c ? d.removeElement(c) : (c = document.getElementById("clay-rooms")) && c.appendChild(this.getRoomTd(e, a));
                    if (!a) {
                        f = function() {
                            h.joinRoom({
                                id: b
                            });
                            return !1
                        };
                        e = [];
                        if (c = document.getElementById("clay-join-" + b + "-link-wrapper")) c.innerHTML = "<a href='#' id='clay-join-" + b + "-link'>Join Room</a>";
                        e.push({
                            id: "clay-join-" +
                                b + "-link",
                            handler: f
                        });
                        return d.handleEvents(e)
                    }
                };
                return c
            }();
            m.exports = h
        }).call(this)
    }, {
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/events": 34
    }],
    20: [function(g, m, q) {
        (function() {
            var e, f, l, h;
            e = g("../includes/callbacks");
            f = g("../includes/events");
            h = g("../features/ui");
            l = function() {
                function d(c, b) {
                    null == b && (b = !1);
                    this.id = c ? c.id || !1 : !1;
                    ("undefined" === typeof c || "undefined" === typeof c.prompt || c.prompt) && this.prompt(b);
                    this.instanceId = Math.random();
                    f.socketListen("screenshot",
                        this, null, !1)
                }
                d.prototype.prompt = function(c) {
                    var b, a, d, e, f = this;
                    e = [];
                    d = [];
                    (a = this.id ? document.getElementById(this.id) : document.getElementsByTagName("canvas")[0]) && !this.data && (this.data = a.toDataURL("image/png"));
                    e.push("<img class='clay-screenshot' src='" + this.data + "' height='200' />");
                    e.push("<div><input type='submit' value='save' id='clay-screenshot-save-" + this.instanceId + "' /></div>");
                    b = function(a) {
                        c && c(a);
                        return h.closeModal("clay-screenshot-wrapper")
                    };
                    d.push({
                        id: "clay-screenshot-save-" + this.instanceId,
                        handler: function() {
                            return f.save(b)
                        }
                    });
                    return h.createModal({
                        title: "Screenshot",
                        html: e,
                        id: "clay-screenshot-wrapper",
                        events: d
                    })
                };
                d.prototype.save = function(c, b) {
                    var a, d;
                    null == c && (c = {});
                    null == b && (b = !1);
                    "object" !== typeof c && (b = c, c = {});
                    d = this.id ? document.getElementById(this.id) : document.getElementsByTagName("canvas")[0];
                    this.data || (this.data = d.toDataURL("image/png"));
                    c.data = this.data;
                    b && (a = e.add(b));
                    return f.socketEmit("screenshot", "save", c, this.instanceId, a)
                };
                d.prototype.saveCallback = function(c, b) {
                    b &&
                        e.execute(b, [c]);
                    if (c.success && !c.hideUI) return h.createNotification({
                        title: "Success!",
                        html: "Your screenshot was added to Clay.io"
                    });
                    if (!c.hideUI) return h.createNotification({
                        title: "Error",
                        html: c.error
                    })
                };
                return d
            }();
            m.exports = l
        }).call(this)
    }, {
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/events": 34
    }],
    21: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c;
            e = g("../includes/callbacks");
            h = g("../includes/offline");
            l = g("../includes/events");
            f = g("../features/environment");
            c = g("../features/ui");
            d =
                function() {
                    function b() {}
                    b.linked = !1;
                    b.listening = !1;
                    b.listen = function(a) {
                        if (!this.listening) return l.socketListen(a.type, this, !1, !1), this.listening = !0
                    };
                    b.getPrettyType = function(a) {
                        return "facebook" === a ? "Facebook" : "twitter" === a ? "Twitter" : "Clay.io"
                    };
                    b.superPost = function(a, b) {
                        var d, g, s, m = this;
                        null == a && (a = {});
                        null == b && (b = !1);
                        s = this.getPrettyType(a.type);
                        if (h.offline) h.showWarning("post a message to " + s);
                        else {
                            if (f.popupListener) {
                                "object" !== typeof a && (Clay.log("This form of passing post message is deprecated"),
                                    a = {
                                        message: a
                                    });
                                this.listen(a);
                                "number" === typeof b ? this.callbackId = d = b : b && (this.callbackId = d = e.add(b));
                                if (a.editable) return g = [], g.push("<textarea id='clay-share-message'>" + a.message + "</textarea>"), g.push("<div><a href='#' id='clay-share-button-a' class='clay-button'>Share</a></div>"), d = [{
                                    id: "clay-share-button-a",
                                    action: "click",
                                    handler: function() {
                                        document.getElementById("clay-share-button-a").innerHTML = "Loading...";
                                        a.message = document.getElementById("clay-share-message").value;
                                        a.editable = !1;
                                        m.post(a,
                                            function(a) {
                                                c.closeModal("clay-share-wrapper");
                                                if (b) return b(a)
                                            });
                                        return !1
                                    }
                                }], Clay.UI.createModal({
                                    title: "Share Clay.io on " + s,
                                    html: g,
                                    id: "clay-share-wrapper",
                                    events: d
                                });
                                f.popupsAllowed && f.popupBlocker && !this.linked && (s = "ios" === f.os ? "http://clay.io/iosfocus.html" : "", this.connectWindow = c.openWindow(s, "_system", "width=600,height=400"));
                                a.posting = !0;
                                return l.socketEmit(a.type, "post", a, !1, d)
                            }
                            Clay.Stats.log({
                                name: a.type
                            });
                            c.openWindow(this.getShareURL(a), "_blank", "width=600,height=400")
                        }
                    };
                    b.postCallback =
                        function(a, b) {
                            a.error || a.hideUI || c.createNotification({
                                title: a.title,
                                html: a.content
                            });
                            console.log(b);
                            return e.execute(b, [a])
                        };
                    b.requestPermission = function(a, b) {
                        null == a && (a = {});
                        null == b && (b = !1);
                        c.createModal({
                            title: "Grant Permissions",
                            iframe: {
                                src: Clay.BASEURL + "/api/social/clay?site=" + a.type + "&id=" + Clay.gameID,
                                id: "clay-" + a.type + "-iframe"
                            },
                            id: "clay-" + a.type + "-wrapper"
                        });
                        return l.addEvent("message", function(d) {
                            var e;
                            if (~Clay.BASEURL.indexOf(d.origin) && (e = JSON.parse(d.data), e.success ? (c.closeModal("clay-" +
                                    a.type + "-wrapper"), l.socketEmit(a.type, "requestPermissionCallback", a, !1, b)) : !1 === e.success && c.closeModal("clay-" + a.type + "-wrapper"), e.success || !1 === e.success)) return l.removeEvent("message", arguments.callee)
                        })
                    };
                    b.superConnect = function(a, b) {
                        var d, h;
                        null == b && (b = !1);
                        this.listen(a);
                        d = function() {
                            var c;
                            c = e.add(b);
                            return l.socketEmit(a.type, "connect", a, !1, c)
                        };
                        if ("kik" === f.platform) return Clay.Kik.connect({}, function() {
                            a.redirectURL = window.location.href.replace("http://", "card://").replace("https://", "cards://");
                            return d()
                        });
                        if (f.popupsAllowed) return h = "ios" === f.os ? "http://clay.io/iosfocus.html" : "", "blackberry" !== f.platform && (this.connectWindow = c.openWindow(h, "_system", "width=600,height=400")), d()
                    };
                    b.connectCallback = function(a, b) {
                        null == b && (b = !1);
                        return e.execute(b)
                    };
                    b.openConnectWindow = function(a, b) {
                        var d, h, g, m = this;
                        null == b && (b = !1);
                        h = this.getPrettyType(a.type);
                        if (f.popupsAllowed) {
                            "kik" !== f.platform && f.popupBlocker && c.showPopupNotifier(h);
                            this.connectWindow ? (this.connectWindow.location = a.url, this.connectWindow.focus()) :
                                this.connectWindow = c.openWindow(a.url, "_system", "width=600,height=400");
                            d = function(d) {
                                var f;
                                if (~d.origin.indexOf(Clay.DOMAIN) && (f = JSON.parse(d.data), f.success)) return f.loggedIn || (a.login = !0, a.hash = f.hash), c.hidePopupNotifier(h), m.linked = !0, l.socketEmit(a.type, "connectCallback", a, !1, b), a.fromServer || e.execute(b), l.removeEvent("message", arguments.callee)
                            };
                            if ("kik" === f.platform) kik.on("linkData", function() {
                                var a;
                                a = kik.linkData.substring(0, kik.linkData.indexOf("#"));
                                return d({
                                    origin: "http://clay.io",
                                    data: a
                                })
                            });
                            else l.addEvent("message", d);
                            return g = setInterval(function() {
                                if (m.connectWindow && m.connectWindow.closed) return clearInterval(g), delete m.connectWindow, setTimeout(function() {
                                    return l.removeEvent("message", d)
                                }, 100)
                            }, 500)
                        }
                        if (confirm("Choose yes to leave this page and connect to " + h)) return window.location.href = a.url
                    };
                    b.smartInstall = function(a, b) {
                        null == a && (a = {});
                        null == b && (b = !1);
                        localStorage.clayData || (localStorage.clayData = {});
                        if (localStorage.clayData["smart-install-requested"]) return b(), !1;
                        localStorage.clayData["smart-install-requested"] = 1;
                        return "ios" === f.os && "facebook-webview" === f.platform ? (a.app = "facebook", this.promptSafari(a, b)) : "ios" === f.os && "twitter-webview" === f.platform ? (a.app = "twitter", this.promptSafari(a, b)) : "ios" === f.os && "safari" === f.browser ? this.promptHomeScreenInstall(a, b) : b()
                    };
                    b.promptSafari = function(a, b) {
                        var d, e;
                        null == a && (a = {});
                        d = a.app || "generic";
                        e = [];
                        e.push("<div class='clay-prompt-safari-overlay' id='clay-prompt-safari-wrapper'>");
                        e.push(" <div class='clay-prompt-safari clay-" +
                            d + "-prompt-safari' id='clay-prompt-safari'>");
                        e.push('Want to install this game? Click this icon, then "Open in Safari" to start the install process');
                        e.push("\t\t<a href='#' id='clay-prompt-safari-close' class='clay-close'>&times;</a>");
                        e.push("\t</div>");
                        e.push("</div>");
                        return c.addToContainer(e, function() {
                            var a;
                            if (a = document.getElementById("clay-prompt-safari-close")) a.onclick = function() {
                                c.closeNotification("clay-prompt-safari-wrapper");
                                b();
                                return !1
                            };
                            a = document.getElementById("clay-prompt-safari");
                            try {
                                return a.className += " clay-fade-in"
                            } catch (d) {}
                        })
                    };
                    b.promptHomeScreenInstall = function(a, b) {
                        var d;
                        null == a && (a = {});
                        d = [];
                        d.push("<div class='clay-ios-install-overlay' id='clay-ios-install-wrapper'>");
                        d.push(" <div class='clay-ios-install' id='clay-ios-install'>");
                        d.push('Want to install this game? Click the icon below then "Add to Home Screen"');
                        d.push("\t\t<a href='#' id='clay-ios-install-close' class='clay-close'>&times;</a>");
                        d.push("\t</div>");
                        d.push("</div>");
                        return c.addToContainer(d, function() {
                            var a;
                            if (a = document.getElementById("clay-ios-install-close")) a.onclick = function() {
                                c.closeNotification("clay-ios-install-wrapper");
                                b();
                                return !1
                            };
                            a = document.getElementById("clay-ios-install");
                            try {
                                return a.className += " clay-fade-in"
                            } catch (d) {}
                        })
                    };
                    b.smartShare = function(a, b) {
                        null == a && (a = {});
                        null == b && (b = !1);
                        if ("kik" === f.platform) return Clay.Kik.post(a, b);
                        if ("blackberry" === f.platform) return Clay.BBM.post(a, b);
                        if ("facebook-webview" === f.platform)
                            if (Facebook && Facebook.linked) {
                                if (confirm("Challenge your friends on Facebook")) return Clay.Facebook.post(a,
                                    b)
                            } else return a.app = "facebook", this.smartWebView(a, b);
                        else return "twitter-webview" === f.platform ? (a.app = "twitter", this.smartWebView(a, b)) : this.genericShare(a, b)
                    };
                    b.genericShare = function(a, b) {
                        null == a && (a = {});
                        null == b && (b = !1);
                        return this.share(a, b)
                    };
                    b.smartWebView = function(a, b) {
                        var d, e, f;
                        null == a && (a = {});
                        null == b && (b = !1);
                        d = a.app || "generic";
                        f = "twitter" === d ? "Click this icon to challenge your friends to beat your score!" : 'Click "Share" to challenge your friends to beat your score!';
                        e = [];
                        e.push("<div class='clay-webview-share-overlay' id='clay-webview-share-wrapper'>");
                        e.push(" <div class='clay-webview-share clay-" + d + "-share' id='clay-webview-share'>");
                        e.push(f);
                        e.push("\t\t<a href='#' id='clay-webview-share-close' class='clay-close'>&times;</a>");
                        e.push("\t</div>");
                        e.push("</div>");
                        return c.addToContainer(e, function() {
                            var a;
                            if (a = document.getElementById("clay-webview-share-close")) a.onclick = function() {
                                c.closeNotification("clay-webview-share-wrapper");
                                return !1
                            };
                            a = document.getElementById("clay-webview-share");
                            try {
                                return a.className += " clay-fade-in"
                            } catch (b) {}
                        })
                    };
                    b.share = function(a, b) {
                        var d, e, f, h;
                        null == a && (a = {});
                        null == b && (b = !1);
                        f = a.message || "";
                        e = [];
                        e.push("<textarea id='clay-share-message' placeholder='Enter your message...'>" + f + "</textarea>");
                        a.ignoreScreenshot || (e.push("<input type='checkbox' id='clay-share-screenshot'>"), e.push("<label for='clay-share-screenshot'>Include Screenshot</label>"));
                        e.push("<div class='clay-share-buttons'>");
                        e.push("\t<a class='clay-share-button' id='clay-share-facebook' href='#'>");
                        e.push("\t\t<span class='clay-share-button-action clay-share-button-facebook'>Share</span>");
                        e.push("\t</a>");
                        e.push("\t<a class='clay-share-button' id='clay-share-twitter' href='#'>");
                        e.push("\t\t<span class='clay-share-button-action clay-share-button-tweet'>Tweet</span>");
                        e.push("\t</a>");
                        e.push("</div>");
                        d = [];
                        h = function(d) {
                            var e, h;
                            this.childNodes[1].innerHTML = "Sharing...";
                            e = function(e) {
                                var h;
                                null == e && (e = !1);
                                f = (h = document.getElementById("clay-share-message")) ? h.value : "";
                                e && (f += " " + e);
                                a.message = f;
                                return Clay[d].post(a, function(a) {
                                    c.closeModal("clay-share-wrapper");
                                    if (b) return b(a)
                                })
                            };
                            return (h =
                                document.getElementById("clay-share-screenshot")) && h.checked ? (h = new Screenshot({
                                prompt: !1
                            }), h.save(function(a) {
                                return e(a.url)
                            })) : e()
                        };
                        d.push({
                            id: "clay-share-facebook",
                            action: "click",
                            handler: function() {
                                return h.call(this, "Facebook")
                            },
                            once: !0
                        });
                        d.push({
                            id: "clay-share-twitter",
                            action: "click",
                            handler: function() {
                                return h.call(this, "Twitter")
                            },
                            once: !0
                        });
                        return c.createModal({
                            title: "Share Options",
                            html: e,
                            id: "clay-share-wrapper",
                            events: d,
                            loading: !1
                        })
                    };
                    b.superInvite = function(a, b) {
                        var d;
                        d = [];
                        a.caption && encodeURIComponent(a.caption);
                        d.push("");
                        c.createModal({
                            title: "Invite Your Friends",
                            html: d,
                            id: "clay-facebook-invite-wrapper",
                            DOMid: a.id
                        });
                        d = e.add(b);
                        this.listen(a);
                        return l.socketEmit(a.type, "getFriends", a, !1, d)
                    };
                    b.getFriendsCallback = function(a, b) {
                        var d, e, f, h, g, l, m, q, x = this;
                        f = [];
                        d = [];
                        if (a.success && a.friends) {
                            f.push("<div class='clay-friends-invite-button'><input type='submit' id='clay-friends-invite-top' value='Invite Friends!' /></div>");
                            h = function() {
                                return x.inviteFriends()
                            };
                            d.push({
                                id: "clay-friends-invite-top",
                                handler: h
                            });
                            q = a.friends;
                            g = function() {
                                var a;
                                a = e.id;
                                h = function() {
                                    var b, c;
                                    c = document.getElementById("clay-friend-" + a);
                                    b = document.getElementById("clay-friend-checkbox-" + a);
                                    if (c && b && !b.checked) return c.className = "clay-befriend-box clay-befriend-box-selected", b.checked = !0;
                                    c.className = "clay-befriend-box";
                                    return b.checked = !1
                                };
                                return d.push({
                                    id: "clay-friend-" + a,
                                    handler: h
                                })
                            };
                            l = 0;
                            for (m = q.length; l < m; l++) e = q[l], f.push("<div data-id='" + e.id + "' data-name='" + e.name + "' id='clay-friend-" + e.id + "' class='clay-befriend-box'>"), f.push("\t<input type='checkbox' id='clay-friend-checkbox-" +
                                e.id + "' /><label for='clay-friend-checkbox-" + e.id + "'></label>"), e.picture && f.push("\t<br /><img src='" + e.picture + "' /><br />"), f.push(e.name), f.push("</div>"), g();
                            f.push("<div class='clay-friends-invite-button'><input type='submit' id='clay-friends-invite-bottom' value='Invite Friends!' /></div>");
                            h = function() {
                                return x.inviteFriends()
                            };
                            d.push({
                                id: "clay-friends-invite-bottom",
                                handler: h
                            })
                        }
                        return c.updateModal({
                            title: "Invite Your Friends",
                            html: f,
                            events: d,
                            id: "clay-facebook-invite-wrapper"
                        })
                    };
                    return b
                }();
            m.exports = d
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/ui": 26,
        "../includes/callbacks": 28,
        "../includes/events": 34,
        "../includes/offline": 37
    }],
    22: [function(g, m, q) {
        (function() {
            var e, f;
            f = g("../includes/offline");
            e = g("../includes/events");
            m.exports = {
                log: function(g) {
                    g = {
                        type: g.name,
                        quantity: g.quantity || 1
                    };
                    return f.offline ? f.save("stats", "log", null, g, !1) : e.socketEmit("stats", "logFromAPI", g, 1)
                },
                logStat: function(e) {
                    return this.log(e)
                },
                level: function(f) {
                    return e.socketEmit("stats", "level", f, 1)
                }
            }
        }).call(this)
    }, {
        "../includes/events": 34,
        "../includes/offline": 37
    }],
    23: [function(g, m, q) {
        (function() {
            var e, f = {}.hasOwnProperty,
                l = function(e, d) {
                    function c() {
                        this.constructor = e
                    }
                    for (var b in d) f.call(d, b) && (e[b] = d[b]);
                    c.prototype = d.prototype;
                    e.prototype = new c;
                    e.__super__ = d.prototype;
                    return e
                };
            e = function(e) {
                function d() {}
                l(d, e);
                d.post = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "stream";
                    return this.superPost(c, b)
                };
                d.prototype.post = function(c, b) {
                    null == b && (b = !1);
                    d.post(c, b)
                };
                return d
            }(g("../features/social"));
            m.exports = e
        }).call(this)
    }, {
        "../features/social": 21
    }],
    24: [function(g, m, q) {
        (function() {
            var e, f;
            g("../includes/clay");
            g("../includes/local");
            g("../features/environment");
            g("../features/player");
            e = g("../includes/callbacks");
            f = function() {
                function f() {}
                f.id = 0;
                f.flakCannonServer = "http://ec2-54-200-170-193.us-west-2.compute.amazonaws.com/api";
                f.createEnvironment = function(e) {
                    null == e && (e = !1);
                    e()
                };
                f.createEnvironmentCallback = function(f, d) {
                    try {
                        if (f = JSON.parse(f), f.id && (this.id = localStorage.testId = f.id, d)) return e.execute(d)
                    } catch (c) {
                        if ("undefined" !==
                            typeof _gaq) return _gaq.push(["_trackEvent", "Clay API", "JSON Error", c])
                    }
                };
                f.getExperiments = function(e) {
                    null == e && (e = !1);
                    e({})
                };
                f.getExperimentsCallback = function(f, d) {
                    f = JSON.parse(f);
                    return e.execute(d, [f && f.experiments ? f.experiments : {}])
                };
                f.convert = function(e) {};
                return f
            }();
            m.exports = f
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/player": 17,
        "../includes/callbacks": 28,
        "../includes/clay": 30,
        "../includes/local": 36
    }],
    25: [function(g, m, q) {
        (function() {
            var e, f = {}.hasOwnProperty,
                l = function(e, d) {
                    function c() {
                        this.constructor =
                            e
                    }
                    for (var b in d) f.call(d, b) && (e[b] = d[b]);
                    c.prototype = d.prototype;
                    e.prototype = new c;
                    e.__super__ = d.prototype;
                    return e
                };
            e = function(e) {
                function d() {}
                l(d, e);
                d.post = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "twitter";
                    return this.superPost(c, b)
                };
                d.getShareURL = function(c) {
                    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(c.message) + (c.image ? " " + encodeURIComponent(c.image) + " " : "") + (c.link ? "&url=" + encodeURIComponent(c.link) : "")
                };
                d.prototype.post = function(c, b) {
                    null == b && (b = !1);
                    q.Twitter.post(c,
                        b)
                };
                d.connect = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "twitter";
                    return this.superConnect(c, b)
                };
                d.invite = function(c, b) {
                    null == c && (c = {});
                    null == b && (b = !1);
                    c.type = "twitter";
                    return this.superInvite(c, b)
                };
                return d
            }(g("../features/social"));
            m.exports = e
        }).call(this)
    }, {
        "../features/social": 21
    }],
    26: [function(g, m, q) {
        var e = g("__browserify_process");
        (function() {
            var f, l, h, d, c;
            d = g("../includes/local");
            f = g("../includes/clay");
            h = g("../includes/events");
            l = g("../features/environment");
            g("../features/game");
            c = function() {
                function b() {}
                b.modalsOpened = {};
                b.notificationsOpened = {};
                b.error = function(a, b) {
                    var c, d;
                    if (f.options.hideUI) f.log("Error: " + a, !0);
                    else if (b) return (c = document.getElementById(b + "-error")) ? (c.innerHTML = a, c.style.display = "block") : (c = document.createElement("div"), d = document.createTextNode(a), c.id = b + "-error", c.className = "error", c.appendChild(d), (d = document.getElementById(b)) ? d.insertBefore(c, d.firstChild) : f.log("Error: " + a, !0)), setTimeout(function() {
                        return c.style.display = "none"
                    }, 3E3)
                };
                b.modalsOpen =
                    function() {
                        return d.objectLength(this.modalsOpened)
                    };
                b.notificationsOpen = function() {
                    return d.objectLength(this.notificationsOpened)
                };
                b.closeAllUI = function() {
                    var a, b, c;
                    b = this.modalsOpened;
                    for (a in b) this.closeModal(a);
                    b = this.notificationsOpened;
                    c = [];
                    for (a in b) c.push(this.closeNotification(a));
                    return c
                };
                b.closeModal = function(a, c) {
                    var e, g, m = this;
                    null == c && (c = !0);
                    if (!f.options.hideUI) {
                        if (!a || !(e = document.getElementById(a)) && "clay-login-wrapper" !== a) e = document.querySelector(".clay-modal-wrapper, .clay-custom-wrapper");
                        if (g = e) {
                            for (; g.parentNode && g.parentNode !== d.container;) g = g.parentNode;
                            c && h.triggerEvent("closemodal", e)
                        } else if (!a && d.container.getElementsByTagName("div")[0]) g = d.container.getElementsByTagName("div")[0];
                        else return;
                        try {
                            document.getElementById(a).parentNode.parentNode.className += " clay-fade-out"
                        } catch (u) {}
                        return setTimeout(function() {
                            var c, d;
                            d = !1;
                            if (e && e.parentNode && "clay-custom-wrapper" === e.className) e.parentNode.removeChild(e);
                            else if (g && g.parentNode) g.parentNode.removeChild(g), d = !0;
                            else
                                for (; c =
                                    document.getElementById(a);) try {
                                    c.parentNode.parentNode.parentNode.removeChild(c.parentNode.parentNode), d = !0
                                } catch (k) {}
                            if (d && (delete m.modalsOpened[a], f.log("Modal removed (" + a + ") (" + m.modalsOpen() + ")"), "cocoonjs" === l.platform)) return 0 === m.modalsOpen() && 0 === m.notificationsOpen() && f.log("Hiding CocoonJS Webview"), CocoonJS.App.forwardAsync("clay_modal_count( " + b.modalsOpen() + " );"), CocoonJS.App.hide()
                        }, 300)
                    }
                };
                b.getDocumentSize = function() {
                    var a;
                    a = document;
                    return Math.max(Math.max(a.body.scrollHeight,
                        a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
                };
                b.getWindowSize = function() {
                    var a, b;
                    a = b = 0;
                    "number" === typeof window.innerWidth ? (b = window.innerWidth, a = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (b = document.documentElement.clientWidth, a = document.documentElement.clientHeight) : document.body && (document.body.clientWidth ||
                        document.body.clientHeight) && (b = document.body.clientWidth, a = document.body.clientHeight);
                    return {
                        height: a,
                        width: b
                    }
                };
                b.getTabsHTML = function(a, b) {
                    var c, d, e, f, g, h, l;
                    f = [];
                    c = [];
                    if (a && 1 < a.length) {
                        f.push("<ul class='clay-tabs'>");
                        g = function(a, d) {
                            var e;
                            e = b + "-tab-" + a;
                            f.push("<li id='" + e + "'" + (d.focused ? " class='clay-tab-focus'" : "") + ">");
                            f.push("\t<a href='#'>" + d.name + "</a>");
                            f.push("</li>");
                            return c.push({
                                id: e,
                                handler: function(a) {
                                    a.preventDefault();
                                    if (a = document.querySelector("#" + b + " .clay-tab-focus")) a.className =
                                        "";
                                    if (a = document.getElementById(e)) a.className = "clay-tab-focus";
                                    return d.callback()
                                }
                            })
                        };
                        d = h = 0;
                        for (l = a.length; h < l; d = ++h) e = a[d], g(d, e);
                        f.push("</ul>")
                    }
                    return {
                        html: f,
                        events: c
                    }
                };
                b.insertIframe = function(a, b) {
                    var c;
                    c = document.createElement("iframe");
                    d.focusedFrame = c;
                    c.src = a.src;
                    "cocoonjs" === l.platform && -1 !== c.src.indexOf("?") ? c.src += "&cocoonjs" : "cocoonjs" === l.platform ? c.src += "?cocoonjs" : "object" === typeof e && e.versions && e.versions["node-webkit"] && -1 !== c.src.indexOf("?") ? c.src += "&node-webkit" : "object" ===
                        typeof e && e.versions && e.versions["node-webkit"] && (c.src += "?node-webkit");
                    c.frameBorder = "";
                    c.id = a.id;
                    c.className = a["class"];
                    f.offline.offline ? b.innerHTML = "You must connect to the internet to do this" : a.order && "prepend" === a.order ? b.insertBefore(c, b.firstChild) : b.appendChild(c);
                    return h.addEvent("message", function(a) {
                        var c;
                        c = "https://" + f.DOMAIN;
                        if (~f.BASEURL.indexOf(a.origin) || ~c.indexOf(a.origin))
                            if (a = JSON.parse(a.data), a.makeVisible && b) return b.className = b.className.replace(" clay-loading", "")
                    })
                };
                b.createModal = function(a, c) {
                    var d, e, g, m, n, t, q, v, x, z, y, B, C, A = this;
                    null == a && (a = {});
                    null == c && (c = !1);
                    if (!f.options.hideUI)
                        if (C = a.title || "", t = a.html || "", q = a.id || "clay-modal-wrapper", e = a["class"] || a.id, m = a.events || [], y = a.tabs || null, z = a.subnav || "powered by <a href='" + f.BASEURL + "' target='_blank'>clay.io</a>", v = a.iframe || null, g = f.options && f.options.debug, d = a.DOMid || f.options.DOMid, document.getElementById(q)) this.updateModal(a, c);
                        else return x = "", a.width && ("number" === typeof a.width && (a.width += "px"), x += "max-width: " +
                                a.width + ";"), a.height && ("number" === typeof a.height && (a.height += "px"), x += "height:" + a.height + ";"), B = [], y && 1 < y.length && (n = this.getTabsHTML(y, q), B = n.html, m = m.concat(n.events)), n = [], d ? n.push("<div id='" + q + "' class='clay-custom-wrapper'>") : (n.push("<div class='clay-overlay'>"), n.push("\t<div class='clay-sticky-cell'>"), n.push("\t\t<div class='clay-modal-wrapper " + e + (y && y.length ? " clay-tabs-wrapper" : "") + "' id='" + q + "' style='" + x + "'>"), n.push("\t\t\t<div id='" + q + "-tabs-wrapper'>"), B && n.push(B.join("")), n.push("\t\t\t</div>"),
                                n.push("\t\t\t<div class='clay-modal clearfix' id='" + q + "-inner'>"), n.push("\t\t\t\t<div id='" + q + "-header' class='clay-header'>"), n.push("\t\t\t\t\t<h2 class='clay-banner'>"), n.push("\t\t\t\t\t\t<span id='" + q + "-title'>" + C + "</span>"), g && n.push("\t\t\t\t\t\t<span class='clay-debug-mode'>Debug Mode</span>"), n.push("\t\t\t\t\t</h2>"), n.push("\t\t\t\t\t<h3 class='clay-powered-by' id='clay-powered-by'>" + z + "</h3>"), n.push("\t\t\t\t</div>"), n.push("\t\t\t\t<a href='#' class='clay-close' id='" + q + "-close'>&times;</a>"),
                                n.push("\t\t\t\t<div class='clay-content-scroll-hide'>")), n.push("\t\t\t\t\t<div class='clay-content' id='" + q + "-content'>"), n.push("\t\t\t\t\t\t<div class='clay-content-inner' id='" + q + "-content-inner'>"), n.push("string" === typeof t ? t : t.join("")), n.push("\t\t\t\t\t\t</div>"), n.push("\t\t\t\t\t</div>"), d || (n.push("\t\t\t\t</div>"), n.push("\t\t\t</div>"), n.push("\t\t\t<div class='clay-scroll-lane'><div class='clay-scroll-drag'></div></div>"), n.push("\t\t</div>"), n.push("\t</div>")), n.push("</div>"), f.log("Creating the modal"),
                            this.addToContainer(n, function() {
                                var d, e, g;
                                if (!f.options.hideUI) {
                                    A.modalsOpened[q] = !0;
                                    "cocoonjs" === l.platform && 1 <= A.modalsOpen() && (f.log("Showing CocoonJS WebView (Modal ID: " + q + ")"), CocoonJS.App.forwardAsync("clay_modal_count( " + b.modalsOpen() + " );"), CocoonJS.App.show(0, 0));
                                    e = document.getElementById(q + "-content-inner");
                                    a.loading && (e.className += " clay-loading");
                                    g = function(a) {
                                        a.preventDefault();
                                        b.closeModal(q);
                                        return !1
                                    };
                                    if (d = document.getElementById(q + "-close")) h.addEvent("touchstart", g, !1, !1, d, q),
                                        h.addEvent("click", g, !1, !1, d, q);
                                    v && A.insertIframe(v, e);
                                    d = document.getElementById(q);
                                    try {
                                        d.parentNode.parentNode.className += " clay-fade-in"
                                    } catch (n) {}
                                    A.centerModal(q);
                                    m && m.length && A.handleEvents(m);
                                    if (c) return c()
                                }
                            }, d), c = function(a) {
                                a = a || window.event;
                                return 27 === a.keyCode ? A.closeModal(q) : "skipRemoval"
                            }, h.addEvent("keydown", c, !1, !0, window, q)
                };
                b.updateModal = function(a, b) {
                    var c, d, e, g, h, l, m;
                    null == a && (a = {});
                    null == b && (b = !1);
                    if (!f.options.hideUI) {
                        g = a.title || "";
                        c = a.html || "";
                        h = a.id || "clay-modal-wrapper";
                        m =
                            a.subnav || "powered by <a href='" + f.BASEURL + "' target='_blank'>clay.io</a>";
                        l = a.iframe || null;
                        e = a.events || [];
                        (d = document.getElementById(h + "-title")) && g && (d.innerHTML = g);
                        if (a.tabs && 1 < a.tabs.length) {
                            g = this.getTabsHTML(a.tabs, h);
                            d = g.html;
                            e = e.concat(g.events);
                            if (g = document.getElementById(h)) g.className += " clay-tabs-wrapper";
                            g = document.getElementById(h + "-tabs-wrapper");
                            g.innerHTML = d.join("")
                        }
                        if (d = document.getElementById("clay-powered-by")) d.innerHTML = m;
                        if (d = document.getElementById(h + "-content-inner")) d.innerHTML =
                            "string" === typeof c ? c : c.join("");
                        c = document.getElementById(h + "-content-inner");
                        l && this.insertIframe(l, c);
                        !1 === a.loading ? c && (c.className = c.className.replace(" clay-loading", "")) : !0 === a.loading && (c = document.getElementById(h + "-content-inner"), c.className += " clay-loading");
                        b && b();
                        f.log("Updating modal (" + this.modalsOpen() + " open)");
                        e && e.length && this.handleEvents(e);
                        return this.centerModal(h)
                    }
                };
                b.centerModal = function(a) {
                    var c, d, e, g, h, l, m, q, v, x, z, y;
                    if (!f.options.hideUI && (h = document.getElementById(a) || document.querySelector(".clay-modal-wrapper")) &&
                        document.querySelector(".clay-overlay")) {
                        e = document.getElementById(a + "-inner") || document.querySelector(".clay-modal");
                        l = document.getElementById(a + "-content") || document.querySelector(".clay-content");
                        h.style.height = "auto";
                        l && (l.style.height = "auto");
                        m = parseInt(l.style.paddingTop) || 78;
                        m -= 10;
                        d = document.getElementById(a + "-header") || document.querySelector(".clay-header");
                        x = (g = document.querySelector(".clay-tabs")) ? 34 : 0;
                        y = b.getWindowSize().height;
                        document.querySelector(".clay-overlay").style.height = window.innerHeight +
                            "px";
                        if (g = h.querySelector(".clay-scroll-lane")) g.style.display = "none", g.style.top = d.offsetHeight + 3 + "px", c = g.querySelector(".clay-scroll-drag");
                        z = (y - h.offsetHeight - x) / 2;
                        8 >= z && (d = d.offsetHeight, d = y - d - x - 22 + m, l && (l.style.height = d + "px"));
                        l.scrollTop = 0;
                        q = (l.offsetHeight - 5 - m) / l.scrollHeight;
                        if (l.scrollHeight > l.offsetHeight + 2) return g.style.display = "block", d = Math.round(q * l.offsetHeight), c.style.height = d + "px", (v = document.getElementById(a + "-scroll-indicator")) ? v.style.display = "block" : (v = document.createElement("div"),
                            v.id = a + "-scroll-indicator", v.className = "clay-scroll-indicator", v.onclick = function() {
                                return l.scrollTop += 50
                            }, v.ontouchstart = function() {
                                return l.scrollTop += 50
                            }, a = document.createElement("img"), a.src = f.BASEURL + "/images/api/down.png", v.appendChild(a), e.appendChild(v)), l.className = "clay-content clay-content-scroll", this.SCROLL_LISTENER && l.removeEventListener(this.SCROLL_LISTENER), this.SCROLL_LISTENER = l.addEventListener("scroll", function(a) {
                            z = Math.round(l.scrollTop * q);
                            c.style.top = z + "px";
                            if (1 >= Math.abs(parseInt(l.scrollTop) +
                                    parseInt(l.offsetHeight) - l.scrollHeight) && "none" !== v.style.display) return v.style.display = "none";
                            if (parseInt(l.scrollTop) + parseInt(l.offsetHeight) < l.scrollHeight && "none" === v.style.display) return v.style.display = "block"
                        }), e = function(a) {
                            var b, d;
                            a.stopPropagation();
                            a.preventDefault();
                            if (!0 !== a.handled) return l = h.querySelector(".clay-content"), c = h.querySelector(".clay-scroll-drag"), b = c.offsetHeight - m, d = a.offsetY || a.layerY || a.touches[0].clientY, d /= l.offsetHeight, d *= l.scrollHeight, l.scrollTop = d < l.scrollTop ?
                                d + b / 2 : d - b / 2, a.handled = !0
                        }, this.jump1 && g.removeEventListener(this.jump1), this.jump2 && g.removeEventListener(this.jump2), this.jump1 = g.addEventListener("mousedown", e), this.jump2 = g.addEventListener("touchstart", e);
                        l.className = "clay-content clay-content-no-scroll";
                        if (v = document.getElementById(a + "-scroll-indicator")) return v.style.display = "none"
                    }
                };
                b.scroller = null;
                b.handleEvents = function(a) {
                    var b, c, d, e, f;
                    f = [];
                    for (c in a)
                        if (d = a[c], b = document.getElementById(d.id)) e = d.once || !1, d.action && "click" !== d.action ||
                            (d.action = "fastclick"), f.push(h.addEvent(d.action, d.handler, !1, e, b));
                    return f
                };
                b.notificationId = 0;
                b.notificationsWrapper = !1;
                b.createNotification = function(a) {
                    var c, e, g, h, m, n, q, w = this;
                    null == a && (a = {});
                    if (!f.options.hideUI && (n = a.title || "", e = a.html || "", g = a.icon || !1, q = a.type || "notification", h = a.id || b.notificationId++, c = a.delay || 3E3, a = f.options && f.options.debug, m = [], m.push("<div class='clay-notification clay-" + q + "' id='clay-" + q + "-" + h + "'>"), m.push("\t<div class='clay-notification-header clay-" + q + "-header'>"),
                            m.push(n), a && m.push("\t\t\t<span class='clay-debug-mode'>Debug</span>"), m.push("\t</div>"), m.push("\t<div class='clay-notification-content clay-" + q + "-content'>"), g && m.push("\t\t<img src='" + g + "' class='clay-notification-icon clay-" + q + "-icon' />"), g && m.push("\t\t\t<span class='clay-notification-description clay-" + q + "-description'>"), m.push(e), g && m.push("\t\t\t</span>"), m.push("\t\t</div>"), m.push("<a href='#' id='clay-" + q + "-" + h + "-close' class='clay-notification-close clay-" + q + "-close'>&times;</a>"),
                            m.push("</div>"), this.notificationsWrapper || (this.notificationsWrapper = document.createElement("div"), this.notificationsWrapper.id = "clay-notifications-wrapper", this.notificationsWrapper.className = "clay-notifications-wrapper", d.container.appendChild(this.notificationsWrapper)), this.addToContainer(m, function() {
                                var a;
                                if (a = document.getElementById("clay-" + q + "-" + h + "-close")) a.onclick = function() {
                                    b.closeNotification("clay-" + q + "-" + h);
                                    return !1
                                };
                                a = document.getElementById("clay-" + q + "-" + h);
                                try {
                                    a.className += " clay-fade-in"
                                } catch (c) {}
                                w.notificationsOpened["clay-" +
                                    q + "-" + h] = !0;
                                if ("cocoonjs" === l.platform && 1 <= w.notificationsOpen() && 0 === w.modalsOpen()) return f.log("Showing CocoonJS WebView"), a = window.devicePixelRatio || 1, CocoonJS.App.show((window.innerWidth - 300) * a, 0, 300 * a, 120 * a)
                            }, this.notificationsWrapper), "clay" !== f.Player.clearance && "achievement" === q && (c = 5E3), 0 < c)) return setTimeout(function() {
                        return w.closeNotification("clay-" + q + "-" + h)
                    }, c)
                };
                b.closeNotification = function(a) {
                    var b, c = this;
                    null == a && (a = "0");
                    if (!f.options.hideUI) {
                        (b = document.getElementById(a)) && delete this.notificationsOpened[a];
                        "cocoonjs" === l.platform && 0 === this.modalsOpen() && 0 === this.notificationsOpen() && (f.log("Hiding CocoonJS Webview"), CocoonJS.App.hide());
                        try {
                            document.getElementById(a).className += " clay-fade-out"
                        } catch (d) {}
                        return setTimeout(function() {
                            return c.removeElement(a)
                        }, 300)
                    }
                };
                b.showPopupNotifier = function(a) {
                    return b.createNotification({
                        id: "popup-" + a,
                        delay: "0",
                        title: "Popup Blocker",
                        html: "We're opening a window to " + a + ". Be sure your popup blocker allows popups from Clay.io"
                    })
                };
                b.hidePopupNotifier = function(a) {
                    return b.closeNotification("clay-notification-popup-" +
                        a)
                };
                b.addToContainer = function(a, b, c) {
                    var e, g;
                    null == b && (b = !1);
                    null == c && (c = !1);
                    if (!f.options.hideUI && (g = document.createElement("div"), g.className = "clay", "object" === typeof a && "[object Array]" !== Object.prototype.toString.call(a) ? g.appendChild(a) : g.innerHTML += "string" === typeof a ? a : a.join(""), c && "string" === typeof c && (e = document.getElementById(c)) ? e.appendChild(g) : c ? c.appendChild(g) : d.container && d.container.appendChild(g), b)) return b()
                };
                b.removeElement = function(a) {
                    if (!f.options.hideUI) {
                        "string" === typeof a &&
                            (a = document.getElementById(a));
                        try {
                            if (a && a.parentNode) return a.parentNode.removeChild(a)
                        } catch (b) {}
                    }
                };
                b.openWindow = function(a, b, c) {
                    return "kik" === f.Environment.platform ? kik.open(a, !0) : navigator && navigator.app && navigator.app.loadUrl ? navigator.app.loadUrl(a, {
                            openExternal: !0
                        }) : "amazon" === l.platform && 4 > l.version ? this.createModal({
                            id: "link-continue",
                            title: "Continue...",
                            html: "<div style='margin: 10px 0;'><a href='" + a.replace("'", "") + "' target='_blank' class='button' style='position: relative; z-index: 999999;'>Click here to continue</a></div>"
                        }) :
                        window.open(a, b, c)
                };
                return b
            }();
            h.addEvent("resize", function() {
                var b, a, d;
                a = c.modalsOpened;
                d = [];
                for (b in a) d.push(c.centerModal(b));
                return d
            });
            m.exports = c
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/game": 8,
        "../includes/clay": 30,
        "../includes/events": 34,
        "../includes/local": 36,
        __browserify_process: 38
    }],
    27: [function(g, m, q) {}, {}],
    28: [function(g, m, q) {
        (function() {
            var e;
            e = function() {
                function e() {}
                e.callbacks = {};
                e.add = function(e) {
                    var f;
                    return "function" === typeof e ? (f = Math.random(), this.callbacks[f] = {
                        fn: e,
                        obj: arguments.callee
                    }, f) : !1
                };
                e.execute = function(e, f) {
                    var d;
                    null == f && (f = []);
                    if (e && this.callbacks[e]) return d = this.callbacks[e], d.fn.apply(d.obj, f), delete this.callbacks[e]
                };
                return e
            }();
            m.exports = e
        }).call(this)
    }, {}],
    29: [function(g, m, q) {
        (function() {
            var e, f;
            f = g("../includes/clay");
            e = function() {
                function e() {}
                e.validCall = function() {
                    var e;
                    if (f.options && f.options.debug || "cocoonjs" === f.Environment.platform) return !0;
                    e = !1;
                    console && console.profile && console.profiles && (console.profile(), console.profileEnd(),
                        e = 0 < console.profiles.length);
                    e && f.log("This cannot be run with the console open", !0);
                    return !e
                };
                return e
            }();
            m.exports = e
        }).call(this)
    }, {
        "../includes/clay": 30
    }],
    30: [function(g, m, q) {
        (function() {
            var e;
            "undefined" === typeof window.Clay ? window.fromNode ? e = {} : window.Clay = {} : e = window.Clay;
            e.VERSION = 1;
            e.PROTOCOL || (e.PROTOCOL = document && document.location && ("https:" === document.location.protocol || "chrome-extension:" === document.location.protocol) ? "https://" : "http://");
            e.BASEURL || (e.BASEURL = e.PROTOCOL + "clay.io");
            e.DOMAIN ||
                (e.DOMAIN = "clay.io");
            "http://" === e.PROTOCOL ? (e.API_CSS_PATH = "css/api.css", e.SOCKET_IO_PATH = "js/socket.io.js", e.SOCKET_PORT = 80) : (e.API_CSS_PATH = "css/api.css", e.SOCKET_IO_PATH = "js/socket.io.js", e.SOCKET_PORT = 443);
            e.options || (e.options = {
                debug: !1
            });
            e.readyFunctions || (e.readyFunctions = []);
            e.ready || (e.ready = function(f) {
                return e.readyFunctions.push(f)
            });
            e.loadFunctions || (e.loadFunctions = []);
            e.load || (e.load = function(f) {
                return e.loadFunctions.push(f)
            });
            e.orientation = window.orientation;
            e.publisherID = 0;
            e.source = !0;
            e.SOCKET_ADDRESS || (e.SOCKET_ADDRESS = e.PROTOCOL + "api." + e.DOMAIN);
            e.log = function(f, g) {
                null == g && (g = !1);
                if ("undefined" !== typeof console && (g || e.options && e.options.debug)) return console.log(f)
            };
            e.loaded = !1;
            e.isReady = !1;
            e.Player = {
                loggedIn: !1,
                clearance: !1
            };
            m.exports = e
        }).call(this)
    }, {}],
    31: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b, a, k, p;
            e = g("../includes/clay");
            a = g("../includes/local");
            k = g("../includes/offline");
            l = g("../includes/dependencies");
            d = g("../includes/events");
            h = g("../features/environment");
            c = g("../features/game");
            p = g("../features/player");
            b = g("../features/kik");
            f = function() {
                function f() {}
                f.domAndSocketLoaded = function() {
                    var d;
                    e.loaded = !0;
                    if (p) {
                        p.socketListen();
                        if (d = localStorage.getItem("clayLogin")) d = JSON.parse(d), p.sendLogin(d), p.localStorageChecked = !0;
                        "kik" === e.Environment.platform && a.callReadies()
                    }
                    c.set({
                        key: e.gameKey,
                        options: e.options
                    });
                    if ("kik" === h.platform && !p.loggedIn) return setTimeout(function() {
                            if (!p.loggedIn) return b.grabAnonymousToken()
                        },
                        4E3)
                };
                f.loadSocketIO = function() {
                    var b, c, d = this;
                    //if (k.offline) decamincow
                    return e.log("Offline Mode"), e.loaded = !0, a.callReadies(); //decamincow 关键点！！
                    if (window.io && window.io.connect || e.io && e.io.connect) return this.connect();
                    if (e.options && e.options.waitForSocketIO) return c = 0, b = function() {
                        if (window.io && window.io.connect || e.io && e.io.connect) return d.connect();
                        if (100 > c) return setTimeout(b, 200), c++
                    }, b();
                    if (h.externalResourcesAllowed) return e.io = {}, window.socketModule = {
                        exports: e.io
                    }, l.loadScript(e.SOCKET_IO_PATH, this.connect), e.log("Socket.IO Loading...")
                };
                f.checkIfReady = function() {
                    var b, c = this;
                    return a.DOMLoaded ? this.domAndSocketLoaded() : b = setInterval(function() {
                        e.log("waiting");
                        if (a.DOMLoaded) return clearInterval(b), c.domAndSocketLoaded()
                    }, 50)
                };
                f.connect = function() {
                    return; //decamincow
                    var b;
                    e.io = e.io && e.io.connect ? e.io : window.clayio;
                    e.io = e.io && e.io.connect ? e.io : window.io;
                    clearTimeout(e.loadTimeout);
                    a.socket = e.io.connect(e.SOCKET_ADDRESS, {
                        "force new connection": !0,
                        port: e.SOCKET_PORT,
                        secure: "https://" === e.PROTOCOL,
                        reconnect: !0,
                        "reconnection delay": 500,
                        "max reconnection attempts": 10
                    });
                    b = 0;
                    e.log("Connecting to socket.io");
                    d.socketListen("connect", function() {
                        e.log("Socket connected");
                        if (!e.loaded) return f.checkIfReady();
                        if (50 > b) return p && p.tryLogin(), c.set({
                            key: e.gameKey,
                            options: e.options
                        }), b++
                    }, !1, !1);
                    return d.socketListen("error", function() {
                        e.log("Could not connect to socket.io");
                        k.offline = !0;
                        e.loaded = !0;
                        return a.callReadies()
                    }, !1, !1)
                };
                return f
            }();
            m.exports = f
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/game": 8,
        "../features/kik": 11,
        "../features/player": 17,
        "../includes/clay": 30,
        "../includes/dependencies": 33,
        "../includes/events": 34,
        "../includes/local": 36,
        "../includes/offline": 37
    }],
    32: [function(g, m, q) {}, {}],
    33: [function(g, m, q) {
        (function() {
            var e;
            e = function() {
                function e() {}
                e.dependencies = {};
                e.addDependency = function(e, f) {
                    if (this.dependencies[e] && this.dependencies[e].loaded) return f();
                    if (this.dependencies[e]) return this.loadScript(this.dependencies[e].src, f)
                };
                e.loadScript = function(e, f) {
                    var d, c;
                    d = document.createElement("script");
                    d.type = "text/javascript";
                    d.src = e;
                    d.onreadystatechange =
                        function() {
                            if ("complete" === this.readyState) return f()
                        };
                    d.onload = function() {
                        return f()
                    };
                    c = document.getElementsByTagName("script")[0];
                    return c.parentNode.insertBefore(d, c)
                };
                return e
            }();
            m.exports = e
        }).call(this)
    }, {}],
    34: [function(g, m, q) {
        (function() {
            var e, f, l;
            e = g("../includes/clay");
            l = g("../includes/local");
            f = function() {
                function f() {}
                f.groups = {};
                f.addEvent = function(d, c, b, a, e, f) {
                    var g, h, l, n = this;
                    null == b && (b = !1);
                    null == a && (a = !1);
                    null == e && (e = window);
                    null == f && (f = !1);
                    "fastclick" === d && (h = !1, f || (f = "fastclick"),
                        l = c, c = function(a) {
                            if (!h) return h = !0, a.preventDefault(), l.call(this, a), setTimeout(function() {
                                return h = !1
                            }, 100)
                        }, g = arguments, g[0] = "touchstart", g[1] = c, g[5] = f, this.addEvent.apply(this, arguments), d = "click");
                    a && (l = c, c = function(c) {
                        var g, h, m, q;
                        g = l.call(n, c);
                        if ("skipRemoval" !== g && !1 !== f && n.groups[f]) {
                            q = n.groups[f];
                            h = 0;
                            for (m = q.length; h < m; h++) g = q[h], n.removeEvent(g.type, g.listener, g.useObject, g.obj);
                            return delete n.groups[f]
                        }
                        if ("skipRemoval" !== g && a) return n.removeEvent(d, arguments.callee, b, e)
                    });
                    !1 !== f && (this.groups[f] ||
                        (this.groups[f] = []), this.groups[f].push({
                            type: d,
                            listener: c,
                            useObject: b,
                            obj: e
                        }));
                    return e.addEventListener ? e.addEventListener(d, c, b) : e.attachEvent ? e.attachEvent("on" + d, c, b) : e["on" + d] = c
                };
                f.removeEvent = function(d, c, b, a) {
                    null == b && (b = !1);
                    null == a && (a = window);
                    return a.removeEventListener ? a.removeEventListener(d, c, b) : a.detachEvent ? a.detachEvent("on" + d, c, b) : a["on" + d] = null
                };
                f.triggerEvent = function(d, c) {
                    var b;
                    null == c && (c = window);
                    document.createEvent ? (b = document.createEvent("HTMLEvents"), b.initEvent(d, !0, !0)) :
                        (b = document.createEventObject(), b.eventType = "on" + d);
                    b.eventName = d;
                    return document.createEvent ? c.dispatchEvent(b) : c.fireEvent(b.eventType, b)
                };
                f.socketListen = function(d, c, b, a) {
                    var f, g = this;
                    null == a && (a = !0);
                    if (e.loaded || "connect" === d || "error" === d) {
                        if (b = d, c && c.instanceId && (d += "-" + c.instanceId), f = function(b) {
                                var f, h;
                                e.log("received: " + d + (b ? " method: " + b.method : ""));
                                h = b && b.data ? b.data : null;
                                f = b && b.callbackId ? b.callbackId : null;
                                if (b && b.method && "function" === typeof c[b.method]) c[b.method](h, f);
                                else if ("string" ===
                                    typeof c) e[c][b.method](h, f);
                                else "function" === typeof c && c(h, f);
                                if (a) return g.socketRemove(d, arguments.callee)
                            }, l.socket.on(d, f), d !== b) return l.socket.on(b, f)
                    } else e.log("Clay.io has not connected to its backend yet. Use Clay.ready() before this call, or email us if you think the issue is on our end: contact@clay.io", !0)
                };
                f.socketRemove = function(d, c) {
                    return l.socket.removeListener(d, c)
                };
                f.socketEmit = function(d, c, b, a, f) {
                    null == c && (c = "");
                    null == b && (b = {});
                    null == a && (a = !1);
                    null == f && (f = !1);
                    e.callsThisMinute++;
                    if (e.callsThisMinute >= l.maxCallsPerMinute) e.callsThisMinute === l.maxCallsPerMinute && UI.createNotification({
                        title: "Max Calls Reached",
                        html: "This game has reached the maximum number of calls per minute (" + l.maxCallsPerMinute + ")"
                    });
                    else if (e.loaded) return e.log("sending: " + d + " instance, method: " + c + ": " + a), c = {
                        method: c,
                        data: b,
                        callbackId: f,
                        instanceId: a
                    }, l.socket.emit(d, c)
                };
                return f
            }();
            f.addEvent("message", function(g) {
                var d;
                try {
                    d = JSON.parse(g.data)
                } catch (c) {
                    d = !1
                }
                if (d && "orientationchange" === d.name) return window.innerHeight =
                    parseInt(d.height), window.innerWidth = parseInt(d.width), g = parseInt(d.orientation), isNaN(g) || (window.orientation = g, e.orientation = g), f.triggerEvent("orientationchange");
                if (d && "orientation" === d.name) {
                    if (g = parseInt(d.orientation), !isNaN(g)) return window.orientation = g, e.orientation = g
                } else if (d && "setpublisher" === d.name) return e.publisherID = d.publisherId
            });
            m.exports = f
        }).call(this)
    }, {
        "../includes/clay": 30,
        "../includes/local": 36
    }],
    35: [function(g, m, q) {
        (function() {
            var e, f, l, h, d, c, b;
            e = g("../includes/clay");
            d =
                g("../includes/local");
            f = g("../includes/connect");
            l = g("../features/environment");
            h = g("../features/game");
            c = g("../features/player");
            b = g("../features/ui");
            !e.ignoreSocketIO && d.loadNow && f.loadSocketIO();
            d.ready(function() {
                var a, g, m, q;
                d.socket || e.ignoreSocketIO || (e.loadTimeout = setTimeout(function() {
                                                                            return; //decamincow
                    h.failedLoadCallback();
                    b.createNotification({
                        title: "Error Connecting",
                        html: "Email Clay.io support if this message continues to occur contact@clay.io (" + e.SOCKET_PORT + ")"
                    });
                    return e.ready(function() {
                        return b.createNotification({
                            title: "Connected",
                            html: "Clay.io has connected!"
                        })
                    })
                }, 12E3));
                d.container = document.createElement("div");
                d.container.id = "clay";
                d.container.className = "clay clay-reset";
                l.platformSpecifics();
                a = document.getElementsByTagName("body")[0];
                a.appendChild(d.container);
                a = "";
                e.documentReadyCheck = !0;
                if (e.loadFunctions && 0 < e.loadFunctions.length)
                    for (q = e.loadFunctions, g = 0, m = q.length; g < m; g++) a = q[g], "function" === typeof a && a();
                e.load = function(a) {
                    return a()
                };
                d.loadNow || f.loadSocketIO();
                c && c.tryLogin();
                a = {
                    name: "orientation"
                };
                window.parent &&
                    window.parent.postMessage && window.parent.postMessage(JSON.stringify(a), "*");
                l.externalResourcesAllowed && !e.LocalCSS && (a = document.createElement("link"), a.rel = "stylesheet", a.href = e.API_CSS_PATH, g = document.getElementsByTagName("script")[0], g.parentNode.insertBefore(a, g));
                e.callsThisMinute = 0;
                setInterval(function() {
                    return e.callsThisMinute = 0
                }, 6E4);
                return d.DOMReady = !0
            })
        }).call(this)
    }, {
        "../features/environment": 6,
        "../features/game": 8,
        "../features/player": 17,
        "../features/ui": 26,
        "../includes/clay": 30,
        "../includes/connect": 31,
        "../includes/local": 36
    }],
    36: [function(g, m, q) {
        (function() {
            var e, f;
            e = g("../includes/clay");
            f = {
                loadNow: "undefined" !== typeof window.Clay,
                maxCallsPerMinute: 80,
                DOMLoaded: !1,
                DOMReady: !1,
                readiesCalled: !1,
                callReadies: function() {
                    var f, g, d, c;
                    e.isReady = !0;
                    if (!this.readiesCalled) {
                        this.readiesCalled = !0;
                        e.readyFunction && (e.readyFunctions = [e.readyFunction]);
                        if (e.readyFunctions && 0 < e.readyFunctions.length)
                            for (c = e.readyFunctions, g = 0, d = c.length; g < d; g++) f = c[g], "function" === typeof f && f();
                        return e.ready = function(b) {
                            return b()
                        }
                    }
                },
                xdr: function(f, g, d) {
                    var c, b, a, k, m;
                    null == g && (g = {});
                    null == d && (d = !1);
                    c = g.data || {};
                    b = g.type || "GET";
                    k = g.withCredentials || !1;
                    "http:" !== f.substring(0, 5) && "https:" !== f.substring(0, 6) && (f = e.PROTOCOL + "clay.io/ajax/" + f);
                    if ("withCredentials" in new XMLHttpRequest) {
                        if (g = XMLHttpRequest) return a = function() {
                            if (4 === m.readyState && d) return d(m.responseText)
                        }, m = new g, m.open(b, f, !0), m.onreadystatechange = a, k && (m.withCredentials = !0), m.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), m.send(this.objToParams(c))
                    } else this.jsonp(f,
                        c, d), e.log("Cross-domain XHR not supported, falling back to JSONP", !0)
                },
                jsonp: function(f, g, d) {
                    var c;
                    c = "jsonp" + (new Date).getTime();
                    this[c] = function(b) {
                        this[c + "callback"](b);
                        this.removeJsonp(c);
                        this[c + "callback"] = null;
                        return this[c] = null
                    };
                    this[c + "callback"] = d;
                    if (e.Environment.externalResourcesAllowed) return d = document.createElement("script"), d.type = "text/javascript", d.src = f + "?time=" + (new Date).getTime() + "&callback=Clay." + c + "&" + this.objToParams(g), d.id = "clay-callback-" + c, f = document.getElementsByTagName("script")[0],
                        f.parentNode.insertBefore(d, f)
                },
                removeJsonp: function(e) {
                    if (e = document.getElementById("clay-callback-" + e)) return e.parentNode.removeChild(e)
                },
                focusedFrame: null,
                sendMessageToFrame: function(f) {
                    return this.focusedFrame ? (f = JSON.stringify(f), this.focusedFrame.contentWindow.postMessage(f, "*")) : e.log("Attempting to post message to frame that doesn't exist")
                },
                objToParams: function(e) {
                    var f, d;
                    d = [];
                    for (f in e) e.hasOwnProperty(f) && d.push(f + "=" + encodeURIComponent(e[f]));
                    return d.join("&")
                },
                objectLength: function(e) {
                    var f,
                        d;
                    d = 0;
                    for (f in e) e.hasOwnProperty(f) && d++;
                    return d
                },
                htmlEntities: function(e) {
                    return String(e).replace(/&amp;/g, "&").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
                },
                pad: function(e, f) {
                    var d;
                    for (d = "" + e; d.length < f;) d = "0" + d;
                    return d
                },
                formatTime: function(e, f) {
                    var d, c;
                    c = this.curTime - e;
                    return 2678400 < c ? 1 === (d = Math.floor(c / 2629742.39712)) ? d + " month ago" : d + " months ago" : 86400 < c ? 1 === (d = Math.floor(c / 86400)) ? d + " day ago" : d + " days ago" : 3600 < c ? 1 === (d = Math.floor(c / 3600)) ? d +
                        " hour ago" : d + " hours ago" : 60 < c ? 1 === (d = Math.floor(c / 60)) ? d + " minute ago" : d + " minutes ago" : "less than 1 minute ago"
                },
                getGameLink: function() {
                    try {
                        if (window.top && window.top.location && window.top.location.href) return window.top.location.href
                    } catch (e) {}
                    return window.location.href
                }
            };
            f.ready = function() {
                var g, h, d, c, b, a;
                e.log("Local Ready Called");
                g = function() {
                    a ? document.removeEventListener("DOMContentLoaded", g, !0) : "complete" !== document.readyState && "interactive" !== document.readyState || document.detachEvent("onreadystatechange",
                        g);
                    return d()
                };
                c = function() {
                    if (!f.DOMLoaded) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (a) {
                            window.setTimeout(arguments_.callee, 15);
                            return
                        }
                        return d()
                    }
                };
                d = function() {
                    var a, b, c;
                    if (!f.DOMLoaded) {
                        f.DOMLoaded = !0;
                        b = h.length;
                        a = 0;
                        e.log("Local Ready Fired");
                        for (c = []; a < b;) h[a].call(document), c.push(a++);
                        return c
                    }
                };
                a = !!document.addEventListener;
                b = f.DOMLoaded = !1;
                h = [];
                if ("complete" === document.readyState || "loaded" === document.readyState || "interactive" === document.readyState) d();
                else if (a) document.addEventListener("DOMContentLoaded",
                    g, !0), window.addEventListener("load", d, !1);
                else {
                    document.attachEvent("onreadystatechange", g);
                    window.attachEvent("onload", d);
                    try {
                        b = null === window.frameElement
                    } catch (k) {}
                    document.documentElement.doScroll && b && c()
                }
                return function(a) {
                    return f.DOMLoaded ? setTimeout(function() {
                        return a.call(document)
                    }, 0) : h.push(a)
                }
            }();
            m.exports = f
        }).call(this)
    }, {
        "../includes/clay": 30
    }],
    37: [function(g, m, q) {
        (function() {
            var e, f, l, h;
            e = g("../includes/clay");
            f = g("../includes/events");
            h = g("../features/ui");
            l = function() {
                function d() {}
                d.offline = !navigator.onLine;
                d.offlineData = localStorage.clayOfflineData ? JSON.parse(localStorage.clayOfflineData) : {};
                d.showWarning = function(c) {
                    null == c && (c = "do that");
                    return h.createNotification({
                        title: "Must be online",
                        html: "You must be connected to the internet to " + c + "!"
                    })
                };
                d.save = function(c, b, a, d, f) {
                    var g, h, l;
                    null == f && (f = !1);
                    e.log("Saving: " + a + " : " + d);
                    (g = this.offlineData)[c] || (g[c] = {});
                    f ? (h = this.offlineData[c])[b] || (h[b] = {}) : (l = this.offlineData[c])[b] || (l[b] = []);
                    f ? this.offlineData[c][b][a] = d : this.offlineData[c][b].push(d);
                    return localStorage.clayOfflineData = JSON.stringify(this.offlineData)
                };
                d.fetch = function(c, b, a) {
                    return this.offlineData[c] && this.offlineData[c][b] && this.offlineData[c][b][a] ? this.offlineData[c][b][a] : null
                };
                d.sync = function() {
                    var c, b, a, d, g, h, l, m;
                    if (!this.offline) {
                        e.log("Synchronizing Clay.io Data");
                        m = this.offlineData;
                        for (h in m)
                            for (d in l = m[h], g = !1, l) {
                                c = l[d];
                                for (a in c) b = c[a], "achievement" === h && "award" === d ? (g = b.noUI = !0, f.socketEmit("achievement", "award", b)) : "leaderboard" === h && "post" === d ? (g = b.noUI = !0,
                                    f.socketEmit("leaderboard", "post", b)) : "user" === h && "saveData" === d ? (g = !1, f.socketEmit("user", "userData", b)) : "stats" === h && "log" === d && (g = !0, f.socketEmit("stats", "logFromAPI", b));
                                g && delete this.offlineData[h]
                            }
                        return localStorage.clayOfflineData = JSON.stringify(this.offlineData)
                    }
                };
                return d
            }();
            e.ready(function() {
                return l.sync()
            });
            window.addEventListener("online", function() {
                return l.sync()
            });
            console.log(l);
            m.exports = l
        }).call(this)
    }, {
        "../features/ui": 26,
        "../includes/clay": 30,
        "../includes/events": 34
    }],
    38: [function(g,
        m, q) {
        g = m.exports = {};
        g.nextTick = function() {
            if ("undefined" !== typeof window && window.setImmediate) return function(e) {
                return window.setImmediate(e)
            };
            if ("undefined" !== typeof window && window.postMessage && window.addEventListener) {
                var e = [];
                window.addEventListener("message", function(f) {
                    f.source === window && "process-tick" === f.data && (f.stopPropagation(), 0 < e.length && e.shift()())
                }, !0);
                return function(f) {
                    e.push(f);
                    window.postMessage("process-tick", "*")
                }
            }
            return function(e) {
                setTimeout(e, 0)
            }
        }();
        g.title = "browser";
        g.browser = !0;
        g.env = {};
        g.argv = [];
        g.binding = function(e) {
            throw Error("process.binding is not supported");
        };
        g.cwd = function() {
            return "/"
        };
        g.chdir = function(e) {
            throw Error("process.chdir is not supported");
        }
    }, {}]
}, {}, [1]);