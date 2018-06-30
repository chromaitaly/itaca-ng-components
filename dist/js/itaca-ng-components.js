/*******************************************************************************
********************************************************************************
********************************************************************************
***	   itaca-ng-components														 
***    Copyright (C) 2016-2018  Chroma Italy Hotels srl	 
***                                                                          
***    This program is free software: you can redistribute it and/or modify  
***    it under the terms of the GNU General Public License as published by  
***    the Free Software Foundation, either version 3 of the License, or     
***    (at your option) any later version.                                   
***                                                                          
***    This program is distributed in the hope that it will be useful,       
***    but WITHOUT ANY WARRANTY; without even the implied warranty of        
***    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         
***    GNU General Public License for more details.                          
***                                                                          
***    You should have received a copy of the GNU General Public License     
***    along with this program.  If not, see <http://www.gnu.org/licenses/>. 
********************************************************************************
********************************************************************************
*******************************************************************************/
var colorPicker = function() {
    "use strict";
    function e(e) {
        return void 0 === e || null === e;
    }
    function t(e) {
        return void 0 !== e && null !== e;
    }
    function n(e) {
        return !0 === e;
    }
    function r(e) {
        return !1 === e;
    }
    function o(e) {
        return "string" == typeof e || "number" == typeof e || "boolean" == typeof e;
    }
    function a(e) {
        return null !== e && "object" == typeof e;
    }
    function i(e) {
        return "[object Object]" === cr.call(e);
    }
    function s(e) {
        return "[object RegExp]" === cr.call(e);
    }
    function c(e) {
        var t = parseFloat(e);
        return t >= 0 && Math.floor(t) === t && isFinite(e);
    }
    function l(e) {
        return null == e ? "" : "object" == typeof e ? JSON.stringify(e, null, 2) : String(e);
    }
    function u(e) {
        var t = parseFloat(e);
        return isNaN(t) ? e : t;
    }
    function f(e, t) {
        for (var n = Object.create(null), r = e.split(","), o = 0; o < r.length; o++) n[r[o]] = !0;
        return t ? function(e) {
            return n[e.toLowerCase()];
        } : function(e) {
            return n[e];
        };
    }
    function d(e, t) {
        if (e.length) {
            var n = e.indexOf(t);
            if (n > -1) return e.splice(n, 1);
        }
    }
    function p(e, t) {
        return ur.call(e, t);
    }
    function h(e) {
        var t = Object.create(null);
        return function(n) {
            return t[n] || (t[n] = e(n));
        };
    }
    function v(e, t) {
        function n(n) {
            var r = arguments.length;
            return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
        }
        return n._length = e.length, n;
    }
    function m(e, t) {
        t = t || 0;
        for (var n = e.length - t, r = new Array(n); n--; ) r[n] = e[n + t];
        return r;
    }
    function y(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function b(e) {
        for (var t = {}, n = 0; n < e.length; n++) e[n] && y(t, e[n]);
        return t;
    }
    function g(e, t, n) {}
    function _(e, t) {
        if (e === t) return !0;
        var n = a(e), r = a(t);
        if (!n || !r) return !n && !r && String(e) === String(t);
        try {
            var o = Array.isArray(e), i = Array.isArray(t);
            if (o && i) return e.length === t.length && e.every(function(e, n) {
                return _(e, t[n]);
            });
            if (o || i) return !1;
            var s = Object.keys(e), c = Object.keys(t);
            return s.length === c.length && s.every(function(n) {
                return _(e[n], t[n]);
            });
        } catch (e) {
            return !1;
        }
    }
    function C(e, t) {
        for (var n = 0; n < e.length; n++) if (_(e[n], t)) return n;
        return -1;
    }
    function w(e) {
        var t = !1;
        return function() {
            t || (t = !0, e.apply(this, arguments));
        };
    }
    function E(e) {
        var t = (e + "").charCodeAt(0);
        return 36 === t || 95 === t;
    }
    function A(e, t, n, r) {
        Object.defineProperty(e, t, {
            value: n,
            enumerable: !!r,
            writable: !0,
            configurable: !0
        });
    }
    function T(e) {
        if (!Er.test(e)) {
            var t = e.split(".");
            return function(e) {
                for (var n = 0; n < t.length; n++) {
                    if (!e) return;
                    e = e[t[n]];
                }
                return e;
            };
        }
    }
    function k(e, t, n) {
        if (Cr.errorHandler) Cr.errorHandler.call(null, e, t, n); else {
            if (!kr || "undefined" == typeof console) throw e;
            console.error(e);
        }
    }
    function O(e) {
        return "function" == typeof e && /native code/.test(e.toString());
    }
    function x(e) {
        Br.target && qr.push(Br.target), Br.target = e;
    }
    function M() {
        Br.target = qr.pop();
    }
    function L(e, t, n) {
        e.__proto__ = t;
    }
    function $(e, t, n) {
        for (var r = 0, o = n.length; r < o; r++) {
            var a = n[r];
            A(e, a, t[a]);
        }
    }
    function S(e, t) {
        if (a(e)) {
            var n;
            return p(e, "__ob__") && e.__ob__ instanceof Xr ? n = e.__ob__ : Gr.shouldConvert && !Rr() && (Array.isArray(e) || i(e)) && Object.isExtensible(e) && !e._isVue && (n = new Xr(e)), 
            t && n && n.vmCount++, n;
        }
    }
    function H(e, t, n, r, o) {
        var a = new Br(), i = Object.getOwnPropertyDescriptor(e, t);
        if (!i || !1 !== i.configurable) {
            var s = i && i.get, c = i && i.set, l = !o && S(n);
            Object.defineProperty(e, t, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    var t = s ? s.call(e) : n;
                    return Br.target && (a.depend(), l && (l.dep.depend(), Array.isArray(t) && N(t))), 
                    t;
                },
                set: function(t) {
                    var r = s ? s.call(e) : n;
                    t === r || t !== t && r !== r || (c ? c.call(e, t) : n = t, l = !o && S(t), a.notify());
                }
            });
        }
    }
    function P(e, t, n) {
        if (Array.isArray(e) && c(t)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), 
        n;
        if (p(e, t)) return e[t] = n, n;
        var r = e.__ob__;
        return e._isVue || r && r.vmCount ? n : r ? (H(r.value, t, n), r.dep.notify(), n) : (e[t] = n, 
        n);
    }
    function j(e, t) {
        if (Array.isArray(e) && c(t)) e.splice(t, 1); else {
            var n = e.__ob__;
            e._isVue || n && n.vmCount || p(e, t) && (delete e[t], n && n.dep.notify());
        }
    }
    function N(e) {
        for (var t = void 0, n = 0, r = e.length; n < r; n++) (t = e[n]) && t.__ob__ && t.__ob__.dep.depend(), 
        Array.isArray(t) && N(t);
    }
    function I(e, t) {
        if (!t) return e;
        for (var n, r, o, a = Object.keys(t), s = 0; s < a.length; s++) r = e[n = a[s]], 
        o = t[n], p(e, n) ? i(r) && i(o) && I(r, o) : P(e, n, o);
        return e;
    }
    function D(e, t, n) {
        return n ? e || t ? function() {
            var r = "function" == typeof t ? t.call(n) : t, o = "function" == typeof e ? e.call(n) : e;
            return r ? I(r, o) : o;
        } : void 0 : t ? e ? function() {
            return I("function" == typeof t ? t.call(this) : t, "function" == typeof e ? e.call(this) : e);
        } : t : e;
    }
    function R(e, t) {
        return t ? e ? e.concat(t) : Array.isArray(t) ? t : [ t ] : e;
    }
    function F(e, t) {
        var n = Object.create(e || null);
        return t ? y(n, t) : n;
    }
    function V(e) {
        var t = e.props;
        if (t) {
            var n, r, o = {};
            if (Array.isArray(t)) for (n = t.length; n--; ) "string" == typeof (r = t[n]) && (o[dr(r)] = {
                type: null
            }); else if (i(t)) for (var a in t) r = t[a], o[dr(a)] = i(r) ? r : {
                type: r
            };
            e.props = o;
        }
    }
    function U(e) {
        var t = e.inject;
        if (Array.isArray(t)) for (var n = e.inject = {}, r = 0; r < t.length; r++) n[t[r]] = t[r];
    }
    function z(e) {
        var t = e.directives;
        if (t) for (var n in t) {
            var r = t[n];
            "function" == typeof r && (t[n] = {
                bind: r,
                update: r
            });
        }
    }
    function B(e, t, n) {
        function r(r) {
            var o = Yr[r] || Jr;
            c[r] = o(e[r], t[r], n, r);
        }
        "function" == typeof t && (t = t.options), V(t), U(t), z(t);
        var o = t.extends;
        if (o && (e = B(e, o, n)), t.mixins) for (var a = 0, i = t.mixins.length; a < i; a++) e = B(e, t.mixins[a], n);
        var s, c = {};
        for (s in e) r(s);
        for (s in t) p(e, s) || r(s);
        return c;
    }
    function q(e, t, n, r) {
        if ("string" == typeof n) {
            var o = e[t];
            if (p(o, n)) return o[n];
            var a = dr(n);
            if (p(o, a)) return o[a];
            var i = pr(a);
            if (p(o, i)) return o[i];
            var s = o[n] || o[a] || o[i];
            return s;
        }
    }
    function W(e, t, n, r) {
        var o = t[e], a = !p(n, e), i = n[e];
        if (G(Boolean, o.type) && (a && !p(o, "default") ? i = !1 : G(String, o.type) || "" !== i && i !== vr(e) || (i = !0)), 
        void 0 === i) {
            i = K(r, o, e);
            var s = Gr.shouldConvert;
            Gr.shouldConvert = !0, S(i), Gr.shouldConvert = s;
        }
        return i;
    }
    function K(e, t, n) {
        if (p(t, "default")) {
            var r = t.default;
            return e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e._props[n] ? e._props[n] : "function" == typeof r && "Function" !== Z(t.type) ? r.call(e) : r;
        }
    }
    function Z(e) {
        var t = e && e.toString().match(/^\s*function (\w+)/);
        return t ? t[1] : "";
    }
    function G(e, t) {
        if (!Array.isArray(t)) return Z(t) === Z(e);
        for (var n = 0, r = t.length; n < r; n++) if (Z(t[n]) === Z(e)) return !0;
        return !1;
    }
    function X(e) {
        return new Qr(void 0, void 0, void 0, String(e));
    }
    function Y(e, t) {
        var n = new Qr(e.tag, e.data, e.children, e.text, e.elm, e.context, e.componentOptions, e.asyncFactory);
        return n.ns = e.ns, n.isStatic = e.isStatic, n.key = e.key, n.isComment = e.isComment, 
        n.isCloned = !0, t && e.children && (n.children = J(e.children)), n;
    }
    function J(e, t) {
        for (var n = e.length, r = new Array(n), o = 0; o < n; o++) r[o] = Y(e[o], t);
        return r;
    }
    function Q(e) {
        function t() {
            var e = arguments, n = t.fns;
            if (!Array.isArray(n)) return n.apply(null, arguments);
            for (var r = n.slice(), o = 0; o < r.length; o++) r[o].apply(null, e);
        }
        return t.fns = e, t;
    }
    function ee(e, t) {
        return e.plain ? -1 : t.plain ? 1 : 0;
    }
    function te(t, n, r, o, a) {
        var i, s, c, l, u = [], f = !1;
        for (i in t) s = t[i], c = n[i], (l = ro(i)).plain || (f = !0), e(s) || (e(c) ? (e(s.fns) && (s = t[i] = Q(s)), 
        l.handler = s, u.push(l)) : s !== c && (c.fns = s, t[i] = c));
        if (u.length) {
            f && u.sort(ee);
            for (var d = 0; d < u.length; d++) {
                var p = u[d];
                r(p.name, p.handler, p.once, p.capture, p.passive);
            }
        }
        for (i in n) e(t[i]) && o((l = ro(i)).name, n[i], l.capture);
    }
    function ne(r, o, a) {
        function i() {
            a.apply(this, arguments), d(s.fns, i);
        }
        var s, c = r[o];
        e(c) ? s = Q([ i ]) : t(c.fns) && n(c.merged) ? (s = c).fns.push(i) : s = Q([ c, i ]), 
        s.merged = !0, r[o] = s;
    }
    function re(n, r, o) {
        var a = r.options.props;
        if (!e(a)) {
            var i = {}, s = n.attrs, c = n.props;
            if (t(s) || t(c)) for (var l in a) {
                var u = vr(l);
                oe(i, c, l, u, !0) || oe(i, s, l, u, !1);
            }
            return i;
        }
    }
    function oe(e, n, r, o, a) {
        if (t(n)) {
            if (p(n, r)) return e[r] = n[r], a || delete n[r], !0;
            if (p(n, o)) return e[r] = n[o], a || delete n[o], !0;
        }
        return !1;
    }
    function ae(e) {
        for (var t = 0; t < e.length; t++) if (Array.isArray(e[t])) return Array.prototype.concat.apply([], e);
        return e;
    }
    function ie(e) {
        return o(e) ? [ X(e) ] : Array.isArray(e) ? ce(e) : void 0;
    }
    function se(e) {
        return t(e) && t(e.text) && r(e.isComment);
    }
    function ce(r, a) {
        var i, s, c, l = [];
        for (i = 0; i < r.length; i++) e(s = r[i]) || "boolean" == typeof s || (c = l[l.length - 1], 
        Array.isArray(s) ? l.push.apply(l, ce(s, (a || "") + "_" + i)) : o(s) ? se(c) ? c.text += String(s) : "" !== s && l.push(X(s)) : se(s) && se(c) ? l[l.length - 1] = X(c.text + s.text) : (n(r._isVList) && t(s.tag) && e(s.key) && t(a) && (s.key = "__vlist" + a + "_" + i + "__"), 
        l.push(s)));
        return l;
    }
    function le(e, t) {
        return e.__esModule && e.default && (e = e.default), a(e) ? t.extend(e) : e;
    }
    function ue(e, t, n, r, o) {
        var a = no();
        return a.asyncFactory = e, a.asyncMeta = {
            data: t,
            context: n,
            children: r,
            tag: o
        }, a;
    }
    function fe(r, o, i) {
        if (n(r.error) && t(r.errorComp)) return r.errorComp;
        if (t(r.resolved)) return r.resolved;
        if (n(r.loading) && t(r.loadingComp)) return r.loadingComp;
        if (!t(r.contexts)) {
            var s = r.contexts = [ i ], c = !0, l = function() {
                for (var e = 0, t = s.length; e < t; e++) s[e].$forceUpdate();
            }, u = w(function(e) {
                r.resolved = le(e, o), c || l();
            }), f = w(function(e) {
                t(r.errorComp) && (r.error = !0, l());
            }), d = r(u, f);
            return a(d) && ("function" == typeof d.then ? e(r.resolved) && d.then(u, f) : t(d.component) && "function" == typeof d.component.then && (d.component.then(u, f), 
            t(d.error) && (r.errorComp = le(d.error, o)), t(d.loading) && (r.loadingComp = le(d.loading, o), 
            0 === d.delay ? r.loading = !0 : setTimeout(function() {
                e(r.resolved) && e(r.error) && (r.loading = !0, l());
            }, d.delay || 200)), t(d.timeout) && setTimeout(function() {
                e(r.resolved) && f(null);
            }, d.timeout))), c = !1, r.loading ? r.loadingComp : r.resolved;
        }
        r.contexts.push(i);
    }
    function de(e) {
        return e.isComment && e.asyncFactory;
    }
    function pe(e) {
        if (Array.isArray(e)) for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (t(r) && (t(r.componentOptions) || de(r))) return r;
        }
    }
    function he(e) {
        e._events = Object.create(null), e._hasHookEvent = !1;
        var t = e.$options._parentListeners;
        t && ye(e, t);
    }
    function ve(e, t, n) {
        n ? to.$once(e, t) : to.$on(e, t);
    }
    function me(e, t) {
        to.$off(e, t);
    }
    function ye(e, t, n) {
        to = e, te(t, n || {}, ve, me, e);
    }
    function be(e, t) {
        var n = {};
        if (!e) return n;
        for (var r = [], o = 0, a = e.length; o < a; o++) {
            var i = e[o], s = i.data;
            if (s && s.attrs && s.attrs.slot && delete s.attrs.slot, i.context !== t && i.functionalContext !== t || !s || null == s.slot) r.push(i); else {
                var c = i.data.slot, l = n[c] || (n[c] = []);
                "template" === i.tag ? l.push.apply(l, i.children) : l.push(i);
            }
        }
        return r.every(ge) || (n.default = r), n;
    }
    function ge(e) {
        return e.isComment || " " === e.text;
    }
    function _e(e, t) {
        t = t || {};
        for (var n = 0; n < e.length; n++) Array.isArray(e[n]) ? _e(e[n], t) : t[e[n].key] = e[n].fn;
        return t;
    }
    function Ce(e) {
        var t = e.$options, n = t.parent;
        if (n && !t.abstract) {
            for (;n.$options.abstract && n.$parent; ) n = n.$parent;
            n.$children.push(e);
        }
        e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, 
        e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, 
        e._isBeingDestroyed = !1;
    }
    function we(e, t, n) {
        e.$el = t, e.$options.render || (e.$options.render = no), Oe(e, "beforeMount");
        var r;
        return r = function() {
            e._update(e._render(), n);
        }, e._watcher = new po(e, r, g), n = !1, null == e.$vnode && (e._isMounted = !0, 
        Oe(e, "mounted")), e;
    }
    function Ee(e, t, n, r, o) {
        var a = !!(o || e.$options._renderChildren || r.data.scopedSlots || e.$scopedSlots !== wr);
        if (e.$options._parentVnode = r, e.$vnode = r, e._vnode && (e._vnode.parent = r), 
        e.$options._renderChildren = o, e.$attrs = r.data && r.data.attrs || wr, e.$listeners = n || wr, 
        t && e.$options.props) {
            Gr.shouldConvert = !1;
            for (var i = e._props, s = e.$options._propKeys || [], c = 0; c < s.length; c++) {
                var l = s[c];
                i[l] = W(l, e.$options.props, t, e);
            }
            Gr.shouldConvert = !0, e.$options.propsData = t;
        }
        if (n) {
            var u = e.$options._parentListeners;
            e.$options._parentListeners = n, ye(e, n, u);
        }
        a && (e.$slots = be(o, r.context), e.$forceUpdate());
    }
    function Ae(e) {
        for (;e && (e = e.$parent); ) if (e._inactive) return !0;
        return !1;
    }
    function Te(e, t) {
        if (t) {
            if (e._directInactive = !1, Ae(e)) return;
        } else if (e._directInactive) return;
        if (e._inactive || null === e._inactive) {
            e._inactive = !1;
            for (var n = 0; n < e.$children.length; n++) Te(e.$children[n]);
            Oe(e, "activated");
        }
    }
    function ke(e, t) {
        if (!(t && (e._directInactive = !0, Ae(e)) || e._inactive)) {
            e._inactive = !0;
            for (var n = 0; n < e.$children.length; n++) ke(e.$children[n]);
            Oe(e, "deactivated");
        }
    }
    function Oe(e, t) {
        var n = e.$options[t];
        if (n) for (var r = 0, o = n.length; r < o; r++) try {
            n[r].call(e);
        } catch (n) {
            k(n, e, t + " hook");
        }
        e._hasHookEvent && e.$emit("hook:" + t);
    }
    function xe() {
        uo = ao.length = io.length = 0, so = {}, co = lo = !1;
    }
    function Me() {
        lo = !0;
        var e, t;
        for (ao.sort(function(e, t) {
            return e.id - t.id;
        }), uo = 0; uo < ao.length; uo++) t = (e = ao[uo]).id, so[t] = null, e.run();
        var n = io.slice(), r = ao.slice();
        xe(), Se(n), Le(r), Fr && Cr.devtools && Fr.emit("flush");
    }
    function Le(e) {
        for (var t = e.length; t--; ) {
            var n = e[t], r = n.vm;
            r._watcher === n && r._isMounted && Oe(r, "updated");
        }
    }
    function $e(e) {
        e._inactive = !1, io.push(e);
    }
    function Se(e) {
        for (var t = 0; t < e.length; t++) e[t]._inactive = !0, Te(e[t], !0);
    }
    function He(e) {
        var t = e.id;
        if (null == so[t]) {
            if (so[t] = !0, lo) {
                for (var n = ao.length - 1; n > uo && ao[n].id > e.id; ) n--;
                ao.splice(n + 1, 0, e);
            } else ao.push(e);
            co || (co = !0, Ur(Me));
        }
    }
    function Pe(e) {
        ho.clear(), je(e, ho);
    }
    function je(e, t) {
        var n, r, o = Array.isArray(e);
        if ((o || a(e)) && Object.isExtensible(e)) {
            if (e.__ob__) {
                var i = e.__ob__.dep.id;
                if (t.has(i)) return;
                t.add(i);
            }
            if (o) for (n = e.length; n--; ) je(e[n], t); else for (n = (r = Object.keys(e)).length; n--; ) je(e[r[n]], t);
        }
    }
    function Ne(e, t, n) {
        vo.get = function() {
            return this[t][n];
        }, vo.set = function(e) {
            this[t][n] = e;
        }, Object.defineProperty(e, n, vo);
    }
    function Ie(e) {
        e._watchers = [];
        var t = e.$options;
        t.props && De(e, t.props), t.methods && Be(e, t.methods), t.data ? Re(e) : S(e._data = {}, !0), 
        t.computed && Ve(e, t.computed), t.watch && t.watch !== Pr && qe(e, t.watch);
    }
    function De(e, t) {
        var n = e.$options.propsData || {}, r = e._props = {}, o = e.$options._propKeys = [], a = !e.$parent;
        Gr.shouldConvert = a;
        for (var i in t) !function(a) {
            o.push(a);
            var i = W(a, t, n, e);
            H(r, a, i), a in e || Ne(e, "_props", a);
        }(i);
        Gr.shouldConvert = !0;
    }
    function Re(e) {
        var t = e.$options.data;
        i(t = e._data = "function" == typeof t ? Fe(t, e) : t || {}) || (t = {});
        for (var n = Object.keys(t), r = e.$options.props, o = n.length; o--; ) {
            var a = n[o];
            r && p(r, a) || E(a) || Ne(e, "_data", a);
        }
        S(t, !0);
    }
    function Fe(e, t) {
        try {
            return e.call(t);
        } catch (e) {
            return k(e, t, "data()"), {};
        }
    }
    function Ve(e, t) {
        var n = e._computedWatchers = Object.create(null), r = Rr();
        for (var o in t) {
            var a = t[o], i = "function" == typeof a ? a : a.get;
            r || (n[o] = new po(e, i || g, g, mo)), o in e || Ue(e, o, a);
        }
    }
    function Ue(e, t, n) {
        var r = !Rr();
        "function" == typeof n ? (vo.get = r ? ze(t) : n, vo.set = g) : (vo.get = n.get ? r && !1 !== n.cache ? ze(t) : n.get : g, 
        vo.set = n.set ? n.set : g), Object.defineProperty(e, t, vo);
    }
    function ze(e) {
        return function() {
            var t = this._computedWatchers && this._computedWatchers[e];
            if (t) return t.dirty && t.evaluate(), Br.target && t.depend(), t.value;
        };
    }
    function Be(e, t) {
        for (var n in t) e[n] = null == t[n] ? g : v(t[n], e);
    }
    function qe(e, t) {
        for (var n in t) {
            var r = t[n];
            if (Array.isArray(r)) for (var o = 0; o < r.length; o++) We(e, n, r[o]); else We(e, n, r);
        }
    }
    function We(e, t, n, r) {
        return i(n) && (r = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, r);
    }
    function Ke(e) {
        var t = e.$options.provide;
        t && (e._provided = "function" == typeof t ? t.call(e) : t);
    }
    function Ze(e) {
        var t = Ge(e.$options.inject, e);
        t && (Gr.shouldConvert = !1, Object.keys(t).forEach(function(n) {
            H(e, n, t[n]);
        }), Gr.shouldConvert = !0);
    }
    function Ge(e, t) {
        if (e) {
            for (var n = Object.create(null), r = Vr ? Reflect.ownKeys(e).filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }) : Object.keys(e), o = 0; o < r.length; o++) for (var a = r[o], i = e[a], s = t; s; ) {
                if (s._provided && i in s._provided) {
                    n[a] = s._provided[i];
                    break;
                }
                s = s.$parent;
            }
            return n;
        }
    }
    function Xe(e, n, r, o, a) {
        var i = {}, s = e.options.props;
        if (t(s)) for (var c in s) i[c] = W(c, s, n || wr); else t(r.attrs) && Ye(i, r.attrs), 
        t(r.props) && Ye(i, r.props);
        var l = Object.create(o), u = e.options.render.call(null, function(e, t, n, r) {
            return rt(l, e, t, n, r, !0);
        }, {
            data: r,
            props: i,
            children: a,
            parent: o,
            listeners: r.on || wr,
            injections: Ge(e.options.inject, o),
            slots: function() {
                return be(a, o);
            }
        });
        return u instanceof Qr && (u.functionalContext = o, u.functionalOptions = e.options, 
        r.slot && ((u.data || (u.data = {})).slot = r.slot)), u;
    }
    function Ye(e, t) {
        for (var n in t) e[dr(n)] = t[n];
    }
    function Je(r, o, i, s, c) {
        if (!e(r)) {
            var l = i.$options._base;
            if (a(r) && (r = l.extend(r)), "function" == typeof r) {
                var u;
                if (e(r.cid) && (u = r, void 0 === (r = fe(u, l, i)))) return ue(u, o, i, s, c);
                o = o || {}, bt(r), t(o.model) && nt(r.options, o);
                var f = re(o, r, c);
                if (n(r.options.functional)) return Xe(r, f, o, i, s);
                var d = o.on;
                if (o.on = o.nativeOn, n(r.options.abstract)) {
                    var p = o.slot;
                    o = {}, p && (o.slot = p);
                }
                et(o);
                var h = r.options.name || c;
                return new Qr("vue-component-" + r.cid + (h ? "-" + h : ""), o, void 0, void 0, void 0, i, {
                    Ctor: r,
                    propsData: f,
                    listeners: d,
                    tag: c,
                    children: s
                }, u);
            }
        }
    }
    function Qe(e, n, r, o) {
        var a = e.componentOptions, i = {
            _isComponent: !0,
            parent: n,
            propsData: a.propsData,
            _componentTag: a.tag,
            _parentVnode: e,
            _parentListeners: a.listeners,
            _renderChildren: a.children,
            _parentElm: r || null,
            _refElm: o || null
        }, s = e.data.inlineTemplate;
        return t(s) && (i.render = s.render, i.staticRenderFns = s.staticRenderFns), new a.Ctor(i);
    }
    function et(e) {
        e.hook || (e.hook = {});
        for (var t = 0; t < bo.length; t++) {
            var n = bo[t], r = e.hook[n], o = yo[n];
            e.hook[n] = r ? tt(o, r) : o;
        }
    }
    function tt(e, t) {
        return function(n, r, o, a) {
            e(n, r, o, a), t(n, r, o, a);
        };
    }
    function nt(e, n) {
        var r = e.model && e.model.prop || "value", o = e.model && e.model.event || "input";
        (n.props || (n.props = {}))[r] = n.model.value;
        var a = n.on || (n.on = {});
        t(a[o]) ? a[o] = [ n.model.callback ].concat(a[o]) : a[o] = n.model.callback;
    }
    function rt(e, t, r, a, i, s) {
        return (Array.isArray(r) || o(r)) && (i = a, a = r, r = void 0), n(s) && (i = _o), 
        ot(e, t, r, a, i);
    }
    function ot(e, n, r, o, a) {
        if (t(r) && t(r.__ob__)) return no();
        if (t(r) && t(r.is) && (n = r.is), !n) return no();
        Array.isArray(o) && "function" == typeof o[0] && ((r = r || {}).scopedSlots = {
            default: o[0]
        }, o.length = 0), a === _o ? o = ie(o) : a === go && (o = ae(o));
        var i, s;
        if ("string" == typeof n) {
            var c;
            s = e.$vnode && e.$vnode.ns || Cr.getTagNamespace(n), i = Cr.isReservedTag(n) ? new Qr(Cr.parsePlatformTagName(n), r, o, void 0, void 0, e) : t(c = q(e.$options, "components", n)) ? Je(c, r, e, o, n) : new Qr(n, r, o, void 0, void 0, e);
        } else i = Je(n, r, e, o);
        return t(i) ? (s && at(i, s), i) : no();
    }
    function at(n, r) {
        if (n.ns = r, "foreignObject" !== n.tag && t(n.children)) for (var o = 0, a = n.children.length; o < a; o++) {
            var i = n.children[o];
            t(i.tag) && e(i.ns) && at(i, r);
        }
    }
    function it(e, n) {
        var r, o, i, s, c;
        if (Array.isArray(e) || "string" == typeof e) for (r = new Array(e.length), o = 0, 
        i = e.length; o < i; o++) r[o] = n(e[o], o); else if ("number" == typeof e) for (r = new Array(e), 
        o = 0; o < e; o++) r[o] = n(o + 1, o); else if (a(e)) for (s = Object.keys(e), r = new Array(s.length), 
        o = 0, i = s.length; o < i; o++) c = s[o], r[o] = n(e[c], c, o);
        return t(r) && (r._isVList = !0), r;
    }
    function st(e, t, n, r) {
        var o = this.$scopedSlots[e];
        if (o) return n = n || {}, r && (n = y(y({}, r), n)), o(n) || t;
        var a = this.$slots[e];
        return a || t;
    }
    function ct(e) {
        return q(this.$options, "filters", e, !0) || yr;
    }
    function lt(e, t, n) {
        var r = Cr.keyCodes[t] || n;
        return Array.isArray(r) ? -1 === r.indexOf(e) : r !== e;
    }
    function ut(e, t, n, r, o) {
        if (n) if (a(n)) {
            Array.isArray(n) && (n = b(n));
            var i, s = function(a) {
                if ("class" === a || "style" === a || lr(a)) i = e; else {
                    var s = e.attrs && e.attrs.type;
                    i = r || Cr.mustUseProp(t, s, a) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {});
                }
                a in i || (i[a] = n[a], o && ((e.on || (e.on = {}))["update:" + a] = function(e) {
                    n[a] = e;
                }));
            };
            for (var c in n) s(c);
        } else ;
        return e;
    }
    function ft(e, t) {
        var n = this._staticTrees[e];
        return n && !t ? Array.isArray(n) ? J(n) : Y(n) : (n = this._staticTrees[e] = this.$options.staticRenderFns[e].call(this._renderProxy), 
        pt(n, "__static__" + e, !1), n);
    }
    function dt(e, t, n) {
        return pt(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
    }
    function pt(e, t, n) {
        if (Array.isArray(e)) for (var r = 0; r < e.length; r++) e[r] && "string" != typeof e[r] && ht(e[r], t + "_" + r, n); else ht(e, t, n);
    }
    function ht(e, t, n) {
        e.isStatic = !0, e.key = t, e.isOnce = n;
    }
    function vt(e, t) {
        if (t) if (i(t)) {
            var n = e.on = e.on ? y({}, e.on) : {};
            for (var r in t) {
                var o = n[r], a = t[r];
                n[r] = o ? [].concat(a, o) : a;
            }
        } else ;
        return e;
    }
    function mt(e) {
        e._vnode = null, e._staticTrees = null;
        var t = e.$vnode = e.$options._parentVnode, n = t && t.context;
        e.$slots = be(e.$options._renderChildren, n), e.$scopedSlots = wr, e._c = function(t, n, r, o) {
            return rt(e, t, n, r, o, !1);
        }, e.$createElement = function(t, n, r, o) {
            return rt(e, t, n, r, o, !0);
        };
        var r = t && t.data;
        H(e, "$attrs", r && r.attrs || wr, null, !0), H(e, "$listeners", e.$options._parentListeners || wr, null, !0);
    }
    function yt(e, t) {
        var n = e.$options = Object.create(e.constructor.options);
        n.parent = t.parent, n.propsData = t.propsData, n._parentVnode = t._parentVnode, 
        n._parentListeners = t._parentListeners, n._renderChildren = t._renderChildren, 
        n._componentTag = t._componentTag, n._parentElm = t._parentElm, n._refElm = t._refElm, 
        t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns);
    }
    function bt(e) {
        var t = e.options;
        if (e.super) {
            var n = bt(e.super);
            if (n !== e.superOptions) {
                e.superOptions = n;
                var r = gt(e);
                r && y(e.extendOptions, r), (t = e.options = B(n, e.extendOptions)).name && (t.components[t.name] = e);
            }
        }
        return t;
    }
    function gt(e) {
        var t, n = e.options, r = e.extendOptions, o = e.sealedOptions;
        for (var a in n) n[a] !== o[a] && (t || (t = {}), t[a] = _t(n[a], r[a], o[a]));
        return t;
    }
    function _t(e, t, n) {
        if (Array.isArray(e)) {
            var r = [];
            n = Array.isArray(n) ? n : [ n ], t = Array.isArray(t) ? t : [ t ];
            for (var o = 0; o < e.length; o++) (t.indexOf(e[o]) >= 0 || n.indexOf(e[o]) < 0) && r.push(e[o]);
            return r;
        }
        return e;
    }
    function Ct(e) {
        this._init(e);
    }
    function wt(e) {
        e.use = function(e) {
            var t = this._installedPlugins || (this._installedPlugins = []);
            if (t.indexOf(e) > -1) return this;
            var n = m(arguments, 1);
            return n.unshift(this), "function" == typeof e.install ? e.install.apply(e, n) : "function" == typeof e && e.apply(null, n), 
            t.push(e), this;
        };
    }
    function Et(e) {
        e.mixin = function(e) {
            return this.options = B(this.options, e), this;
        };
    }
    function At(e) {
        e.cid = 0;
        var t = 1;
        e.extend = function(e) {
            e = e || {};
            var n = this, r = n.cid, o = e._Ctor || (e._Ctor = {});
            if (o[r]) return o[r];
            var a = e.name || n.options.name, i = function(e) {
                this._init(e);
            };
            return i.prototype = Object.create(n.prototype), i.prototype.constructor = i, i.cid = t++, 
            i.options = B(n.options, e), i.super = n, i.options.props && Tt(i), i.options.computed && kt(i), 
            i.extend = n.extend, i.mixin = n.mixin, i.use = n.use, gr.forEach(function(e) {
                i[e] = n[e];
            }), a && (i.options.components[a] = i), i.superOptions = n.options, i.extendOptions = e, 
            i.sealedOptions = y({}, i.options), o[r] = i, i;
        };
    }
    function Tt(e) {
        var t = e.options.props;
        for (var n in t) Ne(e.prototype, "_props", n);
    }
    function kt(e) {
        var t = e.options.computed;
        for (var n in t) Ue(e.prototype, n, t[n]);
    }
    function Ot(e) {
        gr.forEach(function(t) {
            e[t] = function(e, n) {
                return n ? ("component" === t && i(n) && (n.name = n.name || e, n = this.options._base.extend(n)), 
                "directive" === t && "function" == typeof n && (n = {
                    bind: n,
                    update: n
                }), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e];
            };
        });
    }
    function xt(e) {
        return e && (e.Ctor.options.name || e.tag);
    }
    function Mt(e, t) {
        return Array.isArray(e) ? e.indexOf(t) > -1 : "string" == typeof e ? e.split(",").indexOf(t) > -1 : !!s(e) && e.test(t);
    }
    function Lt(e, t, n) {
        for (var r in e) {
            var o = e[r];
            if (o) {
                var a = xt(o.componentOptions);
                a && !n(a) && (o !== t && $t(o), e[r] = null);
            }
        }
    }
    function $t(e) {
        e && e.componentInstance.$destroy();
    }
    function St(e) {
        for (var n = e.data, r = e, o = e; t(o.componentInstance); ) (o = o.componentInstance._vnode).data && (n = Ht(o.data, n));
        for (;t(r = r.parent); ) r.data && (n = Ht(n, r.data));
        return Pt(n.staticClass, n.class);
    }
    function Ht(e, n) {
        return {
            staticClass: jt(e.staticClass, n.staticClass),
            class: t(e.class) ? [ e.class, n.class ] : n.class
        };
    }
    function Pt(e, n) {
        return t(e) || t(n) ? jt(e, Nt(n)) : "";
    }
    function jt(e, t) {
        return e ? t ? e + " " + t : e : t || "";
    }
    function Nt(e) {
        return Array.isArray(e) ? It(e) : a(e) ? Dt(e) : "string" == typeof e ? e : "";
    }
    function It(e) {
        for (var n, r = "", o = 0, a = e.length; o < a; o++) t(n = Nt(e[o])) && "" !== n && (r && (r += " "), 
        r += n);
        return r;
    }
    function Dt(e) {
        var t = "";
        for (var n in e) e[n] && (t && (t += " "), t += n);
        return t;
    }
    function Rt(e) {
        if ("string" == typeof e) {
            var t = document.querySelector(e);
            return t || document.createElement("div");
        }
        return e;
    }
    function Ft(e, t) {
        var n = e.data.ref;
        if (n) {
            var r = e.context, o = e.componentInstance || e.elm, a = r.$refs;
            t ? Array.isArray(a[n]) ? d(a[n], o) : a[n] === o && (a[n] = void 0) : e.data.refInFor ? Array.isArray(a[n]) ? a[n].indexOf(o) < 0 && a[n].push(o) : a[n] = [ o ] : a[n] = o;
        }
    }
    function Vt(r, o) {
        return r.key === o.key && (r.tag === o.tag && r.isComment === o.isComment && t(r.data) === t(o.data) && Ut(r, o) || n(r.isAsyncPlaceholder) && r.asyncFactory === o.asyncFactory && e(o.asyncFactory.error));
    }
    function Ut(e, n) {
        if ("input" !== e.tag) return !0;
        var r, o = t(r = e.data) && t(r = r.attrs) && r.type, a = t(r = n.data) && t(r = r.attrs) && r.type;
        return o === a || Ro(o) && Ro(a);
    }
    function zt(e, n, r) {
        var o, a, i = {};
        for (o = n; o <= r; ++o) t(a = e[o].key) && (i[a] = o);
        return i;
    }
    function Bt(e, t) {
        (e.data.directives || t.data.directives) && qt(e, t);
    }
    function qt(e, t) {
        var n, r, o, a = e === Uo, i = t === Uo, s = Wt(e.data.directives, e.context), c = Wt(t.data.directives, t.context), l = [], u = [];
        for (n in c) r = s[n], o = c[n], r ? (o.oldValue = r.value, Zt(o, "update", t, e), 
        o.def && o.def.componentUpdated && u.push(o)) : (Zt(o, "bind", t, e), o.def && o.def.inserted && l.push(o));
        if (l.length) {
            var f = function() {
                for (var n = 0; n < l.length; n++) Zt(l[n], "inserted", t, e);
            };
            a ? ne(t.data.hook || (t.data.hook = {}), "insert", f) : f();
        }
        if (u.length && ne(t.data.hook || (t.data.hook = {}), "postpatch", function() {
            for (var n = 0; n < u.length; n++) Zt(u[n], "componentUpdated", t, e);
        }), !a) for (n in s) c[n] || Zt(s[n], "unbind", e, e, i);
    }
    function Wt(e, t) {
        var n = Object.create(null);
        if (!e) return n;
        var r, o;
        for (r = 0; r < e.length; r++) (o = e[r]).modifiers || (o.modifiers = qo), n[Kt(o)] = o, 
        o.def = q(t.$options, "directives", o.name, !0);
        return n;
    }
    function Kt(e) {
        return e.rawName || e.name + "." + Object.keys(e.modifiers || {}).join(".");
    }
    function Zt(e, t, n, r, o) {
        var a = e.def && e.def[t];
        if (a) try {
            a(n.elm, e, n, r, o);
        } catch (r) {
            k(r, n.context, "directive " + e.name + " " + t + " hook");
        }
    }
    function Gt(n, r) {
        var o = r.componentOptions;
        if (!(t(o) && !1 === o.Ctor.options.inheritAttrs || e(n.data.attrs) && e(r.data.attrs))) {
            var a, i, s = r.elm, c = n.data.attrs || {}, l = r.data.attrs || {};
            t(l.__ob__) && (l = r.data.attrs = y({}, l));
            for (a in l) i = l[a], c[a] !== i && Xt(s, a, i);
            Mr && l.value !== c.value && Xt(s, "value", l.value);
            for (a in c) e(l[a]) && ($o(a) ? s.removeAttributeNS(Lo, So(a)) : xo(a) || s.removeAttribute(a));
        }
    }
    function Xt(e, t, n) {
        Mo(t) ? Ho(n) ? e.removeAttribute(t) : (n = "allowfullscreen" === t && "EMBED" === e.tagName ? "true" : t, 
        e.setAttribute(t, n)) : xo(t) ? e.setAttribute(t, Ho(n) || "false" === n ? "false" : "true") : $o(t) ? Ho(n) ? e.removeAttributeNS(Lo, So(t)) : e.setAttributeNS(Lo, t, n) : Ho(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
    }
    function Yt(n, r) {
        var o = r.elm, a = r.data, i = n.data;
        if (!(e(a.staticClass) && e(a.class) && (e(i) || e(i.staticClass) && e(i.class)))) {
            var s = St(r), c = o._transitionClasses;
            t(c) && (s = jt(s, Nt(c))), s !== o._prevClass && (o.setAttribute("class", s), o._prevClass = s);
        }
    }
    function Jt(e) {
        var n;
        t(e[Go]) && (e[n = xr ? "change" : "input"] = [].concat(e[Go], e[n] || []), delete e[Go]), 
        t(e[Xo]) && (e[n = Hr ? "click" : "change"] = [].concat(e[Xo], e[n] || []), delete e[Xo]);
    }
    function Qt(e, t, n, r, o) {
        if (n) {
            var a = t, i = Ao;
            t = function(n) {
                null !== (1 === arguments.length ? a(n) : a.apply(null, arguments)) && en(e, t, r, i);
            };
        }
        Ao.addEventListener(e, t, jr ? {
            capture: r,
            passive: o
        } : r);
    }
    function en(e, t, n, r) {
        (r || Ao).removeEventListener(e, t, n);
    }
    function tn(t, n) {
        if (!e(t.data.on) || !e(n.data.on)) {
            var r = n.data.on || {}, o = t.data.on || {};
            Ao = n.elm, Jt(r), te(r, o, Qt, en, n.context);
        }
    }
    function nn(n, r) {
        if (!e(n.data.domProps) || !e(r.data.domProps)) {
            var o, a, i = r.elm, s = n.data.domProps || {}, c = r.data.domProps || {};
            t(c.__ob__) && (c = r.data.domProps = y({}, c));
            for (o in s) e(c[o]) && (i[o] = "");
            for (o in c) if (a = c[o], "textContent" !== o && "innerHTML" !== o || (r.children && (r.children.length = 0), 
            a !== s[o])) if ("value" === o) {
                i._value = a;
                var l = e(a) ? "" : String(a);
                rn(i, r, l) && (i.value = l);
            } else i[o] = a;
        }
    }
    function rn(e, t, n) {
        return !e.composing && ("option" === t.tag || on(e, n) || an(e, n));
    }
    function on(e, t) {
        var n = !0;
        try {
            n = document.activeElement !== e;
        } catch (e) {}
        return n && e.value !== t;
    }
    function an(e, n) {
        var r = e.value, o = e._vModifiers;
        return t(o) && o.number ? u(r) !== u(n) : t(o) && o.trim ? r.trim() !== n.trim() : r !== n;
    }
    function sn(e) {
        var t = cn(e.style);
        return e.staticStyle ? y(e.staticStyle, t) : t;
    }
    function cn(e) {
        return Array.isArray(e) ? b(e) : "string" == typeof e ? Qo(e) : e;
    }
    function ln(e, t) {
        var n, r = {};
        if (t) for (var o = e; o.componentInstance; ) (o = o.componentInstance._vnode).data && (n = sn(o.data)) && y(r, n);
        (n = sn(e.data)) && y(r, n);
        for (var a = e; a = a.parent; ) a.data && (n = sn(a.data)) && y(r, n);
        return r;
    }
    function un(n, r) {
        var o = r.data, a = n.data;
        if (!(e(o.staticStyle) && e(o.style) && e(a.staticStyle) && e(a.style))) {
            var i, s, c = r.elm, l = a.staticStyle, u = a.normalizedStyle || a.style || {}, f = l || u, d = cn(r.data.style) || {};
            r.data.normalizedStyle = t(d.__ob__) ? y({}, d) : d;
            var p = ln(r, !0);
            for (s in f) e(p[s]) && na(c, s, "");
            for (s in p) (i = p[s]) !== f[s] && na(c, s, null == i ? "" : i);
        }
    }
    function fn(e, t) {
        if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function(t) {
            return e.classList.add(t);
        }) : e.classList.add(t); else {
            var n = " " + (e.getAttribute("class") || "") + " ";
            n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim());
        }
    }
    function dn(e, t) {
        if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function(t) {
            return e.classList.remove(t);
        }) : e.classList.remove(t), e.classList.length || e.removeAttribute("class"); else {
            for (var n = " " + (e.getAttribute("class") || "") + " ", r = " " + t + " "; n.indexOf(r) >= 0; ) n = n.replace(r, " ");
            (n = n.trim()) ? e.setAttribute("class", n) : e.removeAttribute("class");
        }
    }
    function pn(e) {
        if (e) {
            if ("object" == typeof e) {
                var t = {};
                return !1 !== e.css && y(t, ia(e.name || "v")), y(t, e), t;
            }
            return "string" == typeof e ? ia(e) : void 0;
        }
    }
    function hn(e) {
        ha(function() {
            ha(e);
        });
    }
    function vn(e, t) {
        var n = e._transitionClasses || (e._transitionClasses = []);
        n.indexOf(t) < 0 && (n.push(t), fn(e, t));
    }
    function mn(e, t) {
        e._transitionClasses && d(e._transitionClasses, t), dn(e, t);
    }
    function yn(e, t, n) {
        var r = bn(e, t), o = r.type, a = r.timeout, i = r.propCount;
        if (!o) return n();
        var s = o === ca ? fa : pa, c = 0, l = function() {
            e.removeEventListener(s, u), n();
        }, u = function(t) {
            t.target === e && ++c >= i && l();
        };
        setTimeout(function() {
            c < i && l();
        }, a + 1), e.addEventListener(s, u);
    }
    function bn(e, t) {
        var n, r = window.getComputedStyle(e), o = r[ua + "Delay"].split(", "), a = r[ua + "Duration"].split(", "), i = gn(o, a), s = r[da + "Delay"].split(", "), c = r[da + "Duration"].split(", "), l = gn(s, c), u = 0, f = 0;
        return t === ca ? i > 0 && (n = ca, u = i, f = a.length) : t === la ? l > 0 && (n = la, 
        u = l, f = c.length) : f = (n = (u = Math.max(i, l)) > 0 ? i > l ? ca : la : null) ? n === ca ? a.length : c.length : 0, 
        {
            type: n,
            timeout: u,
            propCount: f,
            hasTransform: n === ca && va.test(r[ua + "Property"])
        };
    }
    function gn(e, t) {
        for (;e.length < t.length; ) e = e.concat(e);
        return Math.max.apply(null, t.map(function(t, n) {
            return _n(t) + _n(e[n]);
        }));
    }
    function _n(e) {
        return 1e3 * Number(e.slice(0, -1));
    }
    function Cn(n, r) {
        var o = n.elm;
        t(o._leaveCb) && (o._leaveCb.cancelled = !0, o._leaveCb());
        var i = pn(n.data.transition);
        if (!e(i) && !t(o._enterCb) && 1 === o.nodeType) {
            for (var s = i.css, c = i.type, l = i.enterClass, f = i.enterToClass, d = i.enterActiveClass, p = i.appearClass, h = i.appearToClass, v = i.appearActiveClass, m = i.beforeEnter, y = i.enter, b = i.afterEnter, g = i.enterCancelled, _ = i.beforeAppear, C = i.appear, E = i.afterAppear, A = i.appearCancelled, T = i.duration, k = oo, O = oo.$vnode; O && O.parent; ) k = (O = O.parent).context;
            var x = !k._isMounted || !n.isRootInsert;
            if (!x || C || "" === C) {
                var M = x && p ? p : l, L = x && v ? v : d, $ = x && h ? h : f, S = x ? _ || m : m, H = x && "function" == typeof C ? C : y, P = x ? E || b : b, j = x ? A || g : g, N = u(a(T) ? T.enter : T), I = !1 !== s && !Mr, D = An(H), R = o._enterCb = w(function() {
                    I && (mn(o, $), mn(o, L)), R.cancelled ? (I && mn(o, M), j && j(o)) : P && P(o), 
                    o._enterCb = null;
                });
                n.data.show || ne(n.data.hook || (n.data.hook = {}), "insert", function() {
                    var e = o.parentNode, t = e && e._pending && e._pending[n.key];
                    t && t.tag === n.tag && t.elm._leaveCb && t.elm._leaveCb(), H && H(o, R);
                }), S && S(o), I && (vn(o, M), vn(o, L), hn(function() {
                    vn(o, $), mn(o, M), R.cancelled || D || (En(N) ? setTimeout(R, N) : yn(o, c, R));
                })), n.data.show && (r && r(), H && H(o, R)), I || D || R();
            }
        }
    }
    function wn(n, r) {
        function o() {
            A.cancelled || (n.data.show || ((i.parentNode._pending || (i.parentNode._pending = {}))[n.key] = n), 
            h && h(i), _ && (vn(i, f), vn(i, p), hn(function() {
                vn(i, d), mn(i, f), A.cancelled || C || (En(E) ? setTimeout(A, E) : yn(i, l, A));
            })), v && v(i, A), _ || C || A());
        }
        var i = n.elm;
        t(i._enterCb) && (i._enterCb.cancelled = !0, i._enterCb());
        var s = pn(n.data.transition);
        if (e(s)) return r();
        if (!t(i._leaveCb) && 1 === i.nodeType) {
            var c = s.css, l = s.type, f = s.leaveClass, d = s.leaveToClass, p = s.leaveActiveClass, h = s.beforeLeave, v = s.leave, m = s.afterLeave, y = s.leaveCancelled, b = s.delayLeave, g = s.duration, _ = !1 !== c && !Mr, C = An(v), E = u(a(g) ? g.leave : g), A = i._leaveCb = w(function() {
                i.parentNode && i.parentNode._pending && (i.parentNode._pending[n.key] = null), 
                _ && (mn(i, d), mn(i, p)), A.cancelled ? (_ && mn(i, f), y && y(i)) : (r(), m && m(i)), 
                i._leaveCb = null;
            });
            b ? b(o) : o();
        }
    }
    function En(e) {
        return "number" == typeof e && !isNaN(e);
    }
    function An(n) {
        if (e(n)) return !1;
        var r = n.fns;
        return t(r) ? An(Array.isArray(r) ? r[0] : r) : (n._length || n.length) > 1;
    }
    function Tn(e, t) {
        !0 !== t.data.show && Cn(t);
    }
    function kn(e, t, n) {
        On(e, t, n), (xr || Lr) && setTimeout(function() {
            On(e, t, n);
        }, 0);
    }
    function On(e, t, n) {
        var r = t.value, o = e.multiple;
        if (!o || Array.isArray(r)) {
            for (var a, i, s = 0, c = e.options.length; s < c; s++) if (i = e.options[s], o) a = C(r, Mn(i)) > -1, 
            i.selected !== a && (i.selected = a); else if (_(Mn(i), r)) return void (e.selectedIndex !== s && (e.selectedIndex = s));
            o || (e.selectedIndex = -1);
        }
    }
    function xn(e, t) {
        return t.every(function(t) {
            return !_(t, e);
        });
    }
    function Mn(e) {
        return "_value" in e ? e._value : e.value;
    }
    function Ln(e) {
        e.target.composing = !0;
    }
    function $n(e) {
        e.target.composing && (e.target.composing = !1, Sn(e.target, "input"));
    }
    function Sn(e, t) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(t, !0, !0), e.dispatchEvent(n);
    }
    function Hn(e) {
        return !e.componentInstance || e.data && e.data.transition ? e : Hn(e.componentInstance._vnode);
    }
    function Pn(e) {
        var t = e && e.componentOptions;
        return t && t.Ctor.options.abstract ? Pn(pe(t.children)) : e;
    }
    function jn(e) {
        var t = {}, n = e.$options;
        for (var r in n.propsData) t[r] = e[r];
        var o = n._parentListeners;
        for (var a in o) t[dr(a)] = o[a];
        return t;
    }
    function Nn(e, t) {
        if (/\d-keep-alive$/.test(t.tag)) return e("keep-alive", {
            props: t.componentOptions.propsData
        });
    }
    function In(e) {
        for (;e = e.parent; ) if (e.data.transition) return !0;
    }
    function Dn(e, t) {
        return t.key === e.key && t.tag === e.tag;
    }
    function Rn(e) {
        e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
    }
    function Fn(e) {
        e.data.newPos = e.elm.getBoundingClientRect();
    }
    function Vn(e) {
        var t = e.data.pos, n = e.data.newPos, r = t.left - n.left, o = t.top - n.top;
        if (r || o) {
            e.data.moved = !0;
            var a = e.elm.style;
            a.transform = a.WebkitTransform = "translate(" + r + "px," + o + "px)", a.transitionDuration = "0s";
        }
    }
    function Un(e, t) {
        return e.__proto__ = t, e;
    }
    function zn(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function Bn(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }
    function qn(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }
    function Wn() {
        return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
    }
    function Kn(e) {
        function t() {
            !0 === a.shadow && HTMLElement.prototype.attachShadow && this.attachShadow({
                mode: "open"
            }), "function" == typeof a.constructorCallback && a.constructorCallback.call(this);
        }
        function n() {
            "function" == typeof a.connectedCallback && a.connectedCallback.call(this);
        }
        function r() {
            "function" == typeof a.disconnectedCallback && a.disconnectedCallback.call(this);
        }
        function o(e, t, n) {
            "function" == typeof a.attributeChangedCallback && a.attributeChangedCallback.call(this, e, t, n);
        }
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if ("undefined" != typeof customElements) {
            if (wa) {
                var i = function(e) {
                    function n(e) {
                        var r;
                        zn(this, n);
                        var o = Bn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this)), a = e ? HTMLElement.call(e) : o;
                        return t.call(a), r = a, Bn(o, r);
                    }
                    return qn(n, Wn), Ea(n, null, [ {
                        key: "observedAttributes",
                        get: function() {
                            return a.observedAttributes || [];
                        }
                    } ]), n;
                }();
                return i.prototype.connectedCallback = n, i.prototype.disconnectedCallback = r, 
                i.prototype.attributeChangedCallback = o, customElements.define(e, i), i;
            }
            var s = function(e) {
                var n = e ? HTMLElement.call(e) : this;
                return t.call(n), n;
            };
            return s.observedAttributes = a.observedAttributes || [], s.prototype = Object.create(HTMLElement.prototype, {
                constructor: {
                    configurable: !0,
                    writable: !0,
                    value: s
                }
            }), s.prototype.connectedCallback = n, s.prototype.disconnectedCallback = r, s.prototype.attributeChangedCallback = o, 
            customElements.define(e, s), s;
        }
    }
    function Zn(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = e.length - t, r = new Array(n); n--; ) r[n] = e[n + t];
        return r;
    }
    function Gn(e) {
        var t = e, n = [ "true", "false" ].indexOf(e) > -1, r = parseFloat(t, 10), o = !isNaN(r) && isFinite(t);
        return n ? t = "true" === t : o && (t = r), t;
    }
    function Xn(e, t) {
        if (e && e.length) e.forEach(function(e) {
            var n = Ta(e);
            -1 === t.camelCase.indexOf(n) && t.camelCase.push(n);
        }); else if (e && "object" === (void 0 === e ? "undefined" : xa(e))) for (var n in e) {
            var r = Ta(n);
            -1 === t.camelCase.indexOf(r) && t.camelCase.push(r);
        }
    }
    function Yn() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
            camelCase: [],
            hyphenate: []
        };
        return e.mixins && e.mixins.forEach(function(e) {
            Xn(e.props, t);
        }), e.extends && e.extends.props && Xn(e.extends.props, t), Xn(e.props, t), t.camelCase.forEach(function(e) {
            t.hyphenate.push(Oa(e));
        }), t;
    }
    function Jn(e, t) {
        t.camelCase.forEach(function(n, r) {
            Object.defineProperty(e, n, {
                get: function() {
                    return this.__vue_custom_element__[n];
                },
                set: function(e) {
                    if ("object" !== (void 0 === e ? "undefined" : xa(e)) && "function" != typeof e || !this.__vue_custom_element__) this.setAttribute(t.hyphenate[r], Gn(e)); else {
                        var n = t.camelCase[r];
                        this.__vue_custom_element__[n] = e;
                    }
                }
            });
        });
    }
    function Qn(e, t, n) {
        var r = t.propsData || {};
        return n.hyphenate.forEach(function(t, o) {
            var a = e.attributes[t] && e.attributes[t].nodeValue;
            void 0 !== a && "" !== a && (r[n.camelCase[o]] = Gn(a));
        }), r;
    }
    function er(e) {
        var t = {};
        return Zn(e.attributes).forEach(function(e) {
            t["vue-slot" === e.nodeName ? "slot" : e.nodeName] = e.nodeValue;
        }), t;
    }
    function tr() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], n = [];
        return Zn(e).forEach(function(e) {
            if ("#text" === e.nodeName) e.nodeValue.trim() && n.push(t("span", e.nodeValue)); else {
                var r = er(e), o = {
                    attrs: r,
                    domProps: {
                        innerHTML: e.innerHTML
                    }
                };
                r.slot && (o.slot = r.slot, r.slot = void 0), n.push(t(e.tagName, o));
            }
        }), n;
    }
    function nr(e, t) {
        var n = {
            bubbles: !1,
            cancelable: !1,
            detail: t
        }, r = void 0;
        return "function" == typeof window.CustomEvent ? r = new CustomEvent(e, n) : (r = document.createEvent("CustomEvent")).initCustomEvent(e, n.bubbles, n.cancelable, n.detail), 
        r;
    }
    function rr(e, t) {
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) r[o - 2] = arguments[o];
        var a = nr(t, [].concat(r));
        e.dispatchEvent(a);
    }
    function or(e, t, n, r, o) {
        if (!e.__vue_custom_element__) {
            var a = t.util.extend({}, n), i = Qn(e, a, r), s = t.version && parseInt(t.version.split(".")[0], 10) || 0, c = {};
            a._Ctor && (c = a._Ctor[0].options), a.methods = c.methods = a.methods || {}, a.methods.$emit = c.methods.$emit = function() {
                for (var t, n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                rr.apply(void 0, [ e ].concat(r)), this.__proto__ && (t = this.__proto__.$emit).call.apply(t, [ this ].concat(r));
            };
            var l = void 0;
            if (s >= 2) {
                var u = e.cloneNode(!0).childNodes;
                l = {
                    propsData: i,
                    props: r.camelCase,
                    computed: {
                        reactiveProps: function() {
                            var e = this, t = {};
                            return r.camelCase.forEach(function(n) {
                                t[n] = e[n];
                            }), t;
                        }
                    },
                    render: function(e) {
                        var t = {
                            props: this.reactiveProps
                        };
                        return e(a, t, tr(u, e));
                    }
                };
            } else if (1 === s) (l = a).propsData = i; else {
                l = a;
                var f = {};
                Object.keys(i).forEach(function(e) {
                    f[e] = {
                        default: i[e]
                    };
                }), l.props = f;
            }
            var d = s >= 2 ? "<div></div>" : ("<div>" + e.innerHTML + "</div>").replace(/vue-slot=/g, "slot=");
            if (o.shadow && e.shadowRoot ? (e.shadowRoot.innerHTML = d, l.el = e.shadowRoot.children[0]) : (e.innerHTML = d, 
            l.el = e.children[0]), Jn(e, r), e.__vue_custom_element__ = new t(l), o.shadow && o.shadowCss && e.shadowRoot) {
                var p = document.createElement("style");
                p.type = "text/css", p.appendChild(document.createTextNode(o.shadowCss)), e.shadowRoot.appendChild(p);
            }
            e.removeAttribute("vce-cloak"), e.setAttribute("vce-ready", ""), rr(e, "vce-ready");
        }
    }
    function ar(e) {
        e.customElement = function(t, n) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = "function" == typeof n, a = o && {
                props: r.props || []
            }, i = Yn(o ? a : n);
            return Kn(t, {
                constructorCallback: function() {
                    "function" == typeof r.constructorCallback && r.constructorCallback.call(this);
                },
                connectedCallback: function() {
                    var a = this, s = o && n(), c = s && s.then && "function" == typeof s.then;
                    if (o && !c) throw new Error("Async component " + t + " do not returns Promise");
                    this.__detached__ || (c ? s.then(function(t) {
                        var n = Yn(t);
                        or(a, e, t, n, r);
                    }) : or(this, e, n, i, r)), this.__detached__ = !1;
                },
                disconnectedCallback: function() {
                    var e = this;
                    this.__detached__ = !0, "function" == typeof r.disconnectedCallback && r.disconnectedCallback.call(this), 
                    setTimeout(function() {
                        e.__detached__ && e.__vue_custom_element__ && e.__vue_custom_element__.$destroy(!0);
                    }, r.destroyTimeout || 3e3);
                },
                attributeChangedCallback: function(e, t, n) {
                    if (this.__vue_custom_element__ && void 0 !== n) {
                        var o = Ta(e);
                        "function" == typeof r.attributeChangedCallback && r.attributeChangedCallback.call(this, e, t, n), 
                        this.__vue_custom_element__[o] = Gn(n);
                    }
                },
                observedAttributes: i.hyphenate,
                shadow: !!r.shadow && !!HTMLElement.prototype.attachShadow
            });
        };
    }
    function ir(e, t) {
        for (var n = e.length; n--; ) if (e[n] === t) return !0;
        return !1;
    }
    function sr(e) {
        var t = [];
        return Object.keys(e).forEach(function(n) {
            t.push(e[n]);
        }), t;
    }
    !function(e, t) {
        function n() {
            var e = k.splice(0, k.length);
            for (Ge = 0; e.length; ) e.shift().call(null, e.shift());
        }
        function r(e, t) {
            for (var n = 0, r = e.length; n < r; n++) v(e[n], t);
        }
        function o(e) {
            for (var t, n = 0, r = e.length; n < r; n++) t = e[n], H(t, oe[i(t)]);
        }
        function a(e) {
            return function(t) {
                Ne(t) && (v(t, e), ae.length && r(t.querySelectorAll(ae), e));
            };
        }
        function i(e) {
            var t = Ve.call(e, "is"), n = e.nodeName.toUpperCase(), r = se.call(re, t ? ee + t.toUpperCase() : Q + n);
            return t && -1 < r && !s(n, t) ? -1 : r;
        }
        function s(e, t) {
            return -1 < ae.indexOf(e + '[is="' + t + '"]');
        }
        function c(e) {
            var t = e.currentTarget, n = e.attrChange, r = e.attrName, o = e.target, a = e[K] || 2, i = e[G] || 3;
            tt && (!o || o === t) && t[V] && "style" !== r && (e.prevValue !== e.newValue || "" === e.newValue && (n === a || n === i)) && t[V](r, n === a ? null : e.prevValue, n === i ? null : e.newValue);
        }
        function l(e) {
            var t = a(e);
            return function(e) {
                k.push(t, e.target), Ge && clearTimeout(Ge), Ge = setTimeout(n, 1);
            };
        }
        function u(e) {
            et && (et = !1, e.currentTarget.removeEventListener(Y, u)), ae.length && r((e.target || E).querySelectorAll(ae), e.detail === R ? R : I), 
            Pe && p();
        }
        function f(e, t) {
            var n = this;
            Be.call(n, e, t), O.call(n, {
                target: n
            });
        }
        function d(e, t) {
            $e(e, t), L ? L.observe(e, Ke) : (Qe && (e.setAttribute = f, e[j] = M(e), e[N](J, O)), 
            e[N](X, c)), e[q] && tt && (e.created = !0, e[q](), e.created = !1);
        }
        function p() {
            for (var e, t = 0, n = Ie.length; t < n; t++) e = Ie[t], ie.contains(e) || (n--, 
            Ie.splice(t--, 1), v(e, R));
        }
        function h(e) {
            throw new Error("A " + e + " type is already registered");
        }
        function v(e, t) {
            var n, r, o = i(e);
            -1 < o && (S(e, oe[o]), o = 0, t !== I || e[I] ? t === R && !e[R] && (e[I] = !1, 
            e[R] = !0, r = "disconnected", o = 1) : (e[R] = !1, e[I] = !0, r = "connected", 
            o = 1, Pe && se.call(Ie, e) < 0 && Ie.push(e)), o && (n = e[t + D] || e[r + D]) && n.call(e));
        }
        function m() {}
        function y(e, t, n) {
            var r = n && n[F] || "", o = t.prototype, a = Le(o), i = t.observedAttributes || de, s = {
                prototype: a
            };
            je(a, q, {
                value: function() {
                    if (Te) Te = !1; else if (!this[ge]) {
                        this[ge] = !0, new t(this), o[q] && o[q].call(this);
                        var e = ke[xe.get(t)];
                        (!Ce || e.create.length > 1) && _(this);
                    }
                }
            }), je(a, V, {
                value: function(e) {
                    -1 < se.call(i, e) && o[V].apply(this, arguments);
                }
            }), o[z] && je(a, U, {
                value: o[z]
            }), o[B] && je(a, W, {
                value: o[B]
            }), r && (s[F] = r), e = e.toUpperCase(), ke[e] = {
                constructor: t,
                create: r ? [ r, Me(e) ] : [ e ]
            }, xe.set(t, e), E[P](e.toLowerCase(), s), C(e), Oe[e].r();
        }
        function b(e) {
            var t = ke[e.toUpperCase()];
            return t && t.constructor;
        }
        function g(e) {
            return "string" == typeof e ? e : e && e.is || "";
        }
        function _(e) {
            for (var t, n = e[V], r = n ? e.attributes : de, o = r.length; o--; ) t = r[o], 
            n.call(e, t.name || t.nodeName, null, t.value || t.nodeValue);
        }
        function C(e) {
            return (e = e.toUpperCase()) in Oe || (Oe[e] = {}, Oe[e].p = new Ae(function(t) {
                Oe[e].r = t;
            })), Oe[e].p;
        }
        function w() {
            _e && delete e.customElements, fe(e, "customElements", {
                configurable: !0,
                value: new m()
            }), fe(e, "CustomElementRegistry", {
                configurable: !0,
                value: m
            });
            for (var t = function(t) {
                var n = e[t];
                if (n) {
                    e[t] = function(e) {
                        var t, r;
                        return e || (e = this), e[ge] || (Te = !0, t = ke[xe.get(e.constructor)], r = Ce && 1 === t.create.length, 
                        e = r ? Reflect.construct(n, de, t.constructor) : E.createElement.apply(E, t.create), 
                        e[ge] = !0, Te = !1, r || _(e)), e;
                    }, e[t].prototype = n.prototype;
                    try {
                        n.prototype.constructor = e[t];
                    } catch (r) {
                        be = !0, fe(n, ge, {
                            value: e[t]
                        });
                    }
                }
            }, n = T.get(/^HTML[A-Z]*[a-z]/), r = n.length; r--; t(n[r])) ;
            E.createElement = function(e, t) {
                var n = g(t);
                return n ? We.call(this, e, Me(n)) : We.call(this, e);
            }, Xe || (Je = !0, E[P](""));
        }
        var E = e.document, A = e.Object, T = function(e) {
            var t, n, r, o, a = /^[A-Z]+[a-z]/, i = function(e) {
                var t, n = [];
                for (t in c) e.test(t) && n.push(t);
                return n;
            }, s = function(e, t) {
                (t = t.toLowerCase()) in c || (c[e] = (c[e] || []).concat(t), c[t] = c[t.toUpperCase()] = e);
            }, c = (A.create || A)(null), l = {};
            for (n in e) for (o in e[n]) for (r = e[n][o], c[o] = r, t = 0; t < r.length; t++) c[r[t].toLowerCase()] = c[r[t].toUpperCase()] = o;
            return l.get = function(e) {
                return "string" == typeof e ? c[e] || (a.test(e) ? [] : "") : i(e);
            }, l.set = function(e, t) {
                return a.test(e) ? s(e, t) : s(t, e), l;
            }, l;
        }({
            collections: {
                HTMLAllCollection: [ "all" ],
                HTMLCollection: [ "forms" ],
                HTMLFormControlsCollection: [ "elements" ],
                HTMLOptionsCollection: [ "options" ]
            },
            elements: {
                Element: [ "element" ],
                HTMLAnchorElement: [ "a" ],
                HTMLAppletElement: [ "applet" ],
                HTMLAreaElement: [ "area" ],
                HTMLAttachmentElement: [ "attachment" ],
                HTMLAudioElement: [ "audio" ],
                HTMLBRElement: [ "br" ],
                HTMLBaseElement: [ "base" ],
                HTMLBodyElement: [ "body" ],
                HTMLButtonElement: [ "button" ],
                HTMLCanvasElement: [ "canvas" ],
                HTMLContentElement: [ "content" ],
                HTMLDListElement: [ "dl" ],
                HTMLDataElement: [ "data" ],
                HTMLDataListElement: [ "datalist" ],
                HTMLDetailsElement: [ "details" ],
                HTMLDialogElement: [ "dialog" ],
                HTMLDirectoryElement: [ "dir" ],
                HTMLDivElement: [ "div" ],
                HTMLDocument: [ "document" ],
                HTMLElement: [ "element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr" ],
                HTMLEmbedElement: [ "embed" ],
                HTMLFieldSetElement: [ "fieldset" ],
                HTMLFontElement: [ "font" ],
                HTMLFormElement: [ "form" ],
                HTMLFrameElement: [ "frame" ],
                HTMLFrameSetElement: [ "frameset" ],
                HTMLHRElement: [ "hr" ],
                HTMLHeadElement: [ "head" ],
                HTMLHeadingElement: [ "h1", "h2", "h3", "h4", "h5", "h6" ],
                HTMLHtmlElement: [ "html" ],
                HTMLIFrameElement: [ "iframe" ],
                HTMLImageElement: [ "img" ],
                HTMLInputElement: [ "input" ],
                HTMLKeygenElement: [ "keygen" ],
                HTMLLIElement: [ "li" ],
                HTMLLabelElement: [ "label" ],
                HTMLLegendElement: [ "legend" ],
                HTMLLinkElement: [ "link" ],
                HTMLMapElement: [ "map" ],
                HTMLMarqueeElement: [ "marquee" ],
                HTMLMediaElement: [ "media" ],
                HTMLMenuElement: [ "menu" ],
                HTMLMenuItemElement: [ "menuitem" ],
                HTMLMetaElement: [ "meta" ],
                HTMLMeterElement: [ "meter" ],
                HTMLModElement: [ "del", "ins" ],
                HTMLOListElement: [ "ol" ],
                HTMLObjectElement: [ "object" ],
                HTMLOptGroupElement: [ "optgroup" ],
                HTMLOptionElement: [ "option" ],
                HTMLOutputElement: [ "output" ],
                HTMLParagraphElement: [ "p" ],
                HTMLParamElement: [ "param" ],
                HTMLPictureElement: [ "picture" ],
                HTMLPreElement: [ "pre" ],
                HTMLProgressElement: [ "progress" ],
                HTMLQuoteElement: [ "blockquote", "q", "quote" ],
                HTMLScriptElement: [ "script" ],
                HTMLSelectElement: [ "select" ],
                HTMLShadowElement: [ "shadow" ],
                HTMLSlotElement: [ "slot" ],
                HTMLSourceElement: [ "source" ],
                HTMLSpanElement: [ "span" ],
                HTMLStyleElement: [ "style" ],
                HTMLTableCaptionElement: [ "caption" ],
                HTMLTableCellElement: [ "td", "th" ],
                HTMLTableColElement: [ "col", "colgroup" ],
                HTMLTableElement: [ "table" ],
                HTMLTableRowElement: [ "tr" ],
                HTMLTableSectionElement: [ "thead", "tbody", "tfoot" ],
                HTMLTemplateElement: [ "template" ],
                HTMLTextAreaElement: [ "textarea" ],
                HTMLTimeElement: [ "time" ],
                HTMLTitleElement: [ "title" ],
                HTMLTrackElement: [ "track" ],
                HTMLUListElement: [ "ul" ],
                HTMLUnknownElement: [ "unknown", "vhgroupv", "vkeygen" ],
                HTMLVideoElement: [ "video" ]
            },
            nodes: {
                Attr: [ "node" ],
                Audio: [ "audio" ],
                CDATASection: [ "node" ],
                CharacterData: [ "node" ],
                Comment: [ "#comment" ],
                Document: [ "#document" ],
                DocumentFragment: [ "#document-fragment" ],
                DocumentType: [ "node" ],
                HTMLDocument: [ "#document" ],
                Image: [ "img" ],
                Option: [ "option" ],
                ProcessingInstruction: [ "node" ],
                ShadowRoot: [ "#shadow-root" ],
                Text: [ "#text" ],
                XMLDocument: [ "xml" ]
            }
        });
        "object" != typeof t && (t = {
            type: t || "auto"
        });
        var k, O, x, M, L, $, S, H, P = "registerElement", j = "__" + P + (1e5 * e.Math.random() >> 0), N = "addEventListener", I = "attached", D = "Callback", R = "detached", F = "extends", V = "attributeChanged" + D, U = I + D, z = "connected" + D, B = "disconnected" + D, q = "created" + D, W = R + D, K = "ADDITION", Z = "MODIFICATION", G = "REMOVAL", X = "DOMAttrModified", Y = "DOMContentLoaded", J = "DOMSubtreeModified", Q = "<", ee = "=", te = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/, ne = [ "ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH" ], re = [], oe = [], ae = "", ie = E.documentElement, se = re.indexOf || function(e) {
            for (var t = this.length; t-- && this[t] !== e; ) ;
            return t;
        }, ce = A.prototype, le = ce.hasOwnProperty, ue = ce.isPrototypeOf, fe = A.defineProperty, de = [], pe = A.getOwnPropertyDescriptor, he = A.getOwnPropertyNames, ve = A.getPrototypeOf, me = A.setPrototypeOf, ye = !!A.__proto__, be = !1, ge = "__dreCEv1", _e = e.customElements, Ce = !/^force/.test(t.type) && !!(_e && _e.define && _e.get && _e.whenDefined), we = A.create || A, Ee = e.Map || function() {
            var e, t = [], n = [];
            return {
                get: function(e) {
                    return n[se.call(t, e)];
                },
                set: function(r, o) {
                    (e = se.call(t, r)) < 0 ? n[t.push(r) - 1] = o : n[e] = o;
                }
            };
        }, Ae = e.Promise || function(e) {
            function t(e) {
                for (r = !0; n.length; ) n.shift()(e);
            }
            var n = [], r = !1, o = {
                catch: function() {
                    return o;
                },
                then: function(e) {
                    return n.push(e), r && setTimeout(t, 1), o;
                }
            };
            return e(t), o;
        }, Te = !1, ke = we(null), Oe = we(null), xe = new Ee(), Me = function(e) {
            return e.toLowerCase();
        }, Le = A.create || function e(t) {
            return t ? (e.prototype = t, new e()) : this;
        }, $e = me || (ye ? function(e, t) {
            return e.__proto__ = t, e;
        } : he && pe ? function() {
            function e(e, t) {
                for (var n, r = he(t), o = 0, a = r.length; o < a; o++) n = r[o], le.call(e, n) || fe(e, n, pe(t, n));
            }
            return function(t, n) {
                do {
                    e(t, n);
                } while ((n = ve(n)) && !ue.call(n, t));
                return t;
            };
        }() : function(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
        }), Se = e.MutationObserver || e.WebKitMutationObserver, He = (e.HTMLElement || e.Element || e.Node).prototype, Pe = !ue.call(He, ie), je = Pe ? function(e, t, n) {
            return e[t] = n.value, e;
        } : fe, Ne = Pe ? function(e) {
            return 1 === e.nodeType;
        } : function(e) {
            return ue.call(He, e);
        }, Ie = Pe && [], De = He.attachShadow, Re = He.cloneNode, Fe = He.dispatchEvent, Ve = He.getAttribute, Ue = He.hasAttribute, ze = He.removeAttribute, Be = He.setAttribute, qe = E.createElement, We = qe, Ke = Se && {
            attributes: !0,
            characterData: !0,
            attributeOldValue: !0
        }, Ze = Se || function(e) {
            Qe = !1, ie.removeEventListener(X, Ze);
        }, Ge = 0, Xe = P in E && !/^force-all/.test(t.type), Ye = !0, Je = !1, Qe = !0, et = !0, tt = !0;
        if (Xe || (me || ye ? (S = function(e, t) {
            ue.call(t, e) || d(e, t);
        }, H = d) : (S = function(e, t) {
            e[j] || (e[j] = A(!0), d(e, t));
        }, H = S), Pe ? (Qe = !1, function() {
            var e = pe(He, N), t = e.value, n = function(e) {
                var t = new CustomEvent(X, {
                    bubbles: !0
                });
                t.attrName = e, t.prevValue = Ve.call(this, e), t.newValue = null, t[G] = t.attrChange = 2, 
                ze.call(this, e), Fe.call(this, t);
            }, r = function(e, t) {
                var n = Ue.call(this, e), r = n && Ve.call(this, e), o = new CustomEvent(X, {
                    bubbles: !0
                });
                Be.call(this, e, t), o.attrName = e, o.prevValue = n ? r : null, o.newValue = t, 
                n ? o[Z] = o.attrChange = 1 : o[K] = o.attrChange = 0, Fe.call(this, o);
            }, o = function(e) {
                var t, n = e.currentTarget, r = n[j], o = e.propertyName;
                r.hasOwnProperty(o) && (r = r[o], t = new CustomEvent(X, {
                    bubbles: !0
                }), t.attrName = r.name, t.prevValue = r.value || null, t.newValue = r.value = n[o] || null, 
                null == t.prevValue ? t[K] = t.attrChange = 0 : t[Z] = t.attrChange = 1, Fe.call(n, t));
            };
            e.value = function(e, a, i) {
                e === X && this[V] && this.setAttribute !== r && (this[j] = {
                    className: {
                        name: "class",
                        value: this.className
                    }
                }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", o)), 
                t.call(this, e, a, i);
            }, fe(He, N, e);
        }()) : Se || (ie[N](X, Ze), ie.setAttribute(j, 1), ie.removeAttribute(j), Qe && (O = function(e) {
            var t, n, r, o = this;
            if (o === e.target) {
                t = o[j], o[j] = n = M(o);
                for (r in n) {
                    if (!(r in t)) return x(0, o, r, t[r], n[r], K);
                    if (n[r] !== t[r]) return x(1, o, r, t[r], n[r], Z);
                }
                for (r in t) if (!(r in n)) return x(2, o, r, t[r], n[r], G);
            }
        }, x = function(e, t, n, r, o, a) {
            var i = {
                attrChange: e,
                currentTarget: t,
                attrName: n,
                prevValue: r,
                newValue: o
            };
            i[a] = e, c(i);
        }, M = function(e) {
            for (var t, n, r = {}, o = e.attributes, a = 0, i = o.length; a < i; a++) t = o[a], 
            "setAttribute" !== (n = t.name) && (r[n] = t.value);
            return r;
        })), E[P] = function(e, t) {
            if (n = e.toUpperCase(), Ye && (Ye = !1, Se ? (L = function(e, t) {
                function n(e, t) {
                    for (var n = 0, r = e.length; n < r; t(e[n++])) ;
                }
                return new Se(function(r) {
                    for (var o, a, i, s = 0, c = r.length; s < c; s++) "childList" === (o = r[s]).type ? (n(o.addedNodes, e), 
                    n(o.removedNodes, t)) : (a = o.target, tt && a[V] && "style" !== o.attributeName && (i = Ve.call(a, o.attributeName)) !== o.oldValue && a[V](o.attributeName, o.oldValue, i));
                });
            }(a(I), a(R)), ($ = function(e) {
                return L.observe(e, {
                    childList: !0,
                    subtree: !0
                }), e;
            })(E), De && (He.attachShadow = function() {
                return $(De.apply(this, arguments));
            })) : (k = [], E[N]("DOMNodeInserted", l(I)), E[N]("DOMNodeRemoved", l(R))), E[N](Y, u), 
            E[N]("readystatechange", u), He.cloneNode = function(e) {
                var t = Re.call(this, !!e), n = i(t);
                return -1 < n && H(t, oe[n]), e && ae.length && o(t.querySelectorAll(ae)), t;
            }), Je) return Je = !1;
            if (-2 < se.call(re, ee + n) + se.call(re, Q + n) && h(e), !te.test(n) || -1 < se.call(ne, n)) throw new Error("The type " + e + " is invalid");
            var n, s, c = function() {
                return d ? E.createElement(p, n) : E.createElement(p);
            }, f = t || ce, d = le.call(f, F), p = d ? t[F].toUpperCase() : n;
            return d && -1 < se.call(re, Q + p) && h(p), s = re.push((d ? ee : Q) + n) - 1, 
            ae = ae.concat(ae.length ? "," : "", d ? p + '[is="' + e.toLowerCase() + '"]' : p), 
            c.prototype = oe[s] = le.call(f, "prototype") ? f.prototype : Le(He), ae.length && r(E.querySelectorAll(ae), I), 
            c;
        }, E.createElement = We = function(e, t) {
            var n = g(t), r = n ? qe.call(E, e, Me(n)) : qe.call(E, e), o = "" + e, a = se.call(re, (n ? ee : Q) + (n || o).toUpperCase()), i = -1 < a;
            return n && (r.setAttribute("is", n = n.toLowerCase()), i && (i = s(o.toUpperCase(), n))), 
            tt = !E.createElement.innerHTMLHelper, i && H(r, oe[a]), r;
        }), m.prototype = {
            constructor: m,
            define: Ce ? function(e, t, n) {
                if (n) y(e, t, n); else {
                    var r = e.toUpperCase();
                    ke[r] = {
                        constructor: t,
                        create: [ r ]
                    }, xe.set(t, r), _e.define(e, t);
                }
            } : y,
            get: Ce ? function(e) {
                return _e.get(e) || b(e);
            } : b,
            whenDefined: Ce ? function(e) {
                return Ae.race([ _e.whenDefined(e), C(e) ]);
            } : C
        }, !_e || /^force/.test(t.type)) w(); else if (!t.noBuiltIn) try {
            !function(t, n, r) {
                if (n[F] = "a", t.prototype = Le(HTMLAnchorElement.prototype), t.prototype.constructor = t, 
                e.customElements.define(r, t, n), Ve.call(E.createElement("a", {
                    is: r
                }), "is") !== r || Ce && Ve.call(new t(), "is") !== r) throw n;
            }(function e() {
                return Reflect.construct(HTMLAnchorElement, [], e);
            }, {}, "document-register-element-a");
        } catch (e) {
            w();
        }
        if (!t.noBuiltIn) try {
            qe.call(E, "a", "a");
        } catch (e) {
            Me = function(e) {
                return {
                    is: e.toLowerCase()
                };
            };
        }
    }(window);
    var cr = Object.prototype.toString, lr = (f("slot,component", !0), f("key,ref,slot,is")), ur = Object.prototype.hasOwnProperty, fr = /-(\w)/g, dr = h(function(e) {
        return e.replace(fr, function(e, t) {
            return t ? t.toUpperCase() : "";
        });
    }), pr = h(function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
    }), hr = /\B([A-Z])/g, vr = h(function(e) {
        return e.replace(hr, "-$1").toLowerCase();
    }), mr = function(e, t, n) {
        return !1;
    }, yr = function(e) {
        return e;
    }, br = "data-server-rendered", gr = [ "component", "directive", "filter" ], _r = [ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated" ], Cr = {
        optionMergeStrategies: Object.create(null),
        silent: !1,
        productionTip: !1,
        devtools: !1,
        performance: !1,
        errorHandler: null,
        warnHandler: null,
        ignoredElements: [],
        keyCodes: Object.create(null),
        isReservedTag: mr,
        isReservedAttr: mr,
        isUnknownElement: mr,
        getTagNamespace: g,
        parsePlatformTagName: yr,
        mustUseProp: mr,
        _lifecycleHooks: _r
    }, wr = Object.freeze({}), Er = /[^\w.$]/, Ar = g, Tr = "__proto__" in {}, kr = "undefined" != typeof window, Or = kr && window.navigator.userAgent.toLowerCase(), xr = Or && /msie|trident/.test(Or), Mr = Or && Or.indexOf("msie 9.0") > 0, Lr = Or && Or.indexOf("edge/") > 0, $r = Or && Or.indexOf("android") > 0, Sr = Or && /iphone|ipad|ipod|ios/.test(Or), Hr = Or && /chrome\/\d+/.test(Or) && !Lr, Pr = {}.watch, jr = !1;
    if (kr) try {
        var Nr = {};
        Object.defineProperty(Nr, "passive", {
            get: function() {
                jr = !0;
            }
        }), window.addEventListener("test-passive", null, Nr);
    } catch (e) {}
    var Ir, Dr, Rr = function() {
        return void 0 === Ir && (Ir = !kr && "undefined" != typeof global && "server" === global.process.env.VUE_ENV), 
        Ir;
    }, Fr = kr && window.__VUE_DEVTOOLS_GLOBAL_HOOK__, Vr = "undefined" != typeof Symbol && O(Symbol) && "undefined" != typeof Reflect && O(Reflect.ownKeys), Ur = function() {
        function e() {
            r = !1;
            var e = n.slice(0);
            n.length = 0;
            for (var t = 0; t < e.length; t++) e[t]();
        }
        var t, n = [], r = !1;
        if ("undefined" != typeof Promise && O(Promise)) {
            var o = Promise.resolve(), a = function(e) {
                console.error(e);
            };
            t = function() {
                o.then(e).catch(a), Sr && setTimeout(g);
            };
        } else if (xr || "undefined" == typeof MutationObserver || !O(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) t = function() {
            setTimeout(e, 0);
        }; else {
            var i = 1, s = new MutationObserver(e), c = document.createTextNode(String(i));
            s.observe(c, {
                characterData: !0
            }), t = function() {
                i = (i + 1) % 2, c.data = String(i);
            };
        }
        return function(e, o) {
            var a;
            if (n.push(function() {
                if (e) try {
                    e.call(o);
                } catch (e) {
                    k(e, o, "nextTick");
                } else a && a(o);
            }), r || (r = !0, t()), !e && "undefined" != typeof Promise) return new Promise(function(e, t) {
                a = e;
            });
        };
    }();
    Dr = "undefined" != typeof Set && O(Set) ? Set : function() {
        function e() {
            this.set = Object.create(null);
        }
        return e.prototype.has = function(e) {
            return !0 === this.set[e];
        }, e.prototype.add = function(e) {
            this.set[e] = !0;
        }, e.prototype.clear = function() {
            this.set = Object.create(null);
        }, e;
    }();
    var zr = 0, Br = function() {
        this.id = zr++, this.subs = [];
    };
    Br.prototype.addSub = function(e) {
        this.subs.push(e);
    }, Br.prototype.removeSub = function(e) {
        d(this.subs, e);
    }, Br.prototype.depend = function() {
        Br.target && Br.target.addDep(this);
    }, Br.prototype.notify = function() {
        for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) e[t].update();
    }, Br.target = null;
    var qr = [], Wr = Array.prototype, Kr = Object.create(Wr);
    [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(e) {
        var t = Wr[e];
        A(Kr, e, function() {
            for (var n = [], r = arguments.length; r--; ) n[r] = arguments[r];
            var o, a = t.apply(this, n), i = this.__ob__;
            switch (e) {
              case "push":
              case "unshift":
                o = n;
                break;

              case "splice":
                o = n.slice(2);
            }
            return o && i.observeArray(o), i.dep.notify(), a;
        });
    });
    var Zr = Object.getOwnPropertyNames(Kr), Gr = {
        shouldConvert: !0
    }, Xr = function(e) {
        this.value = e, this.dep = new Br(), this.vmCount = 0, A(e, "__ob__", this), Array.isArray(e) ? ((Tr ? L : $)(e, Kr, Zr), 
        this.observeArray(e)) : this.walk(e);
    };
    Xr.prototype.walk = function(e) {
        for (var t = Object.keys(e), n = 0; n < t.length; n++) H(e, t[n], e[t[n]]);
    }, Xr.prototype.observeArray = function(e) {
        for (var t = 0, n = e.length; t < n; t++) S(e[t]);
    };
    var Yr = Cr.optionMergeStrategies;
    Yr.data = function(e, t, n) {
        return n ? D(e, t, n) : t && "function" != typeof t ? e : D.call(this, e, t);
    }, _r.forEach(function(e) {
        Yr[e] = R;
    }), gr.forEach(function(e) {
        Yr[e + "s"] = F;
    }), Yr.watch = function(e, t) {
        if (e === Pr && (e = void 0), t === Pr && (t = void 0), !t) return Object.create(e || null);
        if (!e) return t;
        var n = {};
        y(n, e);
        for (var r in t) {
            var o = n[r], a = t[r];
            o && !Array.isArray(o) && (o = [ o ]), n[r] = o ? o.concat(a) : Array.isArray(a) ? a : [ a ];
        }
        return n;
    }, Yr.props = Yr.methods = Yr.inject = Yr.computed = function(e, t) {
        if (!e) return t;
        var n = Object.create(null);
        return y(n, e), t && y(n, t), n;
    }, Yr.provide = D;
    var Jr = function(e, t) {
        return void 0 === t ? e : t;
    }, Qr = function(e, t, n, r, o, a, i, s) {
        this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = o, this.ns = void 0, 
        this.context = a, this.functionalContext = void 0, this.key = t && t.key, this.componentOptions = i, 
        this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, 
        this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, 
        this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
    }, eo = {
        child: {}
    };
    eo.child.get = function() {
        return this.componentInstance;
    }, Object.defineProperties(Qr.prototype, eo);
    var to, no = function(e) {
        void 0 === e && (e = "");
        var t = new Qr();
        return t.text = e, t.isComment = !0, t;
    }, ro = h(function(e) {
        var t = "&" === e.charAt(0), n = "~" === (e = t ? e.slice(1) : e).charAt(0), r = "!" === (e = n ? e.slice(1) : e).charAt(0);
        return {
            name: e = r ? e.slice(1) : e,
            plain: !(t || n || r),
            once: n,
            capture: r,
            passive: t
        };
    }), oo = null, ao = [], io = [], so = {}, co = !1, lo = !1, uo = 0, fo = 0, po = function(e, t, n, r) {
        this.vm = e, e._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, 
        this.lazy = !!r.lazy, this.sync = !!r.sync) : this.deep = this.user = this.lazy = this.sync = !1, 
        this.cb = n, this.id = ++fo, this.active = !0, this.dirty = this.lazy, this.deps = [], 
        this.newDeps = [], this.depIds = new Dr(), this.newDepIds = new Dr(), this.expression = "", 
        "function" == typeof t ? this.getter = t : (this.getter = T(t), this.getter || (this.getter = function() {})), 
        this.value = this.lazy ? void 0 : this.get();
    };
    po.prototype.get = function() {
        x(this);
        var e, t = this.vm;
        try {
            e = this.getter.call(t, t);
        } catch (e) {
            if (!this.user) throw e;
            k(e, t, 'getter for watcher "' + this.expression + '"');
        } finally {
            this.deep && Pe(e), M(), this.cleanupDeps();
        }
        return e;
    }, po.prototype.addDep = function(e) {
        var t = e.id;
        this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
    }, po.prototype.cleanupDeps = function() {
        for (var e = this, t = this.deps.length; t--; ) {
            var n = e.deps[t];
            e.newDepIds.has(n.id) || n.removeSub(e);
        }
        var r = this.depIds;
        this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, 
        this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
    }, po.prototype.update = function() {
        this.lazy ? this.dirty = !0 : this.sync ? this.run() : He(this);
    }, po.prototype.run = function() {
        if (this.active) {
            var e = this.get();
            if (e !== this.value || a(e) || this.deep) {
                var t = this.value;
                if (this.value = e, this.user) try {
                    this.cb.call(this.vm, e, t);
                } catch (e) {
                    k(e, this.vm, 'callback for watcher "' + this.expression + '"');
                } else this.cb.call(this.vm, e, t);
            }
        }
    }, po.prototype.evaluate = function() {
        this.value = this.get(), this.dirty = !1;
    }, po.prototype.depend = function() {
        for (var e = this, t = this.deps.length; t--; ) e.deps[t].depend();
    }, po.prototype.teardown = function() {
        var e = this;
        if (this.active) {
            this.vm._isBeingDestroyed || d(this.vm._watchers, this);
            for (var t = this.deps.length; t--; ) e.deps[t].removeSub(e);
            this.active = !1;
        }
    };
    var ho = new Dr(), vo = {
        enumerable: !0,
        configurable: !0,
        get: g,
        set: g
    }, mo = {
        lazy: !0
    }, yo = {
        init: function(e, t, n, r) {
            if (!e.componentInstance || e.componentInstance._isDestroyed) (e.componentInstance = Qe(e, oo, n, r)).$mount(t ? e.elm : void 0, t); else if (e.data.keepAlive) {
                var o = e;
                yo.prepatch(o, o);
            }
        },
        prepatch: function(e, t) {
            var n = t.componentOptions;
            Ee(t.componentInstance = e.componentInstance, n.propsData, n.listeners, t, n.children);
        },
        insert: function(e) {
            var t = e.context, n = e.componentInstance;
            n._isMounted || (n._isMounted = !0, Oe(n, "mounted")), e.data.keepAlive && (t._isMounted ? $e(n) : Te(n, !0));
        },
        destroy: function(e) {
            var t = e.componentInstance;
            t._isDestroyed || (e.data.keepAlive ? ke(t, !0) : t.$destroy());
        }
    }, bo = Object.keys(yo), go = 1, _o = 2, Co = 0;
    !function(e) {
        e.prototype._init = function(e) {
            var t = this;
            t._uid = Co++, t._isVue = !0, e && e._isComponent ? yt(t, e) : t.$options = B(bt(t.constructor), e || {}, t), 
            t._renderProxy = t, t._self = t, Ce(t), he(t), mt(t), Oe(t, "beforeCreate"), Ze(t), 
            Ie(t), Ke(t), Oe(t, "created"), t.$options.el && t.$mount(t.$options.el);
        };
    }(Ct), function(e) {
        var t = {};
        t.get = function() {
            return this._data;
        };
        var n = {};
        n.get = function() {
            return this._props;
        }, Object.defineProperty(e.prototype, "$data", t), Object.defineProperty(e.prototype, "$props", n), 
        e.prototype.$set = P, e.prototype.$delete = j, e.prototype.$watch = function(e, t, n) {
            var r = this;
            if (i(t)) return We(r, e, t, n);
            (n = n || {}).user = !0;
            var o = new po(r, e, t, n);
            return n.immediate && t.call(r, o.value), function() {
                o.teardown();
            };
        };
    }(Ct), function(e) {
        var t = /^hook:/;
        e.prototype.$on = function(e, n) {
            var r = this, o = this;
            if (Array.isArray(e)) for (var a = 0, i = e.length; a < i; a++) r.$on(e[a], n); else (o._events[e] || (o._events[e] = [])).push(n), 
            t.test(e) && (o._hasHookEvent = !0);
            return o;
        }, e.prototype.$once = function(e, t) {
            function n() {
                r.$off(e, n), t.apply(r, arguments);
            }
            var r = this;
            return n.fn = t, r.$on(e, n), r;
        }, e.prototype.$off = function(e, t) {
            var n = this, r = this;
            if (!arguments.length) return r._events = Object.create(null), r;
            if (Array.isArray(e)) {
                for (var o = 0, a = e.length; o < a; o++) n.$off(e[o], t);
                return r;
            }
            var i = r._events[e];
            if (!i) return r;
            if (1 === arguments.length) return r._events[e] = null, r;
            if (t) for (var s, c = i.length; c--; ) if ((s = i[c]) === t || s.fn === t) {
                i.splice(c, 1);
                break;
            }
            return r;
        }, e.prototype.$emit = function(e) {
            var t = this, n = t._events[e];
            if (n) {
                n = n.length > 1 ? m(n) : n;
                for (var r = m(arguments, 1), o = 0, a = n.length; o < a; o++) try {
                    n[o].apply(t, r);
                } catch (n) {
                    k(n, t, 'event handler for "' + e + '"');
                }
            }
            return t;
        };
    }(Ct), function(e) {
        e.prototype._update = function(e, t) {
            var n = this;
            n._isMounted && Oe(n, "beforeUpdate");
            var r = n.$el, o = n._vnode, a = oo;
            oo = n, n._vnode = e, o ? n.$el = n.__patch__(o, e) : (n.$el = n.__patch__(n.$el, e, t, !1, n.$options._parentElm, n.$options._refElm), 
            n.$options._parentElm = n.$options._refElm = null), oo = a, r && (r.__vue__ = null), 
            n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
        }, e.prototype.$forceUpdate = function() {
            var e = this;
            e._watcher && e._watcher.update();
        }, e.prototype.$destroy = function() {
            var e = this;
            if (!e._isBeingDestroyed) {
                Oe(e, "beforeDestroy"), e._isBeingDestroyed = !0;
                var t = e.$parent;
                !t || t._isBeingDestroyed || e.$options.abstract || d(t.$children, e), e._watcher && e._watcher.teardown();
                for (var n = e._watchers.length; n--; ) e._watchers[n].teardown();
                e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), 
                Oe(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null);
            }
        };
    }(Ct), function(e) {
        e.prototype.$nextTick = function(e) {
            return Ur(e, this);
        }, e.prototype._render = function() {
            var e = this, t = e.$options, n = t.render, r = t.staticRenderFns, o = t._parentVnode;
            if (e._isMounted) for (var a in e.$slots) {
                var i = e.$slots[a];
                i._rendered && (e.$slots[a] = J(i, !0));
            }
            e.$scopedSlots = o && o.data.scopedSlots || wr, r && !e._staticTrees && (e._staticTrees = []), 
            e.$vnode = o;
            var s;
            try {
                s = n.call(e._renderProxy, e.$createElement);
            } catch (t) {
                k(t, e, "render function"), s = e._vnode;
            }
            return s instanceof Qr || (s = no()), s.parent = o, s;
        }, e.prototype._o = dt, e.prototype._n = u, e.prototype._s = l, e.prototype._l = it, 
        e.prototype._t = st, e.prototype._q = _, e.prototype._i = C, e.prototype._m = ft, 
        e.prototype._f = ct, e.prototype._k = lt, e.prototype._b = ut, e.prototype._v = X, 
        e.prototype._e = no, e.prototype._u = _e, e.prototype._g = vt;
    }(Ct);
    var wo = [ String, RegExp, Array ], Eo = {
        KeepAlive: {
            name: "keep-alive",
            abstract: !0,
            props: {
                include: wo,
                exclude: wo
            },
            created: function() {
                this.cache = Object.create(null);
            },
            destroyed: function() {
                var e = this;
                for (var t in e.cache) $t(e.cache[t]);
            },
            watch: {
                include: function(e) {
                    Lt(this.cache, this._vnode, function(t) {
                        return Mt(e, t);
                    });
                },
                exclude: function(e) {
                    Lt(this.cache, this._vnode, function(t) {
                        return !Mt(e, t);
                    });
                }
            },
            render: function() {
                var e = pe(this.$slots.default), t = e && e.componentOptions;
                if (t) {
                    var n = xt(t);
                    if (n && (this.include && !Mt(this.include, n) || this.exclude && Mt(this.exclude, n))) return e;
                    var r = null == e.key ? t.Ctor.cid + (t.tag ? "::" + t.tag : "") : e.key;
                    this.cache[r] ? e.componentInstance = this.cache[r].componentInstance : this.cache[r] = e, 
                    e.data.keepAlive = !0;
                }
                return e;
            }
        }
    };
    !function(e) {
        var t = {};
        t.get = function() {
            return Cr;
        }, Object.defineProperty(e, "config", t), e.util = {
            warn: Ar,
            extend: y,
            mergeOptions: B,
            defineReactive: H
        }, e.set = P, e.delete = j, e.nextTick = Ur, e.options = Object.create(null), gr.forEach(function(t) {
            e.options[t + "s"] = Object.create(null);
        }), e.options._base = e, y(e.options.components, Eo), wt(e), Et(e), At(e), Ot(e);
    }(Ct), Object.defineProperty(Ct.prototype, "$isServer", {
        get: Rr
    }), Object.defineProperty(Ct.prototype, "$ssrContext", {
        get: function() {
            return this.$vnode && this.$vnode.ssrContext;
        }
    }), Ct.version = "2.4.4";
    var Ao, To, ko = f("style,class"), Oo = f("input,textarea,option,select,progress"), xo = f("contenteditable,draggable,spellcheck"), Mo = f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"), Lo = "http://www.w3.org/1999/xlink", $o = function(e) {
        return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
    }, So = function(e) {
        return $o(e) ? e.slice(6, e.length) : "";
    }, Ho = function(e) {
        return null == e || !1 === e;
    }, Po = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML"
    }, jo = f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"), No = f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0), Io = function(e) {
        return jo(e) || No(e);
    }, Do = Object.create(null), Ro = f("text,number,password,search,email,tel,url"), Fo = Object.freeze({
        createElement: function(e, t) {
            var n = document.createElement(e);
            return "select" !== e ? n : (t.data && t.data.attrs && void 0 !== t.data.attrs.multiple && n.setAttribute("multiple", "multiple"), 
            n);
        },
        createElementNS: function(e, t) {
            return document.createElementNS(Po[e], t);
        },
        createTextNode: function(e) {
            return document.createTextNode(e);
        },
        createComment: function(e) {
            return document.createComment(e);
        },
        insertBefore: function(e, t, n) {
            e.insertBefore(t, n);
        },
        removeChild: function(e, t) {
            e.removeChild(t);
        },
        appendChild: function(e, t) {
            e.appendChild(t);
        },
        parentNode: function(e) {
            return e.parentNode;
        },
        nextSibling: function(e) {
            return e.nextSibling;
        },
        tagName: function(e) {
            return e.tagName;
        },
        setTextContent: function(e, t) {
            e.textContent = t;
        },
        setAttribute: function(e, t, n) {
            e.setAttribute(t, n);
        }
    }), Vo = {
        create: function(e, t) {
            Ft(t);
        },
        update: function(e, t) {
            e.data.ref !== t.data.ref && (Ft(e, !0), Ft(t));
        },
        destroy: function(e) {
            Ft(e, !0);
        }
    }, Uo = new Qr("", {}, []), zo = [ "create", "activate", "update", "remove", "destroy" ], Bo = {
        create: Bt,
        update: Bt,
        destroy: function(e) {
            Bt(e, Uo);
        }
    }, qo = Object.create(null), Wo = [ Vo, Bo ], Ko = {
        create: Gt,
        update: Gt
    }, Zo = {
        create: Yt,
        update: Yt
    }, Go = "__r", Xo = "__c", Yo = {
        create: tn,
        update: tn
    }, Jo = {
        create: nn,
        update: nn
    }, Qo = h(function(e) {
        var t = {}, n = /;(?![^(]*\))/g, r = /:(.+)/;
        return e.split(n).forEach(function(e) {
            if (e) {
                var n = e.split(r);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
            }
        }), t;
    }), ea = /^--/, ta = /\s*!important$/, na = function(e, t, n) {
        if (ea.test(t)) e.style.setProperty(t, n); else if (ta.test(n)) e.style.setProperty(t, n.replace(ta, ""), "important"); else {
            var r = oa(t);
            if (Array.isArray(n)) for (var o = 0, a = n.length; o < a; o++) e.style[r] = n[o]; else e.style[r] = n;
        }
    }, ra = [ "Webkit", "Moz", "ms" ], oa = h(function(e) {
        if (To = To || document.createElement("div").style, "filter" !== (e = dr(e)) && e in To) return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < ra.length; n++) {
            var r = ra[n] + t;
            if (r in To) return r;
        }
    }), aa = {
        create: un,
        update: un
    }, ia = h(function(e) {
        return {
            enterClass: e + "-enter",
            enterToClass: e + "-enter-to",
            enterActiveClass: e + "-enter-active",
            leaveClass: e + "-leave",
            leaveToClass: e + "-leave-to",
            leaveActiveClass: e + "-leave-active"
        };
    }), sa = kr && !Mr, ca = "transition", la = "animation", ua = "transition", fa = "transitionend", da = "animation", pa = "animationend";
    sa && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (ua = "WebkitTransition", 
    fa = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (da = "WebkitAnimation", 
    pa = "webkitAnimationEnd"));
    var ha = kr && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout, va = /\b(transform|all)(,|$)/, ma = function(r) {
        function a(e) {
            return new Qr($.tagName(e).toLowerCase(), {}, [], void 0, e);
        }
        function i(e, t) {
            function n() {
                0 == --n.listeners && s(e);
            }
            return n.listeners = t, n;
        }
        function s(e) {
            var n = $.parentNode(e);
            t(n) && $.removeChild(n, e);
        }
        function c(e, r, o, a, i) {
            if (e.isRootInsert = !i, !l(e, r, o, a)) {
                var s = e.data, c = e.children, u = e.tag;
                t(u) ? (e.elm = e.ns ? $.createElementNS(e.ns, u) : $.createElement(u, e), y(e), 
                h(e, c, r), t(s) && m(e, r), p(o, e.elm, a)) : n(e.isComment) ? (e.elm = $.createComment(e.text), 
                p(o, e.elm, a)) : (e.elm = $.createTextNode(e.text), p(o, e.elm, a));
            }
        }
        function l(e, r, o, a) {
            var i = e.data;
            if (t(i)) {
                var s = t(e.componentInstance) && i.keepAlive;
                if (t(i = i.hook) && t(i = i.init) && i(e, !1, o, a), t(e.componentInstance)) return u(e, r), 
                n(s) && d(e, r, o, a), !0;
            }
        }
        function u(e, n) {
            t(e.data.pendingInsert) && (n.push.apply(n, e.data.pendingInsert), e.data.pendingInsert = null), 
            e.elm = e.componentInstance.$el, v(e) ? (m(e, n), y(e)) : (Ft(e), n.push(e));
        }
        function d(e, n, r, o) {
            for (var a, i = e; i.componentInstance; ) if (i = i.componentInstance._vnode, t(a = i.data) && t(a = a.transition)) {
                for (a = 0; a < M.activate.length; ++a) M.activate[a](Uo, i);
                n.push(i);
                break;
            }
            p(r, e.elm, o);
        }
        function p(e, n, r) {
            t(e) && (t(r) ? r.parentNode === e && $.insertBefore(e, n, r) : $.appendChild(e, n));
        }
        function h(e, t, n) {
            if (Array.isArray(t)) for (var r = 0; r < t.length; ++r) c(t[r], n, e.elm, null, !0); else o(e.text) && $.appendChild(e.elm, $.createTextNode(e.text));
        }
        function v(e) {
            for (;e.componentInstance; ) e = e.componentInstance._vnode;
            return t(e.tag);
        }
        function m(e, n) {
            for (var r = 0; r < M.create.length; ++r) M.create[r](Uo, e);
            t(O = e.data.hook) && (t(O.create) && O.create(Uo, e), t(O.insert) && n.push(e));
        }
        function y(e) {
            for (var n, r = e; r; ) t(n = r.context) && t(n = n.$options._scopeId) && $.setAttribute(e.elm, n, ""), 
            r = r.parent;
            t(n = oo) && n !== e.context && t(n = n.$options._scopeId) && $.setAttribute(e.elm, n, "");
        }
        function b(e, t, n, r, o, a) {
            for (;r <= o; ++r) c(n[r], a, e, t);
        }
        function g(e) {
            var n, r, o = e.data;
            if (t(o)) for (t(n = o.hook) && t(n = n.destroy) && n(e), n = 0; n < M.destroy.length; ++n) M.destroy[n](e);
            if (t(n = e.children)) for (r = 0; r < e.children.length; ++r) g(e.children[r]);
        }
        function _(e, n, r, o) {
            for (;r <= o; ++r) {
                var a = n[r];
                t(a) && (t(a.tag) ? (C(a), g(a)) : s(a.elm));
            }
        }
        function C(e, n) {
            if (t(n) || t(e.data)) {
                var r, o = M.remove.length + 1;
                for (t(n) ? n.listeners += o : n = i(e.elm, o), t(r = e.componentInstance) && t(r = r._vnode) && t(r.data) && C(r, n), 
                r = 0; r < M.remove.length; ++r) M.remove[r](e, n);
                t(r = e.data.hook) && t(r = r.remove) ? r(e, n) : n();
            } else s(e.elm);
        }
        function w(n, r, o, a, i) {
            for (var s, l, u, f = 0, d = 0, p = r.length - 1, h = r[0], v = r[p], m = o.length - 1, y = o[0], g = o[m], C = !i; f <= p && d <= m; ) e(h) ? h = r[++f] : e(v) ? v = r[--p] : Vt(h, y) ? (A(h, y, a), 
            h = r[++f], y = o[++d]) : Vt(v, g) ? (A(v, g, a), v = r[--p], g = o[--m]) : Vt(h, g) ? (A(h, g, a), 
            C && $.insertBefore(n, h.elm, $.nextSibling(v.elm)), h = r[++f], g = o[--m]) : Vt(v, y) ? (A(v, y, a), 
            C && $.insertBefore(n, v.elm, h.elm), v = r[--p], y = o[++d]) : (e(s) && (s = zt(r, f, p)), 
            e(l = t(y.key) ? s[y.key] : E(y, r, f, p)) ? c(y, a, n, h.elm) : Vt(u = r[l], y) ? (A(u, y, a), 
            r[l] = void 0, C && $.insertBefore(n, u.elm, h.elm)) : c(y, a, n, h.elm), y = o[++d]);
            f > p ? b(n, e(o[m + 1]) ? null : o[m + 1].elm, o, d, m, a) : d > m && _(n, r, f, p);
        }
        function E(e, n, r, o) {
            for (var a = r; a < o; a++) {
                var i = n[a];
                if (t(i) && Vt(e, i)) return a;
            }
        }
        function A(r, o, a, i) {
            if (r !== o) {
                var s = o.elm = r.elm;
                if (n(r.isAsyncPlaceholder)) t(o.asyncFactory.resolved) ? k(r.elm, o, a) : o.isAsyncPlaceholder = !0; else if (n(o.isStatic) && n(r.isStatic) && o.key === r.key && (n(o.isCloned) || n(o.isOnce))) o.componentInstance = r.componentInstance; else {
                    var c, l = o.data;
                    t(l) && t(c = l.hook) && t(c = c.prepatch) && c(r, o);
                    var u = r.children, f = o.children;
                    if (t(l) && v(o)) {
                        for (c = 0; c < M.update.length; ++c) M.update[c](r, o);
                        t(c = l.hook) && t(c = c.update) && c(r, o);
                    }
                    e(o.text) ? t(u) && t(f) ? u !== f && w(s, u, f, a, i) : t(f) ? (t(r.text) && $.setTextContent(s, ""), 
                    b(s, null, f, 0, f.length - 1, a)) : t(u) ? _(s, u, 0, u.length - 1) : t(r.text) && $.setTextContent(s, "") : r.text !== o.text && $.setTextContent(s, o.text), 
                    t(l) && t(c = l.hook) && t(c = c.postpatch) && c(r, o);
                }
            }
        }
        function T(e, r, o) {
            if (n(o) && t(e.parent)) e.parent.data.pendingInsert = r; else for (var a = 0; a < r.length; ++a) r[a].data.hook.insert(r[a]);
        }
        function k(e, r, o) {
            if (n(r.isComment) && t(r.asyncFactory)) return r.elm = e, r.isAsyncPlaceholder = !0, 
            !0;
            r.elm = e;
            var a = r.tag, i = r.data, s = r.children;
            if (t(i) && (t(O = i.hook) && t(O = O.init) && O(r, !0), t(O = r.componentInstance))) return u(r, o), 
            !0;
            if (t(a)) {
                if (t(s)) if (e.hasChildNodes()) if (t(O = i) && t(O = O.domProps) && t(O = O.innerHTML)) {
                    if (O !== e.innerHTML) return !1;
                } else {
                    for (var c = !0, l = e.firstChild, f = 0; f < s.length; f++) {
                        if (!l || !k(l, s[f], o)) {
                            c = !1;
                            break;
                        }
                        l = l.nextSibling;
                    }
                    if (!c || l) return !1;
                } else h(r, s, o);
                if (t(i)) for (var d in i) if (!S(d)) {
                    m(r, o);
                    break;
                }
            } else e.data !== r.text && (e.data = r.text);
            return !0;
        }
        var O, x, M = {}, L = r.modules, $ = r.nodeOps;
        for (O = 0; O < zo.length; ++O) for (M[zo[O]] = [], x = 0; x < L.length; ++x) t(L[x][zo[O]]) && M[zo[O]].push(L[x][zo[O]]);
        var S = f("attrs,style,class,staticClass,staticStyle,key");
        return function(r, o, i, s, l, u) {
            if (!e(o)) {
                var f = !1, d = [];
                if (e(r)) f = !0, c(o, d, l, u); else {
                    var p = t(r.nodeType);
                    if (!p && Vt(r, o)) A(r, o, d, s); else {
                        if (p) {
                            if (1 === r.nodeType && r.hasAttribute(br) && (r.removeAttribute(br), i = !0), n(i) && k(r, o, d)) return T(o, d, !0), 
                            r;
                            r = a(r);
                        }
                        var h = r.elm, m = $.parentNode(h);
                        if (c(o, d, h._leaveCb ? null : m, $.nextSibling(h)), t(o.parent)) for (var y = o.parent, b = v(o); y; ) {
                            for (var C = 0; C < M.destroy.length; ++C) M.destroy[C](y);
                            if (y.elm = o.elm, b) {
                                for (var w = 0; w < M.create.length; ++w) M.create[w](Uo, y);
                                var E = y.data.hook.insert;
                                if (E.merged) for (var O = 1; O < E.fns.length; O++) E.fns[O]();
                            }
                            y = y.parent;
                        }
                        t(m) ? _(m, [ r ], 0, 0) : t(r.tag) && g(r);
                    }
                }
                return T(o, d, f), o.elm;
            }
            t(r) && g(r);
        };
    }({
        nodeOps: Fo,
        modules: [ Ko, Zo, Yo, Jo, aa, kr ? {
            create: Tn,
            activate: Tn,
            remove: function(e, t) {
                !0 !== e.data.show ? wn(e, t) : t();
            }
        } : {} ].concat(Wo)
    });
    Mr && document.addEventListener("selectionchange", function() {
        var e = document.activeElement;
        e && e.vmodel && Sn(e, "input");
    });
    var ya = {
        model: {
            inserted: function(e, t, n) {
                "select" === n.tag ? (kn(e, t, n.context), e._vOptions = [].map.call(e.options, Mn)) : ("textarea" === n.tag || Ro(e.type)) && (e._vModifiers = t.modifiers, 
                t.modifiers.lazy || (e.addEventListener("change", $n), $r || (e.addEventListener("compositionstart", Ln), 
                e.addEventListener("compositionend", $n)), Mr && (e.vmodel = !0)));
            },
            componentUpdated: function(e, t, n) {
                if ("select" === n.tag) {
                    kn(e, t, n.context);
                    var r = e._vOptions, o = e._vOptions = [].map.call(e.options, Mn);
                    o.some(function(e, t) {
                        return !_(e, r[t]);
                    }) && (e.multiple ? t.value.some(function(e) {
                        return xn(e, o);
                    }) : t.value !== t.oldValue && xn(t.value, o)) && Sn(e, "change");
                }
            }
        },
        show: {
            bind: function(e, t, n) {
                var r = t.value, o = (n = Hn(n)).data && n.data.transition, a = e.__vOriginalDisplay = "none" === e.style.display ? "" : e.style.display;
                r && o ? (n.data.show = !0, Cn(n, function() {
                    e.style.display = a;
                })) : e.style.display = r ? a : "none";
            },
            update: function(e, t, n) {
                var r = t.value;
                r !== t.oldValue && ((n = Hn(n)).data && n.data.transition ? (n.data.show = !0, 
                r ? Cn(n, function() {
                    e.style.display = e.__vOriginalDisplay;
                }) : wn(n, function() {
                    e.style.display = "none";
                })) : e.style.display = r ? e.__vOriginalDisplay : "none");
            },
            unbind: function(e, t, n, r, o) {
                o || (e.style.display = e.__vOriginalDisplay);
            }
        }
    }, ba = {
        name: String,
        appear: Boolean,
        css: Boolean,
        mode: String,
        type: String,
        enterClass: String,
        leaveClass: String,
        enterToClass: String,
        leaveToClass: String,
        enterActiveClass: String,
        leaveActiveClass: String,
        appearClass: String,
        appearActiveClass: String,
        appearToClass: String,
        duration: [ Number, String, Object ]
    }, ga = {
        name: "transition",
        props: ba,
        abstract: !0,
        render: function(e) {
            var t = this, n = this.$options._renderChildren;
            if (n && (n = n.filter(function(e) {
                return e.tag || de(e);
            })).length) {
                var r = this.mode, a = n[0];
                if (In(this.$vnode)) return a;
                var i = Pn(a);
                if (!i) return a;
                if (this._leaving) return Nn(e, a);
                var s = "__transition-" + this._uid + "-";
                i.key = null == i.key ? i.isComment ? s + "comment" : s + i.tag : o(i.key) ? 0 === String(i.key).indexOf(s) ? i.key : s + i.key : i.key;
                var c = (i.data || (i.data = {})).transition = jn(this), l = this._vnode, u = Pn(l);
                if (i.data.directives && i.data.directives.some(function(e) {
                    return "show" === e.name;
                }) && (i.data.show = !0), u && u.data && !Dn(i, u) && !de(u)) {
                    var f = u && (u.data.transition = y({}, c));
                    if ("out-in" === r) return this._leaving = !0, ne(f, "afterLeave", function() {
                        t._leaving = !1, t.$forceUpdate();
                    }), Nn(e, a);
                    if ("in-out" === r) {
                        if (de(i)) return l;
                        var d, p = function() {
                            d();
                        };
                        ne(c, "afterEnter", p), ne(c, "enterCancelled", p), ne(f, "delayLeave", function(e) {
                            d = e;
                        });
                    }
                }
                return a;
            }
        }
    }, _a = y({
        tag: String,
        moveClass: String
    }, ba);
    delete _a.mode;
    var Ca = {
        Transition: ga,
        TransitionGroup: {
            props: _a,
            render: function(e) {
                for (var t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, o = this.$slots.default || [], a = this.children = [], i = jn(this), s = 0; s < o.length; s++) {
                    var c = o[s];
                    c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (a.push(c), 
                    n[c.key] = c, (c.data || (c.data = {})).transition = i);
                }
                if (r) {
                    for (var l = [], u = [], f = 0; f < r.length; f++) {
                        var d = r[f];
                        d.data.transition = i, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? l.push(d) : u.push(d);
                    }
                    this.kept = e(t, null, l), this.removed = u;
                }
                return e(t, null, a);
            },
            beforeUpdate: function() {
                this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
            },
            updated: function() {
                var e = this.prevChildren, t = this.moveClass || (this.name || "v") + "-move";
                e.length && this.hasMove(e[0].elm, t) && (e.forEach(Rn), e.forEach(Fn), e.forEach(Vn), 
                e.forEach(function(e) {
                    if (e.data.moved) {
                        var n = e.elm, r = n.style;
                        vn(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(fa, n._moveCb = function e(r) {
                            r && !/transform$/.test(r.propertyName) || (n.removeEventListener(fa, e), n._moveCb = null, 
                            mn(n, t));
                        });
                    }
                }));
            },
            methods: {
                hasMove: function(e, t) {
                    if (!sa) return !1;
                    if (this._hasMove) return this._hasMove;
                    var n = e.cloneNode();
                    e._transitionClasses && e._transitionClasses.forEach(function(e) {
                        dn(n, e);
                    }), fn(n, t), n.style.display = "none", this.$el.appendChild(n);
                    var r = bn(n);
                    return this.$el.removeChild(n), this._hasMove = r.hasTransform;
                }
            }
        }
    };
    Ct.config.mustUseProp = function(e, t, n) {
        return "value" === n && Oo(e) && "button" !== t || "selected" === n && "option" === e || "checked" === n && "input" === e || "muted" === n && "video" === e;
    }, Ct.config.isReservedTag = Io, Ct.config.isReservedAttr = ko, Ct.config.getTagNamespace = function(e) {
        return No(e) ? "svg" : "math" === e ? "math" : void 0;
    }, Ct.config.isUnknownElement = function(e) {
        if (!kr) return !0;
        if (Io(e)) return !1;
        if (e = e.toLowerCase(), null != Do[e]) return Do[e];
        var t = document.createElement(e);
        return e.indexOf("-") > -1 ? Do[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : Do[e] = /HTMLUnknownElement/.test(t.toString());
    }, y(Ct.options.directives, ya), y(Ct.options.components, Ca), Ct.prototype.__patch__ = kr ? ma : g, 
    Ct.prototype.$mount = function(e, t) {
        return e = e && kr ? Rt(e) : void 0, we(this, e, t);
    }, setTimeout(function() {
        Cr.devtools && Fr && Fr.emit("init", Ct);
    }, 0), Object.setPrototypeOf = Object.setPrototypeOf || Un;
    Un.bind(Object);
    var wa = "undefined" != typeof Symbol && "undefined" != typeof Reflect, Ea = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
        };
    }();
    Object.setPrototypeOf(Wn.prototype, HTMLElement.prototype), Object.setPrototypeOf(Wn, HTMLElement);
    var Aa = /-(\w)/g, Ta = function(e) {
        return e.replace(Aa, function(e, t) {
            return t ? t.toUpperCase() : "";
        });
    }, ka = /([^-])([A-Z])/g, Oa = function(e) {
        return e.replace(ka, "$1-$2").replace(ka, "$1-$2").toLowerCase();
    }, xa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };
    "undefined" != typeof window && window.Vue && (window.Vue.use(ar), ar.installed && (ar.installed = !1));
    var Ma = function(e, t) {
        return "#" === e[0] && (e = e.substr(1)), console.assert(6 === e.length, "color must have a length of 6 hex numbers"), 
        (320 * parseInt(e.substr(0, 2), 16) + 560 * parseInt(e.substr(2, 2), 16) + 110 * parseInt(e.substr(4, 2), 16)) / 1e3 > (t || 125);
    }, La = {
        black: "#000000",
        white: "#ffffff",
        red: {
            50: "#ffebee",
            100: "#ffcdd2",
            200: "#ef9a9a",
            300: "#e57373",
            400: "#ef5350",
            500: "#f44336",
            600: "#e53935",
            700: "#d32f2f",
            800: "#c62828",
            900: "#b71c1c"
        },
        pink: {
            50: "#fce4ec",
            100: "#f8bbd0",
            200: "#f48fb1",
            300: "#f06292",
            400: "#ec407a",
            500: "#e91e63",
            600: "#d81b60",
            700: "#c2185b",
            800: "#ad1457",
            900: "#880e4f"
        },
        purple: {
            50: "#f3e5f5",
            100: "#e1bee7",
            200: "#ce93d8",
            300: "#ba68c8",
            400: "#ab47bc",
            500: "#9c27b0",
            600: "#8e24aa",
            700: "#7b1fa2",
            800: "#6a1b9a",
            900: "#4a148c"
        },
        "deep-purple": {
            50: "#ede7f6",
            100: "#d1c4e9",
            200: "#b39ddb",
            300: "#9575cd",
            400: "#7e57c2",
            500: "#673ab7",
            600: "#5e35b1",
            700: "#512da8",
            800: "#4527a0",
            900: "#311b92"
        },
        indigo: {
            50: "#e8eaf6",
            100: "#c5cae9",
            200: "#9fa8da",
            300: "#7986cb",
            400: "#5c6bc0",
            500: "#3f51b5",
            600: "#3949ab",
            700: "#303f9f",
            800: "#283593",
            900: "#1a237e"
        },
        blue: {
            50: "#e3f2fd",
            100: "#bbdefb",
            200: "#90caf9",
            300: "#64b5f6",
            400: "#42a5f5",
            500: "#2196f3",
            600: "#1e88e5",
            700: "#1976d2",
            800: "#1565c0",
            900: "#0d47a1"
        },
        "light-blue": {
            50: "#e1f5fe",
            100: "#b3e5fc",
            200: "#81d4fa",
            300: "#4fc3f7",
            400: "#29b6f6",
            500: "#03a9f4",
            600: "#039be5",
            700: "#0288d1",
            800: "#0277bd",
            900: "#01579b"
        },
        cyan: {
            50: "#e0f7fa",
            100: "#b2ebf2",
            200: "#80deea",
            300: "#4dd0e1",
            400: "#26c6da",
            500: "#00bcd4",
            600: "#00acc1",
            700: "#0097a7",
            800: "#00838f",
            900: "#006064"
        },
        teal: {
            50: "#e0f2f1",
            100: "#b2dfdb",
            200: "#80cbc4",
            300: "#4db6ac",
            400: "#26a69a",
            500: "#009688",
            600: "#00897b",
            700: "#00796b",
            800: "#00695c",
            900: "#004d40"
        },
        green: {
            50: "#e8f5e9",
            100: "#c8e6c9",
            200: "#a5d6a7",
            300: "#81c784",
            400: "#66bb6a",
            500: "#4caf50",
            600: "#43a047",
            700: "#388e3c",
            800: "#2e7d32",
            900: "#1b5e20"
        },
        "light-green": {
            50: "#f1f8e9",
            100: "#dcedc8",
            200: "#c5e1a5",
            300: "#aed581",
            400: "#9ccc65",
            500: "#8bc34a",
            600: "#7cb342",
            700: "#689f38",
            800: "#558b2f",
            900: "#33691e"
        },
        lime: {
            50: "#f9fbe7",
            100: "#f0f4c3",
            200: "#e6ee9c",
            300: "#dce775",
            400: "#d4e157",
            500: "#cddc39",
            600: "#c0ca33",
            700: "#afb42b",
            800: "#9e9d24",
            900: "#827717"
        },
        yellow: {
            50: "#fffde7",
            100: "#fff9c4",
            200: "#fff59d",
            300: "#fff176",
            400: "#ffee58",
            500: "#ffeb3b",
            600: "#fdd835",
            700: "#fbc02d",
            800: "#f9a825",
            900: "#f57f17"
        },
        amber: {
            50: "#fff8e1",
            100: "#ffecb3",
            200: "#ffe082",
            300: "#ffd54f",
            400: "#ffca28",
            500: "#ffc107",
            600: "#ffb300",
            700: "#ffa000",
            800: "#ff8f00",
            900: "#ff6f00"
        },
        orange: {
            50: "#fff3e0",
            100: "#ffe0b2",
            200: "#ffcc80",
            300: "#ffb74d",
            400: "#ffa726",
            500: "#ff9800",
            600: "#fb8c00",
            700: "#f57c00",
            800: "#ef6c00",
            900: "#e65100"
        },
        "deep-orange": {
            50: "#fbe9e7",
            100: "#ffccbc",
            200: "#ffab91",
            300: "#ff8a65",
            400: "#ff7043",
            500: "#ff5722",
            600: "#f4511e",
            700: "#e64a19",
            800: "#d84315",
            900: "#bf360c"
        },
        brown: {
            50: "#efebe9",
            100: "#d7ccc8",
            200: "#bcaaa4",
            300: "#a1887f",
            400: "#8d6e63",
            500: "#795548",
            600: "#6d4c41",
            700: "#5d4037",
            800: "#4e342e",
            900: "#3e2723"
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121"
        },
        "blue-grey": {
            50: "#eceff1",
            100: "#cfd8dc",
            200: "#b0bec5",
            300: "#90a4ae",
            400: "#78909c",
            500: "#607d8b",
            600: "#546e7a",
            700: "#455a64",
            800: "#37474f",
            900: "#263238"
        }
    }, $a = {
        red: {
            a100: "#ff8a80",
            a200: "#ff5252",
            a400: "#ff1744",
            a700: "#d50000"
        },
        pink: {
            a100: "#ff80ab",
            a200: "#ff4081",
            a400: "#f50057",
            a700: "#c51162"
        },
        purple: {
            a100: "#ea80fc",
            a200: "#e040fb",
            a400: "#d500f9",
            a700: "#aa00ff"
        },
        "deep-purple": {
            a100: "#b388ff",
            a200: "#7c4dff",
            a400: "#651fff",
            a700: "#6200ea"
        },
        indigo: {
            a100: "#8c9eff",
            a200: "#536dfe",
            a400: "#3d5afe",
            a700: "#304ffe"
        },
        blue: {
            a100: "#82b1ff",
            a200: "#448aff",
            a400: "#2979ff",
            a700: "#2962ff"
        },
        "light-blue": {
            a100: "#80d8ff",
            a200: "#40c4ff",
            a400: "#00b0ff",
            a700: "#0091ea"
        },
        cyan: {
            a100: "#84ffff",
            a200: "#18ffff",
            a400: "#00e5ff",
            a700: "#00b8d4"
        },
        teal: {
            a100: "#a7ffeb",
            a200: "#64ffda",
            a400: "#1de9b6",
            a700: "#00bfa5"
        },
        green: {
            a100: "#b9f6ca",
            a200: "#69f0ae",
            a400: "#00e676",
            a700: "#00c853"
        },
        "light-green": {
            a100: "#ccff90",
            a200: "#b2ff59",
            a400: "#76ff03",
            a700: "#64dd17"
        },
        lime: {
            a100: "#f4ff81",
            a200: "#eeff41",
            a400: "#c6ff00",
            a700: "#aeea00"
        },
        yellow: {
            a100: "#ffff8d",
            a200: "#ffff00",
            a400: "#ffea00",
            a700: "#ffd600"
        },
        amber: {
            a100: "#ffe57f",
            a200: "#ffd740",
            a400: "#ffc400",
            a700: "#ffab00"
        },
        orange: {
            a100: "#ffd180",
            a200: "#ffab40",
            a400: "#ff9100",
            a700: "#ff6d00"
        },
        "deep-orange": {
            a100: "#ff9e80",
            a200: "#ff6e40",
            a400: "#ff3d00",
            a700: "#dd2c00"
        }
    }, Sa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, Ha = (function() {
        function e(e) {
            this.value = e;
        }
        function t(t) {
            function n(o, a) {
                try {
                    var i = t[o](a), s = i.value;
                    s instanceof e ? Promise.resolve(s.value).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    }) : r(i.done ? "return" : "normal", i.value);
                } catch (e) {
                    r("throw", e);
                }
            }
            function r(e, t) {
                switch (e) {
                  case "return":
                    o.resolve({
                        value: t,
                        done: !0
                    });
                    break;

                  case "throw":
                    o.reject(t);
                    break;

                  default:
                    o.resolve({
                        value: t,
                        done: !1
                    });
                }
                (o = o.next) ? n(o.key, o.arg) : a = null;
            }
            var o, a;
            this._invoke = function(e, t) {
                return new Promise(function(r, i) {
                    var s = {
                        key: e,
                        arg: t,
                        resolve: r,
                        reject: i,
                        next: null
                    };
                    a ? a = a.next = s : (o = a = s, n(e, t));
                });
            }, "function" != typeof t.return && (this.return = void 0);
        }
        "function" == typeof Symbol && Symbol.asyncIterator && (t.prototype[Symbol.asyncIterator] = function() {
            return this;
        }), t.prototype.next = function(e) {
            return this._invoke("next", e);
        }, t.prototype.throw = function(e) {
            return this._invoke("throw", e);
        }, t.prototype.return = function(e) {
            return this._invoke("return", e);
        };
    }(), function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }), Pa = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }, ja = Object.keys(La).reduce(function(e, t) {
        return e[t] = La[t], $a[t] && (e[t] = Pa({}, e[t], $a[t])), e;
    }, {});
    !function() {
        if ("undefined" != typeof document) {
            var e = document.head || document.getElementsByTagName("head")[0], t = document.createElement("style"), n = " .color-wrapper[data-v-370b8428] { margin: 0; padding: 0; } .color-wrapper[data-v-370b8428], .color-wrapper *[data-v-370b8428] { box-sizing: content-box; text-align: left; line-height: 1; font-size: 0; } .color[data-v-370b8428], .back-icon[data-v-370b8428] { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -webkit-touch-callout: none; tap-highlight-color: transparent; user-select: none; outline-style: none; cursor: pointer; } .color[data-v-370b8428] { display: inline-block; border-radius: 100%; position: relative; } .back-icon[data-v-370b8428] { display: inline-block; text-align: center; float: left; border-radius: 100%; position: relative; } .back-icon[data-v-370b8428]:hover { background: rgba(0, 0, 0, 0.19); } .outer-circle[data-v-370b8428] { position: absolute; border: 4px solid rgba(0, 0, 0, 0.0); border-radius: 100%; margin: 0; transition: all 0.45s; } .inner-circle[data-v-370b8428] { position: absolute; border: 4px solid rgba(0, 0, 0, 0.0); border-radius: 100%; margin: 7px; transition: all 0.45s; } .visible .inner-circle[data-v-370b8428] { border: 4px solid rgba(255, 255, 255, 1); transition: all 1s; } .visible .outer-circle[data-v-370b8428] { border: 4px solid rgba(0, 0, 0, 0.17); transition: all 1s; } .visible.is-light .inner-circle[data-v-370b8428] { border-color: #555555; transition: all 1s; } ";
            t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = n : t.appendChild(document.createTextNode(n)), 
            e.appendChild(t);
        }
    }();
    var Na = {
        render: function() {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("div", {
                staticClass: "color-wrapper",
                style: e.fixedMinHeight ? {
                    width: e.wrapperWidth,
                    minHeight: e.wrapperMinHeight
                } : {
                    width: e.wrapperWidth
                }
            }, [ n("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: void 0 !== e.subPalette,
                    expression: "subPalette !== undefined"
                } ],
                staticClass: "back-icon",
                style: {
                    margin: e.colorMargin + "px",
                    height: e.colorSizePx,
                    width: e.colorSizePx
                },
                on: {
                    click: function(t) {
                        e.subPalette = void 0;
                    }
                }
            }, [ n("svg", {
                attrs: {
                    fill: "#000000",
                    height: e.colorSize,
                    viewBox: "0 0 24 24",
                    width: e.colorSize / 2,
                    xmlns: "http://www.w3.org/2000/svg"
                }
            }, [ n("path", {
                attrs: {
                    d: "M0 0h24v24H0z",
                    fill: "none"
                }
            }), e._v(" "), n("path", {
                attrs: {
                    d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                }
            }) ]) ]), e._v(" "), e._l(e.colors, function(t) {
                return n("div", {
                    key: t.name,
                    staticClass: "color",
                    style: e.getColorStyle(t),
                    attrs: {
                        title: t.name
                    },
                    on: {
                        click: function(n) {
                            n.stopPropagation(), e.click(t);
                        }
                    }
                }, [ n("span", {
                    class: {
                        visible: t.value.toLowerCase() === e.value.toLowerCase() || e.isTintOfSelected(t),
                        "is-light": e.colorIsLight(t.value)
                    }
                }, [ n("span", {
                    staticClass: "outer-circle",
                    style: {
                        width: e.colorSize - 8 + "px",
                        height: e.colorSize - 8 + "px"
                    }
                }), e._v(" "), n("span", {
                    staticClass: "inner-circle",
                    style: {
                        width: e.colorSize - 22 + "px",
                        height: e.colorSize - 22 + "px"
                    }
                }) ]) ]);
            }) ], 2);
        },
        staticRenderFns: [],
        _scopeId: "data-v-370b8428",
        name: "color-picker",
        props: {
            value: {
                type: String,
                required: !0
            },
            palette: {
                type: [ String, Object ],
                required: !1
            },
            colorSize: {
                type: Number,
                default: 54
            },
            colorsPerRow: {
                type: Number,
                default: 5
            },
            colorMargin: {
                type: Number,
                default: 6
            },
            defaultTint: {
                type: [ Number, String ],
                default: 500
            },
            fixedMinHeight: {
                type: Boolean,
                default: !0
            },
            useSpectrumPicker: {
                type: Boolean,
                default: !0
            }
        },
        methods: {
            getColorStyle: function(e) {
                return {
                    background: e.value,
                    margin: this.colorMargin + "px",
                    height: this.colorSizePx,
                    width: this.colorSizePx
                };
            },
            colorIsLight: function(e) {
                return Ma(e, 210);
            },
            click: function(e) {
                if (this.useSpectrumPicker && "object" === Sa(this.currentPalette[e.name])) {
                    if (this.subPalette = e.name, this.isTintOfSelected(e)) return;
                    this.selectedColorName = e.name;
                }
                this.$emit("change", e.value);
            },
            isTintOfSelected: function(e) {
                return this.selectedColorName === e.name && ir(sr(this.currentPalette[this.selectedColorName]), this.value);
            },
            getDefaultColor: function(e) {
                return e[this.defaultTint] ? e[this.defaultTint] : sr(e)[Math.round(Object.keys(e).length / 2) - 1];
            }
        },
        computed: {
            colors: function() {
                var e = this, t = [], n = this.subPalette ? this.currentPalette[this.subPalette] : this.currentPalette, r = this.subPalette ? this.subPalette + " - " : "";
                return Object.keys(n).forEach(function(o) {
                    var a = n[o];
                    t.push({
                        name: r + o,
                        value: "string" == typeof a ? a : e.getDefaultColor(a)
                    });
                }), t;
            },
            currentPalette: function() {
                if (this.palette) {
                    if ("string" == typeof this.palette) {
                        var e = {
                            material: La,
                            "material-full": ja,
                            "material-accent": $a
                        };
                        return console.assert(ir(Object.keys(e), this.palette), "You passed in an unknown palette string. Following palettes are available:" + Object.keys(e)), 
                        e[this.palette];
                    }
                    return this.palette;
                }
                return La;
            },
            wrapperMinHeight: function() {
                var e = Math.ceil(Object.keys(this.currentPalette).length / this.colorsPerRow);
                return this.colorSize * e + this.colorMargin * e * 2 + "px";
            },
            wrapperWidth: function() {
                return this.colorSize * this.colorsPerRow + this.colorMargin * this.colorsPerRow * 2 + "px";
            },
            colorSizePx: function() {
                return this.colorSize + "px";
            }
        },
        data: function() {
            return {
                subPalette: void 0,
                selectedColorName: void 0
            };
        },
        created: function() {
            var e = this;
            this.value && 7 === this.value.length && !this.selectedColorName && Object.keys(this.currentPalette).forEach(function(t) {
                var n = e.currentPalette[t];
                ir("string" == typeof n ? [ n ] : sr(n), e.value) && (e.selectedColorName = t);
            });
        }
    };
    Ct.use(ar), Ct.customElement("md-color-picker", Na);
    var Ia = function e() {
        Ha(this, e);
    };
    return Ia.materialPalette = La, Ia.accentMaterialPalette = $a, Ia.fullMaterialPalette = ja, 
    Ia.colorIsLight = Ma, Ia.colorIsDark = function(e, t) {
        return !Ma(e, t);
    }, Ia;
}();

(function() {
    "use strict";
    angular.module("itaca.components", [ "itaca.components-templates", "ngMaterial", "itaca.services", "itaca.utils", "pascalprecht.translate", "tmh.dynamicLocale" ]);
    angular.module("itaca.components").config([ "$windowProvider", "$translateProvider", "tmhDynamicLocaleProvider", function($windowProvider, $translateProvider, tmhDynamicLocaleProvider) {
        var defaultLocale = ($windowProvider.$get().navigator.language || $windowProvider.$get().navigator.userLanguage).split("-")[0].toLowerCase();
        $translateProvider.useLoader("i18nLoader");
        $translateProvider.preferredLanguage(defaultLocale);
        $translateProvider.useCookieStorage();
        $translateProvider.useMissingTranslationHandlerLog();
        $translateSanitizationProvider.addStrategy("sce", "sceStrategy");
        $translateProvider.useSanitizeValueStrategy("sce");
        tmhDynamicLocaleProvider.localeLocationPattern("/resources/public/js/i18n/angular-locale_{{locale}}.js");
        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.defaultLocale(defaultLocale);
    } ]);
})();

(function() {
    "use strict";
    AmountInputCtrl.$inject = [ "$scope", "REGEXP" ];
    angular.module("itaca.components").component("chAmountInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<?",
            ngMin: "<?",
            ngStep: "<?",
            ngMax: "<?",
            amountType: "@",
            amountCurrency: "@",
            inputName: "@",
            label: "@",
            labelNoFloat: "<?",
            inputContainerClass: "@",
            ngRequired: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            allowNegative: "<?",
            errorMessages: "<?"
        },
        controller: AmountInputCtrl,
        templateUrl: "/tpls/amount-input/amount-input.tpl"
    });
    function AmountInputCtrl($scope, REGEXP) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
            ctrl.inputName = ctrl.inputName || "amount";
            ctrl.allowNegative = _.isBoolean(ctrl.allowNegative) ? ctrl.allowNegative : false;
            ctrl.ngMin = ctrl.ngMin < 0 && !ctrl.allowNegative ? 0 : ctrl.ngMin;
            ctrl.ngStep = _.isFinite(ctrl.ngStep) ? ctrl.ngStep : .01;
        };
        this.$update = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
        };
    }
})();

(function() {
    "use strict";
    ArrayInputCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayInput", {
        transclude: true,
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            ngRequired: "<?",
            options: "<?",
            hideSelectedIcon: "<?"
        },
        controller: ArrayInputCtrl,
        template: '<div class="layout-row layout-wrap" ng-transclude></div>'
    });
    function ArrayInputCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
            if (ctrl.ngRequired) {
                $scope.$watchCollection(function() {
                    return ctrl.ngModel;
                }, function(newValue, oldValue) {
                    if (ctrl.ngRequired) {
                        ctrl.ngModelCtrl.$setValidity("required", !_.isEmpty(ctrl.ngModel));
                    }
                });
            }
        };
        this.addOption = function(option) {
            ctrl.options.push(option);
        };
        this.$isSelected = function(value) {
            if (!value) {
                return false;
            }
            return _.includes(ctrl.ngModel, value);
        };
        this.toggleOption = function(option) {
            ctrl.ngModel = angular.isArray(ctrl.ngModel) ? ctrl.ngModel : [];
            if (!option.selected) {
                ctrl.ngModel.push(option.value);
            } else {
                _.pull(ctrl.ngModel, option.value);
            }
            option.selected = !option.selected;
        };
    }
})();

(function() {
    "use strict";
    ArrayOptionCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayOption", {
        transclude: true,
        require: {
            chArrayInputCtrl: "^chArrayInput"
        },
        bindings: {
            ngValue: "<",
            ngSelected: "<",
            buttonClass: "@",
            iconClass: "@",
            selectedIconClass: "@",
            label: "@",
            labelClass: "@",
            selectedClass: "@"
        },
        controller: ArrayOptionCtrl,
        template: '<md-button class="{{$ctrl.buttonClass}}" ng-class="$ctrl.$$option.selected ? $ctrl.selectedClass : \'\'" ' + 'ng-click="$ctrl.$toggle()" aria-label="Toggle option">' + '<div layout layout-padding-sm layout-align="center center">' + '<div ng-if="!$ctrl.$$hideSelectedIcon" class="no-padding">' + '<md-icon ng-if="$ctrl.iconClass" ng-show="!$ctrl.$$option.selected || !$ctrl.selectedIconClass" ' + 'class="material-icons {{$ctrl.iconClass}}"></md-icon>' + '<md-icon ng-if="$ctrl.selectedIconClass" ng-show="$ctrl.$$option.selected" ' + 'class="material-icons {{$ctrl.selectedIconClass}}"></md-icon>' + "</div>" + "<div>" + '<span ng-if="$ctrl.label" class="{{$ctrl.labelClass}}" ng-bind-html="$ctrl.label"></span>' + "<div ng-transclude></div>" + "</div>" + "</div>" + "</md-button>"
    });
    function ArrayOptionCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
            ctrl.selectedIconClass = ctrl.selectedIconClass || !ctrl.iconClass ? "mdi mdi-check md-24" : "";
            ctrl.selectedClass = ctrl.selectedClass || "md-primary";
            ctrl.$$hideSelectedIcon = ctrl.chArrayInputCtrl.hideSelectedIcon;
            ctrl.$$option = {
                value: ctrl.ngValue
            };
            ctrl.$manageSelected();
        };
        this.$postLink = function() {
            ctrl.chArrayInputCtrl.addOption(ctrl.$$option);
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngSelected && !changesObj.ngSelected.isFirstChange()) {
                ctrl.$manageSelected();
            }
        };
        this.$manageSelected = function() {
            ctrl.$$option.selected = !angular.isUndefined(ctrl.ngSelected) ? ctrl.ngSelected : ctrl.chArrayInputCtrl.$isSelected(ctrl.ngValue);
        };
        this.$toggle = function() {
            ctrl.chArrayInputCtrl.toggleOption(ctrl.$$option);
        };
    }
})();

(function() {
    "use strict";
    BookingFormCtrl.$inject = [ "$scope", "$mdMedia", "$timeout", "DateUtils", "ReservationUtils" ];
    angular.module("itaca.components").component("chBookingForm", {
        bindings: {
            reservation: "<",
            requestPeople: "<",
            minDate: "<?",
            maxRange: "<?",
            step: "<?",
            currentCurrency: "<?",
            hotelCurrency: "<?",
            roomVatRate: "<?",
            hotelCityTax: "<?",
            onDateChanged: "&?",
            onSearch: "&?",
            onNext: "&?"
        },
        controller: BookingFormCtrl,
        templateUrl: "/tpls/booking-form/booking-form.tpl"
    });
    function BookingFormCtrl($scope, $mdMedia, $timeout, DateUtils, ReservationUtils) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.minDate = _.isDate(ctrl.minDate) ? ctrl.minDate : _.isBoolean(ctrl.minDate) && ctrl.minDate ? DateUtils.absoluteDate() : null;
            ctrl.reservation = ctrl.reservation || {};
            ctrl.step = !_.isNil(ctrl.step) ? parseInt(ctrl.step) : 0;
            ctrl.currentCurrency = ctrl.currentCurrency || "EUR";
            ctrl.hotelCurrency = ctrl.hotelCurrency || "EUR";
            ctrl.$initWatchers();
        };
        this.$next = function() {
            ctrl.onNext && ctrl.onNext();
        };
        this.$checkMinEndDate = function() {
            if (!ctrl.reservation.checkin) return;
            var start = DateUtils.absoluteMoment(ctrl.reservation.checkin);
            var minEnd = DateUtils.absoluteMoment(start).add(1, "days");
            ctrl.$$minEndDate = minEnd.toDate();
            var maxEnd = DateUtils.absoluteMoment(start).add(ctrl.maxRange, "days");
            ctrl.$$maxEndDate = maxEnd.toDate();
            if (!ctrl.reservation.checkout || DateUtils.absoluteMoment(ctrl.reservation.checkout).isBefore(minEnd, "day")) {
                ctrl.reservation.checkout = angular.copy(ctrl.$$minEndDate);
            } else if (ctrl.reservation.checkout && DateUtils.absoluteMoment(ctrl.reservation.checkout).isAfter(maxEnd, "day")) {
                ctrl.reservation.checkout = angular.copy(ctrl.$$maxEndDate);
            }
        };
        this.$calculateNights = function() {
            ctrl.reservation.nights = DateUtils.absoluteMoment(ctrl.reservation.checkout).diff(DateUtils.absoluteMoment(ctrl.reservation.checkin), "days");
        };
        this.$search = function() {
            ctrl.onSearch && ctrl.onSearch({
                checkin: ctrl.reservation.checkin,
                checkout: ctrl.reservation.checkout,
                nights: ctrl.reservation.nights,
                people: ctrl.reservation.people
            });
        };
        this.$countRemainingPeople = function() {
            var currentPeople = ReservationUtils.normalizePeople(ctrl.reservation.people);
            var requestPeople = ctrl.requestPeople || angular.copy(ctrl.reservation.requestPeople || ctrl.reservation.people);
            if (!requestPeople) {
                requestPeople = {};
            }
            requestPeople = ReservationUtils.normalizePeople(requestPeople);
            var remainingPeople = {
                adults: requestPeople.adults ? requestPeople.adults - currentPeople.adults : 0,
                boys: requestPeople.boys ? requestPeople.boys - currentPeople.boys : 0,
                children: requestPeople.children ? requestPeople.children - currentPeople.children : 0,
                kids: requestPeople.kids ? requestPeople.kids - currentPeople.kids : 0
            };
            ctrl.$$requestPeople = requestPeople;
            ctrl.$$remainingPeople = remainingPeople;
            ctrl.reservation.requestPeople = requestPeople;
            ctrl.reservation.remainingPeople = remainingPeople;
            return remainingPeople;
        };
        this.$initWatchers = function() {
            ctrl.$initDateWatch();
            $scope.$watch(function() {
                return ctrl.reservation.step;
            }, function(newVal, oldVal) {
                if (newVal > 1) {
                    ctrl.$$dateWatch && ctrl.$$dateWatch();
                    ctrl.$$dateWatch = null;
                } else {
                    ctrl.$initDateWatch();
                }
            });
            $scope.$watchCollection(function() {
                return ctrl.reservation.people;
            }, function(newVal, oldVal) {
                if (ctrl.step == 1) {
                    ctrl.requestPeople = angular.copy(ctrl.reservation.people);
                    ctrl.reservation.requestPeople = ctrl.requestPeople;
                }
                ctrl.$countRemainingPeople();
                ctrl.reservation.guestsCount = ReservationUtils.guestsCount(ctrl.reservation.people);
            });
        };
        this.$initDateWatch = function() {
            if (!ctrl.$$dateWatch) {
                ctrl.$$dateWatch = $scope.$watchGroup([ function() {
                    return ctrl.reservation.checkin;
                }, function() {
                    return ctrl.reservation.checkout;
                } ], function(newValues, oldValues) {
                    ctrl.$checkMinEndDate();
                    ctrl.$calculateNights();
                    if (!DateUtils.absoluteMoment(newValues[0]).isSame(DateUtils.absoluteMoment(oldValues[0]), "day") || !DateUtils.absoluteMoment(newValues[1]).isSame(DateUtils.absoluteMoment(oldValues[1]), "day")) {
                        ctrl.onDateChanged && ctrl.onDateChanged({
                            checkin: ctrl.reservation.checkin,
                            checkout: ctrl.reservation.checkout,
                            nights: ctrl.reservation.nights,
                            people: ctrl.reservation.people
                        });
                    }
                });
            }
        };
    }
})();

(function() {
    "use strict";
    CancellationBarCtrl.$inject = [ "$scope", "$element", "$log", "NumberUtils", "DateUtils" ];
    angular.module("itaca.components").component("chCancellationBar", {
        bindings: {
            creationDate: "<",
            checkinDate: "<",
            limitDate: "<?",
            feeAmount: "<?",
            offsetSeconds: "<?",
            startLabel: "@",
            endLabel: "@",
            penaltyCancelLabel: "@",
            freeCancelLabel: "@",
            limitCancelLabel: "@"
        },
        controller: CancellationBarCtrl,
        template: '<div class="ch-cancellation-bar-container">' + '<div class="summary-label">' + '<strong ng-if="!$ctrl.$$inPenalty" class="text-success">' + '<span ng-if="$ctrl.finalLimitDate">' + "<span>{{$ctrl.limitCancelLabel}}</span>&nbsp;" + '<span ng-if="$ctrl.daysToLimit">{{$ctrl.daysToLimit|amDurationFormat : "days"}}</span>&nbsp;' + '<span ng-if="!$ctrl.daysToLimit" class="text-lowercase" translate="date.today"></span>' + '<span class="text-gray-light text-normal">&nbsp;({{$ctrl.finalLimitDate|offsetDate:"shortDate":$ctrl.offsetSeconds}}&nbsp;<span class="text-lowercase" translate="date.time.to"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortTime":$ctrl.offsetSeconds}})</span>' + "</span>" + '<span ng-if="!$ctrl.finalLimitDate">' + "<span>{{$ctrl.freeCancelLabel}}</span>" + "</span>" + "</strong>" + '<strong ng-if="$ctrl.$$inPenalty" class="text-danger">{{$ctrl.penaltyCancelLabel}}</span></strong>' + "</div>" + "<div layout layout-padding-sm>" + '<div layout="column" layout-align="center center" class="no-padding-top no-padding-bottom cursor-help">' + '<md-icon class="mdi mdi-book-plus md-18"></md-icon>' + '<small class="text-gray-light">{{$ctrl.$$startDate|utcDate:"dd/MM"}}</small>' + '<md-tooltip><span ng-if="!$ctrl.startLabel" translate="reservation.insert.date"></span><span ng-if="$ctrl.startLabel">{{$ctrl.startLabel}}</span></md-tooltip>' + "</div>" + '<div flex class="progress-bar">' + '<span ng-if="$ctrl.finalLimitDate" class="limit-label cursor-help" style="left:{{$ctrl.$$limitRate}}%">' + '<span>{{$ctrl.finalLimitDate|offsetDate:"d MMMM":$ctrl.offsetSeconds}}</span>' + '<md-tooltip>{{$ctrl.limitCancelLabel}}&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortDate":$ctrl.offsetSeconds}}&nbsp;<span class="text-lowercase" translate="date.time.to"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortTime":$ctrl.offsetSeconds}}</md-tooltip>' + "</span>" + '<span ng-if="!$$hideToday" class="today-label cursor-help" style="left:{{$ctrl.$$todayPosition}}%">' + '<span translate="date.today"></span>' + '<md-tooltip><span translate="date.today"></span>&nbsp;{{$ctrl.$$now|date:"short"}}</md-tooltip>' + "</span>" + '<div class="bar bg-success" style="width:{{$ctrl.$$limitRate}}%;"></div>' + '<div class="bar bg-danger" style="left:{{$ctrl.$$limitRate}}%; width:{{100 - $ctrl.$$limitRate}}%;"></div>' + "</div>" + '<div layout="column" layout-align="center center" class="no-padding-top no-padding-bottom cursor-help">' + '<md-icon class="mdi mdi-debug-step-into md-18"></md-icon>' + '<small class="text-gray-light">{{$ctrl.$$endDate|utcDate:"dd/MM"}}</small>' + '<md-tooltip><span ng-if="!$ctrl.endLabel" translate="date.checkin"></span><span ng-if="$ctrl.endLabel">{{$ctrl.endLabel}}</span></md-tooltip>' + "</div>" + "</div>" + "</div>"
    });
    function CancellationBarCtrl($scope, $element, $log, NumberUtils, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.creationDate) {
                throw new Error("chCancellationBar: creationDate cannot be null");
            }
            if (!ctrl.checkinDate) {
                throw new Error("chCancellationBar: checkinDate cannot be null");
            }
            ctrl.$$startDate = moment(ctrl.creationDate).toDate();
            ctrl.$$endDate = DateUtils.absoluteDate(ctrl.checkinDate);
            ctrl.$$freeCancelDate = moment(ctrl.limitDate || ctrl.$$endDate).toDate();
            var startMoment = moment(ctrl.$$startDate);
            var endMoment = moment(ctrl.$$endDate);
            var limitMoment = ctrl.$$freeCancelDate ? moment(ctrl.$$freeCancelDate) : null;
            ctrl.$$inPenalty = false;
            if (limitMoment && limitMoment.isAfter(endMoment, "days")) {
                ctrl.$$endDate = limitMoment.toDate();
                endMoment = moment(ctrl.$$endDate);
            }
            if (startMoment.isAfter(endMoment, "days")) {
                $log.warn("chCancellationBar: creationDate is after checkinDate. Will be adjusted to checkinDate.");
                ctrl.$$startDate = endMoment.toDate();
                startMoment = moment(ctrl.$$startDate);
                ctrl.$$inPenalty = true;
            }
            if (limitMoment && limitMoment.isSame(endMoment, "days")) {
                ctrl.$$endDate = limitMoment.toDate();
                endMoment = moment(ctrl.$$endDate);
            }
            var $$nowMoment = moment();
            if ($$nowMoment.isAfter(endMoment, "days")) {
                ctrl.$$hideToday = true;
            } else {
                ctrl.$$now = $$nowMoment.toDate();
            }
            endMoment.endOf("day");
            var totalDays = endMoment.diff(startMoment, "days") || 1;
            var daysToCheckin = moment.duration(endMoment.diff($$nowMoment)).asDays();
            ctrl.$$todayPosition = NumberUtils.fixedDecimals(100 - daysToCheckin / totalDays * 100);
            ctrl.$$todayPosition = ctrl.$$todayPosition > 100 ? 100 : ctrl.$$todayPosition < 0 ? 0 : ctrl.$$todayPosition;
            if (!ctrl.limitDate) {
                ctrl.$$inPenalty = !_.isNil(ctrl.feeAmount) && ctrl.feeAmount > 0;
                if (ctrl.$$inPenalty) {
                    ctrl.$$limitRate = 0;
                    ctrl.finalLimitDate = startMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds / 60 : 0).toDate();
                } else {
                    ctrl.$$limitRate = 100;
                }
            } else {
                ctrl.finalLimitDate = limitMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds / 60 : 0).toDate();
                ctrl.daysToLimit = moment.duration(moment(ctrl.finalLimitDate).diff($$nowMoment)).asDays();
                var penaltyDays = moment.duration(endMoment.diff(moment(ctrl.finalLimitDate))).asDays();
                ctrl.$$limitRate = penaltyDays >= 0 ? NumberUtils.fixedDecimals(100 - penaltyDays * 100 / totalDays) : 0;
                ctrl.$$limitRate = ctrl.$$limitRate > 100 ? 100 : ctrl.$$limitRate < 0 ? 0 : ctrl.$$limitRate;
                ctrl.$$inPenalty = ctrl.daysToLimit <= 0;
            }
            var limitLabelEl = angular.element($element[0].querySelector(".limit-label"));
            if (ctrl.$$limitRate == 100) {
                limitLabelEl.addClass("limit-label-full");
                limitLabelEl.removeClass("limit-label-empty");
            } else if (ctrl.$$limitRate == 0) {
                limitLabelEl.addClass("limit-label-empty");
                limitLabelEl.removeClass("limit-label-full");
            }
        };
    }
})();

(function() {
    "use strict";
    CancellationPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chCancellationPolicyInfo", {
        bindings: {
            rateType: "<",
            cancellationPolicy: "<",
            city: "@",
            offset: "@",
            title: "@",
            titleClass: "@"
        },
        controller: CancellationPolicyCtrl,
        templateUrl: "/tpls/cancellation-policy-info/cancellation-policy-info.tpl"
    });
    function CancellationPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    CardCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chCard", {
        transclude: true,
        bindings: {
            bgUrl: "@",
            bgClass: "@",
            imgUrl: "@",
            imgClass: "@",
            imgContClass: "@",
            showAvatar: "<?",
            iconClass: "@",
            iconFontSet: "@",
            iconLabel: "@",
            iconLabelClass: "@",
            iconLabelPosition: "@",
            iconSecondaryLabel: "@",
            iconSecondaryLabelClass: "@",
            iconSecondaryLabelPosition: "@",
            otherIconClass: "@",
            otherIconFontSet: "@",
            title: "@",
            titleClass: "@",
            subtitle: "@",
            colorClass: "@",
            ngDisabled: "<?",
            disabledLabel: "@",
            disabledClass: "@",
            disabledBarClass: "@",
            url: "@",
            state: "@",
            stateParams: "<?",
            onClick: "&?",
            menuItems: "<?",
            disabledMenuItems: "<?",
            menuClass: "@",
            noHover: "<?",
            isRequired: "<?",
            isCompleted: "<?",
            isSuggested: "<?"
        },
        controller: CardCtrl,
        templateUrl: "/tpls/card/card.tpl"
    });
    function CardCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$bgStyle = ctrl.bgUrl ? {
                background: "url('" + ctrl.bgUrl + "') center center no-repeat",
                "background-size": "cover"
            } : null;
            ctrl.colorClass = ctrl.colorClass || "layout-column layout-align-center-center bg-gray-lighter md-padding";
            ctrl.titleClass = ctrl.titleClass || "md-subhead text-bold";
            ctrl.iconLabelPosition = _.includes([ "left", "right", "top", "bottom" ], ctrl.iconLabelPosition) ? ctrl.iconLabelPosition : "left";
            ctrl.menuItems = ctrl.menuItems && angular.isArray(ctrl.menuItems) ? ctrl.menuItems : null;
            ctrl.menuClass = ctrl.menuClass || null;
            ctrl.showAvatar = _.isBoolean(ctrl.showAvatar) ? ctrl.showAvatar : false;
            ctrl.isRequired = _.isBoolean(ctrl.isRequired) ? ctrl.isRequired : false;
            ctrl.isSuggested = _.isBoolean(ctrl.isSuggested) ? ctrl.isSuggested : false;
            ctrl.isCompleted = _.isBoolean(ctrl.isCompleted) ? ctrl.isCompleted : false;
        };
        this.$goTo = function() {
            if (ctrl.ngDisabled) {
                return;
            }
            if (angular.isFunction(ctrl.onClick)) {
                ctrl.onClick();
                return;
            }
            if (!_.isNil(ctrl.state)) {
                Navigator.goToState(ctrl.state, ctrl.stateParams);
            } else {
                if (!_.isNil(ctrl.url)) {
                    Navigator.go(ctrl.url);
                }
            }
        };
        this.$menuClick = function(ev, menu) {
            if (!_.isNil(menu.fn) && angular.isFunction(menu.fn)) {
                menu.fn.apply(this, _.concat([ ev ], menu.fnParams));
            } else {
                if (!_.isNil(menu.state)) {
                    Navigator.goToState(menu.state, menu.stateParams);
                } else {
                    if (!_.isNil(menu.url)) {
                        location.href = menu.url;
                    }
                }
            }
        };
    }
})();

(function() {
    "use strict";
    ClockCtrl.$inject = [ "$scope", "$element", "$attrs", "DateUtils", "$interval" ];
    angular.module("itaca.components").component("chClock", {
        bindings: {
            offsetSeconds: "<",
            showDate: "<",
            showTime: "<",
            dateFormat: "@",
            timeFormat: "@"
        },
        controller: ClockCtrl,
        template: "<div>" + "<div ng-if='$ctrl.showDate'><small>{{$ctrl.$$date|date:$ctrl.dateFormat:$ctrl.$$timezone}}</small></div>" + "<div ng-if='$ctrl.showTime'><strong>{{$ctrl.$$date|date:$ctrl.timeFormat:$ctrl.$$timezone}}</strong></div>" + "</div>"
    });
    function ClockCtrl($scope, $element, $attrs, DateUtils, $interval) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$timezone = DateUtils.secondsToOffsetString(ctrl.offsetSeconds);
            ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : true;
            ctrl.showTime = _.isBoolean(ctrl.showTime) ? ctrl.showTime : true;
            ctrl.dateFormat = ctrl.dateFormat || "mediumDate";
            ctrl.timeFormat = ctrl.timeFormat || "shortTime";
            ctrl.$$stop = $interval(function() {
                ctrl.$updateDate();
            }, 1e3);
        };
        this.$onDestroy = function() {
            $interval.cancel(ctrl.$$stop);
        };
        this.$updateDate = function() {
            ctrl.$$date = new Date();
        };
    }
})();

(function() {
    "use strict";
    ColorPickerButtonCtrl.$inject = [ "$scope", "$element", "$mdMedia", "$mdPanel" ];
    ColorPickerPanelCtrl.$inject = [ "$scope", "mdPanelRef" ];
    angular.module("itaca.components").component("chColorPickerButton", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<",
            label: "@",
            palette: "@",
            defaultTint: "@",
            colorsPerRow: "@",
            colorSize: "@",
            colorMargin: "@",
            hideSubPalette: "<?",
            flexible: "<?",
            disableParentScroll: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            ngReadonly: "<?",
            ngDisabled: "<?",
            showCode: "<?"
        },
        controller: ColorPickerButtonCtrl,
        templateUrl: "/tpls/color-picker/color-picker-button.tpl"
    });
    function ColorPickerButtonCtrl($scope, $element, $mdMedia, $mdPanel) {
        var ctrl = this;
        this.$postLink = function() {
            var targetEl = $element[0].querySelector(".ch-color-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: ColorPickerPanelCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/color-picker/color-picker-panel.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: !$mdMedia("gt-xs") || ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                panelClass: "md-whiteframe-15dp bg-gray-lighter",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    targetEl.focus();
                    var hasConfirm = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
                    (!hasConfirm || _.isBoolean(closeReason) && closeReason) && ctrl.$update();
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
                }
            };
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.ngModel) {
                ctrl.$$btnStyle = {
                    "background-color": ctrl.ngModel
                };
            }
        };
        this.$$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPicker = function(ev) {
            if (ctrl.ngReadonly) {
                return;
            }
            ctrl.$$data = {
                color: angular.copy(ctrl.ngModel)
            };
            var locals = {
                $$data: ctrl.$$data,
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false,
                palette: ctrl.palette,
                defaultTint: ctrl.defaultTint,
                colorsPerRow: ctrl.colorsPerRow,
                colorSize: ctrl.colorSize,
                colorMargin: ctrl.colorMargin,
                hideSubPalette: ctrl.hideSubPalette,
                flexible: ctrl.flexible,
                showCode: ctrl.showCode
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.disableParentScroll = !$mdMedia("gt-xs") || ctrl.disableParentScroll;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$update = function() {
            ctrl.$$btnStyle = {
                "background-color": ctrl.$$data.color
            };
            ctrl.ngModelCtrl.$setViewValue(ctrl.$$data.color);
        };
    }
    function ColorPickerPanelCtrl($scope, mdPanelRef) {
        var ctrl = this;
        this.init = function() {
            ctrl.hasConfirm = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
        };
        this.onChange = function(ev) {};
        this.confirm = function() {
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    ColorPickerCtrl.$inject = [ "$scope", "$element" ];
    angular.module("itaca.components").component("chColorPickerInline", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<",
            palette: "@",
            defaultTint: "@",
            colorsPerRow: "@",
            colorSize: "@",
            colorMargin: "@",
            hideSubPalette: "<?",
            flexible: "<?",
            showCode: "<?"
        },
        controller: ColorPickerCtrl,
        templateUrl: "/tpls/color-picker/color-picker-inline.tpl"
    });
    function ColorPickerCtrl($scope, $element) {
        var ctrl = this;
        this.$postLink = function() {
            ctrl.$$picker = $element[0].querySelector(".ch-color-picker-inline");
            ctrl.$$picker.addEventListener("change", ctrl.$colorChanged);
            ctrl.$$picker.value = ctrl.ngModel;
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.hideSubPalette) {
                ctrl.hideSubPalette = _.isBoolean(ctrl.hideSubPalette) ? ctrl.hideSubPalette : false;
            }
            if (changesObj.flexible) {
                ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : false;
            }
            if (changesObj.palette) {
                ctrl.palette = _.includes([ "material", "material-full", "material-accent" ], ctrl.palette) ? ctrl.palette : "material-full";
            }
            if (changesObj.ngModel) {
                ctrl.$$picker && (ctrl.$$picker.value = ctrl.ngModel);
            }
        };
        this.$onDestroy = function() {
            ctrl.$$picker.removeEventListener("change", ctrl.$colorChanged);
        };
        this.$colorChanged = function(event) {
            var color = event.detail[0];
            ctrl.$$picker.value = color;
            ctrl.$update(color);
        };
        this.$update = function(color) {
            ctrl.ngModelCtrl.$setViewValue(color);
        };
    }
})();

(function() {
    "use strict";
    ColorPickerCtrl.$inject = [ "$scope", "$element" ];
    angular.module("itaca.components").component("chColorPicker", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<",
            label: "@",
            palette: "@",
            defaultTint: "@",
            colorsPerRow: "@",
            colorSize: "@",
            colorMargin: "@",
            hideSubPalette: "<?",
            flexible: "<?",
            disableParentScroll: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            ngReadonly: "<?",
            ngDisabled: "<?",
            inline: "<?",
            showCode: "<?"
        },
        controller: ColorPickerCtrl,
        templateUrl: "/tpls/color-picker/color-picker.tpl"
    });
    function ColorPickerCtrl($scope, $element) {
        var ctrl = this;
        this.$update = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
        };
    }
})();

(function() {
    "use strict";
    ConnectionCheckCtrl.$inject = [ "$scope", "$mdDialog", "$window" ];
    angular.module("itaca.components").component("chConnectionCheck", {
        bindings: {},
        controller: ConnectionCheckCtrl,
        template: "<span></span>"
    });
    function ConnectionCheckCtrl($scope, $mdDialog, $window) {
        var ctrl = this;
        this.$onInit = function() {
            $window.addEventListener("offline", ctrl.$showDialog);
        };
        this.$showDialog = function() {
            ConnectionCheckDialogCtrl.$inject = [ "$mdDialog", "$window" ];
            $mdDialog.show({
                controller: ConnectionCheckDialogCtrl,
                escapeToClose: false,
                template: '<md-dialog flex="70" aria-label="offline dialog">' + '<md-dialog-content class="md-padding text-center">' + "<div>" + '<md-icon class="mdi mdi-close-network md-160"></md-icon>' + "</div>" + '<h1 class="md-display-1 no-margin"><span translate="alerts.offline.title"></span></h1>' + '<h4 class="md-subhead no-margin-top"><span translate="alerts.offline.text"></span></h4>' + "</md-dialog-content>" + "</md-dialog>"
            });
            function ConnectionCheckDialogCtrl($mdDialog, $window) {
                var hideFunc = function() {
                    $mdDialog.hide();
                };
                this.$onInit = function() {
                    $window.addEventListener("online", hideFunc);
                };
                this.$onDestroy = function() {
                    $window.removeEventListener("online", hideFunc);
                };
            }
        };
        this.$onDestroy = function() {
            $window.removeEventListener("offline", ctrl.$showDialog);
        };
    }
})();

(function() {
    "use strict";
    CounterCtrl.$inject = [ "$scope", "$element", "$attrs" ];
    angular.module("itaca.components").component("chCounter", {
        transclude: true,
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            flexible: "<?",
            wrapperClass: "@",
            btnClass: "@",
            btnActiveClass: "@",
            iconClass: "@",
            iconActiveClass: "@",
            label: "@",
            labelClass: "@",
            labelDirection: "@",
            count: "=ngModel",
            countClass: "@",
            fieldName: "@",
            min: "<?",
            max: "<?",
            step: "<?",
            ngDisabled: "<?",
            minusDisabled: "<?",
            plusDisabled: "<?",
            onMinus: "&?",
            onPlus: "&?"
        },
        controller: CounterCtrl,
        templateUrl: "/tpls/counter/counter.tpl"
    });
    function CounterCtrl($scope, $element, $attrs) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.btnClass = ctrl.btnClass || "md-fab md-mini";
            ctrl.btnActiveClass = ctrl.btnActiveClass || "md-primary";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light text-small";
            ctrl.count = angular.isNumber(ctrl.count) ? ctrl.count : 0;
            ctrl.step = angular.isNumber(ctrl.step) ? ctrl.step : 1;
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.flexible) {
                ctrl.$manageFlexible();
            }
            if (changesObj.labelDirection) {
                ctrl.$manageLabelDirection();
            }
            if (changesObj.min || changesObj.count) {
                ctrl.$manageMin();
            }
            if (changesObj.max || changesObj.count) {
                ctrl.$manageMax();
            }
        };
        this.$manageFlexible = function() {
            ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : $attrs.hasOwnProperty("flexible") && (ctrl.flexible === undefined || _.isEmpty(ctrl.flexible) || ctrl.flexible);
            if (ctrl.flexible) {
                $element.addClass("flex");
            }
        };
        this.$manageLabelDirection = function() {
            ctrl.labelDirection = _.includes([ "top", "right", "bottom", "left" ], ctrl.labelDirection) ? ctrl.labelDirection : "top";
            ctrl.labelContClass = _.includes([ "right", "left" ], ctrl.labelDirection) ? "layout-row" : "layout-column";
        };
        this.$manageMin = function() {
            ctrl.min = angular.isNumber(ctrl.min) && (angular.isNumber(ctrl.max) && ctrl.min > ctrl.max) ? ctrl.max - ctrl.step : ctrl.min;
            if (angular.isNumber(ctrl.min) && ctrl.count < ctrl.min) {
                ctrl.count = ctrl.min;
            }
        };
        this.$manageMax = function() {
            ctrl.max = angular.isNumber(ctrl.max) && (angular.isNumber(ctrl.min) && ctrl.max < ctrl.min) ? ctrl.min + ctrl.step : ctrl.max;
            if (angular.isNumber(ctrl.max) && ctrl.count > ctrl.max) {
                ctrl.count = ctrl.max;
            }
        };
        this.$decrease = function(ev) {
            if (angular.isNumber(ctrl.min) && ctrl.count <= ctrl.min) {
                return false;
            }
            ctrl.count = (ctrl.count || 0) - ctrl.step;
            ctrl.$updateModel();
            ctrl.onMinus && ctrl.onMinus({
                $event: ev,
                $count: ctrl.count
            });
        };
        this.$increase = function(ev) {
            if (angular.isNumber(ctrl.max) && ctrl.count >= ctrl.max) {
                return false;
            }
            ctrl.count = (ctrl.count || 0) + ctrl.step;
            ctrl.$updateModel();
            ctrl.onPlus && ctrl.onPlus({
                $event: ev,
                $count: ctrl.count
            });
        };
        this.$updateModel = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.count);
        };
    }
})();

(function() {
    "use strict";
    DateCounterCtrl.$inject = [ "scope", "ReservationUtils", "$translate" ];
    angular.module("itaca.components").component("chDateLeft", {
        bindings: {
            start: "<?",
            end: "<?"
        },
        controller: DateCounterCtrl,
        template: "<span>{{$ctrl.$$dateLeft}}</span>"
    });
    function DateCounterCtrl(scope, ReservationUtils, $translate) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$calculateDiff = function() {
            var start = ctrl.start ? moment(ctrl.start) : moment();
            var end = ctrl.start ? moment(ctrl.end) : moment();
            ctrl.$$dateLeft = start.to(end);
        };
        this.$initWatchers = function() {
            $scope.$watchGroup([ function() {
                return ctrl.start;
            }, function() {
                return ctrl.end;
            } ], ctrl.$calculateDiff);
        };
    }
})();

(function() {
    "use strict";
    DatePickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    DatePickerCtrl.$inject = [ "$scope", "mdPanelRef", "DateUtils", "$timeout" ];
    angular.module("itaca.components").component("chDatePicker", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
            hideLabel: "<?",
            labelPosition: "@",
            ngModel: "=",
            minDate: "<?",
            maxDate: "<?",
            errorMessages: "<?",
            useUtc: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            onClose: "&?",
            ngRequired: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            size: "@"
        },
        controller: DatePickerTriggerCtrl,
        templateUrl: "/tpls/date-picker/date-picker-trigger.tpl"
    });
    function DatePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.labelPosition = _.includes([ "top", "left" ], ctrl.labelPosition) ? ctrl.labelPosition : "top";
            ctrl.hideLabel = _.isBoolean(ctrl.hideLabel) ? ctrl.hideLabel : false;
            ctrl.size = _.includes([ "small", "medium", "big" ], ctrl.size) ? ctrl.size : "big";
            ctrl.buttonClass = ctrl.buttonClass || "no-margin";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            var targetEl = $element[0].querySelector(".ch-date-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: DatePickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/date-picker/date-picker.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    $scope.chDatePickerTriggerForm.date.$setTouched();
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                        ctrl.onClose && ctrl.onClose(ctrl.$$data);
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
                }
            };
        };
        this.$$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            if (ctrl.ngReadonly) {
                return;
            }
            ctrl.$$data = {
                current: ctrl.ngModel,
                min: ctrl.minDate,
                max: ctrl.maxDate
            };
            var locals = {
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
                useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-xs");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            $scope.chDatePickerTriggerForm.date.$setDirty();
            ctrl.ngModel = ctrl.$getDate(ctrl.$$data.current);
            ctrl.minDate = ctrl.$getDate(ctrl.$$data.min);
            ctrl.maxDate = ctrl.$getDate(ctrl.$$data.max);
        };
        this.$getDate = function(date) {
            var m = ctrl.$getMoment(date);
            return m ? m.toDate() : null;
        };
        this.$getMoment = function(date) {
            if (!date) {
                return null;
            }
            if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
    }
    function DatePickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
        var _self = this;
        this.init = function() {
            _self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
            _self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {
                timezone: "UTC"
            } : {};
        };
        $scope.$on("md-calendar-change", function(event, date) {
            if (!_self.hasConfirm) {
                _self.confirm();
            }
        });
        this.$$getMoment = function(date) {
            if (_self.useUtc) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        $scope.$watch(function() {
            return _self.data.current;
        }, function(newValue, oldValue) {
            $scope.currentDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
        });
        this.confirm = function() {
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    DateRangePickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    DateRangePickerCtrl.$inject = [ "$scope", "mdPanelRef", "DateUtils", "$timeout" ];
    angular.module("itaca.components").component("chDateRangePicker", {
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            placeholder: "@",
            label: "@",
            labelClass: "@",
            startLabel: "@",
            startHintLabel: "@",
            startInputName: "@",
            start: "=",
            startMinDate: "<?",
            startMaxDate: "<?",
            startErrorMessages: "<?",
            endLabel: "@",
            endHintLabel: "@",
            endInputName: "@",
            end: "=",
            endMinDate: "<?",
            endMaxDate: "<?",
            endErrorMessages: "<?",
            maxRange: "<?",
            useUtc: "<?",
            showDiff: "<?",
            showDiffInCalendar: "<?",
            diffLabelSingular: "@",
            diffLabelPlural: "@",
            hasBackdrop: "<?",
            largeTemplate: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            onClose: "&?",
            ngRequired: "<?",
            ngDisabled: "<?"
        },
        controller: DateRangePickerTriggerCtrl,
        templateUrl: "/tpls/date-range-picker/date-range-picker-trigger.tpl"
    });
    function DateRangePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.startInputName = ctrl.startInputName || "start";
            ctrl.endInputName = ctrl.endInputName || "end";
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
            ctrl.hasBackdrop = _.isBoolean(ctrl.hasBackdrop) ? ctrl.hasBackdrop : false;
            ctrl.$$timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.showDiff = _.isBoolean(ctrl.showDiff) ? ctrl.showDiff : true;
            ctrl.showDiffInCalendar = _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true;
            ctrl.largeTemplate = ctrl.largeTemplate || false;
            var targetEl = $element[0].querySelector(".ch-date-range-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: DateRangePickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/date-range-picker/date-range-picker.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                        ctrl.onClose && ctrl.onClose({
                            $start: ctrl.$$data.start,
                            $end: ctrl.$$data.end
                        });
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
                }
            };
            ctrl.calculateDiff();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.startErrorMessages) {
                ctrl.startErrorMessages = _.isArray(ctrl.startErrorMessages) ? ctrl.startErrorMessages : [];
                if (!_.some(ctrl.startErrorMessages, [ "error", "required" ])) {
                    ctrl.startErrorMessages.push({
                        error: "required",
                        messageKey: "error.required"
                    });
                }
            }
            if (changesObj.endErrorMessages) {
                ctrl.endErrorMessages = _.isArray(ctrl.endErrorMessages) ? ctrl.endErrorMessages : [];
                if (!_.some(ctrl.endErrorMessages, [ "error", "required" ])) {
                    ctrl.endErrorMessages.push({
                        error: "required",
                        messageKey: "error.required"
                    });
                }
            }
        };
        this.$$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.$$data = {
                start: ctrl.start,
                startMinDate: ctrl.startMinDate,
                startMaxDate: ctrl.startMaxDate,
                end: ctrl.end,
                endMinDate: ctrl.endMinDate,
                endMaxDate: ctrl.endMaxDate,
                maxRange: ctrl.maxRange
            };
            var locals = {
                showDiff: _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true,
                diffLabelSingular: ctrl.$$diffLabelSingular,
                diffLabelPlural: ctrl.$$diffLabelPlural,
                useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
                startTitle: ctrl.startHintLabel,
                endTitle: ctrl.endHintLabel,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-xs");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            ctrl.start = ctrl.$getDate(ctrl.$$data.start);
            ctrl.startMinDate = ctrl.$getDate(ctrl.$$data.startMinDate);
            ctrl.startMaxDate = ctrl.$getDate(ctrl.$$data.startMaxDate);
            ctrl.end = ctrl.$getDate(ctrl.$$data.end);
            ctrl.endMinDate = ctrl.$getDate(ctrl.$$data.endMinDate);
            ctrl.endMaxDate = ctrl.$getDate(ctrl.$$data.endMaxDate);
            ctrl.calculateDiff();
        };
        this.$getDate = function(date) {
            var m = ctrl.$getMoment(date);
            return m ? m.toDate() : null;
        };
        this.$getMoment = function(date) {
            if (!date) {
                return null;
            }
            if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        this.calculateDiff = function() {
            if ((_.isBoolean(ctrl.showDiff) ? ctrl.showDiff : true) && ctrl.end && ctrl.start) {
                ctrl.$$diff = ctrl.$getMoment(ctrl.end).diff(ctrl.$getMoment(ctrl.start), "days");
            } else {
                ctrl.$$diff = null;
            }
        };
    }
    function DateRangePickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
        var _self = this;
        this.currentView = this.currentView || "start";
        this.init = function() {
            _self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
            _self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {
                timezone: "UTC"
            } : {};
            _self.showDiff = _.isBoolean(_self.shshowDiffowDiff) ? _self.showDiff : true;
            if (_self.showDiff) {
                $scope.$watchGroup([ function() {
                    return _self.data.start;
                }, function() {
                    return _self.data.end;
                } ], function(newValues, oldValues) {
                    _self.calculateDiff();
                });
            }
        };
        $scope.$on("md-calendar-change", function(event, date) {
            _self.dateChanged = true;
            if (_self.currentView == "end" && !_self.hasConfirm) {
                _self.confirm();
            }
        });
        this.toggleView = function() {
            _self.dateChanged = false;
            if (_self.currentView == "start") {
                _self.currentView = "end";
            } else {
                _self.currentView = "start";
            }
        };
        this.checkEndDate = function(fixEnd) {
            if (!_self.data.start) return;
            var start = _self.$$getMoment(_self.data.start);
            var end = _self.$$getMoment(_self.data.end);
            var minEnd = _self.$$getMoment(start).add(1, "days");
            var maxEnd = null;
            if (_self.data.maxRange) {
                maxEnd = _self.$$getMoment(start).add(_self.data.maxRange, "days");
            }
            if (!_self.data.end || _self.$$getMoment(_self.data.end).isBefore(minEnd, "day")) {
                fixEnd ? end = minEnd.toDate() : end = null;
            } else if (maxEnd && _self.data.end && _self.$$getMoment(_self.data.end).isAfter(maxEnd, "day")) {
                fixEnd ? end = maxEnd.toDate() : end == null;
            }
            _self.updateEnd(end, minEnd.toDate(), maxEnd && maxEnd.toDate());
        };
        this.updateEnd = function(date, minDate, maxDate) {
            _self.data.end = date ? _self.$$getMoment(date).toDate() : null;
            if (minDate) {
                _self.data.endMinDate = minDate;
            }
            if (maxDate) {
                _self.data.endMaxDate = maxDate;
            }
        };
        this.calculateDiff = function() {
            if (_self.showDiff && _self.data.end && _self.data.start) {
                _self.data.diff = _self.$$getMoment(_self.data.end).diff(_self.$$getMoment(_self.data.start), "days");
            } else {
                _self.data.diff = null;
            }
        };
        this.$$getMoment = function(date) {
            if (_self.useUtc) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        $scope.$watch(function() {
            return _self.data.start;
        }, function(newValue, oldValue) {
            _self.checkEndDate();
            _self.dateChanged && _self.toggleView();
        });
        $scope.$watchGroup([ function() {
            return _self.data.start;
        }, function() {
            return _self.data.end;
        } ], function(newValues, oldValues) {
            _self.$$startDate = _self.data.start ? _self.$$getMoment(_self.data.start).toDate() : null;
            $scope.$$endDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
        });
        this.confirm = function() {
            _self.checkEndDate(true);
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    DownloadButtonCtrl.$inject = [ "$scope", "$element", "$http", "$timeout", "$log", "Dialog" ];
    angular.module("itaca.components").component("chDownloadButton", {
        bindings: {
            url: "<",
            btnClass: "@",
            label: "@",
            labelClass: "@",
            iconClass: "@",
            downloadingLabel: "@",
            downloadingClass: "@",
            downloadReadyLabel: "@",
            downloadLabel: "@",
            maxRetry: "<?",
            retryDelay: "<?",
            onError: "&?"
        },
        controller: DownloadButtonCtrl,
        template: '<span class="no-padding no-margin">' + '<md-button class="{{$ctrl.btnClass}}" ng-click="$ctrl.$download($event)" aria-label="{{$ctrl.label}}" ng-disabled="$ctrl.$$downloading">' + '<span ng-if="!$ctrl.$$downloading" class="layout-row layout-align-center-center">' + '<md-icon ng-show="$ctrl.iconClass" class="material-icons {{$ctrl.iconClass}}"></md-icon>' + '<span style="margin-left: 5px" class="{{$ctrl.labelClass}}">{{$ctrl.label}}</span>' + "</span>" + '<span ng-if="$ctrl.$$downloading" class="layout-row layout-align-center-center">' + '<md-progress-circular class="{{$ctrl.downloadingClass}}" md-mode="indeterminate" md-diameter="20"></md-progress-circular>' + '<span style="margin-left: 5px" class="{{$ctrl.labelClass}}">{{$ctrl.downloadingLabel || $ctrl.label}}</span>' + "</span>" + "</md-button>" + '<a class="ch-download-button-link" download target="_blank"></a>' + "</span>"
    });
    function DownloadButtonCtrl($scope, $element, $http, $timeout, $log, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.btnClass = ctrl.btnClass || "md-raised md-primary";
            ctrl.downloadingClass = ctrl.downloadingClass || "md-accent md-hue-2";
            ctrl.maxRetry = ctrl.maxRetry || 1;
            ctrl.retryDelay = ctrl.retryDelay || 5e3;
        };
        this.$download = function(ev) {
            ctrl.$$attempt = 1;
            ctrl.$doDownload(ev);
        };
        this.$doDownload = function(ev) {
            ctrl.$$downloading = true;
            var finallyFn = function() {
                ctrl.$$attempt++;
            };
            $http.get(ctrl.url).then(function(response) {
                if (!response.data.file) {
                    ctrl.$manageRetry(true);
                } else {
                    if (bowser.ios) {
                        var data = {
                            file: response.data.file,
                            filename: response.data.filename,
                            contentType: response.data.contentType,
                            title: ctrl.downloadReadyLabel,
                            downloadLabel: ctrl.downloadLabel
                        };
                        Dialog.downloadFile(ev, data);
                    } else {
                        var linkEl = ctrl.$getLinkEl();
                        linkEl.href = "data:" + (response.data.contentType || "application/octet-stream") + ";base64," + encodeURI(response.data.file);
                        linkEl.setAttribute("download", response.data.filename);
                        if (document.createEvent) {
                            var eventObj = new MouseEvent("click", {
                                view: window,
                                bubbles: true,
                                cancelable: true
                            });
                            linkEl.dispatchEvent(eventObj);
                        } else {
                            linkEl.fireEvent("click");
                        }
                    }
                    ctrl.$$downloading = false;
                }
            }, function(response) {
                if (response.status == 412 || !ctrl.$manageRetry(response.status == 507)) {
                    $log.error("Error downloading file: " + response.data && response.data.message ? response.data.message : "");
                    ctrl.onError && ctrl.onError({
                        response: response
                    });
                    ctrl.$$downloading = false;
                }
            }).finally(finallyFn, finallyFn);
        };
        this.$manageRetry = function(longWait) {
            if (ctrl.$$attempt < ctrl.maxRetry) {
                $timeout(ctrl.$doDownload, longWait ? ctrl.retryDelay : 1e3);
                return true;
            }
            return false;
        };
        this.$getLinkEl = function() {
            var linkEl = $element[0].querySelector(".ch-download-button-link");
            if (linkEl == null) {
                linkEl = document.createElement("a");
                linkEl.setAttribute("target", "_blank");
                linkEl.className = "ch-download-button-link";
                element[0].appendChild(linkEl);
            }
            return linkEl;
        };
    }
})();

(function() {
    "use strict";
    EasingBgCtrl.$inject = [ "$scope", "$element", "$window", "$timeout" ];
    angular.module("itaca.components").component("chEasingBg", {
        transclude: true,
        bindings: {
            bgClass: "@?",
            easingClass: "@?",
            easingClassLimit: "<",
            opacityLimit: "<",
            chDisabled: "<"
        },
        controller: EasingBgCtrl,
        template: '<div class="ch-easing-bg" ng-style="$ctrl.$$contStyle">' + '<div class="{{$ctrl.bgClass}}" ng-attr-style="{{$ctrl.$$bgStyle}}"></div>' + '<div ng-transclude class="{{$ctrl.$$transClass}}" ng-style="$ctrl.$$transStyle"></div>' + "</div>"
    });
    function EasingBgCtrl($scope, $element, $window, $timeout) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chDisabled = _.isBoolean(ctrl.chDisabled) ? ctrl.chDisabled : false;
            ctrl.bgClass = ctrl.bgClass || "bg-primary";
            ctrl.easingClass = ctrl.easingClass || "text-white";
            ctrl.easingClassLimit = isFinite(parseInt(ctrl.easingClassLimit)) ? parseInt(ctrl.easingClassLimit) : .5;
            ctrl.easingClassLimit = ctrl.easingClassLimit <= 1 ? ctrl.easingClassLimit : 1;
            ctrl.opacityLimit = isFinite(parseInt(ctrl.opacityLimit)) ? parseInt(ctrl.opacityLimit) : 450;
            ctrl.$$contStyle = {
                position: "fixed",
                width: "100%",
                top: "0",
                left: "0",
                "z-index": "25"
            };
            ctrl.$$transStyle = {
                "z-index": "1"
            };
            ctrl.$$baseBgStyle = "position: absolute; z-index: -1; height: 100%; width: 100%; top: 0; left: 0;";
            ctrl.$initWatches();
        };
        this.$postLink = function() {
            ctrl.$manageDisabled();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.chDisabled) {
                ctrl.$manageDisabled();
            }
        };
        this.$manageDisabled = function() {
            ctrl.chDisabled = _.isBoolean(ctrl.chDisabled) ? ctrl.chDisabled : false;
            if (ctrl.chDisabled) {
                ctrl.$disableEasing();
            } else {
                ctrl.$enableEasing();
            }
        };
        this.$enableEasing = function() {
            ctrl.$$transClass = ctrl.easingClass;
            angular.element($window).on("scroll", ctrl.$ease);
        };
        this.$disableEasing = function() {
            angular.element($window).off("scroll", ctrl.$ease);
            ctrl.$$bgStyle = ctrl.$$baseBgStyle + "opacity: 1 !important;";
            ctrl.$$transClass = "";
            $scope.$broadcast("easing-bg", {
                opacity: 1
            });
        };
        this.$ease = function() {
            if (ctrl.chDisabled) {
                ctrl.$disableEasing();
                return;
            }
            $timeout(ctrl.$doEase);
        };
        this.$doEase = function() {
            var windowsOffset = $window.pageYOffset;
            if (document.body) {
                var style = window.getComputedStyle(document.body);
                var top = style.getPropertyValue("top");
                windowsOffset += top ? Math.abs(parseInt(top)) : 0;
            }
            var offset = 0 + windowsOffset / (ctrl.opacityLimit - $element[0].childNodes[0].offsetHeight);
            var alpha = offset >= 1 ? 1 : offset;
            ctrl.$$bgStyle = ctrl.$$baseBgStyle + "opacity: " + alpha + "!important;";
            if (alpha <= ctrl.easingClassLimit) {
                ctrl.$$transClass = ctrl.easingClass;
            } else {
                ctrl.$$transClass = "";
            }
            $scope.$broadcast("easing-bg", {
                opacity: alpha
            });
            $scope.$apply();
        };
        this.$initWatches = function() {
            $scope.$watch(function() {
                return document.body.scrollHeight;
            }, ctrl.$ease);
        };
        this.$onDestroy = function() {
            ctrl.$disableEasing();
        };
    }
})();

(function() {
    "use strict";
    GalleryCtrl.$inject = [ "$scope", "AboutStorage", "Dialog", "NumberUtils" ];
    angular.module("itaca.components").component("chGallery", {
        require: {},
        bindings: {
            gallery: "<?",
            storageUrl: "<?",
            galleryTitle: "@",
            cols: "@",
            rowspan: "@?",
            ratio: "@?",
            maxItems: "<?"
        },
        controller: GalleryCtrl,
        template: '<div ng-if="$ctrl.gallery.length">' + '<md-grid-list md-cols="{{$ctrl.maxCols}}" md-row-height="{{$ctrl.ratio}}" md-gutter="6px" md-gutter-gt-sm="4px">' + '<md-grid-tile class="bg-black-light clickable" ng-repeat="photo in $ctrl.previewGallery track by $index" ng-click="$ctrl.openGallery($event, $index)" aria-lable="open gallery" ' + 'md-colspan="{{$ctrl.tilesConfig[$index].colspan}}" md-rowspan="{{$ctrl.tilesConfig[$index].rowspan}}" style="overflow: hidden;">' + "<span ng-class=\"{'locked layout-row layout-align-start-center': $last && $ctrl.more}\">" + '<strong ng-if="$last && $ctrl.more" class="locked-string locked-string-initial bg-opaque-7 text-uppercase">' + '<span ng-if="($ctrl.gallery.length - $ctrl.previewGallery.length) == 1" translate="photo.photo.other.count"></span>' + '<span ng-if="($ctrl.gallery.length - $ctrl.previewGallery.length) != 1" translate="photo.photos.other.count" translate-value-count="{{$ctrl.gallery.length - $ctrl.previewGallery.length}}"></span>' + "</strong>" + '<img ng-src="{{$ctrl.storageUrl + photo.path}}" alt="{{photo.tags[0]}}" lazy-image default-img-url="\'/resources/public/img/no-gallery-image.png\'">' + "</span>" + "</md-grid-tile>" + "</md-grid-list>" + "</div>" + '<div ng-if="!$ctrl.gallery.length">' + '<img src="/resources/public/img/no-gallery-image.png" class="full-width">' + "</div>"
    });
    function GalleryCtrl($scope, AboutStorage, Dialog, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.storageUrl = data.url;
                    ctrl.initGridList();
                });
            } else {
                ctrl.initGridList();
            }
        };
        this.openGallery = function(ev, idx) {
            Dialog.showGallery(ev, ctrl.galleryTitle, ctrl.gallery, {
                storageUrl: ctrl.storageUrl,
                initialSlide: idx || 0
            });
        };
        this.initGridList = function() {
            if (_.isEmpty(ctrl.gallery)) {
                return;
            }
            ctrl.ratio = ctrl.ratio || "4:3";
            ctrl.maxCols = ctrl.gallery.length;
            if (ctrl.cols) {
                ctrl.colsArray = [];
                ctrl.totalCols = 0;
                _.forEach(ctrl.cols.split(":"), function(col) {
                    var parsed = Math.abs(parseInt(col));
                    ctrl.totalCols += parsed;
                    ctrl.colsArray.push(parsed);
                });
                ctrl.maxCols = NumberUtils.lcmArray(ctrl.colsArray);
                ctrl.maxCols = ctrl.gallery.length < ctrl.colsArray[0] ? ctrl.gallery.length : ctrl.maxCols;
            }
            ctrl.previewGallery = [];
            ctrl.more = false;
            var size = _.size(ctrl.gallery);
            if (size <= 0) {
                return;
            }
            if (size >= ctrl.totalCols) {
                var dropItemsCount = ctrl.maxItems ? size - ctrl.maxItems : size - ctrl.totalCols;
                ctrl.previewGallery = _.dropRight(ctrl.gallery, dropItemsCount);
                ctrl.more = size > ctrl.totalCols;
            } else {
                ctrl.previewGallery = ctrl.gallery;
            }
            if (ctrl.rowspan) {
                ctrl.rowspanArray = [];
                _.forEach(ctrl.rowspan.split(":"), function(row) {
                    ctrl.rowspanArray.push(Math.abs(parseInt(row)));
                });
            }
            ctrl.tilesConfig = [];
            _.forEach(ctrl.previewGallery, function(photo, index) {
                if (_.isEmpty(ctrl.colsArray)) {
                    ctrl.tilesConfig.push({
                        colspan: 1
                    });
                } else {
                    _.forEach(ctrl.colsArray, function(col, row, collection) {
                        if (index < (row == 0 ? col : col + collection[row - 1]) || row + 1 == collection.length) {
                            ctrl.tilesConfig.push({
                                colspan: ctrl.maxCols / col
                            });
                            return false;
                        }
                    });
                }
            });
            if (_.size(ctrl.tilesConfig) > 1) {
                var colCount = 0;
                _.forEach(ctrl.tilesConfig, function(config, index) {
                    if (!_.isEmpty(ctrl.rowspanArray)) {
                        colCount += config.colspan;
                        config.rowspan = ctrl.rowspanArray[Math.ceil(colCount / ctrl.maxCols) - 1] || 1;
                    } else {
                        config.rowspan = 1;
                    }
                });
            } else {
                ctrl.tilesConfig[0].rowspan = 1;
            }
        };
    }
})();

(function() {
    "use strict";
    HotelMapInfoWindowCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chHotelMapInfoWindow", {
        require: {
            chHotelMapCtrl: "^chHotelMap",
            ngMapCtrl: "^ngMap"
        },
        bindings: {
            hotel: "<",
            showGallery: "<?",
            storageUrl: "@",
            markerType: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapInfoWindowCtrl,
        template: '<info-window id="hotel-iw">' + '<div ng-if="$ctrl.hotel" ng-non-bindable style="max-width: 300px;">' + '<div ng-if="$ctrl.showGallery" style="width: 100; max-height: 200px">' + '<div class="relative">' + '<div class="img-top-bar">' + '<div class="img-top-left-cont layout-row">' + '<div class="md-subhead row-mini" ng-if="$ctrl.hotel.recommended">' + '<small class="label gradient-yellow">' + '<md-icon class="mdi mdi-thumb-up md-14 text-white"></md-icon>&nbsp;' + '<span translate="common.recommended"></span>' + "</small>" + "</div>" + "<div flex></div>" + '<ch-hotel-favorite ng-if="$ctrl.hotel" hotel="$ctrl.hotel"></ch-hotel-favorite>' + "</div>" + "</div>" + '<img ng-if="!$ctrl.hotel.gallery.length" class="main-image" ng-attr-alt="{{$ctrl.hotel.name}}" src="/resources/public/img/header.jpg">' + '<ch-sliding-gallery ng-if="$ctrl.hotel.gallery.length"' + 'gallery="$ctrl.hotel.gallery"' + 'dialog-title="{{$ctrl.hotel.name}}"' + "tooltip=\"{{'hotel.gallery.view.click'|translate}}\"" + 'base-url="$ctrl.storageUrl"' + 'sort="true"' + 'autoplay="0"' + 'slide-cls="bg-header"' + 'open-on-click="true">' + "</ch-sliding-gallery>" + "</div>" + "</div>" + '<div layout="column" class="md-padding no-padding-left no-padding-right no-padding-bottom text-left">' + "<div flex>" + "<div md-truncate>" + '<span class="md-subhead">{{$ctrl.hotel.name}}</span>' + "</div>" + "<div layout>" + "<div flex>" + '<div><small class="label label-inline-block gradient-gray text-white text-wrap"><span translate="hotel.type.{{$ctrl.hotel.type}}"></span></small></div>' + '<div class="md-body-1 text-gray-light">' + "<span>{{$ctrl.hotel.addressInfo.district}}</span>,&nbsp;<strong>{{$ctrl.hotel.addressInfo.city}}</strong>" + "</div>" + '<div class="md-body-1 text-gray-light">' + '<md-icon class="mdi mdi-map-marker md-14"></md-icon>&nbsp;<small><em>{{$ctrl.hotel.addressInfo.address}},&nbsp;{{$ctrl.hotel.addressInfo.zipcode}}</em></small>' + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<md-button ng-if="$ctrl.hotel.price" class="only-border border-success text-success no-margin-top no-margin-right">' + '<div class="row-mini text-left">' + '<div layout="column">' + "<small>" + '<span class="text-initial" translate="common.from"></span>' + '<i ng-if="$ctrl.hotel.price.amount.initialAmount > 0 && $ctrl.hotel.price.amount.initialAmount > $ctrl.hotel.price.amount.finalAmount">&nbsp;<del>{{$ctrl.hotel.price.amount.initialAmount|chCurrency}}</del></i>' + "</small>" + '<span class="md-subhead row-mini"><strong>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</strong></span>' + '<small ng-if="$ctrl.hotel.nights > 0" class="text-lowercase">' + '<span translate="common.for"></span>&nbsp;{{$ctrl.hotel.nights}}&nbsp;' + '<span ng-show="$ctrl.hotel.nights == 1" translate="common.night"></span>' + '<span ng-show="$ctrl.hotel.nights > 1" translate="common.nights"></span>' + "</small>" + "</div>" + "</div>" + "</md-button>" + '<div ng-if="!$ctrl.hotel.price" layout="column" class="text-warn">' + '<md-icon class="mdi mdi-emoticon-sad md-32 text-warn"></md-icon>' + '<strong translate="reservation.availability.missed"></strong>' + "</div>" + "</div>" + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="$ctrl.hotel.price && $ctrl.hotel.roomsCounter.actual >= 1">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-success no-padding-left">' + '<strong><em translate="reservation.availability.ok.simple"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-success no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Book now">' + '<span translate="common.book"></span>' + "</md-button>" + "</div>" + "</div>" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="!$ctrl.hotel.price || $ctrl.hotel.roomsCounter.actual <= 0">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-warn no-padding-left">' + '<strong><em translate="reservation.availability.missed.full"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-warn no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Search other dates">' + '<span translate="reservation.view.other.period"></span>' + "</md-button>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</info-window>"
    });
    function HotelMapInfoWindowCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
        };
        this.$hotelClick = function(ev) {
            ctrl.onHotelClick && ctrl.onHotelClick({
                $event: ev,
                hotel: ctrl.hotel
            });
        };
    }
})();

(function() {
    "use strict";
    HotelMapMarkerCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chHotelMapMarker", {
        require: {
            chHotelMapCtrl: "^chHotelMap"
        },
        bindings: {
            hotel: "<",
            markerType: "@"
        },
        controller: HotelMapMarkerCtrl,
        template: '<div ng-if="$ctrl.hotel" ng-switch="$ctrl.markerType">' + '<div ng-switch-when="pointer">' + '<marker class="clickable" id="mk_{{$ctrl.hotel.id}}" ng-if="$ctrl.$$position" position="[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]" icon="{{$ctrl.$$markerIcon}}" on-mouseover="$ctrl.$showDetails($ctrl.hotel);"></marker>' + "</div>" + "<div ng-switch-default>" + '<custom-marker id="cmk_{{$ctrl.hotel.id}}" ng-if="$ctrl.$$position" position="[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]"' + 'on-click="$ctrl.$showDetails($ctrl.hotel, true)" on-mouseover="$ctrl.$setSelected($ctrl.hotel, true)" on-mouseout="$ctrl.$setSelected($ctrl.hotel, false)">' + '<div class="clickable" ng-class="{\'animated bounce\': $ctrl.hotel.selected && $ctrl.hotel.selectEffect}">' + "<div class=\"ch-marker-inner md-caption\" ng-class=\"{'bg-primary': $ctrl.markerType == 'name' || $ctrl.hotel.selected," + "'bg-primary-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && $ctrl.hotel.price ," + "'bg-gray-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && !$ctrl.hotel.price}\" ng-switch=\"$ctrl.markerType\">" + '<span ng-switch-when="price">' + '<div ng-if="$ctrl.hotel.price">' + "<span>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</span>" + "</div>" + '<div ng-if="!$ctrl.hotel.price">' + '<md-icon class="mdi mdi-emoticon-sad md-18 text-white"></md-icon>' + "</div>" + "</span>" + "<strong ng-switch-default>{{$ctrl.hotel.name}}</strong>" + "</div>" + "<div class=\"arrow-down arrow-sm\" ng-class=\"{'border-primary': $ctrl.markerType == 'name' || $ctrl.hotel.selected," + "'border-primary-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && $ctrl.hotel.price ," + "'border-gray-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && !$ctrl.hotel.price}\"></div>" + "</div>" + "</custom-marker>" + "</div>" + "</div>"
    });
    function HotelMapMarkerCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
            ctrl.$$markerIcon = "/resources/public/img/map-marker.01.png";
            ctrl.$getMarkerPosition();
        };
        this.$getMarkerPosition = function() {
            if (!ctrl.hotel) {
                return;
            }
            var fullAddress = ctrl.hotel.addressInfo.address + ", " + ctrl.hotel.addressInfo.city + ", " + ctrl.hotel.addressInfo.zipcode;
            ctrl.chHotelMapCtrl.$$geocoder.geocode({
                address: fullAddress
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    ctrl.$$position = results[0].geometry.location;
                } else {
                    console.error("Error geocoding hotel '" + ctrl.hotel.name + "' (address: " + fullAddress + "): " + status);
                }
            });
        };
        this.$setSelected = function(ev, hotel, selected) {
            if (hotel) {
                hotel.selectEffect = false;
                hotel.selected = _.isBoolean(selected) ? selected : true;
            }
        };
        this.$showDetails = function(ev, hotel, isCustomMarker) {
            if (!ctrl.chHotelMapCtrl.$$currHotel || ctrl.chHotelMapCtrl.$$currHotel.id != hotel.id) {
                ctrl.$hideDetails(ev, ctrl.chHotelMapCtrl.$$currHotel);
                ctrl.$setSelected(ev, hotel, true);
                ctrl.chHotelMapCtrl.$$currHotel = hotel;
            }
            ctrl.chHotelMapCtrl.$$map.showInfoWindow("hotel-iw", isCustomMarker ? "cmk_" + hotel.id : "mk_" + hotel.id);
        };
        this.$hideDetails = function(ev, hotel) {
            ctrl.$setSelected(ev, hotel, false);
            ctrl.chHotelMapCtrl.$$map.hideInfoWindow("hotel-iw");
        };
    }
})();

(function() {
    "use strict";
    HotelMapCtrl.$inject = [ "$scope", "$element", "$timeout" ];
    angular.module("itaca.components").component("chHotelMap", {
        bindings: {
            hotels: "<?",
            hotel: "<?",
            address: "<?",
            showGallery: "<?",
            storageUrl: "@",
            markerType: "@",
            searchParams: "<?",
            disableUi: "<?",
            disableScrollwheel: "<?",
            mapClass: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapCtrl,
        template: '<ng-map class="{{$ctrl.mapClass}}" ng-style="$ctrl.$$mapStyle" default-style="false" zoom-to-inlude-markers="true" disable-default-ui="{{$ctrl.disableUi}}" ' + 'center="[{{$ctrl.$$center.lat}}, {{$ctrl.$$center.lng}}]" map-initialized="$ctrl.$initMap(map)" zoom="14" clickable-icons="false" trigger-resize="true" scrollwheel="{{!$ctrl.disableScrollwheel}}">' + '<div ng-if="$ctrl.hotel">' + '<ch-hotel-map-marker hotel="$ctrl.hotel" marker-type="{{$ctrl.markerType}}"></ch-hotel-map-marker>' + "</div>" + '<div ng-if="$ctrl.hotels" ng-repeat="hotel in $ctrl.hotels">' + '<ch-hotel-map-marker hotel="hotel" marker-type="{{$ctrl.markerType}}"></ch-hotel-map-marker>' + "</div>" + '<ch-hotel-map-info-window hotel="$ctrl.$$currHotel" marker-type="{{$ctrl.markerType}}" ' + 'show-gallery="$ctrl.showGallery" storage-url="{{$ctrl.storageUrl}}" on-hotel-click="$ctrl.onHotelClick"></ch-hotel-map-info-window>' + "</ng-map>"
    });
    function HotelMapCtrl($scope, $element, $timeout) {
        var ctrl = this;
        this.$$geocoder = new google.maps.Geocoder();
        this.$onInit = function() {
            ctrl.showGallery = _.isBoolean(ctrl.showGallery) ? ctrl.showGallery : false;
            ctrl.disableUi = _.isBoolean(ctrl.disableUi) ? ctrl.disableUi : false;
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
            ctrl.mapClass = ctrl.mapClass || "flex";
            ctrl.disableScrollwheel = _.isBoolean(ctrl.disableScrollwheel) ? ctrl.disableScrollwheel : false;
            ctrl.$initLocations();
        };
        this.$initLocations = function() {
            if (!ctrl.hotel && !ctrl.hotels && !ctrl.address) {
                throw new Error("You must pass an Hotel Object or Array of Hotel Objects or address at least");
            }
            if (ctrl.hotel && !angular.isObject(ctrl.hotel)) {
                throw new Error("You must pass an Hotel Object in 'hotel' parameter");
            }
            if (ctrl.hotels && !angular.isArray(ctrl.hotels)) {
                throw new Error("You must pass an Array of Hotel Objects in 'hotels' parameter");
            }
            ctrl.$$centerObj = new google.maps.LatLng(0, 0);
            ctrl.$$center = ctrl.$$centerObj.toJSON();
        };
        this.$initMap = function(map) {
            ctrl.$$map = map;
            ctrl.$getCenter(map);
            ctrl.$initWatchers();
            google.maps.event.trigger(map, "resize");
        };
        this.$getCenter = function(map) {
            if (!map) {
                return;
            }
            if (_.isEmpty(ctrl.hotels) && _.isNil(ctrl.hotel)) {
                if (_.isNil(ctrl.address)) {
                    ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                    ctrl.$updateCenter(map);
                } else {
                    $$geocoder.geocode({
                        address: ctrl.address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            ctrl.$$centerObj = results[0].geometry.location;
                        } else {
                            console.error("Error geocoding address: " + ctrl.address + ": " + status);
                            ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                        }
                        ctrl.$updateCenter(map);
                    });
                }
            } else {
                var totalLat = 0, totalLng = 0;
                _.forEach(map.markers, function(marker) {
                    totalLat += marker.position.lat();
                    totalLng += marker.position.lng();
                });
                _.forEach(map.customMarkers, function(marker) {
                    totalLat += marker.position.lat();
                    totalLng += marker.position.lng();
                });
                var divider = _.size(map.markers) + _.size(map.customMarkers);
                ctrl.$$centerObj = divider ? new google.maps.LatLng({
                    lat: totalLat / divider,
                    lng: totalLng / divider
                }) : new google.maps.LatLng(0, 0);
                ctrl.$updateCenter(map);
            }
        };
        this.$updateCenter = function(map) {
            $timeout(function() {
                if (_.isNil(ctrl.$$centerObj)) {
                    ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                }
                _.assign(ctrl.$$center, ctrl.$$centerObj.toJSON());
                google.maps.event.trigger(map, "resize");
            }, 1e3);
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.$$map.markers;
            }, function(newVal, oldVal) {
                ctrl.$getCenter(ctrl.$$map);
            });
            $scope.$watchCollection(function() {
                return ctrl.$$map.customMarkers;
            }, function(newVal, oldVal) {
                ctrl.$getCenter(ctrl.$$map);
            });
        };
        $scope.$watch(function() {
            var parent = $element.parent()[0];
            var paddingTop = parent.style.paddingTop || 0;
            var paddingBottom = parent.style.paddingBottom || 0;
            return parent.offsetHeight - paddingTop - paddingBottom;
        }, function(newVal, oldVal) {
            ctrl.$$mapStyle = {
                height: newVal + "px",
                width: "100%"
            };
            if (ctrl.$$map) {
                google.maps.event.trigger(ctrl.$$map, "resize");
                ctrl.$getCenter(ctrl.$$map);
            }
        });
    }
})();

(function() {
    "use strict";
    IconSelectCtrl.$inject = [ "$scope", "$http", "$q", "$log", "InfinitePaging" ];
    angular.module("itaca.components").component("chIconSelect", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<",
            label: "@",
            icons: "<?",
            hideFilter: "<?",
            iconsSourcesUrls: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?"
        },
        controller: IconSelectCtrl,
        templateUrl: "/tpls/icon-select/icon-select.tpl"
    });
    function IconSelectCtrl($scope, $http, $q, $log, InfinitePaging) {
        var ctrl = this;
        this.$$iconsSourcesUrls = [ "/public/data/icon-classes.json" ];
        this.$onInit = function() {
            ctrl.$initModel();
            ctrl.$initIcons();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.ngModel || changesObj.ngDisabled) {
                ctrl.$initModel();
            }
            if (changesObj.icons || changesObj.iconsSourcesUrls) {
                ctrl.$initIcons();
            }
        };
        this.$initModel = function() {
            if (ctrl.ngDisabled || _.isPlainObject(ctrl.ngModel) && ctrl.ngModel.cssClass) {
                ctrl.$$exists = true;
                ctrl.$cancelIconSelect();
            } else {
                ctrl.$$exists = false;
                ctrl.$showIconSelect();
            }
        };
        this.$initIcons = function() {
            if (_.isArray(ctrl.icons) & !_.isEmpty(ctrl.icons)) {
                ctrl.$initLoader(ctrl.icons);
            } else {
                ctrl.iconsSourcesUrls = _.isArray(ctrl.iconsSourcesUrls) ? ctrl.iconsSourcesUrls : ctrl.$$iconsSourcesUrls;
                var promises = [];
                _.forEach(ctrl.iconsSourcesUrls, function(url) {
                    var promise = $http.get(url).then(function(response) {
                        return response.data;
                    });
                    promises.push(promise);
                });
                ctrl.$$error = undefined;
                $q.all(promises).then(function(datas) {
                    var icons = [];
                    _.forEach(datas, function(data) {
                        icons = _.union(icons, data);
                    });
                    ctrl.$initLoader(_.compact(icons));
                }, function(response) {
                    $log.error("Error loading icon list");
                    ctrl.$$error = "Error loading icon list";
                });
            }
        };
        this.$initLoader = function(icons) {
            ctrl.$$loader = new InfinitePaging(icons, {
                size: 30,
                sort: [ "cssClass" ]
            });
            ctrl.$$loader.nextPage();
            ctrl.$initFilterWatcher();
        };
        this.$initFilterWatcher = function() {
            if (!ctrl.$$stopFilterWatcher) {
                ctrl.$$stopFilterWatcher = $scope.$watch(function() {
                    if (ctrl.$$loader && ctrl.$$loader.params) {
                        return ctrl.$$loader.params.filter;
                    } else {
                        return null;
                    }
                }, function(newVal, oldVal) {
                    ctrl.$$loader && ctrl.$$loader.reload();
                });
            }
        };
        this.$selectIcon = function(icon) {
            if (ctrl.ngDisabled || ctrl.ngReadonly || !icon || !icon.cssClass) {
                return false;
            }
            ctrl.$update(icon);
            ctrl.$cancelIconSelect();
        };
        this.$showIconSelect = function() {
            ctrl.$$showIcons = true;
            ctrl.$$loader && (ctrl.$$loader.params.filter = null);
        };
        this.$cancelIconSelect = function() {
            ctrl.$$showIcons = false;
            ctrl.$$loader && (ctrl.$$loader.params.filter = null);
        };
        this.$update = function(icon) {
            ctrl.ngModelCtrl.$setViewValue(icon);
        };
    }
})();

(function() {
    "use strict";
    InvoiceHeaderCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chInvoiceHeader", {
        require: {
            chInvoiceCtrl: "^^chInvoice"
        },
        controller: InvoiceHeaderCtrl,
        templateUrl: "/tpls/invoice/invoice-header.tpl"
    });
    function InvoiceHeaderCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.invoice = ctrl.chInvoiceCtrl.invoice;
        };
    }
})();

(function() {
    "use strict";
    InvoiceItemsCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chInvoiceItems", {
        require: {
            chInvoiceCtrl: "^^chInvoice"
        },
        controller: InvoiceItemsCtrl,
        templateUrl: "/tpls/invoice/invoice-items.tpl"
    });
    function InvoiceItemsCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.invoice = ctrl.chInvoiceCtrl.invoice;
        };
    }
})();

(function() {
    "use strict";
    InvoiceCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chInvoice", {
        transclude: true,
        bindings: {
            invoice: "<"
        },
        controller: InvoiceCtrl,
        template: "<div flex layout-fill ng-transclude></div>"
    });
    function InvoiceCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    MonthPickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    MonthPickerCtrl.$inject = [ "$scope", "mdPanelRef", "DateUtils", "$timeout" ];
    angular.module("itaca.components").component("chMonthPicker", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
            labelPosition: "@",
            placeholder: "@",
            selectedText: "&",
            hideIcon: "<?",
            iconColorClass: "@",
            showYear: "<?",
            ngModel: "<",
            minDate: "<?",
            maxDate: "<?",
            errorMessages: "<?",
            useUtc: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            onClose: "&?",
            ngRequired: "<?",
            ngDisabled: "<?",
            size: "@"
        },
        controller: MonthPickerTriggerCtrl,
        templateUrl: "/tpls/month-picker/month-picker-trigger.tpl"
    });
    function MonthPickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.labelPosition = _.includes([ "top", "left" ], ctrl.labelPosition) ? ctrl.labelPosition : "top";
            ctrl.size = _.includes([ "small", "medium", "big" ], ctrl.size) ? ctrl.size : "medium";
            ctrl.buttonClass = ctrl.buttonClass || "no-margin";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            ctrl.$manageShowYear();
            ctrl.$manageSelectedLabel();
            var targetEl = $element[0].querySelector(".ch-month-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: MonthPickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/month-picker/month-picker.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: false,
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    $scope.chMonthPickerTriggerForm.date.$setTouched();
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                        ctrl.onClose && ctrl.onClose({
                            $date: ctrl.ngModel
                        });
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
                }
            };
            ctrl.ngModelCtrl.$formatters.push(formatter);
            ctrl.ngModelCtrl.$parsers.push(parser);
            function parser(value) {
                var m = moment(value);
                var valid = m.isValid();
                ctrl.ngModelCtrl.$setValidity("date", valid);
                return valid ? m.toDate() : value;
            }
            function formatter(value) {
                var m = moment(value);
                var valid = m.isValid();
                return valid ? m.format("MMM") : value;
            }
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.ngModel) {
                ctrl.$manageShowYear();
                ctrl.$manageSelectedLabel();
            }
        };
        this.$manageShowYear = function() {
            if (_.isNil(ctrl.showYear) || !_.isBoolean(ctrl.showYear)) {
                ctrl.$$showYear = !moment(ctrl.ngModel).isSame(moment(), "years");
            }
        };
        this.$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            if (ctrl.ngReadonly) {
                return;
            }
            ctrl.$$data = {
                current: ctrl.ngModel,
                min: ctrl.minDate,
                max: ctrl.maxDate
            };
            var locals = {
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false,
                useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-xs");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            $scope.chMonthPickerTriggerForm.date.$setDirty();
            ctrl.ngModelCtrl.$setViewValue(ctrl.$getDate(ctrl.$$data.current));
            ctrl.$manageShowYear();
            ctrl.$manageSelectedLabel();
            ctrl.minDate = ctrl.$getDate(ctrl.$$data.min);
            ctrl.maxDate = ctrl.$getDate(ctrl.$$data.max);
        };
        this.$manageSelectedLabel = function() {
            if (angular.isFunction(ctrl.selectedText)) {
                ctrl.$$selectedText = ctrl.selectedText({
                    $date: ctrl.ngModel
                });
            }
        };
        this.$getDate = function(date) {
            var m = ctrl.$getMoment(date);
            return m ? m.toDate() : null;
        };
        this.$getMoment = function(date) {
            if (!date) {
                return null;
            }
            if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
    }
    function MonthPickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
        var _self = this;
        this.init = function() {
            _self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
            _self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {
                timezone: "UTC"
            } : {};
        };
        $scope.$on("md-calendar-change", function(event, date) {
            if (!_self.hasConfirm) {
                _self.confirm();
            }
        });
        this.$getMoment = function(date) {
            if (_self.useUtc) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        $scope.$watch(function() {
            return _self.data.current;
        }, function(newValue, oldValue) {
            $scope.currentDate = _self.data.end ? _self.$getMoment(_self.data.end).toDate() : null;
        });
        this.confirm = function() {
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    CancellationPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chNoShowPolicyInfo", {
        bindings: {
            noShowPolicy: "<",
            title: "@",
            titleClass: "@"
        },
        controller: CancellationPolicyCtrl,
        templateUrl: "/tpls/no-show-policy-info/no-show-policy-info.tpl"
    });
    function CancellationPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    OriginalValueCtrl.$inject = [ "$scope", "$element", "$attrs" ];
    angular.module("itaca.components").component("chOriginalValue", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            referTo: "=?",
            label: "@",
            filter: "@",
            cssClass: "@"
        },
        controller: OriginalValueCtrl,
        template: '<span class="{{$ctrl.cssClass}}" ng-if="$ctrl.$$originalValue != $ctrl.ngModel">' + "<span>{{$ctrl.label}}:&nbsp;</span>" + '<span ng-if="$ctrl.filter">{{::($ctrl.$$originalValue|useFilter:$ctrl.filter)}}</span>' + '<span ng-if="!$ctrl.filter">{{::$ctrl.$$originalValue}}</span>' + "</span>"
    });
    function OriginalValueCtrl($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.$onInit = function() {
            ctrl.$$originalValue = ctrl.referTo || angular.copy(ctrl.ngModel);
            ctrl.cssClass = ctrl.cssClass || "label bg-blue-sea";
        };
    }
})();

(function() {
    "use strict";
    PadTopCtrl.$inject = [ "$scope", "$element" ];
    angular.module("itaca.components").component("chPadTop", {
        transclude: true,
        bindings: {
            targetEl: "@",
            chDisabled: "<?"
        },
        controller: PadTopCtrl,
        template: '<div flex class="ch-pad-top" ng-transclude></div>'
    });
    function PadTopCtrl($scope, $element) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatches();
        };
        this.$postLink = function() {
            ctrl.$$innerEl = angular.element($element[0].querySelector(".ch-pad-top"));
            ctrl.$setTop();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.targetEl || changesObj.chDisabled) {
                ctrl.$setTop();
            }
        };
        this.$setTop = function(top) {
            if (!ctrl.$$innerEl) {
                return;
            }
            top = isFinite(top) ? top : ctrl.$getTargetElHeight();
            ctrl.$$innerEl.css({
                "padding-top": ctrl.chDisabled ? 0 : top + "px"
            });
        };
        this.$getTargetElHeight = function() {
            var el = ctrl.targetEl ? document.querySelector(ctrl.targetEl) : null;
            if (!el) {
                return;
            }
            var h = el.offsetHeight;
            if (!h) {
                h = el.childNodes[0] ? el.childNodes[0].offsetHeight : h;
            }
            return h;
        };
        this.$initWatches = function() {
            $scope.$watch(ctrl.$getTargetElHeight, function(newValue, oldValue) {
                ctrl.$setTop(newValue);
            });
        };
    }
})();

(function() {
    "use strict";
    ParallaxCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chParallax", {
        bindings: {
            imageUrl: "@",
            containerClass: "@",
            bgClass: "@",
            hasBackdrop: "<?"
        },
        controller: ParallaxCtrl,
        transclude: true,
        template: '<div class="ch-parallax {{$ctrl.containerClass}}">' + '<div class="ch-parallax-bg {{$ctrl.bgClass}}" ng-style="$ctrl.$$bgStyle"></div>' + '<div ng-show="$ctrl.hasBackdrop"  class="ch-parallax-backdrop"></div>' + '<div class="ch-parallax-content" ng-transclude></div>' + "</div>"
    });
    function ParallaxCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$bgStyle = {
                "background-image": "url(" + ctrl.imageUrl + ")"
            };
            ctrl.hasBackdrop = _.isBoolean(ctrl.hasBackdrop) ? ctrl.hasBackdrop : false;
        };
    }
})();

(function() {
    "use strict";
    PasswordInputCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPasswordInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            containerClass: "@?",
            inputLabel: "@?",
            inputName: "@?",
            iconClass: "@?",
            showIconClass: "@?",
            hideIconClass: "@?",
            errorMessages: "<?",
            ngRequired: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            mdNoAsterisk: "<?"
        },
        controller: PasswordInputCtrl,
        templateUrl: "/tpls/password-input/password-input.tpl"
    });
    function PasswordInputCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.containerClass = ctrl.containerClass || "md-block";
            ctrl.inputName = ctrl.inputName || "password";
            ctrl.iconClass = _.isNil(ctrl.iconClass) || _.isBoolean(ctrl.iconClass) && ctrl.iconClass ? "mdi mdi-key md-24" : ctrl.iconClass;
            ctrl.showIconClass = _.isNil(ctrl.showIconClass) || _.isBoolean(ctrl.showIconClass) && ctrl.showIconClass ? "mdi mdi-eye md-24" : ctrl.showIconClass;
            ctrl.hideIconClass = _.isNil(ctrl.hideIconClass) || _.isBoolean(ctrl.hideIconClass) && ctrl.hideIconClass ? "mdi mdi-eye-off md-24" : ctrl.hideIconClass;
            ctrl.mdNoAsterisk = _.isBoolean(ctrl.mdNoAsterisk) ? ctrl.mdNoAsterisk : false;
        };
    }
})();

(function() {
    "use strict";
    PaymentOptionEditCtrl.$inject = [ "$scope", "REGEXP", "rangeFilter", "FormUtils" ];
    angular.module("itaca.components").component("chPaymentOptionEdit", {
        bindings: {
            paymentOption: "<",
            sizes: "<?",
            disabledSizes: "<?",
            frequencies: "<?",
            disabledFrequencies: "<?",
            lengths: "<?",
            disabledLengths: "<?",
            hideLengths: "<?",
            amountType: "@?",
            title: "@?",
            subtitle: "@?",
            sizeTitle: "@?",
            sizeSubtitle: "@?",
            frequencyTitle: "@?",
            frequencySubitle: "@?",
            lengthTitle: "@?",
            lengthSubtitle: "@?",
            amountTitle: "@?",
            amountSubtitle: "@?",
            onSave: "&?",
            onCancel: "&?"
        },
        controller: PaymentOptionEditCtrl,
        templateUrl: "/tpls/payment-option/payment-option-edit.tpl"
    });
    function PaymentOptionEditCtrl($scope, REGEXP, rangeFilter, FormUtils) {
        var ctrl = this;
        this.$$REGEXP = REGEXP;
        this.$$defaultSizes = [ "SINGLE", "PER_PERSON", "PER_ADULT", "PER_BOY", "PER_CHILD", "PER_KID" ];
        this.$$defaultFrequencies = [ "LUMP_SUM", "DAILY", "NIGHTLY", "WEEKLY", "MONTHLY", "YEARLY" ];
        this.$$minLengthUnits = [ "DAYS", "WEEKS", "MONTHS", "YEARS" ];
        this.$onInit = function() {
            ctrl.$$paymentOption = angular.copy(ctrl.paymentOption || {});
            ctrl.hideLengths = _.isBoolean(ctrl.hideLengths) ? ctrl.hideLengths : false;
        };
        this.$postLink = function() {
            ctrl.$initSizes();
            ctrl.$initFrequencies();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.discount) {
                ctrl.$$paymentOption = angular.copy(ctrl.paymentOption || {});
            }
            if (changesObj.sizes || changesObj.disabledSizes) {
                ctrl.$initSizes();
            }
            if (changesObj.frequencies || changesObj.disabledFrequencies) {
                ctrl.$initFrequencies();
            }
            if (changesObj.hideLengths) {
                ctrl.$$paymentOption.minLength = null;
            }
        };
        this.$initSizes = function() {
            var sizes = angular.copy(ctrl.$$defaultSizes);
            if (!_.isEmpty(ctrl.sizes)) {
                sizes = _.intersection(ctrl.$$defaultSizes, ctrl.sizes);
            }
            ctrl.$$sizes = [];
            _.forEach(sizes, function(size) {
                ctrl.$$sizes.push({
                    value: size,
                    disabled: _.includes(ctrl.disabledSizes, size) && !(ctrl.paymentOption && ctrl.paymentOption.size == size)
                });
            });
        };
        this.$initFrequencies = function() {
            var frequencies = angular.copy(ctrl.$$defaultFrequencies);
            if (!_.isEmpty(ctrl.frequencies)) {
                frequencies = _.intersection(ctrl.$$defaultFrequencies, ctrl.frequencies);
            }
            ctrl.$$frequencies = [];
            _.forEach(frequencies, function(frequency) {
                ctrl.$$frequencies.push({
                    value: frequency,
                    disabled: _.includes(ctrl.disabledFrequencies, frequency) && !(ctrl.paymentOption && ctrl.paymentOption.frequency == frequency)
                });
            });
        };
        this.$onFrequencyChange = function() {
            switch (ctrl.$$paymentOption.frequency) {
              case "WEEKLY":
                ctrl.$$disabledMinLengthUnits = [ "DAYS" ];
                break;

              case "MONTHLY":
                ctrl.$$disabledMinLengthUnits = [ "DAYS", "WEEKS" ];
                break;

              case "YEARLY":
                ctrl.$$disabledMinLengthUnits = [ "DAYS", "WEEKS", "MONTHS" ];
                break;

              default:
                ctrl.$$disabledMinLengthUnits = [];
                break;
            }
            if (_.isPlainObject(ctrl.$$paymentOption.minLength) && _.includes(ctrl.$$disabledMinLengthUnits, ctrl.$$paymentOption.minLength.unit)) {
                ctrl.$$paymentOption.minLength.unit = _.difference(ctrl.$$minLengthUnits, ctrl.$$disabledMinLengthUnits)[0];
            }
        };
        this.$cancel = function(ev) {
            ctrl.onCancel && ctrl.onCancel({
                $event: ev
            });
        };
        this.$confirm = function(ev) {
            var form = $scope.chPaymentOptionForm;
            form.$setSubmitted();
            if (form.$invalid) {
                FormUtils.focusFirstInvalid(form.$name);
                return false;
            }
            ctrl.onSave && ctrl.onSave({
                $event: ev,
                $paymentOption: ctrl.$$paymentOption
            });
        };
    }
})();

(function() {
    "use strict";
    PaymentOptionCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPaymentOption", {
        bindings: {
            paymentOption: "<",
            frequencyLabel: "@",
            sizeLabel: "@",
            amountClass: "@"
        },
        controller: PaymentOptionCtrl,
        templateUrl: "/tpls/payment-option/payment-option.tpl"
    });
    function PaymentOptionCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    PaymentPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPaymentPolicyInfo", {
        bindings: {
            rateType: "<",
            cancellationPolicy: "<",
            city: "@",
            offset: "@",
            title: "@",
            titleClass: "@"
        },
        controller: PaymentPolicyCtrl,
        templateUrl: "/tpls/payment-policy-info/payment-policy-info.tpl"
    });
    function PaymentPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    PeopleCountersCtrl.$inject = [ "$scope", "$translate", "ReservationUtils" ];
    angular.module("itaca.components").component("chPeopleCounters", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            people: "<ngModel",
            maxPeople: "<",
            min: "<",
            max: "<",
            limits: "<",
            ageRanges: "<",
            onChange: "&?"
        },
        controller: PeopleCountersCtrl,
        templateUrl: "/tpls/people-counters/people-counters.tpl"
    });
    function PeopleCountersCtrl($scope, $translate, ReservationUtils) {
        var ctrl = this;
        $scope.$on("$localeChanged", ctrl.$generateAgeHints);
        this.$onInit = function() {
            ctrl.ngModelCtrl.$overrideModelOptions({
                allowInvalid: true
            });
            ctrl.ngModelCtrl.$formatters.push(ReservationUtils.peopleSummary);
            ctrl.ngModelCtrl.$validators.min = ctrl.$checkMin;
            ctrl.ngModelCtrl.$validators.max = ctrl.$checkMax;
            ctrl.$initWatchers();
        };
        this.$onChanges = function(changesObj) {
            if (_.isEmpty(changesObj)) {
                return;
            }
            if (changesObj.people || changesObj.maxPeople || changesObj.max || changesObj.limits) {
                ctrl.$manageLimits();
            }
            if (changesObj.ageRanges) {
                ctrl.$generateAgeHints();
            }
        };
        this.$checkMin = function(modelValue) {
            if (!ctrl.min) {
                return true;
            }
            ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
            return ctrl.$$guestsCount.standard >= _.toInteger(ctrl.min);
        };
        this.$checkMax = function(modelValue) {
            if (!ctrl.max) {
                return true;
            }
            ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
            return ctrl.$$guestsCount.standard <= _.toInteger(ctrl.max);
        };
        this.$manageLimits = function() {
            ctrl.limits = ctrl.limits || {};
            ctrl.limits.adults = ctrl.$normalizeRange(ctrl.limits.adults);
            ctrl.limits.boys = ctrl.$normalizeRange(ctrl.limits.boys);
            ctrl.limits.children = ctrl.$normalizeRange(ctrl.limits.children);
            ctrl.limits.kids = ctrl.$normalizeRange(ctrl.limits.kids);
            ctrl.$$peopleLimits = angular.copy(ctrl.limits);
            var maxPeople = ctrl.maxPeople || {
                adults: ctrl.limits.adults.max,
                boys: ctrl.limits.boys.max,
                children: ctrl.limits.children.max,
                kids: ctrl.limits.kids.max
            };
            var peopleAv = ReservationUtils.peopleAvailability(maxPeople, ctrl.people, ctrl.max);
            ctrl.$$peopleLimits.adults.max = peopleAv.adults;
            ctrl.$$peopleLimits.boys.max = peopleAv.boys;
            ctrl.$$peopleLimits.children.max = peopleAv.children;
            ctrl.$$peopleLimits.kids.max = peopleAv.kids;
        };
        this.$generateAgeHints = function() {
            $translate([ "people.adults", "people.boys", "people.children", "people.kids" ]).then(function(messages) {
                ctrl.$$adultsHint = "<span>" + messages["people.adults"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.adults) + ")</small>" : "");
                ctrl.$$boysHint = "<span>" + messages["people.boys"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.boys) + ")</small>" : "");
                ctrl.$$childrenHints = "<span>" + messages["people.children"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.children) + ")</small>" : "");
                ctrl.$$kidsHints = "<span>" + messages["people.kids"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.kids) + ")</small>" : "");
            });
        };
        this.$generateAgeRangeHtmlLabel = function(ageRange) {
            if (!ageRange || !ageRange.min && !ageRange.max) {
                return;
            }
            var label = "", key = "";
            if (!_.isNil(ageRange.min) && !_.isNil(ageRange.max)) {
                key = "date.years.range.abbr";
            } else if (!_.isNil(ageRange.min)) {
                key = "date.years.min.range.abbr";
            } else {
                key = "date.years.max.range.abbr";
            }
            label = $translate.instant(key, ageRange);
            return label;
        };
        this.$normalizeRange = function(range) {
            if (!range) {
                range = {};
            }
            range.min = range.min || 0;
            return range;
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, function(newVal, oldVal) {
                if (_.isEqual(newVal, oldVal)) {
                    return;
                }
                ctrl.$manageLimits();
                ctrl.ngModelCtrl.$setDirty();
                ctrl.ngModelCtrl.$validate();
                ctrl.ngModelCtrl.$valid && ctrl.onChange && ctrl.onChange({
                    $people: ctrl.people
                });
            });
        };
    }
})();

(function() {
    "use strict";
    PeopleIconsCtrl.$inject = [ "$scope", "Dialog" ];
    angular.module("itaca.components").component("chPeopleIcons", {
        bindings: {
            people: "<",
            max: "<?",
            extraPeople: "<?",
            extraMax: "<?",
            hideDetails: "<?",
            hideInfoIcon: "<?",
            hideTooltip: "<?",
            hidePeople: "<?",
            hideExtraPeople: "<?",
            size: "@",
            theme: "@",
            iconClass: "@"
        },
        controller: PeopleIconsCtrl,
        template: '<div flex layout="column">' + '<md-button class="minimal-button no-margin" ng-class="{\'layout-padding-sm\': $ctrl.size == \'big\'}" ng-click="$ctrl.$openDetails($event)" aria-label="Show pax details">' + '<span layout layout-wrap layout-align="center center">' + '<small ng-if="!$ctrl.hidePeople && $ctrl.people.adults">' + "<span ng-if=\"$ctrl.size == 'small'\">{{$ctrl.people.adults}}</span>" + "<md-icon class=\"material-icons mdi {{$ctrl.iconClass}}\" ng-class=\"{'mdi-account-multiple' : $ctrl.people.adults > 1, 'mdi-account': $ctrl.people.adults == 1, 'md-18': $ctrl.size == 'small', 'md-48': $ctrl.size == 'big'}\"></md-icon>" + '<span ng-if="$ctrl.size == \'big\' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<div ng-if="$ctrl.size == \'big\'" class="row-1 text-wrap">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$peopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.beds.principal.into"></span>' + "</div>" + "</small>" + '<small ng-if="!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)">' + '<span ng-if="!$ctrl.hidePeople">&nbsp;+&nbsp;</span>' + "<span ng-if=\"$ctrl.size == 'small'\">" + '<span ng-if="$ctrl.extraPeople.adults">{{$ctrl.extraPeople.adults}}</span>' + '<span ng-if="!$ctrl.extraPeople.adults && $$extra$$maxUnderages">{{$ctrl.$$extra$$maxUnderages}}</span>' + "</span>" + "<md-icon ng-if=\"$ctrl.extraPeople.adults\" class=\"material-icons mdi {{$ctrl.iconClass}}\" ng-class=\"{'mdi-account-multiple' : $ctrl.extraPeople.adults > 1, 'mdi-account': $ctrl.extraPeople.adults == 1, 'md-18': $ctrl.size == 'small', 'md-48': $ctrl.size == 'big'}\"></md-icon>" + "<md-icon ng-if=\"!$ctrl.extraPeople.adults && $ctrl.$$extra$$maxUnderages\" class=\"material-icons mdi mdi-human-child {{$ctrl.iconClass}}\" ng-class=\"{'md-14': $ctrl.size == 'small', 'md-36': $ctrl.size == 'big'}\"></md-icon>" + '<span ng-if="$ctrl.size == \'big\' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<div ng-if="$ctrl.size == \'big\'" class="row-1 text-wrap">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$extraPeopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.otherbeds.into"></span>' + "</div>" + "</small>" + '<span ng-if="$ctrl.size == \'small\' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<md-tooltip ng-if="!$ctrl.hideTooltip" class="auto-height text-wrap row-mini">' + '<div class="text-wrap">' + '<span ng-if="!$ctrl.hidePeople && $ctrl.people.adults">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$peopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.beds.principal.into"></span>' + "</span>" + '<span ng-if="!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)">' + '<span ng-if="!$ctrl.hidePeople">&nbsp;+&nbsp;</span>' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$extraPeopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.otherbeds.into"></span>' + "</span>" + '<span ng-if="$ctrl.$$maxUnderages || $ctrl.$$extra$$maxUnderages" class="text-lowercase">&nbsp;+&nbsp;<span translate="common.options.more.available"></span></span>' + '<div ng-if="!$ctrl.hideDetails"><em translate="common.information.further.click"></em></div>' + "</div>" + "</md-tooltip>" + "</span>" + "</md-button>" + "</div>"
    });
    function PeopleIconsCtrl($scope, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.theme = _.includes([ "dark", "light" ], ctrl.theme) ? ctrl.theme : "light";
            ctrl.iconClass = ctrl.iconClass || ctrl.theme != "dark" ? "text-white" : "";
            ctrl.size = _.includes([ "big", "small" ], _.toLower(ctrl.size)) ? ctrl.size : "small";
            ctrl.people = ctrl.people || {};
            ctrl.max = ctrl.max || ctrl.people.adults;
            ctrl.$$maxUnderages = _.max([ ctrl.people.boys, ctrl.people.children, ctrl.people.kids ]);
            ctrl.$$maxUnderages = ctrl.$$maxUnderages > ctrl.max ? ctrl.max : ctrl.$$maxUnderages;
            ctrl.$$peopleDetails = {
                adults: ctrl.people.adults
            };
            ctrl.extraMax = ctrl.extraMax || (ctrl.extraPeople ? _.max([ ctrl.extraPeople.adults, ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids ]) : 0);
            ctrl.$$extra$$maxUnderages = ctrl.extraPeople ? _.max([ ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids ]) : 0;
            ctrl.$$extra$$maxUnderages = ctrl.$$extra$$maxUnderages > ctrl.extraMax ? ctrl.extraMax : ctrl.$$extra$$maxUnderages;
            ctrl.$$extraPeopleDetails = ctrl.extraPeople && ctrl.extraPeople.adults ? {
                adults: ctrl.extraPeople.adults
            } : ctrl.extraPeople;
        };
        this.$openDetails = function(ev) {
            if (_.isBoolean(ctrl.hideDetails) ? !ctrl.hideDetails : true) {
                Dialog.paxDetails(ev, {
                    people: ctrl.people,
                    extraPeople: ctrl.extraPeople,
                    max: ctrl.max,
                    extraMax: ctrl.extraMax
                });
            }
        };
    }
})();

(function() {
    "use strict";
    PeopleInputCtrl.$inject = [ "$scope", "ReservationUtils" ];
    angular.module("itaca.components").component("chPeopleInput", {
        bindings: {
            containerClass: "@",
            inputLabel: "@",
            inputName: "@",
            people: "=",
            ngRequired: "<?",
            mdNoAsterisk: "<?",
            hasClose: "<?"
        },
        controller: PeopleInputCtrl,
        template: '<ng-form name="chPeopleInputForm">' + '<md-input-container class="{{$ctrl.containerClass}}">' + '<label><span ng-if="!$ctrl.inputLabel" translate="people.people"></span><span ng-if="$ctrl.inputLabel" ng-bind="$ctrl.inputLabel"></span></label>' + '<input type="area" name="{{$ctrl.inputName}}" ng-model="$ctrl.$$peopleSummary" class="clickable" on-click-panel=""/tpls/pax-counters.part"" has-backdrop="false"' + 'disable-parent-scroll="true" data="$ctrl.$$data" readonly ng-required="$ctrl.ngRequired" md-no-asterisk="mdNoAsterisk" has-close="$ctrl.hasClose">' + '<div ng-messages="chPeopleInputForm[$ctrl.inputName].$error">' + '<span ng-message="required"><span translate="error.required"></span></span>' + "</div>" + "</md-input-container>" + "</ng-form>"
    });
    function PeopleInputCtrl($scope, ReservationUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.containerClass = ctrl.containerClass || "md-block";
            ctrl.people = ctrl.people || {};
            ctrl.inputName = ctrl.inputName || "people";
            ctrl.mdNoAsterisk = _.isNil(ctrl.mdNoAsterisk) ? false : ctrl.mdNoAsterisk;
            ctrl.$$data = {
                people: ctrl.people
            };
            ctrl.$initWhatches();
        };
        this.$observeOriginal = function() {
            ctrl.$$data = ctrl.$$data || {};
            ctrl.$$data.people = ctrl.people;
        };
        this.$observeWorking = function() {
            _.assign(ctrl.people, ctrl.$$data.people);
            ReservationUtils.peopleSummary(ctrl.$$data.people).then(function(summary) {
                ctrl.$$peopleSummary = summary;
            });
        };
        this.$initWhatches = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, ctrl.$observeOriginal);
            $scope.$watchCollection(function() {
                return ctrl.$$data.people;
            }, ctrl.$observeWorking);
        };
    }
})();

(function() {
    "use strict";
    PeoplePickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "ReservationUtils" ];
    PeoplePickerCtrl.$inject = [ "$scope", "mdPanelRef" ];
    angular.module("itaca.components").component("chPeoplePicker", {
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
            labelClass: "@",
            people: "=",
            fieldName: "@",
            ngRequired: "<?",
            ngDisabled: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            hasClose: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            clickOutsideToClose: "<?",
            onClose: "&?",
            zIndex: "@",
            fullscreen: "<?",
            maxCount: "<?",
            minCount: "<?",
            errorMessages: "<?",
            showErrorIcon: "<?"
        },
        controller: PeoplePickerTriggerCtrl,
        templateUrl: "/tpls/people-picker/people-picker-trigger.tpl"
    });
    function PeoplePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, ReservationUtils) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.fieldName = ctrl.fieldName || "people";
            ctrl.clickOutsideToClose = ctrl.clickOutsideToClose || true;
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.$$panelClass = "bg-white md-whiteframe-15dp";
            var position = $mdPanel.newPanelPosition().relativeTo($element).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$panelConfig = {
                attachTo: angular.element(document.body),
                controller: PeoplePickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/people-picker/people-picker.tpl",
                position: position,
                clickOutsideToClose: ctrl.clickOutsideToClose,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: ctrl.hasBackdrop,
                fullscreen: _.isBoolean(ctrl.fullscreen) ? ctrl.fullscreen : false,
                panelClass: ctrl.$$panelClass,
                locals: {
                    data: ctrl.$$workingData,
                    maxCount: ctrl.maxCount,
                    hasConfirm: ctrl.hasConfirm,
                    hasClose: ctrl.hasClose
                },
                onCloseSuccess: function(panelRef, closeReason) {
                    var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
                    if (!tbc || _.isBoolean(closeReason) && closeReason) {
                        _.assign(ctrl.people, ctrl.$$workingData.people);
                        ctrl.onClose && ctrl.onClose({
                            $people: ctrl.people
                        });
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
                }
            };
            if (ctrl.zIndex) {
                ctrl.$$panelConfig.zIndex = ctrl.zIndex;
            }
            ctrl.$initWatchers();
        };
        this.$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.people = ctrl.people || {};
            ctrl.$$workingData = {
                people: angular.copy(ctrl.people)
            };
            ctrl.$$panelConfig.openFrom = ev;
            ctrl.$$panelConfig.locals = {
                hasConfirm: ctrl.hasConfirm,
                hasClose: ctrl.hasClose
            };
            ctrl.$$panelConfig.locals.data = ctrl.$$workingData;
            ctrl.$$panelConfig.locals.maxCount = ctrl.maxCount;
            $mdPanel.open(ctrl.$$panelConfig);
        };
        this.$checkPeople = function() {
            ctrl.$$hasPeople = ctrl.people && (ctrl.people.adults || ctrl.people.boys || ctrl.people.children || ctrl.people.kids);
            var mc = $scope.chPeoplePickerForm[ctrl.fieldName];
            if (mc) {
                ctrl.$$hasPeople && mc.$setDirty();
                if (ctrl.minCount) {
                    var count = ReservationUtils.guestsCount(ctrl.people);
                    if (count && count.standard < ctrl.minCount) {
                        mc.$setValidity("min", false);
                    } else {
                        mc.$setValidity("min", true);
                    }
                }
            }
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, function(newVal, oldVal) {
                ctrl.$checkPeople();
            });
            $scope.$watchCollection(function() {
                return ctrl.minCount;
            }, function(newVal, oldVal) {
                ctrl.$checkPeople();
            });
        };
    }
    function PeoplePickerCtrl($scope, mdPanelRef) {
        var ctrl = this;
        this.$init = function() {
            ctrl.$peopleCount(ctrl.data.people);
        };
        this.$peopleCount = function(peopleObj) {
            if (!ctrl.maxCount || !peopleObj) {
                return;
            }
            var tot = 0;
            if (!_.isNil(peopleObj.adults) && peopleObj.adults > 0) {
                tot += parseInt(peopleObj.adults);
            }
            if (!_.isNil(peopleObj.children) && peopleObj.children > 0) {
                tot += parseInt(peopleObj.children);
            }
            if (!_.isNil(peopleObj.boys) && peopleObj.boys > 0) {
                tot += parseInt(peopleObj.boys);
            }
            if (!_.isNil(peopleObj.kids) && peopleObj.kids > 0) {
                tot += parseInt(peopleObj.kids);
            }
            ctrl.data.plusDisabled = tot >= ctrl.maxCount ? true : false;
        };
        $scope.$watchCollection(function() {
            return ctrl.data.people;
        }, ctrl.$init);
        ctrl.$init();
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.confirm = function() {
            mdPanelRef && mdPanelRef.close(true);
        };
    }
})();

(function() {
    "use strict";
    PeopleSummaryCtrl.$inject = [ "$scope", "ReservationUtils", "$translate" ];
    angular.module("itaca.components").component("chPeopleSummary", {
        bindings: {
            people: "<",
            extraPeople: "<?",
            noDetails: "<?"
        },
        controller: PeopleSummaryCtrl,
        template: "<span>{{$ctrl.$$peopleSummary}}</span>"
    });
    function PeopleSummaryCtrl($scope, ReservationUtils, $translate) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$updateSummary = function() {
            if (ctrl.noDetails) {
                var guestsCount = ReservationUtils.guestsCount(ctrl.people, ctrl.extraPeople);
                if (!guestsCount && guestsCount.total <= 0) {
                    $translate("people.none").then(function(message) {
                        ctrl.$$peopleSummary = message;
                    });
                } else {
                    $translate("people.pax").then(function(message) {
                        ctrl.$$peopleSummary = _.toLower(guestsCount.total + " " + message);
                    });
                }
            } else {
                ReservationUtils.peopleSummary(ctrl.people, ctrl.extraPeople).then(function(message) {
                    ctrl.$$peopleSummary = message;
                });
            }
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, ctrl.$updateSummary);
            $scope.$watchCollection(function() {
                return ctrl.extraPeople;
            }, ctrl.$updateSummary);
            $scope.$watchCollection(function() {
                return ctrl.noDetails;
            }, ctrl.$updateSummary);
        };
    }
})();

(function() {
    "use strict";
    PhoneInputCtrl.$inject = [ "$scope", "$log", "REGEXP", "PhoneList" ];
    angular.module("itaca.components").component("chPhoneInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            inputName: "@",
            label: "@",
            placeholder: "@",
            prefixLabel: "@",
            prefixPlaceholder: "@",
            searchPlaceholder: "@",
            ngPattern: "<",
            ngRequired: "=?",
            ngDisabled: "=?",
            errorMessages: "<",
            prefixErrorMessages: "<",
            noAsterisk: "<"
        },
        controller: PhoneInputCtrl,
        template: '<ng-form name="chPhoneInputForm" ng-class="{\'text-gray-light cursor-disabled\': $ctrl.ngDisabled}" layout>' + "<div>" + '<md-input-container class="md-block">' + '<label ng-show="$ctrl.prefixLabel">{{$ctrl.prefixLabel}}</label>' + '<md-select name="prefix" placeholder="{{$ctrl.prefixPlaceholder}}" ng-model="phone.prefix" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" ' + 'ng-attr-md-no-asterisk="$ctrl.noAsterisk" md-container-class="selectHeader" aria-label="prefix" md-on-close="$ctrl.$clearSearchTerm()">' + '<md-subheader class="no-padding">' + '<md-select-header class="select-header bg-white">' + '<input ng-model="$ctrl.$$searchTerm.value" type="search" ng-keydown="$event.stopPropagation()" placeholder="{{$ctrl.searchPlaceholder}}"' + 'class="header-searchbox md-text" autofocus>' + "</md-select-header>" + "</md-subheader>" + '<md-option ng-repeat="prefix in $ctrl.prefixes | filter:searchTerm.value" ng-value="prefix" ng-selected="prefix.dial_code == $ctrl.$$phone.prefix.dial_code">' + '<span class="flag-icon flag-icon-{{::prefix.code}}"></span>' + "<strong>&nbsp;{{::prefix.name}}</strong>" + "<span>&nbsp;({{::prefix.dial_code}})</span>" + "</md-option>" + "</md-select>" + '<div ng-if="$ctrl.prefixErrorMessages" ng-messages="chPhoneInputForm.prefix.$error">' + '<div ng-repeat="errMsg in $ctrl.prefixErrorMessages track by $index" ng-message="{{errMsg.error}}">{{errMsg.message}}</div>' + "</div>" + "</md-input-container>" + "</div>" + "<div flex>" + '<md-input-container class="md-block no-padding-important">' + '<label ng-if="$ctrl.label">{{$ctrl.label}}</label>' + '<input type="text" name="{{$ctrl.inputName}}" placeholder="{{$ctrl.placeholder}}" ng-model="$ctrl.$$phone.number" ng-pattern="$ctrl.ngPattern" ' + '\tng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" aria-label="{{$ctrl.label || $ctrl.placeholder}}">' + '<div ng-if="$ctrl.errorMessages" ng-messages="chPhoneInputForm[$ctrl.inputName].$error">' + '<div ng-repeat="errMsg in $ctrl.errorMessages track by $index" ng-message="{{errMsg.error}}">{{errMsg.message}}</div>' + "</div>" + "</md-input-container>" + "</div>" + "</ng-form>"
    });
    function PhoneInputCtrl($scope, $log, REGEXP, PhoneList) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.noAsterisk = _.isBoolean(ctrl.noAsterisk) ? ctrl.noAsterisk : false;
            ctrl.inputName = ctrl.inputName || "phone";
            ctrl.ngPattern = ctrl.ngPattern || REGEXP.phone;
            ctrl.$$phone = {};
            ctrl.$$searchTerm = {
                value: ""
            };
            ctrl.$decompilePhone();
            ctrl.$loadPrefixes();
            ctrl.$initWatchers();
        };
        this.$loadPrefixes = function() {
            PhoneList.all().then(function(data) {
                _.forEach(data.content, function(value) {
                    value.code = value.code.toLowerCase();
                });
                ctrl.prefixes = data.content;
            }, function(error) {
                $log.error(error);
            });
        };
        this.$decompilePhone = function() {
            ctrl.$$phone = ctrl.$$phone || {};
            if (!ctrl.ngModel) {
                return;
            }
            PhoneList.decompile(ctrl.ngModel).then(function(data) {
                _.assign(ctrl.$$phone, data);
                if (!_.isObject(data.prefix)) {
                    ctrl.$$phone.prefix = {
                        dial_code: data.prefix
                    };
                }
            }, function(error) {
                _.assign(ctrl.$$phone, PhoneList.decompileSimple(ctrl.ngModel));
                ctrl.$$phone.prefix = {
                    dial_code: ctrl.$$phone.prefix
                };
            });
        };
        this.$clearSearchTerm = function() {
            ctrl.$$searchTerm.value = "";
        };
        this.$updateModel = function() {
            ctrl.ngModel = ctrl.$$phone && ctrl.$$phone.prefix && ctrl.$$phone.prefix.dial_code ? PhoneList.compile(ctrl.$$phone.prefix.dial_code, ctrl.$$phone.number) : ctrl.ngModel;
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.$$phone;
            }, function(newVal, oldVal) {
                ctrl.$updateModel();
            });
        };
    }
})();

(function() {
    "use strict";
    PlanningHeaderCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chPlanningHeader", {
        require: {
            chPlanningCtrl: "^^chPlanning"
        },
        bindings: {
            imgBaseUrl: "@?"
        },
        controller: PlanningHeaderCtrl,
        templateUrl: "/tpls/planning/planning-header.tpl"
    });
    function PlanningHeaderCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.DEFAULT_IMG_BASE_URL = "resources/public/img/seasons/";
        this.$onInit = function() {
            ctrl.$initBaseUrl();
            ctrl.$changeBg();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.imgBaseUrl) {
                ctrl.$initBaseUrl();
            }
        };
        this.$initBaseUrl = function() {
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.DEFAULT_IMG_BASE_URL;
            _.startsWith(ctrl.imgBaseUrl, "/") ? ctrl.imgBaseUrl.substr(1) : ctrl.imgBaseUrl;
            _.endsWith(ctrl.imgBaseUrl, "/") ? ctrl.imgBaseUrl : ctrl.imgBaseUrl + "/";
        };
        this.$onMonthChange = function() {
            ctrl.$changeBg();
            ctrl.chPlanningCtrl.$setStartDate(ctrl.chPlanningCtrl.$$startDate);
        };
        this.$getMonthLabel = function() {
            var months = ctrl.chPlanningCtrl.$getSelectedMonths();
            var label = "";
            _.forEach(months, function(month, idx) {
                var month = moment({
                    month: months[idx],
                    day: 1
                }).format("MMMM");
                label += idx > 0 ? " - " + month : month;
            });
            return label;
        };
        this.$changeBg = function() {
            var month = moment(ctrl.chPlanningCtrl.$$startDate).month();
            var bgImg = "";
            if (month >= 2 && month <= 4) {
                bgImg = "spring.png";
            } else if (month >= 5 && month <= 7) {
                bgImg = "summer.png";
            } else if (month >= 8 && month <= 10) {
                bgImg = "autumn.png";
            } else {
                bgImg = "winter.png";
            }
            ctrl.$$bgImage = "url(" + ctrl.imgBaseUrl + bgImg + ")";
        };
        this.$goToToday = function() {
            ctrl.chPlanningCtrl.$setStartDate();
            ctrl.$changeBg();
        };
        this.$prevWeek = function() {
            ctrl.chPlanningCtrl.$setStartDate(moment(ctrl.chPlanningCtrl.$$startDate).subtract(1, "weeks"));
            ctrl.$changeBg();
        };
        this.$nextWeek = function() {
            ctrl.chPlanningCtrl.$setStartDate(moment(ctrl.chPlanningCtrl.$$startDate).add(1, "weeks"));
            ctrl.$changeBg();
        };
        this.$dailyView = function() {
            ctrl.chPlanningCtrl.$setView("D");
        };
        this.$weeklyView = function() {
            ctrl.chPlanningCtrl.$setView("W");
        };
        this.$monthlyView = function() {
            ctrl.chPlanningCtrl.$setView("M");
        };
    }
})();

(function() {
    "use strict";
    PlanningRoomCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chPlanningRoom", {
        require: {
            chPlanningCtrl: "^^chPlanning"
        },
        bindings: {
            room: "<",
            dates: "<",
            reservations: "<?"
        },
        controller: PlanningRoomCtrl,
        templateUrl: "/tpls/planning/planning-room.tpl"
    });
    function PlanningRoomCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.$initDates();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.dates) {
                ctrl.$initDates();
            } else if (changesObj.reservations) {
                ctrl.$initReservations();
            }
        };
        this.$initDates = function() {
            ctrl.$$viewDates = angular.copy(ctrl.dates);
            ctrl.$$startDate = _.minBy(ctrl.$$viewDates, function(date) {
                return date.getTime();
            });
            ctrl.$$endDate = _.minBy(ctrl.$$viewDates, function(date) {
                return date.getTime();
            });
            ctrl.$initReservations();
        };
        this.$initReservations = function() {
            var start = moment(ctrl.$$startDate);
            var end = moment(ctrl.$$endDate);
            var daySize = 100 / _.size(ctrl.$$viewDates);
            _.forEach(ctrl.$$viewDates, function(viewDate) {
                viewDate.$reservations = _.filter(ctrl.reservations, function(res) {
                    var isThisRoom = _.some(res.rooms, function(roomSold) {
                        return _.some(roomSold.dailyDetails, function(dailyDetail) {
                            return dailyDetail.date.isSame(moment(viewDate.date), "days") && _.isEqual(room.id, ctrl.room.id);
                        });
                    });
                    if (!isThisRoom) {
                        return false;
                    }
                    var checkin = moment(res.checkin);
                    var checkout = moment(res.checkout);
                    var days = Math.abs(checkin.diff(checkout.isAfter(end, "days") ? end : checkout));
                    if (checkin.isSame(moment(viewDate.date), "days")) {
                        res.position = {
                            left: daySize * Math.abs(start.diff(checkin, "days")),
                            width: daySize * days
                        };
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        };
    }
})();

(function() {
    "use strict";
    PlanningCtrl.$inject = [ "$scope", "$mdMedia", "InfinitePaging" ];
    angular.module("itaca.components").component("chPlanning", {
        transclude: true,
        bindings: {
            rooms: "<",
            reservations: "<",
            view: "<?",
            startDate: "<?",
            onPeriodChange: "&?"
        },
        controller: PlanningCtrl,
        templateUrl: "/tpls/planning/planning.tpl"
    });
    function PlanningCtrl($scope, $mdMedia, InfinitePaging) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.$initRooms();
            ctrl.$setView(ctrl.view);
            ctrl.$setStartDate(ctrl.startDate);
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.rooms) {
                ctrl.$initRooms();
            }
            if (changesObj.startDate) {
                ctrl.$setStartDate(ctrl.startDate);
            }
            if (changesObj.view) {
                ctrl.$setView(ctrl.view);
            }
        };
        this.$initRooms = function() {
            if (_.isArray(ctrl.rooms)) {
                ctrl.$$roomsType = "1";
            } else if (_.isObjectLike(ctrl.rooms) && ctrl.rooms instanceof InfinitePaging) {
                ctrl.$$roomsType = "2";
                ctrl.rooms.reset();
            } else {
                throw new Error("Rooms must be an array or an instance of InfinitePaging");
            }
        };
        this.$setView = function(type) {
            ctrl.$$currentView = _.includes([ "D", "W", "M" ], type) ? type : "W";
            ctrl.$setStartDate(ctrl.$$startDate);
        };
        this.$setStartDate = function(date, notRefresh) {
            date = angular.isDate(date) ? date : moment.isMoment(date) && date.isValid() ? date.toDate() : moment().startOf("day").toDate();
            switch (ctrl.$$currentView) {
              case "D":
                ctrl.$$startDate = date;
                ctrl.$$endDate = moment(date).endOf("day").toDate();
                break;

              case "W":
                ctrl.$$startDate = date;
                ctrl.$$endDate = moment(date).add(6, "days").toDate();
                break;

              case "M":
                ctrl.$$startDate = moment(date).startOf("month").toDate();
                ctrl.$$endDate = moment(date).endOf("month").toDate();
                break;
            }
            if (!notRefresh) {
                ctrl.$createDates();
                ctrl.onPeriodChange && ctrl.onPeriodChange({
                    $start: ctrl.$$startDate,
                    $end: ctrl.$$endDate
                });
            }
        };
        this.$createDates = function() {
            ctrl.$$loading = true;
            ctrl.$$today = moment().startOf("day").toDate();
            var range = moment.range(moment(ctrl.$$startDate), moment(ctrl.$$endDate));
            var months = [];
            var viewDates = [];
            Array.from(range.by("days"), function(m) {
                months.push(m.month());
                var d = m.toDate();
                this.push({
                    uid: d.getTime(),
                    date: d,
                    isPast: m.isBefore(moment(), "days"),
                    hotelStatus: null
                });
            }, viewDates);
            ctrl.$$viewDates = viewDates;
            months = _.uniq(months);
            var monthLabel = "";
            _.forEach(months, function(month, idx) {
                var month = moment({
                    month: months[idx],
                    day: 1
                }).format("MMMM");
                monthLabel += idx > 0 ? " - " + month : month;
            });
            ctrl.$$multiMonths = _.size(months) > 1;
            ctrl.$$monthLabel = monthLabel;
            ctrl.$$loading = false;
        };
        this.$getSelectedMonths = function() {
            ctrl.$setStartDate(ctrl.$$startDate, true);
            var range = moment.range(moment(ctrl.$$startDate), moment(ctrl.$$endDate));
            var months = [];
            Array.from(range.by("days"), function(m) {
                this.push(m.month());
            }, months);
            return _.uniq(months);
        };
    }
})();

(function() {
    "use strict";
    PriceRangePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia" ];
    angular.module("itaca.components").component("chPriceRangePicker", {
        bindings: {
            min: "=?",
            max: "=?",
            title: "@",
            subtitle: "@",
            wrapperClass: "@",
            buttonClass: "@",
            type: "@",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            hasClose: "<?",
            ngDisabled: "<?"
        },
        controller: PriceRangePickerCtrl,
        template: '<ng-form name="chPriceRangePickerForm" class="flex no-padding layout-column">' + '<md-button class="ch-price-range-picker-button flex minimal-button text-initial {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change price range" ng-disabled="$ctrl.ngDisabled">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div ng-show="$ctrl.max" class="text-wrap row-mini">' + '<strong ng-show="$ctrl.min">{{$ctrl.min|chCurrency}}&nbsp;-&nbsp;</strong>' + '<span ng-show="!$ctrl.min"><span translate="common.up.to"></span>&nbsp;</span>' + '<strong>{{$ctrl.max|chCurrency}}</strong>&nbsp;<span ng-if="$ctrl.type == \'nightly\'" class="text-lowercase" translate="service.type.payment.NIGHTLY"></span>' + "</div>" + '<div ng-show="!$ctrl.max">' + '<span translate="filter.by"></span>&nbsp;<span class="text-lowercase" translate="common.price"></span>' + "</div>" + "</div>" + "</md-button>" + "</ng-form>"
    });
    function PriceRangePickerCtrl($scope, $element, $mdPanel, $mdMedia) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.type = _.includes([ "nightly", "normal" ], _.toLower(ctrl.type)) ? _.toLower(ctrl.type) : "normal";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            var targetEl = $element[0].querySelector(".ch-price-range-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: "priceSliderCtrl",
                controllerAs: "ctrl",
                templateUrl: "/tpls/reservation-price-slider.part",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-sm") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-sm"),
                panelClass: "panel-medium bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true;
                    if (!tbc || _.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
                }
            };
        };
        this.$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.$$data = {
                min: ctrl.min,
                max: ctrl.max
            };
            var locals = {
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
                title: ctrl.title,
                subtitle: ctrl.subtitle,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-sm") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-sm");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            ctrl.min = ctrl.$$data.min;
            ctrl.max = ctrl.$$data.max;
        };
    }
})();

(function() {
    "use strict";
    RateAmountInputCtrl.$inject = [ "$scope", "REGEXP", "$translate", "NumberUtils", "Locale" ];
    angular.module("itaca.components").component("chRateAmountInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            ngMin: "<?",
            inputName: "@",
            promotion: "<?",
            errorMessages: "@",
            cssClass: "@",
            hideIcon: "@",
            iconClass: "@",
            readOnlyView: "<?",
            hideInitialValue: "<?",
            showOriginalValue: "<?",
            originalValueClass: "<?",
            originalValueLabel: "<?",
            ngDisabled: "<?",
            disabledLimit: "<?",
            hideRefreshIcon: "<?",
            refreshIconClass: "@",
            allowNegative: "<?",
            onUpdate: "&?"
        },
        controller: RateAmountInputCtrl,
        templateUrl: "/tpls/rate-amount-input/rate-amount-input.tpl"
    });
    function RateAmountInputCtrl($scope, REGEXP, $translate, NumberUtils, Locale) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngModel.$originalValue = ctrl.ngModel.$originalValue || angular.copy(ctrl.ngModel);
            ctrl.hideInitialValue = _.isBoolean(ctrl.hideInitialValue) ? ctrl.hideInitialValue : false;
            ctrl.$$pattern = _.isBoolean(ctrl.allowNegative) && ctrl.allowNegative ? REGEXP.priceNoStrict : REGEXP.price;
            ctrl.$$currentLang = Locale.current();
            ctrl.cssClass = ctrl.cssClass || "font-18 no-margin minimal-input max-width-130px ";
            ctrl.iconClass = ctrl.iconClass || "mdi mdi-pencil md-18 text-primary material-icons";
            ctrl.originalValueClass = ctrl.originalValueClass || "md-caption text-gray-light";
            ctrl.refreshIconClass = ctrl.refreshIconClass || "mdi mdi-refresh md-18 material-icons";
            if (!ctrl.originalValueLabel) {
                $translate("common.amount.original").then(function(translate) {
                    ctrl.originalValueLabel = translate;
                }, _.stubFalse());
            }
            ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            ctrl.readOnlyView = _.isBoolean(ctrl.readOnlyView) ? ctrl.readOnlyView : false;
            ctrl.showOriginalValue = _.isBoolean(ctrl.showOriginalValue) ? ctrl.showOriginalValue : false;
            if (!ctrl.ngModel.initialAmount || ctrl.ngModel.initialAmount == ctrl.ngModel.finalAmount) {
                ctrl.ngModel.initialAmount = ctrl.ngModel.initialAmount !== 0 ? ctrl.ngModel.finalAmount : ctrl.ngModel.initialAmount;
            }
            if (ctrl.disabledLimit) {
                ctrl.max = false;
            } else {
                ctrl.max = ctrl.ngModel.initialAmount;
                if (ctrl.promotion && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount) {
                    var discountPrice = 0;
                    if (ctrl.promotion.discount.type == "PERCENTAGE") {
                        discountPrice = NumberUtils.calculateDiscount(ctrl.ngModel.initialAmount, ctrl.promotion.discount.finalAmount, "PERCENTAGE");
                    } else {
                        discountPrice = ctrl.promotion.discount.finalAmount;
                    }
                    ctrl.max = ctrl.max - discountPrice;
                }
            }
            ctrl.$initWatchers();
        };
        this.$refreshPrice = function() {
            if (ctrl.ngModel && ctrl.ngModel.$originalValue) {
                ctrl.ngModel.finalAmount = angular.copy(ctrl.ngModel.$originalValue.finalAmount);
                ctrl.ngModel.initialAmount = angular.copy(ctrl.ngModel.$originalValue.initialAmount);
                angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({
                    value: ctrl.ngModel
                });
            }
        };
        this.$adeguateAmount = function() {
            if (ctrl.ngModel.$originalValue && ctrl.ngModel.finalAmount != ctrl.ngModel.$originalValue.finalAmount) {
                if (!_.isNil(ctrl.promotion) && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount) {
                    var discountPrice = 0;
                    if (ctrl.promotion.discount.type == "PERCENTAGE") {
                        discountPrice = 100 * ctrl.ngModel.finalAmount / (100 - ctrl.promotion.discount.finalAmount);
                    } else {
                        discountPrice = ctrl.ngModel.finalAmount + ctrl.promotion.discount.finalAmount;
                    }
                    ctrl.ngModel.initialAmount = discountPrice;
                } else if (ctrl.ngModel.initialAmount < ctrl.ngModel.finalAmount) {
                    ctrl.ngModel.initialAmount = ctrl.ngModel.finalAmount;
                }
                angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({
                    value: ctrl.ngModel
                });
            }
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.ngModel.finalAmount;
            }, function(newVal, oldVal) {
                ctrl.$adeguateAmount();
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetAvailabilityCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetAvailability", {
        bindings: {
            availability: "<",
            onClick: "&?"
        },
        controller: RatesheetAvailabilityCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-availability.tpl"
    });
    function RatesheetAvailabilityCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {};
        this.$click = function(ev) {
            ctrl.onClick && ctrl.onClick({
                $event: ev,
                $date: ctrl.availability.date
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetHeaderCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetHeader", {
        bindings: {
            header: "<",
            onToggleClosing: "&?"
        },
        controller: RatesheetHeaderCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-header.tpl"
    });
    function RatesheetHeaderCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {};
        this.$toggleRoomTypeClosing = function(ev) {
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $date: ctrl.header.date,
                $closed: _.isBoolean(ctrl.header.roomClosed) ? !ctrl.header.roomClosed : false
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetPromotionEditCtrl.$inject = [ "$scope", "$mdMedia", "REGEXP" ];
    angular.module("itaca.components").component("chRatesheetPromotionEdit", {
        bindings: {
            promotion: "<",
            type: "@",
            onSaveMinStay: "&?"
        },
        controller: RatesheetPromotionEditCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-promotion-edit.tpl"
    });
    function RatesheetPromotionEditCtrl($scope, $mdMedia, REGEXP) {
        this.$mdMedia = $mdMedia;
        this.REGEXP = REGEXP;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initPromotion();
        };
        this.$initPromotion = function() {
            ctrl.type = ctrl.type || "STANDARD";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.promotion || changesObj.type) {
                ctrl.$initPromotion();
            }
        };
        this.$saveMinStay = function() {
            var form = $scope.chRatesheetPromotionForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.minStay.$setTouched();
                return;
            }
            ctrl.onSaveMinStay && ctrl.onSaveMinStay({
                $promotion: ctrl.promotion,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetPromotionCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetPromotion", {
        bindings: {
            promotion: "<",
            type: "@",
            onToggleClosing: "&?"
        },
        controller: RatesheetPromotionCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-promotion.tpl"
    });
    function RatesheetPromotionCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initPromotion();
        };
        this.$initPromotion = function() {
            ctrl.type = ctrl.type || "STANDARD";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.promotion || changesObj.type) {
                ctrl.$initPromotion();
            }
        };
        this.$toggleClosing = function(ev) {
            var close = _.isBoolean(ctrl.promotion.enabled) ? ctrl.promotion.enabled : false;
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $promotion: ctrl.promotion,
                $type: ctrl.type,
                $closed: close
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateEditAmountCtrl.$inject = [ "$scope", "$mdMedia", "REGEXP" ];
    angular.module("itaca.components").component("chRatesheetRateEditAmount", {
        bindings: {
            rate: "=",
            type: "@",
            label: "@",
            ngDisabled: "<?",
            ngRequired: "<?",
            errorMessages: "<?",
            errorIcon: "<?",
            errorBg: "<?",
            validateOnInit: "<?",
            updateOn: "@",
            onChange: "&?"
        },
        controller: RatesheetRateEditAmountCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate-edit-amount.tpl"
    });
    function RatesheetRateEditAmountCtrl($scope, $mdMedia, REGEXP) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.REGEXP = REGEXP;
        this.$$hasIconLeftClass = false;
        this.$onInit = function() {
            ctrl.$initRate();
            ctrl.$initUpdateMode();
            ctrl.$initErrorIcon();
            ctrl.$initErrorBg();
        };
        this.$postLink = function() {
            if (ctrl.validateOnInit) {
                $scope.chRatesheetRateDataForm.$setSubmitted();
            }
        };
        this.$initRate = function() {
            ctrl.rate = _.isPlainObject(ctrl.rate) ? ctrl.rate : {};
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.rate.type = ctrl.type;
        };
        this.$initUpdateMode = function() {
            ctrl.updateOn = _.includes([ "default", "blur" ], ctrl.updateOn) ? ctrl.updateOn : "default";
        };
        this.$initErrorIcon = function() {
            ctrl.errorIcon = _.isNil(ctrl.errorIcon) || _.isBoolean(ctrl.errorIcon) && ctrl.errorIcon ? "mdi mdi-alert" : ctrl.errorIcon;
        };
        this.$initErrorBg = function() {
            ctrl.errorBg = _.isNil(ctrl.errorBg) || _.isBoolean(ctrl.errorBg) && ctrl.errorBg ? "bg-warn opaque" : ctrl.errorBg;
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
            if (changesObj.updateOn) {
                ctrl.$initUpdateMode();
            }
            if (changesObj.errorIcon) {
                ctrl.$initErrorIcon();
            }
            if (changesObj.errorBg) {
                ctrl.$initErrorBg();
            }
        };
        this.$onChange = function() {
            var form = $scope.chRatesheetRateDataForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.amount.$setTouched();
                return;
            }
            ctrl.onChange && ctrl.onChange({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateEditCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetRateEdit", {
        bindings: {
            rate: "<",
            type: "@",
            hideRate: "<",
            hideRestrictions: "<",
            onSave: "&?",
            onSaveMinStay: "&?"
        },
        controller: RatesheetRateEditCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate-edit.tpl"
    });
    function RatesheetRateEditCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initRate();
        };
        this.$initRate = function() {
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.$$isStandard = ctrl.type == "STANDARD";
            ctrl.$$rateDataKey = ctrl.$$isStandard ? "standard" : "notRefundable";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
        };
        this.$saveMinStay = function() {
            var form = $scope.chRatesheetRateForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.minStay.$setTouched();
                return;
            }
            ctrl.onSaveMinStay && ctrl.onSaveMinStay({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
        this.$saveRate = function() {
            var form = $scope.chRatesheetRateForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.amount.$setTouched();
                return;
            }
            ctrl.onSave && ctrl.onSave({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetRate", {
        bindings: {
            rate: "<",
            type: "@",
            onToggleClosing: "&?"
        },
        controller: RatesheetRateCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate.tpl"
    });
    function RatesheetRateCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initRate();
        };
        this.$initRate = function() {
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.$$isStandard = ctrl.type == "STANDARD";
            ctrl.$$rateDataKey = ctrl.$$isStandard ? "standard" : "notRefundable";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
        };
        this.$toggleRateClosing = function(ev) {
            var rateData = ctrl.rate[ctrl.$$rateDataKey];
            var close = rateData && rateData.enabled;
            close = _.isBoolean(close) ? close : false;
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $rate: ctrl.rate,
                $type: ctrl.type,
                $closed: close
            });
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewActionsContent", {
        transclude: true,
        require: {
            chReviewActionsCtrl: "^chReviewActions"
        },
        controller: ReviewActionsContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewActionsContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewActionsCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewActionsCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewActionsCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chReviewActions", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            actions: "<?"
        },
        controller: ReviewActionsCtrl,
        template: '<div flex ng-if="!$ctrl.noDefault && !$ctrl.hideAction">' + "<md-divider></<md-divider>" + '<div class="flex layout-row layout-wrap">' + '<div ng-repeat="action in $ctrl.actions" ng-if="!action.hide" ng-class="{\'flex-33\': $ctrl.actions.length <= 3, \'flex\': $ctrl.actions.length > 3}" layout>' + '<div class="flex layout-column">' + '<md-button class="no-margin {{btnClass}}" ng-disabled="action.disabled" ng-click="$ctrl.$actionClick($event, action)" aria-label="{{action.label}}">' + '<md-icon ng-if="action.icon" class="{{::action.icon}} material-icons"></md-icon>&nbsp;' + '<span ng-if="action.label" class="text-initial" ng-bind-html="action.label"></span>' + "</md-button>" + "</div>" + "<md-divider></<md-divider>" + "</div>" + "</div>" + "<md-divider></<md-divider>" + "</div>"
    });
    function ReviewActionsCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideAction = _.isEmpty(ctrl.actions) ? true : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$actionClick = function(ev, action) {
            action.onClick && action.onClick.apply(this, [ ev, ctrl.review ].concat(action.onClickParams));
        };
    }
})();

(function() {
    "use strict";
    ReviewContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chReviewContent", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            showDate: "<",
            dateFormat: "@"
        },
        controller: ReviewContentCtrl,
        template: "<div>" + '<div class="layout-row layout-wrap layout-align-center-center layout-padding">' + '<div class="layout-column flex-xs-100 flex-sm-100 flex-gt-sm">' + '<div ng-show="!$ctrl.review.showDetails">' + '<div class="md-margin ng-scope no-margin-top no-margin-x-sides">' + '<small><span translate="review.score.total"></span>:</small>' + '<md-progress-linear md-mode="determinate" value="{{($ctrl.review.score * 10)}}"></md-progress-linear>' + "</div>" + "</div>" + '<div ng-show="$ctrl.review.showDetails">' + '<div ng-repeat="feedback in $ctrl.review.feedbacks track by $index" class="md-margin ng-scope no-margin-top no-margin-x-sides"' + 'title="{{::feedback.value}}" ng-switch="feedback.type">' + '<small class="layout-row flex-100"><span class="flex" translate="{{::feedback.titleKey}}" translate-values="{{feedback.titleParams}}"></span><span ng-if="feedback.type == \'RANK\'">{{::feedback.value}}</span></small>' + '<md-progress-linear ng-switch-when="RANK" md-mode="determinate" value="{{(feedback.value * 10)}}"></md-progress-linear>' + "<div ng-switch-default>" + '<small ng-if="feedback.value">{{feedback.value}}</small>' + '<small ng-if="!feedback.value" class="text-gray-light text-lowercase"><em>({{::(\'review.comment.none\'|translate)}})</em></small>' + "</div>" + "</div>" + "</div>" + '<div class="text-right">' + '<md-button class="auto-height no-margin row-1 text-capitalize text-gray-light text-small" ng-click="$ctrl.review.showDetails = !$ctrl.review.showDetails" aria-label="show details">' + '<span ng-if="!$ctrl.review.showDetails" translate="common.show"></span>' + '<span ng-if="$ctrl.review.showDetails" translate="common.hide"></span>' + '&nbsp;<span class="text-lowercase" translate="common.details"></span>' + "<md-icon ng-class=\"$ctrl.review.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'\" class=\"mdi md-18\"></md-icon>" + "</md-button>" + "</div>" + "</div>" + "<div class=\"flex-100 flex-gt-sm-25 layout-column\" ng-class=\"$ctrl.review.showDetails ? 'layout-align-center-center' : 'layout-align-start-center'\">" + '<small ng-if="$ctrl.review.showDetails" class="font-12 text-gray-light text-center" translate="review.score.total"></small>' + '<span class="md-headline">{{::$ctrl.review.score.toFixed(1)}}</span>' + '<span class="text-center" translate="{{$ctrl.review.label}}"></span>' + "</div>" + "</div>" + '<div class="overflow-hidden" ng-transclude></div>' + '<div ng-if="$ctrl.review.createdDate && $ctrl.showDate">' + "<md-divider></md-divider>" + '<div class="layout-padding text-gray-light">' + "<small>{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</small>" + "</div>" + "</div>" + "</div>"
    });
    function ReviewContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initReview();
            ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : false;
            ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            ctrl.review.showDetails = true;
        };
    }
})();

(function() {
    "use strict";
    ReviewGalleryCtrl.$inject = [ "AppOptions", "$translate", "Dialog" ];
    angular.module("itaca.components").component("chReviewGallery", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            imgBaseUrl: "@?",
            defaultImgUrl: "@?",
            title: "@"
        },
        controller: ReviewGalleryCtrl,
        template: '<div ng-if="$ctrl.review.gallery.length" flex layout-padding>' + '<div class="layout-row layout-wrap layout-padding-sm layout-align-center-center layout-align-gt-sm-start-center">' + '<span class="flex-100 font-12 ng-scope no-padding-bottom text-gray-light">' + '<span ng-if="!$ctrl.title"><span translate="common.gallery"></span>:</span>' + '<span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span>' + "</span>" + '<div ng-repeat="photo in $ctrl.review.gallery" class="clickable" ng-click="$ctrl.$openGallery($event, $index)" aria-label="Open review gallery">' + '<img ng-src="{{$ctrl.imgBaseUrl + photo.path}}" alt="{{photo.tags[0]}}" lazy-image' + 'default-img-url="{{$ctrl.defaultImgUrl}}" class="width-100">' + "</div>" + "</div>" + "</div>"
    });
    function ReviewGalleryCtrl(AppOptions, $translate, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.defaultImgUrl = ctrl.defaultImgUrl || "/resources/public/img/no-gallery-image.png";
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$openGallery = function(ev, idx) {
            $translate(ctrl.review.label).then(function(message) {
                var title = ctrl.review.score + ":&nbsp;";
                title += ctrl.review.title ? ctrl.review.title : message;
                Dialog.showGallery(ev, title, ctrl.review.gallery, {
                    storageUrl: ctrl.imgBaseUrl,
                    initialSlide: idx || 0
                });
            });
        };
    }
})();

(function() {
    "use strict";
    ReviewHotelInfoCtrl.$inject = [ "$scope", "AppOptions" ];
    angular.module("itaca.components").component("chReviewHotelInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            hideImage: "<?",
            imgBaseUrl: "@?"
        },
        controller: ReviewHotelInfoCtrl,
        template: '<div flex layout-padding class="md-subhead row-mini text-bold">' + '<a ng-href="{{\'/hotel/\'+ $ctrl.review.hotel.id}}" target="_blank" class="ch-review-hotel-info-link display-block clickable">' + '<span class="layout-row layout-align-start-center">' + '<img ng-if="!$ctrl.hideImage && $ctrl.$$hotelImage" class="md-margin menu-user-avatar-small no-margin-left no-margin-y-sides" ng-src="{{$ctrl.$$hotelImage}}">' + '<span class="no-padding layout-column">' + "<span>" + '<span class="text-primary">{{::$ctrl.review.hotel.name}}&nbsp;</span>' + '<span class="label label-xs" translate="hotel.type.{{::$ctrl.review.hotel.type}}"></span>' + "</span>" + '<small class="text-gray-light">' + "<span>{{::$ctrl.review.hotel.addressInfo.city}}</span>,&nbsp;" + "<span>{{::$ctrl.review.hotel.addressInfo.address}}</span>" + "</small>" + "</span>" + "</span>" + '<md-tooltip><span translate="hotel.go"></span></md-tooltip>' + "</a>" + "</div>"
    });
    function ReviewHotelInfoCtrl($scope, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideImage = _.isBoolean(ctrl.hideImage) ? ctrl.hideImage : false;
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.$initReview();
            ctrl.$getHotelImage();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$getHotelImage = function() {
            var hotelImage = null;
            _.forEach(ctrl.review.hotel.gallery, function(photo, index, collection) {
                if (index == 0) {
                    hotelImage = ctrl.imgBaseUrl + photo.path;
                }
                if (photo.cover) {
                    hotelImage = ctrl.imgBaseUrl + photo.path;
                    return false;
                }
            });
            ctrl.$$hotelImage = hotelImage;
        };
    }
})();

(function() {
    "use strict";
    ReviewLikesCtrl.$inject = [ "$scope", "AppOptions" ];
    angular.module("itaca.components").component("chReviewLikes", {
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            contentClass: "@"
        },
        controller: ReviewLikesCtrl,
        template: '<div ng-if="$ctrl.review.likes.length" class="{{$ctrl.contentClass}}" >' + "<small>" + '<md-icon class="mdi md-14 mdi-thumb-up text-primary"></md-icon>&nbsp;' + '<span ng-if="!$ctrl.review.helpful" class="text-lowercase">' + "<span>{{$ctrl.review.likes.length}}&nbsp;</span>" + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.count"></span>' + '<span ng-if="$ctrl.review.likes.length != 1" translate="review.likes.count.plur"></span>' + "</span>" + '<span ng-if="$ctrl.review.helpful">' + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.you"></span>' + '<span ng-if="$ctrl.review.likes.length > 1" ng-switch on="$ctrl.review.likes.length-1">' + '<span ng-switch-when="1" translate="review.likes.you.other"></span>' + '<span ng-switch-default translate="review.likes.you.others" translate-values="{num: $ctrl.review.likes.length-1}"></span>' + "</span>" + "</span>" + "</small>" + "</div>"
    });
    function ReviewLikesCtrl($scope, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-primary";
            ctrl.$initReview();
            ctrl.$initLikes();
            ctrl.$initWatchers();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$initLikes = function() {
            ctrl.review.helpful = AppOptions.guest && AppOptions.guest.id && _.some(ctrl.review.likes, function(userId) {
                return _.isEqual(userId, AppOptions.guest.id);
            });
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.review.likes;
            }, function(newVal, oldVal) {
                ctrl.$initLikes();
                ctrl.review.thanksNow = _.isEqual(newVal, oldVal) ? false : Boolean(ctrl.review.helpful);
            });
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewProCon", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            textLimit: "<?",
            showHint: "<?"
        },
        controller: ReviewProConCtrl,
        template: '<div ng-if="$ctrl.review.pro || $ctrl.review.con || ($ctrl.review.hint && $ctrl.showHint)" flex layout-padding>' + '<div ng-if="$ctrl.review.pro" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-up-outline text-success md-24"></md-icon>&nbsp;' + '<strong><span translate="review.pro"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.pro}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.review.con" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-down-outline text-warn md-24"></md-icon>&nbsp;' + '<strong><span translate="review.con"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.con}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.review.hint && $ctrl.showHint" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-message-text md-24"></md-icon>&nbsp;' + '<strong><span translate="common.hints"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.hint}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + "</div>"
    });
    function ReviewProConCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
            ctrl.showHint = _.isBoolean(ctrl.showHint) ? ctrl.showHint : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewReplyContent", {
        transclude: true,
        require: {
            chReviewReplyCtrl: "^chReviewReply"
        },
        controller: ReviewReplyContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewReplyContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewReplyCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewReplyCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewReplyCtrl.$inject = [ "$scope", "$q", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewReply", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            ngReadonly: "<?",
            ngEdit: "<?",
            showReply: "<?",
            replyTitle: "@",
            onReply: "&?",
            onCancelReply: "&?",
            responseClass: "@?",
            arrowClass: "@?"
        },
        controller: ReviewReplyCtrl,
        template: '<div ng-if="$ctrl.showReply || $ctrl.review.reply.response || $ctrl.noDefault" class="ch-review-reply">' + '<div class="ch-review-reply-arrow {{$ctrl.arrowClass}}"></div>' + '<div class="layout-padding no-padding ch-review-reply-inner {{$ctrl.responseClass}}">' + '<div ng-if="!$ctrl.noDefault" class="layout-padding">' + '<div class="layout-row layout-padding-sm no-padding layout-align-start-center">' + "<div flex>" + '<strong ng-if="!$ctrl.replyTitle"><span translate="common.answer"></span>:</strong>' + '<strong ng-if="$ctrl.replyTitle" ng-bind="$ctrl.replyTitle"></strong>' + "</div>" + '<md-button ng-if="$ctrl.$$currentMode == \'edit\'" class="no-margin auto-height row-1 text-lowercase text-gray-light" ' + 'ng-click="$ctrl.$cancelEdit($event, true)" aria-label="Cancel reply">' + '<small translate="common.cancel"></small>' + "</md-button>" + "</div>" + '<div ng-if="$ctrl.$$currentMode == \'view\'" class="layout-row layout-align-start-center no-padding-top no-padding-bottom no-padding-right">' + '<div class="flex text-wrap">' + '<span hm-read-more hm-text="{{$ctrl.review.reply.response}}" hm-limit="200" hm-more-text="{{\'common.read.more\'|translate}}"' + 'hm-less-text="{{\'common.read.less\'|translate}}" hm-link-class="clickable text-primary"></span>' + "</div>" + '<div ng-if="$ctrl.review.reply.response">' + '<div class="no-padding-left no-padding-right no-padding-bottom">' + '<md-button ng-if="!$ctrl.ngReadonly || $ctrl.ngEdit" class="no-margin text-lowercase text-gray-light" ng-class="{\'md-icon-button\': !$ctrl.$mdMedia(\'gt-sm\')}"' + 'ng-click="$ctrl.$edit()" aria-label="Edit reply">' + "<md-icon class=\"mdi mdi-pencil\" ng-class=\"{'md-18': !$ctrl.$mdMedia('gt-sm'), 'md-14': $ctrl.$mdMedia('gt-sm')}\"></md-icon>" + '<small hide show-gt-sm translate="common.edit"></small>' + '<md-tooltip hide-gt-sm><span translate="common.edit"></span></md-tooltip>' + "</md-button>" + "</div>" + "</div>" + "</div>" + '<div ng-if="$ctrl.$$currentMode == \'edit\'" class="no-padding-top no-padding-bottom no-padding-right">' + '<div layout layout-padding-sm class="layout-align-start-center">' + "<div flex>" + '<md-input-container md-no-float class="md-block bg-white border-radius minimal-input no-margin">' + '<textarea placeholder="{{\'review.reply.label\'|translate}}..." ng-model="$ctrl.$$reply" ng-disabled="$ctrl.$$saving" ' + 'max-rows="5" md-no-resize autofocus></textarea>' + "</md-input-container>" + '<md-progress-linear md-mode="query" ng-show="$ctrl.$$saving"></md-progress-linear>' + "</div>" + '<div ng-if="$ctrl.$$error" class="am-fade-and-scale">' + '<md-icon class="mdi mdi-alert-circle-outline md-18 text-danger material-icons"></md-icon>' + '<md-tooltip><span translate="error.review.reply.saving"></span></md-tooltip>' + "</div>" + '<div layout layout-align="center end" class="no-padding am-fade-and-scale" ng-if="$ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply">' + '<md-button class="md-icon-button" ng-class="{\'md-raised\':$ctrl.$$reply}" ng-disabled="!$ctrl.$$reply || $ctrl.$$reply == $ctrl.$$oriReply || $ctrl.$$saving" ' + 'ng-click="$ctrl.$save($event)" aria-label="Send reply">' + '<md-icon class="mdi mdi-send md-24 material-icons" ng-class="{\'text-gray-light\': $ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply}"></md-icon>' + "</md-button>" + "</div>" + "</div>" + '<div ng-if="!$ctrl.$$saving && $ctrl.$$error" class="layout-padding-sm text-danger am-fade-and-scale">' + '<small ng-if="$ctrl.error != true" ng-bind="$ctrl.$$error"></small>' + '<small ng-if="$ctrl.error == true" translate="error.review.reply.saving"></small>' + "</div>" + "</div>" + "</div>" + '<div ng-transclude class="no-padding"></div>' + "</div>" + "</div>"
    });
    function ReviewReplyCtrl($scope, $q, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.$initReview();
            ctrl.$$currentMode = "view";
            ctrl.ngReadonly = _.isBoolean(ctrl.ngReadonly) ? ctrl.ngReadonly : true;
            ctrl.ngEdit = _.isBoolean(ctrl.ngEdit) ? ctrl.ngEdit : false;
            ctrl.responseClass = ctrl.responseClass || "bg-info-light";
            ctrl.arrowClass = ctrl.arrowClass || "border-info-light";
            ctrl.$manageShowReply();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngEdit && !changesObj.ngEdit.isFirstChange() || changesObj.ngReadonly && !changesObj.ngReadonly.isFirstChange()) {
                ctrl.$edit();
            }
            if (changesObj.showReply) {
                ctrl.$manageShowReply();
                ctrl.showReply && (!ctrl.review.reply || !ctrl.review.reply.response) && ctrl.$edit();
            }
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            if (!ctrl.ngReadonly && (!ctrl.review.reply || !ctrl.review.reply.response)) {
                ctrl.$$currentMode = "edit";
            }
        };
        this.$manageShowReply = function() {
            if (!ctrl.review) {
                return;
            }
            ctrl.showReply = ctrl.review.reply && ctrl.review.reply.response ? true : _.isBoolean(ctrl.showReply) ? ctrl.showReply : false;
        };
        this.$edit = function() {
            if (ctrl.ngReadonly || !ctrl.ngEdit) {
                ctrl.$cancelEdit();
                return;
            }
            ctrl.$$oriReply = angular.copy(ctrl.review.reply ? ctrl.review.reply.response : null);
            ctrl.$$reply = angular.copy(ctrl.$$oriReply);
            ctrl.$$currentMode = "edit";
        };
        this.$cancelEdit = function(ev, notify) {
            ctrl.$$reply = null;
            ctrl.$$oriReply = null;
            ctrl.$$currentMode = "view";
            notify && ctrl.onCancelReply && ctrl.onCancelReply({
                $event: ev,
                $review: ctrl.review
            });
        };
        this.$save = function(ev) {
            if (!ctrl.$$reply) {
                return;
            }
            ctrl.$onSaving();
            var ret = ctrl.onReply ? ctrl.onReply({
                $event: ev,
                $review: ctrl.review,
                $reply: ctrl.$$reply
            }) : ctrl.$$reply;
            $q.when(ret).then(ctrl.$onSaveSuccess, ctrl.$onSaveFailure);
        };
        this.$onSaveSuccess = function() {
            ctrl.review.reply = ctrl.review.reply || {};
            ctrl.review.reply.response = angular.copy(ctrl.$$reply);
            ctrl.$$error = false;
            ctrl.$$saving = false;
            ctrl.$cancelEdit();
        };
        this.$onSaveFailure = function(error) {
            ctrl.$$error = _.isEmpty(error) ? true : error;
            ctrl.$$saving = false;
        };
        this.$onSaving = function() {
            ctrl.$$error = false;
            ctrl.$$saving = true;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewReportInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            contentClass: "@",
            showDetails: "<"
        },
        controller: ReviewReportInfoCtrl,
        template: '<div ng-if="$ctrl.review.reportType" class="{{$ctrl.contentClass}}">' + '<div class="layout-padding-sm no-padding">' + "<div>" + '<md-icon class="mdi md-18 mdi-flag-variant text-danger"></md-icon>' + '<small translate="review.reporting.label"></small>' + "</div>" + '<div ng-if="$ctrl.showDetails" ng-switch="$ctrl.review.reportType">' + "<small><i>" + '<span ng-switch-when="OTHER">"{{$ctrl.review.reportNote}}"</span>' + "<span ng-switch-default>\"<span translate=\"{{'review.report.type.' + $ctrl.review.reportType +'.label'}}\"></span>\"</span>" + "</i></small>" + "</div>" + "</div>" + "</div>"
    });
    function ReviewReportInfoCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-danger";
            ctrl.showDetails = _.isBoolean(ctrl.showDetails) ? ctrl.showDetails : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    ReviewReservationInfoCtrl.$inject = [ "AppOptions", "IconUtils", "DateUtils" ];
    angular.module("itaca.components").component("chReviewReservationInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            title: "@"
        },
        controller: ReviewReservationInfoCtrl,
        template: "<div layout-padding>" + '<div class="no-padding-bottom no-padding-right">' + "<div>" + "<small>" + '<span ng-if="!$ctrl.title"><span translate="review.source"></span>&nbsp;</span>' + '<span ng-if="$ctrl.title"><span ng-bind="$ctrl.title"></span>&nbsp;</span>' + '<strong ng-switch="$ctrl.review.reservation.source">' + '<span ng-switch-when="PORTAL">{{$ctrl.appOptions.about.uiName}}</span>' + '<span ng-switch-default translate="channel.source.{{$ctrl.review.reservation.source.toLowerCase()}}"></span>' + "</strong>" + "</small>" + '<span><md-icon class="{{$ctrl.portalIcons[$ctrl.review.reservation.source]}} channel-icon-mini"></md-icon></span>' + "</div>" + '<div ng-if="$ctrl.$$period"><small ng-bind="$ctrl.$$period"></small></div>' + "</div>" + "</div>"
    });
    function ReviewReservationInfoCtrl(AppOptions, IconUtils, DateUtils) {
        var ctrl = this;
        this.appOptions = AppOptions;
        this.portalIcons = IconUtils.portalIcons();
        this.$onInit = function() {
            ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            ctrl.$getPeriod();
        };
        this.$getPeriod = function() {
            var checkin = DateUtils.absoluteMoment(ctrl.review.reservation.checkin);
            var checkout = DateUtils.absoluteMoment(ctrl.review.reservation.checkout);
            if (checkin.get("month") == checkout.get("month")) {
                ctrl.$$period = checkin.format("MMMM YYYY");
            } else {
                ctrl.$$period = checkin.format("MMMM YYYY") + "/" + checkout.format("MMMM YYYY");
            }
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewTitleContent", {
        transclude: true,
        require: {
            chReviewTitleCtrl: "^chReviewTitle"
        },
        controller: ReviewTitleContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewTitleContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewTitleCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewTitleCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewTitleCtrl.$inject = [ "$scope", "ReviewsUtils", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewTitle", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            titleQuote: "@?",
            hideNewIcon: "<?"
        },
        controller: ReviewTitleCtrl,
        template: "<div flex>" + '<div ng-if="!$ctrl.noDefault" class="flex layout-padding">' + '<div class="md-subhead flex ellipsis text-wrap">' + '<span ng-if="!$ctrl.hideNewIcon && $ctrl.review.isNew"><md-icon class="material-icons mdi mdi-new-box text-info"></md-icon>&nbsp;</span>' + "<strong>" + '<em ng-if="$ctrl.review.title">' + '<span ng-if="$ctrl.titleQuote">&ldquo;</span>' + '<span ng-bind="$ctrl.review.title"></span>' + '<span ng-if="$ctrl.titleQuote">&bdquo;</span>' + "</em>" + '<span ng-if="!$ctrl.review.title">' + '<span translate="{{$ctrl.review.label}}"></span>' + "</span>" + "</strong>" + "</div>" + "</div>" + "<div ng-transclude></div>" + "</div>"
    });
    function ReviewTitleCtrl($scope, ReviewsUtils, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
            ctrl.hideNewIcon = _.isBoolean(ctrl.hideNewIcon) ? ctrl.hideNewIcon : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    ReviewUserCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chReviewUser", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            dateFormat: "@",
            hideUser: "<?",
            hideDate: "<?",
            userState: "@?",
            userStateParams: "<?",
            userClick: "&?"
        },
        controller: ReviewUserCtrl,
        template: "<div flex>" + '<div ng-if="!$ctrl.noDefault && !$ctrl.hideUser" class="bg-gray-lighter flex layout-row layout-wrap layout-padding">' + '<div class="layout-row layout-padding-sm no-padding no-outline" ng-class="{\'clickable\': $ctrl.userState || $ctrl.userClick}" ng-click="$ctrl.$userClick($event)" aria-label="Toggle user action">' + "<div>" + '<span ng-if="$ctrl.userAvatar && $ctrl.review.reviewSettings.showAvatar && !$ctrl.review.reviewSettings.anonymous"' + 'class="relative menu-user-avatar-small display-block overflow-hidden">' + '<img alt="User profile image" class="full-width" ng-src="{{$ctrl.userAvatar}}" lazy-image />' + "</span>" + '<span ng-if="(!$ctrl.review.reviewSettings.showAvatar || !$ctrl.userAvatar) && !$ctrl.review.reviewSettings.anonymous"' + 'class="bg-blue-sea menu-user-avatar-small layout-row layout-align-center-center">' + '<span class="md-headline text-uppercase">{{!$ctrl.review.reviewSettings.showRealName && ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname ? ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname.charAt(0) : ($ctrl.review.createdBy || $ctrl.review.reservation.guest).name.charAt(0)}}</span>' + "</span>" + '<md-icon ng-if="$ctrl.review.reviewSettings.anonymous" class="mdi mdi-account-circle md-38"></md-icon>' + "</div>" + '<div class="layout-align-center-start layout-column no-padding-bottom no-padding-top row-1">' + '<span class="font-10 text-gray-light row-1"><span translate="common.written.by.female"></span></span>' + "<div>" + '<strong class="md-subhead">' + '<span ng-if="!$ctrl.review.reviewSettings.anonymous && ($ctrl.review.createdBy || $ctrl.review.reservation.guest)">' + '<span ng-if="!$ctrl.review.reviewSettings || $ctrl.review.reviewSettings.showRealName || !$ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.name}}&nbsp;{{::$ctrl.review.createdBy.surname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.name}}&nbsp;{{::$ctrl.review.reservation.guest.surname}}</span>' + "</span>" + '<span ng-if="$ctrl.review.reviewSettings && !$ctrl.review.reviewSettings.showRealName && $ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.nickname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.nickname}}</span>' + "</span>" + "</span>" + '<span ng-if="$ctrl.review.reviewSettings.anonymous || (!$ctrl.review.createdBy && !$ctrl.review.reservation.guest)" translate="common.anonymous"></span>' + "</strong>" + '<span ng-if="$ctrl.review.createdDate && !$ctrl.hideDate" class="font-10 text-gray-light">' + "<span>&nbsp;-&nbsp;{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</span>" + "</span>" + "</div>" + '<small class="font-10 text-gray-light row-1 text-lowercase" ng-if="!$ctrl.review.reviewSettings.anonymous && $ctrl.review.guest.reviewsCount">' + "<span>{{::$ctrl.review.guest.reviewsCount}}&nbsp;</span>" + '<span ng-if="$ctrl.review.guest.reviewsCount == 1" translate="reviews.review"></span>' + '<span ng-if="$ctrl.review.guest.reviewsCount != 1" translate="reviews.reviews"></span>' + "</small>" + "</div>" + "</div>" + "</div>" + "<div flex ng-transclude></div>" + "</div>"
    });
    function ReviewUserCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : ctrl.chReviewCtrl.hideUser;
            ctrl.hideDate = _.isBoolean(ctrl.hideDate) ? ctrl.hideDate : ctrl.chReviewCtrl.hideDate;
            ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$userClick = function(ev) {
            if (ctrl.userState) {
                Navigator.goToState(ctrl.userState, ctrl.userStateParams);
            } else {
                ctrl.userClick && ctrl.userClick({
                    $event: ev,
                    $review: ctrl.review
                });
            }
        };
    }
})();

(function() {
    "use strict";
    ReviewCtrl.$inject = [ "$scope", "ReviewsUtils", "AppOptions" ];
    angular.module("itaca.components").component("chReview", {
        transclude: true,
        bindings: {
            review: "<",
            newLimit: "@?",
            dateFormat: "@?",
            hideUser: "<?",
            hideDate: "<?",
            imgBaseUrl: "@?"
        },
        controller: ReviewCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewCtrl($scope, ReviewsUtils, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.newLimit = _.isFinite(parseInt(ctrl.newLimit)) ? parseInt(ctrl.newLimit) : 7;
            ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : false;
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || true;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.review) {
                return;
            }
            ctrl.review.isNew = moment().isBefore(moment(ctrl.review.createdDate).add(ctrl.newLimit, "days"));
            ctrl.review.label = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.review.score));
            ctrl.$getUserAvatar();
        };
        this.$getUserAvatar = function() {
            if (ctrl.review.createdBy && ctrl.review.createdBy.avatarType) {
                switch (ctrl.review.createdBy.avatarType) {
                  case "PORTAL":
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null;
                    break;

                  case "FACEBOOK":
                    ctrl.userAvatar = ctrl.review.createdBy.facebookImage;
                    break;

                  case "GOOGLE":
                    ctrl.userAvatar = ctrl.review.createdBy.googleImage;
                    break;

                  default:
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null;
                    break;
                }
            }
            ctrl.review.reviewSettings = _.isObjectLike(ctrl.review.reviewSettings) ? ctrl.review.reviewSettings : {};
            ctrl.review.reviewSettings.showRealName = _.isBoolean(ctrl.review.reviewSettings.showRealName) ? ctrl.review.reviewSettings.showRealName : true;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewsSummaryDetails", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            progressClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryDetailsCtrl,
        template: '<div class="flex layout-column layout-padding-sm">' + '<ch-reviews-summary-progress ng-repeat="entry in $ctrl.summary.reviewsScoreMap track by $index" value="entry.key" count="entry.value" ' + 'size="{{$ctrl.size}}" progress-class="{{$ctrl.progressClass}}"></ch-review-summary-progress>' + "</div>"
    });
    function ReviewsSummaryDetailsCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.progressClass = ctrl.progressClass || "md-primary";
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewsSummaryGar", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            title: "@?",
            subtitle: "@?",
            bgClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryGarCtrl,
        template: '<div ng-if="$ctrl.summary.gar" class="layout-column layout-padding layout-align-center-center no-padding">' + "<div class=\"border-radius layout-column layout-align-center-center {{$ctrl.bgClass}}\" ng-class=\"{'layout-padding': $ctrl.size == 'big'}\">" + '<strong class="md-subhead" translate="{{$ctrl.summary.garLabel}}"></strong>' + "<span class=\"no-padding-top\" ng-class=\"$ctrl.size == 'small' ? 'md-display-1' : 'md-display-3'\">{{$ctrl.summary.gar.toFixed(1)}}</span>" + '<small ng-if="!$ctrl.$$hideTitle" class="no-padding-bottom">' + '<span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.score.total"><span>' + "</small>" + "</div>" + '<div ng-if="!$ctrl.$$hideSubtitle">' + "<small>" + '<span ng-if="$ctrl.subtitle" ng-bind="$ctrl.subtitle"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.reviews.real" translate-values="{num: $ctrl.summary.totalReviews}"></span>' + "</small>" + "</div>" + "</div>"
    });
    function ReviewsSummaryGarCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.bgClass = ctrl.bgClass || "bg-primary";
            ctrl.$$hideTitle = _.isBoolean(ctrl.title) && !ctrl.title;
            ctrl.$$hideSubtitle = _.isBoolean(ctrl.subtitle) && !ctrl.subtitle;
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "big";
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    ReviewsSummaryProgressCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewsSummaryProgress", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            value: "<",
            count: "<",
            progressClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryProgressCtrl,
        template: "<div title=\"{{$ctrl.$$percentage + '%'}}\" ng-class=\"$ctrl.$mdMedia('gt-sm')? 'no-padding-bottom' : 'no-padding-left no-padding-right'\">" + "<small>" + '<span ng-switch="$ctrl.value">' + '<span ng-switch-when="4"><span translate="review.score.bad"></span>&nbsp;<em>(4)</em>:</span>' + '<span ng-switch-when="5"><span translate="review.score.poor"></span>&nbsp;<em>(5)</em>:</span>' + '<span ng-switch-when="6"><span translate="review.score.sufficient"></span>&nbsp;<em>(6)</em>:</span>' + '<span ng-switch-when="7"><span translate="review.score.good"></span>&nbsp;<em>(7)</em>:</span>' + '<span ng-switch-when="8"><span translate="review.score.very.good"></span>&nbsp;<em>(8)</em>:</span>' + '<span ng-switch-when="9"><span translate="review.score.excellent"></span>&nbsp;<em>(9)</em>:</span>' + '<span ng-switch-when="10"><span translate="review.score.fabulous"></span>&nbsp;<em>(10)</em>:</span>' + "</span>" + "</small>" + '<div class="layout-row layout-align-start-center">' + '<div flex><md-progress-linear md-mode="determinate" value="{{$ctrl.$$percentage}}" class="{{$ctrl.$$sizeClass}}" ng-class="$ctrl.count > 0 ? $ctrl.progressClass : \'md-accent\'"></md-progress-linear></div>' + '<div class="text-right" style="width: 55px"><small>&nbsp;{{$ctrl.$$percentage + \'%\'}}&nbsp;({{$ctrl.count}})</small></div>' + "</div>" + "</div>"
    });
    function ReviewsSummaryProgressCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.progressClass = ctrl.progressClass || "md-primary";
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
            if (ctrl.size == "big") {
                ctrl.$$sizeClass = "md-progress-linear-big";
            }
            ctrl.$initSummary();
            ctrl.$initWatchers();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.count;
            }, ctrl.$calculatePercentage);
        };
        this.$calculatePercentage = function() {
            ctrl.$$percentage = Math.round((ctrl.count || 0) * 100 / (ctrl.summary.totalReviews || 1));
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    ReviewsSummaryCtrl.$inject = [ "ReviewsUtils" ];
    angular.module("itaca.components").component("chReviewsSummary", {
        transclude: true,
        bindings: {
            summary: "<"
        },
        controller: ReviewsSummaryCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewsSummaryCtrl(ReviewsUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.summary) {
                var scoreMap = [];
                _.forEach(_.rangeRight(4, 11), function(val) {
                    scoreMap.push({
                        key: val,
                        value: 0
                    });
                });
                ctrl.summary = {
                    totalReviews: 0,
                    gar: null,
                    reviewsScoreMap: scoreMap
                };
            }
            ctrl.summary.reviewsScoreMap = _.orderBy(ctrl.summary.reviewsScoreMap, [ "key" ], [ "desc" ]);
            ctrl.summary.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.summary.gar));
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    RoomEditCtrl.$inject = [ "$scope", "NumberUtils", "Dialog", "ReservationUtils", "Navigator" ];
    angular.module("itaca.components").component("chRoomEdit", {
        bindings: {
            room: "<",
            nights: "<?",
            storageUrl: "<?",
            title: "@",
            localeIso: "<",
            onRemove: "&?",
            city: "@",
            offset: "@"
        },
        controller: RoomEditCtrl,
        templateUrl: "/tpls/room-edit/room-edit.tpl"
    });
    function RoomEditCtrl($scope, NumberUtils, Dialog, ReservationUtils, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$index = NumberUtils.uniqueNumber();
            ctrl.$calculateTotalAmount();
            ctrl.$getCover();
            ctrl.$getPromo();
        };
        this.$getCover = function() {
            var roomImage = "/resources/public/img/no-gallery-image.png";
            _.forEach(ctrl.room.type.gallery, function(photo, index, collection) {
                if (index == 0) {
                    roomImage = ctrl.storageUrl + photo.path;
                }
                if (photo.cover) {
                    roomImage = ctrl.storageUrl + photo.path;
                    return;
                }
            });
            ctrl.$$roomImage = roomImage;
        };
        this.$getPromo = function() {
            if (!_.isEmpty(ctrl.room.totalRate.promotions)) {
                ctrl.$$promotion = ctrl.room.totalRate.promotions[0];
            }
        };
        this.$removeRoom = function(ev) {
            ctrl.onRemove && ctrl.onRemove({
                $event: ev,
                $room: ctrl.room
            });
        };
        this.$openGallery = function(ev) {
            if (!_.isEmpty(ctrl.room.type.gallery)) {
                $translate([ ctrl.room.type.roomType.nameKey, "room.category." + ctrl.room.type.category ]).then(function(translations) {
                    var title = translations[ctrl.room.type.roomType.nameKey] + "&nbsp;<small>(" + translations["room.category." + ctrl.room.type.category].toUpperCase() + ")</small>";
                    Dialog.showGallery(ev, title, _.sortBy(ctrl.room.type.gallery, [ function(o) {
                        return +Boolean(o.cover);
                    } ]), {
                        storageUrl: ctrl.storageUrl
                    });
                });
            }
        };
        this.$calculateTotalAmount = function() {
            ReservationUtils.calculateRoomTotalPrice(ctrl.room);
        };
        this.$toggleInfo = function(show) {
            ctrl.$$showInfo = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showInfo;
            ctrl.$$showInfo && Navigator.scrollToAnchor("ch-room-" + ctrl.$$index + "-info");
        };
        this.$toggleRates = function(show) {
            ctrl.$$showRates = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showRates;
            ctrl.$$showRates && Navigator.scrollToAnchor("ch-room-" + ctrl.$$index + "-rates");
        };
    }
})();

(function() {
    "use strict";
    RoomBestServicesCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomBestServices", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            services: "<?"
        },
        controller: RoomBestServicesCtrl,
        template: '<div layout layout-wrap layout-align="end start" ng-if="$ctrl.services.length">' + '<span ng-repeat="service in $ctrl.services track by $index">' + "<span>" + '<md-icon class="{{service.icon}} layout-padding no-padding-top" ng-class="{\'text-white\': $ctrl.chRoomCtrl.room.gallery.length}"></md-icon>' + '<md-tooltip ng-if="service.label || service.labelKey"><span ng-if="service.label" ng-bind="service.label"></span><span ng-if="!service.label" translate="{{service.labelKey}}"></span></md-tooltip>' + "</span>" + "</span>" + "</div>"
    });
    function RoomBestServicesCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.services = _.isArray(ctrl.services) ? ctrl.services : ctrl.chRoomCtrl.popularServices;
        };
    }
})();

(function() {
    "use strict";
    RoomContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomContent", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomContentCtrl,
        template: "<ng-transclude></ng-transclude>",
        transclude: true
    });
    function RoomContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomGalleryCtrl.$inject = [ "$scope", "AboutStorage", "$translate", "Dialog", "NumberUtils" ];
    angular.module("itaca.components").component("chRoomGallery", {
        require: {
            chRoomCtrl: "^chRoom",
            chRoomHeaderCtrl: "^chRoomHeader"
        },
        bindings: {
            cols: "@",
            rowspan: "@?",
            ratio: "@?",
            maxItems: "<?"
        },
        controller: RoomGalleryCtrl,
        template: '<ch-gallery gallery="$ctrl.chRoomCtrl.room.gallery" gallery-title="{{$ctrl.title}}" storage-url="$ctrl.chRoomCtrl.storageUrl" cols="{{$ctrl.cols}}" rowspan="{{$ctrl.rowspan}}" ratio="{{$ctrl.ratio}}" max-items="$ctrl.maxItems"></ch-gallery>'
    });
    function RoomGalleryCtrl($scope, AboutStorage, $translate, Dialog, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.chRoomCtrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.chRoomCtrl.storageUrl = data.url;
                });
            }
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                ctrl.title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
            });
        };
        this.openGallery = function(ev) {
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
                Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [ function(o) {
                    return +Boolean(o.cover);
                } ]), {
                    storageUrl: ctrl.chRoomCtrl.storageUrl
                });
            });
        };
    }
})();

(function() {
    "use strict";
    RoomHeaderCtrl.$inject = [ "$scope", "$mdMedia", "Navigator" ];
    angular.module("itaca.components").component("chRoomHeader", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomHeaderCtrl,
        template: '<div class="ch-room-header-content layout-column">' + "<ng-transclude></ng-transclude>" + '<div ng-if="$ctrl.chRoomCtrl.showInfoBtn" class="img-bottom-left-bar layout-row layout-wrap layout-align-center-center">' + '<md-button ng-class="{\'md-icon-button\' : $ctrl.$mdMedia(\'xs\')}" ng-click="$ctrl.toggleInfo()" aria-label="Open room information">' + '<div class="row-mini">' + '<md-icon class="mdi mdi-information-outline md-18 text-white"></md-icon>' + '<small class="hide-xs hide-sm" translate="common.information"></small>' + "</div>" + "</md-button>" + "</div>" + "<div ng-if=\"$ctrl.chRoomCtrl.showRateBtn\" ng-class=\"::{'img-right-bar': $ctrl.$mdMedia('gt-xs'), 'img-bottom-right-bar': $ctrl.$mdMedia('xs')}\" class=\"layout-row layout-align-center-center\">" + '<md-button ng-click="$ctrl.toggleRates()" aria-label="Open room prices">' + '<div layout class="row-mini text-left layout-padding no-padding">' + '<div layout="column">' + "<small>" + '<span class="text-initial" translate="common.from"></span>' + '<i ng-if="$ctrl.chRoomCtrl.bestRate.amount.initialAmount > 0 && $ctrl.chRoomCtrl.bestRate.amount.initialAmount > $ctrl.chRoomCtrl.bestRate.amount.finalAmount">&nbsp;<del>{{$ctrl.chRoomCtrl.bestRate.amount.initialAmount|chCurrency}}</del></i>' + "</small>" + '<span class="md-title"><strong>{{$ctrl.chRoomCtrl.bestRate.amount.finalAmount|chCurrency}}</strong></span>' + '<small ng-if="$ctrl.chRoomCtrl.nights > 0" class="text-lowercase">' + '<span translate="common.for"></span>&nbsp;{{$ctrl.chRoomCtrl.nights}}' + '<span ng-show="$ctrl.chRoomCtrl.nights == 1" translate="common.night"></span>' + '<span ng-show="$ctrl.chRoomCtrl.nights > 1" translate="common.nights"></span>' + "</small>" + "</div>" + '<div layout="column">' + "<md-icon class=\"mdi md-48 text-white\" ng-class=\"$ctrl.chRoomCtrl.showRoomRates ? 'mdi-chevron-up' : 'mdi-chevron-down animated infinite bounce'\"></md-icon>" + "</div>" + "<md-tooltip hide-xs>" + '<span ng-if="!$ctrl.chRoomCtrl.showRoomRates" translate="ratesheet.rates.all.view"></span>' + '<span ng-if="$ctrl.chRoomCtrl.showRoomRates" translate="ratesheet.rates.hide"></span>' + "</md-tooltip>" + "</div>" + "</md-button>" + "</div>" + "</div>",
        transclude: true
    });
    function RoomHeaderCtrl($scope, $mdMedia, Navigator) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showRoomRates = false;
            ctrl.chRoomCtrl.showRoomInfo = false;
        };
        this.toggleInfo = function() {
            ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
            ctrl.chRoomCtrl.showRoomRates = false;
            if (!ctrl.chRoomCtrl.showRoomInfo) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            }
        };
        this.toggleRates = function() {
            ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
            ctrl.chRoomCtrl.showRoomInfo = false;
            if (!ctrl.chRoomCtrl.showRoomRates) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            } else {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index + "-rates");
            }
        };
    }
})();

(function() {
    "use strict";
    RoomImageCtrl.$inject = [ "$scope", "AboutStorage", "$translate", "Dialog" ];
    angular.module("itaca.components").component("chRoomImage", {
        require: {
            chRoomCtrl: "^chRoom",
            chRoomHeaderCtrl: "^chRoomHeader"
        },
        bindings: {},
        controller: RoomImageCtrl,
        template: '<div class="flex layout-column layout-align-center-center">' + '<img ng-src="{{$ctrl.roomImage}}" class="full-width display-block img-size" ng-class="{\'clickable\': $ctrl.chRoomCtrl.room.gallery.length}" ng-click="$ctrl.openGallery($event)" alt="Room cover image" lazy-image default-img-url="\'/resources/public/img/no-gallery-image.png\'">' + '<md-tooltip ng-if="$ctrl.chRoomCtrl.room.gallery.length"><span translate="photo.photos.view.all"></span></md-tooltip>' + "</div>"
    });
    function RoomImageCtrl($scope, AboutStorage, $translate, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.config = ctrl.chRoomCtrl.config || {};
            if (!ctrl.chRoomCtrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.chRoomCtrl.storageUrl = data.url;
                    ctrl.getRoomCover();
                });
            } else {
                ctrl.getRoomCover();
            }
        };
        this.getRoomCover = function() {
            ctrl.$findRoomCover();
        };
        this.openGallery = function(ev) {
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
                Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [ function(o) {
                    return +Boolean(o.cover);
                } ]), {
                    storageUrl: ctrl.chRoomCtrl.storageUrl
                });
            });
        };
        this.$findRoomCover = function() {
            var roomImage = "/resources/public/img/no-gallery-image.png";
            _.forEach(ctrl.chRoomCtrl.room.gallery, function(gallery, index, collection) {
                if (index == 0) {
                    roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
                }
                if (gallery.cover) {
                    roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
                    return;
                }
            });
            ctrl.roomImage = roomImage;
        };
    }
})();

(function() {
    "use strict";
    RoomInfoCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chRoomInfo", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            availability: "<"
        },
        controller: RoomInfoCtrl,
        transclude: true,
        templateUrl: "/tpls/room/room-info.tpl"
    });
    function RoomInfoCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showInfoBtn = true;
            ctrl.getIncludedServices();
            ctrl.getBookableServices();
            ctrl.getPopularServices();
        };
        this.getPopularServices = function() {
            var isSmokingRoom = false;
            ctrl.chRoomCtrl.popularServices = [];
            _.forEach(ctrl.includedServices, function(roomService) {
                var service = {};
                if (roomService.type.nameKey == "service.type.popular.wifi.room") {
                    service.type = "WIFI";
                    service.icon = "mdi mdi-wifi md-24";
                } else if (roomService.type.nameKey == "service.type.popular.pet.small" || roomService.type.nameKey == "service.type.popular.pet.medium" || roomService.type.nameKey == "service.type.popular.pet.large" || roomService.type.nameKey == "service.type.popular.pet.disabled") {
                    service.type = "PET";
                    service.icon = "mdi mdi-paw md-24";
                } else if (roomService.type.nameKey == "service.type.popular.breakfast" || roomService.type.nameKey == "service.type.popular.breakfast.room" || roomService.type.nameKey == "service.type.popular.breakfast.continental") {
                    service.type = "BREAKFAST";
                    service.icon = "mdi mdi-food-variant md-24";
                } else if (roomService.type.nameKey == "service.type.popular.smoking.room") {
                    service.type = "SMOKING";
                    service.icon = "mdi mdi-smoking md-24";
                    isSmokingRoom = true;
                }
                service.labelKey = "service.type.inroom." + service.type;
                ctrl.chRoomCtrl.popularServices.push(service);
            });
            if (!isSmokingRoom) {
                ctrl.chRoomCtrl.popularServices.push({
                    type: "NO-SMOKING",
                    icon: "mdi mdi-smoking-off md-24",
                    labelKey: "service.type.inroom.NO-SMOKING"
                });
            }
        };
        this.getIncludedServices = function() {
            ctrl.includedServices = _.filter(ctrl.chRoomCtrl.room.services, [ "bookability", "INCLUDED" ]);
        };
        this.getBookableServices = function() {
            ctrl.bookableServices = _.filter(ctrl.chRoomCtrl.room.services, [ "bookability", "BOOKABLE" ]);
        };
        this.toggleInfo = function() {
            ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
            ctrl.chRoomCtrl.showRoomRates = false;
            if (!ctrl.chRoomCtrl.showRoomInfo) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            }
        };
    }
})();

(function() {
    "use strict";
    RoomPromoCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomPromo", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomPromoCtrl,
        template: '<div class="layout-column layout-margin-sm no-margin-left">' + '<div ng-if="$ctrl.chRoomCtrl.onArrival" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini bg-success md-subhead">' + "<strong>" + '<md-icon class="mdi mdi-thumb-up md-18 text-white"></md-icon>' + '<span translate="reservation.pay.at.hotel"></span>' + "</strong>" + "</div>" + "</div>" + '<div ng-if="$ctrl.chRoomCtrl.bestPromo" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini md-subhead" ' + "ng-class=\"{'bg-success': $ctrl.chRoomCtrl.bestPromo.onArrival || $ctrl.chRoomCtrl.bestPromo.promotionType == 'EARLY_BOOKING', " + "'bg-info' : !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'STANDARD',  " + "'bg-primary-light': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'MINIMUM_STAY', " + "'bg-primary': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'BOOK_TODAY', " + "'bg-blue-sea': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_MINUTE', " + "'bg-warn': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_SECOND'}\"> " + '<strong ng-if="!$ctrl.chRoomCtrl.bestPromo.onArrival" ng-switch="$ctrl.chRoomCtrl.bestPromo.promotionType"> ' + '<md-icon class="mdi mdi-sale md-10 text-white"></md-icon> ' + '<span ng-switch-when="STANDARD">' + '<span translate="common.offer.special"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="MINIMUM_STAY">' + '<span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.chRoomCtrl.bestPromo.minStay}}"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="BOOK_TODAY">' + '<span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="EARLY_BOOKING">' + '<span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_MINUTE">' + '<span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_SECOND">' + '<span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + "</strong>" + "</div>" + "</div>" + "</div>",
        transclude: true
    });
    function RoomPromoCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomRateCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRoomRate", {
        transclude: true,
        require: {
            chRoomCtrl: "^chRoom",
            chRoomRatesCtrl: "^chRoomRates"
        },
        bindings: {
            rate: "<"
        },
        controller: RoomRateCtrl,
        templateUrl: "/tpls/room/room-rate.tpl"
    });
    function RoomRateCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomRatesCtrl.$inject = [ "$scope", "ReservationUtils", "DateUtils" ];
    angular.module("itaca.components").component("chRoomRates", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            availability: "="
        },
        controller: RoomRatesCtrl,
        template: '<div id="{{$ctrl.chRoomCtrl.$$index + \'-rates\'}}" ng-show="$ctrl.chRoomCtrl.showRoomRates"  ng-class="{\'animated fadeIn\': $ctrl.chRoomCtrl.showRoomRates}" ng-transclude></div>',
        transclude: true
    });
    function RoomRatesCtrl($scope, ReservationUtils, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showRateBtn = true;
            ctrl.getLowestRate();
            ctrl.isOnArrival();
            ctrl.bestPromotion();
            ctrl.hasFreeBeds();
        };
        this.hasFreeBeds = function() {
            if (!_.isEmpty(ctrl.availability.roomType.otherBeds)) {
                ctrl.availability.hasFreeBeds = _.some(ctrl.availability.roomType.otherBeds, function(bed) {
                    if (bed.people.adults) {
                        return bed.adultsPrice <= 0;
                    } else if (bed.people.boys) {
                        return bed.boysPrice <= 0;
                    } else if (bed.people.children) {
                        return bed.childrenPrice <= 0;
                    } else if (bed.people.kids) {
                        return bed.kidsPrice <= 0;
                    } else {
                        return false;
                    }
                });
            }
        };
        this.bestPromotion = function() {
            var promotions = [];
            _.forEach(ctrl.availability.totalRates, function(rate) {
                if (!_.isEmpty(rate.promotions)) {
                    promotions = _.concat(promotions, rate.promotions);
                }
            });
            ctrl.chRoomCtrl.bestPromo = ReservationUtils.bestPromotion(promotions);
        };
        this.getLowestRate = function() {
            ctrl.chRoomCtrl.bestRate = _.minBy(ctrl.availability.totalRates, function(rate) {
                return rate.amount.finalAmount;
            });
        };
        this.isOnArrival = function() {
            ctrl.chRoomCtrl.onArrival = ctrl.availability.onArrival;
        };
    }
})();

(function() {
    "use strict";
    RoomTitleCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chRoomTitle", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomTitleCtrl,
        template: '<div class="img-title-bar layout-column layout-padding no-padding">' + '<div class="layout-row layout-align-start-center">' + '<div class="flex layout-column clickable" ng-click="$ctrl.toggleRates()" aria-label="show rate">' + '<div class="md-title">' + '<span translate="{{$ctrl.chRoomCtrl.room.roomType.nameKey}}"></span>' + "</div>" + "<div>" + '<small class="text-uppercase" translate="room.category.{{$ctrl.chRoomCtrl.room.category}}"></small>' + "</div>" + "</div>" + '<div class="layout-column no-padding">' + '<div class="layout-row layout-wrap layout-align-end-center">' + "<ch-people-icons " + 'people="$ctrl.chRoomCtrl.room.people" ' + 'max="$ctrl.chRoomCtrl.room.guestsCount.standard" ' + 'extra-people="$ctrl.chRoomCtrl.room.extraPeople" ' + 'extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra">' + "</ch-people-icons>" + "</div>" + "</div>" + "</div>" + "</div>"
    });
    function RoomTitleCtrl($scope, Navigator) {
        var ctrl = this;
        this.toggleRates = function() {
            ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
            ctrl.chRoomCtrl.showRoomInfo = false;
            if (!ctrl.chRoomCtrl.showRoomRates) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            } else {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index + "-rates");
            }
        };
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chRoom", {
        transclude: true,
        bindings: {
            room: "<",
            storageUrl: "<?",
            nights: "<?"
        },
        controller: RoomCtrl,
        template: '<div id="{{\'av-\'+ $ctrl.$$index}}" class="bg-gray-lighter md-margin no-margin-left no-margin-right relative" ng-transclude></div>'
    });
    function RoomCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$index = NumberUtils.uniqueNumber();
        };
    }
})();

(function() {
    "use strict";
    ShowOnScrollCtrl.$inject = [ "$scope", "$element", "$window", "$timeout" ];
    angular.module("itaca.components").component("chShowOnScroll", {
        transclude: true,
        bindings: {
            offset: "@?",
            element: "@?",
            ngDisabled: "<?",
            showClass: "@?",
            hideClass: "@?"
        },
        controller: ShowOnScrollCtrl,
        template: '<div class="ch-show-on-scroll" ng-transclude></div>'
    });
    function ShowOnScrollCtrl($scope, $element, $window, $timeout) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.element = ctrl.element || null;
            ctrl.offset = isFinite(parseInt(ctrl.offset)) ? parseInt(ctrl.offset) : 500;
            ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
            ctrl.showClass = ctrl.showClass || "zoomIn";
            if (_.isBoolean(ctrl.showClass)) {
                ctrl.showClass = ctrl.showClass ? "zoomIn" : "";
            }
            ctrl.hideClass = ctrl.hideClass || "zoomOut";
            if (_.isBoolean(ctrl.hideClass)) {
                ctrl.hideClass = ctrl.hideClass ? "zoomOut" : "";
            }
            angular.element($element.children()).addClass("hide");
        };
        this.$postLink = function() {
            ctrl.$manageDisabled();
        };
        this.$manageDisabled = function() {
            ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
            if (ctrl.ngDisabled) {
                ctrl.$disableShow();
            } else {
                ctrl.$enableShow();
            }
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngDisabled) {
                ctrl.$manageDisabled();
            }
        };
        this.$enableShow = function() {
            angular.element($window).on("scroll", ctrl.$toggle);
        };
        this.$disableShow = function() {
            angular.element($window).off("scroll", ctrl.$toggle);
        };
        this.$checkVisible = function() {
            var el = document.querySelector(ctrl.element);
            if (!el) {
                return false;
            }
            var rect = el.getBoundingClientRect();
            var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
        };
        this.$toggle = function() {
            if (ctrl.ngDisabled) {
                ctrl.$disableShow();
                return;
            }
            $timeout(ctrl.$doToggle);
        };
        this.$doToggle = function() {
            var contEl = $element.children();
            var transEl = angular.element(contEl.children());
            transEl && transEl.addClass("animated");
            var windowsOffset = $window.pageYOffset;
            if (document.body) {
                var style = window.getComputedStyle(document.body);
                var top = style.getPropertyValue("top");
                windowsOffset += top ? Math.abs(parseInt(top)) : 0;
            }
            if (windowsOffset >= ctrl.offset && !ctrl.$checkVisible()) {
                if (transEl) {
                    transEl.addClass("visible " + ctrl.showClass);
                    transEl.removeClass(ctrl.hideClass);
                    angular.element($element.children()).removeClass("hide");
                }
            } else {
                if (transEl) {
                    transEl.removeClass("visible " + ctrl.showClass);
                    transEl.addClass(ctrl.hideClass);
                }
            }
            $scope.$apply();
        };
        this.$onDestroy = function() {
            ctrl.$disableShow();
        };
    }
})();

(function() {
    "use strict";
    StepCtrl.$inject = [ "$element", "$compile", "$scope" ];
    angular.module("itaca.components").component("chSimpleStep", {
        transclude: true,
        require: {
            chStepperCtrl: "^^chSimpleStepper"
        },
        bindings: {
            label: "@?",
            completedLabel: "@?",
            subtitle: "@?",
            completedSubtitle: "@?",
            optional: "<",
            optionalLabel: "@",
            ngDisabled: "<",
            iconClass: "@",
            iconCompletedClass: "@"
        },
        controller: StepCtrl,
        templateUrl: "/tpls/simple-stepper/simple-step.tpl"
    });
    function StepCtrl($element, $compile, $scope) {
        var ctrl = this;
        this.$onInit = function() {
            this.$initWatchers();
        };
        this.$postLink = function() {
            this.$$stepNumber = this.chStepperCtrl.$addStep(this);
        };
        this.$addOverlay = function() {
            var hasOverlay = !!$element.find(".ch-simple-step-body-overlay")[0];
            if (!hasOverlay) {
                var overlay = angular.element('<div class="ch-simple-step-body-overlay"></div>\n<div class="ch-simple-step-body-loading">\n<md-progress-circular md-mode="indeterminate"></md-progress-circular>\n</div>');
                $compile(overlay)($scope);
                $element.find(".ch-simple-stepper-scope").append(overlay);
            }
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.active;
            }, function(newVal, oldVal) {
                if (newVal) {
                    $element.addClass("ch-active");
                    ctrl.$addOverlay();
                } else {
                    $element.removeClass("ch-active");
                }
            });
        };
    }
})();

(function() {
    "use strict";
    StepperCtrl.$inject = [ "$scope", "$mdComponentRegistry", "$attrs", "$log" ];
    angular.module("itaca.components").component("chSimpleStepper", {
        transclude: true,
        bindings: {
            linear: "<?",
            previousStepClick: "<?",
            alternative: "<?",
            vertical: "<?",
            mobileMode: "<?",
            labelStep: "@?",
            labelOf: "@?"
        },
        controller: StepperCtrl,
        templateUrl: "/tpls/simple-stepper/simple-stepper.tpl"
    });
    function StepperCtrl($scope, $mdComponentRegistry, $attrs, $log) {
        var ctrl = this;
        this.$onInit = function() {
            this.mobileMode = _.isBoolean(this.mobileMode) ? this.mobileMode : false;
            this.previousStepClick = _.isBoolean(this.previousStepClick) ? this.previousStepClick : false;
            this.linear = _.isBoolean(this.linear) ? this.linear : true;
            this.alternative = _.isBoolean(this.alternative) ? this.alternative : true;
            this.labelStep = this.labelStep || "Step";
            this.labelOf = this.labelOf || "of";
            this.$$steps = [];
            this.$$currentStep = {
                index: 0
            };
        };
        this.$postLink = function() {
            if (!$attrs.id) {
                $log.warn("You must set an id attribute to the stepper");
            }
            this.registeredStepper = $mdComponentRegistry.register(this, $attrs.id);
        };
        this.$onDestroy = function() {
            this.registeredStepper && this.registeredStepper();
        };
        this.$addStep = function(step) {
            var idx = this.$$steps.push(step) - 1;
            this.$setCurrentStep(this.$$currentStep.index);
            return idx;
        };
        this.$setCurrentStep = function(step) {
            step = _.isFinite(step) ? this.$$steps[step] : _.includes(this.$$steps, step) ? step : null;
            if (!step) {
                return false;
            }
            var previousStepIdx = parseInt(this.$$currentStep.index);
            this.$$currentStep = _.isPlainObject(this.$$currentStep) ? this.$$currentStep : {};
            this.$$currentStep.index = step.$$stepNumber || _.indexOf(this.$$steps, step);
            this.$$currentStep.first = this.$$currentStep.index == 0;
            this.$$currentStep.last = this.$$currentStep.index == this.$$steps.length - 1;
            this.$$currentStep.lastButOne = this.$$currentStep.index == this.$$steps.length - 2;
            this.$$currentStep.label = step.label;
            this.$$currentStep.completedLabel = step.completedLabel;
            this.$$currentStep.subtitle = step.subtitle;
            this.$$currentStep.completedSubtitle = step.completedSubtitle;
            this.$$currentStep.optional = step.optional;
            this.$$currentStep.optionalLabel = step.optionalLabel;
            this.$onStepChange(this.$$currentStep.index);
            this.$onStepChange(previousStepIdx);
            return step;
        };
        this.$onStepChange = function(stepNumber) {
            var step = _.isFinite(stepNumber) ? this.$$steps[stepNumber] : null;
            if (!step) {
                return false;
            }
            step.$completed = this.isCompleted(stepNumber);
            step.$active = this.isActive(stepNumber);
        };
        this.next = function() {
            if (this.$$currentStep.index < this.$$steps.length) {
                this.clearError();
                this.$setCurrentStep(this.$$currentStep.index + 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.back = function() {
            if (this.$$currentStep.index > 0) {
                this.clearError();
                this.$setCurrentStep(this.$$currentStep.index - 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.skip = function() {
            var step = this.$$steps[this.$$currentStep.index];
            if (step.optional) {
                this.$setCurrentStep(this.$$currentStep.index + 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.error = function(message) {
            var step = this.$$steps[this.$$currentStep.index];
            this.$$currentStep.hasError = step.hasError = true;
            this.$$currentStep.message = step.message = message;
            this.clearFeedback();
        };
        this.clearError = function() {
            var step = this.$$steps[this.$$currentStep.index];
            this.$$currentStep.hasError = step.hasError = false;
        };
        this.goto = function(stepNumber) {
            if (stepNumber < this.$$steps.length) {
                this.$setCurrentStep(stepNumber);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.showFeedback = function(message) {
            this.hasFeedback = true;
            this.feedbackMessage = message;
        };
        this.clearFeedback = function() {
            this.hasFeedback = false;
        };
        this.isCompleted = function(stepNumber) {
            return this.linear && stepNumber < this.$$currentStep.index;
        };
        this.isActive = function(stepNumber) {
            return stepNumber === this.$$currentStep.index;
        };
    }
})();

(function() {
    "use strict";
    StepperFactory.$inject = [ "$mdComponentRegistry" ];
    angular.module("itaca.components").factory("$chSimpleStepper", StepperFactory);
    function StepperFactory($mdComponentRegistry) {
        return function(stepperId) {
            var stepper = $mdComponentRegistry.get(stepperId);
            if (!stepper) {
                $mdComponentRegistry.notFoundError(stepperId);
            }
            return stepper;
        };
    }
})();

(function() {
    "use strict";
    GalleryCtrl.$inject = [ "$scope", "Dialog" ];
    angular.module("itaca.components").component("chSlidingGallery", {
        bindings: {
            gallery: "<?",
            baseUrl: "<?",
            sort: "<?",
            sortFn: "&?",
            openOnClick: "<?",
            tooltip: "@",
            dialogTitle: "@",
            onReady: "&",
            slidesPerView: "<?",
            slidesPerColumn: "<?",
            spaceBetween: "<?",
            parallax: "<?",
            parallaxTransition: "@",
            paginationIsActive: "<?",
            paginationClickable: "<?",
            showNavButtons: "<?",
            showScrollBar: "<?",
            loop: "<?",
            autoplay: "<?",
            initialSlide: "<?",
            containerCls: "@",
            wrapperCls: "@",
            paginationCls: "@",
            slideCls: "@",
            direction: "@",
            swiper: "<?",
            overrideParameters: "<?",
            lazyLoading: "<?"
        },
        controller: GalleryCtrl,
        template: '<div flex ng-if="$ctrl.gallery.length">' + "<ks-swiper-container " + 'override-parameters="$ctrl.$$overrideParameters"' + 'container-cls="{{$ctrl.containerCls}}"' + 'wrapper-cls="{{$ctrl.wrapperCls}}"' + 'pagination-cls="{{$ctrl.paginationCls}}"' + 'slide-cls="{{$ctrl.slideCls}}"' + 'slides-per-view="$ctrl.slidesPerView"' + 'slides-per-column="$ctrl.slidesPerColumn"' + 'autoplay="$ctrl.autoplay"' + 'direction="{{$ctrl.direction}}"' + 'show-nav-buttons="$ctrl.showNavButtons"' + 'show-scroll-bar="$ctrl.showScrollBar"' + 'pagination-is-active="$ctrl.paginationIsActive"' + 'pagination-clickable="$ctrl.paginationClickable"' + 'initial-slide="$ctrl.initialSlide"' + 'space-between="$ctrl.spaceBetween"' + 'parallax="$ctrl.parallax"' + 'parallax-transition="{{$ctrl.parallaxTransition}}"' + 'loop="$ctrl.loop"' + 'swiper="$ctrl.swiper"' + 'on-ready="$ctrl.onReady">' + '<ks-swiper-slide slider-cls="no-bg" ng-class="{\'text-center\': $ctrl.$$overrideParameters.centeredSlides}" ng-repeat="image in $ctrl.gallery track by $index">' + "\x3c!-- Preloaded Image --\x3e" + "<div ng-if=\"!$ctrl.$$overrideParameters.lazyLoading\" class=\"{{$ctrl.slideCls}} bg-center-center clickable\" ng-style=\"{'background-image': 'url('+$ctrl.baseUrl + image.path+')'}\"" + 'ng-click="$ctrl.$openGallery($event, $index)"></div>' + "\x3c!-- Lazy Loading Image --\x3e" + '<div ng-if="$ctrl.$$overrideParameters.lazyLoading" ng-attr-data-background="{{$ctrl.baseUrl}}{{image.path}}" class="{{$ctrl.slideCls}} bg-center-center clickable swiper-lazy"' + 'ng-click="$ctrl.$openGallery($event, $index)">' + '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>' + "</div>" + "</ks-swiper-slide>" + "</ks-swiper-container>" + '<md-tooltip ng-if="$ctrl.openOnClick">' + '<span ng-if="!$ctrl.tooltip" translate="photo.gallery.click.to.open"></span>' + '<span ng-if="$ctrl.tooltip" ng-bind="$ctrl.tooltip"></span>' + "</md-tooltip>" + "</div>"
    });
    function GalleryCtrl($scope, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.direction = ctrl.direction || "horizontal";
            ctrl.containerCls = ctrl.containerCls || "index-0 bg-gray-base";
            ctrl.wrapperCls = ctrl.wrapperCls || "layout-row layout-align-start-center";
            ctrl.paginationCls = ctrl.paginationCls || "swiper-pagination-white";
            ctrl.slidesPerView = ctrl.slidesPerView || 1;
            ctrl.slidesPerColumn = ctrl.slidesPerColumn || 1;
            ctrl.loop = _.isBoolean(ctrl.loop) ? ctrl.loop : true;
            ctrl.showNavButtons = _.isBoolean(ctrl.showNavButtons) ? ctrl.showNavButtons : true;
            ctrl.paginationIsActive = _.isBoolean(ctrl.paginationIsActive) ? ctrl.paginationIsActive : true;
            ctrl.paginationClickable = _.isBoolean(ctrl.paginationClickable) ? ctrl.paginationClickable : true;
            ctrl.spaceBetween = ctrl.spaceBetween || 0;
            ctrl.lazyLoading = _.isBoolean(ctrl.lazyLoading) ? ctrl.lazyLoading : true;
            ctrl.$$overrideParameters = {
                keyboardControl: true,
                grabCursor: ctrl.showNavButtons,
                centeredSlides: true,
                lazyLoading: ctrl.lazyLoading,
                preloadImages: !ctrl.lazyLoading,
                lazyLoadingInPrevNext: ctrl.lazyLoading,
                autoplayDisableOnInteraction: false,
                pagination: false,
                watchSlidesVisibility: ctrl.lazyLoading && (ctrl.slidesPerView == "auto" || ctrl.slidesPerView > 1)
            };
            ctrl.$overrideConfig();
            ctrl.$sortGallery();
        };
        this.$sortGallery = function() {
            var sortBy = angular.isFunction(ctrl.sortFn) ? ctrl.sortFn : _.isBoolean(ctrl.sort) && ctrl.sort ? function(o) {
                return +Boolean(o.cover);
            } : ctrl.sort;
            if (sortBy) {
                ctrl.gallery = _.sortBy(ctrl.gallery, angular.isFunction(sortBy) ? [ sortBy ] : sortBy);
            }
        };
        this.$overrideConfig = function() {
            _.assign(ctrl.$$overrideParameters, ctrl.overrideParameters);
        };
        this.$openGallery = function(ev, idx) {
            if (ctrl.openOnClick && !_.isEmpty(ctrl.gallery)) {
                Dialog.showGallery(ev, ctrl.dialogTitle, ctrl.gallery, {
                    storageUrl: ctrl.baseUrl,
                    initialSlide: idx || 0
                });
            }
        };
    }
})();

(function() {
    "use strict";
    SocialShareCtrl.$inject = [ "$scope", "UrlUtils", "AppOptions" ];
    angular.module("itaca.components").component("chSocialShare", {
        bindings: {
            iconSize: "<?",
            title: "@",
            text: "@",
            url: "@",
            tags: "@",
            mediaUrl: "@",
            fbAppId: "@"
        },
        controller: SocialShareCtrl,
        template: '<div class="layout-padding no-padding-top" ng-cloak>' + '<div hide-gt-sm class="layout-align-center-center layout-row layout-wrap">' + '<a class="auto-height button-mini md-button" aria-label="whatsapp"' + "socialshare" + 'socialshare-provider="whatsapp"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}">' + '<md-icon class="mdi mdi-whatsapp {{$ctrl.iconSize}} material-icons text-whatsapp"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Whatsapp</div>' + "</a>" + '<a class="auto-height button-mini md-button" aria-label="sms"' + "socialshare" + 'socialshare-provider="sms"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}">' + '<md-icon class="mdi mdi-message-text {{$ctrl.iconSize}} material-icons text-primary"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">SMS</div>' + "</a>" + '<a class="auto-height button-mini md-button" aria-label="facebook messenger"' + "socialshare" + 'socialshare-provider="facebook-messenger"' + 'socialshare-url="{{$ctrl.$$url}}">' + '<md-icon class="mdi mdi-facebook-messenger {{$ctrl.iconSize}} material-icons text-messenger"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Messenger</div>' + "</a>" + "</div>" + "<md-divider hide-gt-sm></md-divider>" + '<div class="layout-align-center-center layout-row layout-wrap">' + '<md-button class="auto-height button-mini" aria-label="email"' + "socialshare" + 'socialshare-provider="email"' + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-subject="{{$ctrl.title}}"' + 'socialshare-body="{{$ctrl.text}} - {{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400">' + '<md-icon class="mdi mdi-email {{$ctrl.iconSize}} material-icons text-primary"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">E-mail</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="facebook"' + "socialshare" + 'socialshare-provider="facebook"' + 'socialshare-via="{{$ctrl.fbAppId}}"' + 'socialshare-type="feed"' + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-text="{{$ctrl.title}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-redirect-uri="{{$ctrl.$$url}}"' + 'socialshare-quote="{{$ctrl.title}}"' + 'socialshare-hashtags="{{$ctrl.tags}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-facebook {{$ctrl.iconSize}} material-icons text-fb"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Facebook</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="twitter"' + "socialshare" + 'socialshare-provider="twitter"' + 'socialshare-hashtags="{{$ctrl.tags}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-twitter text-twitter {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Twitter</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="google plus"' + "socialshare" + 'socialshare-provider="google"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-google-plus text-gplus {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Google +</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="telegram"' + "socialshare" + 'socialshare-provider="telegram"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-telegram text-telegram {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Telegram</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="skype"' + "socialshare" + 'socialshare-provider="skype"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-popup-height="800"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-skype text-skype {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Skype</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="reddit"' + "socialshare" + 'socialshare-provider="reddit"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-reddit text-reddit {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Reddit</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="linkedin"' + "socialshare" + 'socialshare-provider="linkedin"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-description="{{$ctrl.text}}"' + 'socialshare-source="{{$ctrl.title}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-linkedin text-linkedin {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Linkedin</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="pinterest"' + "socialshare" + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-provider="pinterest"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-pinterest text-pinterest {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Pinterest</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="tumblr"' + "socialshare" + 'socialshare-provider="tumblr"' + 'socialshare-type="link"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="540"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-tumblr text-tumblr {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Tumblr</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="vk"' + "socialshare" + 'socialshare-provider="vk"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-vk text-vk {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Vk</div>' + "</md-button>" + "</div>" + "</div>"
    });
    function SocialShareCtrl($scope, UrlUtils, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            if (!AppOptions.about) {
                return;
            }
            ctrl.iconSize = ctrl.iconSize || "md-38";
            ctrl.mediaUrl = ctrl.mediaUrl || "/resources/img/favicon-96x96.png";
            ctrl.$$mediaUrl = UrlUtils.parseUrl(ctrl.mediaUrl).href;
            ctrl.$$url = UrlUtils.parseUrl(ctrl.url).href;
        };
    }
})();

(function() {
    "use strict";
    StickyCtrl.$inject = [ "$scope", "$element", "$window" ];
    angular.module("itaca.components").component("chSticky", {
        transclude: true,
        bindings: {
            stickyParent: "@",
            stickyOffset: "@",
            stickyClass: "@",
            scrollContainer: "@",
            onSticky: "&?"
        },
        controller: StickyCtrl,
        template: '<div class="ch-sticky-wrapper"><div class="ch-sticky" ng-transclude></div></div>'
    });
    function StickyCtrl($scope, $element, $window) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$parentNode = ctrl.stickyParent ? document.querySelector(ctrl.stickyParent) : null;
            if (!ctrl.$$parentNode) {
                ctrl.$$parentNode = $element.parent()[0];
            }
            ctrl.$$parentNode.style.position = "relative";
            ctrl.$$wrapperNode = $element[0].querySelector(".ch-sticky-wrapper");
            ctrl.$$targetEl = angular.element($element[0].querySelector(".ch-sticky"));
            ctrl.stickyOffset = ctrl.stickyOffset || 0;
            ctrl.scrollContainer = (ctrl.scrollContainer ? document.querySelector(ctrl.scrollContainer) : null) || $window;
            ctrl.scrollContainer.addEventListener("scroll", ctrl.$doSticky);
        };
        this.$onDestroy = function() {
            ctrl.scrollContainer.removeEventListener("scroll", ctrl.$doSticky);
        };
        this.$doSticky = function() {
            var parentHeight = ctrl.$$parentNode.offsetHeight;
            var offsetTop = ctrl.$$parentNode.offsetTop - ctrl.stickyOffset;
            var elementHeight = ctrl.$$targetEl[0].offsetHeight;
            var hasBackdrop = !_.isEmpty(angular.element(document.querySelectorAll(".md-select-backdrop, .md-menu-backdrop, .md-dialog-backdrop, .md-bottom-sheet-backdrop")));
            var scrollOffset = hasBackdrop ? Math.abs(parseInt(document.body.style.top)) : $window.pageYOffset;
            if (scrollOffset >= offsetTop && scrollOffset <= offsetTop + (parentHeight - elementHeight)) {
                ctrl.$$targetEl.css({
                    position: "fixed",
                    top: ctrl.stickyOffset + "px",
                    "z-index": "10",
                    bottom: "",
                    width: ctrl.$$wrapperNode.offsetWidth + "px"
                });
                if (ctrl.stickyClass) {
                    ctrl.$$targetEl.addClass(ctrl.stickyClass);
                }
                ctrl.onSticky && onSticky();
            } else {
                if (scrollOffset >= offsetTop && scrollOffset > offsetTop + (parentHeight - elementHeight)) {
                    ctrl.$$targetEl.css({
                        position: "absolute",
                        bottom: "0",
                        "z-index": "",
                        top: "",
                        width: ""
                    });
                } else {
                    ctrl.$$targetEl.css({
                        position: "absolute",
                        bottom: "",
                        "z-index": "",
                        top: "0",
                        width: ""
                    });
                }
                if (ctrl.stickyClass) {
                    ctrl.$$targetEl.removeClass(ctrl.stickyClass);
                }
            }
        };
    }
})();

(function() {
    "use strict";
    TimeLeftCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chTimeLeft", {
        bindings: {
            start: "<?",
            end: "<?"
        },
        controller: TimeLeftCtrl,
        template: '<span ng-bind="$ctrl.$$timeLeft"></span>'
    });
    function TimeLeftCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            $scope.$watchGroup([ function() {
                return ctrl.start;
            }, function() {
                return ctrl.end;
            } ], ctrl.$calculateDiff);
        };
        this.$calculateDiff = function() {
            var start = ctrl.start ? moment(ctrl.start) : moment();
            var end = ctrl.start ? moment(ctrl.end) : moment();
            ctrl.$$timeLeft = start.to(end);
        };
    }
})();

(function() {
    "use strict";
    EventCtrl.$inject = [ "$scope", "$element", "$mdMedia" ];
    angular.module("itaca.components").component("chTimelineEvent", {
        require: {
            chTimelineCtrl: "^chTimeline"
        },
        transclude: true,
        bindings: {
            date: "<",
            eventTitle: "@",
            titleQuote: "<?",
            iconBg: "@",
            iconClass: "@",
            dateFormat: "@",
            isNew: "<?",
            ngDisabled: "<?"
        },
        controller: EventCtrl,
        template: '<div class="md-padding relative" ch-animated="{{$ctrl.event.animatedClass}}" ch-animated-delay="{{$ctrl.event.animatedDelay}}">' + '<div class="ch-timeline-event-icon {{$ctrl.event.iconBg}}">' + '<md-icon ng-if="$ctrl.event.iconClass" class="material-icons {{$ctrl.event.iconClass}}"></md-icon>' + '<div ng-if="!$ctrl.event.iconClass" class="md-subhead ng-scope row-mini">' + "<div class=\"text-bold\">{{$ctrl.event.date|utcDate:'d'}}</div>" + "<div class=\"text-small\">{{$ctrl.event.date|utcDate:'MMM'}}</div>" + "</div>" + "</div>" + '<div class="ch-timeline-event-content layout-padding no-padding bg-white text-left md-whiteframe-1dp"  ng-class="{\'locked\': $ctrl.ngDisabled}">' + '<div ng-if="$ctrl.event.title || $ctrl.event.dateFormat" class="layout-row layout-wrap layout-padding layout-align-start-center">' + "<div class=\"md-subhead text-left\" ng-class=\"!$mdMedia('gt-sm') ? 'flex-100': 'flex'\">" + '<span ng-if="$ctrl.isNew"><md-icon class="mdi mdi-new-box text-info material-icons"></md-icon></span>' + '<strong ng-if="$ctrl.event.title">' + "<em>" + '<span ng-if="$ctrl.titleQuote">&ldquo;</span>' + "<span>{{$ctrl.event.title}}</span>" + '<span ng-if="$ctrl.titleQuote">&bdquo;</span>' + "</em>" + "</strong>" + "</div>" + '<div class="text-gray-light text-small">{{$ctrl.event.date|utcDate:$ctrl.event.dateFormat}}</div>' + "</div>" + '<div class="no-padding" ng-transclude></div>' + "</div>" + "</div>"
    });
    function EventCtrl($scope, $element, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.event = {
                date: ctrl.date,
                title: ctrl.eventTitle,
                iconBg: ctrl.iconBg,
                iconClass: ctrl.iconClass,
                dateFormat: ctrl.dateFormat,
                animatedClass: ctrl.chTimelineCtrl.animatedClass
            };
            ctrl.chTimelineCtrl.addEvent(ctrl.event);
            ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
            $element.addClass("ch-timeline-event flex-xs-100 relative layout-column");
            $element.addClass(ctrl.event.align == "CENTER" ? "flex-50" : "flex-100");
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.eventTitle) {
                ctrl.event && (ctrl.event.title = ctrl.eventTitle);
            }
            if (changesObj.date) {
                ctrl.event && (ctrl.event.date = ctrl.date);
            }
            if (changesObj.iconBg) {
                ctrl.event && (ctrl.event.iconBg = ctrl.iconBg);
            }
            if (changesObj.iconClass) {
                ctrl.event && (ctrl.event.iconClass = ctrl.iconClass);
            }
            if (changesObj.dateFormat) {
                ctrl.event && (ctrl.event.dateFormat = ctrl.dateFormat);
            }
        };
        this.$onDestroy = function() {
            ctrl.chTimelineCtrl.removeEvent(ctrl.event);
        };
    }
})();

(function() {
    "use strict";
    TimelineCtrl.$inject = [ "$scope", "$mdMedia", "NumberUtils" ];
    angular.module("itaca.components").component("chTimeline", {
        transclude: true,
        bindings: {
            align: "@",
            randomBg: "<?",
            hideIcon: "<?"
        },
        controller: TimelineCtrl,
        template: '<div class="ch-timeline {{$ctrl.alignClass}} {{$ctrl.barClass}} {{$ctrl.hideIcon ? \'no-icon\' : null}}"><div class="layout-row layout-wrap" ng-transclude></div><bar></bar></div>'
    });
    function TimelineCtrl($scope, $mdMedia, NumberUtils) {
        var ctrl = this;
        this.events = [];
        this.bgArray = [ "bg-success text-white", "bg-info text-white", "bg-warn text-white", "bg-danger text-white", "bg-primary text-white", "bg-primary-light text-white", "bg-blue-sea text-white", "bg-gray-light text-white", "bg-gray-lighter only-border text-gray-light" ];
        this.$onInit = function() {
            ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            ctrl.randomBg = _.isBoolean(ctrl.randomBg) ? ctrl.randomBg : true;
            ctrl.manageAlign();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.hideIcon) {
                ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            }
            if (changesObj.align) {
                ctrl.manageAlign();
            }
        };
        this.manageAlign = function() {
            ctrl.align = _.includes([ "LEFT", "CENTER", "RIGHT" ], ctrl.align) ? ctrl.align : "CENTER";
            ctrl.align = $mdMedia("gt-xs") ? ctrl.align : "RIGHT";
            ctrl.alignClass = "ch-timeline-" + ctrl.align.toLowerCase();
            ctrl.animatedClass = ctrl.align == "RIGHT" ? "slideInRight" : ctrl.align == "LEFT" ? "slideInLeft" : "slideInUp";
            _.forEach(ctrl.events, function(e) {
                e.align = newVal;
            });
        };
        this.manageIconBgColor = function(ev) {
            if (!_.isNil(ev.iconBg) || !ctrl.randomBg) {
                return;
            }
            ctrl.bgArrayLeft = _.isEmpty(ctrl.bgArrayLeft) ? angular.copy(ctrl.bgArray) : ctrl.bgArrayLeft;
            ev.iconBg = _.sample(ctrl.bgArrayLeft);
            _.pull(ctrl.bgArrayLeft, ev.iconBg);
            if (!ctrl.lastIconBg && ctrl.lastIconBg != ev.iconBg) {
                ctrl.lastIconBg = ev.iconBg;
            } else {
                ctrl.manageIconBgColor(ev);
            }
        };
        this.addEvent = function(timelineEvent) {
            timelineEvent.align = ctrl.align;
            ctrl.manageIconBgColor(timelineEvent);
            timelineEvent.index = ctrl.events.push(timelineEvent) - 1;
            timelineEvent.animatedDelay = timelineEvent.index >= 0 && timelineEvent.index <= 10 ? timelineEvent.index * 100 : 1e3;
            ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? "ch-timeline-odd" : "ch-timeline-even";
        };
        this.removeEvent = function(timelineEvent) {
            _.pull(ctrl.events, timelineEvent);
            ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? "ch-timeline-odd" : "ch-timeline-even";
        };
    }
})();

(function() {
    "use strict";
    TruncateCtrl.$inject = [ "$scope", "truncateFilter" ];
    angular.module("itaca.components").component("chTruncate", {
        bindings: {
            text: "@",
            maxLength: "<?",
            suffix: "@",
            hideTooltip: "<?"
        },
        controller: TruncateCtrl,
        template: "<span>" + '<span>{{$ctrl.$$truncated}}</span><md-tooltip ng-if="$ctrl.$$showTooltip">{{$ctrl.text}}</md-tooltip>' + "</span>"
    });
    function TruncateCtrl($scope, truncateFilter) {
        var ctrl = this;
        ctrl.$onInit = function() {
            $scope.$watchGroup([ function() {
                return ctrl.text;
            }, function() {
                return ctrl.maxLength;
            } ], ctrl.$truncate);
        };
        ctrl.$truncate = function() {
            ctrl.$$showTooltip = !ctrl.hideTooltip && ctrl.text.length > ctrl.maxLength;
            ctrl.$$truncated = truncateFilter(ctrl.text, ctrl.maxLength, ctrl.suffix);
        };
    }
})();

(function() {
    "use strict";
    ValueInputCtrl.$inject = [ "$scope", "rangeFilter" ];
    angular.module("itaca.components").component("chValueInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "<",
            counts: "<?",
            disabledCounts: "<?",
            units: "<?",
            disabledUnits: "<?",
            hideUnit: "<?",
            ngMin: "<?",
            ngStep: "<?",
            ngMax: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            errorMessages: "<?"
        },
        controller: ValueInputCtrl,
        templateUrl: "/tpls/value-input/value-input.tpl"
    });
    function ValueInputCtrl($scope, rangeFilter) {
        var ctrl = this;
        this.$$defaultUnits = [ "NUMBERS", "HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS" ];
        this.$onInit = function() {
            ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
        };
        this.$postLink = function() {
            ctrl.$initCounts();
            ctrl.$initUnits();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.ngModel) {
                ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
                if (changesObj.ngModel.isFirstChange()) {
                    ctrl.$$initialValue = angular.copy(ctrl.ngModel);
                }
            }
            if (changesObj.counts || changesObj.disabledCounts || changesObj.ngMin || changesObj.ngStep || changesObj.ngMax) {
                ctrl.$initCounts();
            }
            if (changesObj.units || changesObj.disabledUnits) {
                ctrl.$initUnits();
            }
        };
        this.$initCounts = function() {
            var arr = [];
            if (_.isArray(ctrl.counts) && !_.isEmpty(ctrl.counts)) {
                arr = angular.copy(ctrl.lengths);
            } else {
                var start = 1, end = 10, step = 1;
                if (ctrl.ngMin && _.isFinite(parseFloat(ctrl.ngMin))) {
                    var $$min = parseFloat(ctrl.ngMin);
                    start = $$min >= 0 ? $$min : start;
                }
                if (ctrl.ngStep && _.isFinite(parseFloat(ctrl.ngStep))) {
                    step = parseFloat(ctrl.ngStep);
                }
                if (ctrl.ngMax && _.isFinite(parseFloat(ctrl.ngMax))) {
                    end = parseFloat(ctrl.ngMax);
                }
                var size = end / step;
                size = size < 10 ? size : 10;
                arr = rangeFilter([], size, start, step);
            }
            ctrl.$$counts = _.map(arr, function(i) {
                return {
                    value: i,
                    disabled: _.includes(ctrl.disabledCounts, i) && !(ctrl.$$initialValue && ctrl.$$initialValue.count == i)
                };
            });
            ctrl.$manageManualCount();
        };
        this.$initUnits = function() {
            var units = angular.copy(ctrl.$$defaultUnits);
            if (!_.isEmpty(ctrl.units)) {
                units = _.intersection(ctrl.$$defaultUnits, ctrl.units);
            }
            ctrl.$$units = [];
            _.forEach(units, function(unit) {
                ctrl.$$units.push({
                    value: unit,
                    disabled: _.includes(ctrl.disabledUnits, unit) && !(ctrl.$$initialValue && ctrl.$$initialValue.unit == unit)
                });
            });
        };
        this.$toggleManualCount = function(open) {
            var isManual = _.isBoolean(open) ? open : !ctrl.$$manualCount;
            ctrl.$checkCount();
            if (!isManual) {
                var current = ctrl.ngModel ? ctrl.ngModel.count : null;
                if (!_.some(ctrl.$$counts, {
                    value: current,
                    disabled: false
                })) {
                    var firstValid = _.find(ctrl.$$counts, [ "disabled", false ]);
                    if (_.isNil(firstValid)) {
                        isManual = true;
                    } else {
                        ctrl.ngModel = ctrl.ngModel || {};
                        ctrl.ngModel.count = firstValid.value;
                    }
                }
            }
            ctrl.$$manualCount = isManual;
            return ctrl.$$manualCount;
        };
        this.$manageManualCount = function() {
            if (!ctrl.ngModel || !ctrl.ngModel.count) {
                return ctrl.$toggleManualCount(false);
            }
            return ctrl.$toggleManualCount(!_.some(ctrl.$$counts, [ "value", ctrl.ngModel.count ]));
        };
        this.$checkCount = function() {
            if (!$scope.chValueForm) {
                return;
            }
            var countModelCtrl = $scope.chValueForm.minLength;
            if (!countModelCtrl) {
                return;
            }
            ctrl.$initManualCountValidator();
            countModelCtrl.$validate();
        };
        this.$initManualCountValidator = function() {
            if (!$scope.chValueForm) {
                return;
            }
            var countModelCtrl = $scope.chValueForm.count;
            if (!countModelCtrl) {
                return;
            }
            if (!countModelCtrl.$validators.exists) {
                countModelCtrl.$validators.exists = function(modelValue, viewValue) {
                    if (!modelValue || isNaN(modelValue)) {
                        return true;
                    }
                    var num = Number(modelValue);
                    return !(_.includes(ctrl.disabledCounts, num) && !(ctrl.$$initialValue && ctrl.$$initialValue.count == num));
                };
            }
        };
        this.$update = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
        };
    }
})();

(function() {
    "use strict";
    ValueCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chValue", {
        bindings: {
            value: "<"
        },
        controller: ValueCtrl,
        templateUrl: "/tpls/value/value.tpl"
    });
    function ValueCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    VerticalTextCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chVerticalText", {
        bindings: {
            text: "<"
        },
        controller: VerticalTextCtrl,
        template: "<div>" + '<p ng-repeat="char in $ctrl.$$textArr">{{char}}</p>' + "</div>"
    });
    function VerticalTextCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$prepareText = function() {
            ctrl.$$textArr = _.split(ctrl.text, "");
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.text;
            }, ctr.$prepareText);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").factory("WeatherUtils", WeatherUtilsFactory);
    function WeatherUtilsFactory() {
        var $$service = {};
        $$service.getInfo = function(iconId) {
            if (!iconId) {
                return null;
            }
            var icon = "mdi-minus";
            var label;
            var isNight = iconId.slice(-1) == "n";
            switch (iconId) {
              case "01d":
                label = "sunny";
                icon = "sunny";
                break;

              case "01n":
                label = "starry";
                icon = "starry";
                break;

              case "02d":
              case "02n":
                label = "partly.cloudy";
                icon = "cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                label = "cloudy";
                icon = "cloudy";
                break;

              case "09d":
              case "09n":
                label = "drizzle";
                icon = "rainy";
                break;

              case "010d":
              case "010n":
                label = "rain";
                icon = "rainy";
                break;

              case "011d":
              case "011n":
                label = "thunderstorm";
                icon = "stormy";
                break;

              case "013d":
              case "013n":
                label = "snowy";
                icon = "snowy";
                break;

              case "050d":
              case "050n":
                label = "variable";
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;

              default:
                label = "variable";
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;
            }
            return {
                icon: icon,
                label: label,
                isNight: isNight
            };
        };
        $$service.getLabel = function(iconId) {
            if (!iconId) {
                return null;
            }
            var label = "";
            switch (iconId) {
              case "01d":
                label = "sunny";
                break;

              case "01n":
                label = "starry";
                break;

              case "02d":
              case "02n":
                label = "partly.cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                label = "cloudy";
                break;

              case "09d":
              case "09n":
                label = "drizzle";
                break;

              case "010d":
              case "010n":
                label = "rain";
                break;

              case "011d":
              case "011n":
                label = "thunderstorm";
                break;

              case "013d":
              case "013n":
                label = "snowy";
                break;

              case "050d":
              case "050n":
                label = "variable";
                break;

              default:
                label = "variable";
                break;
            }
            return label;
        };
        $$service.getIconClass = function(iconId) {
            if (!iconId) {
                return null;
            }
            var icon = "mdi-minus";
            switch (iconId) {
              case "01d":
                icon = "sunny";
                break;

              case "01n":
                icon = "starry";
                break;

              case "02d":
              case "02n":
                icon = "cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                icon = "cloudy";
                break;

              case "09d":
              case "09n":
                icon = "rainy";
                break;

              case "010d":
              case "010n":
                icon = "rainy";
                break;

              case "011d":
              case "011n":
                icon = "stormy";
                break;

              case "013d":
              case "013n":
                icon = "snowy";
                break;

              case "050d":
              case "050n":
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;

              default:
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;
            }
            return icon;
        };
        $$service.isNight = function(iconId) {
            if (!iconId) {
                return null;
            }
            return iconId.slice(-1) == "n";
        };
        return $$service;
    }
})();

(function() {
    "use strict";
    WeatherCtrl.$inject = [ "$scope", "$log", "$http", "Weather", "WeatherUtils", "NumberUtils" ];
    angular.module("itaca.components").component("chWeather", {
        bindings: {
            city: "@",
            country: "@"
        },
        controller: WeatherCtrl,
        template: "<div>" + '<div class="relative overflow-hidden weather-container">' + "<i ng-if=\"$ctrl.$$weather.label == 'partly.cloudy'\" ng-class=\"$ctrl.$$weather.isNight ? 'starry' : 'sunny'\" class=\"cloud\"></i>" + '<i class="{{$ctrl.$$weather.icon}}"></i>' + "</div>" + '<div ng-if="$ctrl.$$weather.label" class="text-white"><span translate="weather.{{$ctrl.$$weather.label}}"></span></div>' + '<div class="md-headline text-bold text-white text-capitalize"><span>{{$ctrl.city}}</span></div>' + '<div class="md-body-2 text-white text-uppercase"><span>{{$ctrl.country}}</span></div>' + "<div>" + '<span class="md-headline text-bold text-white">{{$ctrl.$$weather.temp}}</span>' + '<mdi-icon class="mdi mdi-temperature-celsius material-icons text-white"></md-icon>' + "</div>" + "</div>"
    });
    function WeatherCtrl($scope, $log, $http, Weather, WeatherUtils, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$reset();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.city) {
                ctrl.$getWeather();
            }
        };
        this.$reset = function() {
            ctrl.$$weather = {
                icon: "mdi mdi-minus material-icons md-164",
                temp: "-"
            };
        };
        this.$getWeather = function() {
            Weather.get(ctrl.city, ctrl.country).then(function(response) {
                if (!_.isNil(response)) {
                    ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.main.temp, 1);
                    ctrl.$getInfo(response.weather[0].icon);
                } else {
                    $log.error("Error getting weather");
                }
            }, function(error) {
                $log.error(error);
                ctrl.$reset();
            });
        };
        this.$getInfo = function(iconId) {
            _.assign(ctrl.$$weather, WeatherUtils.getInfo(iconId));
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").provider("Weather", WeatherProvider);
    function WeatherProvider() {
        var $$appId = "";
        this.setAppId = function(appId) {
            $$appId = appId;
        };
        this.$get = [ "$resource", "$q", function($resource, $q) {
            return new Weather($resource, $q, $$appId);
        } ];
    }
    function Weather($resource, $q, appId) {
        var $$service = this;
        this.$$appId = appId;
        this.API = $resource("https://api.openweathermap.org/data/2.5/weather");
        this.get = function(city, country) {
            var deferred = $q.defer();
            if (!city) {
                deferred.reject("City cannot be null");
                return deferred.promise;
            }
            var params = {
                appId: $$service.$$appId,
                q: city + "," + country,
                mode: "json",
                units: "metric"
            };
            $$service.API.get(params, function(response) {
                deferred.resolve(response);
            }, function(response) {
                deferred.reject(response.data && response.data.message ? response.data.message : "Error getting weather for " + city + ", " + country);
            });
            return deferred.promise;
        };
    }
})();

(function() {
    "use strict";
    WizardStepDoneCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chWizardStepDone", {
        transclude: true,
        require: {
            chWizardStepsDoneContentCtrl: "^chWizardStepsDoneContent"
        },
        bindings: {
            label: "@",
            labelClass: "@",
            onEdit: "&"
        },
        controller: WizardStepDoneCtrl,
        templateUrl: "/tpls/wizard/wizard-step-done.tpl"
    });
    function WizardStepDoneCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.labelClass = ctrl.labelClass || "text-primary";
            ctrl.$$step = {
                label: ctrl.label,
                $uid: NumberUtils.uniqueNumber(),
                $done: true,
                $active: false
            };
            ctrl.chWizardStepsDoneContentCtrl.addStep(ctrl.$$step);
        };
        this.$onDestroy = function() {
            ctrl.chWizardStepsDoneContentCtrl.removeStep(ctrl.$$step);
        };
        this.$edit = function() {
            ctrl.chWizardStepsDoneContentCtrl.editStep(ctrl.$$step);
        };
    }
})();

(function() {
    "use strict";
    WizardStepCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chWizardStep", {
        transclude: true,
        require: {
            chWizardCtrl: "^chWizard"
        },
        bindings: {
            label: "@",
            labelClass: "@",
            activeLabelClass: "@"
        },
        controller: WizardStepCtrl,
        templateUrl: "/tpls/wizard/wizard-step.tpl"
    });
    function WizardStepCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.activeLabelClass = ctrl.activeLabelClass || "text-primary";
            ctrl.$$step = {
                label: ctrl.label,
                $uid: NumberUtils.uniqueNumber()
            };
            ctrl.chWizardCtrl.addStep(ctrl.$$step);
        };
        this.$onDestroy = function() {
            ctrl.chWizardCtrl.removeStep(ctrl.$$step);
        };
    }
})();

(function() {
    "use strict";
    WizardStepsDoneContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chWizardStepsDoneContent", {
        transclude: true,
        require: {
            chWizardCtrl: "^chWizard"
        },
        controller: WizardStepsDoneContentCtrl,
        templateUrl: "/tpls/wizard/wizard-steps-done-content.tpl"
    });
    function WizardStepsDoneContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
        this.addStep = function(step) {
            if (!_.isPlainObject(step)) {
                return false;
            }
            ctrl.$$doneSteps = _.isArray(ctrl.$$doneSteps) ? ctrl.$$doneSteps : [];
            step.$active = _.isEmpty(ctrl.$$doneSteps);
            step.$first = _.isEmpty(ctrl.$$doneSteps);
            step.$index = _.size(ctrl.$$doneSteps);
            step.$last = false;
            step.$done = true;
            return ctrl.$$doneSteps.push(step) - 1;
        };
        this.removeStep = function(step) {
            _.pull(ctrl.$$doneSteps, step);
        };
        this.editStep = function(step) {
            ctrl.removeStep(step);
            ctrl.chWizardCtrl.editStep(step);
        };
    }
})();

(function() {
    "use strict";
    WizardCtrl.$inject = [ "$scope", "$timeout", "FormUtils" ];
    angular.module("itaca.components").component("chWizard", {
        transclude: true,
        bindings: {
            direction: "@",
            onForward: "&",
            onBack: "&",
            onConfirm: "&"
        },
        controller: WizardCtrl,
        templateUrl: "/tpls/wizard/wizard.tpl"
    });
    function WizardCtrl($scope, $timeout, FormUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.direction = ctrl.direction || "vertical";
        };
        this.addStep = function(step) {
            if (!_.isPlainObject(step)) {
                return false;
            }
            ctrl.$$steps = _.isArray(ctrl.$$steps) ? ctrl.$$steps : [];
            step.$first = _.isEmpty(ctrl.$$steps);
            step.$index = _.size(ctrl.$$steps);
            step.$last = false;
            step.$done = false;
            if (step.$first) {
                ctrl.$$currentStep = step;
                step.$stopAnimation = true;
                step.$active = true;
            }
            return ctrl.$$steps.push(step) - 1;
        };
        this.removeStep = function(step) {
            _.pull(ctrl.$$steps, step);
        };
        this.editStep = function(step) {
            return ctrl.$goToStep(step.$index);
        };
        this.$forward = function() {
            var form = $scope.chFormWizardForm;
            form.$setSubmitted();
            if (form.$invalid) {
                FormUtils.focusFirstInvalid(form.$name);
                return false;
            }
            if (ctrl.$goToStep(ctrl.$$currentStep.$index + 1)) {
                ctrl.onForward && ctrl.onForward({
                    $form: form,
                    $step: ctrl.$$currentStep
                });
            }
        };
        this.$back = function() {
            return ctrl.$goToStep(ctrl.$$currentStep.$index - 1);
        };
        this.$confirm = function() {
            var form = $scope.chFormWizardForm;
            form.$setSubmitted();
            if (form.$invalid) {
                FormUtils.focusFirstInvalid(form.$name);
                return false;
            }
            if (ctrl.$$currentStep.$last) {
                ctrl.onConfirm && ctrl.onConfirm({
                    $form: form,
                    $step: ctrl.$$currentStep
                });
            } else {
                ctrl.$forward();
            }
        };
        this.$goToStep = function(index) {
            if (index < 0 || index >= _.size(ctrl.$$steps)) {
                return false;
            }
            _.forEach(ctrl.$$steps, function(step, idx, collection) {
                step.$active = false;
                step.$stopAnimation = false;
                step.$first = idx == 0;
                step.$last = idx == _.size(collection) - 1;
            });
            ctrl.$$currentStep = ctrl.$$steps[index];
            ctrl.$$currentStep.$active = true;
            $timeout(function() {
                ctrl.$$currentStep.$stopAnimation = true;
            }, 1e3);
            return index;
        };
    }
})();

angular.module("itaca.components").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("/tpls/amount-input/amount-input.tpl", '<ng-form name="chAmountInputForm"><div layout layout-padding class="no-padding"><div><md-input-container md-no-float="$ctrl.labelNoFloat" class="{{$ctrl.inputContainerClass}}" ng-class="{\'md-icon-left\': $ctrl.amountType, \'no-padding-left\': !$ctrl.amountType}"><label ng-if="$ctrl.label && !$ctrl.labelNoFloat"><span ng-bind="$ctrl.label"></span></label><md-icon ng-if="$ctrl.amountType == \'PRICE\'" class="mdi md-18" ng-class="{\n' + "\t\t\t\t\t'mdi-currency-eur': !$ctrl.amountCurrency || $ctrl.amountCurrency == 'EUR', \n" + '\t\t\t\t\t\'mdi-currency-usd\': $ctrl.amountCurrency == \'USD\'}"></md-icon><md-icon ng-if="$ctrl.amountType == \'PERCENTAGE\'" class="mdi mdi-percent md-18"></md-icon><input type="number" name="{{$ctrl.inputName}}" placeholder="{{$ctrl.label}}" ng-model="$ctrl.ngModel.finalAmount" ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.readonly" ng-change="$ctrl.$update()" ng-min="$ctrl.ngMin" ng-step="$ctrl.ngStep" ng-max="$ctrl.ngModel.type == \'PERCENTAGE\' ? 100 : $ctrl.ngMax" ng-pattern="$ctrl.allowNegative ? $ctrl.$$REGEXP.priceNoStrict : $ctrl.$$REGEXP.price" aria-label="Amount"><div ng-if="$ctrl.errorMessages" ng-messages="chAmountInputForm[$ctrl.inputName].$error"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></div><div ng-if="!$ctrl.amountType"><md-input-container md-no-float><md-select name="amountType" placeholder="{{::(\'common.amount.type\'|translate)}}" ng-model="$ctrl.ngModel.type" ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.readonly" ng-change="$ctrl.$update()" aria-label="Amount type"><md-option value="PRICE" ng-selected="!$ctrl.ngModel.type || $ctrl.ngModel.type == \'PRICE\'"><md-icon class="mdi md-14" ng-class="{\n' + "\t         \t\t\t\t'mdi-currency-eur': !$ctrl.amountCurrency || $ctrl.amountCurrency == 'EUR', \n" + '\t         \t\t\t\t\'mdi-currency-usd\': $ctrl.amountCurrency == \'USD\'}"></md-icon></md-option><md-option value="PERCENTAGE" ng-selected="$ctrl.ngModel.type == \'PERCENTAGE\'"><md-icon class="mdi mdi-percent md-14"></md-icon></md-option></md-select><div ng-messages="chAmountInputForm.amountType.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div></div></ng-form>');
    $templateCache.put("/tpls/bed-sold-edit/bed-sold-edit.tpl", '<div><ng-form name="bedSoldEditForm"><div layout><div flex><strong><span translate="bed.bed"></span><span translate="bed.{{$ctrl.bedSold.bed.type}}"></span></strong><div class="text-gray-light text-small"><span translate="bed.{{$ctrl.bedSold.bed.type}}.description"></span></div><div class="text-small text-lowercase"><span ng-if="$ctrl.bedSold.bed.adultsPrice"><span>{{$ctrl.bedSold.bed.adultsPrice|chCurrency}}&nbsp;</span><span translate="people.adult"></span><span ng-if="$ctrl.bedSold.bed.boysPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.boysPrice"><span>{{$ctrl.bedSold.bed.boysPrice|chCurrency}}&nbsp;</span><span translate="people.boy"></span><span ng-if="$ctrl.bedSold.bed.childrenPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.childrenPrice"><span>{{$ctrl.bedSold.bed.childrenPrice|chCurrency}}&nbsp;</span><span translate="people.child"></span><span ng-if="$ctrl.bedSold.bed.kidsPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.kidsPrice"><span>{{$ctrl.bedSold.bed.kidsPrice|chCurrency}}&nbsp;</span><span translate="people.kid"></span></span></div><div class="text-gray-light"><small><span><span translate="common.for"></span>&nbsp;{{$ctrl.bedSold.bed.maxPerson}}&nbsp;</span><span ng-if="$ctrl.bedSold.bed.maxPerson > 1" class="text-lowercase" translate="people.people"></span><span ng-if="$ctrl.bedSold.bed.maxPerson == 1" class="text-lowercase" translate="people.person"></span></small></div><div class="text-gray-light"><small><em ng-if="$ctrl.bedSold.bed.frequency == \'LUMP_SUM\'"><span translate="bed.price.question.info"></span><span class="text-lowercase" translate="common.entire.stay"></span></em><em ng-if="$ctrl.bedSold.bed.frequency == \'DAILY\'" translate="bed.price.question.info.and.night"></em></small></div></div><div class="layout-row layout-align-center-end"><div class="layout-column layout-align-center-center"><strong ng-if="$ctrl.$$guestsCount.total > 0 && $ctrl.bedSold.amount" class="md-title"><span ng-if="$ctrl.bedSold.amount.finalAmount > 0">{{$ctrl.bedSold.amount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.bedSold.amount.finalAmount == 0" class="text-success" translate="common.free"></span></strong><span ng-if="$ctrl.$$guestsCount.total <= 0 || !$ctrl.bedSold.amount">-</span><small class="text-mini text-gray-light no-padding-bottom"><span ng-if="$ctrl.nights > 1" translate="reservation.price.for.nights" translate-values="{count: $ctrl.nights}"></span><span ng-if="$ctrl.nights == 1" translate="reservation.price.for.one.night"></span></small></div></div></div><h2 class="md-subhead no-margin-bottom" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><i translate="bed.sleep.here"></i></h2><div><ch-people-counters name="people" ng-model="$ctrl.bedSold.people" max-people="$ctrl.bedSold.bed.people" min="1" max="$ctrl.bedSold.bed.maxPerson" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-show="bedSoldEditForm.people.$dirty" ng-messages="bedSoldEditForm.people.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.bed.no.people"></span></div></div><div ng-if="bedSoldEditForm.people.$valid && $ctrl.$$guestsCount.total == $ctrl.bedSold.bed.maxPerson" class="md-padding no-padding-top"><span class="label label-inline-block bg-info text-wrap text-center" translate="bed.max.person.selected"></span></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel bed edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="bedSoldEditForm.$invalid" aria-label="Confirm bed edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/booking-form/booking-form.tpl", '<ng-form name="bookingForm" novalidate layout="column" layout-padding><div class="md-subhead no-padding-top no-padding-bottom text-gray-light text-center"><strong ng-if="$ctrl.reservation.nights && $ctrl.reservation.rooms.length"><span translate="reservation.summary.your"></span></strong><strong ng-if="$ctrl.reservation.nights && !$ctrl.reservation.rooms.length"><span translate="reservation.summary.search"></span></strong><strong ng-if="!$ctrl.reservation.nights"><span translate="reservation.search.your.room"></span></strong></div><div ng-if="!$ctrl.step || $ctrl.step <= 1" class="no-padding-top no-padding-bottom" layout="column" layout-padding-sm><div flex layout="column"><ch-date-range-picker label="{{\'reservation.when.question\'|translate}}" start-label="{{\'date.checkin\'|translate}}" start-hint-label="{{\'date.checkin.select.alt\'|translate}}" start="$ctrl.reservation.checkin" start-min-date="$ctrl.minDate" start-error-messages="{mindate: (\'error.date.before.today\'|translate)}" end-label="{{\'date.checkout\'|translate}}" end-hint-label="{{\'date.checkout.select.alt\'|translate}}" end="$ctrl.reservation.checkout" end-min-date="$ctrl.$$minEndDate" end-max-date="$ctrl.$$maxEndDate" end-error-messages="{mindate: (\'error.date.end.before.start\'|translate), maxdate: (\'error.reservation.search.maxdate\'|translate)}" max-range="$ctrl.maxRange" diff-label-singular="{{\'common.night\'|translate}}" diff-label-plural="{{\'common.nights\'|translate}}" disable-body-scroll="false" ng-required="true"></ch-date-range-picker></div><md-divider class="no-padding"></md-divider><div flex layout="column"><ch-people-picker label="{{\'reservation.people.question\'|translate}}" people="$ctrl.reservation.people" ng-required="true" has-confirm="true" disable-body-scroll="false" fullscreen="$ctrl.$mdMedia(\'xs\')"></ch-people-picker></div><md-divider></md-divider></div><div ng-if="$ctrl.step > 1" class="no-padding-top no-padding-bottom" layout="column" layout-padding-sm><div flex layout="column"><div layout="column" layout-padding class="text-center"><div class="text-gray-light text-small no-padding-bottom"><span>{{\'reservation.when.question\'|translate}}</span></div><div class="layout layout-wrap layout-align-center-center row-mini text-lowercase no-padding-bottom"><span><span translate="date.from.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.reservation.checkin|date:"shortDate"}}</strong></span>&nbsp;</span><span><span translate="date.to.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.reservation.checkout|date:"shortDate"}}</strong></span></span><span ng-if="$ctrl.reservation.nights" class="text-gray-light text-small no-padding no-margin text-lowercase">&nbsp;(<span>{{$ctrl.reservation.nights}}&nbsp;</span><span ng-show="$ctrl.reservation.nights == 1" translate="common.night"></span><span ng-show="$ctrl.reservation.nights > 1" translate="common.nights"></span>)</span></div></div></div><md-divider class="no-padding"></md-divider><div flex layout="column"><div layout="column" layout-padding class="text-center"><div class="text-gray-light text-small no-padding-bottom"><span translate="reservation.people.question"></span></div><div ng-if="$ctrl.reservation.people" class="md-subhead text-wrap row-mini no-padding-bottom"><strong><ch-people-summary people="$ctrl.reservation.people"></ch-people-summary></strong></div><div ng-if="$ctrl.step == 2 && ($ctrl.$$remainingPeople.adults > 0 || $ctrl.$$remainingPeople.boys > 0 || $ctrl.$$remainingPeople.children > 0 || $ctrl.$$remainingPeople.kids > 0)" class="text-lowercase text-small text-warn"><md-icon class="mdi mdi-alert md-14 text-warn"></md-icon><span translate="reservation.people.unsatisfied"></span>:&nbsp;<strong><ch-people-summary people="$ctrl.$$remainingPeople"></ch-people-summary>&nbsp;<span translate="reservation.people.unsatisfied.to.arrange"></span></strong>.&nbsp;<span class="text-initial" translate="reservation.people.unsatisfied.add.beds.or.rooms"></span>.</div></div></div><md-divider></md-divider></div><div id="booking-summary" class="no-padding-top no-padding-bottom layout-padding-sm" ng-show="$ctrl.reservation.totalAmount.finalAmount && $ctrl.reservation.totalAmount.finalAmount > 0"><div class="text-gray-light text-small text-center"><span translate="reservation.rooms.details"></span>:</div><div><ul class="no-margin-x-sides"><li ng-repeat="room in $ctrl.reservation.rooms"><div class="layout-row layout-padding-sm layout-align-start-center"><small class="flex no-padding-y-sides"><strong>1&nbsp;<span translate="{{room.type.roomType.nameKey}}"></span>&nbsp;<small class="text-uppercase" translate="room.category.{{room.type.category}}"></small></strong><span ng-if="$ctrl.reservation.nights > 1" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}&nbsp;<span translate="common.nights"></span>)</span></span></small><div class="text-right no-padding-y-sides"><div class="text-gray-light text-small text-striked" ng-if="room.totalRate.amount.initialAmount != room.totalRate.amount.finalAmount"><em>{{room.totalRate.amount.initialAmount|chCurrency}}</em></div><div><span>{{room.totalRate.amount.finalAmount|chCurrency}}</span></div></div></div><ul ng-if="room.services.length" class="no-padding no-margin-right no-margin-bottom no-margin-top"><li ng-if="!serviceSold.included" ng-repeat="serviceSold in room.services" class="layout-row layout-padding-sm layout-align-start-center" ng-class="{\'text-danger\': serviceSold.toRemove}"><small class="flex no-padding-y-sides"><span><span ng-if="serviceSold.count > 1">{{serviceSold.count}}</span><span ng-if="serviceSold.count <= 1">1</span><span>&nbsp;<span translate="{{serviceSold.service.type.nameKey}}"></span></span></span><span ng-if="serviceSold.service.paymentType == \'PER_PERSON\' && ! serviceSold.toRemove">&nbsp;x&nbsp;<ch-people-summary people="serviceSold.people" no-details="true"></ch-people-summary></span><span ng-if="$ctrl.reservation.nights > 1 && serviceSold.service.frequency == \'DAILY\'" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}<span translate="date.days.abbr"></span>)</span></span></small><span class="text-right no-padding-y-sides"><span ng-if="serviceSold.amount.finalAmount > 0">{{serviceSold.amount.finalAmount|chCurrency}}</span><i ng-if="serviceSold.amount.finalAmount <= 0" translate="common.free"></i></span></li></ul><ul ng-if="room.otherBeds.length" class="flex-100 no-padding no-margin-right no-margin-bottom no-margin-top"><li ng-repeat="bedSold in room.otherBeds" class="layout-row layout-padding-sm layout-align-start-center"><small class="flex no-padding-y-sides"><span>1&nbsp;<span class="text-lowercase" translate="bed.bed"></span>&nbsp;<span translate="{{\'bed.\' + bedSold.bed.type}}"></span></span><span>&nbsp;x&nbsp;<ch-people-summary people="bedSold.people" no-details="true"></ch-people-summary></span><span ng-if="$ctrl.reservation.nights > 1" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}&nbsp;<span translate="common.nights"></span>)</span></span></small><span class="text-right no-padding-y-sides"><span>{{bedSold.amount.finalAmount|chCurrency}}</span></span></li></ul></li></ul></div><md-divider></md-divider><div class="layout-row layout-wrap layout-padding no-pading-top no-padding-left no-padding-right" ng-if="$ctrl.reservation.totalAmount.finalAmount"><div class="flex no-padding" style="min-width: 125px"><div class="md-headline"><span translate="common.total"></span>&nbsp;</div><div ng-if="$ctrl.currentCurrency != $ctrl.hotelCurrency" class="text-lowercase" style="margin-top:-6px"><small>(<span translate="currency.your.currency"></span>)</small></div></div><div class="text-right no-padding md-headline"><span>{{$ctrl.reservation.totalAmount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.currentCurrency != $ctrl.hotelCurrency">*</span></div></div><div class="layout-row layout-padding no-padding-left no-padding-right no-padding-top" ng-if="$ctrl.reservation.totalAmount.finalAmount && $ctrl.currentCurrency != $ctrl.hotelCurrency"><div class="flex no-padding"><div class="md-subhead"><span translate="common.total"></span>:</div><div class="text-lowercase" style="margin-top:-6px"><small>(<span translate="currency.hotel.currency"></span>)</small></div></div><div class="md-subhead text-right no-padding"><span>{{$ctrl.reservation.totalAmount.finalAmount | chCurrency:$ctrl.hotelCurrency }}</span></div></div><div class="text-gray-light layout-row no-padding" ng-if="$ctrl.reservation.totalAmount.finalAmount && $ctrl.currentCurrency != $ctrl.hotelCurrency"><small class="layout-column layout-margin no-margin"><span class="no-margin"><span translate="currency.info.payment" translate-values="{name: $ctrl.reservation.hotel.name}"></span><span>:&nbsp;{{ 1 | chCurrency:$ctrl.hotelCurrency}} = {{ 1 | chCurrency}}</span></span><span class="no-margin-left no-margin-bottom no-margin-right"><span translate="currency.info.payment2"></span></span></small></div></div><div layout="column" class="no-padding" ng-switch="$ctrl.step"><div ng-switch-default layout="column"><md-button class="md-raised md-primary row-1" ng-disabled="bookingForm.$invalid" ch-click="$ctrl.$search()" aria-label="Check availability"><div layout="column" layout-padding><span translate="reservation.availability.check"></span></div></md-button></div><div ng-switch-when="1" layout="column"><md-button class="md-raised md-primary row-1" ng-disabled="$ctrl.reservation.rooms.length <= 0" ng-click="$ctrl.$next()" aria-label="Book now"><div layout="column" layout-padding><span ng-if="$ctrl.reservation.rooms.length"><span translate="reservation.instant"></span><md-icon class="mdi mdi-chevron-right" ng-class="{\'animated infinite wobble\':$ctrl.reservation.rooms.length}"></md-icon></span><span ng-if="!$ctrl.reservation.rooms.length"><span translate="reservation.rooms.select"></span></span></div></md-button></div><div ng-switch-when="2|3|4" ng-switch-when-separator="|" layout="column"><md-button class="md-raised row-1" ng-class="{\'md-primary\': $ctrl.step == 2, \'bg-success\': $ctrl.step == 3}" ng-click="$ctrl.$next()" aria-label="Book now" ng-switch="$ctrl.step"><div ng-switch-when="2" layout="column" layout-padding><span><span translate="common.last.step"></span><md-icon class="mdi mdi-chevron-right animated infinite wobble"></md-icon></span></div><div ng-switch-when="3" layout="column" layout-padding><div class="text-initial no-padding"><small translate="reservation.text.alright"></small></div><div class="text-uppercase no-padding"><strong translate="reservation.book.now" style="margin-left: 24px"></strong><md-icon class="mdi mdi-chevron-right text-white animated infinite wobble"></md-icon></div><small ng-if="$ctrl.reservation.guest.email" class="ng-binding ng-scope no-padding text-initial text-wrap"><span><span translate="reservation.email.confirm.to"></span>:&nbsp;</span><span>{{$ctrl.reservation.guest.email}}</span></small></div></md-button></div></div><div class="layout-column layout-padding no-padding text-center" ng-if="$ctrl.step <= 1"><span class="no-padding-bottom"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<span class="text-success" translate="common.only.two.min"></span></span></div><div layout="column" class="text-gray-light" ng-if="$ctrl.reservation.nights"><small><span ng-if="$ctrl.reservation.nights == 1" translate="reservation.rates.info.night"></span><span ng-if="$ctrl.reservation.nights > 1" translate="reservation.rates.info.nights" translate-value-count="{{$ctrl.reservation.nights}}"></span></small><small ng-if="$ctrl.roomVatRate"><strong><span translate="common.included"></span>:</strong>&nbsp;{{::$ctrl.roomVatRate}}%&nbsp;<span translate="billing.vat.tax"></span></small><small ng-if="$ctrl.hotelCityTax || $ctrl.reservation.checkinDetails"><strong><span translate="common.included.not"></span>:</strong>&nbsp;<span ng-if="$ctrl.hotelCityTax">{{::($ctrl.hotelCityTax|chCurrency:$ctrl.hotelCurrency)}}&nbsp;<span translate="reservation.cityTax.description"></span></span><span ng-if="$ctrl.reservation.checkinDetails && $ctrl.reservation.checkinDetails.amount.finalAmount"><span ng-if="$ctrl.hotelCityTax">,&nbsp;</span>"{{::($ctrl.reservation.checkinDetails.amount.finalAmount|chCurrency:$ctrl.hotelCurrency)}}&nbsp;<span translate="reservation.checkinDetails.description"></span></span></small></div></ng-form>');
    $templateCache.put("/tpls/cancellation-policy-info/cancellation-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="reservation.cancellation.terms.conditions"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.cancellationPolicy || !$ctrl.cancellationPolicy.cancellation"><span translate="reservation.cancellation.room.no.condition"></span></div><div flex ng-if="$ctrl.cancellationPolicy && $ctrl.cancellationPolicy.cancellation"><div class="layout-column" ng-if="!$ctrl.cancellationPolicy.cancellation.deposit"><div ng-switch="$ctrl.rateType"><div ng-switch-when="STANDARD"><span ng-if="!$ctrl.cancellationPolicy.flexible"><span translate="reservation.cancellation.room.condition.free.label"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}].</span><span translate="reservation.cancellation.room.condition.free.label2"></span></span><span ng-if="$ctrl.cancellationPolicy.flexible"><span translate="reservation.cancellation.room.condition.flex.label" translate-values="{limit: ($ctrl.cancellationPolicy.limitDate|offsetDate:\'short\':$ctrl.offset) + \' [\' + $ctrl.city + \']\'}"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</div><div ng-switch-when="NOT_REFUNDABLE"><span translate="reservation.cancellation.room.condition.notRef.label"></span><span ng-if="$ctrl.cancellationPolicy.limitDate"><span translate="reservation.cancellation.room.condition.notRef.label2"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}],</span><span translate="reservation.cancellation.room.condition.notRef.label3"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</span><span ng-if="!$ctrl.cancellationPolicy.limitDate"><span translate-once="reservation.cancellation.room.condition.notRef.label4"></span><strong>{{room.total$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</span></div></div></div><div class="layout-column" ng-if="$ctrl.cancellationPolicy.cancellation.deposit"><div class="no-margin-top"><span translate="reservation.room.deposit.label1"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.<span translate="reservation.room.deposit.label2"></span></div></div></div></div>');
    $templateCache.put("/tpls/card/card.tpl", '<div layout-fill class="md-whiteframe-1dp bg-white flex layout-column" ng-click="$ctrl.$goTo()" ng-class="{\'clickable\': !$ctrl.ngDisabled && ($ctrl.url || $ctrl.state || $ctrl.onClick), \'cursor-disabled\': $ctrl.ngDisabled}"><div class="relative"><div ng-if="$ctrl.ngDisabled" class="disabled-box {{$ctrl.disabledClass}}"><span ng-if="$ctrl.disabledLabel" class="disabled-box-bar {{$ctrl.disabledBarClass}}">{{$ctrl.disabledLabel}}</span></div><div ng-if="$ctrl.isCompleted || $ctrl.isRequired || $ctrl.isSuggested" class="absolute full-width ng-scope text-right"><div ng-if="$ctrl.isCompleted" class="bg-success label label-inline-block md-margin"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-white"></md-icon><span translate-once="common.full.alt"></span></div><div ng-if="$ctrl.isRequired && !$ctrl.isCompleted" class="bg-danger label label-inline-block md-margin"><md-icon class="mdi mdi-alert-circle-outline text-white"></md-icon><span translate-once="common.to.complete"></span></div><div ng-if="$ctrl.isSuggested && !$ctrl.isRequired && !$ctrl.isCompleted" class="bg-info label label-inline-block md-margin"><md-icon class="mdi mdi-information-outline text-white"></md-icon><span translate-once="common.hint"></span></div></div><div class="layout-padding no-padding-right absolute position-right position-top" style="z-index:2"><md-menu class="md-secondary" ng-if="$ctrl.menuItems && !$ctrl.ngDisabled"><md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)"><md-icon class="mdi mdi-dots-vertical text-white"></md-icon></md-button><md-menu-content width="4"><div ng-repeat="item in $ctrl.menuItems" ng-if="!item.hide" layout="column"><md-menu-divider ng-if="item.type == \'divider\'"></md-menu-divider><md-menu-item ng-if="item.type != \'divider\'"><md-button ng-click="$ctrl.$menuClick($event, item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled"><md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span></md-button></md-menu-item></div></md-menu-content></md-menu><md-menu class="md-secondary" ng-if="$ctrl.disabledMenuItems && $ctrl.ngDisabled"><md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)"><md-icon class="mdi mdi-dots-vertical text-white"></md-icon></md-button><md-menu-content width="4"><div ng-repeat="item in $ctrl.disabledMenuItems" ng-if="!item.hide" layout="column"><md-menu-divider ng-if="item.type == \'divider\'"></md-menu-divider><md-menu-item ng-if="item.type != \'divider\'"><md-button ng-click="$ctrl.$menuClick($event, item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled"><md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span></md-button></md-menu-item></div></md-menu-content></md-menu></div><div class="flex layout-column layout-align-center-center text-center overflow-hidden card-image" ng-class="{\'md-hover-icon\': !$ctrl.noHover}" ng-style="$ctrl.$$bgStyle"><div ng-if="$ctrl.imgUrl" class="{{$ctrl.imgContClass}}"><img ng-if="$ctrl.imgUrl" ng-src="{{$ctrl.imgUrl}}" class="{{$ctrl.imgClass}}" lazy-image loaded-class="animated fadeIn"></div><div ng-if="!$ctrl.imgUrl && ($ctrl.iconClass || $ctrl.iconSecondaryClass)"><div class="layout-column layout-padding-sm layout-align-center-center"><div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'top\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div><div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'top\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div><div><span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'left\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span><span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'left\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span><md-icon md-font-set="{{$ctrl.iconFontSet}}" class="{{$ctrl.iconClass}}" ng-class="{\'material-icons\': !$ctrl.iconFontSet}"></md-icon><md-icon ng-if="$ctrl.otherIconClass" md-font-set="{{$ctrl.otherIconFontSet}}" class="{{$ctrl.otherIconClass}}" ng-class="{\'material-icons\': !$ctrl.otherIconFontSet}"></md-icon><span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'right\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span><span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'right\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span></div><div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'bottom\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div><div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'bottom\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div></div></div><div ng-if="$ctrl.showAvatar && !$ctrl.imgUrl && !$ctrl.iconClass && !i$ctrl.conSecondaryClass && ($ctrl.title || $ctrl.description)" class="layout-row layout-align-center-center {{$ctrl.imgContClass}}"><span class="md-display-3 text-uppercase"><span ng-if="$ctrl.title">{{$ctrl.title.charAt(0)}}</span><span ng-if="!$ctrl.title">{{$ctrl.description.charAt(0)}}</span></span></div></div></div><md-divider></md-divider><div class="md-padding layout-column layout-padding-sm flex {{$ctrl.colorClass}}"><div class="layout-column layout-padding-sm layout-align-center-center"><div class="{{$ctrl.titleClass}} row-mini text-center"><span>{{$ctrl.title}}</span></div><small class="text-center" ng-if="$ctrl.subtitle">{{$ctrl.subtitle}}</small></div><div ng-transclude class="flex layout-column layout-align-center-center card-footer"></div></div></div>');
    $templateCache.put("/tpls/color-picker/color-picker-button.tpl", '<md-button class="ch-color-picker-button md-raised" ng-style="$ctrl.$$btnStyle" ng-disabled="$ctrl.ngDisabled" ng-click="$ctrl.$openPicker($event)" aria-label="{{$ctrl.label || \'Select color\'}}"><span ng-if="!$ctrl.ngModel" ng-bind="$ctrl.label"></span></md-button>');
    $templateCache.put("/tpls/color-picker/color-picker-inline.tpl", '<div layout-padding-sm><div><md-color-picker class="ch-color-picker-inline" ng-attr-colors-per-row="{{$ctrl.colorsPerRow || 5}}" ng-attr-color-margin="{{$ctrl.colorMargin || 5}}" ng-attr-color-size="{{$ctrl.colorSize || 50}}" ng-attr-palette="{{$ctrl.palette}}" ng-attr-default-tint="{{$ctrl.defaultTint || 500}}" ng-attr-use-spectrum-picker="{{!$ctrl.hideSubPalette}}" ng-attr-fixed-min-height="{{!$ctrl.flexible}}" value="{{$ctrl.ngModel || \' \'}}"></md-color-picker></div><div ng-if="$ctrl.showCode" class="text-center md-subhead"><strong ng-bind="$ctrl.ngModel"></strong></div></div>');
    $templateCache.put("/tpls/color-picker/color-picker-panel.tpl", '<div><div><ch-color-picker-inline ng-model="$ctrl.$$data.color" colors-per-row="{{$ctrl.colorsPerRow}}" color-margin="{{$ctrl.colorMargin}}" color-size="{{$ctrl.colorSize}}" palette="{{$ctrl.palette}}" default-tint="{{$ctrl.defaultTint}}" hide-sub-palette="$ctrl.hideSubPalette" flexible="$ctrl.flexible" show-code="$ctrl.showCode" ng-change="$ctrl.onChange($event)"></ch-color-picker-inline></div><div ng-if="$ctrl.hasConfirm"><md-divider></md-divider><div layout><div flex></div><md-button class="no-margin-top no-margin-bottom" ng-click="$ctrl.cancel()" aria-label="Cancel"><small translate="common.cancel"></small></md-button><md-button class="md-primary no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Confirm"><small translate="common.confirm"></small></md-button></div></div></div>');
    $templateCache.put("/tpls/color-picker/color-picker.tpl", '<span><ch-color-picker-inline ng-if="$ctrl.inline" ng-model="$ctrl.ngModel" colors-per-row="{{$ctrl.colorsPerRow}}" color-margin="{{$ctrl.colorMargin}}" color-size="{{$ctrl.colorSize}}" palette="{{$ctrl.palette}}" default-tint="{{$ctrl.defaultTint}}" hide-sub-palette="$ctrl.hideSubPalette" flexible="$ctrl.flexible" show-code="$ctrl.showCode" ng-change="$ctrl.$update()"></ch-color-picker-inline><ch-color-picker-button ng-if="!$ctrl.inline" ng-model="$ctrl.ngModel" label="{{$ctrl.label}}" colors-per-row="{{$ctrl.colorsPerRow}}" color-margin="{{$ctrl.colorMargin}}" color-size="{{$ctrl.colorSize}}" palette="{{$ctrl.palette}}" default-tint="{{$ctrl.defaultTint}}" hide-sub-palette="$ctrl.hideSubPalette" flexible="$ctrl.flexible" ng-disabled="$ctrl.ngDisabled" ng-readonly="$ctrl.ngReadonly" has-confirm="$ctrl.hasConfirm" has-backdrop="$ctrl.hasBackdrop" disable-parent-scroll="$ctrl.disableParentScroll" show-code="$ctrl.showCode" ng-change="$ctrl.$update()"></ch-color-picker-button></span>');
    $templateCache.put("/tpls/counter/counter.tpl", '<div class="layout-column {{$ctrl.wrapperClass}}" ng-class="{\'flex\': $ctrl.flexible}" ng-style="{\'display\': $ctrl.flexible ? \'inherit\' : \'inline-block\'}" style="min-width: 150px"><div class="{{$ctrl.labelContClass}} layout-padding-sm no-padding"><div ng-if="$ctrl.label && ($ctrl.labelDirection == \'left\' || $ctrl.labelDirection == \'top\')" class="layout-row layout-align-center-center {{$ctrl.labelClass}}"><span ng-bind-html="$ctrl.label"></span></div><div class="layout-row layout-align-center-center flex"><md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$$decreaseDisabled ? $ctrl.btnActiveClass : \'\'" aria-label="Decrease" ng-disabled="$ctrl.ngDisabled || $ctrl.minusDisabled || ($ctrl.min && $ctrl.count <= $ctrl.min)" ng-click="$ctrl.$decrease($event)"><md-icon class="material-icons mdi mdi-minus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$$decreaseDisabled ? $ctrl.iconActiveClass : \'\'"></md-icon></md-button><div class="layout-column layout-padding layout-align-center-center" ng-class="{\'flex\': $ctrl.flexible, \'text-gray-light\': $ctrl.ngDisabled}"><span class="{{$ctrl.countClass}} border-gray-lighter border-radius">{{$ctrl.count || 0}}</span></div><md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$$increaseDisabled ? $ctrl.btnActiveClass : \'\'" aria-label="Increase" ng-disabled="$ctrl.ngDisabled || $ctrl.plusDisabled || ($ctrl.max && $ctrl.count >= $ctrl.max)" ng-click="$ctrl.$increase($event)"><md-icon class="material-icons mdi mdi-plus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$$increaseDisabled ? $ctrl.iconActiveClass : \'\'"></md-icon></md-button></div><div ng-if="$ctrl.label && ($ctrl.labelDirection == \'right\' || $ctrl.labelDirection == \'bottom\')" class="layout-row layout-align-center-center {{$ctrl.labelClass}}"><span ng-bind-html="$ctrl.label"></span></div></div><div class="no-padding"><md-input-container md-no-float class="md-block minimal-input no-margin no-padding"><input ng-if="$ctrl.fieldName" type="hidden" name="{{$ctrl.fieldName}}" step="{{$ctrl.step}}" ng-min="$ctrl.min" ng-max="$ctrl.max"><small ng-transclude class="no-padding text-center"></small></md-input-container></div></div>');
    $templateCache.put("/tpls/date-picker/date-picker-trigger.tpl", '<ng-form name="chDatePickerTriggerForm" class="flex no-padding layout-column layout-fill"><md-button class="ch-date-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change date" ng-disabled="$ctrl.ngDisabled" ng-readonly="$ctrl.ngReadonly"><div class="{{$ctrl.wrapperClass}} layout-align-center-center" ng-class="$ctrl.labelPosition == \'top\' ? \'layout-column\' : \'layout-row\'"><div ng-if="!$ctrl.hideLabel" class="no-padding row-mini"><small class="row-mini text-initial" ng-bind-html="$ctrl.label"></small></div><div class="layout-row layout-padding-sm layout-align-center-center"><span><md-icon class="mdi mdi-calendar" ng-class="{\'md-32\': $ctrl.size == \'big\', \'md-24\': $ctrl.size == \'medium\', \'md-18\': $ctrl.size == \'small\'}"></md-icon></span><span ng-class="{\'md-display-1\': $ctrl.size == \'big\', \'md-title\': $ctrl.size == \'medium\', \'md-subhead\': $ctrl.size == \'small\'}">{{$ctrl.ngModel|date:"dd"}}</span><span class="layout-column" ng-class="$ctrl.size == \'small\' ? \'text-small row-1\' : \'row-mini\'"><span class="text-lowercase">{{$ctrl.ngModel|date:"MMM"}}</span><span>{{$ctrl.ngModel|date:"yyyy"}}</span></span></div></div><md-input-container class="md-block no-margin no-padding"><input type="hidden" style="visibility: hidden" name="date" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired"><div ng-messages="chDatePickerTriggerForm.date.$error" ng-show="chDatePickerTriggerForm.$submitted || chDatePickerTriggerForm.date.$touched || chDatePickerTriggerForm.date.$dirty"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></md-button></ng-form>');
    $templateCache.put("/tpls/date-picker/date-picker.tpl", '<div><div><md-calendar class="no-today-selection" ng-model="$ctrl.data.current" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.min" md-max-date="$ctrl.data.max"></md-calendar></div><div ng-if="$ctrl.hasConfirm" layout class="no-padding"><div flex></div><md-button class="no-margin-top no-margin-bottom" ng-click="$ctrl.cancel()" aria-label="Cancel"><small translate="common.cancel"></small></md-button><md-button class="md-primary no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Confirm"><small translate="common.confirm"></small></md-button></div></div>');
    $templateCache.put("/tpls/date-range-picker/date-range-picker-trigger.tpl", '<ng-form name="chDateRangePickerTriggerForm" class="flex no-padding layout-column layout-fill"><md-button class="ch-date-range-picker-button minimal-button flex text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change period" ng-disabled="$ctrl.ngDisabled"><div class="{{$ctrl.wrapperClass}}"><div ng-if="$ctrl.label || $ctrl.placeholder" class="layout-row layout-align-center-center" ng-class="{\'no-padding-top\': $ctrl.$mdMedia(\'gt-xs\'), \'md-padding\': !$ctrl.$mdMedia(\'gt-xs\') || $ctrl.start || $ctrl.end}"><div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{\'text-small\': $ctrl.start || $ctrl.end}"><span ng-if="$ctrl.placeholder && !$ctrl.start && !$ctrl.end" ng-bind-html="$ctrl.placeholder"></span><span ng-if="$ctrl.label && (($ctrl.start || $ctrl.end) || !$ctrl.placeholder)" ng-bind-html="$ctrl.label"></span></div></div><div ng-if="!$ctrl.largeTemplate"><div ng-show="$ctrl.start || $ctrl.end" class="layout layout-wrap layout-align-center-center row-mini"><span><span translate="date.from.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.start|date:"shortDate":$ctrl.$$timezone}}</strong></span>&nbsp;</span><span><span translate="date.to.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.end|date:"shortDate":$ctrl.$$timezone}}</strong></span></span><span ng-if="$ctrl.showDiff && $ctrl.$$diff" class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">&nbsp;(<span ng-bind="$ctrl.$$diff"></span>&nbsp;<span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span><span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span></span></div></div><div ng-if="$ctrl.largeTemplate" class="layout-row layout-wrap layout-align-center-center layout-padding-sm"><div class="layout-column layout-padding-sm flex-45 row-1"><span class="no-padding-bottom row-1 text-initial" ng-bind-html="$ctrl.startLabel"></span><div class="layout-align-center-center layout-row"><span><md-icon class="mdi mdi-calendar md-32"></md-icon></span><span ng-if="$ctrl.start" class="md-display-1 layout-padding">{{$ctrl.start|date:"dd":$ctrl.$$timezone}}</span><span ng-if="$ctrl.start" class="layout-column row-mini"><span>{{$ctrl.start|date:"MMM":$ctrl.$$timezone}}</span><span>{{$ctrl.start|date:"yyyy":$ctrl.$$timezone}}</span></span></div></div><div class="layout-column flex text-bold">-</div><div class="layout-column layout-padding-sm flex-45 row-1"><span class="no-padding-bottom row-1 text-initial" ng-bind-html="$ctrl.endLabel"></span><div class="layout-align-center-center layout-row"><span><md-icon class="mdi mdi-calendar md-32"></md-icon></span><span ng-if="$ctrl.end" class="md-display-1 layout-padding">{{$ctrl.end|date:"dd":$ctrl.$$timezone}}</span><span ng-if="$ctrl.end" class="layout-column row-mini"><span>{{$ctrl.end|date:"MMM":$ctrl.$$timezone}}</span><span>{{$ctrl.end|date:"yyyy":$ctrl.$$timezone}}</span></span></div></div><div ng-if="$ctrl.showDiff && $ctrl.$$diff" class="layout-column flex-100 row-1"><span class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">&nbsp;(<span ng-bind="$ctrl.$$diff">&nbsp;</span><span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span><span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span></span></div></div></div><md-input-container class="md-block no-margin no-padding"><input type="hidden" style="visibility: hidden" name="{{$ctrl.startInputName}}" ng-model="$ctrl.start" ng-required="$ctrl.ngRequired"><div ng-messages="chDateRangePickerTriggerForm[$ctrl.startInputName].$error" class="font-12 text-center text-danger"><div ng-repeat="errorObj in $ctrl.startErrorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container><md-input-container class="md-block no-margin no-padding"><input type="hidden" style="visibility: hidden" name="{{$ctrl.endInputName}}" ng-model="$ctrl.end" ng-required="$ctrl.ngRequired"><div ng-messages="chDateRangePickerTriggerForm[$ctrl.endInputName].$error" class="font-12 text-center text-danger" ng-show="!chDateRangePickerTriggerForm[$ctrl.startInputName].$invalid && (chDateRangePickerTriggerForm[$ctrl.endInputName].$dirty || chDateRangePickerTriggerForm[$ctrl.endInputName].$touched)"><div ng-repeat="errorObj in $ctrl.endErrorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></md-button></ng-form>');
    $templateCache.put("/tpls/date-range-picker/date-range-picker.tpl", '<div ng-switch="$ctrl.currentView"><div class="md-subhead" layout layout-padding><strong><span ng-switch-when="end"><span ng-if="!$ctrl.endTitle"><span translate="date.end.select"></span></span><span ng-if="$ctrl.endTitle" ng-bind-html="$ctrl.endTitle"></span></span><span ng-switch-default><span ng-if="!$ctrl.startTitle"><span translate="date.start.select"></span></span><span ng-if="$ctrl.startTitle" ng-bind-html="$ctrl.startTitle"></span></span></strong><span flex></span><md-button class="md-icon-button" ng-click="$ctrl.cancel()" aria-label="Cancel"><md-icon class="mdi mdi-close md-24"></md-icon><md-tooltip><span translate="common.close"></span></md-tooltip></md-button></div><div class="layout-column layout-align-center-center"><div ng-switch-when="end"><md-calendar class="no-today-selection" ng-model="$ctrl.data.end" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.endMinDate" md-max-date="$ctrl.data.endMaxDate"></md-calendar></div><div ng-switch-default><md-calendar class="no-today-selection" ng-model="$ctrl.data.start" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.startMinDate" md-max-date="$ctrl.data.startMaxDate"></md-calendar></div></div><md-divider></md-divider><div layout layout-padding-sm layout-align="center center" class="bg-gray-lighter text-lowercase"><div layout layout-align="start center"><span translate="date.from.abbr"></span>&nbsp;<md-button class="no-margin" ng-class="{\'only-border border-primary\': $ctrl.currentView == \'start\'}" ng-click="$ctrl.currentView = \'start\'" aria-label="Choose start date"><span ng-show="!$ctrl.$$startDate" class="text-gray-light"><md-icon class="mdi mdi-dots-horizontal md-24"></md-icon></span><span ng-show="$ctrl.$$startDate" class="md-subhead"><strong>{{$ctrl.$$startDate|date:"shortDate":$ctrl.timezone}}</strong></span><md-tooltip><span ng-if="!$ctrl.startTitle"><span translate="date.start.select"></span></span><span ng-if="$ctrl.startTitle" ng-bind-html="$ctrl.startTitle"></span></md-tooltip></md-button></div><div layout layout-align="start center"><span translate="date.to.abbr"></span>&nbsp;<md-button class="no-margin" ng-class="{\'only-border border-primary\': $ctrl.currentView == \'end\'}" ng-click="$ctrl.currentView = \'end\'" aria-label="Choose end date"><span ng-show="!$ctrl.$$endDate" class="text-gray-light"><md-icon class="mdi mdi-dots-horizontal md-24"></md-icon></span><span ng-show="$ctrl.$$endDate" class="md-subhead"><strong>{{$ctrl.$$endDate|date:"shortDate":$ctrl.timezone}}</strong></span><md-tooltip><span ng-if="!$ctrl.endTitle"><span translate="date.end.select"></span></span><span ng-if="$ctrl.endTitle" ng-bind-html="$ctrl.endTitle"></span></md-tooltip></md-button><div ng-if="$ctrl.showDiff  && $ctrl.data.diff > 0 && $ctrl.$$startDate && $ctrl.$$endDate" class="text-gray-light text-small no-padding no-margin text-lowercase">&nbsp;(<span>{{$ctrl.data.diff}}&nbsp;</span><span ng-show="$ctrl.data.diff == 1"><span ng-if="!$ctrl.diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.diffLabelSingular">{{$ctrl.diffLabelSingular}}</span>)</span><span ng-show="$ctrl.data.diff > 1"><span ng-if="!$ctrl.diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.diffLabelPlural">{{$ctrl.diffLabelPlural}}</span>)</span></div></div></div></div>');
    $templateCache.put("/tpls/icon-select/icon-select.tpl", '<div flex layout="column" layout-fill><div ng-show="$ctrl.$$exists && !$ctrl.$$showIcons" flex layout="column" layout-padding layout-fill layout-align="center center" class="no-padding"><div><md-icon md-font-set="{{$ctrl.ngModel.fontSet}}" class="{{$ctrl.ngModel.cssClass}} md-94"></md-icon></div><div><md-button class="md-primary" ng-click="$ctrl.$showIconSelect()" ng-disabled="$ctrl.ngDisabled" aria-label="Change icon"><small translate-once="common.icon.change"></small></md-button></div></div><div ng-if="!$ctrl.ngDisabled" ng-show="!$ctrl.$$exists || $ctrl.$$showIcons" flex layout="column" layout-fill layout-padding class="no-padding"><div class="text-center text-gray-light" ng-if="$ctrl.label"><span ng-bind="$ctrl.label"></span></div><div class="no-padding" flex layout="column"><div ng-if="!$ctrl.hideFilter"><md-input-container md-no-float class="md-icon-right md-icon-left md-block no-margin"><md-icon class="mdi mdi-magnify md-24"></md-icon><input type="text" ng-model="$ctrl.$$loader.params.filter" placeholder="{{\'search.filter\'|translate}}..."><md-icon class="mdi mdi-close md-24 clickable" ng-show="$ctrl.$$loader.params.filter" ng-click="$ctrl.$$loader.params.filter = \'\'"></md-icon></md-input-container></div><md-content flex id="chIconSelectCont" class="only-border border-radius"><div layout-fill infinite-scroll="$ctrl.$$loader.nextPage()" infinite-scroll-container="\'#chIconSelectCont\'" infinite-scroll-disabled="$ctrl.loader.busy" infinite-scroll-distance="0.5"><div layout layout-wrap><md-button ng-repeat="icon in $ctrl.$$loader.items track by icon.cssClass" class="minimal-button" ng-click="$ctrl.$selectIcon(icon)" aria-label="{{icon.label || icon.cssClass}}"><md-icon md-font-set="{{icon.fontSet}}" class="{{icon.cssClass}} md-32"></md-icon></md-button></div><div ng-show="$ctrl.$$loader.busy" layout layout-align="space-around"><md-progress-circular class="md-primary ch-progress" md-mode="indeterminate" md-diameter="30"></md-progress-circular></div><div ng-if="!$ctrl.$$loader.busy && !$ctrl.$$loader.items.length" flex layout="column" layout-padding layout-align="center center" class="text-opaque"><md-icon class="mdi mdi-shape md-56 text-opaque"></md-icon><div><span translate-once="common.icon.list.none"></span></div></div><div ng-if="$ctrl.$$error" class="text-danger text-center"><span ng-bind="$ctrl.$$error"></span></div></div></md-content><div ng-if="$ctrl.$$exists" class="text-center"><md-button ng-click="$ctrl.$cancelIconSelect()" aria-label="Cancel icon select"><md-icon class="mdi mdi-close md-18"></md-icon><small translate-once="common.cancel"></small></md-button></div></div></div></div>');
    $templateCache.put("/tpls/identity-document-edit/identity-document-edit.tpl", '<div><ng-form name="identityDocumentForm"><div ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" class="text-gray-light" ng-switch="$ctrl.identityDocument.guestType"><div ng-switch-when="FAMILY_MEMBER" class="bg-success text-white md-button button-small"><md-icon class="mdi mdi-account md-18 text-white"></md-icon><small translate="common.FAMILY_MEMBER"></small></div><div ng-switch-when="GROUP_MEMBER" class="bg-success text-white md-button button-small"><md-icon class="mdi mdi-account md-18 text-white"></md-icon><small translate="common.GROUP_MEMBER"></small></div><div ng-switch-default><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'GROUP_LEADER\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'GROUP_LEADER\')" aria-label="Set as group leader"><md-icon class="mdi mdi-google-circles md-18" ng-class="$ctrl.identityDocument.guestType == \'GROUP_LEADER\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.GROUP_LEADER" ng-class="$ctrl.identityDocument.guestType == \'GROUP_LEADER\' ? \'text-white\' : \'text-success\'"></small></md-button><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'HOUSEHOLDER\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'HOUSEHOLDER\')" aria-label="Set as householder"><md-icon class="mdi mdi-account-multiple md-18" ng-class="$ctrl.identityDocument.guestType == \'HOUSEHOLDER\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.HOUSEHOLDER" ng-class="$ctrl.identityDocument.guestType == \'HOUSEHOLDER\' ? \'text-white\' : \'text-success\'"></small></md-button><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'SINGLE_GUEST\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'SINGLE_GUEST\')" aria-label="Set as single guest"><md-icon class="mdi mdi-account md-18" ng-class="$ctrl.identityDocument.guestType == \'SINGLE_GUEST\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.SINGLE_GUEST" ng-class="$ctrl.identityDocument.guestType == \'SINGLE_GUEST\' ? \'text-white\' : \'text-success\'"></small></md-button></div></div><div><div class="layout-row layout-wrap layout-padding"><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.name"></label><input type="text" ng-model="$ctrl.identityDocument.name" name="name" required><div ng-messages="identityDocumentForm.name.$error"><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.surname"></label><input type="text" ng-model="$ctrl.identityDocument.surname" name="surname" required><div ng-messages="identityDocumentForm.surname.$error"><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.birthdate"></label><md-datepicker name="birthdate" ng-model="$ctrl.identityDocument.birthDate" utc-date md-datepicker-on-click md-open-on-focus md-hide-icons="calendar" md-max-date="$ctrl.$$maxDate" required></md-datepicker><div ng-messages="identityDocumentForm.birthdate.$error"><div ng-message="maxdate"><span translate="reservation.text.identityDocuments.legalAge"></span></div><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.birthplace"></label><input type="text" ng-model="$ctrl.identityDocument.birthPlace" name="birtplace"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.nationality"></label><input type="text" ng-model="$ctrl.identityDocument.nationality" name="nationality"></md-input-container></div></div><div class="layout-row layout-wrap layout-padding" ng-if="$ctrl.identityDocument.guestType != \'GROUP_MEMBER\' && $ctrl.identityDocument.guestType != \'FAMILY_MEMBER\'"><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.type"></label><md-select ng-model="$ctrl.identityDocument.type" aria-label="type" name="type"><md-option value="PASSPORT"><span translate="common.PASSPORT"></span></md-option><md-option value="DRIVING_LICENSE"><span translate="common.DRIVING_LICENSE"></span></md-option><md-option value="IDENTITY_CARD"><span translate="common.IDENTITY_CARD"></span></md-option></md-select></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.number"></label><input type="text" ng-model="$ctrl.identityDocument.number" name="number"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.expirationDate"></label><md-datepicker name="expirationDate" ng-model="$ctrl.identityDocument.expirationDate" utc-date md-datepicker-on-click md-open-on-focus md-hide-icons="calendar" md-min-date="$ctrl.$$today"></md-datepicker><div ng-messages="identityDocumentForm.expirationDate.$error"><div ng-message="mindate"><span translate="error.date.before.today"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.place.issuer"></label><input type="text" ng-model="$ctrl.identityDocument.issuer" name="issuer"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.citizenship"></label><input type="text" ng-model="$ctrl.identityDocument.citizenship" name="citizenship"></md-input-container></div></div></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel identity document edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="identityDocumentForm.$invalid" aria-label="Confirm identity document edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/invoice/invoice-header.tpl", '<div layout layout-wrap layout-padding><div flex="50" flex-xs="100" layout-padding class="no-padding"><div><md-whiteframe class="md-whiteframe-2dp" flex layout="column"><md-toolbar class="md-accent auto-height" layout-padding-sm><div class="md-toolbar-tools auto-height" layout-padding-sm><span translate="billing.invoice.details"></span></div></md-toolbar><div layout-padding-sm><div><div layout layout-padding-sm><div flex="40"><span translate="billing.invoice.number"></span></div><div flex><span ng-bind="$ctrl.invoice.number"></span>&nbsp;/&nbsp;<span ng-bind="$ctrl.invoice.year"></span></div></div><div layout layout-padding-sm><div flex="40"><span translate="billing.invoice.date"></span></div><div flex><span ng-bind="$ctrl.invoice.issueDate|date:\'shortDate\'"></span></div></div></div></div></md-whiteframe></div><div><md-whiteframe class="md-whiteframe-2dp" flex layout="column"><md-toolbar class="md-accent auto-height" layout-padding-sm><div class="md-toolbar-tools auto-height" layout-padding-sm><span translate="order.details"></span></div></md-toolbar><div layout-padding-sm><div><div layout layout-padding-sm><div flex="40"><span translate="order.order.number"></span></div><div flex><span ng-bind="$ctrl.invoice.order.serial"></span></div></div><div layout layout-padding-sm><div flex="40"><span translate="order.date"></span></div><div flex><span ng-bind="$ctrl.invoice.order.createdDate|date:\'shortDate\'"></span></div></div><div layout layout-padding-sm ng-if="$ctrl.invoice.order.customer"><div flex="40"><span translate="customer.name"></span></div><div flex><span ng-bind="$ctrl.invoice.order.customer.name"></span>&nbsp;<span ng-bind="$ctrl.invoice.order.customer.surname"></span></div></div></div></div></md-whiteframe></div></div><div flex="50" flex-xs="100"><md-whiteframe class="md-whiteframe-2dp" flex layout="column"><md-toolbar class="md-accent auto-height" layout-padding-sm><div class="md-toolbar-tools auto-height" layout-padding-sm><span translate="billing.invoice.header"></span></div></md-toolbar><div layout-padding-sm><div layout-padding-sm><div><span ng-bind="$ctrl.invoice.customerBillingData.name"></span></div><div flex><span ng-bind="$ctrl.invoice.customerBillingData.addressInfo.address"></span></div><div><span ng-bind="$ctrl.invoice.customerBillingData.addressInfo.zipcode"></span>,&nbsp;<span ng-bind="$ctrl.invoice.customerBillingData.addressInfo.city"></span>,&nbsp;<span ng-bind="$ctrl.invoice.customerBillingData.addressInfo.province"></span>,&nbsp;<span ng-if="$ctrl.invoice.customerBillingData.addressInfo.country" ng-bind="$ctrl.invoice.customerBillingData.addressInfo.country"></span></div><div><span translate="common.vat.abbr"></span>:&nbsp;<span ng-bind="$ctrl.invoice.customerBillingData.vat"></span></div><div ng-if="$ctrl.invoice.customerBillingData.fiscalCode"><span translate="common.fiscalCode.abbr"></span>:&nbsp;<span ng-bind="$ctrl.invoice.customerBillingData.fiscalCode"></span></div></div></div></md-whiteframe></div></div>');
    $templateCache.put("/tpls/invoice/invoice-items.tpl", '<div layout-padding><div><md-whiteframe class="md-whiteframe-2dp" flex layout="column"><md-toolbar class="md-accent auto-height" layout-padding-sm><div class="md-toolbar-tools auto-height" layout-padding-sm><span translate="order.items"></span></div></md-toolbar><div layout="column"><div layout layout-padding layout-align="center center" class="bg-gray-lighter"><div hide-xs flex="10" class="text-center"><strong translate="order.item.code.abbr">Cod. articolo</strong></div><div flex class="text-left"><strong translate="common.description">Descrizione</strong></div><div flex="10" class="text-center"><strong translate="common.quantity.abbr">Quantità</strong></div><div hide-xs flex="20" class="text-right"><strong translate="common.price.unit">Importo unitario</strong></div><div flex="20" class="text-right"><strong translate="common.amount">Importo</strong></div><div flex="10" flex-xs="15" class="text-center"><strong><span translate="common.vat.alt">IVA</span>&nbsp;(%)</strong></div></div><md-divider></md-divider><div><div ng-repeat="productSold in $ctrl.invoice.order.products track by productSold.product.id" layout layout-padding ng-class="{\'bg-gray-lighter\': $odd}"><div hide-xs flex="10" class="text-center"><span ng-bind="productSold.product.serial"></span></div><div flex class="text-left"><span ng-bind="productSold.product.name"></span><span hide show-xs>&nbsp;(<span ng-bind="productSold.product.serial"></span>)</span><div ng-if="productSold.product.category.type == \'FREE_LOAN\'" class="text-gray-light"><small>(<span translate="common.freeloan"></span>)</small></div></div><div flex="10" class="text-center"><span ng-bind="productSold.counter.actual"></span></div><div hide-xs flex="20" class="text-right"><span ng-if="productSold.product.paymentOption.amount != null && productSold.product.paymentOption.amount.finalAmount != null">{{productSold.product.paymentOption.amount.finalAmount|chCurrency}}</span><span ng-if="productSold.product.paymentOption.amount == null || productSold.product.paymentOption.amount.finalAmount == null">{{0|chCurrency}}</span></div><div flex="20" class="text-right"><span ng-if="productSold.amount != null && productSold.amount.finalAmount != null">{{productSold.amount.finalAmount|chCurrency}}</span><span ng-if="productSold.amount == null || productSold.amount.finalAmount == null">{{0|chCurrency}}</span></div><div flex="10" flex-xs="15" class="text-center"><span ng-if="productSold.amount != null && productSold.amount.vatRate != null" ng-bind="productSold.amount.vatRate"></span><span ng-if="productSold.amount == null || productSold.amount.vatRate == null">-</span></div></div></div><md-divider></md-divider><div layout-padding-sm><div ng-if="$ctrl.invoice.order.amount.initialAmount && $ctrl.invoice.order.amount.initialAmount > 0 && $ctrl.invoice.order.amount.initialAmount != $ctrl.invoice.order.amount.finalAmount" layout layout-padding-sm><div flex>&nbsp;</div><div flex="20" flex-xs="70" class="text-left"><span translate="common.subtotal">SUBTOTALE</span></div><div flex="20" class="text-right"><span ng-bind="$ctrl.invoice.order.amount.initialAmount|chCurrency"></span></div><div flex="10" flex-xs="15">&nbsp;</div></div><div ng-if="$ctrl.invoice.order.amount.discountAmount && $ctrl.invoice.order.amount.discountAmount > 0" layout layout-padding-sm><div flex>&nbsp;</div><div flex="20" flex-xs="70" class="text-left"><span translate="common.discount">SCONTO</span></div><div flex="20" class="text-right"><small ng-if="$ctrl.invoice.order.amount.discountRate && $ctrl.invoice.order.amount.discountRate > 0">(<span ng-bind="$ctrl.invoice.order.amount.discountRate + \'%\'"></span>)&nbsp;</small><span ng-bind="$ctrl.invoice.order.amount.discountAmount|chCurrency"></span></div><div flex="10" flex-xs="15">&nbsp;</div></div><div layout layout-padding-sm><div flex>&nbsp;</div><div flex="20" flex-xs="70" class="text-left"><span translate="common.taxable">Imponibile</span></div><div flex="20" class="text-right"><span ng-if="$ctrl.invoice.order.amount && $ctrl.invoice.order.amount.finalAmount"><span ng-if="$ctrl.invoice.order.amount.vatAmount" ng-bind="($ctrl.invoice.order.amount.finalAmount - $ctrl.invoice.order.amount.vatAmount)|chCurrency"></span><span ng-if="!$ctrl.invoice.order.amount.vatAmount" ng-bind="$ctrl.invoice.order.amount.finalAmount|chCurrency"></span></span><span ng-if="!$ctrl.invoice.order.amount || !$ctrl.invoice.order.amount.finalAmount" ng-bind="0|chCurrency"></span></div><div flex="10" flex-xs="15">&nbsp;</div></div><div ng-repeat="(vatRate, vatAmount) in $ctrl.invoice.order.vatMap track by vatRate" layout layout-padding-sm><div flex>&nbsp;</div><div flex="20" flex-xs="70" class="text-left"><span translate="common.vat.alt">IVA</span>&nbsp;<span ng-bind="vatRate"></span>%</div><div flex="20" class="text-right"><span ng-bind="vatAmount|chCurrency"></span></div><div flex="10" flex-xs="15">&nbsp;</div></div><div layout layout-padding-sm class="md-subhead text-primary"><div flex>&nbsp;</div><div flex="20" flex-xs="70" class="text-left only-border no-border-bottom no-border-right no-border-left"><strong translate="billing.invoice.price.total">TOTALE FATTURA</strong></div><div flex="20" class="text-right text-primary only-border no-border-bottom no-border-right no-border-left"><strong ng-if="$ctrl.invoice.order.amount && $ctrl.invoice.order.amount.finalAmount" ng-bind="$ctrl.invoice.order.amount.finalAmount|chCurrency"></strong><strong ng-if="!$ctrl.invoice.order.amount || !$ctrl.invoice.order.amount.finalAmount" ng-bind="0|chCurrency"></strong></div><div flex="10" flex-xs="15">&nbsp;</div></div></div></div></md-whiteframe></div></div>');
    $templateCache.put("/tpls/month-picker/month-picker-trigger.tpl", '<ng-form name="chMonthPickerTriggerForm" flex class="no-padding"><md-button class="ch-month-picker-button flex minimal-button text-initial text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" ng-disabled="$ctrl.ngDisabled" aria-label="Change month"><div class="{{$ctrl.wrapperClass}}" layout-align="center center" ng-class="$ctrl.labelPosition == \'top\' ? \'layout-column\' : \'layout-row\'"><div ng-if="$ctrl.label" class="no-padding row-mini"><small class="row-mini text-initial" ng-bind-html="$ctrl.label"></small></div><div layout layout-align="center center"><span ng-if="!$ctrl.hideIcon"><md-icon class="mdi mdi-calendar {{$ctrl.iconColorClass}}" ng-class="{\'md-32\': $ctrl.size == \'big\', \'md-24\': $ctrl.size == \'medium\', \'md-18\': $ctrl.size == \'small\'}"></md-icon></span><small ng-show="!$ctrl.ngModel" class="text-gray-light"><em><span ng-if="!$ctrl.placeholder">...</span><span ng-if="$ctrl.placeholder" ng-bind="$ctrl.placeholder"></span></em></small><span ng-show="$ctrl.ngModel" ng-class="$ctrl.size == \'small\' ? \'text-small row-1\' : \'row-mini\'"><span class="text-capitalize"><span ng-show="!$ctrl.$$selectedText" ng-bind="($ctrl.ngModel|date:\'MMMM\')"></span><span ng-show="$ctrl.$$selectedText" ng-bind-html="$ctrl.$$selectedText"></span></span><span ng-show="$ctrl.$$showYear">&nbsp;<span ng-bind="($ctrl.ngModel|date:\'yyyy\')"></span></span></span><span><md-icon class="mdi mdi-menu-down md-24 {{$ctrl.iconColorClass}}"></md-icon></span></div></div><md-input-container class="md-block no-margin no-padding"><input type="hidden" style="visibility: hidden" name="date" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired"><div ng-messages="chMonthPickerTriggerForm.date.$error" ng-show="chMonthPickerTriggerForm.$submitted || chMonthPickerTriggerForm.date.$touched || chMonthPickerTriggerForm.date.$dirty"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></md-button></ng-form>');
    $templateCache.put("/tpls/month-picker/month-picker.tpl", '<div><div><md-calendar class="no-today-selection" ng-model="$ctrl.data.current" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.min" md-max-date="$ctrl.data.max" md-mode="month"></md-calendar></div><div ng-if="$ctrl.hasConfirm" layout class="no-padding"><div flex></div><md-button class="no-margin-top no-margin-bottom" ng-click="$ctrl.cancel()" aria-label="Cancel"><small translate="common.cancel"></small></md-button><md-button class="md-primary no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Confirm"><small translate="common.confirm"></small></md-button></div></div>');
    $templateCache.put("/tpls/no-show-policy-info/no-show-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="reservation.noshow.terms.conditions"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.noShowPolicy || !$ctrl.noShowPolicy.cancellation"><span translate="reservation.cancellation.room.no.condition"></span></div><div flex ng-if="$ctrl.noShowPolicy && $ctrl.noShowPolicy.cancellation"><div><span translate="reservation.noshow.room.conditions"></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights != $ctrl.noShowPolicy.cancellation.stayNights">{{::$ctrl.noShowPolicy.cancellation.percentage}}<span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span><span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.noShowPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights == $ctrl.noShowPolicy.cancellation.stayNights">{{::$ctrl.noShowPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.noShowPolicy.amount.finalAmount|chCurrency}}</strong>.</div></div></div>');
    $templateCache.put("/tpls/password-input/password-input.tpl", '<ng-form name="chPasswordInputForm" flex><md-input-container class="{{$ctrl.containerClass}} no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.iconClass, \'md-icon-left\': $ctrl.iconClass, \'md-icon-right\': $ctrl.showIconClass || $ctrl.hideIconClass}"><label><span ng-if="$ctrl.inputLabel" ng-bind="$ctrl.inputLabel"></span><span ng-if="!$ctrl.inputLabel" translate="login.password"></span></label><md-icon ng-if="$ctrl.iconClass" class="{{$ctrl.iconClass}}"></md-icon><input type="{{$ctrl.$$showPwd ? \'text\' : \'password\'}}" name="{{$ctrl.inputName}}" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" ng-readonly="$ctrl.ngReadonly" style="padding-right: 30px"><md-icon class="clickable" ng-class="$ctrl.$$showPwd ? $ctrl.hideIconClass : $ctrl.showIconClass" ng-click="$ctrl.$$showPwd = !$ctrl.$$showPwd" aria-label="Show/Hide password" tabindex="-1"><md-tooltip><span ng-show="$ctrl.$$showPwd" translate="common.hide"></span><span ng-show="!$ctrl.$$showPwd" translate="common.show"></span></md-tooltip></md-icon><div ng-messages="chPasswordInputForm[$ctrl.inputName].$error"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></ng-form>');
    $templateCache.put("/tpls/payment-option/payment-option-edit.tpl", '<div class="only-border border-radius bg-gray-lighter md-padding"><ng-form name="chPaymentOptionForm" flex><div ng-if="$ctrl.title"><h3 class="md-subhead no-margin-top text-center"><strong ng-bind="$ctrl.title"></strong></h3><div ng-if="$ctrl.subtitle" class="text-gray-light"><span ng-bind="$ctrl.subtitle"></span></div></div><div layout layout-wrap layout-padding><div flex="100" flex-gt-sm="50" flex-gt-lg="25"><div><span ng-if="!$ctrl.sizeTitle" translate-once="payment.option.size.title"></span><span ng-if="$ctrl.sizeTitle" ng-bind="$ctrl.sizeTitle"></span></div><div ng-if="$ctrl.sizeSubtitle" class="text-gray-light"><small ng-bind="$ctrl.sizeSubtitle"></small></div><div><md-input-container md-no-float><md-select name="size" placeholder="{{::(\'payment.option.size\'|translate)}}" ng-model="$ctrl.$$paymentOption.size" ng-required="true" aria-label="Payment size"><md-option ng-repeat="size in $ctrl.$$sizes track by $index" ng-value="size.value" ng-disabled="size.disabled" ng-selected="$ctrl.$$sizes.length == 1 || $ctrl.$$paymentOption.size == size.value"><span translate-once="payment.option.size.{{size.value}}"></span></md-option></md-select><div ng-messages="chPaymentOptionForm.size.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div></div><div flex="100" flex-gt-sm="50" flex-gt-lg="25"><div><span ng-if="!$ctrl.frequencyTitle" translate-once="payment.option.frequency.title"></span><span ng-if="$ctrl.frequencyTitle" ng-bind="$ctrl.frequencyTitle"></span></div><div ng-if="$ctrl.frequencySubtitle" class="text-gray-light"><small ng-bind="$ctrl.frequencySubtitle"></small></div><div><md-input-container md-no-float><md-select name="frequency" placeholder="{{::(\'payment.option.frequency\'|translate)}}" ng-model="$ctrl.$$paymentOption.frequency" ng-required="true" ng-change="$ctrl.$onFrequencyChange()" aria-label="Payment frequency"><md-option ng-repeat="frequency in $ctrl.$$frequencies track by $index" ng-value="frequency.value" ng-disabled="frequency.disabled" ng-selected="$ctrl.$$frequencies.length == 1 || $ctrl.$$paymentOption.frequency == frequency.value"><span translate-once="payment.option.frequency.{{frequency.value}}"></span></md-option></md-select><div ng-messages="chPaymentOptionForm.frequency.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div></div><div flex="100" flex-gt-sm="50" flex-gt-lg="25"><div><span ng-if="!$ctrl.amountTitle" translate-once="payment.option.amount.title"></span><span ng-if="$ctrl.amountTitle" ng-bind="$ctrl.amountTitle"></span></div><div ng-if="$ctrl.amountSubtitle" class="text-gray-light"><small ng-bind="$ctrl.amountSubtitle"></small></div><div layout><div><md-input-container ng-class="{\'md-icon-left\': $ctrl.amountType, \'no-padding-left\': !$ctrl.amountType}"><label ng-switch="$ctrl.$$paymentOption.frequency"><span ng-switch-when="DAILY"><span translate-once="date.frequency.daily"></span></span><span ng-switch-when="NIGHTLY"><span translate-once="date.frequency.nightly"></span></span><span ng-switch-when="WEEKLY"><span translate-once="date.frequency.weekly"></span></span><span ng-switch-when="MONTHLY"><span translate-once="date.frequency.monthly"></span></span><span ng-switch-when="YEARLY"><span translate-once="date.frequency.yearly"></span></span></label><md-icon ng-if="$ctrl.amountType == \'PRICE\'" class="mdi md-18" ng-class="{\'mdi-currency-eur\': !$ctrl.amountCurrency || $ctrl.amountCurrency == \'EUR\', \'mdi-currency-usd\': $ctrl.amountCurrency == \'USD\'}"></md-icon><md-icon ng-if="$ctrl.amountType == \'PERCENTAGE\'" class="mdi mdi-percent md-18"></md-icon><input type="number" name="amount" placeholder="{{::(\'common.free\'|translate)}}" ng-model="$ctrl.$$paymentOption.amount.finalAmount" min="1" step="0.50" ng-max="$ctrl.$$paymentOption.amount.type == \'PERCENTAGE\' ? 100 : null" ng-pattern="$ctrl.$$paymentOption.amount.type == \'PERCENTAGE\' ? null : $ctrl.$$REGEXP.price" aria-label="Amount"><div ng-messages="chPaymentOptionForm.amount.$error"><div ng-message="min"><span translate="error.field.min" translate-value-num="1"></span></div><div ng-message="max"><span translate="error.field.max" translate-value-num="100"></span></div><div ng-message="step"><span translate-once="error.amount.invalid"></span></div></div></md-input-container></div><div ng-if="!$ctrl.amountType"><md-input-container md-no-float><md-select name="amountType" placeholder="{{::(\'common.amount.type\'|translate)}}" ng-model="$ctrl.$$paymentOption.amount.type" ng-required="true" aria-label="Amount type"><md-option value="PRICE" ng-selected="!$ctrl.$$paymentOption.amount.type || $ctrl.$$paymentOption.amount.type == \'PRICE\'"><md-icon class="mdi md-14" ng-class="{\'mdi-currency-eur\': !$ctrl.amountCurrency || $ctrl.amountCurrency == \'EUR\', \'mdi-currency-usd\': $ctrl.amountCurrency == \'USD\'}"></md-icon></md-option><md-option value="PERCENTAGE" ng-selected="$ctrl.$$paymentOption.amount.type == \'PERCENTAGE\'"><md-icon class="mdi mdi-percent md-14"></md-icon></md-option></md-select><div ng-messages="chPaymentOptionForm.amountType.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div></div></div><div flex="100" flex-gt-sm="50" flex-gt-lg="25" ng-if="$ctrl.hideLengths"><div><span ng-if="!$ctrl.lengthTitle" translate-once="payment.option.minLength.title"></span><span ng-if="$ctrl.lengthTitle" ng-bind="$ctrl.lengthTitle"></span></div><div ng-if="$ctrl.lengthSubtitle" class="text-gray-light"><small ng-bind="$ctrl.lengthSubtitle"></small></div><div><ch-value-input ng-model="$ctrl.$$paymentOption.minLength" units="$ctrl.$$minLengthUnits" disabled-units="$ctrl.$$disabledMinLengthUnits" counts="$ctrl.lengths" disabled-counts="$ctrl.disabledLengths" ng-min="1" ng-step="1"></ch-value-input></div></div></div><div layout layout-align="center center"><md-button ng-click="$ctrl.$cancel($event)" aria-label="Cancel"><span translate-once="common.cancel"></span></md-button><md-button class="md-raised md-primary" ng-click="$ctrl.$confirm($event)" aria-label="Confirm"><span translate-once="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/payment-option/payment-option.tpl", '<span><span ng-if="!$ctrl.paymentOption.amount.finalAmount"><span translate="common.free"></span></span><span ng-if="$ctrl.paymentOption.amount.finalAmount" class="text-lowercase"><span class="{{$ctrl.amountClass}}" ng-bind-html="($ctrl.paymentOption.amount|chAmount)"></span><span ng-switch="$ctrl.paymentOption.frequency"><span ng-switch-when="LUMP_SUM" ng-show="!$ctrl.showLumpSumLabel">&nbsp;<span ng-if="$ctrl.lumpSumLabel" ng-bind-html="$ctrl.lumpSumLabel"></span><span ng-if="!$ctrl.lumpSumLabel" translate="payment.option.frequency.LUMP_SUM"></span></span><span ng-switch-when="DAILY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.day"></span></span><span ng-switch-when="NIGHTLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="common.night"></span></span><span ng-switch-when="WEEKLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.week"></span></span><span ng-switch-when="MONTHLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.month"></span></span><span ng-switch-when="YEARLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.year"></span></span><span ng-switch-default></span></span></span><span ng-switch="$ctrl.paymentOption.size"><span ng-switch-when="PER_ADULT">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.adult"></span></span><span ng-switch-when="PER_BOY">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.boy"></span></span><span ng-switch-when="PER_CHILD">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.child"></span></span><span ng-switch-when="PER_KID">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.kid"></span></span><span ng-switch-default></span></span><span ng-if="$ctrl.paymentOption.minLength.count" class="text-lowercase">&nbsp; (<span translate="date.length.minimum.of"></span>&nbsp;<ch-value value="$ctrl.paymentOption.minLength"></ch-value>)</span></span>');
    $templateCache.put("/tpls/payment-policy-info/payment-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="common.payment"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.cancellationPolicy"><span translate="reservation.payment.room.policy.free.label"></span><span translate="reservation.payment.room.policy.free.label2"></span></div><div flex ng-if="$ctrl.cancellationPolicy"><div ng-if="!$ctrl.cancellationPolicy.cancellation.deposit"><div ng-if="$ctrl.rateType == \'STANDARD\' && !$ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.free.label"></span><span translate="reservation.payment.room.policy.free.label2"></span><span translate="reservation.payment.room.policy.free.label3"></span></div><div ng-if="$ctrl.rateType == \'NOT_REFUNDABLE\' || $ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.notRef.label"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong><br><span ng-if="!$ctrl.cancellationPolicy.limitDate || $ctrl.cancellationPolicy.flexible" translate="reservation.payment.room.policy.notRef.label2"></span><span ng-if="$ctrl.cancellationPolicy.limitDate && !$ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.notRef.label2.bis"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}].</span></span></div></div><div class="layout-column" ng-if="$ctrl.cancellationPolicy.cancellation.deposit"><span class="no-margin-top"><span translate="reservation.payment.room.policy.deposit.label"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong><span translate="reservation.payment.room.policy.notRef.label2"></span></span></div></div></div>');
    $templateCache.put("/tpls/people-counters/people-counters.tpl", '<div class="layout layout-wrap layout-align-center-center"><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$adultsHint}}" count-class="bg-white only-border" ng-model="$ctrl.people.adults" min="$ctrl.$$peopleLimits.adults.min" max="$ctrl.$$peopleLimits.adults.max"></ch-counter></div><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$boysHint}}" count-class="bg-white only-border" ng-model="$ctrl.people.boys" min="$ctrl.$$peopleLimits.boys.min" max="$ctrl.$$peopleLimits.boys.max"></ch-counter></div><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$childrenHints}}" count-class="bg-white only-border" ng-model="$ctrl.people.children" min="$ctrl.$$peopleLimits.children.min" max="$ctrl.$$peopleLimits.children.max"></ch-counter></div><div class="flex layout-column layout-align-center-center layout-padding"><ch-counter label="{{$ctrl.$$kidsHints}}" count-class="bg-white only-border" ng-model="$ctrl.people.kids" min="$ctrl.$$peopleLimits.kids.min" max="$ctrl.$$peopleLimits.kids.max"></ch-counter></div></div>');
    $templateCache.put("/tpls/people-picker/people-picker-trigger.tpl", '<ng-form name="chPeoplePickerForm" class="flex no-padding layout-column layout-fill"><md-button class="ch-people-picker-button minimal-button flex text-lowercase text-center {{$ctrl.buttonClass}}" aria-label="Change people" ng-disabled="$ctrl.ngDisabled" ng-click="$ctrl.$openPanel($event)"><div class="{{$ctrl.wrapperClass}}"><div ng-if="$ctrl.label" class="layout-row layout-align-center-center" ng-class="{\'no-padding-top\': $ctrl.$mdMedia(\'gt-xs\'), \'md-padding\': !$ctrl.$mdMedia(\'gt-xs\') || $ctrl.$$hasPeople}"><div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{\'text-small\': $ctrl.$$hasPeople}"><span ng-bind-html="$ctrl.label"></span></div></div><div ng-show="$ctrl.$$hasPeople" class="md-subhead text-wrap row-mini"><strong><ch-people-summary people="$ctrl.people"></ch-people-summary></strong></div></div><div ng-messages="chPeoplePickerForm[$ctrl.fieldName].$error" ng-show="chPeoplePickerForm[$ctrl.fieldName].$dirty" class="text-danger text-small text-center row-1 no-padding layout-column layout-padding-sm"><div ng-message="required"><md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon><span class="text-wrap" translate="error.required"></span></div><div ng-message="min"><md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon><span class="text-wrap" ng-if="$ctrl.errorMessages.min" ng-bind="$ctrl.errorMessages.min"></span><span class="text-wrap" ng-if="!$ctrl.errorMessages.min" translate="error.field.min" translate-value-num="{{$ctrl.minCount}}"></span></div></div></md-button><input type="hidden" name="{{$ctrl.fieldName}}" ng-model="$ctrl.people" ng-required="$ctrl.ngRequired"></ng-form>');
    $templateCache.put("/tpls/people-picker/people-picker.tpl", '<div layout="column" layout-padding><div class="text-center" ng-if="!$ctrl.data.noTitle"><strong><span ng-if="!$ctrl.data.title" translate="reservation.people.question"></span><span ng-if="$ctrl.data.title" ng-bind-html="$ctrl.data.title"></span></strong></div><div class="no-padding"><div layout layout-align="center center" class="md-margin"><ch-counter label="<div class=\'text-center\'>{{::(\'people.adults\'|translate)}}</div><small>({{\'date.years.min.range.abbr\'| translate:\'{min:18}\'}})</small>" label-direction="{{$mdMedia(\'xs\') ? \'top\' : \'left\'}}" label-class="md-body-1 text-gray-light flex-40" flexible="true" ng-model="$ctrl.data.people.adults" min="1" plus-disabled="$ctrl.data.plusDisabled" aria-label="Adults"></ch-counter></div><div layout layout-align="center center" class="md-margin"><ch-counter label="<div class=\'text-center\'>{{::(\'people.boys\'|translate)}}</div><small>({{\'date.years.range.abbr\'| translate:\'{min:13,max:17}\'}})</small>" label-direction="{{$mdMedia(\'xs\') ? \'top\' : \'left\'}}" label-class="md-body-1 text-gray-light flex-40" flexible="true" ng-model="$ctrl.data.people.boys" min="0" plus-disabled="$ctrl.data.plusDisabled" aria-label="Boys"></ch-counter></div><div layout layout-align="center center" class="md-margin"><ch-counter label="<div class=\' text-center\'>{{::(\'people.children\'|translate)}}</div><small>({{\'date.years.range.abbr\'| translate:\'{min:3,max:12}\'}})</small>" label-direction="{{$mdMedia(\'xs\') ? \'top\' : \'left\'}}" label-class="md-body-1 text-gray-light flex-40" flexible="true" ng-model="$ctrl.data.people.children" min="0" plus-disabled="$ctrl.data.plusDisabled" aria-label="Children"></ch-counter></div><div layout layout-align="center center" class="md-margin"><ch-counter label="<div class=\'text-center\'>{{::(\'people.kids\'|translate)}}</div><small>({{\'date.years.range.abbr\'| translate:\'{min:0,max:2}\'}})</small>" label-direction="{{$mdMedia(\'xs\') ? \'top\' : \'left\'}}" label-class="md-body-1 text-gray-light flex-40" flexible="true" ng-model="$ctrl.data.people.kids" min="0" plus-disabled="$ctrl.data.plusDisabled" aria-label="Kids"></ch-counter></div></div><div ng-if="$ctrl.hasConfirm" class="no-padding layout-row layout-align-center-center"><md-button class="no-margin-top no-margin-bottom md-raised" ng-click="$ctrl.cancel()" aria-label="Cancel"><small translate="common.cancel"></small></md-button><md-button class="md-primary md-raised no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Confirm"><small translate="common.confirm"></small></md-button></div><div layout ng-if="!$ctrl.hasConfirm && $ctrl.hasClose" class="no-padding"><div flex></div><md-button class="md-primary no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Close"><small translate="common.close"></small></md-button></div></div>');
    $templateCache.put("/tpls/planning/planning-content-weekly.tpl", '<md-content id="planningCont" flex layout="column" layout-fill ng-switch="$ctrl.$$roomsType"><md-subheader class="no-padding bg-gray-lighter"><div layout flex><div hide show-gt-sm flex="25" layout layout-padding layout-align="center center" class="border-right-white"><strong class="text-uppercase text-gray-light"><span translate="room.room"></span></strong></div><div flex layout layout-padding-sm><div flex layout="column" class="border-right-white" ng-repeat="viewDate in $ctrl.$$viewDates track by viewDate.uid"><md-button tabindex="-1" ng-click="$ctrl.toggleAllRoomsClosing(viewDate.date)" ng-disabled="viewDate.isPast || viewDate.hotelStatus.hotelClosed" class="no-margin row-mini text-left" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'),\n' + "\t\t\t\t\t\t'text-gray-light': !viewDate.hotelStatus.roomsClosed,\n" + '\t\t\t\t\t\t\'bg-danger text-white\': viewDate.hotelStatus.roomsClosed}"><div layout="column" ng-class="{\'text-primary\': (viewDate.date|amDifference:$ctrl.$$today:\'days\') == 0}"><small class="text-capitalize">{{viewDate.date|date:"EEE"}}</small><strong ng-class="{\'md-display-1\': $ctrl.$mdMedia(\'gt-xs\'), \'md-title\': $ctrl.$mdMedia(\'xs\')}">{{viewDate.date|date:"d"}}</strong></div><md-tooltip><span ng-show="viewDate.hotelStatus.roomsClosed" translate="hotel.availability.open.day"></span><span ng-show="!viewDate.hotelStatus.roomsClosed" translate="hotel.availability.close.day"></span></md-tooltip></md-button></div></div></div></md-subheader><div ng-switch-when="2" flex layout="column" infinite-scroll="$ctrl.rooms.nextPage()" infinite-scroll-container="\'#planningCont\'" infinite-scroll-disabled="$ctrl.rooms.busy" infinite-scroll-distance="1"><ch-planning-room ng-repeat="room in $ctrl.rooms.items track by room.id" room="room" dates="$ctrl.$$viewDates" reservations="$ctrl.reservations[room.id]"></ch-planning-room><div flex ng-show="$ctrl.rooms.busy" flex layout="column" layout-padding layout-align="center center"><div><md-progress-circular class="md-primary ch-progress" md-mode="indeterminate" md-diameter="40"></md-progress-circular></div><div class="text-gray-light"><span translate="room.rooms.yours.loading"></span>...</div></div></div><div ng-switch-default flex layout="column"></div></md-content>');
    $templateCache.put("/tpls/planning/planning-header.tpl", '<div class="ch-planning-header" ng-style="{\'background-image\': $ctrl.$$bgImage}"><div class="ch-planning-header-content bg-opaque-4" layout="column"><div flex layout layout-padding-sm><div flex><ch-month-picker ng-model="$ctrl.chPlanningCtrl.$$startDate" hide-icon="true" wrapper-class="text-white text-bold" icon-color-class="text-white" selected-text="$ctrl.$getMonthLabel()" ng-change="$ctrl.$onMonthChange()"></ch-month-picker></div><div><md-button class="md-icon-button" ng-click="$ctrl.$goToToday()" aria-label="Go to today"><md-icon class="mdi mdi-calendar-today md-24 text-white"></md-icon><md-tooltip><span translate="date.today.go.to"></span></md-tooltip></md-button></div><div><md-menu md-position-mode="target bottom"><md-button ng-class="{\'no-padding no-margin-x-sides minimal-button\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-click="$mdMenu.open($event)" aria-label="Switch view"><span ng-switch="$ctrl.chPlanningCtrl.$$currentView" class="text-white text-bold"><span ng-switch-when="D" translate="date.day"></span><span ng-switch-when="W" translate="date.week"></span><span ng-switch-when="M" translate="date.month"></span></span><md-icon class="mdi mdi-menu-down md-24 text-white"></md-icon><md-tooltip><span translate="planning.view.change"></span></md-tooltip></md-button><md-menu-content><md-menu-item><md-button ng-click="$ctrl.$dailyView()" aria-label="Switch to daily view"><span translate="date.day"></span></md-button></md-menu-item><md-menu-item><md-button ng-click="$ctrl.$weeklyView()" aria-label="Switch to weekly view"><span translate="date.week"></span></md-button></md-menu-item><md-menu-item><md-button ng-click="$ctrl.$monthlyView()" aria-label="Switch to monthly view"><span translate="date.month"></span></md-button></md-menu-item></md-menu-content></md-menu></div><div><md-menu md-position-mode="target bottom"><md-button class="md-icon-button" ng-class="{\'no-margin-x-sides\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-click="$mdMenu.open($event)" aria-label="Open planning menu"><md-icon class="mdi mdi-dots-vertical md-24 text-white"></md-icon></md-button><md-menu-content><md-menu-item><md-button ng-click="$ctrl.$openSettings()" aria-label="Open planning settings"><span translate="menu.settings"></span></md-button></md-menu-item></md-menu-content></md-menu></div></div><div layout><div><md-button ng-class="{\'no-margin-x-sides minimal-button\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-click="$ctrl.$prevWeek()" aria-label="Go to previous week"><md-icon class="mdi mdi-chevron-left md-24 text-white"></md-icon><span hide-xs class="text-white text-bold" translate="date.week.previous"></span><span hide-gt-xs class="text-white text-bold" translate="common.previous"></span><md-tooltip hide show-xs show-sm><span class="text-uppercase" translate="date.week.previous"></span></md-tooltip></md-button></div><div flex></div><div><md-button ng-class="{\'no-margin-x-sides minimal-button\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-click="$ctrl.$nextWeek()" aria-label="Go to next week"><span hide-xs class="text-white text-bold" translate="date.week.next"></span><span hide-gt-xs class="text-white text-bold" translate="common.next.female"></span><md-icon class="mdi mdi-chevron-right md-24 text-white"></md-icon><md-tooltip hide show-xs show-sm><span class="text-uppercase" translate="date.week.next"></span></md-tooltip></md-button></div></div></div></div>');
    $templateCache.put("/tpls/planning/planning-room.tpl", '<div layout-gt-sm="row" layout-sm="column" layout-xs="column" class="ch-planning-row"><span ng-if="!$ctrl.room.enabled" class="locked-string bg-warn opaque text-uppercase"><span translate="common.disabled.female"></span></span><div flex-xs="100" flex-sm="100" flex-gt-sm="25" layout="column" layout-padding class="ch-planning-cell"><div flex layout="column" layout-padding-sm layout-align="center center" class="text-center"><strong class="text-primary text-uppercase text-center" ng-bind="$ctrl.room.name"></strong><md-truncate class="text-wrap"><small class="text-gray-light">(<span ng-repeat="roomType in $ctrl.room.types track by roomType.id"><span translate="{{roomType.roomType.nameKey}}"></span>&nbsp;<span class="text-uppercase" translate="room.category.{{roomType.category}}"></span><span ng-if="!$last">,&nbsp;</span></span>)</small></md-truncate></div></div><div flex layout><div flex layout="column" layout-padding class="ch-planning-cell" ng-repeat="viewDate in $ctrl.$$viewDates track by viewDate.uid"><div ng-repeat="reservation in viewDate.$reservations track by reservation.id" class="ch-planning-reservation" ng-style="{left: reservation.left + \'%\', width: reservation.width + \'%\'}"><div class="full-width bg-blue-sea">AAAAAAAA</div></div></div></div></div>');
    $templateCache.put("/tpls/planning/planning.tpl", '<div flex layout="column" layout-fill ng-switch="$ctrl.$$currentView"><ch-planning-header></ch-planning-header><md-button class="md-fab md-primary md-fab-bottom-right am-fade-and-scale" ui-sref="hotel-reservations-new" aria-label="Add reservation"><md-icon class="mdi mdi-book-plus md-24"></md-icon><md-tooltip md-direction="left"><span translate-once="reservations.reservation.new"></span></md-tooltip></md-button><div ng-switch-when="D" flex layout="column"><div layout-fill ng-include="\'/tpls/planning/planning-content-daily.tpl\'" autoscroll></div></div><div ng-switch-when="W" flex layout="column"><div layout-fill ng-include="\'/tpls/planning/planning-content-weekly.tpl\'" autoscroll></div></div><div ng-switch-when="M" flex layout="column"><div layout-fill ng-include="\'/tpls/planning/planning-content-monthly.tpl\'" autoscroll></div></div></div>');
    $templateCache.put("/tpls/rate-amount-input/rate-amount-input.tpl", '<ng-form name="chRateAmountInputForm" ng-class="{\'text-gray-light cursor-disabled\': $ctrl.ngDisabled}"><div class="no-padding-bottom no-padding-top row-mini layout-column layout-align-center-center"><span ng-if="$ctrl.promotion" ng-switch="$ctrl.promotion.promotionType"><span ng-switch-when="STANDARD" class="label label-xs bg-info"><ch-truncate text="{{$ctrl.promotion.name[$ctrl.$$currentLang.iso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.promotion.days}}"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label label-xs bg-danger"><span translate-once="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-warn"><span translate-once="promotions.early"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label label-xs bg-primary"><span translate-once="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label label-xs bg-success"><span translate-once="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type==\'PRICE\'">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span></span></span><small class="text-gray-light" ng-if="!$ctrl.hideInitialValue"><span ng-if="$ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount"><i><del>{{($ctrl.ngModel.initialAmount|chCurrency)}}</del></i></span><span ng-if="!($ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount)"></span></small></div><div class="no-padding-top"><div ng-if="$ctrl.readOnlyView" class="text-center">{{$ctrl.ngModel.finalAmount|chCurrency}}</div><div ng-if="!$ctrl.readOnlyView"><div class="text-right" ng-if="$ctrl.showOriginalValue"><ch-original-value ng-model="$ctrl.ngModel.finalAmount" refer-to="$ctrl.ngModel.$originalValue.finalAmount" filter="chCurrency" label="{{$ctrl.originalValueLabel}}" css-class="{{$ctrl.originalValueClass}}"></ch-original-value></div><div class="layout-align-end-center layout-row row-mini"><md-input-container class="{{$ctrl.cssClass}}" ng-class="{\'md-icon-right\': !$ctrl.hideRefreshIcon && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount}"><md-icon ng-if="!$ctrl.hideIcon && !$ctrl.ngDisabled" class="{{$ctrl.iconClass}}"></md-icon><input type="number" name="{{$ctrl.inputName}}" ng-model="$ctrl.ngModel.finalAmount" ng-min="$ctrl.ngMin" step="0.01" ng-max="$ctrl.max" ng-pattern="$ctrl.$$pattern" required ng-disabled="$ctrl.ngDisabled" aria-label="Edit amount" class="text-center"><md-icon ng-if="!$ctrl.hideRefreshIcon && !$ctrl.ngDisabled && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount" class="{{$ctrl.refreshIconClass}} clickable" ng-click="$ctrl.$refreshPrice()" aria-label="reset price"><md-tooltip><span translate-once="common.restore"></span></md-tooltip></md-icon><div ng-messages="chRateAmountInputForm[$ctrl.inputName].$error"><span ng-message="required"><span translate-once="error.required"></span></span><span ng-message="min"><span translate="error.amount.min" translate-values="{num: ($ctrl.ngMin | chCurrency)}"></span></span><span ng-message="max"><span translate="error.amount.max" translate-values="{num: ($ctrl.max | chCurrency)}"></span></span><span ng-message="$$pattern"><span translate-once="error.field.generic.invalid"></span></span><span ng-if="errorMessages" ng-repeat="error in $ctrl.errorMessages" ng-message="error.key"><span translate="error.label"></span></span></div></md-input-container></div></div></div></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-availability.tpl", '<div flex layout="column"><div ng-if="$ctrl.availability.hotelClosed" layout layout-align="center center" flex><md-button class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1" aria-label="Availability"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.availability.hotelClosed" flex layout="column"><md-button ng-disabled="$ctrl.availability.pastDate" tabindex="-1" aria-label="Availability" ng-click="$ctrl.$click($event)" class="no-margin row-1 forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'),\n' + "\t\t\t\t'bg-success': $ctrl.availability.counter.actual > 0 && !$ctrl.availability.hotelClosed && !$ctrl.availability.roomClosed, \n" + "\t\t\t\t'bg-danger': $ctrl.availability.roomClosed, \n" + '\t\t\t\t\'bg-warn\': $ctrl.availability.counter.actual <= 0 && !$ctrl.availability.hotelClosed && !$ctrl.availability.roomClosed}"><div layout layout-wrap layout-align="center center" class="md-margin" ng-class="{\'text-small\': $ctrl.$mdMedia(\'xs\')}"><div ng-if="$ctrl.availability.counter.actual > 0"><strong>{{$ctrl.availability.counter.actual}}</strong><small>/{{$ctrl.availability.counter.total}}</small></div><div ng-if="$ctrl.availability.counter.actual <= 0"><md-icon class="mdi mdi-calendar-remove md-18 text-white"></md-icon></div></div><md-tooltip><div ng-if="$ctrl.availability.counter.actual > 0"><span ng-if="!$ctrl.availability.pastDate" translate="ratesheet.availability.edit">Edit availability</span><span ng-if="$ctrl.availability.pastDate && $ctrl.availability.counter.actual == 1" translate="ratesheet.availability.rooms.one"></span><span ng-if="$ctrl.availability.pastDate && $ctrl.availability.counter.actual > 1" translate="ratesheet.availability.rooms" translate-values="{count: $ctrl.availability.counter.actual}"></span></div><div ng-if="$ctrl.availability.counter.actual <= 0"><span translate="hotel.availability.none"></span></div></md-tooltip></md-button></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-header.tpl", '<div flex layout="column"><div ng-if="$ctrl.header.hotelClosed" layout layout-align="center center" flex><md-button class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1" aria-label="Availability"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.header.hotelClosed" flex layout="column"><md-button ng-disabled="$ctrl.header.pastDate || $ctrl.header.availability.actual <= 0" ng-click="$ctrl.$toggleRoomTypeClosing($event)" aria-label="Enable/Disable all room rates" tabindex="-1" class="no-margin row-1 forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t'bg-success': !$ctrl.header.roomClosed && $ctrl.header.availability.actual > 0, \n" + "\t\t\t\t'bg-danger': $ctrl.header.roomClosed, \n" + '\t\t\t\t\'bg-warn\': !$ctrl.header.roomClosed && $ctrl.header.availability.actual <= 0}"><div class="text-small" ng-if="$ctrl.header.roomClosed"><strong hide-xs translate="common.closed.female"></strong><span hide show-xs><md-icon class="mdi mdi-lock md-24 text-white"></md-icon></span></div><div class="text-small" ng-if="!$ctrl.header.roomClosed"><strong><span ng-if="$ctrl.header.availability.actual > 0"><span hide-xs translate="ratesheet.available"></span><span hide show-xs><md-icon class="mdi mdi-lock-open md-24 text-white"></md-icon></span></span><span ng-if="$ctrl.header.availability.actual <= 0"><span hide-xs translate="hotel.availability.none.abbr"></span><span hide show-xs><md-icon class="mdi mdi-close md-24 text-white"></md-icon></span></span></strong></div><md-tooltip><span ng-if="$ctrl.header.roomClosed" translate="ratesheet.rate.room.open"></span><span ng-if="!$ctrl.header.roomClosed && $ctrl.header.availability.actual > 0" translate="ratesheet.rate.room.close"></span><span ng-if="!$ctrl.header.roomClosed && $ctrl.header.availability.actual <= 0" translate="hotel.availability.none"></span></md-tooltip></md-button></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-promotion-edit.tpl", '<ng-form name="chRatesheetPromotionForm" flex layout="column"><div ng-if="$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-icon class="mdi mdi-block-helper md-18"></md-icon></div><div ng-if="$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed"><div ng-switch="$ctrl.type" layout="column" layout-align="center center"><div ng-switch-when="MINIMUM_STAY"><md-input-container flex class="no-margin-bottom minimal-input"><label><span translate="common.nights"></span></label><input value="{{$ctrl.promotion.minStay}}" class="text-center" disabled="disabled" readonly="readonly"></md-input-container></div><div ng-switch-default><md-input-container flex class="no-margin-bottom minimal-input"><label><span translate="common.nights"></span></label><input type="number" class="text-center" name="minStay" ng-model="$ctrl.promotion.minStay" ng-disabled="$ctrl.promotion.pastDate || $ctrl.promotion.roomClosed || !$ctrl.promotion.enabled" min="0" step="1" ng-blur="$ctrl.$saveMinStay()" tabindex="2"><div ng-messages="chRatesheetPromotionForm.minStay.$error"><div ng-message="min"><span translate="error.field.min" translate-values="{num: 1}"></span></div></div></md-input-container></div></div></div></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-promotion.tpl", '<div flex layout="column"><div ng-if="$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-icon class="mdi mdi-block-helper md-18"></md-icon></div><div ng-if="$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed"><div layout="column" flex><md-button ng-disabled="$ctrl.promotion.pastDate || $ctrl.promotion.availability.actual <= 0 || $ctrl.promotion.roomClosed" ng-click="$ctrl.$toggleClosing()" aria-label="Enable/Disable promotion" class="no-margin forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t\t'bg-success': !$ctrl.promotion.roomClosed && $ctrl.promotion.enabled && $ctrl.promotion.availability.actual > 0,\n" + "\t\t\t\t\t'bg-warn': !$ctrl.promotion.roomClosed && $ctrl.promotion.enabled && $ctrl.promotion.availability.actual <= 0,\n" + '\t\t\t\t\t\'bg-danger\': $ctrl.promotion.roomClosed || !$ctrl.promotion.enabled}" tabindex="-1"><div ng-show="!$ctrl.promotion.roomClosed" flex layout layout-xs="column" layout-align="center center"><small ng-show="$ctrl.promotion.minStay > 1"><md-icon class="mdi mdi-calendar-today md-14 text-white"></md-icon></small></div><md-tooltip><span ng-if="$ctrl.promotion.roomClosed || !$ctrl.promotion.enabled"><span ng-if="$ctrl.promotion.availability.actual > 0" translate="ratesheet.promos.promo.enable"></span><span ng-if="$ctrl.promotion.availability.actual <= 0" translate="hotel.availability.none.abbr"></span></span><span ng-if="!$ctrl.promotion.roomClosed && $ctrl.promotion.enabled" translate="ratesheet.promos.promo.disable"></span></md-tooltip></md-button></div></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate-edit-amount.tpl", '<ng-form name="chRatesheetRateDataForm" flex layout="column"><md-input-container class="no-margin minimal-input no-padding-left text-center"><label><span ng-if="$ctrl.label" ng-bind="$ctrl.label"></span><span ng-if="!$ctrl.label" translate="common.price"></span></label><md-icon ng-if="$ctrl.errorIcon" ng-show="!$ctrl.rate.amount.finalAmount" class="material-icons {{$ctrl.errorIcon}}" ng-class="$ctrl.$mdMedia(\'gt-xs\') ? \'md-24\' : \'md-18\'"></md-icon><input type="number" name="amount" ng-model="$ctrl.rate.amount.finalAmount" ng-model-options="{updateOn: $ctrl.updateOn}" ng-disabled="$ctrl.ngDisabled" min="0.01" step="0.01" aria-label="{{$ctrl.type}} Rate" ng-pattern="$ctrl.REGEXP.price" ng-required="$ctrl.ngRequired" ng-change="$ctrl.$onChange()" ng-class="$ctrl.errorBg && !$ctrl.rate.amount.finalAmount ? $ctrl.errorBg : \'\'"><div ng-messages="chRatesheetRateDataForm.amount.$error"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate-edit.tpl", '<ng-form name="chRatesheetRateForm" flex layout="column"><div ng-if="$ctrl.rate.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.rate.hotelClosed"><div layout="column" layout-align="center center"><div ng-if="!$ctrl.hideRate"><ch-ratesheet-rate-edit-amount rate="$ctrl.rate[$ctrl.$$rateDataKey]" type="{{$ctrl.type}}" ng-required="true" ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled" validate-on-init="true" update-on="blur" on-change="$ctrl.$saveRate()"></ch-ratesheet-rate-edit-amount></div><div ng-if="!$ctrl.hideRestrictions"><md-input-container class="minimal-input"><label flex><span translate="common.nights"></span></label><input type="number" class="text-center" name="minStay" ng-model="$ctrl.rate[$ctrl.$$rateDataKey].minStay" ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled" min="1" step="1" ng-blur="$ctrl.$saveMinStay()" tabindex="2"><div ng-messages="chRatesheetRateForm.minStay.$error"><div ng-message="min"><span translate="error.field.min" translate-values="{num: 1}"></span></div></div></md-input-container></div></div></div></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate.tpl", '<div flex layout="column"><div ng-if="$ctrl.rate.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.rate.hotelClosed"><div layout="column" flex><md-button ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.availability.actual <= 0" ng-click="$ctrl.$toggleRateClosing($event)" aria-label="Enable/Disable rate" class="no-margin button-label forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t\t'bg-success': !$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled && $ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount && $ctrl.rate.availability.actual > 0, \n" + "\t\t\t\t\t'bg-warn': !$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled && (!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount || $ctrl.rate.availability.actual <= 0),\n" + '\t\t\t\t\t\'bg-danger\': $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled}" tabindex="-1"><div ng-show="!$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled" flex layout layout-xs="column" layout-align="center center"><div flex ng-show="$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><span ng-class="{\'text-small\': $ctrl.$mdMedia(\'xs\')}">{{$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount|currency:\'€\'}}</span></div><div ng-if="!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><md-icon class="mdi mdi-currency-usd-off text-white md-24"></md-icon></div><small ng-show="$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount && $ctrl.rate[$ctrl.$$rateDataKey].minStay > 1"><md-icon class="mdi mdi-calendar-plus md-14 text-white"></md-icon><md-tooltip><span translate="ratesheet.rate.minstay" translate-value-count="{{$ctrl.rate[$ctrl.$$rateDataKey].minStay}}"></span></md-tooltip></small></div><md-tooltip><div ng-if="!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><span translate="ratesheet.rates.none"></span></div><div ng-if="!$ctrl.rate.pastDate"><div ng-if="$ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled"><span translate="ratesheet.rate.enable"></span></div><div ng-if="!$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled"><span ng-if="$ctrl.rate.availability.actual > 0" translate="ratesheet.rate.disable"></span><span ng-if="$ctrl.rate.availability.actual <= 0" translate="hotel.availability.none"></span></div></div></md-tooltip></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-beds.tpl", '<div><div ng-if="!$ctrl.$$showDetails"><div ng-if="!$ctrl.beds.length"><span class="text-italic" translate="bed.beds.no.selection"></span><md-button class="only-border border-blue-sea text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Show available beds"><md-icon class="mdi mdi-plus md-18 text-blue-sea"></md-icon><small translate="common.add.now"></small></md-button></div><md-list ng-if="$ctrl.beds.length"><md-list-item class="layout-row layout-wrap layout-padding-sm layout-align-center-center no-padding-top no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-repeat="bedSold in $ctrl.beds"><div class="flex"><strong ng-click="$ctrl.$showBedInfo($event, bedSold)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span>&nbsp;<span translate="bed.{{bedSold.bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bedSold.bed.type}}.description"></span></div><div class="text-gray-light text-small"><ch-people-summary people="bedSold.people"></ch-people-summary></div><div ng-if="bedSold.amount" class="md-subhead"><span ng-if="bedSold.amount.finalAmount > 0">{{bedSold.amount.finalAmount|chCurrency}}</span><span ng-if="bedSold.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="no-padding-right" ng-if="!$ctrl.minCount || $ctrl.$$availableBeds.length > $ctrl.minCount"><md-button class="button-small no-margin text-small text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Edit beds"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div ng-if="!$last" class="no-margin no-padding"><md-divider></md-divider></div></md-list-item><md-list-item class="layout-row layout-wrap layout-align-center-center am-fade-and-slide-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="$ctrl.$$errors.min" ng-switch on="$ctrl.minCount - $ctrl.beds.length"><div flex class="layout-row layout-align-start-center"><span ng-switch-when="1" translate="error.beds.left.one"></span><span ng-switch-default translate="error.beds.left" translate-values="{num: $ctrl.minCount - $ctrl.beds.length}"></span></div><div class="layout-row layout-align-end-center"><md-button class="button-small bg-danger" aria-label="Select beds" ng-click="$ctrl.$toggleDetails(true)"><small translate="common.select.now"></small></md-button></div></md-list-item></md-list></div><div class="md-margin no-margin-x-sides no-margin-top" ng-if="$ctrl.$$showDetails"><div ng-if="!$ctrl.$$availableBeds.length"><span class="text-italic" translate="bed.beds.none.alt"></span></div><div ng-if="$ctrl.$$availableBeds.length"><md-list><md-list-item class="am-fade-and-slide-right no-padding-top no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\'), \'no-padding\': bed.$$editing}" ng-repeat="bed in $ctrl.$$availableBeds track by $index"><div flex><div ng-if="!bed.$$editing" layout layout-wrap layout-padding-sm layout-align="center center"><div class="flex flex-order-xs-1 flex-order-sm-1" ng-if="bed.$$available"><strong ng-click="$ctrl.$showBedInfo($event, bed)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span>&nbsp;<span translate="bed.{{bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bed.type}}.description"></span></div><div class="text-small text-lowercase"><span ng-if="bed.adultsPrice"><span>{{bed.adultsPrice|chCurrency}}&nbsp;</span><span translate="people.adult"></span><span ng-if="bed.boysPrice">,&nbsp;</span></span><span ng-if="bed.boysPrice"><span>{{bed.boysPrice|chCurrency}}&nbsp;</span><span translate="people.boy"></span><span ng-if="bed.childrenPrice">,&nbsp;</span></span><span ng-if="bed.childrenPrice"><span>{{bed.childrenPrice|chCurrency}}&nbsp;</span><span translate="people.child"></span><span ng-if="bed.kidsPrice">,&nbsp;</span></span><span ng-if="bed.kidsPrice"><span>{{bed.kidsPrice|chCurrency}}&nbsp;</span><span translate="people.kid"></span></span></div><div class="text-gray-light text-small"><span><span translate="common.for"></span>&nbsp;{{bed.maxPerson}}&nbsp;</span><span ng-if="bed.maxPerson == 1" class="text-lowercase" translate="people.person"></span><span ng-if="bed.maxPerson > 1" class="text-lowercase" translate="people.people"></span></div><div class="text-gray-light text-small"><em ng-if="bed.frequency == \'LUMP_SUM\'"><span translate="bed.price.question.info"></span><span class="text-lowercase" translate="common.entire.stay"></span></em><em ng-if="bed.frequency == \'DAILY\'" translate="bed.price.question.info.and.night"></em></div><div class="text-info" ng-if="bed.$$available && bed.$$blocked"><small translate="bed.remove.to.add.other"></small></div></div><div class="flex flex-order-xs-1 flex-order-sm-1" ng-if="!bed.$$available"><strong ng-click="$ctrl.$showBedInfo($event, bed)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span><span translate="bed.{{bed.bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bed.bed.type}}.description"></span></div><div class="text-gray-light text-small"><ch-people-summary people="bed.people"></ch-people-summary></div><div ng-if="bed.amount" class="md-subhead"><span ng-if="bed.amount.finalAmount > 0">{{bed.amount.finalAmount|chCurrency}}</span><span ng-if="bed.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="layout-column layout-align-end-center flex-order-xs-2 flex-order-sm-2" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="!bed.$$available"><div class="text-center"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<small class="text-success" translate="common.booked.male"></small></div><md-button ng-if="$ctrl.configBed" hide show-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-click="$ctrl.$editBed(bed)" ng-disabled="$ctrl.$$editingBed" aria-label="Edit bed"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="{\'flex-100 layout-column text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="bed.$$available && !$ctrl.$$editingBed"><md-button class="button-small only-border" aria-label="Select bed" ng-click="$ctrl.$selectBed(bed)" ng-disabled="bed.$$blocked" ng-class="{\'border-success text-success\': !bed.$$blocked}"><md-icon class="mdi mdi-plus md-18 text-white" ng-class="{\'text-success\': !bed.$$blocked}"></md-icon><small translate="common.select"></small></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'layout-row layout-align-end-center\' : \'flex-100 layout-column\'" ng-if="!bed.$$available"><md-button ng-if="$ctrl.configBed" hide-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-click="$ctrl.$editBed(bed)" ng-disabled="$ctrl.$$editingBed" aria-label="Edit bed"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button><md-button class="text-small" ng-class="{\'no-margin md-icon-button\': $ctrl.$mdMedia(\'gt-sm\')}" ng-click="$ctrl.$removeBed(bed)" ng-disabled="$ctrl.beds.length <= $ctrl.minCount || $ctrl.$$editingBed" aria-label="Remove bed"><md-icon class="mdi mdi-close md-18"></md-icon><span hide-gt-sm translate="common.remove"></span><md-tooltip hide show-gt-sm><span translate="common.remove"></span></md-tooltip></md-button></div></div><div ng-if="bed.$$editing && $ctrl.$$editingBed"><ch-bed-sold-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" bed-sold="$ctrl.$$editingBed" nights="$ctrl.nights" people-limits="$ctrl.$$peopleLimits" people-age-ranges="$ctrl.peopleAgeRanges" on-confirm="$ctrl.$confirmBedEdit($bedSold)" on-cancel="$ctrl.$cancelBedEdit($bedSold)"></ch-bed-sold-edit></div></div><div ng-if="!$last" class="no-margin no-padding"><md-divider></md-divider></div></md-list-item></md-list></div><div ng-if="!$ctrl.$$editingBed" ng-class="{\'layout-column layout-align-center-center\': !$ctrl.$mdMedia(\'gt-sm\'), \'layout-row\': $ctrl.$mdMedia(\'gt-sm\')}"><div flex class="text-danger layout-row layout-align-start-center" ng-if="$ctrl.$$availableBeds.length && $ctrl.$$errors.min" ng-switch on="$ctrl.minCount - $ctrl.beds.length"><span ng-switch-when="1" translate="error.beds.left.one"></span><span ng-switch-default translate="error.beds.left" translate-values="{num: $ctrl.minCount - $ctrl.beds.length}"></span></div><div flex class="layout-row layout-align-end-center"><md-button ng-class="{\'md-raised\': $ctrl.beds.length, \'bg-success\': !$ctrl.$$errors.min && !$ctrl.$$errors.max && $ctrl.beds.length, \'text-blue-sea\': !$ctrl.beds.length}" ng-disabled="$ctrl.$$errors.min || $ctrl.$$errors.max" ng-click="$ctrl.$confirm()" aria-label="Confirm beds"><md-icon ng-show="$ctrl.beds.length" class="mdi mdi-check md-24" ng-class="{\'text-white\': !$ctrl.$$errors.min && !$ctrl.$$errors.max}"></md-icon><md-icon ng-show="!$ctrl.beds.length" class="mdi mdi-chevron-up md-24 text-blue-sea"></md-icon><span ng-show="$ctrl.beds.length" translate="common.confirm"></span><span ng-show="!$ctrl.beds.length" translate="common.hide"></span></md-button></div></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-identity-documents.tpl", '<div><md-list><md-list-item ng-repeat="document in $ctrl.identityDocuments track by $index" class="am-fade-and-slide-right"><div flex layout="column"><div layout layout-wrap layout-align="start center"><div ng-switch="document.guestType"><md-icon ng-switch-when="GROUP_LEADER" class="mdi mdi-google-circles md-18 circle-icon bg-success text-white"></md-icon><md-icon ng-switch-when="HOUSEHOLDER" class="mdi mdi-account-multiple md-18 circle-icon bg-success text-white"></md-icon><md-icon ng-switch-default class="mdi md-18 circle-icon bg-gray-lighter text-gray-light" ng-class="document.name && document.surname ? \'mdi-account\': \'mdi-account-alert\'"></md-icon></div><div><strong><span translate="guest.guest"></span>&nbsp;{{$index+1}}:&nbsp;</strong></div><div flex ng-if="!document.$$editing" class="md-padding" ng-class="{\'flex\': $ctrl.$mdMedia(\'gt-sm\'), \'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span ng-if="document.name && document.surname"><span class="text-capitalize">{{document.name}}&nbsp;{{document.surname}}</span>&nbsp;<span ng-if="document.birthDate">-&nbsp;{{document.birthDate|date:"shortDate"}}&nbsp;</span><span ng-class="document.guestType == \'GROUP_LEADER\' || document.guestType == \'HOUSEHOLDER\'? \'label label-xs bg-success\' : \'label label-xs bg-gray-light\'"><span ng-if="document.guestType == \'GROUP_LEADER\'" translate="common.GROUP_LEADER"></span><span ng-if="document.guestType == \'HOUSEHOLDER\'" translate="common.HOUSEHOLDER"></span><span ng-if="document.guestType == \'SINGLE_GUEST\'" translate="common.SINGLE_GUEST"></span><span ng-if="document.guestType == \'GROUP_MEMBER\'" translate="common.GROUP_MEMBER"></span><span ng-if="document.guestType == \'FAMILY_MEMBER\'" translate="common.FAMILY_MEMBER"></span></span></span><span ng-if="!document.name || !document.surname" class="text-gray-light"><span translate="reservation.text.identityDocuments.no.guest"></span>.&nbsp;<span translate="reservation.text.identityDocuments.add.question"></span></span></div><div ng-if="!document.$$editing" ng-class="{\'flex-100 layout-column\': !$ctrl.$mdMedia(\'gt-sm\')}"><md-button ng-class="document.name && document.surname ? \'text-blue-sea\' : \'only-border border-success text-success\'" class="button-small" ng-disabled="$ctrl.$$editingDocument" ng-click="$ctrl.$editDocument(document)" aria-label="{{document.name && document.surname ? \'Edit\' : \'Add\'}} document"><span ng-if="document.name && document.surname"><span class="mdi mdi-pencil md-24" ng-class="{\'text-blue-sea\': !$ctrl.$$editingDocument}"></span><small translate="common.edit"></small></span><span ng-if="!document.name || !document.surname"><span class="mdi mdi-plus md-24"></span><small translate="common.add"></small></span></md-button><md-button ng-if="document.name && document.surname" class="md-icon-button no-margin" ng-disabled="$ctrl.$$editingDocument" ng-click="$ctrl.$removeDocument(document)" aria-label="Remove document"><md-icon class="mdi mdi-close md-18"></md-icon><md-tooltip><span translate="common.remove"></span></md-tooltip></md-button></div></div><div flex ng-if="document.$$editing && $ctrl.$$editingDocument"><div><ch-identity-document-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" identity-document="$ctrl.$$editingDocument" on-confirm="$ctrl.$confirmDocumentEdit($document)" on-cancel="$ctrl.$cancelDocumentEdit($document)"></ch-identity-document-edit></div></div></div><md-divider class="no-padding" ng-if="!document.$$editing && !$last"></md-divider></md-list-item></md-list></div>');
    $templateCache.put("/tpls/room-edit/room-edit-people.tpl", '<div><md-list ng-show="!$ctrl.$$showDetails"><md-list-item ng-if="$ctrl.maxCount > 1" class="layout-row layout-wrap layout-padding layout-align-center-center no-padding-top no-padding-bottom no-padding-right"><div flex><ch-people-summary people="$ctrl.people"></ch-people-summary></div><div class="no-padding-right"><md-button class="button-small no-margin text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Edit guests"><small><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></small></md-button></div></md-list-item><md-list-item ng-if="$ctrl.maxCount == 1" class="layout-row layout-wrap layout-padding layout-align-center-center no-padding-top no-padding-bottom no-padding-right"><div class="flex"><span><span translate="people.people.only.inroom"></span>&nbsp;</span><ch-people-summary people="$ctrl.people"></ch-people-summary></div></md-list-item></md-list><div class="layout-column" ng-class="{\'layout-align-center-center\': !$mdMedia(\'gt-sm\')}" ng-show="$ctrl.$$showDetails"><div><ch-people-counters ng-model="$ctrl.people" max-people="$ctrl.maxPeople" min="1" max="$ctrl.maxCount" limits="$ctrl.limits" age-ranges="$ctrl.ageRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-if="$ctrl.$$guestsCount.standard >= $ctrl.maxCount" class="md-padding no-padding-bottom no-padding-top"><span class="bg-info label label-inline-block text-wrap text-center" translate="people.max.room"></span></div><div class="text-right" ng-class="{\'layout-column\': !$mdMedia(\'gt-sm\')}"><md-button class="bg-success text-white md-raised" ng-click="$ctrl.$toggleDetails()" aria-label="Confirm guests"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-services.tpl", '<div><div ng-if="!$ctrl.totalServices.length"><span class="text-italic" translate="service.none"></span></div><div ng-if="$ctrl.totalServices.length"><md-list class="layout-row layout-wrap"><md-list-item ng-repeat="service in $ctrl.totalServices track by $index" ng-show="$ctrl.$$showAllServices || $index < $ctrl.previewSize" class="am-fade-and-slide-right no-padding-top no-padding-right flex-100" ng-class="{\'flex-gt-sm-50\': $ctrl.totalServices.length > 1, \'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\'), \'no-padding\': service.$$editing}"><div ng-if="!service.$$editing" flex layout layout-wrap layout-align="start center" layout-padding-sm class="no-secondary-container"><div ng-if="$ctrl.$$servicesIcons[service.type.nameKey]"><md-icon class="{{$ctrl.$$servicesIcons[service.type.nameKey]}} md-30 circle-icon material-icons" ng-class="service.$$serviceSold ? \'bg-success text-white\' : \'bg-gray-lighter text-gray-light\'"></md-icon></div><div ng-if="!$ctrl.$$servicesIcons[service.type.nameKey]"><md-icon class="mdi mdi-check md-30 circle-icon" ng-class="service.$$serviceSold ? \'bg-success text-white\' : \'bg-gray-lighter text-gray-light\'"></md-icon></div><div class="flex layout-column flex-order-xs-1 flex-order-sm-1" ng-if="!service.$$serviceSold"><strong ng-click="$ctrl.$showServiceInfo($event, service)" aria-label="Show service info" class="clickable"><span ng-if="service.maxCount > 1">{{service.maxCount}}&nbsp;x&nbsp;</span><span translate="{{service.type.nameKey}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><span ng-switch="service.paymentType" class="text-lowercase text-gray-light text-small"><span ng-switch-when="FREE"><span translate="common.free"></span></span><span ng-switch-when="SINGLE"><span>{{service.paymentOptions[0].amount.finalAmount|chCurrency}}</span>&nbsp;<span ng-if="service.frequency == \'DAILY\'" class="text-lowercase"><span translate="date.frequency.daily"></span></span><span ng-if="service.frequency == \'MONTHLY\'" class="text-lowercase"><span translate="date.frequency.monthly"></span></span><span ng-if="service.frequency == \'YEARLY\'" class="text-lowercase"><span translate="date.frequency.yearly"></span></span><span ng-if="service.frequency == \'LUMP_SUM\'" class="text-lowercase"><span translate="common.entire.stay"></span></span></span><span ng-switch-when="PER_PERSON"><span translate="reservation.starting.from"></span>&nbsp;<span>{{service.$$bestPrice|chCurrency}}</span>&nbsp;<span ng-if="service.frequency == \'DAILY\'" class="text-lowercase"><span translate="date.frequency.daily"></span></span><span ng-if="service.frequency == \'MONTHLY\'" class="text-lowercase"><span translate="date.frequency.monthly"></span></span><span ng-if="service.frequency == \'YEARLY\'" class="text-lowercase"><span translate="date.frequency.yearly"></span></span><span ng-if="service.frequency == \'LUMP_SUM\'" class="text-lowercase"><span translate="common.entire.stay"></span></span></span></span></div><div class="flex layout-column flex-order-xs-1 flex-order-sm-1" ng-if="service.$$serviceSold"><strong ng-click="$ctrl.$showServiceInfo($event, service)" aria-label="Show service info" class="clickable"><span ng-if="service.$$serviceSold.count > 1">{{service.$$serviceSold.count}}&nbsp;x&nbsp;</span><span translate="{{service.type.nameKey}}"></span><md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div ng-if="service.paymentType == \'PER_PERSON\'" class="text-gray-light text-small"><ch-people-summary people="service.$$serviceSold.people"></ch-people-summary></div><div ng-if="!service.$$serviceSold.$$removed && service.$$serviceSold.amount" class="md-subhead"><span ng-if="service.$$serviceSold.amount.finalAmount > 0">{{service.$$serviceSold.amount.finalAmount|chCurrency}}</span><span ng-if="service.$$serviceSold.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="layout-column layout-align-center-center flex-order-xs-2 flex-order-sm-2" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="service.$$serviceSold"><div class="text-center"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<small class="text-success" translate="common.booked.male"></small></div><md-button ng-if="service.$$editable" hide show-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$editService(service)" aria-label="Edit service"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="{\'flex-100 layout-column text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="!service.$$serviceSold"><md-button class="button-small only-border" ng-class="{\'border-success text-success\': !$ctrl.$$editingService}" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$addService(service)" aria-label="Add service"><md-icon class="mdi mdi-plus md-18" ng-class="{\'text-success\': !$ctrl.$$editingService}"></md-icon><small translate="common.add"></small></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'layout-row layout-align-end-center\' : \'flex-100 layout-column\'" ng-if="service.$$serviceSold"><md-button ng-if="service.$$editable" hide-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$editService(service)" aria-label="Edit service"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button><md-button class="text-small" ng-class="{\'no-margin md-icon-button\': $ctrl.$mdMedia(\'gt-sm\')}" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$removeService(service.$$serviceSold)" aria-label="Remove service"><md-icon class="mdi mdi-close md-18"></md-icon><span hide-gt-sm translate="common.remove"></span><md-tooltip hide show-gt-sm><span translate="common.remove"></span></md-tooltip></md-button></div></div><div flex ng-if="service.$$editing && $ctrl.$$editingService"><ch-service-sold-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" service-sold="$ctrl.$$editingService" nights="$ctrl.nights" people-limits="$ctrl.$$peopleLimits" people-age-ranges="$ctrl.peopleAgeRanges" on-confirm="$ctrl.$confirmServiceEdit($serviceSold)" on-cancel="$ctrl.$cancelServiceEdit($serviceSold)"></ch-service-sold-edit></div><md-divider ng-if="!$last" class="md-margin hide-gt-sm"></md-divider></md-list-item></md-list><div ng-if="($ctrl.totalServices.length - $ctrl.previewSize) > 0" class="flex-100 layout-column"><md-button class="button-mini text-small" ng-click="$ctrl.$toggleAllServices()" aria-label="Show other services"><span ng-if="!$ctrl.$$showAllServices"><span ng-if="($ctrl.totalServices.length - $ctrl.previewSize) <= 1"><span translate="common.show.other"></span><span>{{($ctrl.totalServices.length - $ctrl.previewSize)}}</span><span translate="service.services"></span></span><span ng-if="($ctrl.totalServices.length - $ctrl.previewSize) > 1"><span translate="common.show.others"></span><span>{{($ctrl.totalServices.length - $ctrl.previewSize)}}</span><span translate="service.services"></span></span></span><span ng-if="$ctrl.$$showAllServices"><span translate="reservation.services.hide"></span></span><md-icon class="mdi md-18" ng-class="$ctrl.$$showAllServices ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit.tpl", '<div class="relative" id="ch-room-edit_{{$ctrl.$$index}}"><div ng-if="$ctrl.title || $ctrl.onRemove" class="layout-row layout-padding-sm"><div ng-if="$ctrl.title" class="text-primary md-subhead"><span ng-bind="$ctrl.title"></span></div><div flex></div><div ng-if="$ctrl.onRemove"><md-button class="md-icon-button" ng-click="$ctrl.$removeRoom($event)" aria-label="Remove room"><md-icon class="mdi mdi-close md-24"></md-icon><md-tooltip><span translate="common.remove"></span></md-tooltip></md-button></div></div><div class="layout-gt-sm-row layout-padding no-padding layout-wrap"><div class="square-room-image no-padding-left"><img class="no-padding-left clickable" ng-src="{{$ctrl.$$roomImage}}" lazy-image alt="Room cover image" ng-click="$ctrl.$openGallery($event)"><md-tooltip><span translate="photo.photos.view.all"></span></md-tooltip></div><div flex><div layout layout-wrap><div flex><h3 class="no-margin md-title" translate="{{$ctrl.room.type.roomType.nameKey}}"></h3><div class="row-mini text-gray-light"><small flex><span ng-if="$ctrl.room.type.description[$ctrl.localeIso]">{{$ctrl.room.type.description[$ctrl.localeIso]}}</span><span ng-if="!$ctrl.room.type.description[$ctrl.localeIso]"><span translate="{{$ctrl.room.type.roomType.descriptionKey}}"></span></span></small></div><div><span class="md-caption"><span><span translate="room.category"></span>:&nbsp;</span><span class="text-normal text-uppercase" translate="room.category.{{$ctrl.room.type.category}}"></span></span></div><div><span class="md-caption text-lowercase"><span>{{$ctrl.$$guestsCount.total}}</span>&nbsp;<span ng-if="$ctrl.$$guestsCount.total != 1" translate="people.people"></span><span ng-if="$ctrl.$$guestsCount.total == 1" translate="people.person"></span></span></div></div><div><div class="layout-row layout-wrap layout-align-gt-sm-end-center flex-xs-100 flex-sm-100" ng-class="{\'layout-align-center-start\': $ctrl.$$promotion, \'layout-align-center-center\': !$ctrl.$$promotion}"><div class="layout-column" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\'), \'text-right\': $ctrl.$mdMedia(\'gt-sm\')}"><div ng-if="$ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType"><span ng-switch-when="STANDARD" class="label label-xs bg-info"><ch-truncate text="{{$ctrl.$$promotion.name[$ctrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.$$promotion.minStay}}"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label label-xs bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label label-xs bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label label-xs bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span></div><div layout="column" layout-align="center end" ng-class="{\'md-padding\': !$ctrl.$mdMedia(\'gt-sm\')}"><small ng-if="$ctrl.room.totalPrice.initialAmount > 0 && $ctrl.room.totalPrice.initialAmount > $ctrl.room.totalPrice.finalAmount"><i><del>{{$ctrl.room.totalPrice.initialAmount|chCurrency}}</del></i>&nbsp;&nbsp;</small><h3 class="no-margin md-headline">{{$ctrl.room.totalPrice.finalAmount|chCurrency}}</h3></div><div class="text-center layout-column flex-50"><div ng-switch="$ctrl.room.totalRate.type"><span ng-switch-when="STANDARD"><span ng-if="$ctrl.room.totalRate.cancellationPolicy.flexible" class="label bg-warn" translate="reservation.rate.flexible"></span><span ng-if="!$ctrl.room.totalRate.cancellationPolicy.flexible" class="label bg-success" translate="reservation.cancellation.free"></span></span><span ng-switch-when="NOT_REFUNDABLE" class="label" translate="ratesheet.rate.type.notRefundable.abbr"></span></div></div></div></div></div></div><div ng-if="$ctrl.room.totalRate.$$bestHotelRate" class="layout-row layout-wrap layout-align-start-center layout-padding border-radius border-success text-success only-border md-body-2 margin-auto-20"><span class="no-padding"><md-icon class="mdi mdi-thumb-up-outline md-24 text-success"></md-icon>&nbsp;<span translate="room.best.hotel.rate"></span></span></div><div ng-if="!$ctrl.room.totalRate.$$bestHotelRate" class="layout-row layout-wrap layout-align-start-center layout-padding border-radius border-blue-sea text-blue-sea only-border md-body-2 margin-auto-20"><span class="no-padding"><md-icon class="mdi mdi-thumb-up-outline md-24 text-blue-sea"></md-icon>&nbsp;<span translate="room.best.lovely.choise"></span></span></div></div></div><div ng-if="!$ctrl.showConfig"><div layout="column" ng-class="{\'md-padding\': $ctrl.$mdMedia(\'gt-sm\')}"><div class="font-14 text-blue-sea text-center"><span translate="room.config.now.question"></span></div><md-button class="bg-blue-sea text-wrap button-small" ng-click="$ctrl.$toggleRoomConfig(true)" aria-label="Config room"><span><span translate="room.config.now"></span>!</span><md-icon class="mdi mdi-chevron-down md-24 text-white animated infinite bounce"></md-icon></md-button></div></div><div ng-if="$ctrl.showConfig"><div class="layout-column flex-100 layout-align-center-center margin-20-no-x-sides"><div class="md-title text-center"><span translate="reservation.rooms.config.title"></span></div></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-account-multiple md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="bed.sleep.here.room"></span></div><md-divider></md-divider><div ng-if="$ctrl.room.type.guestsCount.standard > 1" class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small><span ng-if="$ctrl.maxCount != $ctrl.$$guestsCount.standard"><span translate="people.people.add.more"></span>.&nbsp;</span><span ng-if="$ctrl.maxCount == $ctrl.$$guestsCount.standard"><span translate="people.people.edit"></span>.&nbsp;</span><span translate="common.edit.no.extra.cost"></span></small></div></div><ch-room-edit-people people="$ctrl.room.people" max-people="$ctrl.room.type.people" max-count="$ctrl.room.type.guestsCount.standard" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-room-edit-people></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div ng-if="!$ctrl.$bedsConfig"><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span flex><ch-people-summary people="$ctrl.room.people"></ch-people-summary><span class="text-lowercase">&nbsp;<span ng-if="$ctrl.$$guestsCount.standard == 1" translate="people.person.will.sleep"></span><span ng-if="$ctrl.$$guestsCount.standard > 1" translate="people.people.will.sleep"></span>&nbsp;<span ng-if="$ctrl.room.beds.length == 1" translate="bed.bed.follow"></span><span ng-if="$ctrl.room.beds.length > 1" translate="bed.beds.follow"></span></span></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small ng-if="$ctrl.room.type.beds.length > $ctrl.room.beds.length"><span translate="bed.choise.type"></span><span translate="common.edit.no.extra.cost"></span></small><small ng-if="$ctrl.room.type.beds.length <= $ctrl.room.beds.length"><span translate="bed.beds.principal.description"></span></small></div></div><div ng-if="$ctrl.$bedsConfig"><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span flex translate="bed.beds.principal.list"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small><span translate="bed.beds.principal.max.selectable.label1"></span>&nbsp;<span>{{$ctrl.room.type.bedCount}}</span><span class="text-lowercase" ng-if="$ctrl.room.type.bedCount > 1" translate="bed.beds.principal"></span><span class="text-lowercase" ng-if="$ctrl.room.type.bedCount == 1" translate="bed.bed.principal"></span>&nbsp;<span class="text-lowercase" translate="bed.beds.principal.max.selectable.label2"></span><span>.&nbsp;<span translate="common.choice.no.extra.cost"></span>.</span></small></div></div><div><ch-room-edit-beds room="$ctrl.room" nights="$ctrl.nights" beds="$ctrl.room.beds" total-beds="$ctrl.room.type.beds" min-count="1" max-count="$ctrl.room.type.bedCount" on-toggle-config="$ctrl.$onToggleBedsConfig($open)" on-add="$ctrl.$onBedAdd($bed)" on-remove="$ctrl.$onBedRemove($bed)" on-change="$ctrl.$onBedChange($bed)"></ch-room-edit-beds></div></div><div ng-if="$ctrl.room.type.otherBeds.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-plus md-18 text-blue-sea no-margin"></md-icon><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span ng-show="$ctrl.room.otherBeds.length" translate="bed.beds.list.title"></span><span ng-show="!$ctrl.room.otherBeds.length" translate="bed.beds.list.title.other"></span><md-button ng-if="!$ctrl.room.otherBeds.length" ng-show="!$ctrl.$$extraBedsConfig" class="button-small no-margin-top no-margin-bottom text-blue-sea" ng-disabled="$ctrl.$$extraBedsConfig" aria-label="Show/Hide extra beds" ng-click="$ctrl.$toggleExtraBeds()"><small ng-if="!$ctrl.$$showExtraBeds"><md-icon class="mdi mdi-plus md-18 text-blue-sea"></md-icon><span translate="common.add"></span></small><small ng-if="$ctrl.$$showExtraBeds"><md-icon class="mdi mdi-chevron-up md-18 text-blue-sea"></md-icon><span translate="common.hide"></span></small></md-button></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small ng-if="$ctrl.room.otherBeds.length"><span translate="bed.this.operation"></span>&nbsp;<span>{{$ctrl.$$guestsCount.extra}}</span>&nbsp;<span class="text-lowercase"><span ng-if="$ctrl.$$guestsCount.extra == 1" translate="people.person"></span><span ng-if="$ctrl.$$guestsCount.extra != 1" translate="people.people"></span>&nbsp;<span translate="room.room.in.yours"></span></span></small><small ng-if="!$ctrl.room.otherBeds.length"><span translate="bed.beds.add.more"></span>&nbsp;<span>{{$ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length}}</span>&nbsp;<span class="text-lowercase"><span ng-if="($ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length) == 1" translate="bed.bed"></span><span ng-if="($ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length) != 1" translate="bed.beds"></span>&nbsp;<span translate="reservation.total.night"></span>&nbsp;<span>{{$ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra}}</span>&nbsp;<span ng-if="($ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra) == 1" translate="people.person"></span><span ng-if="($ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra) != 1" translate="people.people"></span></span></small></div></div><div ng-if="$ctrl.$$showExtraBeds" id="ch-room-edit-{{$ctrl.$$index}}-config-extra-beds"><ch-room-edit-beds room="$ctrl.room" nights="$ctrl.nights" beds="$ctrl.room.otherBeds" total-beds="$ctrl.room.type.otherBeds" max-count="$ctrl.room.type.maxOtherBeds" config-bed="true" people-age-ranges="$ctrl.peopleAgeRanges" on-toggle-config="$ctrl.$onToggleExtraBedsConfig($open)" on-add="$ctrl.$onExtraBedAdd($bed)" on-remove="$ctrl.$onExtraBedRemove($bed)" on-change="$ctrl.$onExtraBedChange($bed)"></ch-room-edit-beds><div ng-if="$ctrl.room.otherBeds.length == $ctrl.room.type.maxOtherBeds" class="text-center"><md-icon class="mdi mdi-thumb-up-outline text-success"></md-icon>&nbsp;<span translate="bed.all.added.success.message" class="text-success"></span></div></div></div><div ng-if="$ctrl.$$includedServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-checkbox-multiple-marked-circle-outline md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="room.facilities"></span></div><md-divider></md-divider><div class="md-padding text-gray-light"><span translate="room.facilities.text"></span>&nbsp;<md-button class="no-margin button-small text-blue-sea" ng-click="$ctrl.$toggleIncludedServices()" aria-label="Show/Hide room facilities"><small><span ng-if="!$ctrl.$$showIncluedServices" translate="common.show"></span><span ng-if="$ctrl.$$showIncluedServices" translate="common.hide"></span>&nbsp;<md-icon class="mdi text-blue-sea" ng-class="$ctrl.$$showIncluedServices ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></small></md-button></div></div><div ng-if="$ctrl.$$showIncluedServices" class="layout-column flex-100 md-padding no-padding-top"><div layout layout-wrap layout-padding-sm><div ng-repeat="service in $ctrl.$$includedServices track by $index" class="flex-100 flex-gt-sm-50"><md-icon ng-if="$ctrl.$$servicesIcons[service.type.nameKey]" class="{{$ctrl.$$servicesIcons[service.type.nameKey]}} text-success material-icons"></md-icon><md-icon ng-if="!$ctrl.$$servicesIcons[service.type.nameKey]" class="mdi mdi-check text-success material-icons"></md-icon>&nbsp;<span translate="{{service.type.nameKey}}"></span></div></div></div></div><div ng-if="$ctrl.$$freeServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-gift md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="service.services.free.text"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small translate="service.services.free.info"></small></div></div><div><ch-room-edit-services room="$ctrl.room" nights="$ctrl.nights" services="$ctrl.room.services" total-services="$ctrl.$$freeServices" preview-size="4" people-age-ranges="$ctrl.peopleAgeRanges" on-add="$ctrl.$onServiceAdd($service)" on-remove="$ctrl.$onServiceRemove($service)" on-change="$ctrl.$onServiceChange($service)"></ch-room-edit-services></div></div><div ng-if="$ctrl.$$paymentServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-currency-usd md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="service.services.popular.text"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small translate="service.services.popular.info"></small></div></div><div><ch-room-edit-services room="$ctrl.room" nights="$ctrl.nights" services="$ctrl.room.services" total-services="$ctrl.$$paymentServices" preview-size="4" people-age-ranges="$ctrl.peopleAgeRanges" on-add="$ctrl.$onServiceAdd($service)" on-remove="$ctrl.$onServiceRemove($service)" on-change="$ctrl.$onServiceChange($service)"></ch-room-edit-services></div></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-account-card-details md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="reservation.text.identityDocuments.list"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom"><span translate="reservation.text.identityDocuments.label"></span>&nbsp;<md-button class="no-margin button-small text-blue-sea text-small" ng-click="$ctrl.$toggleIdentityDocuments()" aria-label="Hide/show room facilities"><span ng-if="!$ctrl.$$showIdentityDocuments"><span ng-if="!$ctrl.room.identityDocuments.length" translate="reservation.text.identityDocuments.enter"></span><span ng-if="$ctrl.room.identityDocuments.length" translate="reservation.text.identityDocuments.show"></span></span><span ng-if="$ctrl.$$showIdentityDocuments" translate="reservation.text.identityDocuments.hide"></span><md-icon class="mdi text-blue-sea" ng-class="$ctrl.$$showIdentityDocuments ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></md-button></div></div><div ng-if="$ctrl.$$showIdentityDocuments" id="ch-room-edit-{{$ctrl.$$index}}-config-documents"><ch-room-edit-identity-documents identity-documents="$ctrl.room.identityDocuments" total-count="$ctrl.$$guestsCount.total" guest-type="$ctrl.identityDocumentGuestType" on-add="$ctrl.$onIdentityDocumentAdd($document)" on-remove="$ctrl.$onIdentityDocumentRemove($document)" on-change="$ctrl.$onIdentityDocumentChange($document)"></ch-room-edit-identity-documents></div></div><div layout="column"><md-button class="text-blue-sea text-small text-wrap row-1" ng-click="$ctrl.$toggleRoomConfig(false)" aria-label="Close room config"><span translate="room.config.close"></span><md-icon class="mdi mdi-chevron-up md-18 text-blue-sea"></md-icon></md-button></div></div></div>');
    $templateCache.put("/tpls/room/room-info.tpl", '<div id="{{\'ch-room-\' + $ctrl.chRoomCtrl.$$index + \'-info\'}}" ng-show="$ctrl.chRoomCtrl.$$showInfo" ng-class="{\'animated fadeIn\': $ctrl.chRoomCtrl.$$showInfo}"><div class="md-padding no-padding-bottom text-gray-light"><div ng-show="$ctrl.chRoomCtrl.room.maxOtherBeds > 0" class="md-padding no-padding-bottom text-blue-sea text-center"><md-icon class="mdi mdi-hotel animated tada infinite text-blue-sea md-24"></md-icon>&nbsp;<span translate="reservation.room.extra.beds.bookable"></span><span ng-if="$ctrl.chRoomCtrl.$$hasFreeBeds" class="text-uppercase" translate="common.for.free"></span><span ng-if="!$ctrl.chRoomCtrl.$$hasFreeBeds" class="text-lowercase" translate="common.for.fee"></span></div><div class="layout layout-wrap"><div class="layout-column flex"><div layout layout-wrap class="bg-white layout-padding layout-row layout-wrap layout-align-space-around md-whiteframe-1dp"><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><ch-people-icons people="$ctrl.chRoomCtrl.room.people" max="$ctrl.chRoomCtrl.room.guestsCount.standard" extra-people="$ctrl.chRoomCtrl.room.extraPeople" extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra" hidetooltip="!$ctrl.$mdMedia(\'gt-sm\')" size="big" theme="dark" hide-extra-people="true"></ch-people-icons></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div><md-icon class="mdi mdi-hotel md-48"></md-icon></div><div class="text-small"><span>{{::$ctrl.chRoomCtrl.room.beds.length}}</span><span ng-if="$ctrl.chRoomCtrl.room.beds.length == 1"><span translate="bed.{{::$ctrl.chRoomCtrl.room.beds[0].type}}"></span></span><span ng-if="$ctrl.chRoomCtrl.room.beds.length != 1" translate="bed.beds.principal"></span></div></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div style="height: 48px; line-height: 58px"><span class="md-title">{{::$ctrl.chRoomCtrl.room.metres}} m²</span></div><div class="text-small"><span translate="room.size"></span></div></div></div><div ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra > 0" layout layout-wrap class="bg-white layout-padding layout-row layout-wrap layout-align-space-around md-whiteframe-1dp" style="margin-top: 10px"><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><ch-people-icons people="$ctrl.chRoomCtrl.room.people" max="$ctrl.chRoomCtrl.room.guestsCount.standard" extra-people="$ctrl.chRoomCtrl.room.extraPeople" extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra" hidetooltip="!$ctrl.$mdMedia(\'gt-sm\')" size="big" theme="dark" hide-people="true"></ch-people-icons></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div><md-icon class="mdi mdi-hotel md-48"></md-icon></div><div class="text-small"><span>{{::$ctrl.chRoomCtrl.room.maxOtherBeds}}</span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds == 1" translate="bed.otherbed"></span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds != 1" translate="bed.otherbeds"></span></div></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div style="height: 48px;line-height: 58px"><span class="md-title">{{::$ctrl.chRoomCtrl.room.bathMetres}} m²</span></div><div class="text-small"><span translate="room.bath.size"></span></div></div></div></div></div><h4 class="md-subhead no-margin-bottom"><strong translate="room.description"></strong></h4><div class="layout layout-wrap"><div flex><span ng-if="$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]"><span hm-read-more hm-text="{{$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]}}" hm-limit="50" hm-more-text="{{\'common.read.more\'|translate}}" hm-less-text="{{\'common.read.less\'|translate}}" hm-link-class="clickable text-primary"></span></span><span ng-if="!$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]"><span translate="{{::$ctrl.chRoomCtrl.room.roomType.descriptionKey}}"></span></span></div></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.metres"><h4 class="md-subhead no-margin-bottom"><strong translate="room.size"></strong></h4><div layout><strong translate="room.room"></strong>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.metres}} mq</span>&nbsp;<span>({{::($ctrl.chRoomCtrl.room.metres * 10.764 | number:2)}} sq ft.)</span></div><div layout><strong translate="service.type.BATHROOM"></strong>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.bathMetres}} mq</span>&nbsp;<span>({{::($ctrl.chRoomCtrl.room.bathMetres * 10.764 | number:2)}} sq ft.)</span></div></div><div layout="column"><strong ng-if="$ctrl.chRoomCtrl.room.bathIncluded" class="md-subhead no-margin-bottom"><span translate="room.bath.included"></span></strong><strong ng-if="!$ctrl.chRoomCtrl.room.bathIncluded" class="md-subhead no-margin-bottom"><span translate="room.bath.not.included"></span></strong></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.beds && $ctrl.chRoomCtrl.room.beds.length > 0"><h4 class="md-subhead no-margin-bottom"><strong ng-if="$ctrl.chRoomCtrl.room.beds.length == 1" translate="bed.bed.principal"></strong><strong ng-if="$ctrl.chRoomCtrl.room.beds.length != 1" translate="bed.beds.principal"></strong></h4><span ng-repeat="bed in $ctrl.chRoomCtrl.room.beds track by $index"><span>{{::bed.count}}&nbsp;x&nbsp;</span><span ng-if="bed.type" translate="bed.{{::bed.type}}"></span><span ng-if="!$last">,&nbsp;</span></span></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.otherBeds && $ctrl.chRoomCtrl.room.otherBeds.length > 0"><h4 class="md-subhead no-margin-bottom"><strong translate="bed.otherbeds"></strong></h4><div class="text-small"><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds > 1"><span class="layout-padding no-padding-left" translate="reservation.info.max.otherBeds" translate-value-count="{{::$ctrl.chRoomCtrl.room.maxOtherBeds}}"></span></span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds == 1"><span class="layout-padding no-padding-left" translate="reservation.info.max.otherBed"></span></span><span class="text-lowercase" translate="common.choice.between"></span>:</div><md-list class="no-padding-bottom"><md-list-item ng-repeat="otherBed in $ctrl.chRoomCtrl.room.otherBeds track by $index"><div class="layout flex layout-padding no-padding"><div class="layout-column flex layout-padding-sm no-padding layout-align-center-start"><div class="no-padding-left"><span>{{otherBed.count}}&nbsp;x&nbsp;</span><strong translate="bed.{{otherBed.type}}"></strong>&nbsp;<span class="text-lowercase"><span translate="bed.max.person"></span>&nbsp;<span>{{otherBed.maxPerson}}</span>&nbsp;<span ng-if="otherBed.maxPerson > 1" translate="people.people"></span><span ng-if="otherBed.maxPerson <= 1" translate="people.person"></span><span translate="bed.per.bed"></span></span></div><div class="no-padding text-gray-light text-lowercase"><small ng-if="otherBed.people.adults"><span><span translate="people.adults"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.adults}}):</span><span ng-if="otherBed.adultsPrice">{{otherBed.adultsPrice|currency:\'€\'}}</span><span ng-if="!otherBed.adultsPrice" translate="common.free"></span></small><small ng-if="otherBed.people.boys"><span ng-if="otherBed.people.adults">&nbsp;-</span><span><span translate="people.boys"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.boys}}):</span><span ng-if="otherBed.boysPrice">{{otherBed.boysPrice|currency:\'€\'}}</span><span ng-if="!otherBed.boysPrice" translate="common.free"></span></small><small ng-if="otherBed.people.children"><span ng-if="otherBed.people.adults || otherBed.people.boys">&nbsp;-</span><span><span translate="people.children"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.children}}):</span><span ng-if="otherBed.childrenPrice">{{otherBed.childrenPrice|currency:\'€\'}}</span><span ng-if="!otherBed.childrenPrice" translate="common.free"></span></small><small ng-if="otherBed.people.kids"><span ng-if="otherBed.people.adults || otherBed.people.boys || otherBed.people.children">&nbsp;-</span><span><span translate="people.kids"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.kids}}):</span><span ng-if="otherBed.kidsPrice">{{otherBed.kidsPrice|currency:\'€\'}}</span><span ng-if="!otherBed.kidsPrice" translate="common.free"></span></small></div><div class="no-padding-top no-padding-left text-gray-light text-italic" ng-switch="otherBed.frequency"><small translate="common.price.is.intend"></small><small class="text-lowercase" ng-switch-when="DAILY|NIGHTLY" ng-switch-when-separator="|">&nbsp;<span translate="service.type.payment.NIGHTLY"></span></small><small class="text-lowercase" ng-switch-when="LUMP_SUM">&nbsp;<span translate="service.type.payment.LUMP_SUM"></span></small></div></div></div></md-list-item></md-list></div><div layout="column"><h4 class="md-subhead no-margin-bottom"><strong translate="reservation.guest.info"></strong></h4><div class="md-padding no-padding-left"><div class="md-padding no-padding-left no-padding-top"><span translate="room.people.host"></span></div><ul><li><strong>{{$ctrl.chRoomCtrl.room.guestsCount.standard}}&nbsp;</strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.standard == 1" translate="people.person.beds"></strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.standard != 1" translate="people.people.beds"></strong><span class="text-lowercase">&nbsp;(<span ng-if="$ctrl.chRoomCtrl.room.people.boys || $ctrl.chRoomCtrl.room.people.children || $ctrl.chRoomCtrl.room.people.kids"><span translate="common.choice.between"></span>&nbsp;</span><ch-people-summary class="text-lowercase" people="$ctrl.chRoomCtrl.room.people"></ch-people-summary>)</span></li></ul><ul ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra"><li><strong>{{$ctrl.chRoomCtrl.room.guestsCount.extra}}&nbsp;</strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra == 1" translate="people.person.extra.beds"></strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra != 1" translate="people.people.extra.beds"></strong><span class="text-lowercase">&nbsp;(<span ng-if="$ctrl.chRoomCtrl.room.extraPeople.boys || $ctrl.chRoomCtrl.room.extraPeople.children || $ctrl.chRoomCtrl.room.extraPeople.kids"><span translate="common.choice.between"></span>&nbsp;</span><ch-people-summary class="text-lowercase" people="$ctrl.chRoomCtrl.room.extraPeople"></ch-people-summary>)</span></li></ul><div ng-if="$ctrl.chRoomCtrl.room.people.boys || $ctrl.chRoomCtrl.room.people.children || $ctrl.chRoomCtrl.room.people.kids || $ctrl.chRoomCtrl.room.extraPeople.boys || $ctrl.chRoomCtrl.room.extraPeople.children || $ctrl.chRoomCtrl.room.extraPeople.kids" class="md-padding no-padding-left no-padding-bottom"><em translate="error.room.guest.not.selected"></em></div></div><div><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left no-margin-top text-gray-light"><strong translate="people.adults"></strong></h5><div><i translate="people.adults.policy" translate-value-age="{{::(18)}}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.people.adults}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.boys"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.boys"></strong></h5><div><i translate="people.boys.policy" translate-values="{min: 13, max: 17}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.boys}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.children"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.children"></strong></h5><div><i translate="people.children.policy" translate-values="{min: 3, max: 12}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.children}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.kids"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.kids"></strong></h5><div><i translate="people.kids.policy" translate-values="{min: 0, max: 2}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.kids}}</span></div></div></div><div layout="column" ng-if="::($ctrl.chRoomCtrl.$$includedServices && $ctrl.chRoomCtrl.$$includedServices.length > 0)"><h4 class="md-subhead no-margin-bottom"><strong translate="room.facilities"></strong></h4><div layout layout-wrap><div class="flex-gt-sm-50 flex-100" ng-repeat="service in ::$ctrl.chRoomCtrl.$$includedServices track by service.id" ng-switch="service.type.nameKey"><md-icon class="mdi mdi-check md-18 text-success"></md-icon><span translate="{{::service.type.nameKey}}"></span></div></div></div><div layout="column" ng-if="::($ctrl.chRoomCtrl.$$bookableServices && $ctrl.chRoomCtrl.$$bookableServices.length > 0)"><h4 class="md-subhead no-margin-bottom"><strong translate="common.service.on.demand"></strong></h4><div layout layout-wrap><div class="flex-gt-sm-50 flex-100" ng-repeat="service in ::$ctrl.chRoomCtrl.$$bookableServices track by service.id" ng-switch="service.paymentType"><md-icon class="mdi mdi-check md-18 text-success"></md-icon><span translate="{{::service.type.nameKey}}"></span><span ng-switch-when="FREE">(<span translate="payment.free"></span>)</span><span ng-switch-default class="text-lowercase"><small ng-repeat="paymentOpt in ::service.paymentOptions track by $index"><span ng-if="paymentOpt.size == \'PER_ADULT\' || paymentOpt.size == \'SINGLE\'">(<span>{{paymentOpt.amount.finalAmount|chCurrency}}</span><span ng-if="service.frequency == \'DAILY\'">/<span translate="date.day"></span></span><span ng-if="service.frequency == \'MONTHLY\'">/<span translate="date.month"></span></span><span ng-if="service.frequency == \'YEARLY\'">/<span translate="date.year"></span></span><span ng-if="paymentOpt.size == \'PER_ADULT\'">/<span translate="people.person"></span></span>)</span></small></span></div></div></div><div layout layout-xs="column" layout-padding layout-align="center center" class="no-padding-bottom"><md-button class="row-mini button-mini auto-height text-initial" ng-click="$ctrl.$toggleRates(true)" aria-label="Open room rates"><strong class="text-center text-success" ng-clas="{\'no-padding\': !$ctrl.$mdMedia(\'gt-sm\')}"><span><span translate="reservation.dont.miss.room"></span>.&nbsp;</span><span translate="reservation.book.now.holiday"></span></strong></md-button></div></div><div class="text-center"><md-button class="row-mini button-mini auto-height text-gray-light text-initial" ng-click="$ctrl.$toggleInfo(false)" aria-label="Close room info"><md-icon class="mdi mdi-chevron-up text-gray-light md-18 material-icon"></md-icon><span translate="common.hide"></span></md-button></div></div>');
    $templateCache.put("/tpls/room/room-rate.tpl", '<div ng-switch="$ctrl.rate.type"><md-list-item class="no-padding secondary-button-padding"><div class="md-list-item-text no-padding" layout-xs="column" layout-sm="column" layout-gt-sm="row" layout-padding flex><div flex layout layout-wrap layout-align="center center" ng-class="{\'no-padding-bottom\': !$ctrl.$mdMedia(\'gt-sm\')}"><md-button class="md-fab md-micro hide show-gt-sm" ng-click="$ctrl.$toggleInfo()" aria-label="Show rate info"><md-icon class="mdi md-18 text-white" ng-class="{\'mdi-chevron-down\': !$ctrl.$$showInfo, \'mdi-chevron-up\': $ctrl.$$showInfo}"></md-icon></md-button><div class="clickable flex layout" layout-xs="column" ng-class="::{\'layout-padding\': $ctrl.$mdMedia(\'gt-xs\')}" ng-click="$ctrl.$toggleInfo()" aria-label="Rate info"><div layout="column" layout-align="center center"><div ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" class="layout-align-start-center layout-column row-mini layout-padding"><small class="no-padding" ng-if="$ctrl.$$nights != 1"><span translate="reservation.price.for.nights" translate-values="::{count: $ctrl.$$nights}"></span></small><small class="no-padding" ng-if="$ctrl.$$nights == 1"><span translate="reservation.price.for.one.night"></span></small><small class="no-padding" ng-if="$ctrl.rate.amount.initialAmount > 0 && $ctrl.rate.amount.initialAmount > $ctrl.rate.amount.finalAmount"><span class="text-initial" translate="common.from"></span><i><del>{{$ctrl.rate.amount.initialAmount|chCurrency}}</del></i></small><span class="no-padding md-title" ng-switch-when="STANDARD"><strong>{{$ctrl.rate.amount.finalAmount|chCurrency}}</strong></span><span class="no-padding md-title" ng-switch-when="NOT_REFUNDABLE"><strong>{{$ctrl.rate.amount.finalAmount|chCurrency}}</strong></span></div></div><div layout="column" layout-align="center" class="row-mini g"><div layout layout-align="center center" layout-align-gt-sm="start end"><span ng-switch-when="STANDARD" layout><span ng-if="$ctrl.rate.cancellationPolicy.flexible" class="row-mini text-warn" translate="reservation.rate.flexible"></span><span ng-if="!$ctrl.rate.cancellationPolicy.flexible" class="row-mini text-success" translate="reservation.cancellation.free"></span></span><span ng-switch-when="NOT_REFUNDABLE" class="row-mini text-blue-sea" translate="ratesheet.rate.type.notRefundable.abbr"></span><span><md-icon class="mdi mdi-information-outline md-14 material-icons" ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\t\'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" aria-hidden="true"></md-icon></span></div><div layout layout-align="center center" layout-align-gt-sm="start end" class="text-gray-light"><small ng-switch-when="STANDARD" layout><span ng-if="$ctrl.rate.cancellationPolicy.flexible"><span translate="reservation.rate.flexible.info.label"></span></span><span ng-if="!$ctrl.rate.cancellationPolicy.flexible"><span translate="reservation.rate.free.info.label"></span></span></small><small ng-switch-when="NOT_REFUNDABLE"><span translate="reservation.rate.not.refundable.info.label"></span></small></div><div ng-if="$ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType" class="layout-gt-sm-row layout-wrap" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span ng-switch-when="STANDARD" class="label flex-xs flex-sm label-inline-block text-wrap bg-info"><ch-truncate text="{{$ctrl.$$promotion.name[$ctrl.chRoomCtrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label flex-xs flex-sm label-inline-block text-wrap bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.$$promotion.minStay}}"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label flex-xs flex-sm label-inline-block text-wrap bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label flex-xs flex-sm label-inline-block text-wrap bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label flex-xs flex-sm label-inline-block text-wrap bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label flex-xs flex-sm label-inline-block text-wrap bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span></div><div ng-if="$ctrl.rate.type == \'STANDARD\' && ($ctrl.$$promotion.onArrival || !$ctrl.rate.cancellationPolicy.flexible)" class="md-margin no-margin-left no-margin-top" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span class="label label-sm bg-success"><span translate="reservation.no.advance.payment"></span></span></div></div></div></div><div layout layout-align="end center" ng-class="{\'no-padding-top\': !$ctrl.$mdMedia(\'gt-sm\')}"><div ng-if="!$ctrl.rate.count || $ctrl.rate.count <= 0" class="layout-column flex"><md-button class="border-radius only-border" ng-class="{\'border-warn text-warn\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'border-success text-success\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\'border-blue-sea text-blue-sea\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'NOT_REFUNDABLE\', \'text-gray-medium\': $ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0}" aria-label="Add room" ng-disabled="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" ng-click="$ctrl.$selectRate()"><span translate="common.select"></span></md-button></div><div ng-if="$ctrl.rate.count && $ctrl.rate.count > 0" flex><div class="layout-align-center-center layout-align-gt-sm-end-center layout-row"><small class="text-bold text-gray-light" ng-if="$ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0" translate="room.add.other.one"></small><small class="text-bold text-success text-center" ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t  \t\t\t\t\'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" ng-if="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" translate="room.last.rate.selected"></small></div><div class="layout-align-center-center layout-align-gt-sm-end-center layout-row"><ch-counter ng-model="$ctrl.rate.count" min="0" btn-class="md-icon-button only-border" btn-active-class="{{$ctrl.rate.type == \'STANDARD\' ? $ctrl.rate.cancellationPolicy.flexible ? \'border-warn\' : \'border-success\' : \'border-blue-sea\'}}" icon-active-class="{{$ctrl.rate.type == \'STANDARD\' ? $ctrl.rate.cancellationPolicy.flexible ? \'text-warn\' : \'text-success\' : \'text-blue-sea\'}}" plus-disabled="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" on-plus="$ctrl.$addRate()" on-minus="$ctrl.$removeRate()"></ch-counter></div></div></div></div></md-list-item><div class="layout-row layout-wrap layout-padding-sm text-center"><span ng-if="$ctrl.isBestRate" class="text-success md-subhead"><md-icon class="mdi mdi-check-all text-success animated infinite tada"></md-icon><strong>&nbsp;<span translate="reservation.bestHotelRate.description"></span></strong></span><span ng-if="!$ctrl.isBestRate && $ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType" class="layout-row layout-wrap"><span ng-switch-when="STANDARD|EARLY_BOOKING|MINIMUM_STAY" ng-switch-when-separator="|" class="text-wrap" ng-class="{\'text-info\': $ctrl.$$promotion.promotionType == \'STANDARD\', \'text-primary-light\': $ctrl.$$promotion.promotionType == \'EARLY_BOOKING\',  \'text-success\': $ctrl.$$promotion.promotionType == \'MINIMUM_STAY\'}"><md-icon class="mdi mdi-alarm-check animated infinite tada" ng-class="{\'text-info\': $ctrl.$$promotion.promotionType == \'STANDARD\', \'text-primary-light\': $ctrl.$$promotion.promotionType == \'EARLY_BOOKING\',  \'text-success\': $ctrl.$$promotion.promotionType == \'MINIMUM_STAY\'}"></md-icon><span>&nbsp;<span translate="reservation.promotion.STANDARD.description"></span></span></span><span ng-switch-when="BOOK_TODAY" class="text-wrap text-primary"><md-icon class="mdi mdi-alarm-check text-primary animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.BOOK_TODAY.description"></span></span></span><span ng-switch-when="LAST_MINUTE" class="text-wrap text-blue-sea"><md-icon class="mdi mdi-alarm-check text-blue-sea animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.LAST_MINUTE.description"></span></span></span><span ng-switch-when="LAST_SECOND" class="text-wrap text-warn"><md-icon class="mdi mdi-alarm-check text-warn animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.LAST_SECOND.description"></span></span></span></span><span ng-if="!$ctrl.isBestRate && !$ctrl.$$promotion && $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible" class="text-success"><md-icon class="mdi mdi-heart-pulse text-success animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.rate.free.text.description"></span></span></span><span ng-if="!$ctrl.isBestRate && !$ctrl.$$promotion && $ctrl.rate.type == \'NOT_REFUNDABLE\' && $ctrl.rate.savingAmount.finalAmount" class="text-blue-sea"><md-icon class="mdi mdi-auto-fix text-blue-sea animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.rate.not.refundable.text.description" translate-value-price="{{$ctrl.rate.savingAmount.finalAmount|chCurrency}}"></span></span></span></div><div id="{{\'ch-room-\' + $ctrl.chRoomCtrl.$$index + \'-rates-\' + $ctrl.$$index}}" ng-show="$ctrl.$$showInfo" layout="column" layout-padding ng-class="{\'animated fadeIn\': $ctrl.$$showInfo}" class="text-gray-light text-small"><div><div class="md-margin no-margin-top no-margin-left no-margin-right"><ch-payment-policy-info rate-type="$ctrl.rate.type" cancellation-policy="$ctrl.rate.cancellationPolicy" city="$ctrl.chRoomCtrl.city" offset="$ctrl.chRoomCtrl.offset"></ch-payment-policy-info></div><div layout="column"><span><span ng-if="$ctrl.$$nights == 1" translate="reservation.rates.info.night"></span><span ng-if="$ctrl.$$nights > 1" translate="reservation.rates.info.nights" translate-value-count="{{$ctrl.$$nights}}"></span></span><span ng-if="$ctrl.$$vatTax"><strong><span translate="common.included"></span>:</strong>&nbsp;{{$ctrl.$$vatTax}}%&nbsp;<span translate="billing.vat.tax"></span></span><span ng-if="$ctrl.$$cityTax"><strong><span translate="common.included.not"></span>:</strong>&nbsp;{{$ctrl.$$cityTax|chCurrency}}&nbsp;<span translate="reservation.cityTax.description"></span></span></div><div ng-if="$ctrl.rate.type == \'STANDARD\' && $ctrl.$$promotion.onArrival" class="bg-success text-white layout-margin"><md-icon md-font-set="fas" class="fas fa-h-square md-18 text-white"></md-icon><span translate="reservation.policy.payment.onArrival"></span></div><div ng-if="$ctrl.paymentSettings" layout="column" class="md-padding no-padding-left"><strong><span translate="payment.methods.accepted"></span>:</strong><span ng-if="$ctrl.$$promotion.paymentMethod.length" ng-repeat="paymentMethod in $ctrl.$$promotion.paymentMethod track by $index" ng-switch="paymentMethod.type" class="layout-margin ng-scope layout-wrap layout-row layout-align-start-center"><span ng-switch-when="PAYPAL" ng-if="$ctrl.paymentSettings.paypal" class="no-margin-left"><md-icon class="pf pf-paypal md-18"></md-icon><md-tooltip><span translate="payment.type.PAYPAL"></span></md-tooltip></span><span ng-switch-when="CREDIT_CARD" ng-if="$ctrl.paymentSettings.creditCards.length"><span ng-repeat="type in $ctrl.paymentSettings.creditCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA"></span></md-tooltip></span><span ng-switch-when="MASTERCARD" class="layout-margin no-margin-left"><md-icon class="pf pf-mastercard md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MASTERCARD"></span></md-tooltip></span><span ng-switch-when="AMEX" class="layout-margin no-margin-left"><md-icon class="pf pf-american-express md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.AMEX"></span></md-tooltip></span><span ng-switch-when="BIT_COIN" class="layout-margin no-margin-left"><md-icon class="pf pf-bitcoin md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BIT_COIN"></span></md-tooltip></span><span ng-switch-when="CARTA_SI" class="layout-margin no-margin-left"><md-icon class="pf pf-carta-si md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CARTA_SI"></span></md-tooltip></span><span ng-switch-when="DINERS_CLUB" class="layout-margin no-margin-left"><md-icon class="pf pf-diners md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DINERS_CLUB"></span></md-tooltip></span><span ng-switch-when="DISCOVER" class="layout-margin no-margin-left"><md-icon class="pf pf-discover md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DISCOVER"></span></md-tooltip></span><span ng-switch-when="JCB" class="layout-margin no-margin-left"><md-icon class="pf pf-jcb md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.JCB"></span></md-tooltip></span><span ng-switch-when="UNION_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-unionpay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.UNION_PAY"></span></md-tooltip></span></span></span><span ng-switch-when="OTHER_CARD" ng-if="$ctrl.paymentSettings.otherCards.length"><span ng-repeat="type in $ctrl.paymentSettings.otherCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA_ELECTRON" class="layout-margin no-margin-left"><md-icon class="pf pf-visa-electron md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA_ELECTRON"></span></md-tooltip></span><span ng-switch-when="V_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.V_PAY"></span></md-tooltip></span><span ng-switch-when="MAESTRO" class="layout-margin no-margin-left"><md-icon class="pf pf-maestro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MAESTRO"></span></md-tooltip></span><span ng-switch-when="CIRRUS" class="layout-margin no-margin-left"><md-icon class="pf pf-cirrus md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CIRRUS"></span></md-tooltip></span><span ng-switch-when="POSTEPAY" class="layout-margin no-margin-left"><md-icon class="pf pf-postepay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.POSTEPAY"></span></md-tooltip></span><span ng-switch-when="APPLE_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-apple-pay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.APPLE_PAY"></span></md-tooltip></span><span ng-switch-when="PAGSEGURO" class="layout-margin no-margin-left"><md-icon class="pf pf-pagseguro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.PAGSEGURO"></span></md-tooltip></span><span ng-switch-when="BANCONTACT" class="layout-margin no-margin-left"><md-icon class="pf pf-bancontact-mister-cash md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCONTACT"></span></md-tooltip></span><span ng-switch-when="BANCOMAT" class="layout-margin no-margin-left"><md-icon class="pf pf-card md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCOMAT"></span></md-tooltip></span></span></span></span><span ng-if="!$ctrl.$$promotion.paymentMethod" class="layout-margin ng-scope layout-wrap layout-row layout-align-start-center"><span ng-if="$ctrl.paymentSettings.paypal" class="layout-margin no-margin-left"><md-icon class="pf pf-paypal md-18"></md-icon><md-tooltip><span translate="payment.type.PAYPAL"></span></md-tooltip></span><span ng-if="$ctrl.paymentSettings.creditCards.length" class="no-margin"><span ng-repeat="type in $ctrl.paymentSettings.creditCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA"></span></md-tooltip></span><span ng-switch-when="MASTERCARD" class="layout-margin no-margin-left"><md-icon class="pf pf-mastercard md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MASTERCARD"></span></md-tooltip></span><span ng-switch-when="AMEX" class="layout-margin no-margin-left"><md-icon class="pf pf-american-express md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.AMEX"></span></md-tooltip></span><span ng-switch-when="BIT_COIN" class="layout-margin no-margin-left"><md-icon class="pf pf-bitcoin md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BIT_COIN"></span></md-tooltip></span><span ng-switch-when="CARTA_SI" class="layout-margin no-margin-left"><md-icon class="pf pf-carta-si md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CARTA_SI"></span></md-tooltip></span><span ng-switch-when="DINERS_CLUB" class="layout-margin no-margin-left"><md-icon class="pf pf-diners md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DINERS_CLUB"></span></md-tooltip></span><span ng-switch-when="DISCOVER" class="layout-margin no-margin-left"><md-icon class="pf pf-discover md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DISCOVER"></span></md-tooltip></span><span ng-switch-when="JCB" class="layout-margin no-margin-left"><md-icon class="pf pf-jcb md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.JCB"></span></md-tooltip></span><span ng-switch-when="UNION_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-unionpay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.UNION_PAY"></span></md-tooltip></span></span></span><span ng-if="$ctrl.paymentSettings.otherCards.length" class="no-margin"><span ng-repeat="type in $ctrl.paymentSettings.otherCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA_ELECTRON" class="layout-margin no-margin-left"><md-icon class="pf pf-visa-electron md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA_ELECTRON"></span></md-tooltip></span><span ng-switch-when="V_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.V_PAY"></span></md-tooltip></span><span ng-switch-when="MAESTRO" class="layout-margin no-margin-left"><md-icon class="pf pf-maestro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MAESTRO"></span></md-tooltip></span><span ng-switch-when="CIRRUS" class="layout-margin no-margin-left"><md-icon class="pf pf-cirrus md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CIRRUS"></span></md-tooltip></span><span ng-switch-when="POSTEPAY" class="layout-margin no-margin-left"><md-icon class="pf pf-postepay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.POSTEPAY"></span></md-tooltip></span><span ng-switch-when="APPLE_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-apple-pay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.APPLE_PAY"></span></md-tooltip></span><span ng-switch-when="PAGSEGURO" class="layout-margin no-margin-left"><md-icon class="pf pf-pagseguro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.PAGSEGURO"></span></md-tooltip></span><span ng-switch-when="BANCONTACT" class="layout-margin no-margin-left"><md-icon class="pf pf-bancontact-mister-cash md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCONTACT"></span></md-tooltip></span><span ng-switch-when="BANCOMAT" class="layout-margin no-margin-left"><md-icon class="pf pf-card md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCOMAT"></span></md-tooltip></span></span></span></span></div></div><div><h4 class="md-body-1 no-margin-bottom no-margin-top"><strong translate="reservation.rates.daily.details"></strong></h4><div layout layout-wrap layout-padding-sm><div ng-repeat="dailyRate in $ctrl.rate.dailyRates track by $index" layout="column" layout-padding-sm layout-align="start center"><strong class="no-padding-bottom">{{dailyRate.date|date:"shortDate"}}</strong><div class="no-padding-bottom row-mini" layout="column" layout-align="center center"><div ng-if="dailyRate.promotion" ng-switch="dailyRate.promotion.promotionType"><span ng-switch-when="STANDARD" class="label label-xs bg-info"><ch-truncate text="{{dailyRate.promotion.name[$ctrl.chRoomCtrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{promotion.minStay}}"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label label-xs bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label label-xs bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label label-xs bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span></div><small class="text-gray-light" ng-if="dailyRate.amount.initialAmount > 0 && dailyRate.amount.initialAmount > dailyRate.amount.finalAmount"><i><del>{{dailyRate.amount.initialAmount|chCurrency}}</del></i></small></div><div class="no-padding-top">{{dailyRate.amount.finalAmount|chCurrency}}</div></div></div></div><div class="no-padding"><div class="md-margin no-margin-top no-margin-left no-margin-right"><ch-cancellation-policy-info rate-type="$ctrl.rate.type" cancellation-policy="$ctrl.rate.cancellationPolicy" city="$ctrl.chRoomCtrl.city" offset="$ctrl.chRoomCtrl.offset" title="{{$ctrl.rate.cancellationPolicy.cancellation.deposit ? (\'reservation.deposit.conditions\'|translate) : null}}"></ch-cancellation-policy-info><ch-no-show-policy-info ng-if="$ctrl.rate.cancellationPolicy && !$ctrl.rate.cancellationPolicy.cancellation.deposit" no-show-policy="$ctrl.rate.noShowPolicy"></ch-no-show-policy-info></div></div><md-button class="text-gray-light auto-height row-mini" ng-click="$ctrl.$toggleInfo(false)" aria-label="Hide info"><md-icon class="mdi mdi-chevron-up text-gray-light md-18"></md-icon><small translate="common.hide"></small></md-button></div><md-divider ng-if="!$last"></md-divider></div>');
    $templateCache.put("/tpls/service-sold-edit/service-sold-edit.tpl", '<div><ng-form name="serviceSoldEditForm"><div layout="column" layout-padding-sm><div flex layout layout-padding-sm layout-align="start center" class="no-padding"><div class="no-padding" ng-if="$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]"><md-icon class="material-icons {{$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]}} md-30 circle-icon bg-gray-lighter text-gray-light"></md-icon></div><div ng-if="!$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]"><md-icon class="mdi mdi-check md-30 circle-icon bg-gray-lighter text-gray-light"></md-icon></div><div flex layout layout-wrap layout-align="start center" layout-padding-sm><div flex><strong><span translate="{{$ctrl.serviceSold.service.type.nameKey}}"></span></strong></div><div layout="column" layout-align="center center" class="text-center"><strong ng-if="$ctrl.serviceSold.amount" class="md-headline" ng-class="{\'text-striked\': $ctrl.serviceSold.$$removed}"><span ng-if="$ctrl.serviceSold.amount.finalAmount > 0">{{$ctrl.serviceSold.amount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.serviceSold.amount.finalAmount == 0 && $ctrl.serviceSold.service.paymentType != \'PER_PERSON\'" translate="common.free"></span></strong><small class="text-gray-light no-padding-bottom"><span ng-if="$ctrl.nights > 1" translate="reservation.price.for.nights" translate-values="{count: $ctrl.nights}"></span><span ng-if="$ctrl.nights == 1" translate="reservation.price.for.one.night"></span></small></div></div></div><div ng-if="$ctrl.serviceSold.service.description[$ctrl.Lang.current.iso]"><p class="text-gray-light no-margin-bottom"><span>{{$ctrl.serviceSold.service.description[$ctrl.Lang.current.iso]}}</span></p></div><div class="md-padding no-padding-bottom no-padding-left no-padding-right text-small"><div><span><span translate="common.price.details"></span>:</span></div><div ng-switch="$ctrl.serviceSold.service.paymentType"><div ng-switch-when="FREE"><span class="text-success" translate="common.free"></span></div><div ng-switch-when="SINGLE" class="text-gray-light"><span ng-if="$ctrl.$$priceDetails.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.amount.finalAmount|chCurrency}}</span></span><span ng-if="$ctrl.$$priceDetails.amount.finalAmount <= 0" translate="service.type.payment.free"></span><div class="text-italic text-gray-light text-lowercase" ng-switch="$ctrl.serviceSold.service.frequency"><span class="text-initial" translate="common.price.is.intend"></span><span ng-switch-when="DAILY">&nbsp;<span translate="date.frequency.daily"></span></span><span ng-switch-when="MONTHLY">&nbsp;<span translate="date.frequency.monthly"></span></span><span ng-switch-when="YEARLY">&nbsp;<span translate="date.frequency.yearly"></span></span><span ng-switch-when="LUMP_SUM">&nbsp;<span translate="common.entire.stay"></span></span></div></div><div ng-switch-when="PER_PERSON" class="text-gray-light text-lowercase"><div><span ng-if="$ctrl.$$priceDetails.adults.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.adults.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.adult.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.adults.amount.finalAmount"><span class="text-lowercase"><span translate="people.adults"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.boys.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.boys.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.boy.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.boys.amount.finalAmount"><span class="text-lowercase"><span translate="people.boys"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.children.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.children.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.child.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.children.amount.finalAmount"><span class="text-lowercase"><span translate="people.children"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.kids.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.kids.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.kid.per"></span></span><span ng-if="!$ctrl.$$priceDetails.kids.amount.finalAmount"><span class="text-lowercase"><span translate="people.kids"></span>&nbsp;</span><span translate="service.type.payment.free"></span></span></div><div class="text-italic text-gray-light text-lowercase" ng-switch="$ctrl.serviceSold.service.frequency"><span class="text-initial" translate="common.price.is.intend"></span>&nbsp;<span translate="service.type.payment.person"></span><span ng-switch-when="DAILY">&nbsp;<span translate="date.frequency.daily"></span></span><span ng-switch-when="MONTHLY">&nbsp;<span translate="date.frequency.monthly"></span></span><span ng-switch-when="YEARLY">&nbsp;<span translate="date.frequency.yearly"></span></span><span ng-switch-when="LUMP_SUM">&nbsp;<span translate="common.entire.stay"></span></span></div></div></div></div></div><div><div ng-if="$ctrl.serviceSold.service.paymentType == \'PER_PERSON\'"><div class="layout-margin no-margin-left"><em class="md-body-2 text-bold no-margin-left" translate="service.people.question"></em><div class="no-margin text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon><small translate="service.price.varies.to.people"></small></div></div><div><ch-people-counters name="people" ng-model="$ctrl.serviceSold.people" min="1" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-show="serviceSoldEditForm.people.$dirty" ng-messages="serviceSoldEditForm.people.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.service.no.people"></span></div></div></div><div ng-if="$ctrl.serviceSold.service.maxCount > 1 || $ctrl.serviceSold.service.maxCount == -1"><ch-counter flexible="true" count-class="bg-white only-border" field-name="count" label="{{\'common.book\'|translate}}" label-direction="left" ng-model="$ctrl.serviceSold.count" max="$ctrl.serviceSold.service.maxCount" min="1"></ch-counter><div ng-show="serviceSoldEditForm.count.$dirty" ng-messages="serviceSoldEditForm.count.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.service.min" translate-value-count="1"></span></div><div ng-message="max"><span translate="error.service.max" translate-value-count="{{$ctrl.serviceSold.service.maxCount}}"></span></div></div></div></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel service edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="serviceSoldEditForm.$invalid" aria-label="Confirm service edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/simple-stepper/simple-step.tpl", '<div class="ch-simple-step" ng-class="{\'ch-active\': $ctrl.$active }"><ch-simple-stepper-header class="ch-simple-stepper-header ch-simple-stepper-vertical"><md-button class="ch-simple-stepper-indicator" ng-class="{\n' + "\t        'ch-active': $ctrl.$$stepNumber === $ctrl.chStepperCtrl.$$currentStep.index,\n" + "\t        'ch-completed': $ctrl.$completed,\n" + "\t        'ch-error': $ctrl.hasError,\n" + "\t        'ch-simple-stepper-optional': $ctrl.optional || $ctrl.hasError\n" + '        \t}" ng-click="$ctrl.chStepperCtrl.goto($ctrl.$$stepNumber)" ng-disabled="($ctrl.chStepperCtrl.linear && ($ctrl.$$stepNumber > $ctrl.chStepperCtrl.$$currentStep.index || !$ctrl.chStepperCtrl.previousStepClick)) || $ctrl.ngDisabled" aria-label="Go to step"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-number" ng-hide="$ctrl.hasError"><span ng-if="!$ctrl.$completed"><span ng-if="!$ctrl.iconClass" ng-bind="$ctrl.$$stepNumber+1"></span><span ng-if="$ctrl.iconClass"><md-icon class="{{$ctrl.iconClass}}"></md-icon></span></span><span ng-if="$ctrl.$completed"><md-icon class="ch-simple-stepper-icon material-icons mdi" ng-class="$ctrl.iconCompletedClass ? $ctrl.iconCompletedClass : \'mdi-check md-18\'"></md-icon></span></div><div class="ch-simple-stepper-error-indicator" ng-show="$ctrl.hasError"><md-icon class="steppers-warning mdi mdi-alert md-24"></md-icon></div><div class="ch-simple-stepper-title"><div><span ng-show="!$ctrl.$completed || !$ctrl.completedLabel" ng-bind-html="$ctrl.label"></span><span ng-if="$ctrl.completedLabel" ng-show="$ctrl.$completed" ng-bind-html="$ctrl.completedLabel"></span><small ng-if="$ctrl.optional" ng-show="!$ctrl.hasError">&nbsp;(<span ng-bind-html="$ctrl.optionalLabel"></span>)</small></div><div class="ch-simple-stepper-subtitle"><span ng-if="$ctrl.subtitle" ng-show="!$ctrl.$completed || !$ctrl.completedSubtitle" ng-bind-html="$ctrl.subtitle"></span><span ng-if="$ctrl.completedSubtitle" ng-show="$ctrl.$completed" ng-bind-html="$ctrl.completedSubtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$ctrl.hasError" ng-bind-html="$ctrl.message"></small></div></div></md-button><div class="ch-simple-stepper-feedback-message" ng-show="$ctrl.chStepperCtrl.hasFeedback"><span ng-bind-html="$ctrl.chStepperCtrl.feedbackMessage"></span></div></ch-simple-stepper-header><ch-simple-stepper-scope layout="column" class="ch-simple-stepper-scope" ng-if="$ctrl.$active" ng-transclude></ch-simple-stepper-scope></div>');
    $templateCache.put("/tpls/simple-stepper/simple-stepper.tpl", '<div flex class="ch-simple-stepper" ng-class="{ \n' + "    'ch-simple-stepper-linear': $ctrl.linear, \n" + "    'ch-simple-stepper-alternative': $ctrl.alternative,\n" + "    'ch-simple-stepper-vertical': $ctrl.vertical,\n" + "    'ch-simple-stepper-mobile-step-text': $ctrl.mobileMode,\n" + "    'ch-simple-stepper-has-feedback': $ctrl.hasFeedback\n" + '    }"><div class="ch-simple-stepper-header-region"><ch-simple-stepper-header class="ch-simple-stepper-header ch-simple-stepper-horizontal ch-whiteframe-1dp"><md-button class="ch-simple-stepper-indicator" ng-repeat="($stepNumber, $step) in $ctrl.$$steps track by $index" ng-class="{\n' + "                'ch-active': $stepNumber === $ctrl.$$currentStep.index,\n" + "                'ch-completed': $step.$completed,\n" + "                'ch-error': $step.hasError,\n" + "                'ch-simple-stepper-optional': $step.optional || $step.hasError\n" + '            \t}" ng-click="$ctrl.goto($stepNumber)" ng-disabled="($ctrl.linear && ($stepNumber > $ctrl.$$currentStep.index || !$ctrl.previousStepClick)) || $step.ngDisabled" aria-label="Go to step"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-number" ng-hide="$step.hasError"><span ng-if="!$step.$completed"><span ng-if="!$step.iconClass" ng-bind="$stepNumber+1"></span><span ng-if="$step.iconClass"><md-icon class="{{$step.iconClass}}"></md-icon></span></span><span ng-if="$step.$completed"><md-icon class="ch-simple-stepper-icon material-icons mdi" ng-class="$step.iconCompletedClass ? $step.iconCompletedClass : \'mdi-check md-18\'"></md-icon></span></div><div class="ch-simple-stepper-error-indicator" ng-show="$step.hasError"><md-icon class="steppers-warning mdi mdi-alert md-24"></md-icon></div><div class="ch-simple-stepper-title"><div><span ng-show="!$step.$completed || !$step.completedLabel" ng-bind-html="$step.label"></span><span ng-if="$step.completedLabel" ng-show="$step.$completed" ng-bind-html="$step.completedLabel"></span><small ng-if="$step.optional" ng-show="!$step.hasError">&nbsp;(<span ng-bind-html="$step.optionalLabel"></span>)</small></div><div class="ch-simple-stepper-subtitle"><span ng-if="$step.subtitle" ng-show="!$step.$completed || !$step.completedSubtitle" ng-bind-html="$step.subtitle"></span><span ng-if="$step.completedSubtitle" ng-show="$step.$completed" ng-bind-html="$step.completedSubtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$step.hasError" ng-bind-html="$step.message"></small></div></div></md-button></ch-simple-stepper-header><ch-simple-stepper-mobile-header class="ch-simple-stepper-mobile-header"><md-toolbar flex="none" class="ch-whiteframe-1dp" style="background: #f6f6f6 !important; color: #202020 !important"><div class="md-toolbar-tools ch-simple-stepper-indicator" ng-class="{\n' + "                \t'ch-error': $ctrl.$$currentStep.hasError,\n" + '                \t\'ch-simple-stepper-optional\': $ctrl.$$currentStep.optional || $ctrl.$$currentStep.hasError}"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-error-indicator" ng-show="$ctrl.$$currentStep.hasError"><md-icon class="steppers-warning mdi mdi-alert md-18"></md-icon></div><div class="ch-simple-stepper-title"><div><span class="ch-simple-stepper-step-counter-label"><span ng-bind-html="$ctrl.labelStep"></span>&nbsp;<span ng-bind-html="$ctrl.$$currentStep.index+1"></span>&nbsp;<span ng-bind-html="$ctrl.labelOf"></span>&nbsp;<span ng-bind-html="$ctrl.$$steps.length"></span>:&nbsp;</span><span><span ng-bind-html="$ctrl.$$currentStep.label"></span><small ng-if="$ctrl.$$currentStep.optional" ng-show="!$ctrl.$$currentStep.hasError">&nbsp;(<span ng-bind-html="$ctrl.$$currentStep.optionalLabel"></span>)</small></span></div><div class="ch-simple-stepper-subtitle"><span ng-if="$ctrl.$$currentStep.subtitle" ng-bind-html="$ctrl.$$currentStep.subtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$ctrl.$$currentStep.hasError" ng-bind-html="$ctrl.$$currentStep.message"></small></div></div></div></md-toolbar></ch-simple-stepper-mobile-header><div class="ch-simple-stepper-feedback-message" ng-show="$ctrl.hasFeedback"><span ng-bind-html="$ctrl.feedbackMessage"></span></div></div><ch-simple-stepper-content class="ch-simple-stepper-content" ng-transclude></ch-simple-stepper-content><div class="ch-simple-stepper-overlay"></div></div>');
    $templateCache.put("/tpls/value-input/value-input.tpl", '<ng-form name="chValueForm"><div layout layout-padding class="no-padding"><div ng-if="!$ctrl.$$manualCount"><md-input-container md-no-float><md-select name="count" ng-model="$ctrl.ngModel.count" ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.readonly" ng-change="$ctrl.$update()" aria-label="Value count"><md-option ng-repeat="count in $ctrl.$$counts track by $index" ng-value="count.value" ng-disabled="count.disabled" ng-selected="$ctrl.$$counts.length == 1 || $ctrl.ngModel.count == count.value || (!$ctrl.ngModel.count && $first)"><span ng-bind="count.value"></span></md-option><md-option ng-click="$ctrl.$toggleManualCount()" aria-label="Open manual count input"><span translate-once="common.other"></span></md-option></md-select><div ng-messages="chValueForm.count.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div><div ng-if="$ctrl.$$manualCount"><md-input-container md-no-float class="md-icon-right"><input type="number" name="count" placeholder="{{\'common.value\'|translate}}" ng-model="$ctrl.ngModel.count" ng-min="$ctrl.ngMin" ng-step="$ctrl.ngStep" ng-max="$ctrl.ngMax" ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.ngReadonly" ng-change="$ctrl.$update()"><md-icon class="mdi mdi-close md-24 clickable" ng-click="$ctrl.$toggleManualCount()" aria-label="Close manual count input"><md-tooltip><span translate-once="common.cancel"></span></md-tooltip></md-icon><div ng-messages="chValueForm.count.$error"><div ng-message="required"><span translate-once="error.required"></span></div><div ng-message="min"><span translate="error.field.min" translate-value-num="{{$ctrl.ngMin}}"></span></div><div ng-message="max"><span translate="error.field.min" translate-value-num="{{$ctrl.ngMax}}"></span></div><div ng-message="step"><span translate-once="error.filed.invalid"></span></div></div></md-input-container></div><div ng-if="!$ctrl.hideUnit"><md-input-container md-no-float><md-select name="unit" ng-model="$ctrl.ngModel.unit" ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.readonly" ng-change="$ctrl.$update()" aria-label="Value unit"><md-option ng-repeat="unit in $ctrl.$$units track by $index" ng-value="unit.value" ng-disabled="unit.disabled" ng-selected="$ctrl.$$units.length == 1 || $ctrl.ngModel.unit == unit.value || (!$ctrl.ngModel.unit && $first)"><span ng-switch="unit.value"><span ng-switch-when="NUMBERS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="common.unit"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="common.units"></span></span><span ng-switch-when="HOURS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="date.hour"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="date.hours"></span></span><span ng-switch-when="DAYS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="date.day"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="date.days"></span></span><span ng-switch-when="NIGHTS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="common.night"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="common.nights"></span></span><span ng-switch-when="WEEKS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="date.week"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="date.weeks"></span></span><span ng-switch-when="MONTHS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="date.month"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="date.months"></span></span><span ng-switch-when="YEARS"><span ng-show="$ctrl.ngModel.count == 1" translate-once="date.year"></span><span ng-show="$ctrl.ngModel.count != 1" translate-once="date.years"></span></span></span></md-option></md-select><div ng-messages="chValueForm.unit.$error"><div ng-message="required"><span translate-once="error.required"></span></div></div></md-input-container></div></div></ng-form>');
    $templateCache.put("/tpls/value/value.tpl", '<span ng-switch="$ctrl.value.unit" class="text-lowercase"><span ng-bind="$ctrl.value.count"></span>&nbsp;<span ng-switch-when="NUMBERS"><span ng-show="$ctrl.value.count == 1" translate="common.unit"></span><span ng-show="$ctrl.value.count != 1" translate="common.units"></span></span><span ng-switch-when="HOURS"><span ng-show="$ctrl.value.count == 1" translate="date.hour"></span><span ng-show="$ctrl.value.count != 1" translate="date.hours"></span></span><span ng-switch-when="DAYS"><span ng-show="$ctrl.value.count == 1" translate="date.day"></span><span ng-show="$ctrl.value.count != 1" translate="date.days"></span></span><span ng-switch-when="NIGHTS"><span ng-show="$ctrl.value.count == 1" translate="common.night"></span><span ng-show="$ctrl.value.count != 1" translate="common.nights"></span></span><span ng-switch-when="WEEKS"><span ng-show="$ctrl.value.count == 1" translate="date.week"></span><span ng-show="$ctrl.value.count != 1" translate="date.weeks"></span></span><span ng-switch-when="MONTHS"><span ng-show="$ctrl.value.count == 1" translate="date.month"></span><span ng-show="$ctrl.value.count != 1" translate="date.months"></span></span><span ng-switch-when="YEARS"><span ng-show="$ctrl.value.count == 1" translate="date.year"></span><span ng-show="$ctrl.value.count != 1" translate="date.years"></span></span></span>');
    $templateCache.put("/tpls/wizard/wizard-step-done.tpl", '<div ng-if="!$ctrl.$$step.$active" flex class="md-padding" ng-class="{\'animated fadeInUp\': $ctrl.chWizardStepsDoneContentCtrl.chWizardCtrl.direction == \'vertical\' && !$ctrl.$$step.$stopAnimation, \n' + '\t\t\'animated fadeInRight\': $ctrl.chWizardStepsDoneContentCtrl.chWizardCtrl.direction == \'horizontal\' && !$ctrl.$$step.$stopAnimation}"><div ng-transclude></div><div flex layout layout-padding-sm layout-align="start center"><div flex layout layout-align="start center"><md-button class="md-primary" ng-click="$ctrl.$edit()" aria-label="Edit step"><md-icon class="mdi mdi-pencil md-24"></md-icon>&nbsp;<span translate="common.edit"></span></md-button></div></div></div>');
    $templateCache.put("/tpls/wizard/wizard-step.tpl", '<div ng-if="$ctrl.$$step.$active" flex class="md-padding" ng-class="{\'animated fadeInUp\': $ctrl.chWizardCtrl.direction == \'vertical\' && !$ctrl.$$step.$stopAnimation, \n' + "\t\t'animated fadeInRight': $ctrl.chWizardCtrl.direction == 'horizontal' && !$ctrl.$$step.$stopAnimation}\" ng-transclude></div>");
    $templateCache.put("/tpls/wizard/wizard-steps-done-content.tpl", '<div ng-if="$ctrl.$$doneSteps"><ch-wizard-steps-done-container ng-transclude></ch-wizard-steps-done-container></div>');
    $templateCache.put("/tpls/wizard/wizard.tpl", '<div><div><ng-form name="chFormWizardForm"><ch-wizard-steps-container ng-transclude></ch-wizard-steps-container><div flex layout layout-padding-sm layout-align="start center"><div flex layout layout-align="start center"><md-button ng-if="!$ctrl.$$currentStep.$first" ng-click="$ctrl.$back()" aria-label="Go back"><span translate="common.back"></span></md-button></div><div flex layout layout-align="end center" ng-if="!$ctrl.$$currentStep.$last"><md-button class="md-raised md-primary" ng-click="$ctrl.$forward()" aria-label="Go forward"><span translate="common.forward"></span></md-button></div><div flex layout layout-align="end center" ng-if="$ctrl.$$currentStep.$last"><md-button class="md-raised md-primary" ng-click="$ctrl.$confirm()" aria-label="Confirm"><span translate="common.confirm"></span></md-button></div></div></ng-form></div></div>');
} ]);