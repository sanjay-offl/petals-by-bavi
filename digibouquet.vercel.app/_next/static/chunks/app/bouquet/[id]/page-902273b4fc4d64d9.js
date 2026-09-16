(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [958], {
        1469: (e, t, a) => {
            "use strict";
            a.d(t, {
                default: () => l
            });
            var r = a(628),
                n = a(2552),
                o = a(201);
            let i = "Hi, I made a bouquet for you! \uD83D\uDC90";

            function l(e) {
                let {
                    children: t,
                    bouquetId: a,
                    footer: l
                } = e, [c, s] = (0, n.useState)(null);
                (0, n.useEffect)(() => {
                    ! function() {
                        let e = ["#fafaf5", "#e8f0e8", "#f5ecd2", "#fce4ec", "#e0f0f8", "#f0e6e8", "#e5ebe0", "#f8f4e8"],
                            t = document.createElement("canvas");
                        t.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;", document.body.appendChild(t);
                        let a = t.getContext("2d");
                        t.width = window.innerWidth, t.height = window.innerHeight;
                        let r = [{
                                x: .2,
                                y: .45
                            }, {
                                x: .4,
                                y: .5
                            }, {
                                x: .5,
                                y: .45
                            }, {
                                x: .6,
                                y: .5
                            }, {
                                x: .8,
                                y: .45
                            }],
                            n = Array.from({
                                length: 160
                            }, () => {
                                let a = r[Math.floor(Math.random() * r.length)],
                                    n = Math.random() * Math.PI * 2,
                                    o = (2 + 3 * Math.random()) * (.6 + .8 * Math.random());
                                return {
                                    x: a.x * t.width + (Math.random() - .5) * 40,
                                    y: a.y * t.height + (Math.random() - .5) * 40,
                                    vx: Math.cos(n) * o,
                                    vy: Math.sin(n) * o,
                                    color: e[Math.floor(Math.random() * e.length)],
                                    size: 2.5 + 2.5 * Math.random(),
                                    life: 1
                                }
                            }),
                            o = performance.now(),
                            i = () => {
                                let e = (performance.now() - o) / 1e3,
                                    r = e < 3.2 ? 1 : Math.max(0, 1 - (e - 3.2) / (4 - 3.2));
                                a.clearRect(0, 0, t.width, t.height), n.forEach(e => {
                                    e.x += e.vx, e.y += e.vy, e.vy += .04, e.vx *= .998, r <= 0 || (a.globalAlpha = .9 * r, a.fillStyle = e.color, a.beginPath(), a.arc(e.x, e.y, e.size, 0, 2 * Math.PI), a.fill())
                                }), a.globalAlpha = 1, e < 4.5 ? requestAnimationFrame(i) : t.remove()
                            };
                        requestAnimationFrame(i)
                    }()
                }, [a]);
                let d = () => "".concat(window.location.origin, "/bouquet/").concat(a),
                    h = e => {
                        s(e), window.setTimeout(() => s(null), 1800)
                    },
                    u = async () => {
                        let e = d();
                        if (!e) return;
                        let t = {
                            title: "A bouquet for you",
                            text: "".concat(i, " ").concat(e),
                            url: e
                        };
                        if (navigator.share) try {
                            await navigator.share(t), h("shared!")
                        } catch (e) {
                            "AbortError" !== e.name && m()
                        } else m()
                    },
                    m = () => {
                        var e;
                        let t = d();
                        t && (null == (e = navigator.clipboard) ? void 0 : e.writeText) && (navigator.clipboard.writeText("".concat(i, " ").concat(t)), h("message and link copied!"))
                    },
                    x = c ? (0, r.jsx)("div", {
                        className: "fixed top-10 left-1/2 -translate-x-1/2 z-[10000] rounded-full bg-white text-black text-xs px-6 py-3 shadow-md border border-black",
                        children: c
                    }) : null;
                return (0, r.jsxs)("div", {
                    className: "animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150 [animation-fill-mode:both]",
                    children: ["undefined" != typeof document && x ? (0, o.createPortal)(x, document.body) : null, t, (0, r.jsx)("div", {
                        className: "py-10 pt-4",
                        children: (0, r.jsxs)("div", {
                            className: "flex flex-wrap items-center justify-center gap-2",
                            children: [(0, r.jsx)("button", {
                                type: "button",
                                onClick: () => {
                                    var e;
                                    let t = d();
                                    t && (null == (e = navigator.clipboard) ? void 0 : e.writeText) && (navigator.clipboard.writeText(t), h("link copied! \uD83D\uDC90"))
                                },
                                className: "text-xs md:text-sm uppercase bg-black text-white px-5 py-2.5 transition-all duration-150 hover:opacity-80 hover:scale-[1.02] active:scale-[0.98]",
                                children: "copy link"
                            }), (0, r.jsx)("button", {
                                type: "button",
                                onClick: u,
                                className: "text-xs md:text-sm uppercase border border-black text-black px-5 py-2.5 bg-transparent hover:bg-black hover:text-white transition-colors",
                                children: "share"
                            })]
                        })
                    }), l]
                })
            }
        },
        2085: (e, t, a) => {
            "use strict";
            a.d(t, {
                default: () => o
            });
            var r = a(628),
                n = a(8436);

            function o(e) {
                let {
                    src: t,
                    alt: a,
                    width: o,
                    height: i,
                    className: l,
                    style: c,
                    priority: s,
                    loading: d,
                    preferPng: h,
                    ...u
                } = e, m = (0, n.V)(t), x = {
                    src: m,
                    alt: a,
                    width: o,
                    height: i,
                    className: l,
                    style: c,
                    loading: s ? "eager" : d,
                    fetchPriority: s ? "high" : void 0,
                    ...u
                };
                if (h) return (0, r.jsx)("img", { ...x
                });
                let f = m.replace(/\.(png|jpg|jpeg)$/i, ".webp");
                return (0, r.jsxs)("picture", {
                    children: [(0, r.jsx)("source", {
                        srcSet: f,
                        type: "image/webp"
                    }), (0, r.jsx)("img", { ...x
                    })]
                })
            }
        },
        6722: (e, t, a) => {
            Promise.resolve().then(a.bind(a, 1469)), Promise.resolve().then(a.bind(a, 2085)), Promise.resolve().then(a.t.bind(a, 9673, 23)), Promise.resolve().then(a.t.bind(a, 7190, 23))
        },
        8436: (e, t, a) => {
            "use strict";
            a.d(t, {
                V: () => n
            });
            let r = a(9390).env.NEXT_PUBLIC_IMAGE_CDN || "https://assets.pauwee.com";

            function n(e) {
                if (!r) return e;
                let t = e.replace(/^\//, ""),
                    a = r.replace(/\/$/, ""),
                    n = t.startsWith("color/") || t.startsWith("mono/") || t.startsWith("full/") ? t : "other/".concat(t);
                return "".concat(a, "/").concat(n)
            }
        }
    },
    e => {
        e.O(0, [673, 190, 733, 611, 938, 358], () => e(e.s = 6722)), _N_E = e.O()
    }
]);