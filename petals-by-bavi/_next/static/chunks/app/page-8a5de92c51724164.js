(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [974], {
        277: (e, t, r) => {
            "use strict";
            r.d(t, {
                default: () => i
            });
            var s = r(628),
                c = r(9673),
                n = r.n(c);

            function i() {
                return (0, s.jsxs)("div", {
                    className: "flex flex-col justify-center items-center",
                    children: [(0, s.jsx)(n(), {
                        href: "/bouquet?mode=color",
                        className: "text-sm px-8 py-4 bg-[#000000] text-[#F5F5DC] hover:bg-[#0A0000]/90 m-2",
                        children: "BUILD A BOUQUET"
                    }), (0, s.jsx)(n(), {
                        href: "/bouquet?mode=mono",
                        className: "text-sm px-8 py-4 border border-black text-[#000000] hover:bg-[#F5F5AC]/90 m-2",
                        children: "BUILD IT IN BLACK AND WHITE"
                    }), (0, s.jsx)(n(), {
                        href: "/garden",
                        className: "text-sm px-8 py-4 underline text-[#000000] m-2",
                        children: "VIEW GARDEN"
                    })]
                })
            }
        },
        2085: (e, t, r) => {
            "use strict";
            r.d(t, {
                default: () => n
            });
            var s = r(628),
                c = r(8436);

            function n(e) {
                let {
                    src: t,
                    alt: r,
                    width: n,
                    height: i,
                    className: o,
                    style: l,
                    priority: a,
                    loading: u,
                    preferPng: h,
                    ...d
                } = e, m = (0, c.V)(t), p = {
                    src: m,
                    alt: r,
                    width: n,
                    height: i,
                    className: o,
                    style: l,
                    loading: a ? "eager" : u,
                    fetchPriority: a ? "high" : void 0,
                    ...d
                };
                if (h) return (0, s.jsx)("img", { ...p
                });
                let x = m.replace(/\.(png|jpg|jpeg)$/i, ".webp");
                return (0, s.jsxs)("picture", {
                    children: [(0, s.jsx)("source", {
                        srcSet: x,
                        type: "image/webp"
                    }), (0, s.jsx)("img", { ...p
                    })]
                })
            }
        },
        7509: (e, t, r) => {
            Promise.resolve().then(r.bind(r, 277)), Promise.resolve().then(r.bind(r, 2085)), Promise.resolve().then(r.t.bind(r, 9673, 23))
        },
        8436: (e, t, r) => {
            "use strict";
            r.d(t, {
                V: () => c
            });
            let s = r(9390).env.NEXT_PUBLIC_IMAGE_CDN || "https://assets.pauwee.com";

            function c(e) {
                if (!s) return e;
                let t = e.replace(/^\//, ""),
                    r = s.replace(/\/$/, ""),
                    c = t.startsWith("color/") || t.startsWith("mono/") || t.startsWith("full/") ? t : "other/".concat(t);
                return "".concat(r, "/").concat(c)
            }
        }
    },
    e => {
        e.O(0, [673, 733, 611, 938, 358], () => e(e.s = 7509)), _N_E = e.O()
    }
]);