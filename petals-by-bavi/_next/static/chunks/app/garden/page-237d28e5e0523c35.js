(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [346], {
        2085: (e, t, r) => {
            "use strict";
            r.d(t, {
                default: () => n
            });
            var s = r(628),
                i = r(8436);

            function n(e) {
                let {
                    src: t,
                    alt: r,
                    width: n,
                    height: c,
                    className: o,
                    style: a,
                    priority: l,
                    loading: u,
                    preferPng: h,
                    ...p
                } = e, d = (0, i.V)(t), f = {
                    src: d,
                    alt: r,
                    width: n,
                    height: c,
                    className: o,
                    style: a,
                    loading: l ? "eager" : u,
                    fetchPriority: l ? "high" : void 0,
                    ...p
                };
                if (h) return (0, s.jsx)("img", { ...f
                });
                let g = d.replace(/\.(png|jpg|jpeg)$/i, ".webp");
                return (0, s.jsxs)("picture", {
                    children: [(0, s.jsx)("source", {
                        srcSet: g,
                        type: "image/webp"
                    }), (0, s.jsx)("img", { ...f
                    })]
                })
            }
        },
        8436: (e, t, r) => {
            "use strict";
            r.d(t, {
                V: () => i
            });
            let s = r(9390).env.NEXT_PUBLIC_IMAGE_CDN || "https://assets.pauwee.com";

            function i(e) {
                if (!s) return e;
                let t = e.replace(/^\//, ""),
                    r = s.replace(/\/$/, ""),
                    i = t.startsWith("color/") || t.startsWith("mono/") || t.startsWith("full/") ? t : "other/".concat(t);
                return "".concat(r, "/").concat(i)
            }
        },
        8817: (e, t, r) => {
            Promise.resolve().then(r.bind(r, 2085)), Promise.resolve().then(r.t.bind(r, 9673, 23)), Promise.resolve().then(r.t.bind(r, 7190, 23))
        }
    },
    e => {
        e.O(0, [673, 190, 733, 611, 938, 358], () => e(e.s = 8817)), _N_E = e.O()
    }
]);