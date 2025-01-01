import Xv from "react";
import Qv from "react-dom";
var Jc = {}, a0 = { exports: {} }, u0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function a(E, B) {
    var q = E.length;
    E.push(B);
    l: for (; 0 < q; ) {
      var k = q - 1 >>> 1, tl = E[k];
      if (0 < n(tl, B))
        E[k] = B, E[q] = tl, q = k;
      else break l;
    }
  }
  function u(E) {
    return E.length === 0 ? null : E[0];
  }
  function t(E) {
    if (E.length === 0) return null;
    var B = E[0], q = E.pop();
    if (q !== B) {
      E[0] = q;
      l: for (var k = 0, tl = E.length, kt = tl >>> 1; k < kt; ) {
        var Ft = 2 * (k + 1) - 1, gf = E[Ft], ja = Ft + 1, rt = E[ja];
        if (0 > n(gf, q))
          ja < tl && 0 > n(rt, gf) ? (E[k] = rt, E[ja] = q, k = ja) : (E[k] = gf, E[Ft] = q, k = Ft);
        else if (ja < tl && 0 > n(rt, q))
          E[k] = rt, E[ja] = q, k = ja;
        else break l;
      }
    }
    return B;
  }
  function n(E, B) {
    var q = E.sortIndex - B.sortIndex;
    return q !== 0 ? q : E.id - B.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var f = performance;
    l.unstable_now = function() {
      return f.now();
    };
  } else {
    var c = Date, e = c.now();
    l.unstable_now = function() {
      return c.now() - e;
    };
  }
  var i = [], v = [], s = 1, b = null, d = 3, S = !1, T = !1, U = !1, C = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  function m(E) {
    for (var B = u(v); B !== null; ) {
      if (B.callback === null) t(v);
      else if (B.startTime <= E)
        t(v), B.sortIndex = B.expirationTime, a(i, B);
      else break;
      B = u(v);
    }
  }
  function g(E) {
    if (U = !1, m(E), !T)
      if (u(i) !== null)
        T = !0, sf();
      else {
        var B = u(v);
        B !== null && bf(g, B.startTime - E);
      }
  }
  var A = !1, O = -1, M = 5, D = -1;
  function $() {
    return !(l.unstable_now() - D < M);
  }
  function _() {
    if (A) {
      var E = l.unstable_now();
      D = E;
      var B = !0;
      try {
        l: {
          T = !1, U && (U = !1, y(O), O = -1), S = !0;
          var q = d;
          try {
            a: {
              for (m(E), b = u(i); b !== null && !(b.expirationTime > E && $()); ) {
                var k = b.callback;
                if (typeof k == "function") {
                  b.callback = null, d = b.priorityLevel;
                  var tl = k(
                    b.expirationTime <= E
                  );
                  if (E = l.unstable_now(), typeof tl == "function") {
                    b.callback = tl, m(E), B = !0;
                    break a;
                  }
                  b === u(i) && t(i), m(E);
                } else t(i);
                b = u(i);
              }
              if (b !== null) B = !0;
              else {
                var kt = u(v);
                kt !== null && bf(
                  g,
                  kt.startTime - E
                ), B = !1;
              }
            }
            break l;
          } finally {
            b = null, d = q, S = !1;
          }
          B = void 0;
        }
      } finally {
        B ? sl() : A = !1;
      }
    }
  }
  var sl;
  if (typeof h == "function")
    sl = function() {
      h(_);
    };
  else if (typeof MessageChannel < "u") {
    var $t = new MessageChannel(), Rv = $t.port2;
    $t.port1.onmessage = _, sl = function() {
      Rv.postMessage(null);
    };
  } else
    sl = function() {
      C(_, 0);
    };
  function sf() {
    A || (A = !0, sl());
  }
  function bf(E, B) {
    O = C(function() {
      E(l.unstable_now());
    }, B);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, l.unstable_continueExecution = function() {
    T || S || (T = !0, sf());
  }, l.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : M = 0 < E ? Math.floor(1e3 / E) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, l.unstable_getFirstCallbackNode = function() {
    return u(i);
  }, l.unstable_next = function(E) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var B = 3;
        break;
      default:
        B = d;
    }
    var q = d;
    d = B;
    try {
      return E();
    } finally {
      d = q;
    }
  }, l.unstable_pauseExecution = function() {
  }, l.unstable_requestPaint = function() {
  }, l.unstable_runWithPriority = function(E, B) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var q = d;
    d = E;
    try {
      return B();
    } finally {
      d = q;
    }
  }, l.unstable_scheduleCallback = function(E, B, q) {
    var k = l.unstable_now();
    switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? k + q : k) : q = k, E) {
      case 1:
        var tl = -1;
        break;
      case 2:
        tl = 250;
        break;
      case 5:
        tl = 1073741823;
        break;
      case 4:
        tl = 1e4;
        break;
      default:
        tl = 5e3;
    }
    return tl = q + tl, E = {
      id: s++,
      callback: B,
      priorityLevel: E,
      startTime: q,
      expirationTime: tl,
      sortIndex: -1
    }, q > k ? (E.sortIndex = q, a(v, E), u(i) === null && E === u(v) && (U ? (y(O), O = -1) : U = !0, bf(g, q - k))) : (E.sortIndex = tl, a(i, E), T || S || (T = !0, sf())), E;
  }, l.unstable_shouldYield = $, l.unstable_wrapCallback = function(E) {
    var B = d;
    return function() {
      var q = d;
      d = B;
      try {
        return E.apply(this, arguments);
      } finally {
        d = q;
      }
    };
  };
})(u0);
a0.exports = u0;
var Gv = a0.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ul = Gv, t0 = Xv, Zv = Qv;
function z(l) {
  var a = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    a += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      a += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function n0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
var jv = Symbol.for("react.element"), Pt = Symbol.for("react.transitional.element"), at = Symbol.for("react.portal"), mu = Symbol.for("react.fragment"), f0 = Symbol.for("react.strict_mode"), Pf = Symbol.for("react.profiler"), Vv = Symbol.for("react.provider"), c0 = Symbol.for("react.consumer"), ta = Symbol.for("react.context"), wc = Symbol.for("react.forward_ref"), If = Symbol.for("react.suspense"), lc = Symbol.for("react.suspense_list"), Wc = Symbol.for("react.memo"), ba = Symbol.for("react.lazy"), e0 = Symbol.for("react.offscreen"), Cv = Symbol.for("react.memo_cache_sentinel"), je = Symbol.iterator;
function Wu(l) {
  return l === null || typeof l != "object" ? null : (l = je && l[je] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Kv = Symbol.for("react.client.reference");
function ac(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === Kv ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case mu:
      return "Fragment";
    case at:
      return "Portal";
    case Pf:
      return "Profiler";
    case f0:
      return "StrictMode";
    case If:
      return "Suspense";
    case lc:
      return "SuspenseList";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case ta:
        return (l.displayName || "Context") + ".Provider";
      case c0:
        return (l._context.displayName || "Context") + ".Consumer";
      case wc:
        var a = l.render;
        return l = l.displayName, l || (l = a.displayName || a.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case Wc:
        return a = l.displayName || null, a !== null ? a : ac(l.type) || "Memo";
      case ba:
        a = l._payload, l = l._init;
        try {
          return ac(l(a));
        } catch {
        }
    }
  return null;
}
var H = t0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, x = Object.assign, zf, Ve;
function ut(l) {
  if (zf === void 0)
    try {
      throw Error();
    } catch (u) {
      var a = u.stack.trim().match(/\n( *(at )?)/);
      zf = a && a[1] || "", Ve = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + zf + l + Ve;
}
var Af = !1;
function Tf(l, a) {
  if (!l || Af) return "";
  Af = !0;
  var u = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var t = {
      DetermineComponentFrameRoot: function() {
        try {
          if (a) {
            var b = function() {
              throw Error();
            };
            if (Object.defineProperty(b.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (S) {
                var d = S;
              }
              Reflect.construct(l, [], b);
            } else {
              try {
                b.call();
              } catch (S) {
                d = S;
              }
              l.call(b.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (S) {
              d = S;
            }
            (b = l()) && typeof b.catch == "function" && b.catch(function() {
            });
          }
        } catch (S) {
          if (S && d && typeof S.stack == "string")
            return [S.stack, d.stack];
        }
        return [null, null];
      }
    };
    t.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(
      t.DetermineComponentFrameRoot,
      "name"
    );
    n && n.configurable && Object.defineProperty(
      t.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var f = t.DetermineComponentFrameRoot(), c = f[0], e = f[1];
    if (c && e) {
      var i = c.split(`
`), v = e.split(`
`);
      for (n = t = 0; t < i.length && !i[t].includes("DetermineComponentFrameRoot"); )
        t++;
      for (; n < v.length && !v[n].includes(
        "DetermineComponentFrameRoot"
      ); )
        n++;
      if (t === i.length || n === v.length)
        for (t = i.length - 1, n = v.length - 1; 1 <= t && 0 <= n && i[t] !== v[n]; )
          n--;
      for (; 1 <= t && 0 <= n; t--, n--)
        if (i[t] !== v[n]) {
          if (t !== 1 || n !== 1)
            do
              if (t--, n--, 0 > n || i[t] !== v[n]) {
                var s = `
` + i[t].replace(" at new ", " at ");
                return l.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", l.displayName)), s;
              }
            while (1 <= t && 0 <= n);
          break;
        }
    }
  } finally {
    Af = !1, Error.prepareStackTrace = u;
  }
  return (u = l ? l.displayName || l.name : "") ? ut(u) : "";
}
function xv(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return ut(l.type);
    case 16:
      return ut("Lazy");
    case 13:
      return ut("Suspense");
    case 19:
      return ut("SuspenseList");
    case 0:
    case 15:
      return l = Tf(l.type, !1), l;
    case 11:
      return l = Tf(l.type.render, !1), l;
    case 1:
      return l = Tf(l.type, !0), l;
    default:
      return "";
  }
}
function Ce(l) {
  try {
    var a = "";
    do
      a += xv(l), l = l.return;
    while (l);
    return a;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
function Ku(l) {
  var a = l, u = l;
  if (l.alternate) for (; a.return; ) a = a.return;
  else {
    l = a;
    do
      a = l, a.flags & 4098 && (u = a.return), l = a.return;
    while (l);
  }
  return a.tag === 3 ? u : null;
}
function i0(l) {
  if (l.tag === 13) {
    var a = l.memoizedState;
    if (a === null && (l = l.alternate, l !== null && (a = l.memoizedState)), a !== null) return a.dehydrated;
  }
  return null;
}
function Ke(l) {
  if (Ku(l) !== l)
    throw Error(z(188));
}
function Lv(l) {
  var a = l.alternate;
  if (!a) {
    if (a = Ku(l), a === null) throw Error(z(188));
    return a !== l ? null : l;
  }
  for (var u = l, t = a; ; ) {
    var n = u.return;
    if (n === null) break;
    var f = n.alternate;
    if (f === null) {
      if (t = n.return, t !== null) {
        u = t;
        continue;
      }
      break;
    }
    if (n.child === f.child) {
      for (f = n.child; f; ) {
        if (f === u) return Ke(n), l;
        if (f === t) return Ke(n), a;
        f = f.sibling;
      }
      throw Error(z(188));
    }
    if (u.return !== t.return) u = n, t = f;
    else {
      for (var c = !1, e = n.child; e; ) {
        if (e === u) {
          c = !0, u = n, t = f;
          break;
        }
        if (e === t) {
          c = !0, t = n, u = f;
          break;
        }
        e = e.sibling;
      }
      if (!c) {
        for (e = f.child; e; ) {
          if (e === u) {
            c = !0, u = f, t = n;
            break;
          }
          if (e === t) {
            c = !0, t = f, u = n;
            break;
          }
          e = e.sibling;
        }
        if (!c) throw Error(z(189));
      }
    }
    if (u.alternate !== t) throw Error(z(190));
  }
  if (u.tag !== 3) throw Error(z(188));
  return u.stateNode.current === u ? l : a;
}
function v0(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l;
  for (l = l.child; l !== null; ) {
    if (a = v0(l), a !== null) return a;
    l = l.sibling;
  }
  return null;
}
var tt = Array.isArray, K = Zv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ja = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, uc = [], Su = -1;
function $l(l) {
  return { current: l };
}
function el(l) {
  0 > Su || (l.current = uc[Su], uc[Su] = null, Su--);
}
function L(l, a) {
  Su++, uc[Su] = l.current, l.current = a;
}
var pl = $l(null), Et = $l(null), Ua = $l(null), Hn = $l(null);
function on(l, a) {
  switch (L(Ua, a), L(Et, l), L(pl, null), l = a.nodeType, l) {
    case 9:
    case 11:
      a = (a = a.documentElement) && (a = a.namespaceURI) ? xi(a) : 0;
      break;
    default:
      if (l = l === 8 ? a.parentNode : a, a = l.tagName, l = l.namespaceURI)
        l = xi(l), a = Ev(l, a);
      else
        switch (a) {
          case "svg":
            a = 1;
            break;
          case "math":
            a = 2;
            break;
          default:
            a = 0;
        }
  }
  el(pl), L(pl, a);
}
function Yu() {
  el(pl), el(Et), el(Ua);
}
function tc(l) {
  l.memoizedState !== null && L(Hn, l);
  var a = pl.current, u = Ev(a, l.type);
  a !== u && (L(Et, l), L(pl, u));
}
function qn(l) {
  Et.current === l && (el(pl), el(Et)), Hn.current === l && (el(Hn), Yt._currentValue = Ja);
}
var nc = Object.prototype.hasOwnProperty, $c = ul.unstable_scheduleCallback, Ef = ul.unstable_cancelCallback, pv = ul.unstable_shouldYield, Jv = ul.unstable_requestPaint, Jl = ul.unstable_now, wv = ul.unstable_getCurrentPriorityLevel, h0 = ul.unstable_ImmediatePriority, y0 = ul.unstable_UserBlockingPriority, Bn = ul.unstable_NormalPriority, Wv = ul.unstable_LowPriority, d0 = ul.unstable_IdlePriority, $v = ul.log, kv = ul.unstable_setDisableYieldValue, Gt = null, Ml = null;
function Fv(l) {
  if (Ml && typeof Ml.onCommitFiberRoot == "function")
    try {
      Ml.onCommitFiberRoot(
        Gt,
        l,
        void 0,
        (l.current.flags & 128) === 128
      );
    } catch {
    }
}
function Ma(l) {
  if (typeof $v == "function" && kv(l), Ml && typeof Ml.setStrictMode == "function")
    try {
      Ml.setStrictMode(Gt, l);
    } catch {
    }
}
var Dl = Math.clz32 ? Math.clz32 : Iv, rv = Math.log, Pv = Math.LN2;
function Iv(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (rv(l) / Pv | 0) | 0;
}
var It = 128, ln = 4194304;
function Ca(l) {
  var a = l & 42;
  if (a !== 0) return a;
  switch (l & -l) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return l;
  }
}
function lf(l, a) {
  var u = l.pendingLanes;
  if (u === 0) return 0;
  var t = 0, n = l.suspendedLanes, f = l.pingedLanes, c = l.warmLanes;
  l = l.finishedLanes !== 0;
  var e = u & 134217727;
  return e !== 0 ? (u = e & ~n, u !== 0 ? t = Ca(u) : (f &= e, f !== 0 ? t = Ca(f) : l || (c = e & ~c, c !== 0 && (t = Ca(c))))) : (e = u & ~n, e !== 0 ? t = Ca(e) : f !== 0 ? t = Ca(f) : l || (c = u & ~c, c !== 0 && (t = Ca(c)))), t === 0 ? 0 : a !== 0 && a !== t && !(a & n) && (n = t & -t, c = a & -a, n >= c || n === 32 && (c & 4194176) !== 0) ? a : t;
}
function Zt(l, a) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & a) === 0;
}
function lh(l, a) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
      return a + 250;
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function m0() {
  var l = It;
  return It <<= 1, !(It & 4194176) && (It = 128), l;
}
function S0() {
  var l = ln;
  return ln <<= 1, !(ln & 62914560) && (ln = 4194304), l;
}
function Mf(l) {
  for (var a = [], u = 0; 31 > u; u++) a.push(l);
  return a;
}
function jt(l, a) {
  l.pendingLanes |= a, a !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function ah(l, a, u, t, n, f) {
  var c = l.pendingLanes;
  l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
  var e = l.entanglements, i = l.expirationTimes, v = l.hiddenUpdates;
  for (u = c & ~u; 0 < u; ) {
    var s = 31 - Dl(u), b = 1 << s;
    e[s] = 0, i[s] = -1;
    var d = v[s];
    if (d !== null)
      for (v[s] = null, s = 0; s < d.length; s++) {
        var S = d[s];
        S !== null && (S.lane &= -536870913);
      }
    u &= ~b;
  }
  t !== 0 && s0(l, t, 0), f !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= f & ~(c & ~a));
}
function s0(l, a, u) {
  l.pendingLanes |= a, l.suspendedLanes &= ~a;
  var t = 31 - Dl(a);
  l.entangledLanes |= a, l.entanglements[t] = l.entanglements[t] | 1073741824 | u & 4194218;
}
function b0(l, a) {
  var u = l.entangledLanes |= a;
  for (l = l.entanglements; u; ) {
    var t = 31 - Dl(u), n = 1 << t;
    n & a | l[t] & a && (l[t] |= a), u &= ~n;
  }
}
function g0(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function z0() {
  var l = K.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : _v(l.type));
}
function uh(l, a) {
  var u = K.p;
  try {
    return K.p = l, a();
  } finally {
    K.p = u;
  }
}
var Ga = Math.random().toString(36).slice(2), yl = "__reactFiber$" + Ga, gl = "__reactProps$" + Ga, xu = "__reactContainer$" + Ga, fc = "__reactEvents$" + Ga, th = "__reactListeners$" + Ga, nh = "__reactHandles$" + Ga, xe = "__reactResources$" + Ga, Mt = "__reactMarker$" + Ga;
function kc(l) {
  delete l[yl], delete l[gl], delete l[fc], delete l[th], delete l[nh];
}
function La(l) {
  var a = l[yl];
  if (a) return a;
  for (var u = l.parentNode; u; ) {
    if (a = u[xu] || u[yl]) {
      if (u = a.alternate, a.child !== null || u !== null && u.child !== null)
        for (l = pi(l); l !== null; ) {
          if (u = l[yl]) return u;
          l = pi(l);
        }
      return a;
    }
    l = u, u = l.parentNode;
  }
  return null;
}
function Lu(l) {
  if (l = l[yl] || l[xu]) {
    var a = l.tag;
    if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
      return l;
  }
  return null;
}
function nt(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l.stateNode;
  throw Error(z(33));
}
function Uu(l) {
  var a = l[xe];
  return a || (a = l[xe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
}
function fl(l) {
  l[Mt] = !0;
}
var A0 = /* @__PURE__ */ new Set(), T0 = {};
function uu(l, a) {
  Ru(l, a), Ru(l + "Capture", a);
}
function Ru(l, a) {
  for (T0[l] = a, l = 0; l < a.length; l++)
    A0.add(a[l]);
}
var va = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), fh = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Le = {}, pe = {};
function ch(l) {
  return nc.call(pe, l) ? !0 : nc.call(Le, l) ? !1 : fh.test(l) ? pe[l] = !0 : (Le[l] = !0, !1);
}
function Sn(l, a, u) {
  if (ch(a))
    if (u === null) l.removeAttribute(a);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(a);
          return;
        case "boolean":
          var t = a.toLowerCase().slice(0, 5);
          if (t !== "data-" && t !== "aria-") {
            l.removeAttribute(a);
            return;
          }
      }
      l.setAttribute(a, "" + u);
    }
}
function an(l, a, u) {
  if (u === null) l.removeAttribute(a);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(a);
        return;
    }
    l.setAttribute(a, "" + u);
  }
}
function Fl(l, a, u, t) {
  if (t === null) l.removeAttribute(u);
  else {
    switch (typeof t) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(u);
        return;
    }
    l.setAttributeNS(a, u, "" + t);
  }
}
function Bl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function E0(l) {
  var a = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
}
function eh(l) {
  var a = E0(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    a
  ), t = "" + l[a];
  if (!l.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
    var n = u.get, f = u.set;
    return Object.defineProperty(l, a, {
      configurable: !0,
      get: function() {
        return n.call(this);
      },
      set: function(c) {
        t = "" + c, f.call(this, c);
      }
    }), Object.defineProperty(l, a, {
      enumerable: u.enumerable
    }), {
      getValue: function() {
        return t;
      },
      setValue: function(c) {
        t = "" + c;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[a];
      }
    };
  }
}
function Nn(l) {
  l._valueTracker || (l._valueTracker = eh(l));
}
function M0(l) {
  if (!l) return !1;
  var a = l._valueTracker;
  if (!a) return !0;
  var u = a.getValue(), t = "";
  return l && (t = E0(l) ? l.checked ? "true" : "false" : l.value), l = t, l !== u ? (a.setValue(l), !0) : !1;
}
function _n(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var ih = /[\n"\\]/g;
function Yl(l) {
  return l.replace(
    ih,
    function(a) {
      return "\\" + a.charCodeAt(0).toString(16) + " ";
    }
  );
}
function cc(l, a, u, t, n, f, c, e) {
  l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), a != null ? c === "number" ? (a === 0 && l.value === "" || l.value != a) && (l.value = "" + Bl(a)) : l.value !== "" + Bl(a) && (l.value = "" + Bl(a)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), a != null ? ec(l, c, Bl(a)) : u != null ? ec(l, c, Bl(u)) : t != null && l.removeAttribute("value"), n == null && f != null && (l.defaultChecked = !!f), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), e != null && typeof e != "function" && typeof e != "symbol" && typeof e != "boolean" ? l.name = "" + Bl(e) : l.removeAttribute("name");
}
function D0(l, a, u, t, n, f, c, e) {
  if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.type = f), a != null || u != null) {
    if (!(f !== "submit" && f !== "reset" || a != null))
      return;
    u = u != null ? "" + Bl(u) : "", a = a != null ? "" + Bl(a) : u, e || a === l.value || (l.value = a), l.defaultValue = a;
  }
  t = t ?? n, t = typeof t != "function" && typeof t != "symbol" && !!t, l.checked = e ? l.checked : !!t, l.defaultChecked = !!t, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c);
}
function ec(l, a, u) {
  a === "number" && _n(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
}
function Ou(l, a, u, t) {
  if (l = l.options, a) {
    a = {};
    for (var n = 0; n < u.length; n++)
      a["$" + u[n]] = !0;
    for (u = 0; u < l.length; u++)
      n = a.hasOwnProperty("$" + l[u].value), l[u].selected !== n && (l[u].selected = n), n && t && (l[u].defaultSelected = !0);
  } else {
    for (u = "" + Bl(u), a = null, n = 0; n < l.length; n++) {
      if (l[n].value === u) {
        l[n].selected = !0, t && (l[n].defaultSelected = !0);
        return;
      }
      a !== null || l[n].disabled || (a = l[n]);
    }
    a !== null && (a.selected = !0);
  }
}
function U0(l, a, u) {
  if (a != null && (a = "" + Bl(a), a !== l.value && (l.value = a), u == null)) {
    l.defaultValue !== a && (l.defaultValue = a);
    return;
  }
  l.defaultValue = u != null ? "" + Bl(u) : "";
}
function O0(l, a, u, t) {
  if (a == null) {
    if (t != null) {
      if (u != null) throw Error(z(92));
      if (tt(t)) {
        if (1 < t.length) throw Error(z(93));
        t = t[0];
      }
      u = t;
    }
    u == null && (u = ""), a = u;
  }
  u = Bl(a), l.defaultValue = u, t = l.textContent, t === u && t !== "" && t !== null && (l.value = t);
}
function Xu(l, a) {
  if (a) {
    var u = l.firstChild;
    if (u && u === l.lastChild && u.nodeType === 3) {
      u.nodeValue = a;
      return;
    }
  }
  l.textContent = a;
}
var vh = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Je(l, a, u) {
  var t = a.indexOf("--") === 0;
  u == null || typeof u == "boolean" || u === "" ? t ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "" : t ? l.setProperty(a, u) : typeof u != "number" || u === 0 || vh.has(a) ? a === "float" ? l.cssFloat = u : l[a] = ("" + u).trim() : l[a] = u + "px";
}
function H0(l, a, u) {
  if (a != null && typeof a != "object")
    throw Error(z(62));
  if (l = l.style, u != null) {
    for (var t in u)
      !u.hasOwnProperty(t) || a != null && a.hasOwnProperty(t) || (t.indexOf("--") === 0 ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "");
    for (var n in a)
      t = a[n], a.hasOwnProperty(n) && u[n] !== t && Je(l, n, t);
  } else
    for (var f in a)
      a.hasOwnProperty(f) && Je(l, f, a[f]);
}
function Fc(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var hh = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), yh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sn(l) {
  return yh.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var ic = null;
function rc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var su = null, Hu = null;
function we(l) {
  var a = Lu(l);
  if (a && (l = a.stateNode)) {
    var u = l[gl] || null;
    l: switch (l = a.stateNode, a.type) {
      case "input":
        if (cc(
          l,
          u.value,
          u.defaultValue,
          u.defaultValue,
          u.checked,
          u.defaultChecked,
          u.type,
          u.name
        ), a = u.name, u.type === "radio" && a != null) {
          for (u = l; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll(
            'input[name="' + Yl(
              "" + a
            ) + '"][type="radio"]'
          ), a = 0; a < u.length; a++) {
            var t = u[a];
            if (t !== l && t.form === l.form) {
              var n = t[gl] || null;
              if (!n) throw Error(z(90));
              cc(
                t,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name
              );
            }
          }
          for (a = 0; a < u.length; a++)
            t = u[a], t.form === l.form && M0(t);
        }
        break l;
      case "textarea":
        U0(l, u.value, u.defaultValue);
        break l;
      case "select":
        a = u.value, a != null && Ou(l, !!u.multiple, a, !1);
    }
  }
}
var Df = !1;
function o0(l, a, u) {
  if (Df) return l(a, u);
  Df = !0;
  try {
    var t = l(a);
    return t;
  } finally {
    if (Df = !1, (su !== null || Hu !== null) && (yf(), su && (a = su, l = Hu, Hu = su = null, we(a), l)))
      for (a = 0; a < l.length; a++) we(l[a]);
  }
}
function Dt(l, a) {
  var u = l.stateNode;
  if (u === null) return null;
  var t = u[gl] || null;
  if (t === null) return null;
  u = t[a];
  l: switch (a) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (t = !t.disabled) || (l = l.type, t = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !t;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (u && typeof u != "function")
    throw Error(
      z(231, a, typeof u)
    );
  return u;
}
var vc = !1;
if (va)
  try {
    var $u = {};
    Object.defineProperty($u, "passive", {
      get: function() {
        vc = !0;
      }
    }), window.addEventListener("test", $u, $u), window.removeEventListener("test", $u, $u);
  } catch {
    vc = !1;
  }
var Da = null, Pc = null, bn = null;
function q0() {
  if (bn) return bn;
  var l, a = Pc, u = a.length, t, n = "value" in Da ? Da.value : Da.textContent, f = n.length;
  for (l = 0; l < u && a[l] === n[l]; l++) ;
  var c = u - l;
  for (t = 1; t <= c && a[u - t] === n[f - t]; t++) ;
  return bn = n.slice(l, 1 < t ? 1 - t : void 0);
}
function gn(l) {
  var a = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && a === 13 && (l = 13)) : l = a, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function un() {
  return !0;
}
function We() {
  return !1;
}
function zl(l) {
  function a(u, t, n, f, c) {
    this._reactName = u, this._targetInst = n, this.type = t, this.nativeEvent = f, this.target = c, this.currentTarget = null;
    for (var e in l)
      l.hasOwnProperty(e) && (u = l[e], this[e] = u ? u(f) : f[e]);
    return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? un : We, this.isPropagationStopped = We, this;
  }
  return x(a.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = un);
    },
    stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = un);
    },
    persist: function() {
    },
    isPersistent: un
  }), a;
}
var tu = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, af = zl(tu), Vt = x({}, tu, { view: 0, detail: 0 }), dh = zl(Vt), Uf, Of, ku, uf = x({}, Vt, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: Ic,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== ku && (ku && l.type === "mousemove" ? (Uf = l.screenX - ku.screenX, Of = l.screenY - ku.screenY) : Of = Uf = 0, ku = l), Uf);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Of;
  }
}), $e = zl(uf), mh = x({}, uf, { dataTransfer: 0 }), Sh = zl(mh), sh = x({}, Vt, { relatedTarget: 0 }), Hf = zl(sh), bh = x({}, tu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), gh = zl(bh), zh = x({}, tu, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Ah = zl(zh), Th = x({}, tu, { data: 0 }), ke = zl(Th), Eh = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Mh = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Dh = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Uh(l) {
  var a = this.nativeEvent;
  return a.getModifierState ? a.getModifierState(l) : (l = Dh[l]) ? !!a[l] : !1;
}
function Ic() {
  return Uh;
}
var Oh = x({}, Vt, {
  key: function(l) {
    if (l.key) {
      var a = Eh[l.key] || l.key;
      if (a !== "Unidentified") return a;
    }
    return l.type === "keypress" ? (l = gn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Mh[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: Ic,
  charCode: function(l) {
    return l.type === "keypress" ? gn(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? gn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), Hh = zl(Oh), oh = x({}, uf, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), Fe = zl(oh), qh = x({}, Vt, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Ic
}), Bh = zl(qh), Nh = x({}, tu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), _h = zl(Nh), Yh = x({}, uf, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Rh = zl(Yh), Xh = x({}, tu, {
  newState: 0,
  oldState: 0
}), Qh = zl(Xh), Gh = [9, 13, 27, 32], le = va && "CompositionEvent" in window, ct = null;
va && "documentMode" in document && (ct = document.documentMode);
var Zh = va && "TextEvent" in window && !ct, B0 = va && (!le || ct && 8 < ct && 11 >= ct), re = " ", Pe = !1;
function N0(l, a) {
  switch (l) {
    case "keyup":
      return Gh.indexOf(a.keyCode) !== -1;
    case "keydown":
      return a.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function _0(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var bu = !1;
function jh(l, a) {
  switch (l) {
    case "compositionend":
      return _0(a);
    case "keypress":
      return a.which !== 32 ? null : (Pe = !0, re);
    case "textInput":
      return l = a.data, l === re && Pe ? null : l;
    default:
      return null;
  }
}
function Vh(l, a) {
  if (bu)
    return l === "compositionend" || !le && N0(l, a) ? (l = q0(), bn = Pc = Da = null, bu = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
        if (a.char && 1 < a.char.length)
          return a.char;
        if (a.which) return String.fromCharCode(a.which);
      }
      return null;
    case "compositionend":
      return B0 && a.locale !== "ko" ? null : a.data;
    default:
      return null;
  }
}
var Ch = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function Ie(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a === "input" ? !!Ch[l.type] : a === "textarea";
}
function Y0(l, a, u, t) {
  su ? Hu ? Hu.push(t) : Hu = [t] : su = t, a = Wn(a, "onChange"), 0 < a.length && (u = new af(
    "onChange",
    "change",
    null,
    u,
    t
  ), l.push({ event: u, listeners: a }));
}
var et = null, Ut = null;
function Kh(l) {
  zv(l, 0);
}
function tf(l) {
  var a = nt(l);
  if (M0(a)) return l;
}
function li(l, a) {
  if (l === "change") return a;
}
var R0 = !1;
if (va) {
  var of;
  if (va) {
    var qf = "oninput" in document;
    if (!qf) {
      var ai = document.createElement("div");
      ai.setAttribute("oninput", "return;"), qf = typeof ai.oninput == "function";
    }
    of = qf;
  } else of = !1;
  R0 = of && (!document.documentMode || 9 < document.documentMode);
}
function ui() {
  et && (et.detachEvent("onpropertychange", X0), Ut = et = null);
}
function X0(l) {
  if (l.propertyName === "value" && tf(Ut)) {
    var a = [];
    Y0(
      a,
      Ut,
      l,
      rc(l)
    ), o0(Kh, a);
  }
}
function xh(l, a, u) {
  l === "focusin" ? (ui(), et = a, Ut = u, et.attachEvent("onpropertychange", X0)) : l === "focusout" && ui();
}
function Lh(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return tf(Ut);
}
function ph(l, a) {
  if (l === "click") return tf(a);
}
function Jh(l, a) {
  if (l === "input" || l === "change")
    return tf(a);
}
function wh(l, a) {
  return l === a && (l !== 0 || 1 / l === 1 / a) || l !== l && a !== a;
}
var Ol = typeof Object.is == "function" ? Object.is : wh;
function Ot(l, a) {
  if (Ol(l, a)) return !0;
  if (typeof l != "object" || l === null || typeof a != "object" || a === null)
    return !1;
  var u = Object.keys(l), t = Object.keys(a);
  if (u.length !== t.length) return !1;
  for (t = 0; t < u.length; t++) {
    var n = u[t];
    if (!nc.call(a, n) || !Ol(l[n], a[n]))
      return !1;
  }
  return !0;
}
function ti(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function ni(l, a) {
  var u = ti(l);
  l = 0;
  for (var t; u; ) {
    if (u.nodeType === 3) {
      if (t = l + u.textContent.length, l <= a && t >= a)
        return { node: u, offset: a - l };
      l = t;
    }
    l: {
      for (; u; ) {
        if (u.nextSibling) {
          u = u.nextSibling;
          break l;
        }
        u = u.parentNode;
      }
      u = void 0;
    }
    u = ti(u);
  }
}
function Q0(l, a) {
  return l && a ? l === a ? !0 : l && l.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Q0(l, a.parentNode) : "contains" in l ? l.contains(a) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(a) & 16) : !1 : !1;
}
function G0(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var a = _n(l.document); a instanceof l.HTMLIFrameElement; ) {
    try {
      var u = typeof a.contentWindow.location.href == "string";
    } catch {
      u = !1;
    }
    if (u) l = a.contentWindow;
    else break;
    a = _n(l.document);
  }
  return a;
}
function ae(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a && (a === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || a === "textarea" || l.contentEditable === "true");
}
function Wh(l, a) {
  var u = G0(a);
  a = l.focusedElem;
  var t = l.selectionRange;
  if (u !== a && a && a.ownerDocument && Q0(a.ownerDocument.documentElement, a)) {
    if (t !== null && ae(a)) {
      if (l = t.start, u = t.end, u === void 0 && (u = l), "selectionStart" in a)
        a.selectionStart = l, a.selectionEnd = Math.min(
          u,
          a.value.length
        );
      else if (u = (l = a.ownerDocument || document) && l.defaultView || window, u.getSelection) {
        u = u.getSelection();
        var n = a.textContent.length, f = Math.min(t.start, n);
        t = t.end === void 0 ? f : Math.min(t.end, n), !u.extend && f > t && (n = t, t = f, f = n), n = ni(a, f);
        var c = ni(
          a,
          t
        );
        n && c && (u.rangeCount !== 1 || u.anchorNode !== n.node || u.anchorOffset !== n.offset || u.focusNode !== c.node || u.focusOffset !== c.offset) && (l = l.createRange(), l.setStart(n.node, n.offset), u.removeAllRanges(), f > t ? (u.addRange(l), u.extend(c.node, c.offset)) : (l.setEnd(
          c.node,
          c.offset
        ), u.addRange(l)));
      }
    }
    for (l = [], u = a; u = u.parentNode; )
      u.nodeType === 1 && l.push({
        element: u,
        left: u.scrollLeft,
        top: u.scrollTop
      });
    for (typeof a.focus == "function" && a.focus(), a = 0; a < l.length; a++)
      u = l[a], u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
  }
}
var $h = va && "documentMode" in document && 11 >= document.documentMode, gu = null, hc = null, it = null, yc = !1;
function fi(l, a, u) {
  var t = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
  yc || gu == null || gu !== _n(t) || (t = gu, "selectionStart" in t && ae(t) ? t = { start: t.selectionStart, end: t.selectionEnd } : (t = (t.ownerDocument && t.ownerDocument.defaultView || window).getSelection(), t = {
    anchorNode: t.anchorNode,
    anchorOffset: t.anchorOffset,
    focusNode: t.focusNode,
    focusOffset: t.focusOffset
  }), it && Ot(it, t) || (it = t, t = Wn(hc, "onSelect"), 0 < t.length && (a = new af(
    "onSelect",
    "select",
    null,
    a,
    u
  ), l.push({ event: a, listeners: t }), a.target = gu)));
}
function Va(l, a) {
  var u = {};
  return u[l.toLowerCase()] = a.toLowerCase(), u["Webkit" + l] = "webkit" + a, u["Moz" + l] = "moz" + a, u;
}
var zu = {
  animationend: Va("Animation", "AnimationEnd"),
  animationiteration: Va("Animation", "AnimationIteration"),
  animationstart: Va("Animation", "AnimationStart"),
  transitionrun: Va("Transition", "TransitionRun"),
  transitionstart: Va("Transition", "TransitionStart"),
  transitioncancel: Va("Transition", "TransitionCancel"),
  transitionend: Va("Transition", "TransitionEnd")
}, Bf = {}, Z0 = {};
va && (Z0 = document.createElement("div").style, "AnimationEvent" in window || (delete zu.animationend.animation, delete zu.animationiteration.animation, delete zu.animationstart.animation), "TransitionEvent" in window || delete zu.transitionend.transition);
function nu(l) {
  if (Bf[l]) return Bf[l];
  if (!zu[l]) return l;
  var a = zu[l], u;
  for (u in a)
    if (a.hasOwnProperty(u) && u in Z0)
      return Bf[l] = a[u];
  return l;
}
var j0 = nu("animationend"), V0 = nu("animationiteration"), C0 = nu("animationstart"), kh = nu("transitionrun"), Fh = nu("transitionstart"), rh = nu("transitioncancel"), K0 = nu("transitionend"), x0 = /* @__PURE__ */ new Map(), ci = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
  " "
);
function Kl(l, a) {
  x0.set(l, a), uu(a, [l]);
}
var ql = [], Au = 0, ue = 0;
function nf() {
  for (var l = Au, a = ue = Au = 0; a < l; ) {
    var u = ql[a];
    ql[a++] = null;
    var t = ql[a];
    ql[a++] = null;
    var n = ql[a];
    ql[a++] = null;
    var f = ql[a];
    if (ql[a++] = null, t !== null && n !== null) {
      var c = t.pending;
      c === null ? n.next = n : (n.next = c.next, c.next = n), t.pending = n;
    }
    f !== 0 && L0(u, n, f);
  }
}
function ff(l, a, u, t) {
  ql[Au++] = l, ql[Au++] = a, ql[Au++] = u, ql[Au++] = t, ue |= t, l.lanes |= t, l = l.alternate, l !== null && (l.lanes |= t);
}
function te(l, a, u, t) {
  return ff(l, a, u, t), Yn(l);
}
function Ya(l, a) {
  return ff(l, null, null, a), Yn(l);
}
function L0(l, a, u) {
  l.lanes |= u;
  var t = l.alternate;
  t !== null && (t.lanes |= u);
  for (var n = !1, f = l.return; f !== null; )
    f.childLanes |= u, t = f.alternate, t !== null && (t.childLanes |= u), f.tag === 22 && (l = f.stateNode, l === null || l._visibility & 1 || (n = !0)), l = f, f = f.return;
  n && a !== null && l.tag === 3 && (f = l.stateNode, n = 31 - Dl(u), f = f.hiddenUpdates, l = f[n], l === null ? f[n] = [a] : l.push(a), a.lane = u | 536870912);
}
function Yn(l) {
  if (50 < Tt)
    throw Tt = 0, Rc = null, Error(z(185));
  for (var a = l.return; a !== null; )
    l = a, a = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Tu = {}, ei = /* @__PURE__ */ new WeakMap();
function Rl(l, a) {
  if (typeof l == "object" && l !== null) {
    var u = ei.get(l);
    return u !== void 0 ? u : (a = {
      value: l,
      source: a,
      stack: Ce(a)
    }, ei.set(l, a), a);
  }
  return {
    value: l,
    source: a,
    stack: Ce(a)
  };
}
var Eu = [], Mu = 0, Rn = null, Xn = 0, Nl = [], _l = 0, wa = null, na = 1, fa = "";
function Ka(l, a) {
  Eu[Mu++] = Xn, Eu[Mu++] = Rn, Rn = l, Xn = a;
}
function p0(l, a, u) {
  Nl[_l++] = na, Nl[_l++] = fa, Nl[_l++] = wa, wa = l;
  var t = na;
  l = fa;
  var n = 32 - Dl(t) - 1;
  t &= ~(1 << n), u += 1;
  var f = 32 - Dl(a) + n;
  if (30 < f) {
    var c = n - n % 5;
    f = (t & (1 << c) - 1).toString(32), t >>= c, n -= c, na = 1 << 32 - Dl(a) + n | u << n | t, fa = f + l;
  } else
    na = 1 << f | u << n | t, fa = l;
}
function ne(l) {
  l.return !== null && (Ka(l, 1), p0(l, 1, 0));
}
function fe(l) {
  for (; l === Rn; )
    Rn = Eu[--Mu], Eu[Mu] = null, Xn = Eu[--Mu], Eu[Mu] = null;
  for (; l === wa; )
    wa = Nl[--_l], Nl[_l] = null, fa = Nl[--_l], Nl[_l] = null, na = Nl[--_l], Nl[_l] = null;
}
var ml = null, vl = null, X = !1, Vl = null, xl = !1, dc = Error(z(519));
function ra(l) {
  var a = Error(z(418, ""));
  throw Ht(Rl(a, l)), dc;
}
function ii(l) {
  var a = l.stateNode, u = l.type, t = l.memoizedProps;
  switch (a[yl] = l, a[gl] = t, u) {
    case "dialog":
      Y("cancel", a), Y("close", a);
      break;
    case "iframe":
    case "object":
    case "embed":
      Y("load", a);
      break;
    case "video":
    case "audio":
      for (u = 0; u < Bt.length; u++)
        Y(Bt[u], a);
      break;
    case "source":
      Y("error", a);
      break;
    case "img":
    case "image":
    case "link":
      Y("error", a), Y("load", a);
      break;
    case "details":
      Y("toggle", a);
      break;
    case "input":
      Y("invalid", a), D0(
        a,
        t.value,
        t.defaultValue,
        t.checked,
        t.defaultChecked,
        t.type,
        t.name,
        !0
      ), Nn(a);
      break;
    case "select":
      Y("invalid", a);
      break;
    case "textarea":
      Y("invalid", a), O0(a, t.value, t.defaultValue, t.children), Nn(a);
  }
  u = t.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || a.textContent === "" + u || t.suppressHydrationWarning === !0 || Tv(a.textContent, u) ? (t.popover != null && (Y("beforetoggle", a), Y("toggle", a)), t.onScroll != null && Y("scroll", a), t.onScrollEnd != null && Y("scrollend", a), t.onClick != null && (a.onclick = mf), a = !0) : a = !1, a || ra(l);
}
function vi(l) {
  for (ml = l.return; ml; )
    switch (ml.tag) {
      case 3:
      case 27:
        xl = !0;
        return;
      case 5:
      case 13:
        xl = !1;
        return;
      default:
        ml = ml.return;
    }
}
function Fu(l) {
  if (l !== ml) return !1;
  if (!X) return vi(l), X = !0, !1;
  var a = !1, u;
  if ((u = l.tag !== 3 && l.tag !== 27) && ((u = l.tag === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Cc(l.type, l.memoizedProps)), u = !u), u && (a = !0), a && vl && ra(l), vi(l), l.tag === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(z(317));
    l: {
      for (l = l.nextSibling, a = 0; l; ) {
        if (l.nodeType === 8)
          if (u = l.data, u === "/$") {
            if (a === 0) {
              vl = Cl(l.nextSibling);
              break l;
            }
            a--;
          } else
            u !== "$" && u !== "$!" && u !== "$?" || a++;
        l = l.nextSibling;
      }
      vl = null;
    }
  } else
    vl = ml ? Cl(l.stateNode.nextSibling) : null;
  return !0;
}
function Ct() {
  vl = ml = null, X = !1;
}
function Ht(l) {
  Vl === null ? Vl = [l] : Vl.push(l);
}
var vt = Error(z(460)), J0 = Error(z(474)), mc = { then: function() {
} };
function hi(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function tn() {
}
function w0(l, a, u) {
  switch (u = l[u], u === void 0 ? l.push(a) : u !== a && (a.then(tn, tn), a = u), a.status) {
    case "fulfilled":
      return a.value;
    case "rejected":
      throw l = a.reason, l === vt ? Error(z(483)) : l;
    default:
      if (typeof a.status == "string") a.then(tn, tn);
      else {
        if (l = V, l !== null && 100 < l.shellSuspendCounter)
          throw Error(z(482));
        l = a, l.status = "pending", l.then(
          function(t) {
            if (a.status === "pending") {
              var n = a;
              n.status = "fulfilled", n.value = t;
            }
          },
          function(t) {
            if (a.status === "pending") {
              var n = a;
              n.status = "rejected", n.reason = t;
            }
          }
        );
      }
      switch (a.status) {
        case "fulfilled":
          return a.value;
        case "rejected":
          throw l = a.reason, l === vt ? Error(z(483)) : l;
      }
      throw ht = a, vt;
  }
}
var ht = null;
function yi() {
  if (ht === null) throw Error(z(459));
  var l = ht;
  return ht = null, l;
}
var ou = null, ot = 0;
function nn(l) {
  var a = ot;
  return ot += 1, ou === null && (ou = []), w0(ou, l, a);
}
function ru(l, a) {
  a = a.props.ref, l.ref = a !== void 0 ? a : null;
}
function fn(l, a) {
  throw a.$$typeof === jv ? Error(z(525)) : (l = Object.prototype.toString.call(a), Error(
    z(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : l
    )
  ));
}
function di(l) {
  var a = l._init;
  return a(l._payload);
}
function W0(l) {
  function a(y, h) {
    if (l) {
      var m = y.deletions;
      m === null ? (y.deletions = [h], y.flags |= 16) : m.push(h);
    }
  }
  function u(y, h) {
    if (!l) return null;
    for (; h !== null; )
      a(y, h), h = h.sibling;
    return null;
  }
  function t(y) {
    for (var h = /* @__PURE__ */ new Map(); y !== null; )
      y.key !== null ? h.set(y.key, y) : h.set(y.index, y), y = y.sibling;
    return h;
  }
  function n(y, h) {
    return y = oa(y, h), y.index = 0, y.sibling = null, y;
  }
  function f(y, h, m) {
    return y.index = m, l ? (m = y.alternate, m !== null ? (m = m.index, m < h ? (y.flags |= 33554434, h) : m) : (y.flags |= 33554434, h)) : (y.flags |= 1048576, h);
  }
  function c(y) {
    return l && y.alternate === null && (y.flags |= 33554434), y;
  }
  function e(y, h, m, g) {
    return h === null || h.tag !== 6 ? (h = Kf(m, y.mode, g), h.return = y, h) : (h = n(h, m), h.return = y, h);
  }
  function i(y, h, m, g) {
    var A = m.type;
    return A === mu ? s(
      y,
      h,
      m.props.children,
      g,
      m.key
    ) : h !== null && (h.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ba && di(A) === h.type) ? (h = n(h, m.props), ru(h, m), h.return = y, h) : (h = Mn(
      m.type,
      m.key,
      m.props,
      null,
      y.mode,
      g
    ), ru(h, m), h.return = y, h);
  }
  function v(y, h, m, g) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== m.containerInfo || h.stateNode.implementation !== m.implementation ? (h = xf(m, y.mode, g), h.return = y, h) : (h = n(h, m.children || []), h.return = y, h);
  }
  function s(y, h, m, g, A) {
    return h === null || h.tag !== 7 ? (h = $a(
      m,
      y.mode,
      g,
      A
    ), h.return = y, h) : (h = n(h, m), h.return = y, h);
  }
  function b(y, h, m) {
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return h = Kf(
        "" + h,
        y.mode,
        m
      ), h.return = y, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Pt:
          return m = Mn(
            h.type,
            h.key,
            h.props,
            null,
            y.mode,
            m
          ), ru(m, h), m.return = y, m;
        case at:
          return h = xf(
            h,
            y.mode,
            m
          ), h.return = y, h;
        case ba:
          var g = h._init;
          return h = g(h._payload), b(y, h, m);
      }
      if (tt(h) || Wu(h))
        return h = $a(
          h,
          y.mode,
          m,
          null
        ), h.return = y, h;
      if (typeof h.then == "function")
        return b(y, nn(h), m);
      if (h.$$typeof === ta)
        return b(
          y,
          cn(y, h),
          m
        );
      fn(y, h);
    }
    return null;
  }
  function d(y, h, m, g) {
    var A = h !== null ? h.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
      return A !== null ? null : e(y, h, "" + m, g);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Pt:
          return m.key === A ? i(y, h, m, g) : null;
        case at:
          return m.key === A ? v(y, h, m, g) : null;
        case ba:
          return A = m._init, m = A(m._payload), d(y, h, m, g);
      }
      if (tt(m) || Wu(m))
        return A !== null ? null : s(y, h, m, g, null);
      if (typeof m.then == "function")
        return d(
          y,
          h,
          nn(m),
          g
        );
      if (m.$$typeof === ta)
        return d(
          y,
          h,
          cn(y, m),
          g
        );
      fn(y, m);
    }
    return null;
  }
  function S(y, h, m, g, A) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return y = y.get(m) || null, e(h, y, "" + g, A);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Pt:
          return y = y.get(
            g.key === null ? m : g.key
          ) || null, i(h, y, g, A);
        case at:
          return y = y.get(
            g.key === null ? m : g.key
          ) || null, v(h, y, g, A);
        case ba:
          var O = g._init;
          return g = O(g._payload), S(
            y,
            h,
            m,
            g,
            A
          );
      }
      if (tt(g) || Wu(g))
        return y = y.get(m) || null, s(h, y, g, A, null);
      if (typeof g.then == "function")
        return S(
          y,
          h,
          m,
          nn(g),
          A
        );
      if (g.$$typeof === ta)
        return S(
          y,
          h,
          m,
          cn(h, g),
          A
        );
      fn(h, g);
    }
    return null;
  }
  function T(y, h, m, g) {
    for (var A = null, O = null, M = h, D = h = 0, $ = null; M !== null && D < m.length; D++) {
      M.index > D ? ($ = M, M = null) : $ = M.sibling;
      var _ = d(
        y,
        M,
        m[D],
        g
      );
      if (_ === null) {
        M === null && (M = $);
        break;
      }
      l && M && _.alternate === null && a(y, M), h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _, M = $;
    }
    if (D === m.length)
      return u(y, M), X && Ka(y, D), A;
    if (M === null) {
      for (; D < m.length; D++)
        M = b(y, m[D], g), M !== null && (h = f(
          M,
          h,
          D
        ), O === null ? A = M : O.sibling = M, O = M);
      return X && Ka(y, D), A;
    }
    for (M = t(M); D < m.length; D++)
      $ = S(
        M,
        y,
        D,
        m[D],
        g
      ), $ !== null && (l && $.alternate !== null && M.delete(
        $.key === null ? D : $.key
      ), h = f(
        $,
        h,
        D
      ), O === null ? A = $ : O.sibling = $, O = $);
    return l && M.forEach(function(sl) {
      return a(y, sl);
    }), X && Ka(y, D), A;
  }
  function U(y, h, m, g) {
    if (m == null) throw Error(z(151));
    for (var A = null, O = null, M = h, D = h = 0, $ = null, _ = m.next(); M !== null && !_.done; D++, _ = m.next()) {
      M.index > D ? ($ = M, M = null) : $ = M.sibling;
      var sl = d(y, M, _.value, g);
      if (sl === null) {
        M === null && (M = $);
        break;
      }
      l && M && sl.alternate === null && a(y, M), h = f(sl, h, D), O === null ? A = sl : O.sibling = sl, O = sl, M = $;
    }
    if (_.done)
      return u(y, M), X && Ka(y, D), A;
    if (M === null) {
      for (; !_.done; D++, _ = m.next())
        _ = b(y, _.value, g), _ !== null && (h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _);
      return X && Ka(y, D), A;
    }
    for (M = t(M); !_.done; D++, _ = m.next())
      _ = S(M, y, D, _.value, g), _ !== null && (l && _.alternate !== null && M.delete(_.key === null ? D : _.key), h = f(_, h, D), O === null ? A = _ : O.sibling = _, O = _);
    return l && M.forEach(function($t) {
      return a(y, $t);
    }), X && Ka(y, D), A;
  }
  function C(y, h, m, g) {
    if (typeof m == "object" && m !== null && m.type === mu && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Pt:
          l: {
            for (var A = m.key; h !== null; ) {
              if (h.key === A) {
                if (A = m.type, A === mu) {
                  if (h.tag === 7) {
                    u(
                      y,
                      h.sibling
                    ), g = n(
                      h,
                      m.props.children
                    ), g.return = y, y = g;
                    break l;
                  }
                } else if (h.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ba && di(A) === h.type) {
                  u(
                    y,
                    h.sibling
                  ), g = n(h, m.props), ru(g, m), g.return = y, y = g;
                  break l;
                }
                u(y, h);
                break;
              } else a(y, h);
              h = h.sibling;
            }
            m.type === mu ? (g = $a(
              m.props.children,
              y.mode,
              g,
              m.key
            ), g.return = y, y = g) : (g = Mn(
              m.type,
              m.key,
              m.props,
              null,
              y.mode,
              g
            ), ru(g, m), g.return = y, y = g);
          }
          return c(y);
        case at:
          l: {
            for (A = m.key; h !== null; ) {
              if (h.key === A)
                if (h.tag === 4 && h.stateNode.containerInfo === m.containerInfo && h.stateNode.implementation === m.implementation) {
                  u(
                    y,
                    h.sibling
                  ), g = n(h, m.children || []), g.return = y, y = g;
                  break l;
                } else {
                  u(y, h);
                  break;
                }
              else a(y, h);
              h = h.sibling;
            }
            g = xf(m, y.mode, g), g.return = y, y = g;
          }
          return c(y);
        case ba:
          return A = m._init, m = A(m._payload), C(
            y,
            h,
            m,
            g
          );
      }
      if (tt(m))
        return T(
          y,
          h,
          m,
          g
        );
      if (Wu(m)) {
        if (A = Wu(m), typeof A != "function") throw Error(z(150));
        return m = A.call(m), U(
          y,
          h,
          m,
          g
        );
      }
      if (typeof m.then == "function")
        return C(
          y,
          h,
          nn(m),
          g
        );
      if (m.$$typeof === ta)
        return C(
          y,
          h,
          cn(y, m),
          g
        );
      fn(y, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, h !== null && h.tag === 6 ? (u(y, h.sibling), g = n(h, m), g.return = y, y = g) : (u(y, h), g = Kf(m, y.mode, g), g.return = y, y = g), c(y)) : u(y, h);
  }
  return function(y, h, m, g) {
    try {
      ot = 0;
      var A = C(
        y,
        h,
        m,
        g
      );
      return ou = null, A;
    } catch (M) {
      if (M === vt) throw M;
      var O = Xl(29, M, null, y.mode);
      return O.lanes = g, O.return = y, O;
    } finally {
    }
  };
}
var Pa = W0(!0), $0 = W0(!1), Qu = $l(null), Qn = $l(0);
function mi(l, a) {
  l = da, L(Qn, l), L(Qu, a), da = l | a.baseLanes;
}
function Sc() {
  L(Qn, da), L(Qu, Qu.current);
}
function ce() {
  da = Qn.current, el(Qu), el(Qn);
}
var Gl = $l(null), wl = null;
function za(l) {
  var a = l.alternate;
  L(al, al.current & 1), L(Gl, l), wl === null && (a === null || Qu.current !== null || a.memoizedState !== null) && (wl = l);
}
function k0(l) {
  if (l.tag === 22) {
    if (L(al, al.current), L(Gl, l), wl === null) {
      var a = l.alternate;
      a !== null && a.memoizedState !== null && (wl = l);
    }
  } else Aa();
}
function Aa() {
  L(al, al.current), L(Gl, Gl.current);
}
function ca(l) {
  el(Gl), wl === l && (wl = null), el(al);
}
var al = $l(0);
function Gn(l) {
  for (var a = l; a !== null; ) {
    if (a.tag === 13) {
      var u = a.memoizedState;
      if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!"))
        return a;
    } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
      if (a.flags & 128) return a;
    } else if (a.child !== null) {
      a.child.return = a, a = a.child;
      continue;
    }
    if (a === l) break;
    for (; a.sibling === null; ) {
      if (a.return === null || a.return === l) return null;
      a = a.return;
    }
    a.sibling.return = a.return, a = a.sibling;
  }
  return null;
}
var Ph = typeof AbortController < "u" ? AbortController : function() {
  var l = [], a = this.signal = {
    aborted: !1,
    addEventListener: function(u, t) {
      l.push(t);
    }
  };
  this.abort = function() {
    a.aborted = !0, l.forEach(function(u) {
      return u();
    });
  };
}, Ih = ul.unstable_scheduleCallback, ly = ul.unstable_NormalPriority, ll = {
  $$typeof: ta,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function ee() {
  return {
    controller: new Ph(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Kt(l) {
  l.refCount--, l.refCount === 0 && Ih(ly, function() {
    l.controller.abort();
  });
}
var yt = null, sc = 0, Gu = 0, qu = null;
function ay(l, a) {
  if (yt === null) {
    var u = yt = [];
    sc = 0, Gu = Ne(), qu = {
      status: "pending",
      value: void 0,
      then: function(t) {
        u.push(t);
      }
    };
  }
  return sc++, a.then(Si, Si), a;
}
function Si() {
  if (--sc === 0 && yt !== null) {
    qu !== null && (qu.status = "fulfilled");
    var l = yt;
    yt = null, Gu = 0, qu = null;
    for (var a = 0; a < l.length; a++) (0, l[a])();
  }
}
function uy(l, a) {
  var u = [], t = {
    status: "pending",
    value: null,
    reason: null,
    then: function(n) {
      u.push(n);
    }
  };
  return l.then(
    function() {
      t.status = "fulfilled", t.value = a;
      for (var n = 0; n < u.length; n++) (0, u[n])(a);
    },
    function(n) {
      for (t.status = "rejected", t.reason = n, n = 0; n < u.length; n++)
        (0, u[n])(void 0);
    }
  ), t;
}
var si = H.S;
H.S = function(l, a) {
  typeof a == "object" && a !== null && typeof a.then == "function" && ay(l, a), si !== null && si(l, a);
};
var Wa = $l(null);
function ie() {
  var l = Wa.current;
  return l !== null ? l : V.pooledCache;
}
function zn(l, a) {
  a === null ? L(Wa, Wa.current) : L(Wa, a.pool);
}
function F0() {
  var l = ie();
  return l === null ? null : { parent: ll._currentValue, pool: l };
}
var Ra = 0, o = null, G = null, P = null, Zn = !1, Bu = !1, Ia = !1, jn = 0, qt = 0, Nu = null, ty = 0;
function F() {
  throw Error(z(321));
}
function ve(l, a) {
  if (a === null) return !1;
  for (var u = 0; u < a.length && u < l.length; u++)
    if (!Ol(l[u], a[u])) return !1;
  return !0;
}
function he(l, a, u, t, n, f) {
  return Ra = f, o = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, H.H = l === null || l.memoizedState === null ? fu : Za, Ia = !1, f = u(t, n), Ia = !1, Bu && (f = P0(
    a,
    u,
    t,
    n
  )), r0(l), f;
}
function r0(l) {
  H.H = Wl;
  var a = G !== null && G.next !== null;
  if (Ra = 0, P = G = o = null, Zn = !1, qt = 0, Nu = null, a) throw Error(z(300));
  l === null || cl || (l = l.dependencies, l !== null && Kn(l) && (cl = !0));
}
function P0(l, a, u, t) {
  o = l;
  var n = 0;
  do {
    if (Bu && (Nu = null), qt = 0, Bu = !1, 25 <= n) throw Error(z(301));
    if (n += 1, P = G = null, l.updateQueue != null) {
      var f = l.updateQueue;
      f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
    }
    H.H = cu, f = a(u, t);
  } while (Bu);
  return f;
}
function ny() {
  var l = H.H, a = l.useState()[0];
  return a = typeof a.then == "function" ? xt(a) : a, l = l.useState()[0], (G !== null ? G.memoizedState : null) !== l && (o.flags |= 1024), a;
}
function ye() {
  var l = jn !== 0;
  return jn = 0, l;
}
function de(l, a, u) {
  a.updateQueue = l.updateQueue, a.flags &= -2053, l.lanes &= ~u;
}
function me(l) {
  if (Zn) {
    for (l = l.memoizedState; l !== null; ) {
      var a = l.queue;
      a !== null && (a.pending = null), l = l.next;
    }
    Zn = !1;
  }
  Ra = 0, P = G = o = null, Bu = !1, qt = jn = 0, Nu = null;
}
function bl() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return P === null ? o.memoizedState = P = l : P = P.next = l, P;
}
function I() {
  if (G === null) {
    var l = o.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = G.next;
  var a = P === null ? o.memoizedState : P.next;
  if (a !== null)
    P = a, G = l;
  else {
    if (l === null)
      throw o.alternate === null ? Error(z(467)) : Error(z(310));
    G = l, l = {
      memoizedState: G.memoizedState,
      baseState: G.baseState,
      baseQueue: G.baseQueue,
      queue: G.queue,
      next: null
    }, P === null ? o.memoizedState = P = l : P = P.next = l;
  }
  return P;
}
var cf;
cf = function() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
};
function xt(l) {
  var a = qt;
  return qt += 1, Nu === null && (Nu = []), l = w0(Nu, l, a), a = o, (P === null ? a.memoizedState : P.next) === null && (a = a.alternate, H.H = a === null || a.memoizedState === null ? fu : Za), l;
}
function ef(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return xt(l);
    if (l.$$typeof === ta) return dl(l);
  }
  throw Error(z(438, String(l)));
}
function Se(l) {
  var a = null, u = o.updateQueue;
  if (u !== null && (a = u.memoCache), a == null) {
    var t = o.alternate;
    t !== null && (t = t.updateQueue, t !== null && (t = t.memoCache, t != null && (a = {
      data: t.data.map(function(n) {
        return n.slice();
      }),
      index: 0
    })));
  }
  if (a == null && (a = { data: [], index: 0 }), u === null && (u = cf(), o.updateQueue = u), u.memoCache = a, u = a.data[a.index], u === void 0)
    for (u = a.data[a.index] = Array(l), t = 0; t < l; t++)
      u[t] = Cv;
  return a.index++, u;
}
function ha(l, a) {
  return typeof a == "function" ? a(l) : a;
}
function An(l) {
  var a = I();
  return se(a, G, l);
}
function se(l, a, u) {
  var t = l.queue;
  if (t === null) throw Error(z(311));
  t.lastRenderedReducer = u;
  var n = l.baseQueue, f = t.pending;
  if (f !== null) {
    if (n !== null) {
      var c = n.next;
      n.next = f.next, f.next = c;
    }
    a.baseQueue = n = f, t.pending = null;
  }
  if (f = l.baseState, n === null) l.memoizedState = f;
  else {
    a = n.next;
    var e = c = null, i = null, v = a, s = !1;
    do {
      var b = v.lane & -536870913;
      if (b !== v.lane ? (R & b) === b : (Ra & b) === b) {
        var d = v.revertLane;
        if (d === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }), b === Gu && (s = !0);
        else if ((Ra & d) === d) {
          v = v.next, d === Gu && (s = !0);
          continue;
        } else
          b = {
            lane: 0,
            revertLane: v.revertLane,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, i === null ? (e = i = b, c = f) : i = i.next = b, o.lanes |= d, Qa |= d;
        b = v.action, Ia && u(f, b), f = v.hasEagerState ? v.eagerState : u(f, b);
      } else
        d = {
          lane: b,
          revertLane: v.revertLane,
          action: v.action,
          hasEagerState: v.hasEagerState,
          eagerState: v.eagerState,
          next: null
        }, i === null ? (e = i = d, c = f) : i = i.next = d, o.lanes |= b, Qa |= b;
      v = v.next;
    } while (v !== null && v !== a);
    if (i === null ? c = f : i.next = e, !Ol(f, l.memoizedState) && (cl = !0, s && (u = qu, u !== null)))
      throw u;
    l.memoizedState = f, l.baseState = c, l.baseQueue = i, t.lastRenderedState = f;
  }
  return n === null && (t.lanes = 0), [l.memoizedState, t.dispatch];
}
function Nf(l) {
  var a = I(), u = a.queue;
  if (u === null) throw Error(z(311));
  u.lastRenderedReducer = l;
  var t = u.dispatch, n = u.pending, f = a.memoizedState;
  if (n !== null) {
    u.pending = null;
    var c = n = n.next;
    do
      f = l(f, c.action), c = c.next;
    while (c !== n);
    Ol(f, a.memoizedState) || (cl = !0), a.memoizedState = f, a.baseQueue === null && (a.baseState = f), u.lastRenderedState = f;
  }
  return [f, t];
}
function I0(l, a, u) {
  var t = o, n = I(), f = X;
  if (f) {
    if (u === void 0) throw Error(z(407));
    u = u();
  } else u = a();
  var c = !Ol(
    (G || n).memoizedState,
    u
  );
  if (c && (n.memoizedState = u, cl = !0), n = n.queue, be(u1.bind(null, t, n, l), [
    l
  ]), n.getSnapshot !== a || c || P !== null && P.memoizedState.tag & 1) {
    if (t.flags |= 2048, Zu(
      9,
      a1.bind(
        null,
        t,
        n,
        u,
        a
      ),
      { destroy: void 0 },
      null
    ), V === null) throw Error(z(349));
    f || Ra & 60 || l1(t, a, u);
  }
  return u;
}
function l1(l, a, u) {
  l.flags |= 16384, l = { getSnapshot: a, value: u }, a = o.updateQueue, a === null ? (a = cf(), o.updateQueue = a, a.stores = [l]) : (u = a.stores, u === null ? a.stores = [l] : u.push(l));
}
function a1(l, a, u, t) {
  a.value = u, a.getSnapshot = t, t1(a) && n1(l);
}
function u1(l, a, u) {
  return u(function() {
    t1(a) && n1(l);
  });
}
function t1(l) {
  var a = l.getSnapshot;
  l = l.value;
  try {
    var u = a();
    return !Ol(l, u);
  } catch {
    return !0;
  }
}
function n1(l) {
  var a = Ya(l, 2);
  a !== null && Sl(a, l, 2);
}
function bc(l) {
  var a = bl();
  if (typeof l == "function") {
    var u = l;
    if (l = u(), Ia) {
      Ma(!0);
      try {
        u();
      } finally {
        Ma(!1);
      }
    }
  }
  return a.memoizedState = a.baseState = l, a.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: ha,
    lastRenderedState: l
  }, a;
}
function f1(l, a, u, t) {
  return l.baseState = u, se(
    l,
    G,
    typeof t == "function" ? t : ha
  );
}
function fy(l, a, u, t, n) {
  if (hf(l)) throw Error(z(485));
  if (l = a.action, l !== null) {
    var f = {
      payload: n,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(c) {
        f.listeners.push(c);
      }
    };
    H.T !== null ? u(!0) : f.isTransition = !1, t(f), u = a.pending, u === null ? (f.next = a.pending = f, c1(a, f)) : (f.next = u.next, a.pending = u.next = f);
  }
}
function c1(l, a) {
  var u = a.action, t = a.payload, n = l.state;
  if (a.isTransition) {
    var f = H.T, c = {};
    H.T = c;
    try {
      var e = u(n, t), i = H.S;
      i !== null && i(c, e), bi(l, a, e);
    } catch (v) {
      gc(l, a, v);
    } finally {
      H.T = f;
    }
  } else
    try {
      f = u(n, t), bi(l, a, f);
    } catch (v) {
      gc(l, a, v);
    }
}
function bi(l, a, u) {
  u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
    function(t) {
      gi(l, a, t);
    },
    function(t) {
      return gc(l, a, t);
    }
  ) : gi(l, a, u);
}
function gi(l, a, u) {
  a.status = "fulfilled", a.value = u, e1(a), l.state = u, a = l.pending, a !== null && (u = a.next, u === a ? l.pending = null : (u = u.next, a.next = u, c1(l, u)));
}
function gc(l, a, u) {
  var t = l.pending;
  if (l.pending = null, t !== null) {
    t = t.next;
    do
      a.status = "rejected", a.reason = u, e1(a), a = a.next;
    while (a !== t);
  }
  l.action = null;
}
function e1(l) {
  l = l.listeners;
  for (var a = 0; a < l.length; a++) (0, l[a])();
}
function i1(l, a) {
  return a;
}
function v1(l, a) {
  if (X) {
    var u = V.formState;
    if (u !== null) {
      l: {
        var t = o;
        if (X) {
          if (vl) {
            a: {
              for (var n = vl, f = xl; n.nodeType !== 8; ) {
                if (!f) {
                  n = null;
                  break a;
                }
                if (n = Cl(
                  n.nextSibling
                ), n === null) {
                  n = null;
                  break a;
                }
              }
              f = n.data, n = f === "F!" || f === "F" ? n : null;
            }
            if (n) {
              vl = Cl(
                n.nextSibling
              ), t = n.data === "F!";
              break l;
            }
          }
          ra(t);
        }
        t = !1;
      }
      t && (a = u[0]);
    }
  }
  return u = bl(), u.memoizedState = u.baseState = a, t = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: i1,
    lastRenderedState: a
  }, u.queue = t, u = H1.bind(
    null,
    o,
    t
  ), t.dispatch = u, t = bc(!1), f = Te.bind(
    null,
    o,
    !1,
    t.queue
  ), t = bl(), n = {
    state: a,
    dispatch: null,
    action: l,
    pending: null
  }, t.queue = n, u = fy.bind(
    null,
    o,
    n,
    f,
    u
  ), n.dispatch = u, t.memoizedState = l, [a, u, !1];
}
function h1(l) {
  var a = I();
  return y1(a, G, l);
}
function y1(l, a, u) {
  a = se(
    l,
    a,
    i1
  )[0], l = An(ha)[0], a = typeof a == "object" && a !== null && typeof a.then == "function" ? xt(a) : a;
  var t = I(), n = t.queue, f = n.dispatch;
  return u !== t.memoizedState && (o.flags |= 2048, Zu(
    9,
    cy.bind(null, n, u),
    { destroy: void 0 },
    null
  )), [a, f, l];
}
function cy(l, a) {
  l.action = a;
}
function d1(l) {
  var a = I(), u = G;
  if (u !== null)
    return y1(a, u, l);
  I(), a = a.memoizedState, u = I();
  var t = u.queue.dispatch;
  return u.memoizedState = l, [a, t, !1];
}
function Zu(l, a, u, t) {
  return l = { tag: l, create: a, inst: u, deps: t, next: null }, a = o.updateQueue, a === null && (a = cf(), o.updateQueue = a), u = a.lastEffect, u === null ? a.lastEffect = l.next = l : (t = u.next, u.next = l, l.next = t, a.lastEffect = l), l;
}
function m1() {
  return I().memoizedState;
}
function Tn(l, a, u, t) {
  var n = bl();
  o.flags |= l, n.memoizedState = Zu(
    1 | a,
    u,
    { destroy: void 0 },
    t === void 0 ? null : t
  );
}
function vf(l, a, u, t) {
  var n = I();
  t = t === void 0 ? null : t;
  var f = n.memoizedState.inst;
  G !== null && t !== null && ve(t, G.memoizedState.deps) ? n.memoizedState = Zu(a, u, f, t) : (o.flags |= l, n.memoizedState = Zu(1 | a, u, f, t));
}
function zi(l, a) {
  Tn(8390656, 8, l, a);
}
function be(l, a) {
  vf(2048, 8, l, a);
}
function S1(l, a) {
  return vf(4, 2, l, a);
}
function s1(l, a) {
  return vf(4, 4, l, a);
}
function b1(l, a) {
  if (typeof a == "function") {
    l = l();
    var u = a(l);
    return function() {
      typeof u == "function" ? u() : a(null);
    };
  }
  if (a != null)
    return l = l(), a.current = l, function() {
      a.current = null;
    };
}
function g1(l, a, u) {
  u = u != null ? u.concat([l]) : null, vf(4, 4, b1.bind(null, a, l), u);
}
function ge() {
}
function z1(l, a) {
  var u = I();
  a = a === void 0 ? null : a;
  var t = u.memoizedState;
  return a !== null && ve(a, t[1]) ? t[0] : (u.memoizedState = [l, a], l);
}
function A1(l, a) {
  var u = I();
  a = a === void 0 ? null : a;
  var t = u.memoizedState;
  if (a !== null && ve(a, t[1]))
    return t[0];
  if (t = l(), Ia) {
    Ma(!0);
    try {
      l();
    } finally {
      Ma(!1);
    }
  }
  return u.memoizedState = [t, a], t;
}
function ze(l, a, u) {
  return u === void 0 || Ra & 1073741824 ? l.memoizedState = a : (l.memoizedState = u, l = ev(), o.lanes |= l, Qa |= l, u);
}
function T1(l, a, u, t) {
  return Ol(u, a) ? u : Qu.current !== null ? (l = ze(l, u, t), Ol(l, a) || (cl = !0), l) : Ra & 42 ? (l = ev(), o.lanes |= l, Qa |= l, a) : (cl = !0, l.memoizedState = u);
}
function E1(l, a, u, t, n) {
  var f = K.p;
  K.p = f !== 0 && 8 > f ? f : 8;
  var c = H.T, e = {};
  H.T = e, Te(l, !1, a, u);
  try {
    var i = n(), v = H.S;
    if (v !== null && v(e, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var s = uy(
        i,
        t
      );
      dt(
        l,
        a,
        s,
        Ul(l)
      );
    } else
      dt(
        l,
        a,
        t,
        Ul(l)
      );
  } catch (b) {
    dt(
      l,
      a,
      { then: function() {
      }, status: "rejected", reason: b },
      Ul()
    );
  } finally {
    K.p = f, H.T = c;
  }
}
function ey() {
}
function zc(l, a, u, t) {
  if (l.tag !== 5) throw Error(z(476));
  var n = M1(l).queue;
  E1(
    l,
    n,
    a,
    Ja,
    u === null ? ey : function() {
      return D1(l), u(t);
    }
  );
}
function M1(l) {
  var a = l.memoizedState;
  if (a !== null) return a;
  a = {
    memoizedState: Ja,
    baseState: Ja,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ha,
      lastRenderedState: Ja
    },
    next: null
  };
  var u = {};
  return a.next = {
    memoizedState: u,
    baseState: u,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ha,
      lastRenderedState: u
    },
    next: null
  }, l.memoizedState = a, l = l.alternate, l !== null && (l.memoizedState = a), a;
}
function D1(l) {
  var a = M1(l).next.queue;
  dt(l, a, {}, Ul());
}
function Ae() {
  return dl(Yt);
}
function U1() {
  return I().memoizedState;
}
function O1() {
  return I().memoizedState;
}
function iy(l) {
  for (var a = l.return; a !== null; ) {
    switch (a.tag) {
      case 24:
      case 3:
        var u = Ul();
        l = Oa(u);
        var t = Ha(a, l, u);
        t !== null && (Sl(t, a, u), St(t, a, u)), a = { cache: ee() }, l.payload = a;
        return;
    }
    a = a.return;
  }
}
function vy(l, a, u) {
  var t = Ul();
  u = {
    lane: t,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, hf(l) ? o1(a, u) : (u = te(l, a, u, t), u !== null && (Sl(u, l, t), q1(u, a, t)));
}
function H1(l, a, u) {
  var t = Ul();
  dt(l, a, u, t);
}
function dt(l, a, u, t) {
  var n = {
    lane: t,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (hf(l)) o1(a, n);
  else {
    var f = l.alternate;
    if (l.lanes === 0 && (f === null || f.lanes === 0) && (f = a.lastRenderedReducer, f !== null))
      try {
        var c = a.lastRenderedState, e = f(c, u);
        if (n.hasEagerState = !0, n.eagerState = e, Ol(e, c))
          return ff(l, a, n, 0), V === null && nf(), !1;
      } catch {
      } finally {
      }
    if (u = te(l, a, n, t), u !== null)
      return Sl(u, l, t), q1(u, a, t), !0;
  }
  return !1;
}
function Te(l, a, u, t) {
  if (t = {
    lane: 2,
    revertLane: Ne(),
    action: t,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, hf(l)) {
    if (a) throw Error(z(479));
  } else
    a = te(
      l,
      u,
      t,
      2
    ), a !== null && Sl(a, l, 2);
}
function hf(l) {
  var a = l.alternate;
  return l === o || a !== null && a === o;
}
function o1(l, a) {
  Bu = Zn = !0;
  var u = l.pending;
  u === null ? a.next = a : (a.next = u.next, u.next = a), l.pending = a;
}
function q1(l, a, u) {
  if (u & 4194176) {
    var t = a.lanes;
    t &= l.pendingLanes, u |= t, a.lanes = u, b0(l, u);
  }
}
var Wl = {
  readContext: dl,
  use: ef,
  useCallback: F,
  useContext: F,
  useEffect: F,
  useImperativeHandle: F,
  useLayoutEffect: F,
  useInsertionEffect: F,
  useMemo: F,
  useReducer: F,
  useRef: F,
  useState: F,
  useDebugValue: F,
  useDeferredValue: F,
  useTransition: F,
  useSyncExternalStore: F,
  useId: F
};
Wl.useCacheRefresh = F;
Wl.useMemoCache = F;
Wl.useHostTransitionStatus = F;
Wl.useFormState = F;
Wl.useActionState = F;
Wl.useOptimistic = F;
var fu = {
  readContext: dl,
  use: ef,
  useCallback: function(l, a) {
    return bl().memoizedState = [
      l,
      a === void 0 ? null : a
    ], l;
  },
  useContext: dl,
  useEffect: zi,
  useImperativeHandle: function(l, a, u) {
    u = u != null ? u.concat([l]) : null, Tn(
      4194308,
      4,
      b1.bind(null, a, l),
      u
    );
  },
  useLayoutEffect: function(l, a) {
    return Tn(4194308, 4, l, a);
  },
  useInsertionEffect: function(l, a) {
    Tn(4, 2, l, a);
  },
  useMemo: function(l, a) {
    var u = bl();
    a = a === void 0 ? null : a;
    var t = l();
    if (Ia) {
      Ma(!0);
      try {
        l();
      } finally {
        Ma(!1);
      }
    }
    return u.memoizedState = [t, a], t;
  },
  useReducer: function(l, a, u) {
    var t = bl();
    if (u !== void 0) {
      var n = u(a);
      if (Ia) {
        Ma(!0);
        try {
          u(a);
        } finally {
          Ma(!1);
        }
      }
    } else n = a;
    return t.memoizedState = t.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: n
    }, t.queue = l, l = l.dispatch = vy.bind(
      null,
      o,
      l
    ), [t.memoizedState, l];
  },
  useRef: function(l) {
    var a = bl();
    return l = { current: l }, a.memoizedState = l;
  },
  useState: function(l) {
    l = bc(l);
    var a = l.queue, u = H1.bind(null, o, a);
    return a.dispatch = u, [l.memoizedState, u];
  },
  useDebugValue: ge,
  useDeferredValue: function(l, a) {
    var u = bl();
    return ze(u, l, a);
  },
  useTransition: function() {
    var l = bc(!1);
    return l = E1.bind(
      null,
      o,
      l.queue,
      !0,
      !1
    ), bl().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, a, u) {
    var t = o, n = bl();
    if (X) {
      if (u === void 0)
        throw Error(z(407));
      u = u();
    } else {
      if (u = a(), V === null) throw Error(z(349));
      R & 60 || l1(t, a, u);
    }
    n.memoizedState = u;
    var f = { value: u, getSnapshot: a };
    return n.queue = f, zi(u1.bind(null, t, f, l), [
      l
    ]), t.flags |= 2048, Zu(
      9,
      a1.bind(
        null,
        t,
        f,
        u,
        a
      ),
      { destroy: void 0 },
      null
    ), u;
  },
  useId: function() {
    var l = bl(), a = V.identifierPrefix;
    if (X) {
      var u = fa, t = na;
      u = (t & ~(1 << 32 - Dl(t) - 1)).toString(32) + u, a = ":" + a + "R" + u, u = jn++, 0 < u && (a += "H" + u.toString(32)), a += ":";
    } else
      u = ty++, a = ":" + a + "r" + u.toString(32) + ":";
    return l.memoizedState = a;
  },
  useCacheRefresh: function() {
    return bl().memoizedState = iy.bind(
      null,
      o
    );
  }
};
fu.useMemoCache = Se;
fu.useHostTransitionStatus = Ae;
fu.useFormState = v1;
fu.useActionState = v1;
fu.useOptimistic = function(l) {
  var a = bl();
  a.memoizedState = a.baseState = l;
  var u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: null,
    lastRenderedState: null
  };
  return a.queue = u, a = Te.bind(
    null,
    o,
    !0,
    u
  ), u.dispatch = a, [l, a];
};
var Za = {
  readContext: dl,
  use: ef,
  useCallback: z1,
  useContext: dl,
  useEffect: be,
  useImperativeHandle: g1,
  useInsertionEffect: S1,
  useLayoutEffect: s1,
  useMemo: A1,
  useReducer: An,
  useRef: m1,
  useState: function() {
    return An(ha);
  },
  useDebugValue: ge,
  useDeferredValue: function(l, a) {
    var u = I();
    return T1(
      u,
      G.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = An(ha)[0], a = I().memoizedState;
    return [
      typeof l == "boolean" ? l : xt(l),
      a
    ];
  },
  useSyncExternalStore: I0,
  useId: U1
};
Za.useCacheRefresh = O1;
Za.useMemoCache = Se;
Za.useHostTransitionStatus = Ae;
Za.useFormState = h1;
Za.useActionState = h1;
Za.useOptimistic = function(l, a) {
  var u = I();
  return f1(u, G, l, a);
};
var cu = {
  readContext: dl,
  use: ef,
  useCallback: z1,
  useContext: dl,
  useEffect: be,
  useImperativeHandle: g1,
  useInsertionEffect: S1,
  useLayoutEffect: s1,
  useMemo: A1,
  useReducer: Nf,
  useRef: m1,
  useState: function() {
    return Nf(ha);
  },
  useDebugValue: ge,
  useDeferredValue: function(l, a) {
    var u = I();
    return G === null ? ze(u, l, a) : T1(
      u,
      G.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = Nf(ha)[0], a = I().memoizedState;
    return [
      typeof l == "boolean" ? l : xt(l),
      a
    ];
  },
  useSyncExternalStore: I0,
  useId: U1
};
cu.useCacheRefresh = O1;
cu.useMemoCache = Se;
cu.useHostTransitionStatus = Ae;
cu.useFormState = d1;
cu.useActionState = d1;
cu.useOptimistic = function(l, a) {
  var u = I();
  return G !== null ? f1(u, G, l, a) : (u.baseState = l, [l, u.queue.dispatch]);
};
function _f(l, a, u, t) {
  a = l.memoizedState, u = u(t, a), u = u == null ? a : x({}, a, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
}
var Ac = {
  isMounted: function(l) {
    return (l = l._reactInternals) ? Ku(l) === l : !1;
  },
  enqueueSetState: function(l, a, u) {
    l = l._reactInternals;
    var t = Ul(), n = Oa(t);
    n.payload = a, u != null && (n.callback = u), a = Ha(l, n, t), a !== null && (Sl(a, l, t), St(a, l, t));
  },
  enqueueReplaceState: function(l, a, u) {
    l = l._reactInternals;
    var t = Ul(), n = Oa(t);
    n.tag = 1, n.payload = a, u != null && (n.callback = u), a = Ha(l, n, t), a !== null && (Sl(a, l, t), St(a, l, t));
  },
  enqueueForceUpdate: function(l, a) {
    l = l._reactInternals;
    var u = Ul(), t = Oa(u);
    t.tag = 2, a != null && (t.callback = a), a = Ha(l, t, u), a !== null && (Sl(a, l, u), St(a, l, u));
  }
};
function Ai(l, a, u, t, n, f, c) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(t, f, c) : a.prototype && a.prototype.isPureReactComponent ? !Ot(u, t) || !Ot(n, f) : !0;
}
function Ti(l, a, u, t) {
  l = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, t), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, t), a.state !== l && Ac.enqueueReplaceState(a, a.state, null);
}
function lu(l, a) {
  var u = a;
  if ("ref" in a) {
    u = {};
    for (var t in a)
      t !== "ref" && (u[t] = a[t]);
  }
  if (l = l.defaultProps) {
    u === a && (u = x({}, u));
    for (var n in l)
      u[n] === void 0 && (u[n] = l[n]);
  }
  return u;
}
var Vn = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var a = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(a)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function B1(l) {
  Vn(l);
}
function N1(l) {
  console.error(l);
}
function _1(l) {
  Vn(l);
}
function Cn(l, a) {
  try {
    var u = l.onUncaughtError;
    u(a.value, { componentStack: a.stack });
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
function Ei(l, a, u) {
  try {
    var t = l.onCaughtError;
    t(u.value, {
      componentStack: u.stack,
      errorBoundary: a.tag === 1 ? a.stateNode : null
    });
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
function Tc(l, a, u) {
  return u = Oa(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
    Cn(l, a);
  }, u;
}
function Y1(l) {
  return l = Oa(l), l.tag = 3, l;
}
function R1(l, a, u, t) {
  var n = u.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var f = t.value;
    l.payload = function() {
      return n(f);
    }, l.callback = function() {
      Ei(a, u, t);
    };
  }
  var c = u.stateNode;
  c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
    Ei(a, u, t), typeof n != "function" && (qa === null ? qa = /* @__PURE__ */ new Set([this]) : qa.add(this));
    var e = t.stack;
    this.componentDidCatch(t.value, {
      componentStack: e !== null ? e : ""
    });
  });
}
function hy(l, a, u, t, n) {
  if (u.flags |= 32768, t !== null && typeof t == "object" && typeof t.then == "function") {
    if (a = u.alternate, a !== null && Lt(
      a,
      u,
      n,
      !0
    ), u = Gl.current, u !== null) {
      switch (u.tag) {
        case 13:
          return wl === null ? Qc() : u.alternate === null && W === 0 && (W = 3), u.flags &= -257, u.flags |= 65536, u.lanes = n, t === mc ? u.flags |= 16384 : (a = u.updateQueue, a === null ? u.updateQueue = /* @__PURE__ */ new Set([t]) : a.add(t), pf(l, t, n)), !1;
        case 22:
          return u.flags |= 65536, t === mc ? u.flags |= 16384 : (a = u.updateQueue, a === null ? (a = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([t])
          }, u.updateQueue = a) : (u = a.retryQueue, u === null ? a.retryQueue = /* @__PURE__ */ new Set([t]) : u.add(t)), pf(l, t, n)), !1;
      }
      throw Error(z(435, u.tag));
    }
    return pf(l, t, n), Qc(), !1;
  }
  if (X)
    return a = Gl.current, a !== null ? (!(a.flags & 65536) && (a.flags |= 256), a.flags |= 65536, a.lanes = n, t !== dc && (l = Error(z(422), { cause: t }), Ht(Rl(l, u)))) : (t !== dc && (a = Error(z(423), {
      cause: t
    }), Ht(
      Rl(a, u)
    )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, t = Rl(t, u), n = Tc(
      l.stateNode,
      t,
      n
    ), Zf(l, n), W !== 4 && (W = 2)), !1;
  var f = Error(z(520), { cause: t });
  if (f = Rl(f, u), zt === null ? zt = [f] : zt.push(f), W !== 4 && (W = 2), a === null) return !0;
  t = Rl(t, u), u = a;
  do {
    switch (u.tag) {
      case 3:
        return u.flags |= 65536, l = n & -n, u.lanes |= l, l = Tc(u.stateNode, t, l), Zf(u, l), !1;
      case 1:
        if (a = u.type, f = u.stateNode, (u.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (qa === null || !qa.has(f))))
          return u.flags |= 65536, n &= -n, u.lanes |= n, n = Y1(n), R1(
            n,
            l,
            u,
            t
          ), Zf(u, n), !1;
    }
    u = u.return;
  } while (u !== null);
  return !1;
}
var X1 = Error(z(461)), cl = !1;
function il(l, a, u, t) {
  a.child = l === null ? $0(a, null, u, t) : Pa(
    a,
    l.child,
    u,
    t
  );
}
function Mi(l, a, u, t, n) {
  u = u.render;
  var f = a.ref;
  if ("ref" in t) {
    var c = {};
    for (var e in t)
      e !== "ref" && (c[e] = t[e]);
  } else c = t;
  return au(a), t = he(
    l,
    a,
    u,
    c,
    f,
    n
  ), e = ye(), l !== null && !cl ? (de(l, a, n), ya(l, a, n)) : (X && e && ne(a), a.flags |= 1, il(l, a, t, n), a.child);
}
function Di(l, a, u, t, n) {
  if (l === null) {
    var f = u.type;
    return typeof f == "function" && !Oe(f) && f.defaultProps === void 0 && u.compare === null ? (a.tag = 15, a.type = f, Q1(
      l,
      a,
      f,
      t,
      n
    )) : (l = Mn(
      u.type,
      null,
      t,
      a,
      a.mode,
      n
    ), l.ref = a.ref, l.return = a, a.child = l);
  }
  if (f = l.child, !Ee(l, n)) {
    var c = f.memoizedProps;
    if (u = u.compare, u = u !== null ? u : Ot, u(c, t) && l.ref === a.ref)
      return ya(l, a, n);
  }
  return a.flags |= 1, l = oa(f, t), l.ref = a.ref, l.return = a, a.child = l;
}
function Q1(l, a, u, t, n) {
  if (l !== null) {
    var f = l.memoizedProps;
    if (Ot(f, t) && l.ref === a.ref)
      if (cl = !1, a.pendingProps = t = f, Ee(l, n))
        l.flags & 131072 && (cl = !0);
      else
        return a.lanes = l.lanes, ya(l, a, n);
  }
  return Ec(
    l,
    a,
    u,
    t,
    n
  );
}
function G1(l, a, u) {
  var t = a.pendingProps, n = t.children, f = (a.stateNode._pendingVisibility & 2) !== 0, c = l !== null ? l.memoizedState : null;
  if (mt(l, a), t.mode === "hidden" || f) {
    if (a.flags & 128) {
      if (t = c !== null ? c.baseLanes | u : u, l !== null) {
        for (n = a.child = l.child, f = 0; n !== null; )
          f = f | n.lanes | n.childLanes, n = n.sibling;
        a.childLanes = f & ~t;
      } else a.childLanes = 0, a.child = null;
      return Ui(
        l,
        a,
        t,
        u
      );
    }
    if (u & 536870912)
      a.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && zn(
        a,
        c !== null ? c.cachePool : null
      ), c !== null ? mi(a, c) : Sc(), k0(a);
    else
      return a.lanes = a.childLanes = 536870912, Ui(
        l,
        a,
        c !== null ? c.baseLanes | u : u,
        u
      );
  } else
    c !== null ? (zn(a, c.cachePool), mi(a, c), Aa(), a.memoizedState = null) : (l !== null && zn(a, null), Sc(), Aa());
  return il(l, a, n, u), a.child;
}
function Ui(l, a, u, t) {
  var n = ie();
  return n = n === null ? null : { parent: ll._currentValue, pool: n }, a.memoizedState = {
    baseLanes: u,
    cachePool: n
  }, l !== null && zn(a, null), Sc(), k0(a), l !== null && Lt(l, a, t, !0), null;
}
function mt(l, a) {
  var u = a.ref;
  if (u === null)
    l !== null && l.ref !== null && (a.flags |= 2097664);
  else {
    if (typeof u != "function" && typeof u != "object")
      throw Error(z(284));
    (l === null || l.ref !== u) && (a.flags |= 2097664);
  }
}
function Ec(l, a, u, t, n) {
  return au(a), u = he(
    l,
    a,
    u,
    t,
    void 0,
    n
  ), t = ye(), l !== null && !cl ? (de(l, a, n), ya(l, a, n)) : (X && t && ne(a), a.flags |= 1, il(l, a, u, n), a.child);
}
function Oi(l, a, u, t, n, f) {
  return au(a), a.updateQueue = null, u = P0(
    a,
    t,
    u,
    n
  ), r0(l), t = ye(), l !== null && !cl ? (de(l, a, f), ya(l, a, f)) : (X && t && ne(a), a.flags |= 1, il(l, a, u, f), a.child);
}
function Hi(l, a, u, t, n) {
  if (au(a), a.stateNode === null) {
    var f = Tu, c = u.contextType;
    typeof c == "object" && c !== null && (f = dl(c)), f = new u(t, f), a.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ac, a.stateNode = f, f._reactInternals = a, f = a.stateNode, f.props = t, f.state = a.memoizedState, f.refs = {}, Me(a), c = u.contextType, f.context = typeof c == "object" && c !== null ? dl(c) : Tu, f.state = a.memoizedState, c = u.getDerivedStateFromProps, typeof c == "function" && (_f(
      a,
      u,
      c,
      t
    ), f.state = a.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (c = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), c !== f.state && Ac.enqueueReplaceState(f, f.state, null), bt(a, t, f, n), st(), f.state = a.memoizedState), typeof f.componentDidMount == "function" && (a.flags |= 4194308), t = !0;
  } else if (l === null) {
    f = a.stateNode;
    var e = a.memoizedProps, i = lu(u, e);
    f.props = i;
    var v = f.context, s = u.contextType;
    c = Tu, typeof s == "object" && s !== null && (c = dl(s));
    var b = u.getDerivedStateFromProps;
    s = typeof b == "function" || typeof f.getSnapshotBeforeUpdate == "function", e = a.pendingProps !== e, s || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (e || v !== c) && Ti(
      a,
      f,
      t,
      c
    ), ga = !1;
    var d = a.memoizedState;
    f.state = d, bt(a, t, f, n), st(), v = a.memoizedState, e || d !== v || ga ? (typeof b == "function" && (_f(
      a,
      u,
      b,
      t
    ), v = a.memoizedState), (i = ga || Ai(
      a,
      u,
      i,
      t,
      d,
      v,
      c
    )) ? (s || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = t, a.memoizedState = v), f.props = t, f.state = v, f.context = c, t = i) : (typeof f.componentDidMount == "function" && (a.flags |= 4194308), t = !1);
  } else {
    f = a.stateNode, oc(l, a), c = a.memoizedProps, s = lu(u, c), f.props = s, b = a.pendingProps, d = f.context, v = u.contextType, i = Tu, typeof v == "object" && v !== null && (i = dl(v)), e = u.getDerivedStateFromProps, (v = typeof e == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (c !== b || d !== i) && Ti(
      a,
      f,
      t,
      i
    ), ga = !1, d = a.memoizedState, f.state = d, bt(a, t, f, n), st();
    var S = a.memoizedState;
    c !== b || d !== S || ga || l !== null && l.dependencies !== null && Kn(l.dependencies) ? (typeof e == "function" && (_f(
      a,
      u,
      e,
      t
    ), S = a.memoizedState), (s = ga || Ai(
      a,
      u,
      s,
      t,
      d,
      S,
      i
    ) || l !== null && l.dependencies !== null && Kn(l.dependencies)) ? (v || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(t, S, i), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
      t,
      S,
      i
    )), typeof f.componentDidUpdate == "function" && (a.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || c === l.memoizedProps && d === l.memoizedState || (a.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && d === l.memoizedState || (a.flags |= 1024), a.memoizedProps = t, a.memoizedState = S), f.props = t, f.state = S, f.context = i, t = s) : (typeof f.componentDidUpdate != "function" || c === l.memoizedProps && d === l.memoizedState || (a.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && d === l.memoizedState || (a.flags |= 1024), t = !1);
  }
  return f = t, mt(l, a), t = (a.flags & 128) !== 0, f || t ? (f = a.stateNode, u = t && typeof u.getDerivedStateFromError != "function" ? null : f.render(), a.flags |= 1, l !== null && t ? (a.child = Pa(
    a,
    l.child,
    null,
    n
  ), a.child = Pa(
    a,
    null,
    u,
    n
  )) : il(l, a, u, n), a.memoizedState = f.state, l = a.child) : l = ya(
    l,
    a,
    n
  ), l;
}
function oi(l, a, u, t) {
  return Ct(), a.flags |= 256, il(l, a, u, t), a.child;
}
var Yf = { dehydrated: null, treeContext: null, retryLane: 0 };
function Rf(l) {
  return { baseLanes: l, cachePool: F0() };
}
function Xf(l, a, u) {
  return l = l !== null ? l.childLanes & ~u : 0, a && (l |= Ql), l;
}
function Z1(l, a, u) {
  var t = a.pendingProps, n = !1, f = (a.flags & 128) !== 0, c;
  if ((c = f) || (c = l !== null && l.memoizedState === null ? !1 : (al.current & 2) !== 0), c && (n = !0, a.flags &= -129), c = (a.flags & 32) !== 0, a.flags &= -33, l === null) {
    if (X) {
      if (n ? za(a) : Aa(), X) {
        var e = vl, i;
        if (i = e) {
          l: {
            for (i = e, e = xl; i.nodeType !== 8; ) {
              if (!e) {
                e = null;
                break l;
              }
              if (i = Cl(
                i.nextSibling
              ), i === null) {
                e = null;
                break l;
              }
            }
            e = i;
          }
          e !== null ? (a.memoizedState = {
            dehydrated: e,
            treeContext: wa !== null ? { id: na, overflow: fa } : null,
            retryLane: 536870912
          }, i = Xl(
            18,
            null,
            null,
            0
          ), i.stateNode = e, i.return = a, a.child = i, ml = a, vl = null, i = !0) : i = !1;
        }
        i || ra(a);
      }
      if (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null))
        return e.data === "$!" ? a.lanes = 16 : a.lanes = 536870912, null;
      ca(a);
    }
    return e = t.children, t = t.fallback, n ? (Aa(), n = a.mode, e = Dc(
      { mode: "hidden", children: e },
      n
    ), t = $a(
      t,
      n,
      u,
      null
    ), e.return = a, t.return = a, e.sibling = t, a.child = e, n = a.child, n.memoizedState = Rf(u), n.childLanes = Xf(
      l,
      c,
      u
    ), a.memoizedState = Yf, t) : (za(a), Mc(a, e));
  }
  if (i = l.memoizedState, i !== null && (e = i.dehydrated, e !== null)) {
    if (f)
      a.flags & 256 ? (za(a), a.flags &= -257, a = Qf(
        l,
        a,
        u
      )) : a.memoizedState !== null ? (Aa(), a.child = l.child, a.flags |= 128, a = null) : (Aa(), n = t.fallback, e = a.mode, t = Dc(
        { mode: "visible", children: t.children },
        e
      ), n = $a(
        n,
        e,
        u,
        null
      ), n.flags |= 2, t.return = a, n.return = a, t.sibling = n, a.child = t, Pa(
        a,
        l.child,
        null,
        u
      ), t = a.child, t.memoizedState = Rf(u), t.childLanes = Xf(
        l,
        c,
        u
      ), a.memoizedState = Yf, a = n);
    else if (za(a), e.data === "$!") {
      if (c = e.nextSibling && e.nextSibling.dataset, c) var v = c.dgst;
      c = v, t = Error(z(419)), t.stack = "", t.digest = c, Ht({ value: t, source: null, stack: null }), a = Qf(
        l,
        a,
        u
      );
    } else if (cl || Lt(l, a, u, !1), c = (u & l.childLanes) !== 0, cl || c) {
      if (c = V, c !== null) {
        if (t = u & -u, t & 42) t = 1;
        else
          switch (t) {
            case 2:
              t = 1;
              break;
            case 8:
              t = 4;
              break;
            case 32:
              t = 16;
              break;
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              t = 64;
              break;
            case 268435456:
              t = 134217728;
              break;
            default:
              t = 0;
          }
        if (t = t & (c.suspendedLanes | u) ? 0 : t, t !== 0 && t !== i.retryLane)
          throw i.retryLane = t, Ya(l, t), Sl(c, l, t), X1;
      }
      e.data === "$?" || Qc(), a = Qf(
        l,
        a,
        u
      );
    } else
      e.data === "$?" ? (a.flags |= 128, a.child = l.child, a = Oy.bind(
        null,
        l
      ), e._reactRetry = a, a = null) : (l = i.treeContext, vl = Cl(
        e.nextSibling
      ), ml = a, X = !0, Vl = null, xl = !1, l !== null && (Nl[_l++] = na, Nl[_l++] = fa, Nl[_l++] = wa, na = l.id, fa = l.overflow, wa = a), a = Mc(
        a,
        t.children
      ), a.flags |= 4096);
    return a;
  }
  return n ? (Aa(), n = t.fallback, e = a.mode, i = l.child, v = i.sibling, t = oa(i, {
    mode: "hidden",
    children: t.children
  }), t.subtreeFlags = i.subtreeFlags & 31457280, v !== null ? n = oa(v, n) : (n = $a(
    n,
    e,
    u,
    null
  ), n.flags |= 2), n.return = a, t.return = a, t.sibling = n, a.child = t, t = n, n = a.child, e = l.child.memoizedState, e === null ? e = Rf(u) : (i = e.cachePool, i !== null ? (v = ll._currentValue, i = i.parent !== v ? { parent: v, pool: v } : i) : i = F0(), e = {
    baseLanes: e.baseLanes | u,
    cachePool: i
  }), n.memoizedState = e, n.childLanes = Xf(
    l,
    c,
    u
  ), a.memoizedState = Yf, t) : (za(a), u = l.child, l = u.sibling, u = oa(u, {
    mode: "visible",
    children: t.children
  }), u.return = a, u.sibling = null, l !== null && (c = a.deletions, c === null ? (a.deletions = [l], a.flags |= 16) : c.push(l)), a.child = u, a.memoizedState = null, u);
}
function Mc(l, a) {
  return a = Dc(
    { mode: "visible", children: a },
    l.mode
  ), a.return = l, l.child = a;
}
function Dc(l, a) {
  return fv(l, a, 0, null);
}
function Qf(l, a, u) {
  return Pa(a, l.child, null, u), l = Mc(
    a,
    a.pendingProps.children
  ), l.flags |= 2, a.memoizedState = null, l;
}
function qi(l, a, u) {
  l.lanes |= a;
  var t = l.alternate;
  t !== null && (t.lanes |= a), Oc(l.return, a, u);
}
function Gf(l, a, u, t, n) {
  var f = l.memoizedState;
  f === null ? l.memoizedState = {
    isBackwards: a,
    rendering: null,
    renderingStartTime: 0,
    last: t,
    tail: u,
    tailMode: n
  } : (f.isBackwards = a, f.rendering = null, f.renderingStartTime = 0, f.last = t, f.tail = u, f.tailMode = n);
}
function j1(l, a, u) {
  var t = a.pendingProps, n = t.revealOrder, f = t.tail;
  if (il(l, a, t.children, u), t = al.current, t & 2)
    t = t & 1 | 2, a.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = a.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && qi(l, u, a);
        else if (l.tag === 19)
          qi(l, u, a);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === a) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === a)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    t &= 1;
  }
  switch (L(al, t), n) {
    case "forwards":
      for (u = a.child, n = null; u !== null; )
        l = u.alternate, l !== null && Gn(l) === null && (n = u), u = u.sibling;
      u = n, u === null ? (n = a.child, a.child = null) : (n = u.sibling, u.sibling = null), Gf(
        a,
        !1,
        n,
        u,
        f
      );
      break;
    case "backwards":
      for (u = null, n = a.child, a.child = null; n !== null; ) {
        if (l = n.alternate, l !== null && Gn(l) === null) {
          a.child = n;
          break;
        }
        l = n.sibling, n.sibling = u, u = n, n = l;
      }
      Gf(
        a,
        !0,
        u,
        null,
        f
      );
      break;
    case "together":
      Gf(a, !1, null, null, void 0);
      break;
    default:
      a.memoizedState = null;
  }
  return a.child;
}
function ya(l, a, u) {
  if (l !== null && (a.dependencies = l.dependencies), Qa |= a.lanes, !(u & a.childLanes))
    if (l !== null) {
      if (Lt(
        l,
        a,
        u,
        !1
      ), (u & a.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && a.child !== l.child)
    throw Error(z(153));
  if (a.child !== null) {
    for (l = a.child, u = oa(l, l.pendingProps), a.child = u, u.return = a; l.sibling !== null; )
      l = l.sibling, u = u.sibling = oa(l, l.pendingProps), u.return = a;
    u.sibling = null;
  }
  return a.child;
}
function Ee(l, a) {
  return l.lanes & a ? !0 : (l = l.dependencies, !!(l !== null && Kn(l)));
}
function yy(l, a, u) {
  switch (a.tag) {
    case 3:
      on(a, a.stateNode.containerInfo), Ta(a, ll, l.memoizedState.cache), Ct();
      break;
    case 27:
    case 5:
      tc(a);
      break;
    case 4:
      on(a, a.stateNode.containerInfo);
      break;
    case 10:
      Ta(
        a,
        a.type,
        a.memoizedProps.value
      );
      break;
    case 13:
      var t = a.memoizedState;
      if (t !== null)
        return t.dehydrated !== null ? (za(a), a.flags |= 128, null) : u & a.child.childLanes ? Z1(l, a, u) : (za(a), l = ya(
          l,
          a,
          u
        ), l !== null ? l.sibling : null);
      za(a);
      break;
    case 19:
      var n = (l.flags & 128) !== 0;
      if (t = (u & a.childLanes) !== 0, t || (Lt(
        l,
        a,
        u,
        !1
      ), t = (u & a.childLanes) !== 0), n) {
        if (t)
          return j1(
            l,
            a,
            u
          );
        a.flags |= 128;
      }
      if (n = a.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), L(al, al.current), t) break;
      return null;
    case 22:
    case 23:
      return a.lanes = 0, G1(l, a, u);
    case 24:
      Ta(a, ll, l.memoizedState.cache);
  }
  return ya(l, a, u);
}
function V1(l, a, u) {
  if (l !== null)
    if (l.memoizedProps !== a.pendingProps)
      cl = !0;
    else {
      if (!Ee(l, u) && !(a.flags & 128))
        return cl = !1, yy(
          l,
          a,
          u
        );
      cl = !!(l.flags & 131072);
    }
  else
    cl = !1, X && a.flags & 1048576 && p0(a, Xn, a.index);
  switch (a.lanes = 0, a.tag) {
    case 16:
      l: {
        l = a.pendingProps;
        var t = a.elementType, n = t._init;
        if (t = n(t._payload), a.type = t, typeof t == "function")
          Oe(t) ? (l = lu(t, l), a.tag = 1, a = Hi(
            null,
            a,
            t,
            l,
            u
          )) : (a.tag = 0, a = Ec(
            null,
            a,
            t,
            l,
            u
          ));
        else {
          if (t != null) {
            if (n = t.$$typeof, n === wc) {
              a.tag = 11, a = Mi(
                null,
                a,
                t,
                l,
                u
              );
              break l;
            } else if (n === Wc) {
              a.tag = 14, a = Di(
                null,
                a,
                t,
                l,
                u
              );
              break l;
            }
          }
          throw a = ac(t) || t, Error(z(306, a, ""));
        }
      }
      return a;
    case 0:
      return Ec(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 1:
      return t = a.type, n = lu(
        t,
        a.pendingProps
      ), Hi(
        l,
        a,
        t,
        n,
        u
      );
    case 3:
      l: {
        if (on(
          a,
          a.stateNode.containerInfo
        ), l === null) throw Error(z(387));
        var f = a.pendingProps;
        n = a.memoizedState, t = n.element, oc(l, a), bt(a, f, null, u);
        var c = a.memoizedState;
        if (f = c.cache, Ta(a, ll, f), f !== n.cache && Hc(
          a,
          [ll],
          u,
          !0
        ), st(), f = c.element, n.isDehydrated)
          if (n = {
            element: f,
            isDehydrated: !1,
            cache: c.cache
          }, a.updateQueue.baseState = n, a.memoizedState = n, a.flags & 256) {
            a = oi(
              l,
              a,
              f,
              u
            );
            break l;
          } else if (f !== t) {
            t = Rl(
              Error(z(424)),
              a
            ), Ht(t), a = oi(
              l,
              a,
              f,
              u
            );
            break l;
          } else
            for (vl = Cl(
              a.stateNode.containerInfo.firstChild
            ), ml = a, X = !0, Vl = null, xl = !0, u = $0(
              a,
              null,
              f,
              u
            ), a.child = u; u; )
              u.flags = u.flags & -3 | 4096, u = u.sibling;
        else {
          if (Ct(), f === t) {
            a = ya(
              l,
              a,
              u
            );
            break l;
          }
          il(l, a, f, u);
        }
        a = a.child;
      }
      return a;
    case 26:
      return mt(l, a), l === null ? (u = wi(
        a.type,
        null,
        a.pendingProps,
        null
      )) ? a.memoizedState = u : X || (u = a.type, l = a.pendingProps, t = $n(
        Ua.current
      ).createElement(u), t[yl] = a, t[gl] = l, hl(t, u, l), fl(t), a.stateNode = t) : a.memoizedState = wi(
        a.type,
        l.memoizedProps,
        a.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return tc(a), l === null && X && (t = a.stateNode = Dv(
        a.type,
        a.pendingProps,
        Ua.current
      ), ml = a, xl = !0, vl = Cl(
        t.firstChild
      )), t = a.pendingProps.children, l !== null || X ? il(
        l,
        a,
        t,
        u
      ) : a.child = Pa(
        a,
        null,
        t,
        u
      ), mt(l, a), a.child;
    case 5:
      return l === null && X && ((n = t = vl) && (t = Ky(
        t,
        a.type,
        a.pendingProps,
        xl
      ), t !== null ? (a.stateNode = t, ml = a, vl = Cl(
        t.firstChild
      ), xl = !1, n = !0) : n = !1), n || ra(a)), tc(a), n = a.type, f = a.pendingProps, c = l !== null ? l.memoizedProps : null, t = f.children, Cc(n, f) ? t = null : c !== null && Cc(n, c) && (a.flags |= 32), a.memoizedState !== null && (n = he(
        l,
        a,
        ny,
        null,
        null,
        u
      ), Yt._currentValue = n), mt(l, a), il(l, a, t, u), a.child;
    case 6:
      return l === null && X && ((l = u = vl) && (u = xy(
        u,
        a.pendingProps,
        xl
      ), u !== null ? (a.stateNode = u, ml = a, vl = null, l = !0) : l = !1), l || ra(a)), null;
    case 13:
      return Z1(l, a, u);
    case 4:
      return on(
        a,
        a.stateNode.containerInfo
      ), t = a.pendingProps, l === null ? a.child = Pa(
        a,
        null,
        t,
        u
      ) : il(
        l,
        a,
        t,
        u
      ), a.child;
    case 11:
      return Mi(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 7:
      return il(
        l,
        a,
        a.pendingProps,
        u
      ), a.child;
    case 8:
      return il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 12:
      return il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 10:
      return t = a.pendingProps, Ta(a, a.type, t.value), il(
        l,
        a,
        t.children,
        u
      ), a.child;
    case 9:
      return n = a.type._context, t = a.pendingProps.children, au(a), n = dl(n), t = t(n), a.flags |= 1, il(l, a, t, u), a.child;
    case 14:
      return Di(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 15:
      return Q1(
        l,
        a,
        a.type,
        a.pendingProps,
        u
      );
    case 19:
      return j1(l, a, u);
    case 22:
      return G1(l, a, u);
    case 24:
      return au(a), t = dl(ll), l === null ? (n = ie(), n === null && (n = V, f = ee(), n.pooledCache = f, f.refCount++, f !== null && (n.pooledCacheLanes |= u), n = f), a.memoizedState = {
        parent: t,
        cache: n
      }, Me(a), Ta(a, ll, n)) : (l.lanes & u && (oc(l, a), bt(a, null, null, u), st()), n = l.memoizedState, f = a.memoizedState, n.parent !== t ? (n = { parent: t, cache: t }, a.memoizedState = n, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = n), Ta(a, ll, t)) : (t = f.cache, Ta(a, ll, t), t !== n.cache && Hc(
        a,
        [ll],
        u,
        !0
      ))), il(
        l,
        a,
        a.pendingProps.children,
        u
      ), a.child;
    case 29:
      throw a.pendingProps;
  }
  throw Error(z(156, a.tag));
}
var Uc = $l(null), eu = null, ea = null;
function Ta(l, a, u) {
  L(Uc, a._currentValue), a._currentValue = u;
}
function ia(l) {
  l._currentValue = Uc.current, el(Uc);
}
function Oc(l, a, u) {
  for (; l !== null; ) {
    var t = l.alternate;
    if ((l.childLanes & a) !== a ? (l.childLanes |= a, t !== null && (t.childLanes |= a)) : t !== null && (t.childLanes & a) !== a && (t.childLanes |= a), l === u) break;
    l = l.return;
  }
}
function Hc(l, a, u, t) {
  var n = l.child;
  for (n !== null && (n.return = l); n !== null; ) {
    var f = n.dependencies;
    if (f !== null) {
      var c = n.child;
      f = f.firstContext;
      l: for (; f !== null; ) {
        var e = f;
        f = n;
        for (var i = 0; i < a.length; i++)
          if (e.context === a[i]) {
            f.lanes |= u, e = f.alternate, e !== null && (e.lanes |= u), Oc(
              f.return,
              u,
              l
            ), t || (c = null);
            break l;
          }
        f = e.next;
      }
    } else if (n.tag === 18) {
      if (c = n.return, c === null) throw Error(z(341));
      c.lanes |= u, f = c.alternate, f !== null && (f.lanes |= u), Oc(c, u, l), c = null;
    } else c = n.child;
    if (c !== null) c.return = n;
    else
      for (c = n; c !== null; ) {
        if (c === l) {
          c = null;
          break;
        }
        if (n = c.sibling, n !== null) {
          n.return = c.return, c = n;
          break;
        }
        c = c.return;
      }
    n = c;
  }
}
function Lt(l, a, u, t) {
  l = null;
  for (var n = a, f = !1; n !== null; ) {
    if (!f) {
      if (n.flags & 524288) f = !0;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var c = n.alternate;
      if (c === null) throw Error(z(387));
      if (c = c.memoizedProps, c !== null) {
        var e = n.type;
        Ol(n.pendingProps.value, c.value) || (l !== null ? l.push(e) : l = [e]);
      }
    } else if (n === Hn.current) {
      if (c = n.alternate, c === null) throw Error(z(387));
      c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(Yt) : l = [Yt]);
    }
    n = n.return;
  }
  l !== null && Hc(
    a,
    l,
    u,
    t
  ), a.flags |= 262144;
}
function Kn(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!Ol(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function au(l) {
  eu = l, ea = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function dl(l) {
  return C1(eu, l);
}
function cn(l, a) {
  return eu === null && au(l), C1(l, a);
}
function C1(l, a) {
  var u = a._currentValue;
  if (a = { context: a, memoizedValue: u, next: null }, ea === null) {
    if (l === null) throw Error(z(308));
    ea = a, l.dependencies = { lanes: 0, firstContext: a }, l.flags |= 524288;
  } else ea = ea.next = a;
  return u;
}
var ga = !1;
function Me(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function oc(l, a) {
  l = l.updateQueue, a.updateQueue === l && (a.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function Oa(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Ha(l, a, u) {
  var t = l.updateQueue;
  if (t === null) return null;
  if (t = t.shared, J & 2) {
    var n = t.pending;
    return n === null ? a.next = a : (a.next = n.next, n.next = a), t.pending = a, a = Yn(l), L0(l, null, u), a;
  }
  return ff(l, t, a, u), Yn(l);
}
function St(l, a, u) {
  if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194176) !== 0)) {
    var t = a.lanes;
    t &= l.pendingLanes, u |= t, a.lanes = u, b0(l, u);
  }
}
function Zf(l, a) {
  var u = l.updateQueue, t = l.alternate;
  if (t !== null && (t = t.updateQueue, u === t)) {
    var n = null, f = null;
    if (u = u.firstBaseUpdate, u !== null) {
      do {
        var c = {
          lane: u.lane,
          tag: u.tag,
          payload: u.payload,
          callback: null,
          next: null
        };
        f === null ? n = f = c : f = f.next = c, u = u.next;
      } while (u !== null);
      f === null ? n = f = a : f = f.next = a;
    } else n = f = a;
    u = {
      baseState: t.baseState,
      firstBaseUpdate: n,
      lastBaseUpdate: f,
      shared: t.shared,
      callbacks: t.callbacks
    }, l.updateQueue = u;
    return;
  }
  l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = a : l.next = a, u.lastBaseUpdate = a;
}
var qc = !1;
function st() {
  if (qc) {
    var l = qu;
    if (l !== null) throw l;
  }
}
function bt(l, a, u, t) {
  qc = !1;
  var n = l.updateQueue;
  ga = !1;
  var f = n.firstBaseUpdate, c = n.lastBaseUpdate, e = n.shared.pending;
  if (e !== null) {
    n.shared.pending = null;
    var i = e, v = i.next;
    i.next = null, c === null ? f = v : c.next = v, c = i;
    var s = l.alternate;
    s !== null && (s = s.updateQueue, e = s.lastBaseUpdate, e !== c && (e === null ? s.firstBaseUpdate = v : e.next = v, s.lastBaseUpdate = i));
  }
  if (f !== null) {
    var b = n.baseState;
    c = 0, s = v = i = null, e = f;
    do {
      var d = e.lane & -536870913, S = d !== e.lane;
      if (S ? (R & d) === d : (t & d) === d) {
        d !== 0 && d === Gu && (qc = !0), s !== null && (s = s.next = {
          lane: 0,
          tag: e.tag,
          payload: e.payload,
          callback: null,
          next: null
        });
        l: {
          var T = l, U = e;
          d = a;
          var C = u;
          switch (U.tag) {
            case 1:
              if (T = U.payload, typeof T == "function") {
                b = T.call(C, b, d);
                break l;
              }
              b = T;
              break l;
            case 3:
              T.flags = T.flags & -65537 | 128;
            case 0:
              if (T = U.payload, d = typeof T == "function" ? T.call(C, b, d) : T, d == null) break l;
              b = x({}, b, d);
              break l;
            case 2:
              ga = !0;
          }
        }
        d = e.callback, d !== null && (l.flags |= 64, S && (l.flags |= 8192), S = n.callbacks, S === null ? n.callbacks = [d] : S.push(d));
      } else
        S = {
          lane: d,
          tag: e.tag,
          payload: e.payload,
          callback: e.callback,
          next: null
        }, s === null ? (v = s = S, i = b) : s = s.next = S, c |= d;
      if (e = e.next, e === null) {
        if (e = n.shared.pending, e === null)
          break;
        S = e, e = S.next, S.next = null, n.lastBaseUpdate = S, n.shared.pending = null;
      }
    } while (!0);
    s === null && (i = b), n.baseState = i, n.firstBaseUpdate = v, n.lastBaseUpdate = s, f === null && (n.shared.lanes = 0), Qa |= c, l.lanes = c, l.memoizedState = b;
  }
}
function K1(l, a) {
  if (typeof l != "function")
    throw Error(z(191, l));
  l.call(a);
}
function x1(l, a) {
  var u = l.callbacks;
  if (u !== null)
    for (l.callbacks = null, l = 0; l < u.length; l++)
      K1(u[l], a);
}
function pt(l, a) {
  try {
    var u = a.updateQueue, t = u !== null ? u.lastEffect : null;
    if (t !== null) {
      var n = t.next;
      u = n;
      do {
        if ((u.tag & l) === l) {
          t = void 0;
          var f = u.create, c = u.inst;
          t = f(), c.destroy = t;
        }
        u = u.next;
      } while (u !== n);
    }
  } catch (e) {
    Z(a, a.return, e);
  }
}
function Xa(l, a, u) {
  try {
    var t = a.updateQueue, n = t !== null ? t.lastEffect : null;
    if (n !== null) {
      var f = n.next;
      t = f;
      do {
        if ((t.tag & l) === l) {
          var c = t.inst, e = c.destroy;
          if (e !== void 0) {
            c.destroy = void 0, n = a;
            var i = u;
            try {
              e();
            } catch (v) {
              Z(
                n,
                i,
                v
              );
            }
          }
        }
        t = t.next;
      } while (t !== f);
    }
  } catch (v) {
    Z(a, a.return, v);
  }
}
function L1(l) {
  var a = l.updateQueue;
  if (a !== null) {
    var u = l.stateNode;
    try {
      x1(a, u);
    } catch (t) {
      Z(l, l.return, t);
    }
  }
}
function p1(l, a, u) {
  u.props = lu(
    l.type,
    l.memoizedProps
  ), u.state = l.memoizedState;
  try {
    u.componentWillUnmount();
  } catch (t) {
    Z(l, a, t);
  }
}
function pa(l, a) {
  try {
    var u = l.ref;
    if (u !== null) {
      var t = l.stateNode;
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var n = t;
          break;
        default:
          n = t;
      }
      typeof u == "function" ? l.refCleanup = u(n) : u.current = n;
    }
  } catch (f) {
    Z(l, a, f);
  }
}
function El(l, a) {
  var u = l.ref, t = l.refCleanup;
  if (u !== null)
    if (typeof t == "function")
      try {
        t();
      } catch (n) {
        Z(l, a, n);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof u == "function")
      try {
        u(null);
      } catch (n) {
        Z(l, a, n);
      }
    else u.current = null;
}
function J1(l) {
  var a = l.type, u = l.memoizedProps, t = l.stateNode;
  try {
    l: switch (a) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        u.autoFocus && t.focus();
        break l;
      case "img":
        u.src ? t.src = u.src : u.srcSet && (t.srcset = u.srcSet);
    }
  } catch (n) {
    Z(l, l.return, n);
  }
}
function Bi(l, a, u) {
  try {
    var t = l.stateNode;
    Gy(t, l.type, u, a), t[gl] = a;
  } catch (n) {
    Z(l, l.return, n);
  }
}
function w1(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 || l.tag === 4;
}
function jf(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || w1(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 27 && l.tag !== 18; ) {
      if (l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function Bc(l, a, u) {
  var t = l.tag;
  if (t === 5 || t === 6)
    l = l.stateNode, a ? u.nodeType === 8 ? u.parentNode.insertBefore(l, a) : u.insertBefore(l, a) : (u.nodeType === 8 ? (a = u.parentNode, a.insertBefore(l, u)) : (a = u, a.appendChild(l)), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = mf));
  else if (t !== 4 && t !== 27 && (l = l.child, l !== null))
    for (Bc(l, a, u), l = l.sibling; l !== null; )
      Bc(l, a, u), l = l.sibling;
}
function xn(l, a, u) {
  var t = l.tag;
  if (t === 5 || t === 6)
    l = l.stateNode, a ? u.insertBefore(l, a) : u.appendChild(l);
  else if (t !== 4 && t !== 27 && (l = l.child, l !== null))
    for (xn(l, a, u), l = l.sibling; l !== null; )
      xn(l, a, u), l = l.sibling;
}
var la = !1, w = !1, Vf = !1, Ni = typeof WeakSet == "function" ? WeakSet : Set, nl = null, _i = !1;
function dy(l, a) {
  if (l = l.containerInfo, jc = Pn, l = G0(l), ae(l)) {
    if ("selectionStart" in l)
      var u = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        u = (u = l.ownerDocument) && u.defaultView || window;
        var t = u.getSelection && u.getSelection();
        if (t && t.rangeCount !== 0) {
          u = t.anchorNode;
          var n = t.anchorOffset, f = t.focusNode;
          t = t.focusOffset;
          try {
            u.nodeType, f.nodeType;
          } catch {
            u = null;
            break l;
          }
          var c = 0, e = -1, i = -1, v = 0, s = 0, b = l, d = null;
          a: for (; ; ) {
            for (var S; b !== u || n !== 0 && b.nodeType !== 3 || (e = c + n), b !== f || t !== 0 && b.nodeType !== 3 || (i = c + t), b.nodeType === 3 && (c += b.nodeValue.length), (S = b.firstChild) !== null; )
              d = b, b = S;
            for (; ; ) {
              if (b === l) break a;
              if (d === u && ++v === n && (e = c), d === f && ++s === t && (i = c), (S = b.nextSibling) !== null) break;
              b = d, d = b.parentNode;
            }
            b = S;
          }
          u = e === -1 || i === -1 ? null : { start: e, end: i };
        } else u = null;
      }
    u = u || { start: 0, end: 0 };
  } else u = null;
  for (Vc = { focusedElem: l, selectionRange: u }, Pn = !1, nl = a; nl !== null; )
    if (a = nl, l = a.child, (a.subtreeFlags & 1028) !== 0 && l !== null)
      l.return = a, nl = l;
    else
      for (; nl !== null; ) {
        switch (a = nl, f = a.alternate, l = a.flags, a.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (l & 1024 && f !== null) {
              l = void 0, u = a, n = f.memoizedProps, f = f.memoizedState, t = u.stateNode;
              try {
                var T = lu(
                  u.type,
                  n,
                  u.elementType === u.type
                );
                l = t.getSnapshotBeforeUpdate(
                  T,
                  f
                ), t.__reactInternalSnapshotBeforeUpdate = l;
              } catch (U) {
                Z(
                  u,
                  u.return,
                  U
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = a.stateNode.containerInfo, u = l.nodeType, u === 9)
                Kc(l);
              else if (u === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Kc(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (l & 1024) throw Error(z(163));
        }
        if (l = a.sibling, l !== null) {
          l.return = a.return, nl = l;
          break;
        }
        nl = a.return;
      }
  return T = _i, _i = !1, T;
}
function W1(l, a, u) {
  var t = u.flags;
  switch (u.tag) {
    case 0:
    case 11:
    case 15:
      Pl(l, u), t & 4 && pt(5, u);
      break;
    case 1:
      if (Pl(l, u), t & 4)
        if (l = u.stateNode, a === null)
          try {
            l.componentDidMount();
          } catch (e) {
            Z(u, u.return, e);
          }
        else {
          var n = lu(
            u.type,
            a.memoizedProps
          );
          a = a.memoizedState;
          try {
            l.componentDidUpdate(
              n,
              a,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (e) {
            Z(
              u,
              u.return,
              e
            );
          }
        }
      t & 64 && L1(u), t & 512 && pa(u, u.return);
      break;
    case 3:
      if (Pl(l, u), t & 64 && (t = u.updateQueue, t !== null)) {
        if (l = null, u.child !== null)
          switch (u.child.tag) {
            case 27:
            case 5:
              l = u.child.stateNode;
              break;
            case 1:
              l = u.child.stateNode;
          }
        try {
          x1(t, l);
        } catch (e) {
          Z(u, u.return, e);
        }
      }
      break;
    case 26:
      Pl(l, u), t & 512 && pa(u, u.return);
      break;
    case 27:
    case 5:
      Pl(l, u), a === null && t & 4 && J1(u), t & 512 && pa(u, u.return);
      break;
    case 12:
      Pl(l, u);
      break;
    case 13:
      Pl(l, u), t & 4 && F1(l, u);
      break;
    case 22:
      if (n = u.memoizedState !== null || la, !n) {
        a = a !== null && a.memoizedState !== null || w;
        var f = la, c = w;
        la = n, (w = a) && !c ? sa(
          l,
          u,
          (u.subtreeFlags & 8772) !== 0
        ) : Pl(l, u), la = f, w = c;
      }
      t & 512 && (u.memoizedProps.mode === "manual" ? pa(u, u.return) : El(u, u.return));
      break;
    default:
      Pl(l, u);
  }
}
function $1(l) {
  var a = l.alternate;
  a !== null && (l.alternate = null, $1(a)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (a = l.stateNode, a !== null && kc(a)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var r = null, Al = !1;
function rl(l, a, u) {
  for (u = u.child; u !== null; )
    k1(l, a, u), u = u.sibling;
}
function k1(l, a, u) {
  if (Ml && typeof Ml.onCommitFiberUnmount == "function")
    try {
      Ml.onCommitFiberUnmount(Gt, u);
    } catch {
    }
  switch (u.tag) {
    case 26:
      w || El(u, a), rl(
        l,
        a,
        u
      ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
      break;
    case 27:
      w || El(u, a);
      var t = r, n = Al;
      for (r = u.stateNode, rl(
        l,
        a,
        u
      ), u = u.stateNode, a = u.attributes; a.length; )
        u.removeAttributeNode(a[0]);
      kc(u), r = t, Al = n;
      break;
    case 5:
      w || El(u, a);
    case 6:
      n = r;
      var f = Al;
      if (r = null, rl(
        l,
        a,
        u
      ), r = n, Al = f, r !== null)
        if (Al)
          try {
            l = r, t = u.stateNode, l.nodeType === 8 ? l.parentNode.removeChild(t) : l.removeChild(t);
          } catch (c) {
            Z(
              u,
              a,
              c
            );
          }
        else
          try {
            r.removeChild(u.stateNode);
          } catch (c) {
            Z(
              u,
              a,
              c
            );
          }
      break;
    case 18:
      r !== null && (Al ? (a = r, u = u.stateNode, a.nodeType === 8 ? rf(
        a.parentNode,
        u
      ) : a.nodeType === 1 && rf(a, u), Qt(a)) : rf(r, u.stateNode));
      break;
    case 4:
      t = r, n = Al, r = u.stateNode.containerInfo, Al = !0, rl(
        l,
        a,
        u
      ), r = t, Al = n;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      w || Xa(2, u, a), w || Xa(4, u, a), rl(
        l,
        a,
        u
      );
      break;
    case 1:
      w || (El(u, a), t = u.stateNode, typeof t.componentWillUnmount == "function" && p1(
        u,
        a,
        t
      )), rl(
        l,
        a,
        u
      );
      break;
    case 21:
      rl(
        l,
        a,
        u
      );
      break;
    case 22:
      w || El(u, a), w = (t = w) || u.memoizedState !== null, rl(
        l,
        a,
        u
      ), w = t;
      break;
    default:
      rl(
        l,
        a,
        u
      );
  }
}
function F1(l, a) {
  if (a.memoizedState === null && (l = a.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      Qt(l);
    } catch (u) {
      Z(a, a.return, u);
    }
}
function my(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var a = l.stateNode;
      return a === null && (a = l.stateNode = new Ni()), a;
    case 22:
      return l = l.stateNode, a = l._retryCache, a === null && (a = l._retryCache = new Ni()), a;
    default:
      throw Error(z(435, l.tag));
  }
}
function Cf(l, a) {
  var u = my(l);
  a.forEach(function(t) {
    var n = Hy.bind(null, l, t);
    u.has(t) || (u.add(t), t.then(n, n));
  });
}
function Hl(l, a) {
  var u = a.deletions;
  if (u !== null)
    for (var t = 0; t < u.length; t++) {
      var n = u[t], f = l, c = a, e = c;
      l: for (; e !== null; ) {
        switch (e.tag) {
          case 27:
          case 5:
            r = e.stateNode, Al = !1;
            break l;
          case 3:
            r = e.stateNode.containerInfo, Al = !0;
            break l;
          case 4:
            r = e.stateNode.containerInfo, Al = !0;
            break l;
        }
        e = e.return;
      }
      if (r === null) throw Error(z(160));
      k1(f, c, n), r = null, Al = !1, f = n.alternate, f !== null && (f.return = null), n.return = null;
    }
  if (a.subtreeFlags & 13878)
    for (a = a.child; a !== null; )
      r1(a, l), a = a.sibling;
}
var jl = null;
function r1(l, a) {
  var u = l.alternate, t = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Hl(a, l), ol(l), t & 4 && (Xa(3, l, l.return), pt(3, l), Xa(5, l, l.return));
      break;
    case 1:
      Hl(a, l), ol(l), t & 512 && (w || u === null || El(u, u.return)), t & 64 && la && (l = l.updateQueue, l !== null && (t = l.callbacks, t !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? t : u.concat(t))));
      break;
    case 26:
      var n = jl;
      if (Hl(a, l), ol(l), t & 512 && (w || u === null || El(u, u.return)), t & 4) {
        var f = u !== null ? u.memoizedState : null;
        if (t = l.memoizedState, u === null)
          if (t === null)
            if (l.stateNode === null) {
              l: {
                t = l.type, u = l.memoizedProps, n = n.ownerDocument || n;
                a: switch (t) {
                  case "title":
                    f = n.getElementsByTagName("title")[0], (!f || f[Mt] || f[yl] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = n.createElement(t), n.head.insertBefore(
                      f,
                      n.querySelector("head > title")
                    )), hl(f, t, u), f[yl] = l, fl(f), t = f;
                    break l;
                  case "link":
                    var c = $i(
                      "link",
                      "href",
                      n
                    ).get(t + (u.href || ""));
                    if (c) {
                      for (var e = 0; e < c.length; e++)
                        if (f = c[e], f.getAttribute("href") === (u.href == null ? null : u.href) && f.getAttribute("rel") === (u.rel == null ? null : u.rel) && f.getAttribute("title") === (u.title == null ? null : u.title) && f.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                          c.splice(e, 1);
                          break a;
                        }
                    }
                    f = n.createElement(t), hl(f, t, u), n.head.appendChild(f);
                    break;
                  case "meta":
                    if (c = $i(
                      "meta",
                      "content",
                      n
                    ).get(t + (u.content || ""))) {
                      for (e = 0; e < c.length; e++)
                        if (f = c[e], f.getAttribute("content") === (u.content == null ? null : "" + u.content) && f.getAttribute("name") === (u.name == null ? null : u.name) && f.getAttribute("property") === (u.property == null ? null : u.property) && f.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && f.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                          c.splice(e, 1);
                          break a;
                        }
                    }
                    f = n.createElement(t), hl(f, t, u), n.head.appendChild(f);
                    break;
                  default:
                    throw Error(z(468, t));
                }
                f[yl] = l, fl(f), t = f;
              }
              l.stateNode = t;
            } else
              ki(
                n,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = Wi(
              n,
              t,
              l.memoizedProps
            );
        else
          f !== t ? (f === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : f.count--, t === null ? ki(
            n,
            l.type,
            l.stateNode
          ) : Wi(
            n,
            t,
            l.memoizedProps
          )) : t === null && l.stateNode !== null && Bi(
            l,
            l.memoizedProps,
            u.memoizedProps
          );
      }
      break;
    case 27:
      if (t & 4 && l.alternate === null) {
        n = l.stateNode, f = l.memoizedProps;
        try {
          for (var i = n.firstChild; i; ) {
            var v = i.nextSibling, s = i.nodeName;
            i[Mt] || s === "HEAD" || s === "BODY" || s === "SCRIPT" || s === "STYLE" || s === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = v;
          }
          for (var b = l.type, d = n.attributes; d.length; )
            n.removeAttributeNode(d[0]);
          hl(n, b, f), n[yl] = l, n[gl] = f;
        } catch (T) {
          Z(l, l.return, T);
        }
      }
    case 5:
      if (Hl(a, l), ol(l), t & 512 && (w || u === null || El(u, u.return)), l.flags & 32) {
        n = l.stateNode;
        try {
          Xu(n, "");
        } catch (T) {
          Z(l, l.return, T);
        }
      }
      t & 4 && l.stateNode != null && (n = l.memoizedProps, Bi(
        l,
        n,
        u !== null ? u.memoizedProps : n
      )), t & 1024 && (Vf = !0);
      break;
    case 6:
      if (Hl(a, l), ol(l), t & 4) {
        if (l.stateNode === null)
          throw Error(z(162));
        t = l.memoizedProps, u = l.stateNode;
        try {
          u.nodeValue = t;
        } catch (T) {
          Z(l, l.return, T);
        }
      }
      break;
    case 3:
      if (Un = null, n = jl, jl = kn(a.containerInfo), Hl(a, l), jl = n, ol(l), t & 4 && u !== null && u.memoizedState.isDehydrated)
        try {
          Qt(a.containerInfo);
        } catch (T) {
          Z(l, l.return, T);
        }
      Vf && (Vf = !1, P1(l));
      break;
    case 4:
      t = jl, jl = kn(
        l.stateNode.containerInfo
      ), Hl(a, l), ol(l), jl = t;
      break;
    case 12:
      Hl(a, l), ol(l);
      break;
    case 13:
      Hl(a, l), ol(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (qe = Jl()), t & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, Cf(l, t)));
      break;
    case 22:
      if (t & 512 && (w || u === null || El(u, u.return)), i = l.memoizedState !== null, v = u !== null && u.memoizedState !== null, s = la, b = w, la = s || i, w = b || v, Hl(a, l), w = b, la = s, ol(l), a = l.stateNode, a._current = l, a._visibility &= -3, a._visibility |= a._pendingVisibility & 2, t & 8192 && (a._visibility = i ? a._visibility & -2 : a._visibility | 1, i && (a = la || w, u === null || v || a || hu(l)), l.memoizedProps === null || l.memoizedProps.mode !== "manual"))
        l: for (u = null, a = l; ; ) {
          if (a.tag === 5 || a.tag === 26 || a.tag === 27) {
            if (u === null) {
              v = u = a;
              try {
                if (n = v.stateNode, i)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty(
                    "display",
                    "none",
                    "important"
                  ) : f.display = "none";
                else {
                  c = v.stateNode, e = v.memoizedProps.style;
                  var S = e != null && e.hasOwnProperty("display") ? e.display : null;
                  c.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                }
              } catch (T) {
                Z(v, v.return, T);
              }
            }
          } else if (a.tag === 6) {
            if (u === null) {
              v = a;
              try {
                v.stateNode.nodeValue = i ? "" : v.memoizedProps;
              } catch (T) {
                Z(v, v.return, T);
              }
            }
          } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === l) && a.child !== null) {
            a.child.return = a, a = a.child;
            continue;
          }
          if (a === l) break l;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === l) break l;
            u === a && (u = null), a = a.return;
          }
          u === a && (u = null), a.sibling.return = a.return, a = a.sibling;
        }
      t & 4 && (t = l.updateQueue, t !== null && (u = t.retryQueue, u !== null && (t.retryQueue = null, Cf(l, u))));
      break;
    case 19:
      Hl(a, l), ol(l), t & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, Cf(l, t)));
      break;
    case 21:
      break;
    default:
      Hl(a, l), ol(l);
  }
}
function ol(l) {
  var a = l.flags;
  if (a & 2) {
    try {
      if (l.tag !== 27) {
        l: {
          for (var u = l.return; u !== null; ) {
            if (w1(u)) {
              var t = u;
              break l;
            }
            u = u.return;
          }
          throw Error(z(160));
        }
        switch (t.tag) {
          case 27:
            var n = t.stateNode, f = jf(l);
            xn(l, f, n);
            break;
          case 5:
            var c = t.stateNode;
            t.flags & 32 && (Xu(c, ""), t.flags &= -33);
            var e = jf(l);
            xn(l, e, c);
            break;
          case 3:
          case 4:
            var i = t.stateNode.containerInfo, v = jf(l);
            Bc(
              l,
              v,
              i
            );
            break;
          default:
            throw Error(z(161));
        }
      }
    } catch (s) {
      Z(l, l.return, s);
    }
    l.flags &= -3;
  }
  a & 4096 && (l.flags &= -4097);
}
function P1(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var a = l;
      P1(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), l = l.sibling;
    }
}
function Pl(l, a) {
  if (a.subtreeFlags & 8772)
    for (a = a.child; a !== null; )
      W1(l, a.alternate, a), a = a.sibling;
}
function hu(l) {
  for (l = l.child; l !== null; ) {
    var a = l;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xa(4, a, a.return), hu(a);
        break;
      case 1:
        El(a, a.return);
        var u = a.stateNode;
        typeof u.componentWillUnmount == "function" && p1(
          a,
          a.return,
          u
        ), hu(a);
        break;
      case 26:
      case 27:
      case 5:
        El(a, a.return), hu(a);
        break;
      case 22:
        El(a, a.return), a.memoizedState === null && hu(a);
        break;
      default:
        hu(a);
    }
    l = l.sibling;
  }
}
function sa(l, a, u) {
  for (u = u && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
    var t = a.alternate, n = l, f = a, c = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        sa(
          n,
          f,
          u
        ), pt(4, f);
        break;
      case 1:
        if (sa(
          n,
          f,
          u
        ), t = f, n = t.stateNode, typeof n.componentDidMount == "function")
          try {
            n.componentDidMount();
          } catch (v) {
            Z(t, t.return, v);
          }
        if (t = f, n = t.updateQueue, n !== null) {
          var e = t.stateNode;
          try {
            var i = n.shared.hiddenCallbacks;
            if (i !== null)
              for (n.shared.hiddenCallbacks = null, n = 0; n < i.length; n++)
                K1(i[n], e);
          } catch (v) {
            Z(t, t.return, v);
          }
        }
        u && c & 64 && L1(f), pa(f, f.return);
        break;
      case 26:
      case 27:
      case 5:
        sa(
          n,
          f,
          u
        ), u && t === null && c & 4 && J1(f), pa(f, f.return);
        break;
      case 12:
        sa(
          n,
          f,
          u
        );
        break;
      case 13:
        sa(
          n,
          f,
          u
        ), u && c & 4 && F1(n, f);
        break;
      case 22:
        f.memoizedState === null && sa(
          n,
          f,
          u
        ), pa(f, f.return);
        break;
      default:
        sa(
          n,
          f,
          u
        );
    }
    a = a.sibling;
  }
}
function De(l, a) {
  var u = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Kt(u));
}
function Ue(l, a) {
  l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Kt(l));
}
function Sa(l, a, u, t) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; )
      I1(
        l,
        a,
        u,
        t
      ), a = a.sibling;
}
function I1(l, a, u, t) {
  var n = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      Sa(
        l,
        a,
        u,
        t
      ), n & 2048 && pt(9, a);
      break;
    case 3:
      Sa(
        l,
        a,
        u,
        t
      ), n & 2048 && (l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Kt(l)));
      break;
    case 12:
      if (n & 2048) {
        Sa(
          l,
          a,
          u,
          t
        ), l = a.stateNode;
        try {
          var f = a.memoizedProps, c = f.id, e = f.onPostCommit;
          typeof e == "function" && e(
            c,
            a.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          Z(a, a.return, i);
        }
      } else
        Sa(
          l,
          a,
          u,
          t
        );
      break;
    case 23:
      break;
    case 22:
      f = a.stateNode, a.memoizedState !== null ? f._visibility & 4 ? Sa(
        l,
        a,
        u,
        t
      ) : gt(l, a) : f._visibility & 4 ? Sa(
        l,
        a,
        u,
        t
      ) : (f._visibility |= 4, yu(
        l,
        a,
        u,
        t,
        (a.subtreeFlags & 10256) !== 0
      )), n & 2048 && De(
        a.alternate,
        a
      );
      break;
    case 24:
      Sa(
        l,
        a,
        u,
        t
      ), n & 2048 && Ue(a.alternate, a);
      break;
    default:
      Sa(
        l,
        a,
        u,
        t
      );
  }
}
function yu(l, a, u, t, n) {
  for (n = n && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
    var f = l, c = a, e = u, i = t, v = c.flags;
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
        yu(
          f,
          c,
          e,
          i,
          n
        ), pt(8, c);
        break;
      case 23:
        break;
      case 22:
        var s = c.stateNode;
        c.memoizedState !== null ? s._visibility & 4 ? yu(
          f,
          c,
          e,
          i,
          n
        ) : gt(
          f,
          c
        ) : (s._visibility |= 4, yu(
          f,
          c,
          e,
          i,
          n
        )), n && v & 2048 && De(
          c.alternate,
          c
        );
        break;
      case 24:
        yu(
          f,
          c,
          e,
          i,
          n
        ), n && v & 2048 && Ue(c.alternate, c);
        break;
      default:
        yu(
          f,
          c,
          e,
          i,
          n
        );
    }
    a = a.sibling;
  }
}
function gt(l, a) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; ) {
      var u = l, t = a, n = t.flags;
      switch (t.tag) {
        case 22:
          gt(u, t), n & 2048 && De(
            t.alternate,
            t
          );
          break;
        case 24:
          gt(u, t), n & 2048 && Ue(t.alternate, t);
          break;
        default:
          gt(u, t);
      }
      a = a.sibling;
    }
}
var ft = 8192;
function iu(l) {
  if (l.subtreeFlags & ft)
    for (l = l.child; l !== null; )
      lv(l), l = l.sibling;
}
function lv(l) {
  switch (l.tag) {
    case 26:
      iu(l), l.flags & ft && l.memoizedState !== null && ad(
        jl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      iu(l);
      break;
    case 3:
    case 4:
      var a = jl;
      jl = kn(l.stateNode.containerInfo), iu(l), jl = a;
      break;
    case 22:
      l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ft, ft = 16777216, iu(l), ft = a) : iu(l));
      break;
    default:
      iu(l);
  }
}
function av(l) {
  var a = l.alternate;
  if (a !== null && (l = a.child, l !== null)) {
    a.child = null;
    do
      a = l.sibling, l.sibling = null, l = a;
    while (l !== null);
  }
}
function Pu(l) {
  var a = l.deletions;
  if (l.flags & 16) {
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var t = a[u];
        nl = t, tv(
          t,
          l
        );
      }
    av(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      uv(l), l = l.sibling;
}
function uv(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      Pu(l), l.flags & 2048 && Xa(9, l, l.return);
      break;
    case 3:
      Pu(l);
      break;
    case 12:
      Pu(l);
      break;
    case 22:
      var a = l.stateNode;
      l.memoizedState !== null && a._visibility & 4 && (l.return === null || l.return.tag !== 13) ? (a._visibility &= -5, En(l)) : Pu(l);
      break;
    default:
      Pu(l);
  }
}
function En(l) {
  var a = l.deletions;
  if (l.flags & 16) {
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var t = a[u];
        nl = t, tv(
          t,
          l
        );
      }
    av(l);
  }
  for (l = l.child; l !== null; ) {
    switch (a = l, a.tag) {
      case 0:
      case 11:
      case 15:
        Xa(8, a, a.return), En(a);
        break;
      case 22:
        u = a.stateNode, u._visibility & 4 && (u._visibility &= -5, En(a));
        break;
      default:
        En(a);
    }
    l = l.sibling;
  }
}
function tv(l, a) {
  for (; nl !== null; ) {
    var u = nl;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Xa(8, u, a);
        break;
      case 23:
      case 22:
        if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
          var t = u.memoizedState.cachePool.pool;
          t != null && t.refCount++;
        }
        break;
      case 24:
        Kt(u.memoizedState.cache);
    }
    if (t = u.child, t !== null) t.return = u, nl = t;
    else
      l: for (u = l; nl !== null; ) {
        t = nl;
        var n = t.sibling, f = t.return;
        if ($1(t), t === u) {
          nl = null;
          break l;
        }
        if (n !== null) {
          n.return = f, nl = n;
          break l;
        }
        nl = f;
      }
  }
}
function Sy(l, a, u, t) {
  this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = t, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Xl(l, a, u, t) {
  return new Sy(l, a, u, t);
}
function Oe(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function oa(l, a) {
  var u = l.alternate;
  return u === null ? (u = Xl(
    l.tag,
    a,
    l.key,
    l.mode
  ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = a, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 31457280, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, a = l.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
}
function nv(l, a) {
  l.flags &= 31457282;
  var u = l.alternate;
  return u === null ? (l.childLanes = 0, l.lanes = a, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, a = u.dependencies, l.dependencies = a === null ? null : {
    lanes: a.lanes,
    firstContext: a.firstContext
  }), l;
}
function Mn(l, a, u, t, n, f) {
  var c = 0;
  if (t = l, typeof l == "function") Oe(l) && (c = 1);
  else if (typeof l == "string")
    c = Iy(
      l,
      u,
      pl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case mu:
        return $a(u.children, n, f, a);
      case f0:
        c = 8, n |= 24;
        break;
      case Pf:
        return l = Xl(12, u, a, n | 2), l.elementType = Pf, l.lanes = f, l;
      case If:
        return l = Xl(13, u, a, n), l.elementType = If, l.lanes = f, l;
      case lc:
        return l = Xl(19, u, a, n), l.elementType = lc, l.lanes = f, l;
      case e0:
        return fv(u, n, f, a);
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case Vv:
            case ta:
              c = 10;
              break l;
            case c0:
              c = 9;
              break l;
            case wc:
              c = 11;
              break l;
            case Wc:
              c = 14;
              break l;
            case ba:
              c = 16, t = null;
              break l;
          }
        c = 29, u = Error(
          z(130, l === null ? "null" : typeof l, "")
        ), t = null;
    }
  return a = Xl(c, u, a, n), a.elementType = l, a.type = t, a.lanes = f, a;
}
function $a(l, a, u, t) {
  return l = Xl(7, l, t, a), l.lanes = u, l;
}
function fv(l, a, u, t) {
  l = Xl(22, l, t, a), l.elementType = e0, l.lanes = u;
  var n = {
    _visibility: 1,
    _pendingVisibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function() {
      var f = n._current;
      if (f === null) throw Error(z(456));
      if (!(n._pendingVisibility & 2)) {
        var c = Ya(f, 2);
        c !== null && (n._pendingVisibility |= 2, Sl(c, f, 2));
      }
    },
    attach: function() {
      var f = n._current;
      if (f === null) throw Error(z(456));
      if (n._pendingVisibility & 2) {
        var c = Ya(f, 2);
        c !== null && (n._pendingVisibility &= -3, Sl(c, f, 2));
      }
    }
  };
  return l.stateNode = n, l;
}
function Kf(l, a, u) {
  return l = Xl(6, l, null, a), l.lanes = u, l;
}
function xf(l, a, u) {
  return a = Xl(
    4,
    l.children !== null ? l.children : [],
    l.key,
    a
  ), a.lanes = u, a.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, a;
}
function Il(l) {
  l.flags |= 4;
}
function Yi(l, a) {
  if (a.type !== "stylesheet" || a.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Hv(a)) {
    if (a = Gl.current, a !== null && ((R & 4194176) === R ? wl !== null : (R & 62914560) !== R && !(R & 536870912) || a !== wl))
      throw ht = mc, J0;
    l.flags |= 8192;
  }
}
function en(l, a) {
  a !== null && (l.flags |= 4), l.flags & 16384 && (a = l.tag !== 22 ? S0() : 536870912, l.lanes |= a, ju |= a);
}
function Iu(l, a) {
  if (!X)
    switch (l.tailMode) {
      case "hidden":
        a = l.tail;
        for (var u = null; a !== null; )
          a.alternate !== null && (u = a), a = a.sibling;
        u === null ? l.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = l.tail;
        for (var t = null; u !== null; )
          u.alternate !== null && (t = u), u = u.sibling;
        t === null ? a || l.tail === null ? l.tail = null : l.tail.sibling = null : t.sibling = null;
    }
}
function p(l) {
  var a = l.alternate !== null && l.alternate.child === l.child, u = 0, t = 0;
  if (a)
    for (var n = l.child; n !== null; )
      u |= n.lanes | n.childLanes, t |= n.subtreeFlags & 31457280, t |= n.flags & 31457280, n.return = l, n = n.sibling;
  else
    for (n = l.child; n !== null; )
      u |= n.lanes | n.childLanes, t |= n.subtreeFlags, t |= n.flags, n.return = l, n = n.sibling;
  return l.subtreeFlags |= t, l.childLanes = u, a;
}
function sy(l, a, u) {
  var t = a.pendingProps;
  switch (fe(a), a.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return p(a), null;
    case 1:
      return p(a), null;
    case 3:
      return u = a.stateNode, t = null, l !== null && (t = l.memoizedState.cache), a.memoizedState.cache !== t && (a.flags |= 2048), ia(ll), Yu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Fu(a) ? Il(a) : l === null || l.memoizedState.isDehydrated && !(a.flags & 256) || (a.flags |= 1024, Vl !== null && (Xc(Vl), Vl = null))), p(a), null;
    case 26:
      return u = a.memoizedState, l === null ? (Il(a), u !== null ? (p(a), Yi(a, u)) : (p(a), a.flags &= -16777217)) : u ? u !== l.memoizedState ? (Il(a), p(a), Yi(a, u)) : (p(a), a.flags &= -16777217) : (l.memoizedProps !== t && Il(a), p(a), a.flags &= -16777217), null;
    case 27:
      qn(a), u = Ua.current;
      var n = a.type;
      if (l !== null && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (!t) {
          if (a.stateNode === null)
            throw Error(z(166));
          return p(a), null;
        }
        l = pl.current, Fu(a) ? ii(a) : (l = Dv(n, t, u), a.stateNode = l, Il(a));
      }
      return p(a), null;
    case 5:
      if (qn(a), u = a.type, l !== null && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (!t) {
          if (a.stateNode === null)
            throw Error(z(166));
          return p(a), null;
        }
        if (l = pl.current, Fu(a))
          ii(a);
        else {
          switch (n = $n(
            Ua.current
          ), l) {
            case 1:
              l = n.createElementNS(
                "http://www.w3.org/2000/svg",
                u
              );
              break;
            case 2:
              l = n.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                u
              );
              break;
            default:
              switch (u) {
                case "svg":
                  l = n.createElementNS(
                    "http://www.w3.org/2000/svg",
                    u
                  );
                  break;
                case "math":
                  l = n.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    u
                  );
                  break;
                case "script":
                  l = n.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof t.is == "string" ? n.createElement("select", { is: t.is }) : n.createElement("select"), t.multiple ? l.multiple = !0 : t.size && (l.size = t.size);
                  break;
                default:
                  l = typeof t.is == "string" ? n.createElement(u, { is: t.is }) : n.createElement(u);
              }
          }
          l[yl] = a, l[gl] = t;
          l: for (n = a.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6)
              l.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === a) break l;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === a)
                break l;
              n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
          }
          a.stateNode = l;
          l: switch (hl(l, u, t), u) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!t.autoFocus;
              break l;
            case "img":
              l = !0;
              break l;
            default:
              l = !1;
          }
          l && Il(a);
        }
      }
      return p(a), a.flags &= -16777217, null;
    case 6:
      if (l && a.stateNode != null)
        l.memoizedProps !== t && Il(a);
      else {
        if (typeof t != "string" && a.stateNode === null)
          throw Error(z(166));
        if (l = Ua.current, Fu(a)) {
          if (l = a.stateNode, u = a.memoizedProps, t = null, n = ml, n !== null)
            switch (n.tag) {
              case 27:
              case 5:
                t = n.memoizedProps;
            }
          l[yl] = a, l = !!(l.nodeValue === u || t !== null && t.suppressHydrationWarning === !0 || Tv(l.nodeValue, u)), l || ra(a);
        } else
          l = $n(l).createTextNode(
            t
          ), l[yl] = a, a.stateNode = l;
      }
      return p(a), null;
    case 13:
      if (t = a.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (n = Fu(a), t !== null && t.dehydrated !== null) {
          if (l === null) {
            if (!n) throw Error(z(318));
            if (n = a.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(z(317));
            n[yl] = a;
          } else
            Ct(), !(a.flags & 128) && (a.memoizedState = null), a.flags |= 4;
          p(a), n = !1;
        } else
          Vl !== null && (Xc(Vl), Vl = null), n = !0;
        if (!n)
          return a.flags & 256 ? (ca(a), a) : (ca(a), null);
      }
      if (ca(a), a.flags & 128)
        return a.lanes = u, a;
      if (u = t !== null, l = l !== null && l.memoizedState !== null, u) {
        t = a.child, n = null, t.alternate !== null && t.alternate.memoizedState !== null && t.alternate.memoizedState.cachePool !== null && (n = t.alternate.memoizedState.cachePool.pool);
        var f = null;
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (f = t.memoizedState.cachePool.pool), f !== n && (t.flags |= 2048);
      }
      return u !== l && u && (a.child.flags |= 8192), en(a, a.updateQueue), p(a), null;
    case 4:
      return Yu(), l === null && _e(a.stateNode.containerInfo), p(a), null;
    case 10:
      return ia(a.type), p(a), null;
    case 19:
      if (el(al), n = a.memoizedState, n === null) return p(a), null;
      if (t = (a.flags & 128) !== 0, f = n.rendering, f === null)
        if (t) Iu(n, !1);
        else {
          if (W !== 0 || l !== null && l.flags & 128)
            for (l = a.child; l !== null; ) {
              if (f = Gn(l), f !== null) {
                for (a.flags |= 128, Iu(n, !1), l = f.updateQueue, a.updateQueue = l, en(a, l), a.subtreeFlags = 0, l = u, u = a.child; u !== null; )
                  nv(u, l), u = u.sibling;
                return L(
                  al,
                  al.current & 1 | 2
                ), a.child;
              }
              l = l.sibling;
            }
          n.tail !== null && Jl() > Ln && (a.flags |= 128, t = !0, Iu(n, !1), a.lanes = 4194304);
        }
      else {
        if (!t)
          if (l = Gn(f), l !== null) {
            if (a.flags |= 128, t = !0, l = l.updateQueue, a.updateQueue = l, en(a, l), Iu(n, !0), n.tail === null && n.tailMode === "hidden" && !f.alternate && !X)
              return p(a), null;
          } else
            2 * Jl() - n.renderingStartTime > Ln && u !== 536870912 && (a.flags |= 128, t = !0, Iu(n, !1), a.lanes = 4194304);
        n.isBackwards ? (f.sibling = a.child, a.child = f) : (l = n.last, l !== null ? l.sibling = f : a.child = f, n.last = f);
      }
      return n.tail !== null ? (a = n.tail, n.rendering = a, n.tail = a.sibling, n.renderingStartTime = Jl(), a.sibling = null, l = al.current, L(al, t ? l & 1 | 2 : l & 1), a) : (p(a), null);
    case 22:
    case 23:
      return ca(a), ce(), t = a.memoizedState !== null, l !== null ? l.memoizedState !== null !== t && (a.flags |= 8192) : t && (a.flags |= 8192), t ? u & 536870912 && !(a.flags & 128) && (p(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : p(a), u = a.updateQueue, u !== null && en(a, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), t = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (t = a.memoizedState.cachePool.pool), t !== u && (a.flags |= 2048), l !== null && el(Wa), null;
    case 24:
      return u = null, l !== null && (u = l.memoizedState.cache), a.memoizedState.cache !== u && (a.flags |= 2048), ia(ll), p(a), null;
    case 25:
      return null;
  }
  throw Error(z(156, a.tag));
}
function by(l, a) {
  switch (fe(a), a.tag) {
    case 1:
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 3:
      return ia(ll), Yu(), l = a.flags, l & 65536 && !(l & 128) ? (a.flags = l & -65537 | 128, a) : null;
    case 26:
    case 27:
    case 5:
      return qn(a), null;
    case 13:
      if (ca(a), l = a.memoizedState, l !== null && l.dehydrated !== null) {
        if (a.alternate === null)
          throw Error(z(340));
        Ct();
      }
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 19:
      return el(al), null;
    case 4:
      return Yu(), null;
    case 10:
      return ia(a.type), null;
    case 22:
    case 23:
      return ca(a), ce(), l !== null && el(Wa), l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 24:
      return ia(ll), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function cv(l, a) {
  switch (fe(a), a.tag) {
    case 3:
      ia(ll), Yu();
      break;
    case 26:
    case 27:
    case 5:
      qn(a);
      break;
    case 4:
      Yu();
      break;
    case 13:
      ca(a);
      break;
    case 19:
      el(al);
      break;
    case 10:
      ia(a.type);
      break;
    case 22:
    case 23:
      ca(a), ce(), l !== null && el(Wa);
      break;
    case 24:
      ia(ll);
  }
}
var gy = {
  getCacheForType: function(l) {
    var a = dl(ll), u = a.data.get(l);
    return u === void 0 && (u = l(), a.data.set(l, u)), u;
  }
}, zy = typeof WeakMap == "function" ? WeakMap : Map, J = 0, V = null, N = null, R = 0, j = 0, Tl = null, aa = !1, pu = !1, He = !1, da = 0, W = 0, Qa = 0, ka = 0, oe = 0, Ql = 0, ju = 0, zt = null, Ll = null, Nc = !1, qe = 0, Ln = 1 / 0, pn = null, qa = null, vn = !1, xa = null, At = 0, _c = 0, Yc = null, Tt = 0, Rc = null;
function Ul() {
  if (J & 2 && R !== 0)
    return R & -R;
  if (H.T !== null) {
    var l = Gu;
    return l !== 0 ? l : Ne();
  }
  return z0();
}
function ev() {
  Ql === 0 && (Ql = !(R & 536870912) || X ? m0() : 536870912);
  var l = Gl.current;
  return l !== null && (l.flags |= 32), Ql;
}
function Sl(l, a, u) {
  (l === V && j === 2 || l.cancelPendingCommit !== null) && (Vu(l, 0), ua(
    l,
    R,
    Ql,
    !1
  )), jt(l, u), (!(J & 2) || l !== V) && (l === V && (!(J & 2) && (ka |= u), W === 4 && ua(
    l,
    R,
    Ql,
    !1
  )), kl(l));
}
function iv(l, a, u) {
  if (J & 6) throw Error(z(327));
  var t = !u && (a & 60) === 0 && (a & l.expiredLanes) === 0 || Zt(l, a), n = t ? Ey(l, a) : Lf(l, a, !0), f = t;
  do {
    if (n === 0) {
      pu && !t && ua(l, a, 0, !1);
      break;
    } else if (n === 6)
      ua(
        l,
        a,
        0,
        !aa
      );
    else {
      if (u = l.current.alternate, f && !Ay(u)) {
        n = Lf(l, a, !1), f = !1;
        continue;
      }
      if (n === 2) {
        if (f = a, l.errorRecoveryDisabledLanes & f)
          var c = 0;
        else
          c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
        if (c !== 0) {
          a = c;
          l: {
            var e = l;
            n = zt;
            var i = e.current.memoizedState.isDehydrated;
            if (i && (Vu(e, c).flags |= 256), c = Lf(
              e,
              c,
              !1
            ), c !== 2) {
              if (He && !i) {
                e.errorRecoveryDisabledLanes |= f, ka |= f, n = 4;
                break l;
              }
              f = Ll, Ll = n, f !== null && Xc(f);
            }
            n = c;
          }
          if (f = !1, n !== 2) continue;
        }
      }
      if (n === 1) {
        Vu(l, 0), ua(l, a, 0, !0);
        break;
      }
      l: {
        switch (t = l, n) {
          case 0:
          case 1:
            throw Error(z(345));
          case 4:
            if ((a & 4194176) === a) {
              ua(
                t,
                a,
                Ql,
                !aa
              );
              break l;
            }
            break;
          case 2:
            Ll = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(z(329));
        }
        if (t.finishedWork = u, t.finishedLanes = a, (a & 62914560) === a && (f = qe + 300 - Jl(), 10 < f)) {
          if (ua(
            t,
            a,
            Ql,
            !aa
          ), lf(t, 0) !== 0) break l;
          t.timeoutHandle = Mv(
            Ri.bind(
              null,
              t,
              u,
              Ll,
              pn,
              Nc,
              a,
              Ql,
              ka,
              ju,
              aa,
              2,
              -0,
              0
            ),
            f
          );
          break l;
        }
        Ri(
          t,
          u,
          Ll,
          pn,
          Nc,
          a,
          Ql,
          ka,
          ju,
          aa,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  kl(l);
}
function Xc(l) {
  Ll === null ? Ll = l : Ll.push.apply(
    Ll,
    l
  );
}
function Ri(l, a, u, t, n, f, c, e, i, v, s, b, d) {
  var S = a.subtreeFlags;
  if ((S & 8192 || (S & 16785408) === 16785408) && (_t = { stylesheets: null, count: 0, unsuspend: ld }, lv(a), a = ud(), a !== null)) {
    l.cancelPendingCommit = a(
      Qi.bind(
        null,
        l,
        u,
        t,
        n,
        c,
        e,
        i,
        1,
        b,
        d
      )
    ), ua(l, f, c, !v);
    return;
  }
  Qi(
    l,
    u,
    t,
    n,
    c,
    e,
    i,
    s,
    b,
    d
  );
}
function Ay(l) {
  for (var a = l; ; ) {
    var u = a.tag;
    if ((u === 0 || u === 11 || u === 15) && a.flags & 16384 && (u = a.updateQueue, u !== null && (u = u.stores, u !== null)))
      for (var t = 0; t < u.length; t++) {
        var n = u[t], f = n.getSnapshot;
        n = n.value;
        try {
          if (!Ol(f(), n)) return !1;
        } catch {
          return !1;
        }
      }
    if (u = a.child, a.subtreeFlags & 16384 && u !== null)
      u.return = a, a = u;
    else {
      if (a === l) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === l) return !0;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  return !0;
}
function ua(l, a, u, t) {
  a &= ~oe, a &= ~ka, l.suspendedLanes |= a, l.pingedLanes &= ~a, t && (l.warmLanes |= a), t = l.expirationTimes;
  for (var n = a; 0 < n; ) {
    var f = 31 - Dl(n), c = 1 << f;
    t[f] = -1, n &= ~c;
  }
  u !== 0 && s0(l, u, a);
}
function yf() {
  return J & 6 ? !0 : (Jt(0), !1);
}
function Be() {
  if (N !== null) {
    if (j === 0)
      var l = N.return;
    else
      l = N, ea = eu = null, me(l), ou = null, ot = 0, l = N;
    for (; l !== null; )
      cv(l.alternate, l), l = l.return;
    N = null;
  }
}
function Vu(l, a) {
  l.finishedWork = null, l.finishedLanes = 0;
  var u = l.timeoutHandle;
  u !== -1 && (l.timeoutHandle = -1, jy(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Be(), V = l, N = u = oa(l.current, null), R = a, j = 0, Tl = null, aa = !1, pu = Zt(l, a), He = !1, ju = Ql = oe = ka = Qa = W = 0, Ll = zt = null, Nc = !1, a & 8 && (a |= a & 32);
  var t = l.entangledLanes;
  if (t !== 0)
    for (l = l.entanglements, t &= a; 0 < t; ) {
      var n = 31 - Dl(t), f = 1 << n;
      a |= l[n], t &= ~f;
    }
  return da = a, nf(), u;
}
function vv(l, a) {
  o = null, H.H = Wl, a === vt ? (a = yi(), j = 3) : a === J0 ? (a = yi(), j = 4) : j = a === X1 ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, Tl = a, N === null && (W = 1, Cn(
    l,
    Rl(a, l.current)
  ));
}
function hv() {
  var l = H.H;
  return H.H = Wl, l === null ? Wl : l;
}
function yv() {
  var l = H.A;
  return H.A = gy, l;
}
function Qc() {
  W = 4, aa || (R & 4194176) !== R && Gl.current !== null || (pu = !0), !(Qa & 134217727) && !(ka & 134217727) || V === null || ua(
    V,
    R,
    Ql,
    !1
  );
}
function Lf(l, a, u) {
  var t = J;
  J |= 2;
  var n = hv(), f = yv();
  (V !== l || R !== a) && (pn = null, Vu(l, a)), a = !1;
  var c = W;
  l: do
    try {
      if (j !== 0 && N !== null) {
        var e = N, i = Tl;
        switch (j) {
          case 8:
            Be(), c = 6;
            break l;
          case 3:
          case 2:
          case 6:
            Gl.current === null && (a = !0);
            var v = j;
            if (j = 0, Tl = null, Du(l, e, i, v), u && pu) {
              c = 0;
              break l;
            }
            break;
          default:
            v = j, j = 0, Tl = null, Du(l, e, i, v);
        }
      }
      Ty(), c = W;
      break;
    } catch (s) {
      vv(l, s);
    }
  while (!0);
  return a && l.shellSuspendCounter++, ea = eu = null, J = t, H.H = n, H.A = f, N === null && (V = null, R = 0, nf()), c;
}
function Ty() {
  for (; N !== null; ) dv(N);
}
function Ey(l, a) {
  var u = J;
  J |= 2;
  var t = hv(), n = yv();
  V !== l || R !== a ? (pn = null, Ln = Jl() + 500, Vu(l, a)) : pu = Zt(
    l,
    a
  );
  l: do
    try {
      if (j !== 0 && N !== null) {
        a = N;
        var f = Tl;
        a: switch (j) {
          case 1:
            j = 0, Tl = null, Du(l, a, f, 1);
            break;
          case 2:
            if (hi(f)) {
              j = 0, Tl = null, Xi(a);
              break;
            }
            a = function() {
              j === 2 && V === l && (j = 7), kl(l);
            }, f.then(a, a);
            break l;
          case 3:
            j = 7;
            break l;
          case 4:
            j = 5;
            break l;
          case 7:
            hi(f) ? (j = 0, Tl = null, Xi(a)) : (j = 0, Tl = null, Du(l, a, f, 7));
            break;
          case 5:
            var c = null;
            switch (N.tag) {
              case 26:
                c = N.memoizedState;
              case 5:
              case 27:
                var e = N;
                if (!c || Hv(c)) {
                  j = 0, Tl = null;
                  var i = e.sibling;
                  if (i !== null) N = i;
                  else {
                    var v = e.return;
                    v !== null ? (N = v, df(v)) : N = null;
                  }
                  break a;
                }
            }
            j = 0, Tl = null, Du(l, a, f, 5);
            break;
          case 6:
            j = 0, Tl = null, Du(l, a, f, 6);
            break;
          case 8:
            Be(), W = 6;
            break l;
          default:
            throw Error(z(462));
        }
      }
      My();
      break;
    } catch (s) {
      vv(l, s);
    }
  while (!0);
  return ea = eu = null, H.H = t, H.A = n, J = u, N !== null ? 0 : (V = null, R = 0, nf(), W);
}
function My() {
  for (; N !== null && !pv(); )
    dv(N);
}
function dv(l) {
  var a = V1(l.alternate, l, da);
  l.memoizedProps = l.pendingProps, a === null ? df(l) : N = a;
}
function Xi(l) {
  var a = l, u = a.alternate;
  switch (a.tag) {
    case 15:
    case 0:
      a = Oi(
        u,
        a,
        a.pendingProps,
        a.type,
        void 0,
        R
      );
      break;
    case 11:
      a = Oi(
        u,
        a,
        a.pendingProps,
        a.type.render,
        a.ref,
        R
      );
      break;
    case 5:
      me(a);
    default:
      cv(u, a), a = N = nv(a, da), a = V1(u, a, da);
  }
  l.memoizedProps = l.pendingProps, a === null ? df(l) : N = a;
}
function Du(l, a, u, t) {
  ea = eu = null, me(a), ou = null, ot = 0;
  var n = a.return;
  try {
    if (hy(
      l,
      n,
      a,
      u,
      R
    )) {
      W = 1, Cn(
        l,
        Rl(u, l.current)
      ), N = null;
      return;
    }
  } catch (f) {
    if (n !== null) throw N = n, f;
    W = 1, Cn(
      l,
      Rl(u, l.current)
    ), N = null;
    return;
  }
  a.flags & 32768 ? (X || t === 1 ? l = !0 : pu || R & 536870912 ? l = !1 : (aa = l = !0, (t === 2 || t === 3 || t === 6) && (t = Gl.current, t !== null && t.tag === 13 && (t.flags |= 16384))), mv(a, l)) : df(a);
}
function df(l) {
  var a = l;
  do {
    if (a.flags & 32768) {
      mv(
        a,
        aa
      );
      return;
    }
    l = a.return;
    var u = sy(
      a.alternate,
      a,
      da
    );
    if (u !== null) {
      N = u;
      return;
    }
    if (a = a.sibling, a !== null) {
      N = a;
      return;
    }
    N = a = l;
  } while (a !== null);
  W === 0 && (W = 5);
}
function mv(l, a) {
  do {
    var u = by(l.alternate, l);
    if (u !== null) {
      u.flags &= 32767, N = u;
      return;
    }
    if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !a && (l = l.sibling, l !== null)) {
      N = l;
      return;
    }
    N = l = u;
  } while (l !== null);
  W = 6, N = null;
}
function Qi(l, a, u, t, n, f, c, e, i, v) {
  var s = H.T, b = K.p;
  try {
    K.p = 2, H.T = null, Dy(
      l,
      a,
      u,
      t,
      b,
      n,
      f,
      c,
      e,
      i,
      v
    );
  } finally {
    H.T = s, K.p = b;
  }
}
function Dy(l, a, u, t, n, f, c, e) {
  do
    _u();
  while (xa !== null);
  if (J & 6) throw Error(z(327));
  var i = l.finishedWork;
  if (t = l.finishedLanes, i === null) return null;
  if (l.finishedWork = null, l.finishedLanes = 0, i === l.current) throw Error(z(177));
  l.callbackNode = null, l.callbackPriority = 0, l.cancelPendingCommit = null;
  var v = i.lanes | i.childLanes;
  if (v |= ue, ah(
    l,
    t,
    v,
    f,
    c,
    e
  ), l === V && (N = V = null, R = 0), !(i.subtreeFlags & 10256) && !(i.flags & 10256) || vn || (vn = !0, _c = v, Yc = u, oy(Bn, function() {
    return _u(), null;
  })), u = (i.flags & 15990) !== 0, i.subtreeFlags & 15990 || u ? (u = H.T, H.T = null, f = K.p, K.p = 2, c = J, J |= 4, dy(l, i), r1(i, l), Wh(Vc, l.containerInfo), Pn = !!jc, Vc = jc = null, l.current = i, W1(l, i.alternate, i), Jv(), J = c, K.p = f, H.T = u) : l.current = i, vn ? (vn = !1, xa = l, At = t) : Sv(l, v), v = l.pendingLanes, v === 0 && (qa = null), Fv(i.stateNode), kl(l), a !== null)
    for (n = l.onRecoverableError, i = 0; i < a.length; i++)
      v = a[i], n(v.value, {
        componentStack: v.stack
      });
  return At & 3 && _u(), v = l.pendingLanes, t & 4194218 && v & 42 ? l === Rc ? Tt++ : (Tt = 0, Rc = l) : Tt = 0, Jt(0), null;
}
function Sv(l, a) {
  (l.pooledCacheLanes &= a) === 0 && (a = l.pooledCache, a != null && (l.pooledCache = null, Kt(a)));
}
function _u() {
  if (xa !== null) {
    var l = xa, a = _c;
    _c = 0;
    var u = g0(At), t = H.T, n = K.p;
    try {
      if (K.p = 32 > u ? 32 : u, H.T = null, xa === null)
        var f = !1;
      else {
        u = Yc, Yc = null;
        var c = xa, e = At;
        if (xa = null, At = 0, J & 6)
          throw Error(z(331));
        var i = J;
        if (J |= 4, uv(c.current), I1(c, c.current, e, u), J = i, Jt(0, !1), Ml && typeof Ml.onPostCommitFiberRoot == "function")
          try {
            Ml.onPostCommitFiberRoot(Gt, c);
          } catch {
          }
        f = !0;
      }
      return f;
    } finally {
      K.p = n, H.T = t, Sv(l, a);
    }
  }
  return !1;
}
function Gi(l, a, u) {
  a = Rl(u, a), a = Tc(l.stateNode, a, 2), l = Ha(l, a, 2), l !== null && (jt(l, 2), kl(l));
}
function Z(l, a, u) {
  if (l.tag === 3)
    Gi(l, l, u);
  else
    for (; a !== null; ) {
      if (a.tag === 3) {
        Gi(
          a,
          l,
          u
        );
        break;
      } else if (a.tag === 1) {
        var t = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof t.componentDidCatch == "function" && (qa === null || !qa.has(t))) {
          l = Rl(u, l), u = Y1(2), t = Ha(a, u, 2), t !== null && (R1(
            u,
            t,
            a,
            l
          ), jt(t, 2), kl(t));
          break;
        }
      }
      a = a.return;
    }
}
function pf(l, a, u) {
  var t = l.pingCache;
  if (t === null) {
    t = l.pingCache = new zy();
    var n = /* @__PURE__ */ new Set();
    t.set(a, n);
  } else
    n = t.get(a), n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(a, n));
  n.has(u) || (He = !0, n.add(u), l = Uy.bind(null, l, a, u), a.then(l, l));
}
function Uy(l, a, u) {
  var t = l.pingCache;
  t !== null && t.delete(a), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, V === l && (R & u) === u && (W === 4 || W === 3 && (R & 62914560) === R && 300 > Jl() - qe ? !(J & 2) && Vu(l, 0) : oe |= u, ju === R && (ju = 0)), kl(l);
}
function sv(l, a) {
  a === 0 && (a = S0()), l = Ya(l, a), l !== null && (jt(l, a), kl(l));
}
function Oy(l) {
  var a = l.memoizedState, u = 0;
  a !== null && (u = a.retryLane), sv(l, u);
}
function Hy(l, a) {
  var u = 0;
  switch (l.tag) {
    case 13:
      var t = l.stateNode, n = l.memoizedState;
      n !== null && (u = n.retryLane);
      break;
    case 19:
      t = l.stateNode;
      break;
    case 22:
      t = l.stateNode._retryCache;
      break;
    default:
      throw Error(z(314));
  }
  t !== null && t.delete(a), sv(l, u);
}
function oy(l, a) {
  return $c(l, a);
}
var Jn = null, du = null, Gc = !1, wn = !1, Jf = !1, Fa = 0;
function kl(l) {
  l !== du && l.next === null && (du === null ? Jn = du = l : du = du.next = l), wn = !0, Gc || (Gc = !0, By(qy));
}
function Jt(l, a) {
  if (!Jf && wn) {
    Jf = !0;
    do
      for (var u = !1, t = Jn; t !== null; ) {
        if (l !== 0) {
          var n = t.pendingLanes;
          if (n === 0) var f = 0;
          else {
            var c = t.suspendedLanes, e = t.pingedLanes;
            f = (1 << 31 - Dl(42 | l) + 1) - 1, f &= n & ~(c & ~e), f = f & 201326677 ? f & 201326677 | 1 : f ? f | 2 : 0;
          }
          f !== 0 && (u = !0, Zi(t, f));
        } else
          f = R, f = lf(
            t,
            t === V ? f : 0
          ), !(f & 3) || Zt(t, f) || (u = !0, Zi(t, f));
        t = t.next;
      }
    while (u);
    Jf = !1;
  }
}
function qy() {
  wn = Gc = !1;
  var l = 0;
  Fa !== 0 && (Zy() && (l = Fa), Fa = 0);
  for (var a = Jl(), u = null, t = Jn; t !== null; ) {
    var n = t.next, f = bv(t, a);
    f === 0 ? (t.next = null, u === null ? Jn = n : u.next = n, n === null && (du = u)) : (u = t, (l !== 0 || f & 3) && (wn = !0)), t = n;
  }
  Jt(l);
}
function bv(l, a) {
  for (var u = l.suspendedLanes, t = l.pingedLanes, n = l.expirationTimes, f = l.pendingLanes & -62914561; 0 < f; ) {
    var c = 31 - Dl(f), e = 1 << c, i = n[c];
    i === -1 ? (!(e & u) || e & t) && (n[c] = lh(e, a)) : i <= a && (l.expiredLanes |= e), f &= ~e;
  }
  if (a = V, u = R, u = lf(
    l,
    l === a ? u : 0
  ), t = l.callbackNode, u === 0 || l === a && j === 2 || l.cancelPendingCommit !== null)
    return t !== null && t !== null && Ef(t), l.callbackNode = null, l.callbackPriority = 0;
  if (!(u & 3) || Zt(l, u)) {
    if (a = u & -u, a === l.callbackPriority) return a;
    switch (t !== null && Ef(t), g0(u)) {
      case 2:
      case 8:
        u = y0;
        break;
      case 32:
        u = Bn;
        break;
      case 268435456:
        u = d0;
        break;
      default:
        u = Bn;
    }
    return t = gv.bind(null, l), u = $c(u, t), l.callbackPriority = a, l.callbackNode = u, a;
  }
  return t !== null && t !== null && Ef(t), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function gv(l, a) {
  var u = l.callbackNode;
  if (_u() && l.callbackNode !== u)
    return null;
  var t = R;
  return t = lf(
    l,
    l === V ? t : 0
  ), t === 0 ? null : (iv(l, t, a), bv(l, Jl()), l.callbackNode != null && l.callbackNode === u ? gv.bind(null, l) : null);
}
function Zi(l, a) {
  if (_u()) return null;
  iv(l, a, !0);
}
function By(l) {
  Vy(function() {
    J & 6 ? $c(h0, l) : l();
  });
}
function Ne() {
  return Fa === 0 && (Fa = m0()), Fa;
}
function ji(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : sn("" + l);
}
function Vi(l, a) {
  var u = a.ownerDocument.createElement("input");
  return u.name = a.name, u.value = a.value, l.id && u.setAttribute("form", l.id), a.parentNode.insertBefore(u, a), l = new FormData(l), u.parentNode.removeChild(u), l;
}
function Ny(l, a, u, t, n) {
  if (a === "submit" && u && u.stateNode === n) {
    var f = ji(
      (n[gl] || null).action
    ), c = t.submitter;
    c && (a = (a = c[gl] || null) ? ji(a.formAction) : c.getAttribute("formAction"), a !== null && (f = a, c = null));
    var e = new af(
      "action",
      "action",
      null,
      t,
      n
    );
    l.push({
      event: e,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (t.defaultPrevented) {
              if (Fa !== 0) {
                var i = c ? Vi(n, c) : new FormData(n);
                zc(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: n.method,
                    action: f
                  },
                  null,
                  i
                );
              }
            } else
              typeof f == "function" && (e.preventDefault(), i = c ? Vi(n, c) : new FormData(n), zc(
                u,
                {
                  pending: !0,
                  data: i,
                  method: n.method,
                  action: f
                },
                f,
                i
              ));
          },
          currentTarget: n
        }
      ]
    });
  }
}
for (var wf = 0; wf < ci.length; wf++) {
  var Wf = ci[wf], _y = Wf.toLowerCase(), Yy = Wf[0].toUpperCase() + Wf.slice(1);
  Kl(
    _y,
    "on" + Yy
  );
}
Kl(j0, "onAnimationEnd");
Kl(V0, "onAnimationIteration");
Kl(C0, "onAnimationStart");
Kl("dblclick", "onDoubleClick");
Kl("focusin", "onFocus");
Kl("focusout", "onBlur");
Kl(kh, "onTransitionRun");
Kl(Fh, "onTransitionStart");
Kl(rh, "onTransitionCancel");
Kl(K0, "onTransitionEnd");
Ru("onMouseEnter", ["mouseout", "mouseover"]);
Ru("onMouseLeave", ["mouseout", "mouseover"]);
Ru("onPointerEnter", ["pointerout", "pointerover"]);
Ru("onPointerLeave", ["pointerout", "pointerover"]);
uu(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
uu(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
uu("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
uu(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
uu(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
uu(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Bt = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), Ry = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bt)
);
function zv(l, a) {
  a = (a & 4) !== 0;
  for (var u = 0; u < l.length; u++) {
    var t = l[u], n = t.event;
    t = t.listeners;
    l: {
      var f = void 0;
      if (a)
        for (var c = t.length - 1; 0 <= c; c--) {
          var e = t[c], i = e.instance, v = e.currentTarget;
          if (e = e.listener, i !== f && n.isPropagationStopped())
            break l;
          f = e, n.currentTarget = v;
          try {
            f(n);
          } catch (s) {
            Vn(s);
          }
          n.currentTarget = null, f = i;
        }
      else
        for (c = 0; c < t.length; c++) {
          if (e = t[c], i = e.instance, v = e.currentTarget, e = e.listener, i !== f && n.isPropagationStopped())
            break l;
          f = e, n.currentTarget = v;
          try {
            f(n);
          } catch (s) {
            Vn(s);
          }
          n.currentTarget = null, f = i;
        }
    }
  }
}
function Y(l, a) {
  var u = a[fc];
  u === void 0 && (u = a[fc] = /* @__PURE__ */ new Set());
  var t = l + "__bubble";
  u.has(t) || (Av(a, l, 2, !1), u.add(t));
}
function $f(l, a, u) {
  var t = 0;
  a && (t |= 4), Av(
    u,
    l,
    t,
    a
  );
}
var hn = "_reactListening" + Math.random().toString(36).slice(2);
function _e(l) {
  if (!l[hn]) {
    l[hn] = !0, A0.forEach(function(u) {
      u !== "selectionchange" && (Ry.has(u) || $f(u, !1, l), $f(u, !0, l));
    });
    var a = l.nodeType === 9 ? l : l.ownerDocument;
    a === null || a[hn] || (a[hn] = !0, $f("selectionchange", !1, a));
  }
}
function Av(l, a, u, t) {
  switch (_v(a)) {
    case 2:
      var n = fd;
      break;
    case 8:
      n = cd;
      break;
    default:
      n = Qe;
  }
  u = n.bind(
    null,
    a,
    u,
    l
  ), n = void 0, !vc || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (n = !0), t ? n !== void 0 ? l.addEventListener(a, u, {
    capture: !0,
    passive: n
  }) : l.addEventListener(a, u, !0) : n !== void 0 ? l.addEventListener(a, u, {
    passive: n
  }) : l.addEventListener(a, u, !1);
}
function kf(l, a, u, t, n) {
  var f = t;
  if (!(a & 1) && !(a & 2) && t !== null)
    l: for (; ; ) {
      if (t === null) return;
      var c = t.tag;
      if (c === 3 || c === 4) {
        var e = t.stateNode.containerInfo;
        if (e === n || e.nodeType === 8 && e.parentNode === n)
          break;
        if (c === 4)
          for (c = t.return; c !== null; ) {
            var i = c.tag;
            if ((i === 3 || i === 4) && (i = c.stateNode.containerInfo, i === n || i.nodeType === 8 && i.parentNode === n))
              return;
            c = c.return;
          }
        for (; e !== null; ) {
          if (c = La(e), c === null) return;
          if (i = c.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            t = f = c;
            continue l;
          }
          e = e.parentNode;
        }
      }
      t = t.return;
    }
  o0(function() {
    var v = f, s = rc(u), b = [];
    l: {
      var d = x0.get(l);
      if (d !== void 0) {
        var S = af, T = l;
        switch (l) {
          case "keypress":
            if (gn(u) === 0) break l;
          case "keydown":
          case "keyup":
            S = Hh;
            break;
          case "focusin":
            T = "focus", S = Hf;
            break;
          case "focusout":
            T = "blur", S = Hf;
            break;
          case "beforeblur":
          case "afterblur":
            S = Hf;
            break;
          case "click":
            if (u.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = $e;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = Sh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = Bh;
            break;
          case j0:
          case V0:
          case C0:
            S = gh;
            break;
          case K0:
            S = _h;
            break;
          case "scroll":
          case "scrollend":
            S = dh;
            break;
          case "wheel":
            S = Rh;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = Ah;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = Fe;
            break;
          case "toggle":
          case "beforetoggle":
            S = Qh;
        }
        var U = (a & 4) !== 0, C = !U && (l === "scroll" || l === "scrollend"), y = U ? d !== null ? d + "Capture" : null : d;
        U = [];
        for (var h = v, m; h !== null; ) {
          var g = h;
          if (m = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || m === null || y === null || (g = Dt(h, y), g != null && U.push(
            Nt(h, g, m)
          )), C) break;
          h = h.return;
        }
        0 < U.length && (d = new S(
          d,
          T,
          null,
          u,
          s
        ), b.push({ event: d, listeners: U }));
      }
    }
    if (!(a & 7)) {
      l: {
        if (d = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", d && u !== ic && (T = u.relatedTarget || u.fromElement) && (La(T) || T[xu]))
          break l;
        if ((S || d) && (d = s.window === s ? s : (d = s.ownerDocument) ? d.defaultView || d.parentWindow : window, S ? (T = u.relatedTarget || u.toElement, S = v, T = T ? La(T) : null, T !== null && (C = Ku(T), U = T.tag, T !== C || U !== 5 && U !== 27 && U !== 6) && (T = null)) : (S = null, T = v), S !== T)) {
          if (U = $e, g = "onMouseLeave", y = "onMouseEnter", h = "mouse", (l === "pointerout" || l === "pointerover") && (U = Fe, g = "onPointerLeave", y = "onPointerEnter", h = "pointer"), C = S == null ? d : nt(S), m = T == null ? d : nt(T), d = new U(
            g,
            h + "leave",
            S,
            u,
            s
          ), d.target = C, d.relatedTarget = m, g = null, La(s) === v && (U = new U(
            y,
            h + "enter",
            T,
            u,
            s
          ), U.target = m, U.relatedTarget = C, g = U), C = g, S && T)
            a: {
              for (U = S, y = T, h = 0, m = U; m; m = vu(m))
                h++;
              for (m = 0, g = y; g; g = vu(g))
                m++;
              for (; 0 < h - m; )
                U = vu(U), h--;
              for (; 0 < m - h; )
                y = vu(y), m--;
              for (; h--; ) {
                if (U === y || y !== null && U === y.alternate)
                  break a;
                U = vu(U), y = vu(y);
              }
              U = null;
            }
          else U = null;
          S !== null && Ci(
            b,
            d,
            S,
            U,
            !1
          ), T !== null && C !== null && Ci(
            b,
            C,
            T,
            U,
            !0
          );
        }
      }
      l: {
        if (d = v ? nt(v) : window, S = d.nodeName && d.nodeName.toLowerCase(), S === "select" || S === "input" && d.type === "file")
          var A = li;
        else if (Ie(d))
          if (R0)
            A = Jh;
          else {
            A = Lh;
            var O = xh;
          }
        else
          S = d.nodeName, !S || S.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? v && Fc(v.elementType) && (A = li) : A = ph;
        if (A && (A = A(l, v))) {
          Y0(
            b,
            A,
            u,
            s
          );
          break l;
        }
        O && O(l, d, v), l === "focusout" && v && d.type === "number" && v.memoizedProps.value != null && ec(d, "number", d.value);
      }
      switch (O = v ? nt(v) : window, l) {
        case "focusin":
          (Ie(O) || O.contentEditable === "true") && (gu = O, hc = v, it = null);
          break;
        case "focusout":
          it = hc = gu = null;
          break;
        case "mousedown":
          yc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          yc = !1, fi(b, u, s);
          break;
        case "selectionchange":
          if ($h) break;
        case "keydown":
        case "keyup":
          fi(b, u, s);
      }
      var M;
      if (le)
        l: {
          switch (l) {
            case "compositionstart":
              var D = "onCompositionStart";
              break l;
            case "compositionend":
              D = "onCompositionEnd";
              break l;
            case "compositionupdate":
              D = "onCompositionUpdate";
              break l;
          }
          D = void 0;
        }
      else
        bu ? N0(l, u) && (D = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (D = "onCompositionStart");
      D && (B0 && u.locale !== "ko" && (bu || D !== "onCompositionStart" ? D === "onCompositionEnd" && bu && (M = q0()) : (Da = s, Pc = "value" in Da ? Da.value : Da.textContent, bu = !0)), O = Wn(v, D), 0 < O.length && (D = new ke(
        D,
        l,
        null,
        u,
        s
      ), b.push({ event: D, listeners: O }), M ? D.data = M : (M = _0(u), M !== null && (D.data = M)))), (M = Zh ? jh(l, u) : Vh(l, u)) && (D = Wn(v, "onBeforeInput"), 0 < D.length && (O = new ke(
        "onBeforeInput",
        "beforeinput",
        null,
        u,
        s
      ), b.push({
        event: O,
        listeners: D
      }), O.data = M)), Ny(
        b,
        l,
        v,
        u,
        s
      );
    }
    zv(b, a);
  });
}
function Nt(l, a, u) {
  return {
    instance: l,
    listener: a,
    currentTarget: u
  };
}
function Wn(l, a) {
  for (var u = a + "Capture", t = []; l !== null; ) {
    var n = l, f = n.stateNode;
    n = n.tag, n !== 5 && n !== 26 && n !== 27 || f === null || (n = Dt(l, u), n != null && t.unshift(
      Nt(l, n, f)
    ), n = Dt(l, a), n != null && t.push(
      Nt(l, n, f)
    )), l = l.return;
  }
  return t;
}
function vu(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function Ci(l, a, u, t, n) {
  for (var f = a._reactName, c = []; u !== null && u !== t; ) {
    var e = u, i = e.alternate, v = e.stateNode;
    if (e = e.tag, i !== null && i === t) break;
    e !== 5 && e !== 26 && e !== 27 || v === null || (i = v, n ? (v = Dt(u, f), v != null && c.unshift(
      Nt(u, v, i)
    )) : n || (v = Dt(u, f), v != null && c.push(
      Nt(u, v, i)
    ))), u = u.return;
  }
  c.length !== 0 && l.push({ event: a, listeners: c });
}
var Xy = /\r\n?/g, Qy = /\u0000|\uFFFD/g;
function Ki(l) {
  return (typeof l == "string" ? l : "" + l).replace(Xy, `
`).replace(Qy, "");
}
function Tv(l, a) {
  return a = Ki(a), Ki(l) === a;
}
function mf() {
}
function Q(l, a, u, t, n, f) {
  switch (u) {
    case "children":
      typeof t == "string" ? a === "body" || a === "textarea" && t === "" || Xu(l, t) : (typeof t == "number" || typeof t == "bigint") && a !== "body" && Xu(l, "" + t);
      break;
    case "className":
      an(l, "class", t);
      break;
    case "tabIndex":
      an(l, "tabindex", t);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      an(l, u, t);
      break;
    case "style":
      H0(l, t, f);
      break;
    case "data":
      if (a !== "object") {
        an(l, "data", t);
        break;
      }
    case "src":
    case "href":
      if (t === "" && (a !== "a" || u !== "href")) {
        l.removeAttribute(u);
        break;
      }
      if (t == null || typeof t == "function" || typeof t == "symbol" || typeof t == "boolean") {
        l.removeAttribute(u);
        break;
      }
      t = sn("" + t), l.setAttribute(u, t);
      break;
    case "action":
    case "formAction":
      if (typeof t == "function") {
        l.setAttribute(
          u,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof f == "function" && (u === "formAction" ? (a !== "input" && Q(l, a, "name", n.name, n, null), Q(
          l,
          a,
          "formEncType",
          n.formEncType,
          n,
          null
        ), Q(
          l,
          a,
          "formMethod",
          n.formMethod,
          n,
          null
        ), Q(
          l,
          a,
          "formTarget",
          n.formTarget,
          n,
          null
        )) : (Q(l, a, "encType", n.encType, n, null), Q(l, a, "method", n.method, n, null), Q(l, a, "target", n.target, n, null)));
      if (t == null || typeof t == "symbol" || typeof t == "boolean") {
        l.removeAttribute(u);
        break;
      }
      t = sn("" + t), l.setAttribute(u, t);
      break;
    case "onClick":
      t != null && (l.onclick = mf);
      break;
    case "onScroll":
      t != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      t != null && Y("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (t != null) {
        if (typeof t != "object" || !("__html" in t))
          throw Error(z(61));
        if (u = t.__html, u != null) {
          if (n.children != null) throw Error(z(60));
          l.innerHTML = u;
        }
      }
      break;
    case "multiple":
      l.multiple = t && typeof t != "function" && typeof t != "symbol";
      break;
    case "muted":
      l.muted = t && typeof t != "function" && typeof t != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (t == null || typeof t == "function" || typeof t == "boolean" || typeof t == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      u = sn("" + t), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        u
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      t != null && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, "" + t) : l.removeAttribute(u);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      t && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
      break;
    case "capture":
    case "download":
      t === !0 ? l.setAttribute(u, "") : t !== !1 && t != null && typeof t != "function" && typeof t != "symbol" ? l.setAttribute(u, t) : l.removeAttribute(u);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      t != null && typeof t != "function" && typeof t != "symbol" && !isNaN(t) && 1 <= t ? l.setAttribute(u, t) : l.removeAttribute(u);
      break;
    case "rowSpan":
    case "start":
      t == null || typeof t == "function" || typeof t == "symbol" || isNaN(t) ? l.removeAttribute(u) : l.setAttribute(u, t);
      break;
    case "popover":
      Y("beforetoggle", l), Y("toggle", l), Sn(l, "popover", t);
      break;
    case "xlinkActuate":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        t
      );
      break;
    case "xlinkArcrole":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        t
      );
      break;
    case "xlinkRole":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        t
      );
      break;
    case "xlinkShow":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        t
      );
      break;
    case "xlinkTitle":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        t
      );
      break;
    case "xlinkType":
      Fl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        t
      );
      break;
    case "xmlBase":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        t
      );
      break;
    case "xmlLang":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        t
      );
      break;
    case "xmlSpace":
      Fl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        t
      );
      break;
    case "is":
      Sn(l, "is", t);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = hh.get(u) || u, Sn(l, u, t));
  }
}
function Zc(l, a, u, t, n, f) {
  switch (u) {
    case "style":
      H0(l, t, f);
      break;
    case "dangerouslySetInnerHTML":
      if (t != null) {
        if (typeof t != "object" || !("__html" in t))
          throw Error(z(61));
        if (u = t.__html, u != null) {
          if (n.children != null) throw Error(z(60));
          l.innerHTML = u;
        }
      }
      break;
    case "children":
      typeof t == "string" ? Xu(l, t) : (typeof t == "number" || typeof t == "bigint") && Xu(l, "" + t);
      break;
    case "onScroll":
      t != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      t != null && Y("scrollend", l);
      break;
    case "onClick":
      t != null && (l.onclick = mf);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!T0.hasOwnProperty(u))
        l: {
          if (u[0] === "o" && u[1] === "n" && (n = u.endsWith("Capture"), a = u.slice(2, n ? u.length - 7 : void 0), f = l[gl] || null, f = f != null ? f[u] : null, typeof f == "function" && l.removeEventListener(a, f, n), typeof t == "function")) {
            typeof f != "function" && f !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(a, t, n);
            break l;
          }
          u in l ? l[u] = t : t === !0 ? l.setAttribute(u, "") : Sn(l, u, t);
        }
  }
}
function hl(l, a, u) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      Y("error", l), Y("load", l);
      var t = !1, n = !1, f;
      for (f in u)
        if (u.hasOwnProperty(f)) {
          var c = u[f];
          if (c != null)
            switch (f) {
              case "src":
                t = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(z(137, a));
              default:
                Q(l, a, f, c, u, null);
            }
        }
      n && Q(l, a, "srcSet", u.srcSet, u, null), t && Q(l, a, "src", u.src, u, null);
      return;
    case "input":
      Y("invalid", l);
      var e = f = c = n = null, i = null, v = null;
      for (t in u)
        if (u.hasOwnProperty(t)) {
          var s = u[t];
          if (s != null)
            switch (t) {
              case "name":
                n = s;
                break;
              case "type":
                c = s;
                break;
              case "checked":
                i = s;
                break;
              case "defaultChecked":
                v = s;
                break;
              case "value":
                f = s;
                break;
              case "defaultValue":
                e = s;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (s != null)
                  throw Error(z(137, a));
                break;
              default:
                Q(l, a, t, s, u, null);
            }
        }
      D0(
        l,
        f,
        e,
        i,
        v,
        c,
        n,
        !1
      ), Nn(l);
      return;
    case "select":
      Y("invalid", l), t = c = f = null;
      for (n in u)
        if (u.hasOwnProperty(n) && (e = u[n], e != null))
          switch (n) {
            case "value":
              f = e;
              break;
            case "defaultValue":
              c = e;
              break;
            case "multiple":
              t = e;
            default:
              Q(l, a, n, e, u, null);
          }
      a = f, u = c, l.multiple = !!t, a != null ? Ou(l, !!t, a, !1) : u != null && Ou(l, !!t, u, !0);
      return;
    case "textarea":
      Y("invalid", l), f = n = t = null;
      for (c in u)
        if (u.hasOwnProperty(c) && (e = u[c], e != null))
          switch (c) {
            case "value":
              t = e;
              break;
            case "defaultValue":
              n = e;
              break;
            case "children":
              f = e;
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(z(91));
              break;
            default:
              Q(l, a, c, e, u, null);
          }
      O0(l, t, n, f), Nn(l);
      return;
    case "option":
      for (i in u)
        if (u.hasOwnProperty(i) && (t = u[i], t != null))
          switch (i) {
            case "selected":
              l.selected = t && typeof t != "function" && typeof t != "symbol";
              break;
            default:
              Q(l, a, i, t, u, null);
          }
      return;
    case "dialog":
      Y("cancel", l), Y("close", l);
      break;
    case "iframe":
    case "object":
      Y("load", l);
      break;
    case "video":
    case "audio":
      for (t = 0; t < Bt.length; t++)
        Y(Bt[t], l);
      break;
    case "image":
      Y("error", l), Y("load", l);
      break;
    case "details":
      Y("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      Y("error", l), Y("load", l);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (v in u)
        if (u.hasOwnProperty(v) && (t = u[v], t != null))
          switch (v) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(z(137, a));
            default:
              Q(l, a, v, t, u, null);
          }
      return;
    default:
      if (Fc(a)) {
        for (s in u)
          u.hasOwnProperty(s) && (t = u[s], t !== void 0 && Zc(
            l,
            a,
            s,
            t,
            u,
            void 0
          ));
        return;
      }
  }
  for (e in u)
    u.hasOwnProperty(e) && (t = u[e], t != null && Q(l, a, e, t, u, null));
}
function Gy(l, a, u, t) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var n = null, f = null, c = null, e = null, i = null, v = null, s = null;
      for (S in u) {
        var b = u[S];
        if (u.hasOwnProperty(S) && b != null)
          switch (S) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = b;
            default:
              t.hasOwnProperty(S) || Q(l, a, S, null, t, b);
          }
      }
      for (var d in t) {
        var S = t[d];
        if (b = u[d], t.hasOwnProperty(d) && (S != null || b != null))
          switch (d) {
            case "type":
              f = S;
              break;
            case "name":
              n = S;
              break;
            case "checked":
              v = S;
              break;
            case "defaultChecked":
              s = S;
              break;
            case "value":
              c = S;
              break;
            case "defaultValue":
              e = S;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (S != null)
                throw Error(z(137, a));
              break;
            default:
              S !== b && Q(
                l,
                a,
                d,
                S,
                t,
                b
              );
          }
      }
      cc(
        l,
        c,
        e,
        i,
        v,
        s,
        f,
        n
      );
      return;
    case "select":
      S = c = e = d = null;
      for (f in u)
        if (i = u[f], u.hasOwnProperty(f) && i != null)
          switch (f) {
            case "value":
              break;
            case "multiple":
              S = i;
            default:
              t.hasOwnProperty(f) || Q(
                l,
                a,
                f,
                null,
                t,
                i
              );
          }
      for (n in t)
        if (f = t[n], i = u[n], t.hasOwnProperty(n) && (f != null || i != null))
          switch (n) {
            case "value":
              d = f;
              break;
            case "defaultValue":
              e = f;
              break;
            case "multiple":
              c = f;
            default:
              f !== i && Q(
                l,
                a,
                n,
                f,
                t,
                i
              );
          }
      a = e, u = c, t = S, d != null ? Ou(l, !!u, d, !1) : !!t != !!u && (a != null ? Ou(l, !!u, a, !0) : Ou(l, !!u, u ? [] : "", !1));
      return;
    case "textarea":
      S = d = null;
      for (e in u)
        if (n = u[e], u.hasOwnProperty(e) && n != null && !t.hasOwnProperty(e))
          switch (e) {
            case "value":
              break;
            case "children":
              break;
            default:
              Q(l, a, e, null, t, n);
          }
      for (c in t)
        if (n = t[c], f = u[c], t.hasOwnProperty(c) && (n != null || f != null))
          switch (c) {
            case "value":
              d = n;
              break;
            case "defaultValue":
              S = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(z(91));
              break;
            default:
              n !== f && Q(l, a, c, n, t, f);
          }
      U0(l, d, S);
      return;
    case "option":
      for (var T in u)
        if (d = u[T], u.hasOwnProperty(T) && d != null && !t.hasOwnProperty(T))
          switch (T) {
            case "selected":
              l.selected = !1;
              break;
            default:
              Q(
                l,
                a,
                T,
                null,
                t,
                d
              );
          }
      for (i in t)
        if (d = t[i], S = u[i], t.hasOwnProperty(i) && d !== S && (d != null || S != null))
          switch (i) {
            case "selected":
              l.selected = d && typeof d != "function" && typeof d != "symbol";
              break;
            default:
              Q(
                l,
                a,
                i,
                d,
                t,
                S
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var U in u)
        d = u[U], u.hasOwnProperty(U) && d != null && !t.hasOwnProperty(U) && Q(l, a, U, null, t, d);
      for (v in t)
        if (d = t[v], S = u[v], t.hasOwnProperty(v) && d !== S && (d != null || S != null))
          switch (v) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null)
                throw Error(z(137, a));
              break;
            default:
              Q(
                l,
                a,
                v,
                d,
                t,
                S
              );
          }
      return;
    default:
      if (Fc(a)) {
        for (var C in u)
          d = u[C], u.hasOwnProperty(C) && d !== void 0 && !t.hasOwnProperty(C) && Zc(
            l,
            a,
            C,
            void 0,
            t,
            d
          );
        for (s in t)
          d = t[s], S = u[s], !t.hasOwnProperty(s) || d === S || d === void 0 && S === void 0 || Zc(
            l,
            a,
            s,
            d,
            t,
            S
          );
        return;
      }
  }
  for (var y in u)
    d = u[y], u.hasOwnProperty(y) && d != null && !t.hasOwnProperty(y) && Q(l, a, y, null, t, d);
  for (b in t)
    d = t[b], S = u[b], !t.hasOwnProperty(b) || d === S || d == null && S == null || Q(l, a, b, d, t, S);
}
var jc = null, Vc = null;
function $n(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function xi(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Ev(l, a) {
  if (l === 0)
    switch (a) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && a === "foreignObject" ? 0 : l;
}
function Cc(l, a) {
  return l === "textarea" || l === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
}
var Ff = null;
function Zy() {
  var l = window.event;
  return l && l.type === "popstate" ? l === Ff ? !1 : (Ff = l, !0) : (Ff = null, !1);
}
var Mv = typeof setTimeout == "function" ? setTimeout : void 0, jy = typeof clearTimeout == "function" ? clearTimeout : void 0, Li = typeof Promise == "function" ? Promise : void 0, Vy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Li < "u" ? function(l) {
  return Li.resolve(null).then(l).catch(Cy);
} : Mv;
function Cy(l) {
  setTimeout(function() {
    throw l;
  });
}
function rf(l, a) {
  var u = a, t = 0;
  do {
    var n = u.nextSibling;
    if (l.removeChild(u), n && n.nodeType === 8)
      if (u = n.data, u === "/$") {
        if (t === 0) {
          l.removeChild(n), Qt(a);
          return;
        }
        t--;
      } else u !== "$" && u !== "$?" && u !== "$!" || t++;
    u = n;
  } while (u);
  Qt(a);
}
function Kc(l) {
  var a = l.firstChild;
  for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
    var u = a;
    switch (a = a.nextSibling, u.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Kc(u), kc(u);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (u.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(u);
  }
}
function Ky(l, a, u, t) {
  for (; l.nodeType === 1; ) {
    var n = u;
    if (l.nodeName.toLowerCase() !== a.toLowerCase()) {
      if (!t && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (t) {
      if (!l[Mt])
        switch (a) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (f = l.getAttribute("rel"), f === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (f !== n.rel || l.getAttribute("href") !== (n.href == null ? null : n.href) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || l.getAttribute("title") !== (n.title == null ? null : n.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (f = l.getAttribute("src"), (f !== (n.src == null ? null : n.src) || l.getAttribute("type") !== (n.type == null ? null : n.type) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && f && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (a === "input" && l.type === "hidden") {
      var f = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && l.getAttribute("name") === f)
        return l;
    } else return l;
    if (l = Cl(l.nextSibling), l === null) break;
  }
  return null;
}
function xy(l, a, u) {
  if (a === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Cl(l.nextSibling), l === null)) return null;
  return l;
}
function Cl(l) {
  for (; l != null; l = l.nextSibling) {
    var a = l.nodeType;
    if (a === 1 || a === 3) break;
    if (a === 8) {
      if (a = l.data, a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
        break;
      if (a === "/$") return null;
    }
  }
  return l;
}
function pi(l) {
  l = l.previousSibling;
  for (var a = 0; l; ) {
    if (l.nodeType === 8) {
      var u = l.data;
      if (u === "$" || u === "$!" || u === "$?") {
        if (a === 0) return l;
        a--;
      } else u === "/$" && a++;
    }
    l = l.previousSibling;
  }
  return null;
}
function Dv(l, a, u) {
  switch (a = $n(u), l) {
    case "html":
      if (l = a.documentElement, !l) throw Error(z(452));
      return l;
    case "head":
      if (l = a.head, !l) throw Error(z(453));
      return l;
    case "body":
      if (l = a.body, !l) throw Error(z(454));
      return l;
    default:
      throw Error(z(451));
  }
}
var Zl = /* @__PURE__ */ new Map(), Ji = /* @__PURE__ */ new Set();
function kn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.ownerDocument;
}
var ma = K.d;
K.d = {
  f: Ly,
  r: py,
  D: Jy,
  C: wy,
  L: Wy,
  m: $y,
  X: Fy,
  S: ky,
  M: ry
};
function Ly() {
  var l = ma.f(), a = yf();
  return l || a;
}
function py(l) {
  var a = Lu(l);
  a !== null && a.tag === 5 && a.type === "form" ? D1(a) : ma.r(l);
}
var Ju = typeof document > "u" ? null : document;
function Uv(l, a, u) {
  var t = Ju;
  if (t && typeof a == "string" && a) {
    var n = Yl(a);
    n = 'link[rel="' + l + '"][href="' + n + '"]', typeof u == "string" && (n += '[crossorigin="' + u + '"]'), Ji.has(n) || (Ji.add(n), l = { rel: l, crossOrigin: u, href: a }, t.querySelector(n) === null && (a = t.createElement("link"), hl(a, "link", l), fl(a), t.head.appendChild(a)));
  }
}
function Jy(l) {
  ma.D(l), Uv("dns-prefetch", l, null);
}
function wy(l, a) {
  ma.C(l, a), Uv("preconnect", l, a);
}
function Wy(l, a, u) {
  ma.L(l, a, u);
  var t = Ju;
  if (t && l && a) {
    var n = 'link[rel="preload"][as="' + Yl(a) + '"]';
    a === "image" && u && u.imageSrcSet ? (n += '[imagesrcset="' + Yl(
      u.imageSrcSet
    ) + '"]', typeof u.imageSizes == "string" && (n += '[imagesizes="' + Yl(
      u.imageSizes
    ) + '"]')) : n += '[href="' + Yl(l) + '"]';
    var f = n;
    switch (a) {
      case "style":
        f = Cu(l);
        break;
      case "script":
        f = wu(l);
    }
    Zl.has(f) || (l = x(
      {
        rel: "preload",
        href: a === "image" && u && u.imageSrcSet ? void 0 : l,
        as: a
      },
      u
    ), Zl.set(f, l), t.querySelector(n) !== null || a === "style" && t.querySelector(wt(f)) || a === "script" && t.querySelector(Wt(f)) || (a = t.createElement("link"), hl(a, "link", l), fl(a), t.head.appendChild(a)));
  }
}
function $y(l, a) {
  ma.m(l, a);
  var u = Ju;
  if (u && l) {
    var t = a && typeof a.as == "string" ? a.as : "script", n = 'link[rel="modulepreload"][as="' + Yl(t) + '"][href="' + Yl(l) + '"]', f = n;
    switch (t) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        f = wu(l);
    }
    if (!Zl.has(f) && (l = x({ rel: "modulepreload", href: l }, a), Zl.set(f, l), u.querySelector(n) === null)) {
      switch (t) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (u.querySelector(Wt(f)))
            return;
      }
      t = u.createElement("link"), hl(t, "link", l), fl(t), u.head.appendChild(t);
    }
  }
}
function ky(l, a, u) {
  ma.S(l, a, u);
  var t = Ju;
  if (t && l) {
    var n = Uu(t).hoistableStyles, f = Cu(l);
    a = a || "default";
    var c = n.get(f);
    if (!c) {
      var e = { loading: 0, preload: null };
      if (c = t.querySelector(
        wt(f)
      ))
        e.loading = 5;
      else {
        l = x(
          { rel: "stylesheet", href: l, "data-precedence": a },
          u
        ), (u = Zl.get(f)) && Ye(l, u);
        var i = c = t.createElement("link");
        fl(i), hl(i, "link", l), i._p = new Promise(function(v, s) {
          i.onload = v, i.onerror = s;
        }), i.addEventListener("load", function() {
          e.loading |= 1;
        }), i.addEventListener("error", function() {
          e.loading |= 2;
        }), e.loading |= 4, Dn(c, a, t);
      }
      c = {
        type: "stylesheet",
        instance: c,
        count: 1,
        state: e
      }, n.set(f, c);
    }
  }
}
function Fy(l, a) {
  ma.X(l, a);
  var u = Ju;
  if (u && l) {
    var t = Uu(u).hoistableScripts, n = wu(l), f = t.get(n);
    f || (f = u.querySelector(Wt(n)), f || (l = x({ src: l, async: !0 }, a), (a = Zl.get(n)) && Re(l, a), f = u.createElement("script"), fl(f), hl(f, "link", l), u.head.appendChild(f)), f = {
      type: "script",
      instance: f,
      count: 1,
      state: null
    }, t.set(n, f));
  }
}
function ry(l, a) {
  ma.M(l, a);
  var u = Ju;
  if (u && l) {
    var t = Uu(u).hoistableScripts, n = wu(l), f = t.get(n);
    f || (f = u.querySelector(Wt(n)), f || (l = x({ src: l, async: !0, type: "module" }, a), (a = Zl.get(n)) && Re(l, a), f = u.createElement("script"), fl(f), hl(f, "link", l), u.head.appendChild(f)), f = {
      type: "script",
      instance: f,
      count: 1,
      state: null
    }, t.set(n, f));
  }
}
function wi(l, a, u, t) {
  var n = (n = Ua.current) ? kn(n) : null;
  if (!n) throw Error(z(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof u.precedence == "string" && typeof u.href == "string" ? (a = Cu(u.href), u = Uu(
        n
      ).hoistableStyles, t = u.get(a), t || (t = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, u.set(a, t)), t) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
        l = Cu(u.href);
        var f = Uu(
          n
        ).hoistableStyles, c = f.get(l);
        if (c || (n = n.ownerDocument || n, c = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, f.set(l, c), (f = n.querySelector(
          wt(l)
        )) && !f._p && (c.instance = f, c.state.loading = 5), Zl.has(l) || (u = {
          rel: "preload",
          as: "style",
          href: u.href,
          crossOrigin: u.crossOrigin,
          integrity: u.integrity,
          media: u.media,
          hrefLang: u.hrefLang,
          referrerPolicy: u.referrerPolicy
        }, Zl.set(l, u), f || Py(
          n,
          l,
          u,
          c.state
        ))), a && t === null)
          throw Error(z(528, ""));
        return c;
      }
      if (a && t !== null)
        throw Error(z(529, ""));
      return null;
    case "script":
      return a = u.async, u = u.src, typeof u == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = wu(u), u = Uu(
        n
      ).hoistableScripts, t = u.get(a), t || (t = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, u.set(a, t)), t) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(z(444, l));
  }
}
function Cu(l) {
  return 'href="' + Yl(l) + '"';
}
function wt(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function Ov(l) {
  return x({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function Py(l, a, u, t) {
  l.querySelector('link[rel="preload"][as="style"][' + a + "]") ? t.loading = 1 : (a = l.createElement("link"), t.preload = a, a.addEventListener("load", function() {
    return t.loading |= 1;
  }), a.addEventListener("error", function() {
    return t.loading |= 2;
  }), hl(a, "link", u), fl(a), l.head.appendChild(a));
}
function wu(l) {
  return '[src="' + Yl(l) + '"]';
}
function Wt(l) {
  return "script[async]" + l;
}
function Wi(l, a, u) {
  if (a.count++, a.instance === null)
    switch (a.type) {
      case "style":
        var t = l.querySelector(
          'style[data-href~="' + Yl(u.href) + '"]'
        );
        if (t)
          return a.instance = t, fl(t), t;
        var n = x({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return t = (l.ownerDocument || l).createElement(
          "style"
        ), fl(t), hl(t, "style", n), Dn(t, u.precedence, l), a.instance = t;
      case "stylesheet":
        n = Cu(u.href);
        var f = l.querySelector(
          wt(n)
        );
        if (f)
          return a.state.loading |= 4, a.instance = f, fl(f), f;
        t = Ov(u), (n = Zl.get(n)) && Ye(t, n), f = (l.ownerDocument || l).createElement("link"), fl(f);
        var c = f;
        return c._p = new Promise(function(e, i) {
          c.onload = e, c.onerror = i;
        }), hl(f, "link", t), a.state.loading |= 4, Dn(f, u.precedence, l), a.instance = f;
      case "script":
        return f = wu(u.src), (n = l.querySelector(
          Wt(f)
        )) ? (a.instance = n, fl(n), n) : (t = u, (n = Zl.get(f)) && (t = x({}, u), Re(t, n)), l = l.ownerDocument || l, n = l.createElement("script"), fl(n), hl(n, "link", t), l.head.appendChild(n), a.instance = n);
      case "void":
        return null;
      default:
        throw Error(z(443, a.type));
    }
  else
    a.type === "stylesheet" && !(a.state.loading & 4) && (t = a.instance, a.state.loading |= 4, Dn(t, u.precedence, l));
  return a.instance;
}
function Dn(l, a, u) {
  for (var t = u.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), n = t.length ? t[t.length - 1] : null, f = n, c = 0; c < t.length; c++) {
    var e = t[c];
    if (e.dataset.precedence === a) f = e;
    else if (f !== n) break;
  }
  f ? f.parentNode.insertBefore(l, f.nextSibling) : (a = u.nodeType === 9 ? u.head : u, a.insertBefore(l, a.firstChild));
}
function Ye(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.title == null && (l.title = a.title);
}
function Re(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.integrity == null && (l.integrity = a.integrity);
}
var Un = null;
function $i(l, a, u) {
  if (Un === null) {
    var t = /* @__PURE__ */ new Map(), n = Un = /* @__PURE__ */ new Map();
    n.set(u, t);
  } else
    n = Un, t = n.get(u), t || (t = /* @__PURE__ */ new Map(), n.set(u, t));
  if (t.has(l)) return t;
  for (t.set(l, null), u = u.getElementsByTagName(l), n = 0; n < u.length; n++) {
    var f = u[n];
    if (!(f[Mt] || f[yl] || l === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
      var c = f.getAttribute(a) || "";
      c = l + c;
      var e = t.get(c);
      e ? e.push(f) : t.set(c, [f]);
    }
  }
  return t;
}
function ki(l, a, u) {
  l = l.ownerDocument || l, l.head.insertBefore(
    u,
    a === "title" ? l.querySelector("head > title") : null
  );
}
function Iy(l, a, u) {
  if (u === 1 || a.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
        break;
      return !0;
    case "link":
      if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
        break;
      switch (a.rel) {
        case "stylesheet":
          return l = a.disabled, typeof a.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
        return !0;
  }
  return !1;
}
function Hv(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var _t = null;
function ld() {
}
function ad(l, a, u) {
  if (_t === null) throw Error(z(475));
  var t = _t;
  if (a.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(a.state.loading & 4)) {
    if (a.instance === null) {
      var n = Cu(u.href), f = l.querySelector(
        wt(n)
      );
      if (f) {
        l = f._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Fn.bind(t), l.then(t, t)), a.state.loading |= 4, a.instance = f, fl(f);
        return;
      }
      f = l.ownerDocument || l, u = Ov(u), (n = Zl.get(n)) && Ye(u, n), f = f.createElement("link"), fl(f);
      var c = f;
      c._p = new Promise(function(e, i) {
        c.onload = e, c.onerror = i;
      }), hl(f, "link", u), a.instance = f;
    }
    t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, l), (l = a.state.preload) && !(a.state.loading & 3) && (t.count++, a = Fn.bind(t), l.addEventListener("load", a), l.addEventListener("error", a));
  }
}
function ud() {
  if (_t === null) throw Error(z(475));
  var l = _t;
  return l.stylesheets && l.count === 0 && xc(l, l.stylesheets), 0 < l.count ? function(a) {
    var u = setTimeout(function() {
      if (l.stylesheets && xc(l, l.stylesheets), l.unsuspend) {
        var t = l.unsuspend;
        l.unsuspend = null, t();
      }
    }, 6e4);
    return l.unsuspend = a, function() {
      l.unsuspend = null, clearTimeout(u);
    };
  } : null;
}
function Fn() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) xc(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var rn = null;
function xc(l, a) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, rn = /* @__PURE__ */ new Map(), a.forEach(td, l), rn = null, Fn.call(l));
}
function td(l, a) {
  if (!(a.state.loading & 4)) {
    var u = rn.get(l);
    if (u) var t = u.get(null);
    else {
      u = /* @__PURE__ */ new Map(), rn.set(l, u);
      for (var n = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), f = 0; f < n.length; f++) {
        var c = n[f];
        (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (u.set(c.dataset.precedence, c), t = c);
      }
      t && u.set(null, t);
    }
    n = a.instance, c = n.getAttribute("data-precedence"), f = u.get(c) || t, f === t && u.set(null, n), u.set(c, n), this.count++, t = Fn.bind(this), n.addEventListener("load", t), n.addEventListener("error", t), f ? f.parentNode.insertBefore(n, f.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), a.state.loading |= 4;
  }
}
var Yt = {
  $$typeof: ta,
  Provider: null,
  Consumer: null,
  _currentValue: Ja,
  _currentValue2: Ja,
  _threadCount: 0
};
function nd(l, a, u, t, n, f, c, e) {
  this.tag = 1, this.containerInfo = l, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Mf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mf(0), this.hiddenUpdates = Mf(null), this.identifierPrefix = t, this.onUncaughtError = n, this.onCaughtError = f, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = e, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function ov(l, a, u, t, n, f, c, e, i, v, s, b) {
  return l = new nd(
    l,
    a,
    u,
    c,
    e,
    i,
    v,
    b
  ), a = 1, f === !0 && (a |= 24), f = Xl(3, null, null, a), l.current = f, f.stateNode = l, a = ee(), a.refCount++, l.pooledCache = a, a.refCount++, f.memoizedState = {
    element: t,
    isDehydrated: u,
    cache: a
  }, Me(f), l;
}
function qv(l) {
  return l ? (l = Tu, l) : Tu;
}
function Bv(l, a, u, t, n, f) {
  n = qv(n), t.context === null ? t.context = n : t.pendingContext = n, t = Oa(a), t.payload = { element: u }, f = f === void 0 ? null : f, f !== null && (t.callback = f), u = Ha(l, t, a), u !== null && (Sl(u, l, a), St(u, l, a));
}
function Fi(l, a) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var u = l.retryLane;
    l.retryLane = u !== 0 && u < a ? u : a;
  }
}
function Xe(l, a) {
  Fi(l, a), (l = l.alternate) && Fi(l, a);
}
function Nv(l) {
  if (l.tag === 13) {
    var a = Ya(l, 67108864);
    a !== null && Sl(a, l, 67108864), Xe(l, 67108864);
  }
}
var Pn = !0;
function fd(l, a, u, t) {
  var n = H.T;
  H.T = null;
  var f = K.p;
  try {
    K.p = 2, Qe(l, a, u, t);
  } finally {
    K.p = f, H.T = n;
  }
}
function cd(l, a, u, t) {
  var n = H.T;
  H.T = null;
  var f = K.p;
  try {
    K.p = 8, Qe(l, a, u, t);
  } finally {
    K.p = f, H.T = n;
  }
}
function Qe(l, a, u, t) {
  if (Pn) {
    var n = Lc(t);
    if (n === null)
      kf(
        l,
        a,
        t,
        In,
        u
      ), ri(l, t);
    else if (id(
      n,
      l,
      a,
      u,
      t
    ))
      t.stopPropagation();
    else if (ri(l, t), a & 4 && -1 < ed.indexOf(l)) {
      for (; n !== null; ) {
        var f = Lu(n);
        if (f !== null)
          switch (f.tag) {
            case 3:
              if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                var c = Ca(f.pendingLanes);
                if (c !== 0) {
                  var e = f;
                  for (e.pendingLanes |= 2, e.entangledLanes |= 2; c; ) {
                    var i = 1 << 31 - Dl(c);
                    e.entanglements[1] |= i, c &= ~i;
                  }
                  kl(f), !(J & 6) && (Ln = Jl() + 500, Jt(0));
                }
              }
              break;
            case 13:
              e = Ya(f, 2), e !== null && Sl(e, f, 2), yf(), Xe(f, 2);
          }
        if (f = Lc(t), f === null && kf(
          l,
          a,
          t,
          In,
          u
        ), f === n) break;
        n = f;
      }
      n !== null && t.stopPropagation();
    } else
      kf(
        l,
        a,
        t,
        null,
        u
      );
  }
}
function Lc(l) {
  return l = rc(l), Ge(l);
}
var In = null;
function Ge(l) {
  if (In = null, l = La(l), l !== null) {
    var a = Ku(l);
    if (a === null) l = null;
    else {
      var u = a.tag;
      if (u === 13) {
        if (l = i0(a), l !== null) return l;
        l = null;
      } else if (u === 3) {
        if (a.stateNode.current.memoizedState.isDehydrated)
          return a.tag === 3 ? a.stateNode.containerInfo : null;
        l = null;
      } else a !== l && (l = null);
    }
  }
  return In = l, null;
}
function _v(l) {
  switch (l) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (wv()) {
        case h0:
          return 2;
        case y0:
          return 8;
        case Bn:
        case Wv:
          return 32;
        case d0:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var pc = !1, Ba = null, Na = null, _a = null, Rt = /* @__PURE__ */ new Map(), Xt = /* @__PURE__ */ new Map(), Ea = [], ed = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function ri(l, a) {
  switch (l) {
    case "focusin":
    case "focusout":
      Ba = null;
      break;
    case "dragenter":
    case "dragleave":
      Na = null;
      break;
    case "mouseover":
    case "mouseout":
      _a = null;
      break;
    case "pointerover":
    case "pointerout":
      Rt.delete(a.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xt.delete(a.pointerId);
  }
}
function lt(l, a, u, t, n, f) {
  return l === null || l.nativeEvent !== f ? (l = {
    blockedOn: a,
    domEventName: u,
    eventSystemFlags: t,
    nativeEvent: f,
    targetContainers: [n]
  }, a !== null && (a = Lu(a), a !== null && Nv(a)), l) : (l.eventSystemFlags |= t, a = l.targetContainers, n !== null && a.indexOf(n) === -1 && a.push(n), l);
}
function id(l, a, u, t, n) {
  switch (a) {
    case "focusin":
      return Ba = lt(
        Ba,
        l,
        a,
        u,
        t,
        n
      ), !0;
    case "dragenter":
      return Na = lt(
        Na,
        l,
        a,
        u,
        t,
        n
      ), !0;
    case "mouseover":
      return _a = lt(
        _a,
        l,
        a,
        u,
        t,
        n
      ), !0;
    case "pointerover":
      var f = n.pointerId;
      return Rt.set(
        f,
        lt(
          Rt.get(f) || null,
          l,
          a,
          u,
          t,
          n
        )
      ), !0;
    case "gotpointercapture":
      return f = n.pointerId, Xt.set(
        f,
        lt(
          Xt.get(f) || null,
          l,
          a,
          u,
          t,
          n
        )
      ), !0;
  }
  return !1;
}
function Yv(l) {
  var a = La(l.target);
  if (a !== null) {
    var u = Ku(a);
    if (u !== null) {
      if (a = u.tag, a === 13) {
        if (a = i0(u), a !== null) {
          l.blockedOn = a, uh(l.priority, function() {
            if (u.tag === 13) {
              var t = Ul(), n = Ya(u, t);
              n !== null && Sl(n, u, t), Xe(u, t);
            }
          });
          return;
        }
      } else if (a === 3 && u.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function On(l) {
  if (l.blockedOn !== null) return !1;
  for (var a = l.targetContainers; 0 < a.length; ) {
    var u = Lc(l.nativeEvent);
    if (u === null) {
      u = l.nativeEvent;
      var t = new u.constructor(
        u.type,
        u
      );
      ic = t, u.target.dispatchEvent(t), ic = null;
    } else
      return a = Lu(u), a !== null && Nv(a), l.blockedOn = u, !1;
    a.shift();
  }
  return !0;
}
function Pi(l, a, u) {
  On(l) && u.delete(a);
}
function vd() {
  pc = !1, Ba !== null && On(Ba) && (Ba = null), Na !== null && On(Na) && (Na = null), _a !== null && On(_a) && (_a = null), Rt.forEach(Pi), Xt.forEach(Pi);
}
function yn(l, a) {
  l.blockedOn === a && (l.blockedOn = null, pc || (pc = !0, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    vd
  )));
}
var dn = null;
function Ii(l) {
  dn !== l && (dn = l, ul.unstable_scheduleCallback(
    ul.unstable_NormalPriority,
    function() {
      dn === l && (dn = null);
      for (var a = 0; a < l.length; a += 3) {
        var u = l[a], t = l[a + 1], n = l[a + 2];
        if (typeof t != "function") {
          if (Ge(t || u) === null)
            continue;
          break;
        }
        var f = Lu(u);
        f !== null && (l.splice(a, 3), a -= 3, zc(
          f,
          {
            pending: !0,
            data: n,
            method: u.method,
            action: t
          },
          t,
          n
        ));
      }
    }
  ));
}
function Qt(l) {
  function a(i) {
    return yn(i, l);
  }
  Ba !== null && yn(Ba, l), Na !== null && yn(Na, l), _a !== null && yn(_a, l), Rt.forEach(a), Xt.forEach(a);
  for (var u = 0; u < Ea.length; u++) {
    var t = Ea[u];
    t.blockedOn === l && (t.blockedOn = null);
  }
  for (; 0 < Ea.length && (u = Ea[0], u.blockedOn === null); )
    Yv(u), u.blockedOn === null && Ea.shift();
  if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
    for (t = 0; t < u.length; t += 3) {
      var n = u[t], f = u[t + 1], c = n[gl] || null;
      if (typeof f == "function")
        c || Ii(u);
      else if (c) {
        var e = null;
        if (f && f.hasAttribute("formAction")) {
          if (n = f, c = f[gl] || null)
            e = c.formAction;
          else if (Ge(n) !== null) continue;
        } else e = c.action;
        typeof e == "function" ? u[t + 1] = e : (u.splice(t, 3), t -= 3), Ii(u);
      }
    }
}
function Ze(l) {
  this._internalRoot = l;
}
Sf.prototype.render = Ze.prototype.render = function(l) {
  var a = this._internalRoot;
  if (a === null) throw Error(z(409));
  var u = a.current, t = Ul();
  Bv(u, t, l, a, null, null);
};
Sf.prototype.unmount = Ze.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var a = l.containerInfo;
    l.tag === 0 && _u(), Bv(l.current, 2, null, l, null, null), yf(), a[xu] = null;
  }
};
function Sf(l) {
  this._internalRoot = l;
}
Sf.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var a = z0();
    l = { blockedOn: null, target: l, priority: a };
    for (var u = 0; u < Ea.length && a !== 0 && a < Ea[u].priority; u++) ;
    Ea.splice(u, 0, l), u === 0 && Yv(l);
  }
};
var l0 = t0.version;
if (l0 !== "19.0.0")
  throw Error(
    z(
      527,
      l0,
      "19.0.0"
    )
  );
K.findDOMNode = function(l) {
  var a = l._reactInternals;
  if (a === void 0)
    throw typeof l.render == "function" ? Error(z(188)) : (l = Object.keys(l).join(","), Error(z(268, l)));
  return l = Lv(a), l = l !== null ? v0(l) : null, l = l === null ? null : l.stateNode, l;
};
var hd = {
  bundleType: 0,
  version: "19.0.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: H,
  findFiberByHostInstance: La,
  reconcilerVersion: "19.0.0"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var mn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!mn.isDisabled && mn.supportsFiber)
    try {
      Gt = mn.inject(
        hd
      ), Ml = mn;
    } catch {
    }
}
var md = Jc.createRoot = function(l, a) {
  if (!n0(l)) throw Error(z(299));
  var u = !1, t = "", n = B1, f = N1, c = _1, e = null;
  return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (t = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (e = a.unstable_transitionCallbacks)), a = ov(
    l,
    1,
    !1,
    null,
    null,
    u,
    t,
    n,
    f,
    c,
    e,
    null
  ), l[xu] = a.current, _e(
    l.nodeType === 8 ? l.parentNode : l
  ), new Ze(a);
}, Sd = Jc.hydrateRoot = function(l, a, u) {
  if (!n0(l)) throw Error(z(299));
  var t = !1, n = "", f = B1, c = N1, e = _1, i = null, v = null;
  return u != null && (u.unstable_strictMode === !0 && (t = !0), u.identifierPrefix !== void 0 && (n = u.identifierPrefix), u.onUncaughtError !== void 0 && (f = u.onUncaughtError), u.onCaughtError !== void 0 && (c = u.onCaughtError), u.onRecoverableError !== void 0 && (e = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (i = u.unstable_transitionCallbacks), u.formState !== void 0 && (v = u.formState)), a = ov(
    l,
    1,
    !0,
    a,
    u ?? null,
    t,
    n,
    f,
    c,
    e,
    i,
    v
  ), a.context = qv(null), u = a.current, t = Ul(), n = Oa(t), n.callback = null, Ha(u, n, t), a.current.lanes = t, jt(a, t), kl(a), l[xu] = a.current, _e(l), new Sf(a);
}, sd = Jc.version = "19.0.0";
export {
  md as createRoot,
  Jc as default,
  Sd as hydrateRoot,
  sd as version
};
