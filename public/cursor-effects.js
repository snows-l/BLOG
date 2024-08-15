/*
 * @Description: ------------ cursoreffects - 源码 -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 15:32:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 17:53:10
 * @FilePath: /blog/public/cursor-effects.js
 */

var cursoreffects = (function (t) {
  'use strict';
  return (
    (t.bubbleCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = window.innerWidth,
        c = window.innerHeight,
        l = { x: h / 2, y: h / 2 },
        a = [],
        r = [];
      const d = window.matchMedia('(prefers-reduced-motion: reduce)');
      function u() {
        if (d.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = h), (e.height = c)),
          s.addEventListener('mousemove', g),
          s.addEventListener('touchmove', m, { passive: !0 }),
          s.addEventListener('touchstart', m, { passive: !0 }),
          window.addEventListener('resize', A),
          p();
      }
      function A(t) {
        (h = window.innerWidth), (c = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = h), (e.height = c));
      }
      function m(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) f(t.touches[e].clientX, t.touches[e].clientY, r[Math.floor(Math.random() * r.length)]);
      }
      function g(t) {
        if (o) {
          const e = s.getBoundingClientRect();
          (l.x = t.clientX - e.left), (l.y = t.clientY - e.top);
        } else (l.x = t.clientX), (l.y = t.clientY);
        f(l.x, l.y);
      }
      function f(t, e, n) {
        a.push(new v(t, e, n));
      }
      function p() {
        !(function () {
          if (0 != a.length) {
            n.clearRect(0, 0, h, c);
            for (let t = 0; t < a.length; t++) a[t].update(n);
            for (let t = a.length - 1; t >= 0; t--) a[t].lifeSpan < 0 && a.splice(t, 1);
            0 == a.length && n.clearRect(0, 0, h, c);
          }
        })(),
          (i = requestAnimationFrame(p));
      }
      function y() {
        e.remove(),
          cancelAnimationFrame(i),
          s.removeEventListener('mousemove', g),
          s.removeEventListener('touchmove', m),
          s.removeEventListener('touchstart', m),
          window.addEventListener('resize', A);
      }
      function v(t, e, n) {
        const i = Math.floor(60 * Math.random() + 60);
        (this.initialLifeSpan = i),
          (this.lifeSpan = i),
          (this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10), y: -1 * Math.random() - 0.4 }),
          (this.position = { x: t, y: e }),
          (this.canv = n),
          (this.baseDimension = 4),
          (this.update = function (t) {
            (this.position.x += this.velocity.x),
              (this.position.y += this.velocity.y),
              (this.velocity.x += (2 * (Math.random() < 0.5 ? -1 : 1)) / 75),
              (this.velocity.y -= Math.random() / 600),
              this.lifeSpan--;
            const e = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
            (t.fillStyle = '#e6f1f7'),
              (t.strokeStyle = '#3a92c5'),
              t.beginPath(),
              t.arc(this.position.x - (this.baseDimension / 2) * e, this.position.y - this.baseDimension / 2, this.baseDimension * e, 0, 2 * Math.PI),
              t.stroke(),
              t.fill(),
              t.closePath();
          });
      }
      return (
        (d.onchange = () => {
          d.matches ? y() : u();
        }),
        u(),
        { destroy: y }
      );
    }),
    (t.characterCursor = function (t) {
      let e = t && t.element,
        n = e || document.body,
        i = t?.characters || ['h', 'e', 'l', 'l', 'o'];
      const o = t?.colors || ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'];
      let s,
        h,
        c,
        l = t?.cursorOffset || { x: 0, y: 0 },
        a = window.innerWidth,
        r = window.innerHeight,
        d = { x: a / 2, y: a / 2 },
        u = [],
        A = t?.font || '15px serif',
        m =
          t?.characterLifeSpanFunction ||
          function () {
            return Math.floor(60 * Math.random() + 80);
          },
        g =
          t?.initialCharacterVelocityFunction ||
          function () {
            return { x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5, y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5 };
          },
        f = t?.characterVelocityChangeFunctions || {
          x_func: function (t, e) {
            return (Math.random() < 0.5 ? -1 : 1) / 30;
          },
          y_func: function (t, e) {
            return (Math.random() < 0.5 ? -1 : 1) / 15;
          }
        },
        p =
          t?.characterScalingFunction ||
          function (t, e) {
            let n = e - t;
            return Math.max((n / e) * 2, 0);
          },
        y =
          t?.characterNewRotationDegreesFunction ||
          function (t, e) {
            return (e - t) / 5;
          },
        v = [];
      const w = window.matchMedia('(prefers-reduced-motion: reduce)');
      function x() {
        if (w.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (s = document.createElement('canvas')),
          (h = s.getContext('2d')),
          (s.style.top = '0px'),
          (s.style.left = '0px'),
          (s.style.pointerEvents = 'none'),
          e
            ? ((s.style.position = 'absolute'), n.appendChild(s), (s.width = n.clientWidth), (s.height = n.clientHeight))
            : ((s.style.position = 'fixed'), document.body.appendChild(s), (s.width = a), (s.height = r)),
          (h.font = A),
          (h.textBaseline = 'middle'),
          (h.textAlign = 'center'),
          i.forEach(t => {
            let e = h.measureText(t),
              n = document.createElement('canvas'),
              i = n.getContext('2d');
            (n.width = e.width), (n.height = 2.5 * e.actualBoundingBoxAscent), (i.textAlign = 'center'), (i.font = A), (i.textBaseline = 'middle');
            var s = o[Math.floor(Math.random() * o.length)];
            (i.fillStyle = s), i.fillText(t, n.width / 2, e.actualBoundingBoxAscent), v.push(n);
          }),
          n.addEventListener('mousemove', C),
          n.addEventListener('touchmove', M, { passive: !0 }),
          n.addEventListener('touchstart', M, { passive: !0 }),
          window.addEventListener('resize', E),
          B();
      }
      function E(t) {
        (a = window.innerWidth), (r = window.innerHeight), e ? ((s.width = n.clientWidth), (s.height = n.clientHeight)) : ((s.width = a), (s.height = r));
      }
      function M(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) L(t.touches[e].clientX, t.touches[e].clientY, v[Math.floor(Math.random() * v.length)]);
      }
      function C(t) {
        if (e) {
          const e = n.getBoundingClientRect();
          (d.x = t.clientX - e.left), (d.y = t.clientY - e.top);
        } else (d.x = t.clientX), (d.y = t.clientY);
        L(d.x, d.y, v[Math.floor(Math.random() * i.length)]);
      }
      function L(t, e, n) {
        u.push(new R(t, e, n));
      }
      function B() {
        !(function () {
          if (0 != u.length) {
            h.clearRect(0, 0, a, r);
            for (let t = 0; t < u.length; t++) u[t].update(h);
            for (let t = u.length - 1; t >= 0; t--) u[t].lifeSpan < 0 && u.splice(t, 1);
            0 == u.length && h.clearRect(0, 0, a, r);
          }
        })(),
          (c = requestAnimationFrame(B));
      }
      function b() {
        s.remove(),
          cancelAnimationFrame(c),
          n.removeEventListener('mousemove', C),
          n.removeEventListener('touchmove', M),
          n.removeEventListener('touchstart', M),
          window.addEventListener('resize', E);
      }
      function R(t, e, n) {
        const i = m();
        (this.rotationSign = Math.random() < 0.5 ? -1 : 1),
          (this.age = 0),
          (this.initialLifeSpan = i),
          (this.lifeSpan = i),
          (this.velocity = g()),
          (this.position = { x: t + l.x, y: e + l.y }),
          (this.canv = n),
          (this.update = function (t) {
            (this.position.x += this.velocity.x),
              (this.position.y += this.velocity.y),
              this.lifeSpan--,
              this.age++,
              (this.velocity.x += f.x_func(this.age, this.initialLifeSpan)),
              (this.velocity.y += f.y_func(this.age, this.initialLifeSpan));
            const e = p(this.age, this.initialLifeSpan),
              n = 0.0174533 * (this.rotationSign * y(this.age, this.initialLifeSpan));
            t.translate(this.position.x, this.position.y),
              t.rotate(n),
              t.drawImage(this.canv, (-this.canv.width / 2) * e, -this.canv.height / 2, this.canv.width * e, this.canv.height * e),
              t.rotate(-n),
              t.translate(-this.position.x, -this.position.y);
          });
      }
      return (
        (w.onchange = () => {
          w.matches ? b() : x();
        }),
        x(),
        { destroy: b }
      );
    }),
    (t.clockCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = window.innerWidth,
        c = window.innerHeight,
        l = { x: h / 2, y: h / 2 };
      const a = (t && t.dateColor) || 'blue',
        r = (t && t.faceColor) || 'black',
        d = (t && t.secondsColor) || 'red',
        u = (t && t.minutesColor) || 'black',
        A = (t && t.hoursColor) || 'black',
        m = 0.4,
        g = (t && t.theDays) || ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
        f = (t && t.theMonths) || ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
      let p = new Date(),
        y = p.getDate(),
        v = p.getYear() + 1900;
      const w = (' ' + g[p.getDay()] + ' ' + y + ' ' + f[p.getMonth()] + ' ' + v).split(''),
        x = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'],
        E = x.length,
        M = ['•', '•', '•'],
        C = ['•', '•', '•', '•'],
        L = ['•', '•', '•', '•', '•'],
        B = 360 / E,
        b = 360 / w.length,
        R = 45 / 6.5,
        S = [],
        Y = [],
        W = [],
        H = [],
        I = [],
        X = [],
        D = [],
        T = [],
        F = [];
      var z = parseInt(w.length + E + M.length + C.length + L.length) + 1;
      const P = window.matchMedia('(prefers-reduced-motion: reduce)');
      function J() {
        if (P.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = h), (e.height = c)),
          (n.font = '10px sans-serif'),
          (n.textAlign = 'center'),
          (n.textBaseline = 'middle');
        for (let t = 0; t < z; t++) (S[t] = 0), (Y[t] = 0), (W[t] = 0), (H[t] = 0);
        for (let t = 0; t < w.length; t++) F[t] = { color: a, value: w[t] };
        for (let t = 0; t < x.length; t++) T[t] = { color: r, value: x[t] };
        for (let t = 0; t < M.length; t++) D[t] = { color: A, value: M[t] };
        for (let t = 0; t < C.length; t++) X[t] = { color: u, value: C[t] };
        for (let t = 0; t < L.length; t++) I[t] = { color: d, value: L[t] };
        s.addEventListener('mousemove', Z),
          s.addEventListener('touchmove', Q, { passive: !0 }),
          s.addEventListener('touchstart', Q, { passive: !0 }),
          window.addEventListener('resize', U),
          k();
      }
      function U(t) {
        (h = window.innerWidth), (c = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = h), (e.height = c));
      }
      function Q(t) {
        if (t.touches.length > 0)
          if (o) {
            const e = s.getBoundingClientRect();
            (l.x = t.touches[0].clientX - e.left), (l.y = t.touches[0].clientY - e.top);
          } else (l.x = t.touches[0].clientX), (l.y = t.touches[0].clientY);
      }
      function Z(t) {
        if (o) {
          const e = s.getBoundingClientRect();
          (l.x = t.clientX - e.left), (l.y = t.clientY - e.top);
        } else (l.x = t.clientX), (l.y = t.clientY);
      }
      function k() {
        !(function () {
          (W[0] = Math.round((S[0] += (l.y - S[0]) * m))), (H[0] = Math.round((Y[0] += (l.x - Y[0]) * m)));
          for (let t = 1; t < z; t++)
            (W[t] = Math.round((S[t] += (W[t - 1] - S[t]) * m))),
              (H[t] = Math.round((Y[t] += (H[t - 1] - Y[t]) * m))),
              S[t - 1] >= c - 80 && (S[t - 1] = c - 80),
              Y[t - 1] >= h - 80 && (Y[t - 1] = h - 80);
        })(),
          (function () {
            n.clearRect(0, 0, h, c);
            const t = new Date(),
              e = t.getSeconds(),
              i = (Math.PI * (e - 15)) / 30,
              o = t.getMinutes(),
              s = (Math.PI * (o - 15)) / 30,
              l = t.getHours(),
              a = (Math.PI * (l - 3)) / 6 + (Math.PI * parseInt(t.getMinutes())) / 360;
            for (let t = 0; t < F.length; t++)
              (F[t].y = S[t] + 67.5 * Math.sin(-i + (t * b * Math.PI) / 180)),
                (F[t].x = Y[t] + 67.5 * Math.cos(-i + (t * b * Math.PI) / 180)),
                (n.fillStyle = F[t].color),
                n.fillText(F[t].value, F[t].x, F[t].y);
            for (let t = 0; t < T.length; t++)
              (T[t].y = S[F.length + t] + 45 * Math.sin((t * B * Math.PI) / 180)),
                (T[t].x = Y[F.length + t] + 45 * Math.cos((t * B * Math.PI) / 180)),
                (n.fillStyle = T[t].color),
                n.fillText(T[t].value, T[t].x, T[t].y);
            for (let t = 0; t < D.length; t++)
              (D[t].y = S[F.length + E + t] + 0 + t * R * Math.sin(a)),
                (D[t].x = Y[F.length + E + t] + 0 + t * R * Math.cos(a)),
                (n.fillStyle = D[t].color),
                n.fillText(D[t].value, D[t].x, D[t].y);
            for (let t = 0; t < X.length; t++)
              (X[t].y = S[F.length + E + D.length + t] + 0 + t * R * Math.sin(s)),
                (X[t].x = Y[F.length + E + D.length + t] + 0 + t * R * Math.cos(s)),
                (n.fillStyle = X[t].color),
                n.fillText(X[t].value, X[t].x, X[t].y);
            for (let t = 0; t < I.length; t++)
              (I[t].y = S[F.length + E + D.length + X.length + t] + 0 + t * R * Math.sin(i)),
                (I[t].x = Y[F.length + E + D.length + X.length + t] + 0 + t * R * Math.cos(i)),
                (n.fillStyle = I[t].color),
                n.fillText(I[t].value, I[t].x, I[t].y);
          })(),
          (i = requestAnimationFrame(k));
      }
      function N() {
        e.remove(),
          cancelAnimationFrame(i),
          s.removeEventListener('mousemove', Z),
          s.removeEventListener('touchmove', Q),
          s.removeEventListener('touchstart', Q),
          window.addEventListener('resize', U);
      }
      return (
        (P.onchange = () => {
          P.matches ? N() : J();
        }),
        J(),
        { destroy: N }
      );
    }),
    (t.emojiCursor = function (t) {
      const e = (t && t.emoji) || ['😀', '😂', '😆', '😊'];
      let n = t && t.element,
        i = n || document.body,
        o = window.innerWidth,
        s = window.innerHeight;
      const h = { x: o / 2, y: o / 2 },
        c = { x: o / 2, y: o / 2 };
      let l = 0;
      const a = [],
        r = [];
      let d, u, A;
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      function g() {
        if (m.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (d = document.createElement('canvas')),
          (u = d.getContext('2d')),
          (d.style.top = '0px'),
          (d.style.left = '0px'),
          (d.style.pointerEvents = 'none'),
          n
            ? ((d.style.position = 'absolute'), i.appendChild(d), (d.width = i.clientWidth), (d.height = i.clientHeight))
            : ((d.style.position = 'fixed'), document.body.appendChild(d), (d.width = o), (d.height = s)),
          (u.font = '21px serif'),
          (u.textBaseline = 'middle'),
          (u.textAlign = 'center'),
          e.forEach(t => {
            let e = u.measureText(t),
              n = document.createElement('canvas'),
              i = n.getContext('2d');
            (n.width = e.width),
              (n.height = 2 * e.actualBoundingBoxAscent),
              (i.textAlign = 'center'),
              (i.font = '21px serif'),
              (i.textBaseline = 'middle'),
              i.fillText(t, n.width / 2, e.actualBoundingBoxAscent),
              r.push(n);
          }),
          i.addEventListener('mousemove', y, { passive: !0 }),
          i.addEventListener('touchmove', p, { passive: !0 }),
          i.addEventListener('touchstart', p, { passive: !0 }),
          window.addEventListener('resize', f),
          w();
      }
      function f(t) {
        (o = window.innerWidth), (s = window.innerHeight), n ? ((d.width = i.clientWidth), (d.height = i.clientHeight)) : ((d.width = o), (d.height = s));
      }
      function p(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) v(t.touches[e].clientX, t.touches[e].clientY, r[Math.floor(Math.random() * r.length)]);
      }
      function y(t) {
        t.timeStamp - l < 16 ||
          window.requestAnimationFrame(() => {
            if (n) {
              const e = i.getBoundingClientRect();
              (h.x = t.clientX - e.left), (h.y = t.clientY - e.top);
            } else (h.x = t.clientX), (h.y = t.clientY);
            Math.hypot(h.x - c.x, h.y - c.y) > 1 && (v(h.x, h.y, r[Math.floor(Math.random() * e.length)]), (c.x = h.x), (c.y = h.y), (l = t.timeStamp));
          });
      }
      function v(t, e, n) {
        a.push(new E(t, e, n));
      }
      function w() {
        !(function () {
          if (0 != a.length) {
            u.clearRect(0, 0, o, s);
            for (let t = 0; t < a.length; t++) a[t].update(u);
            for (let t = a.length - 1; t >= 0; t--) a[t].lifeSpan < 0 && a.splice(t, 1);
            0 == a.length && u.clearRect(0, 0, o, s);
          }
        })(),
          (A = requestAnimationFrame(w));
      }
      function x() {
        d.remove(),
          cancelAnimationFrame(A),
          i.removeEventListener('mousemove', y),
          i.removeEventListener('touchmove', p),
          i.removeEventListener('touchstart', p),
          window.addEventListener('resize', f);
      }
      function E(t, e, n) {
        const i = Math.floor(60 * Math.random() + 80);
        (this.initialLifeSpan = i),
          (this.lifeSpan = i),
          (this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 0.4 * Math.random() + 0.8 }),
          (this.position = { x: t, y: e }),
          (this.canv = n),
          (this.update = function (t) {
            (this.position.x += this.velocity.x), (this.position.y += this.velocity.y), this.lifeSpan--, (this.velocity.y += 0.05);
            const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
            t.drawImage(this.canv, this.position.x - (this.canv.width / 2) * e, this.position.y - this.canv.height / 2, this.canv.width * e, this.canv.height * e);
          });
      }
      return (
        (m.onchange = () => {
          m.matches ? x() : g();
        }),
        g(),
        { destroy: x }
      );
    }),
    (t.fairyDustCursor = function (t) {
      let e = (t && t.colors) || ['#D61C59', '#E7D84B', '#1B8798'],
        n = t && t.element,
        i = n || document.body,
        o = window.innerWidth,
        s = window.innerHeight;
      const h = { x: o / 2, y: o / 2 },
        c = { x: o / 2, y: o / 2 },
        l = [],
        a = [];
      let r, d, u;
      const A = window.matchMedia('(prefers-reduced-motion: reduce)');
      function m() {
        if (A.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (r = document.createElement('canvas')),
          (d = r.getContext('2d')),
          (r.style.top = '0px'),
          (r.style.left = '0px'),
          (r.style.pointerEvents = 'none'),
          n
            ? ((r.style.position = 'absolute'), i.appendChild(r), (r.width = i.clientWidth), (r.height = i.clientHeight))
            : ((r.style.position = 'fixed'), i.appendChild(r), (r.width = o), (r.height = s)),
          (d.font = '21px serif'),
          (d.textBaseline = 'middle'),
          (d.textAlign = 'center'),
          e.forEach(t => {
            let e = d.measureText('*'),
              n = document.createElement('canvas'),
              i = n.getContext('2d');
            (n.width = e.width),
              (n.height = e.actualBoundingBoxAscent + e.actualBoundingBoxDescent),
              (i.fillStyle = t),
              (i.textAlign = 'center'),
              (i.font = '21px serif'),
              (i.textBaseline = 'middle'),
              i.fillText('*', n.width / 2, e.actualBoundingBoxAscent),
              a.push(n);
          }),
          i.addEventListener('mousemove', p),
          i.addEventListener('touchmove', f, { passive: !0 }),
          i.addEventListener('touchstart', f, { passive: !0 }),
          window.addEventListener('resize', g),
          v();
      }
      function g(t) {
        (o = window.innerWidth), (s = window.innerHeight), n ? ((r.width = i.clientWidth), (r.height = i.clientHeight)) : ((r.width = o), (r.height = s));
      }
      function f(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) y(t.touches[e].clientX, t.touches[e].clientY, a[Math.floor(Math.random() * a.length)]);
      }
      function p(t) {
        window.requestAnimationFrame(() => {
          if (n) {
            const e = i.getBoundingClientRect();
            (h.x = t.clientX - e.left), (h.y = t.clientY - e.top);
          } else (h.x = t.clientX), (h.y = t.clientY);
          Math.hypot(h.x - c.x, h.y - c.y) > 1.5 && (y(h.x, h.y, a[Math.floor(Math.random() * e.length)]), (c.x = h.x), (c.y = h.y));
        });
      }
      function y(t, e, n) {
        l.push(new x(t, e, n));
      }
      function v() {
        !(function () {
          if (0 != l.length) {
            d.clearRect(0, 0, o, s);
            for (let t = 0; t < l.length; t++) l[t].update(d);
            for (let t = l.length - 1; t >= 0; t--) l[t].lifeSpan < 0 && l.splice(t, 1);
            0 == l.length && d.clearRect(0, 0, o, s);
          }
        })(),
          (u = requestAnimationFrame(v));
      }
      function w() {
        r.remove(),
          cancelAnimationFrame(u),
          i.removeEventListener('mousemove', p),
          i.removeEventListener('touchmove', f),
          i.removeEventListener('touchstart', f),
          window.addEventListener('resize', g);
      }
      function x(t, e, n) {
        const i = Math.floor(30 * Math.random() + 60);
        (this.initialLifeSpan = i),
          (this.lifeSpan = i),
          (this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 0.7 * Math.random() + 0.9 }),
          (this.position = { x: t, y: e }),
          (this.canv = n),
          (this.update = function (t) {
            (this.position.x += this.velocity.x), (this.position.y += this.velocity.y), this.lifeSpan--, (this.velocity.y += 0.02);
            const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
            t.drawImage(this.canv, this.position.x - (this.canv.width / 2) * e, this.position.y - this.canv.height / 2, this.canv.width * e, this.canv.height * e);
          });
      }
      return (
        (A.onchange = () => {
          A.matches ? w() : m();
        }),
        m(),
        { destroy: w }
      );
    }),
    (t.followingDotCursor = function (t) {
      let e,
        n,
        i = t && t.element,
        o = i || document.body,
        s = window.innerWidth,
        h = window.innerHeight,
        c = { x: s / 2, y: s / 2 },
        l = new (function (t, e, n, i) {
          (this.position = { x: t, y: e }),
            (this.width = n),
            (this.lag = i),
            (this.moveTowards = function (t, e, n) {
              (this.position.x += (t - this.position.x) / this.lag),
                (this.position.y += (e - this.position.y) / this.lag),
                (n.fillStyle = a),
                n.beginPath(),
                n.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI),
                n.fill(),
                n.closePath();
            });
        })(s / 2, h / 2, 10, 10),
        a = t?.color || '#323232a6';
      const r = window.matchMedia('(prefers-reduced-motion: reduce)');
      function d() {
        if (r.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          i
            ? ((e.style.position = 'absolute'), o.appendChild(e), (e.width = o.clientWidth), (e.height = o.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = s), (e.height = h)),
          o.addEventListener('mousemove', A),
          window.addEventListener('resize', u),
          m();
      }
      function u(t) {
        (s = window.innerWidth), (h = window.innerHeight), i ? ((e.width = o.clientWidth), (e.height = o.clientHeight)) : ((e.width = s), (e.height = h));
      }
      function A(t) {
        if (i) {
          const e = o.getBoundingClientRect();
          (c.x = t.clientX - e.left), (c.y = t.clientY - e.top);
        } else (c.x = t.clientX), (c.y = t.clientY);
      }
      function m() {
        n.clearRect(0, 0, s, h), l.moveTowards(c.x, c.y, n), requestAnimationFrame(m);
      }
      function g() {
        e.remove(), cancelAnimationFrame(m), o.removeEventListener('mousemove', A), window.addEventListener('resize', u);
      }
      return (
        (r.onchange = () => {
          r.matches ? g() : d();
        }),
        d(),
        { destroy: g }
      );
    }),
    (t.ghostCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = t && t.randomDelay,
        c = (t && t.minDelay) || 5,
        l = (t && t.maxDelay) || 50,
        a = window.innerWidth,
        r = window.innerHeight,
        d = { x: a / 2, y: a / 2 },
        u = [],
        A = new Image();
      t && t.image
        ? (A.src = t.image)
        : (A.src =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==');
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      function g() {
        if (m.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = a), (e.height = r)),
          s.addEventListener('mousemove', x),
          s.addEventListener('touchmove', p, { passive: !0 }),
          s.addEventListener('touchstart', p, { passive: !0 }),
          window.addEventListener('resize', f),
          M();
      }
      function f(t) {
        (a = window.innerWidth), (r = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = a), (e.height = r));
      }
      function p(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) E(t.touches[e].clientX, t.touches[e].clientY, A);
      }
      m.onchange = () => {
        m.matches ? C() : g();
      };
      let y = () => Math.floor(Math.random() * (l - c + 1)) + c,
        v = Date.now(),
        w = y();
      function x(t) {
        if (h) {
          if (v + w > Date.now()) return;
          (v = Date.now()), (w = y());
        }
        if (o) {
          const e = s.getBoundingClientRect();
          (d.x = t.clientX - e.left), (d.y = t.clientY - e.top);
        } else (d.x = t.clientX), (d.y = t.clientY);
        E(d.x, d.y, A);
      }
      function E(t, e, n) {
        u.push(new L(t, e, n));
      }
      function M() {
        !(function () {
          if (0 != u.length) {
            n.clearRect(0, 0, a, r);
            for (let t = 0; t < u.length; t++) u[t].update(n);
            for (let t = u.length - 1; t >= 0; t--) u[t].lifeSpan < 0 && u.splice(t, 1);
            0 == u.length && n.clearRect(0, 0, a, r);
          }
        })(),
          (i = requestAnimationFrame(M));
      }
      function C() {
        e.remove(),
          cancelAnimationFrame(i),
          s.removeEventListener('mousemove', x),
          s.removeEventListener('touchmove', p),
          s.removeEventListener('touchstart', p),
          window.addEventListener('resize', f);
      }
      function L(t, e, n) {
        (this.initialLifeSpan = 40),
          (this.lifeSpan = 40),
          (this.position = { x: t, y: e }),
          (this.image = n),
          (this.update = function (t) {
            this.lifeSpan--;
            const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
            (t.globalAlpha = e), t.drawImage(this.image, this.position.x, this.position.y);
          });
      }
      return g(), { destroy: C };
    }),
    (t.rainbowCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = window.innerWidth,
        c = window.innerHeight,
        l = { x: h / 2, y: h / 2 },
        a = [];
      const r = t?.length || 20,
        d = t?.colors || ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'],
        u = t?.size || 3;
      let A = !1;
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      function g() {
        if (m.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = h), (e.height = c)),
          s.addEventListener('mousemove', p),
          window.addEventListener('resize', f),
          y();
      }
      function f(t) {
        (h = window.innerWidth), (c = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = h), (e.height = c));
      }
      function p(t) {
        if (o) {
          const e = s.getBoundingClientRect();
          (l.x = t.clientX - e.left), (l.y = t.clientY - e.top);
        } else (l.x = t.clientX), (l.y = t.clientY);
        if (!1 === A) {
          A = !0;
          for (let t = 0; t < r; t++) (e = l.x), (n = l.y), void 0, a.push(new w(e, n));
        }
        var e, n;
      }
      function y() {
        !(function () {
          n.clearRect(0, 0, h, c), (n.lineJoin = 'round');
          let t = [],
            e = l.x,
            i = l.y;
          a.forEach(function (n, o, s) {
            let h = s[o + 1] || s[0];
            (n.position.x = e), (n.position.y = i), t.push({ x: e, y: i }), (e += 0.4 * (h.position.x - n.position.x)), (i += 0.4 * (h.position.y - n.position.y));
          }),
            d.forEach((e, i) => {
              n.beginPath(),
                (n.strokeStyle = e),
                t.length && n.moveTo(t[0].x, t[0].y + i * (u - 1)),
                t.forEach((t, e) => {
                  0 !== e && n.lineTo(t.x, t.y + i * u);
                }),
                (n.lineWidth = u),
                (n.lineCap = 'round'),
                n.stroke();
            });
        })(),
          (i = requestAnimationFrame(y));
      }
      function v() {
        e.remove(), cancelAnimationFrame(i), s.removeEventListener('mousemove', p), window.addEventListener('resize', f);
      }
      function w(t, e) {
        this.position = { x: t, y: e };
      }
      return (
        (m.onchange = () => {
          m.matches ? v() : g();
        }),
        g(),
        { destroy: v }
      );
    }),
    (t.snowflakeCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = ['❄️'],
        c = window.innerWidth,
        l = window.innerHeight,
        a = { x: c / 2, y: c / 2 },
        r = [],
        d = [];
      const u = window.matchMedia('(prefers-reduced-motion: reduce)');
      function A() {
        if (u.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = c), (e.height = l)),
          (n.font = '12px serif'),
          (n.textBaseline = 'middle'),
          (n.textAlign = 'center'),
          h.forEach(t => {
            let e = n.measureText(t),
              i = document.createElement('canvas'),
              o = i.getContext('2d');
            (i.width = e.width),
              (i.height = 2 * e.actualBoundingBoxAscent),
              (o.textAlign = 'center'),
              (o.font = '12px serif'),
              (o.textBaseline = 'middle'),
              o.fillText(t, i.width / 2, e.actualBoundingBoxAscent),
              d.push(i);
          }),
          s.addEventListener('mousemove', f),
          s.addEventListener('touchmove', g, { passive: !0 }),
          s.addEventListener('touchstart', g, { passive: !0 }),
          window.addEventListener('resize', m),
          y();
      }
      function m(t) {
        (c = window.innerWidth), (l = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = c), (e.height = l));
      }
      function g(t) {
        if (t.touches.length > 0) for (let e = 0; e < t.touches.length; e++) p(t.touches[e].clientX, t.touches[e].clientY, d[Math.floor(Math.random() * d.length)]);
      }
      function f(t) {
        if (o) {
          const e = s.getBoundingClientRect();
          (a.x = t.clientX - e.left), (a.y = t.clientY - e.top);
        } else (a.x = t.clientX), (a.y = t.clientY);
        p(a.x, a.y, d[Math.floor(Math.random() * h.length)]);
      }
      function p(t, e, n) {
        r.push(new w(t, e, n));
      }
      function y() {
        !(function () {
          if (0 != r.length) {
            n.clearRect(0, 0, c, l);
            for (let t = 0; t < r.length; t++) r[t].update(n);
            for (let t = r.length - 1; t >= 0; t--) r[t].lifeSpan < 0 && r.splice(t, 1);
            0 == r.length && n.clearRect(0, 0, c, l);
          }
        })(),
          (i = requestAnimationFrame(y));
      }
      function v() {
        e.remove(),
          cancelAnimationFrame(i),
          s.removeEventListener('mousemove', f),
          s.removeEventListener('touchmove', g),
          s.removeEventListener('touchstart', g),
          window.addEventListener('resize', m);
      }
      function w(t, e, n) {
        const i = Math.floor(60 * Math.random() + 80);
        (this.initialLifeSpan = i),
          (this.lifeSpan = i),
          (this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 + Math.random() }),
          (this.position = { x: t, y: e }),
          (this.canv = n),
          (this.update = function (t) {
            (this.position.x += this.velocity.x),
              (this.position.y += this.velocity.y),
              this.lifeSpan--,
              (this.velocity.x += (2 * (Math.random() < 0.5 ? -1 : 1)) / 75),
              (this.velocity.y -= Math.random() / 300);
            const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0),
              n = 0.0174533 * (2 * this.lifeSpan);
            t.translate(this.position.x, this.position.y),
              t.rotate(n),
              t.drawImage(this.canv, (-this.canv.width / 2) * e, -this.canv.height / 2, this.canv.width * e, this.canv.height * e),
              t.rotate(-n),
              t.translate(-this.position.x, -this.position.y);
          });
      }
      return (
        (u.onchange = () => {
          u.matches ? v() : A();
        }),
        A(),
        { destroy: v }
      );
    }),
    (t.springyEmojiCursor = function (t) {
      let e,
        n,
        i,
        o,
        s = (t && t.emoji) || '🤪',
        h = t && t.element,
        c = h || document.body,
        l = window.innerWidth,
        a = window.innerHeight,
        r = { x: l / 2, y: l / 2 },
        d = [];
      const u = window.matchMedia('(prefers-reduced-motion: reduce)');
      function A() {
        if (u.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          h
            ? ((e.style.position = 'absolute'), c.appendChild(e), (e.width = c.clientWidth), (e.height = c.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = l), (e.height = a)),
          (n.font = '16px serif'),
          (n.textBaseline = 'middle'),
          (n.textAlign = 'center');
        let t = n.measureText(s),
          i = document.createElement('canvas'),
          r = i.getContext('2d');
        (i.width = t.width),
          (i.height = 2 * t.actualBoundingBoxAscent),
          (r.textAlign = 'center'),
          (r.font = '16px serif'),
          (r.textBaseline = 'middle'),
          r.fillText(s, i.width / 2, t.actualBoundingBoxAscent),
          (o = i);
        let A = 0;
        for (A = 0; A < 7; A++) d[A] = new x(o);
        c.addEventListener('mousemove', f),
          c.addEventListener('touchmove', g, { passive: !0 }),
          c.addEventListener('touchstart', g, { passive: !0 }),
          window.addEventListener('resize', m),
          p();
      }
      function m(t) {
        (l = window.innerWidth), (a = window.innerHeight), h ? ((e.width = c.clientWidth), (e.height = c.clientHeight)) : ((e.width = l), (e.height = a));
      }
      function g(t) {
        if (t.touches.length > 0)
          if (h) {
            const e = c.getBoundingClientRect();
            (r.x = t.touches[0].clientX - e.left), (r.y = t.touches[0].clientY - e.top);
          } else (r.x = t.touches[0].clientX), (r.y = t.touches[0].clientY);
      }
      function f(t) {
        if (h) {
          const e = c.getBoundingClientRect();
          (r.x = t.clientX - e.left), (r.y = t.clientY - e.top);
        } else (r.x = t.clientX), (r.y = t.clientY);
      }
      function p() {
        !(function () {
          (e.width = e.width), (d[0].position.x = r.x), (d[0].position.y = r.y);
          for (let t = 1; t < 7; t++) {
            let i = new v(0, 0);
            t > 0 && w(t - 1, t, i), t < 6 && w(t + 1, t, i);
            let o,
              s,
              h = new v(10 * -d[t].velocity.x, 10 * -d[t].velocity.y),
              c = new v((i.X + h.X) / 1, (i.Y + h.Y) / 1 + 50);
            (d[t].velocity.x += 0.01 * c.X),
              (d[t].velocity.y += 0.01 * c.Y),
              Math.abs(d[t].velocity.x) < 0.1 && Math.abs(d[t].velocity.y) < 0.1 && Math.abs(c.X) < 0.1 && Math.abs(c.Y) < 0.1 && ((d[t].velocity.x = 0), (d[t].velocity.y = 0)),
              (d[t].position.x += d[t].velocity.x),
              (d[t].position.y += d[t].velocity.y),
              (o = e.clientHeight),
              (s = e.clientWidth),
              d[t].position.y >= o - 11 - 1 && (d[t].velocity.y > 0 && (d[t].velocity.y = 0.7 * -d[t].velocity.y), (d[t].position.y = o - 11 - 1)),
              d[t].position.x >= s - 11 && (d[t].velocity.x > 0 && (d[t].velocity.x = 0.7 * -d[t].velocity.x), (d[t].position.x = s - 11 - 1)),
              d[t].position.x < 0 && (d[t].velocity.x < 0 && (d[t].velocity.x = 0.7 * -d[t].velocity.x), (d[t].position.x = 0)),
              d[t].draw(n);
          }
        })(),
          (i = requestAnimationFrame(p));
      }
      function y() {
        e.remove(),
          cancelAnimationFrame(i),
          c.removeEventListener('mousemove', f),
          c.removeEventListener('touchmove', g),
          c.removeEventListener('touchstart', g),
          window.addEventListener('resize', m);
      }
      function v(t, e) {
        (this.X = t), (this.Y = e);
      }
      function w(t, e, n) {
        let i = d[t].position.x - d[e].position.x,
          o = d[t].position.y - d[e].position.y,
          s = Math.sqrt(i * i + o * o);
        if (s > 10) {
          let t = 10 * (s - 10);
          (n.X += (i / s) * t), (n.Y += (o / s) * t);
        }
      }
      function x(t) {
        (this.position = { x: r.x, y: r.y }),
          (this.velocity = { x: 0, y: 0 }),
          (this.canv = t),
          (this.draw = function (t) {
            t.drawImage(this.canv, this.position.x - this.canv.width / 2, this.position.y - this.canv.height / 2, this.canv.width, this.canv.height);
          });
      }
      return (
        (u.onchange = () => {
          u.matches ? y() : A();
        }),
        A(),
        { destroy: y }
      );
    }),
    (t.textFlag = function (t) {
      let e,
        n,
        i,
        o = t || {},
        s = t && t.element,
        h = s || document.body,
        c = o.text ? ' ' + t.text : ' Your Text Here',
        l = t?.color || '#000000',
        a = o.font || 'monospace',
        r = o.textSize || 12,
        d = r + 'px ' + a,
        u = o.gap || r + 2,
        A = 0,
        m = [],
        g = window.innerWidth,
        f = window.innerHeight,
        p = { x: g / 2, y: g / 2 };
      for (let t = 0; t < c.length; t++) m[t] = { letter: c.charAt(t), x: g / 2, y: g / 2 };
      t?.size;
      const y = window.matchMedia('(prefers-reduced-motion: reduce)');
      function v() {
        if (y.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          s
            ? ((e.style.position = 'absolute'), h.appendChild(e), (e.width = h.clientWidth), (e.height = h.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = g), (e.height = f)),
          h.addEventListener('mousemove', x),
          window.addEventListener('resize', w),
          E();
      }
      function w(t) {
        (g = window.innerWidth), (f = window.innerHeight), s ? ((e.width = h.clientWidth), (e.height = h.clientHeight)) : ((e.width = g), (e.height = f));
      }
      function x(t) {
        if (s) {
          const e = h.getBoundingClientRect();
          (p.x = t.clientX - e.left), (p.y = t.clientY - e.top);
        } else (p.x = t.clientX), (p.y = t.clientY);
      }
      function E() {
        !(function () {
          n.clearRect(0, 0, g, f), (A += 0.15);
          let t = 2 * Math.cos(A),
            e = 5 * Math.sin(A);
          for (let t = m.length - 1; t > 0; t--) (m[t].x = m[t - 1].x + u), (m[t].y = m[t - 1].y), (n.fillStyle = l), (n.font = d), n.fillText(m[t].letter, m[t].x, m[t].y);
          let i = m[0].x,
            o = m[0].y;
          (i += (p.x - i) / 5 + t + 2), (o += (p.y - o) / 5 + e), (m[0].x = i), (m[0].y = o);
        })(),
          (i = requestAnimationFrame(E));
      }
      function M() {
        e.remove(), cancelAnimationFrame(i), h.removeEventListener('mousemove', x), window.addEventListener('resize', w);
      }
      return (
        (y.onchange = () => {
          y.matches ? M() : v();
        }),
        v(),
        { destroy: M }
      );
    }),
    (t.trailingCursor = function (t) {
      let e,
        n,
        i,
        o = t && t.element,
        s = o || document.body,
        h = window.innerWidth,
        c = window.innerHeight,
        l = { x: h / 2, y: h / 2 },
        a = [];
      const r = t?.particles || 15,
        d = t?.rate || 0.4,
        u =
          t?.baseImageSrc ||
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==';
      let A = !1,
        m = new Image();
      m.src = u;
      const g = window.matchMedia('(prefers-reduced-motion: reduce)');
      function f() {
        if (g.matches) return console.log('This browser has prefers reduced motion turned on, so the cursor did not init'), !1;
        (e = document.createElement('canvas')),
          (n = e.getContext('2d')),
          (e.style.top = '0px'),
          (e.style.left = '0px'),
          (e.style.pointerEvents = 'none'),
          o
            ? ((e.style.position = 'absolute'), s.appendChild(e), (e.width = s.clientWidth), (e.height = s.clientHeight))
            : ((e.style.position = 'fixed'), document.body.appendChild(e), (e.width = h), (e.height = c)),
          s.addEventListener('mousemove', y),
          window.addEventListener('resize', p),
          v();
      }
      function p(t) {
        (h = window.innerWidth), (c = window.innerHeight), o ? ((e.width = s.clientWidth), (e.height = s.clientHeight)) : ((e.width = h), (e.height = c));
      }
      function y(t) {
        if (o) {
          const e = s.getBoundingClientRect();
          (l.x = t.clientX - e.left), (l.y = t.clientY - e.top);
        } else (l.x = t.clientX), (l.y = t.clientY);
        if (!1 === A) {
          A = !0;
          for (let t = 0; t < r; t++) (e = l.x), (n = l.y), (i = m), a.push(new x(e, n, i));
        }
        var e, n, i;
      }
      function v() {
        !(function () {
          n.clearRect(0, 0, h, c);
          let t = l.x,
            e = l.y;
          a.forEach(function (i, o, s) {
            let h = s[o + 1] || s[0];
            (i.position.x = t), (i.position.y = e), i.move(n), (t += (h.position.x - i.position.x) * d), (e += (h.position.y - i.position.y) * d);
          });
        })(),
          (i = requestAnimationFrame(v));
      }
      function w() {
        e.remove(), cancelAnimationFrame(i), s.removeEventListener('mousemove', y), window.addEventListener('resize', p);
      }
      function x(t, e, n) {
        (this.position = { x: t, y: e }),
          (this.image = n),
          (this.move = function (t) {
            t.drawImage(this.image, this.position.x, this.position.y);
          });
      }
      return (
        (g.onchange = () => {
          g.matches ? w() : f();
        }),
        f(),
        { destroy: w }
      );
    }),
    Object.defineProperty(t, '__esModule', { value: !0 }),
    t
  );
})({});
