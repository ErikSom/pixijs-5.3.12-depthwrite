/*!
 * @pixi/utils - v5.3.12
 * Compiled Wed, 02 Aug 2023 14:32:51 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
this.PIXI.utils = this.PIXI.utils || {};
var _pixi_utils = (function (exports, settings, constants) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var eventemitter3 = createCommonjsModule(function (module) {
	'use strict';

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) { prefix = false; }
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) { emitter._events[evt] = listener, emitter._eventsCount++; }
	  else if (!emitter._events[evt].fn) { emitter._events[evt].push(listener); }
	  else { emitter._events[evt] = [emitter._events[evt], listener]; }

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) { emitter._events = new Events(); }
	  else { delete emitter._events[evt]; }
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) { return names; }

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) { names.push(prefix ? name.slice(1) : name); }
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) { return []; }
	  if (handlers.fn) { return [handlers.fn]; }

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) { return 0; }
	  if (listeners.fn) { return 1; }
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var arguments$1 = arguments;

	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) { return false; }

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) { this.removeListener(event, listeners.fn, undefined, true); }

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments$1[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) { this.removeListener(event, listeners[i].fn, undefined, true); }

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) { for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments$1[j];
	          } }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) { return this; }
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) { this._events[evt] = events.length === 1 ? events[0] : events; }
	    else { clearEvent(this, evt); }
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) { clearEvent(this, evt); }
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	if ('undefined' !== 'object') {
	  module.exports = EventEmitter;
	}
	});

	'use strict';

	var earcut_1 = earcut;
	var default_1 = earcut;

	function earcut(data, holeIndices, dim) {

	    dim = dim || 2;

	    var hasHoles = holeIndices && holeIndices.length,
	        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
	        outerNode = linkedList(data, 0, outerLen, dim, true),
	        triangles = [];

	    if (!outerNode || outerNode.next === outerNode.prev) { return triangles; }

	    var minX, minY, maxX, maxY, x, y, invSize;

	    if (hasHoles) { outerNode = eliminateHoles(data, holeIndices, outerNode, dim); }

	    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
	    if (data.length > 80 * dim) {
	        minX = maxX = data[0];
	        minY = maxY = data[1];

	        for (var i = dim; i < outerLen; i += dim) {
	            x = data[i];
	            y = data[i + 1];
	            if (x < minX) { minX = x; }
	            if (y < minY) { minY = y; }
	            if (x > maxX) { maxX = x; }
	            if (y > maxY) { maxY = y; }
	        }

	        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
	        invSize = Math.max(maxX - minX, maxY - minY);
	        invSize = invSize !== 0 ? 32767 / invSize : 0;
	    }

	    earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);

	    return triangles;
	}

	// create a circular doubly linked list from polygon points in the specified winding order
	function linkedList(data, start, end, dim, clockwise) {
	    var i, last;

	    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
	        for (i = start; i < end; i += dim) { last = insertNode(i, data[i], data[i + 1], last); }
	    } else {
	        for (i = end - dim; i >= start; i -= dim) { last = insertNode(i, data[i], data[i + 1], last); }
	    }

	    if (last && equals(last, last.next)) {
	        removeNode(last);
	        last = last.next;
	    }

	    return last;
	}

	// eliminate colinear or duplicate points
	function filterPoints(start, end) {
	    if (!start) { return start; }
	    if (!end) { end = start; }

	    var p = start,
	        again;
	    do {
	        again = false;

	        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
	            removeNode(p);
	            p = end = p.prev;
	            if (p === p.next) { break; }
	            again = true;

	        } else {
	            p = p.next;
	        }
	    } while (again || p !== end);

	    return end;
	}

	// main ear slicing loop which triangulates a polygon (given as a linked list)
	function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
	    if (!ear) { return; }

	    // interlink polygon nodes in z-order
	    if (!pass && invSize) { indexCurve(ear, minX, minY, invSize); }

	    var stop = ear,
	        prev, next;

	    // iterate through ears, slicing them one by one
	    while (ear.prev !== ear.next) {
	        prev = ear.prev;
	        next = ear.next;

	        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
	            // cut off the triangle
	            triangles.push(prev.i / dim | 0);
	            triangles.push(ear.i / dim | 0);
	            triangles.push(next.i / dim | 0);

	            removeNode(ear);

	            // skipping the next vertex leads to less sliver triangles
	            ear = next.next;
	            stop = next.next;

	            continue;
	        }

	        ear = next;

	        // if we looped through the whole remaining polygon and can't find any more ears
	        if (ear === stop) {
	            // try filtering points and slicing again
	            if (!pass) {
	                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

	            // if this didn't work, try curing all small self-intersections locally
	            } else if (pass === 1) {
	                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
	                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

	            // as a last resort, try splitting the remaining polygon into two
	            } else if (pass === 2) {
	                splitEarcut(ear, triangles, dim, minX, minY, invSize);
	            }

	            break;
	        }
	    }
	}

	// check whether a polygon node forms a valid ear with adjacent nodes
	function isEar(ear) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;

	    if (area(a, b, c) >= 0) { return false; } // reflex, can't be an ear

	    // now make sure we don't have other points inside the potential ear
	    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

	    // triangle bbox; min & max are calculated like this for speed
	    var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
	        y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
	        x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
	        y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

	    var p = c.next;
	    while (p !== a) {
	        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 &&
	            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) { return false; }
	        p = p.next;
	    }

	    return true;
	}

	function isEarHashed(ear, minX, minY, invSize) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;

	    if (area(a, b, c) >= 0) { return false; } // reflex, can't be an ear

	    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

	    // triangle bbox; min & max are calculated like this for speed
	    var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
	        y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
	        x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
	        y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

	    // z-order range for the current triangle bbox;
	    var minZ = zOrder(x0, y0, minX, minY, invSize),
	        maxZ = zOrder(x1, y1, minX, minY, invSize);

	    var p = ear.prevZ,
	        n = ear.nextZ;

	    // look for points inside the triangle in both directions
	    while (p && p.z >= minZ && n && n.z <= maxZ) {
	        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
	            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) { return false; }
	        p = p.prevZ;

	        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
	            pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) { return false; }
	        n = n.nextZ;
	    }

	    // look for remaining points in decreasing z-order
	    while (p && p.z >= minZ) {
	        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
	            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) { return false; }
	        p = p.prevZ;
	    }

	    // look for remaining points in increasing z-order
	    while (n && n.z <= maxZ) {
	        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
	            pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) { return false; }
	        n = n.nextZ;
	    }

	    return true;
	}

	// go through all polygon nodes and cure small local self-intersections
	function cureLocalIntersections(start, triangles, dim) {
	    var p = start;
	    do {
	        var a = p.prev,
	            b = p.next.next;

	        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

	            triangles.push(a.i / dim | 0);
	            triangles.push(p.i / dim | 0);
	            triangles.push(b.i / dim | 0);

	            // remove two nodes involved
	            removeNode(p);
	            removeNode(p.next);

	            p = start = b;
	        }
	        p = p.next;
	    } while (p !== start);

	    return filterPoints(p);
	}

	// try splitting polygon into two and triangulate them independently
	function splitEarcut(start, triangles, dim, minX, minY, invSize) {
	    // look for a valid diagonal that divides the polygon into two
	    var a = start;
	    do {
	        var b = a.next.next;
	        while (b !== a.prev) {
	            if (a.i !== b.i && isValidDiagonal(a, b)) {
	                // split the polygon in two by the diagonal
	                var c = splitPolygon(a, b);

	                // filter colinear points around the cuts
	                a = filterPoints(a, a.next);
	                c = filterPoints(c, c.next);

	                // run earcut on each half
	                earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
	                earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
	                return;
	            }
	            b = b.next;
	        }
	        a = a.next;
	    } while (a !== start);
	}

	// link every hole into the outer loop, producing a single-ring polygon without holes
	function eliminateHoles(data, holeIndices, outerNode, dim) {
	    var queue = [],
	        i, len, start, end, list;

	    for (i = 0, len = holeIndices.length; i < len; i++) {
	        start = holeIndices[i] * dim;
	        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	        list = linkedList(data, start, end, dim, false);
	        if (list === list.next) { list.steiner = true; }
	        queue.push(getLeftmost(list));
	    }

	    queue.sort(compareX);

	    // process holes from left to right
	    for (i = 0; i < queue.length; i++) {
	        outerNode = eliminateHole(queue[i], outerNode);
	    }

	    return outerNode;
	}

	function compareX(a, b) {
	    return a.x - b.x;
	}

	// find a bridge between vertices that connects hole with an outer ring and and link it
	function eliminateHole(hole, outerNode) {
	    var bridge = findHoleBridge(hole, outerNode);
	    if (!bridge) {
	        return outerNode;
	    }

	    var bridgeReverse = splitPolygon(bridge, hole);

	    // filter collinear points around the cuts
	    filterPoints(bridgeReverse, bridgeReverse.next);
	    return filterPoints(bridge, bridge.next);
	}

	// David Eberly's algorithm for finding a bridge between hole and outer polygon
	function findHoleBridge(hole, outerNode) {
	    var p = outerNode,
	        hx = hole.x,
	        hy = hole.y,
	        qx = -Infinity,
	        m;

	    // find a segment intersected by a ray from the hole's leftmost point to the left;
	    // segment's endpoint with lesser x will be potential connection point
	    do {
	        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
	            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
	            if (x <= hx && x > qx) {
	                qx = x;
	                m = p.x < p.next.x ? p : p.next;
	                if (x === hx) { return m; } // hole touches outer segment; pick leftmost endpoint
	            }
	        }
	        p = p.next;
	    } while (p !== outerNode);

	    if (!m) { return null; }

	    // look for points inside the triangle of hole point, segment intersection and endpoint;
	    // if there are no points found, we have a valid connection;
	    // otherwise choose the point of the minimum angle with the ray as connection point

	    var stop = m,
	        mx = m.x,
	        my = m.y,
	        tanMin = Infinity,
	        tan;

	    p = m;

	    do {
	        if (hx >= p.x && p.x >= mx && hx !== p.x &&
	                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

	            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

	            if (locallyInside(p, hole) &&
	                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
	                m = p;
	                tanMin = tan;
	            }
	        }

	        p = p.next;
	    } while (p !== stop);

	    return m;
	}

	// whether sector in vertex m contains sector in vertex p in the same coordinates
	function sectorContainsSector(m, p) {
	    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
	}

	// interlink polygon nodes in z-order
	function indexCurve(start, minX, minY, invSize) {
	    var p = start;
	    do {
	        if (p.z === 0) { p.z = zOrder(p.x, p.y, minX, minY, invSize); }
	        p.prevZ = p.prev;
	        p.nextZ = p.next;
	        p = p.next;
	    } while (p !== start);

	    p.prevZ.nextZ = null;
	    p.prevZ = null;

	    sortLinked(p);
	}

	// Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
	function sortLinked(list) {
	    var i, p, q, e, tail, numMerges, pSize, qSize,
	        inSize = 1;

	    do {
	        p = list;
	        list = null;
	        tail = null;
	        numMerges = 0;

	        while (p) {
	            numMerges++;
	            q = p;
	            pSize = 0;
	            for (i = 0; i < inSize; i++) {
	                pSize++;
	                q = q.nextZ;
	                if (!q) { break; }
	            }
	            qSize = inSize;

	            while (pSize > 0 || (qSize > 0 && q)) {

	                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                }

	                if (tail) { tail.nextZ = e; }
	                else { list = e; }

	                e.prevZ = tail;
	                tail = e;
	            }

	            p = q;
	        }

	        tail.nextZ = null;
	        inSize *= 2;

	    } while (numMerges > 1);

	    return list;
	}

	// z-order of a point given coords and inverse of the longer side of data bbox
	function zOrder(x, y, minX, minY, invSize) {
	    // coords are transformed into non-negative 15-bit integer range
	    x = (x - minX) * invSize | 0;
	    y = (y - minY) * invSize | 0;

	    x = (x | (x << 8)) & 0x00FF00FF;
	    x = (x | (x << 4)) & 0x0F0F0F0F;
	    x = (x | (x << 2)) & 0x33333333;
	    x = (x | (x << 1)) & 0x55555555;

	    y = (y | (y << 8)) & 0x00FF00FF;
	    y = (y | (y << 4)) & 0x0F0F0F0F;
	    y = (y | (y << 2)) & 0x33333333;
	    y = (y | (y << 1)) & 0x55555555;

	    return x | (y << 1);
	}

	// find the leftmost node of a polygon ring
	function getLeftmost(start) {
	    var p = start,
	        leftmost = start;
	    do {
	        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) { leftmost = p; }
	        p = p.next;
	    } while (p !== start);

	    return leftmost;
	}

	// check if a point lies within a convex triangle
	function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) &&
	           (ax - px) * (by - py) >= (bx - px) * (ay - py) &&
	           (bx - px) * (cy - py) >= (cx - px) * (by - py);
	}

	// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
	function isValidDiagonal(a, b) {
	    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
	           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
	            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
	            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
	}

	// signed area of a triangle
	function area(p, q, r) {
	    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	}

	// check if two points are equal
	function equals(p1, p2) {
	    return p1.x === p2.x && p1.y === p2.y;
	}

	// check if two segments intersect
	function intersects(p1, q1, p2, q2) {
	    var o1 = sign(area(p1, q1, p2));
	    var o2 = sign(area(p1, q1, q2));
	    var o3 = sign(area(p2, q2, p1));
	    var o4 = sign(area(p2, q2, q1));

	    if (o1 !== o2 && o3 !== o4) { return true; } // general case

	    if (o1 === 0 && onSegment(p1, p2, q1)) { return true; } // p1, q1 and p2 are collinear and p2 lies on p1q1
	    if (o2 === 0 && onSegment(p1, q2, q1)) { return true; } // p1, q1 and q2 are collinear and q2 lies on p1q1
	    if (o3 === 0 && onSegment(p2, p1, q2)) { return true; } // p2, q2 and p1 are collinear and p1 lies on p2q2
	    if (o4 === 0 && onSegment(p2, q1, q2)) { return true; } // p2, q2 and q1 are collinear and q1 lies on p2q2

	    return false;
	}

	// for collinear points p, q, r, check if point q lies on segment pr
	function onSegment(p, q, r) {
	    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
	}

	function sign(num) {
	    return num > 0 ? 1 : num < 0 ? -1 : 0;
	}

	// check if a polygon diagonal intersects any polygon segments
	function intersectsPolygon(a, b) {
	    var p = a;
	    do {
	        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
	                intersects(p, p.next, a, b)) { return true; }
	        p = p.next;
	    } while (p !== a);

	    return false;
	}

	// check if a polygon diagonal is locally inside the polygon
	function locallyInside(a, b) {
	    return area(a.prev, a, a.next) < 0 ?
	        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
	        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
	}

	// check if the middle point of a polygon diagonal is inside the polygon
	function middleInside(a, b) {
	    var p = a,
	        inside = false,
	        px = (a.x + b.x) / 2,
	        py = (a.y + b.y) / 2;
	    do {
	        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
	                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
	            { inside = !inside; }
	        p = p.next;
	    } while (p !== a);

	    return inside;
	}

	// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring
	function splitPolygon(a, b) {
	    var a2 = new Node(a.i, a.x, a.y),
	        b2 = new Node(b.i, b.x, b.y),
	        an = a.next,
	        bp = b.prev;

	    a.next = b;
	    b.prev = a;

	    a2.next = an;
	    an.prev = a2;

	    b2.next = a2;
	    a2.prev = b2;

	    bp.next = b2;
	    b2.prev = bp;

	    return b2;
	}

	// create a node and optionally link it with previous one (in a circular doubly linked list)
	function insertNode(i, x, y, last) {
	    var p = new Node(i, x, y);

	    if (!last) {
	        p.prev = p;
	        p.next = p;

	    } else {
	        p.next = last.next;
	        p.prev = last;
	        last.next.prev = p;
	        last.next = p;
	    }
	    return p;
	}

	function removeNode(p) {
	    p.next.prev = p.prev;
	    p.prev.next = p.next;

	    if (p.prevZ) { p.prevZ.nextZ = p.nextZ; }
	    if (p.nextZ) { p.nextZ.prevZ = p.prevZ; }
	}

	function Node(i, x, y) {
	    // vertex index in coordinates array
	    this.i = i;

	    // vertex coordinates
	    this.x = x;
	    this.y = y;

	    // previous and next vertex nodes in a polygon ring
	    this.prev = null;
	    this.next = null;

	    // z-order curve value
	    this.z = 0;

	    // previous and next nodes in z-order
	    this.prevZ = null;
	    this.nextZ = null;

	    // indicates whether this is a steiner point
	    this.steiner = false;
	}

	// return a percentage difference between the polygon area and its triangulation area;
	// used to verify correctness of triangulation
	earcut.deviation = function (data, holeIndices, dim, triangles) {
	    var hasHoles = holeIndices && holeIndices.length;
	    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

	    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
	    if (hasHoles) {
	        for (var i = 0, len = holeIndices.length; i < len; i++) {
	            var start = holeIndices[i] * dim;
	            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	            polygonArea -= Math.abs(signedArea(data, start, end, dim));
	        }
	    }

	    var trianglesArea = 0;
	    for (i = 0; i < triangles.length; i += 3) {
	        var a = triangles[i] * dim;
	        var b = triangles[i + 1] * dim;
	        var c = triangles[i + 2] * dim;
	        trianglesArea += Math.abs(
	            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
	            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
	    }

	    return polygonArea === 0 && trianglesArea === 0 ? 0 :
	        Math.abs((trianglesArea - polygonArea) / polygonArea);
	};

	function signedArea(data, start, end, dim) {
	    var sum = 0;
	    for (var i = start, j = end - dim; i < end; i += dim) {
	        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	        j = i;
	    }
	    return sum;
	}

	// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
	earcut.flatten = function (data) {
	    var dim = data[0][0].length,
	        result = {vertices: [], holes: [], dimensions: dim},
	        holeIndex = 0;

	    for (var i = 0; i < data.length; i++) {
	        for (var j = 0; j < data[i].length; j++) {
	            for (var d = 0; d < dim; d++) { result.vertices.push(data[i][j][d]); }
	        }
	        if (i > 0) {
	            holeIndex += data[i - 1].length;
	            result.holes.push(holeIndex);
	        }
	    }
	    return result;
	};
	earcut_1.default = default_1;

	var punycode = createCommonjsModule(function (module, exports) {
	/*! https://mths.be/punycode v1.4.1 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = 'object' == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = 'object' == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.4.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			typeof undefined == 'function' &&
			typeof undefined.amd == 'object' &&
			undefined.amd
		) {
			undefined('punycode', function() {
				return punycode;
			});
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(commonjsGlobal));
	});

	'use strict';

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	var shams = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	'use strict';

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;


	var hasSymbols = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return shams();
	};

	'use strict';

	var test = {
		foo: {}
	};

	var $Object = Object;

	var hasProto = function hasProto() {
		return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
	};

	'use strict';

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	'use strict';



	var functionBind = Function.prototype.bind || implementation;

	'use strict';



	var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

	'use strict';

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols$1 = hasSymbols();
	var hasProto$1 = hasProto();

	var getProto = Object.getPrototypeOf || (
		hasProto$1
			? function (x) { return x.__proto__; } // eslint-disable-line no-proto
			: null
	);

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols$1 && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols$1 && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols$1 && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	if (getProto) {
		try {
			null.error; // eslint-disable-line no-unused-expressions
		} catch (e) {
			// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
			var errorProto = getProto(getProto(e));
			INTRINSICS['%Error.prototype%'] = errorProto;
		}
	}

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen && getProto) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};



	var $concat = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace = functionBind.call(Function.call, String.prototype.replace);
	var $strSlice = functionBind.call(Function.call, String.prototype.slice);
	var $exec = functionBind.call(Function.call, RegExp.prototype.exec);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (src(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (src(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError('"allowMissing" argument must be a boolean');
		}

		if ($exec(/^%?[^%]*%?$/, name) === null) {
			throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
		}
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (src(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = src(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var callBind = createCommonjsModule(function (module) {
	'use strict';




	var $apply = getIntrinsic('%Function.prototype.apply%');
	var $call = getIntrinsic('%Function.prototype.call%');
	var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

	var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
	var $max = getIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(functionBind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}
	});
	var callBind_1 = callBind.apply;

	'use strict';





	var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

	var callBound = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = getIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};

	var utilInspect = {};

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice = String.prototype.slice;
	var $replace$1 = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat$1 = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
	// ie, `has-tostringtag/shams
	var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
	    ? Symbol.toStringTag
	    : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;

	var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
	    [].__proto__ === Array.prototype // eslint-disable-line no-proto
	        ? function (O) {
	            return O.__proto__; // eslint-disable-line no-proto
	        }
	        : null
	);

	function addNumericSeparator(num, str) {
	    if (
	        num === Infinity
	        || num === -Infinity
	        || num !== num
	        || (num && num > -1000 && num < 1000)
	        || $test.call(/e/, str)
	    ) {
	        return str;
	    }
	    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
	    if (typeof num === 'number') {
	        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
	        if (int !== num) {
	            var intStr = String(int);
	            var dec = $slice.call(str, intStr.length + 1);
	            return $replace$1.call(intStr, sepRegex, '$&_') + '.' + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
	        }
	    }
	    return $replace$1.call(str, sepRegex, '$&_');
	}


	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	    var opts = options || {};

	    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
	    }
	    if (
	        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
	            : opts.maxStringLength !== null
	        )
	    ) {
	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	    }
	    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
	    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
	        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
	    }

	    if (
	        has(opts, 'indent')
	        && opts.indent !== null
	        && opts.indent !== '\t'
	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
	    ) {
	        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
	    }
	    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
	        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
	    }
	    var numericSeparator = opts.numericSeparator;

	    if (typeof obj === 'undefined') {
	        return 'undefined';
	    }
	    if (obj === null) {
	        return 'null';
	    }
	    if (typeof obj === 'boolean') {
	        return obj ? 'true' : 'false';
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj, opts);
	    }
	    if (typeof obj === 'number') {
	        if (obj === 0) {
	            return Infinity / obj > 0 ? '0' : '-0';
	        }
	        var str = String(obj);
	        return numericSeparator ? addNumericSeparator(obj, str) : str;
	    }
	    if (typeof obj === 'bigint') {
	        var bigIntStr = String(obj) + 'n';
	        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
	    }

	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
	    if (typeof depth === 'undefined') { depth = 0; }
	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	        return isArray(obj) ? '[Array]' : '[Object]';
	    }

	    var indent = getIndent(opts, depth);

	    if (typeof seen === 'undefined') {
	        seen = [];
	    } else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from, noIndent) {
	        if (from) {
	            seen = $arrSlice.call(seen);
	            seen.push(from);
	        }
	        if (noIndent) {
	            var newOpts = {
	                depth: opts.depth
	            };
	            if (has(opts, 'quoteStyle')) {
	                newOpts.quoteStyle = opts.quoteStyle;
	            }
	            return inspect_(value, newOpts, depth + 1, seen);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
	        var name = nameOf(obj);
	        var keys = arrObjKeys(obj, inspect);
	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
	    }
	    if (isSymbol(obj)) {
	        var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
	        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
	    }
	    if (isElement(obj)) {
	        var s = '<' + $toLowerCase.call(String(obj.nodeName));
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
	        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
	        return s;
	    }
	    if (isArray(obj)) {
	        if (obj.length === 0) { return '[]'; }
	        var xs = arrObjKeys(obj, inspect);
	        if (indent && !singleLineValues(xs)) {
	            return '[' + indentedJoin(xs, indent) + ']';
	        }
	        return '[ ' + $join.call(xs, ', ') + ' ]';
	    }
	    if (isError(obj)) {
	        var parts = arrObjKeys(obj, inspect);
	        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
	            return '{ [' + String(obj) + '] ' + $join.call($concat$1.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
	        }
	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
	        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
	    }
	    if (typeof obj === 'object' && customInspect) {
	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
	            return utilInspect(obj, { depth: maxDepth - depth });
	        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
	            return obj.inspect();
	        }
	    }
	    if (isMap(obj)) {
	        var mapParts = [];
	        if (mapForEach) {
	            mapForEach.call(obj, function (value, key) {
	                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	            });
	        }
	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	    }
	    if (isSet(obj)) {
	        var setParts = [];
	        if (setForEach) {
	            setForEach.call(obj, function (value) {
	                setParts.push(inspect(value, obj));
	            });
	        }
	        return collectionOf('Set', setSize.call(obj), setParts, indent);
	    }
	    if (isWeakMap(obj)) {
	        return weakCollectionOf('WeakMap');
	    }
	    if (isWeakSet(obj)) {
	        return weakCollectionOf('WeakSet');
	    }
	    if (isWeakRef(obj)) {
	        return weakCollectionOf('WeakRef');
	    }
	    if (isNumber(obj)) {
	        return markBoxed(inspect(Number(obj)));
	    }
	    if (isBigInt(obj)) {
	        return markBoxed(inspect(bigIntValueOf.call(obj)));
	    }
	    if (isBoolean(obj)) {
	        return markBoxed(booleanValueOf.call(obj));
	    }
	    if (isString(obj)) {
	        return markBoxed(inspect(String(obj)));
	    }
	    if (!isDate(obj) && !isRegExp(obj)) {
	        var ys = arrObjKeys(obj, inspect);
	        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
	        var protoTag = obj instanceof Object ? '' : 'null prototype';
	        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr$1(obj), 8, -1) : protoTag ? 'Object' : '';
	        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
	        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat$1.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
	        if (ys.length === 0) { return tag + '{}'; }
	        if (indent) {
	            return tag + '{' + indentedJoin(ys, indent) + '}';
	        }
	        return tag + '{ ' + $join.call(ys, ', ') + ' }';
	    }
	    return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	    return quoteChar + s + quoteChar;
	}

	function quote(s) {
	    return $replace$1.call(String(s), /"/g, '&quot;');
	}

	function isArray(obj) { return toStr$1(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isDate(obj) { return toStr$1(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isRegExp(obj) { return toStr$1(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isError(obj) { return toStr$1(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isString(obj) { return toStr$1(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isNumber(obj) { return toStr$1(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isBoolean(obj) { return toStr$1(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

	// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
	function isSymbol(obj) {
	    if (hasShammedSymbols) {
	        return obj && typeof obj === 'object' && obj instanceof Symbol;
	    }
	    if (typeof obj === 'symbol') {
	        return true;
	    }
	    if (!obj || typeof obj !== 'object' || !symToString) {
	        return false;
	    }
	    try {
	        symToString.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isBigInt(obj) {
	    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
	        return false;
	    }
	    try {
	        bigIntValueOf.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr$1(obj) {
	    return objectToString.call(obj);
	}

	function nameOf(f) {
	    if (f.name) { return f.name; }
	    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
	    if (m) { return m[1]; }
	    return null;
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) { return xs.indexOf(x); }
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) { return i; }
	    }
	    return -1;
	}

	function isMap(x) {
	    if (!mapSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        try {
	            setSize.call(x);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof Map; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakMap(x) {
	    if (!weakMapHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakMapHas.call(x, weakMapHas);
	        try {
	            weakSetHas.call(x, weakSetHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakRef(x) {
	    if (!weakRefDeref || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakRefDeref.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet(x) {
	    if (!setSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        try {
	            mapSize.call(x);
	        } catch (m) {
	            return true;
	        }
	        return x instanceof Set; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakSet(x) {
	    if (!weakSetHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakSetHas.call(x, weakSetHas);
	        try {
	            weakMapHas.call(x, weakMapHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isElement(x) {
	    if (!x || typeof x !== 'object') { return false; }
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	    if (str.length > opts.maxStringLength) {
	        var remaining = str.length - opts.maxStringLength;
	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
	    }
	    // eslint-disable-next-line no-control-regex
	    var s = $replace$1.call($replace$1.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
	    return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	    var n = c.charCodeAt(0);
	    var x = {
	        8: 'b',
	        9: 't',
	        10: 'n',
	        12: 'f',
	        13: 'r'
	    }[n];
	    if (x) { return '\\' + x; }
	    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
	}

	function markBoxed(str) {
	    return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	    return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
	    return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	    for (var i = 0; i < xs.length; i++) {
	        if (indexOf(xs[i], '\n') >= 0) {
	            return false;
	        }
	    }
	    return true;
	}

	function getIndent(opts, depth) {
	    var baseIndent;
	    if (opts.indent === '\t') {
	        baseIndent = '\t';
	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	        baseIndent = $join.call(Array(opts.indent + 1), ' ');
	    } else {
	        return null;
	    }
	    return {
	        base: baseIndent,
	        prev: $join.call(Array(depth + 1), baseIndent)
	    };
	}

	function indentedJoin(xs, indent) {
	    if (xs.length === 0) { return ''; }
	    var lineJoiner = '\n' + indent.prev + indent.base;
	    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	    var isArr = isArray(obj);
	    var xs = [];
	    if (isArr) {
	        xs.length = obj.length;
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	    }
	    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
	    var symMap;
	    if (hasShammedSymbols) {
	        symMap = {};
	        for (var k = 0; k < syms.length; k++) {
	            symMap['$' + syms[k]] = syms[k];
	        }
	    }

	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
	        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
	            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
	            continue; // eslint-disable-line no-restricted-syntax, no-continue
	        } else if ($test.call(/[^\w$]/, key)) {
	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	        } else {
	            xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	    }
	    if (typeof gOPS === 'function') {
	        for (var j = 0; j < syms.length; j++) {
	            if (isEnumerable.call(obj, syms[j])) {
	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	            }
	        }
	    }
	    return xs;
	}

	'use strict';





	var $TypeError$1 = getIntrinsic('%TypeError%');
	var $WeakMap = getIntrinsic('%WeakMap%', true);
	var $Map = getIntrinsic('%Map%', true);

	var $weakMapGet = callBound('WeakMap.prototype.get', true);
	var $weakMapSet = callBound('WeakMap.prototype.set', true);
	var $weakMapHas = callBound('WeakMap.prototype.has', true);
	var $mapGet = callBound('Map.prototype.get', true);
	var $mapSet = callBound('Map.prototype.set', true);
	var $mapHas = callBound('Map.prototype.has', true);

	/*
	 * This function traverses the list returning the node corresponding to the
	 * given key.
	 *
	 * That node is also moved to the head of the list, so that if it's accessed
	 * again we don't need to traverse the whole list. By doing so, all the recently
	 * used nodes can be accessed relatively quickly.
	 */
	var listGetNode = function (list, key) { // eslint-disable-line consistent-return
		for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
			if (curr.key === key) {
				prev.next = curr.next;
				curr.next = list.next;
				list.next = curr; // eslint-disable-line no-param-reassign
				return curr;
			}
		}
	};

	var listGet = function (objects, key) {
		var node = listGetNode(objects, key);
		return node && node.value;
	};
	var listSet = function (objects, key, value) {
		var node = listGetNode(objects, key);
		if (node) {
			node.value = value;
		} else {
			// Prepend the new node to the beginning of the list
			objects.next = { // eslint-disable-line no-param-reassign
				key: key,
				next: objects.next,
				value: value
			};
		}
	};
	var listHas = function (objects, key) {
		return !!listGetNode(objects, key);
	};

	var sideChannel = function getSideChannel() {
		var $wm;
		var $m;
		var $o;
		var channel = {
			assert: function (key) {
				if (!channel.has(key)) {
					throw new $TypeError$1('Side channel does not contain ' + objectInspect(key));
				}
			},
			get: function (key) { // eslint-disable-line consistent-return
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapGet($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapGet($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listGet($o, key);
					}
				}
			},
			has: function (key) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapHas($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapHas($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listHas($o, key);
					}
				}
				return false;
			},
			set: function (key, value) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if (!$wm) {
						$wm = new $WeakMap();
					}
					$weakMapSet($wm, key, value);
				} else if ($Map) {
					if (!$m) {
						$m = new $Map();
					}
					$mapSet($m, key, value);
				} else {
					if (!$o) {
						/*
						 * Initialize the linked list as an empty node, so that we don't have
						 * to special-case handling of the first node: we can always refer to
						 * it as (previous node).next, instead of something like (list).head
						 */
						$o = { key: {}, next: null };
					}
					listSet($o, key, value);
				}
			}
		};
		return channel;
	};

	'use strict';

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;

	var Format = {
	    RFC1738: 'RFC1738',
	    RFC3986: 'RFC3986'
	};

	var formats = {
	    'default': Format.RFC3986,
	    formatters: {
	        RFC1738: function (value) {
	            return replace.call(value, percentTwenties, '+');
	        },
	        RFC3986: function (value) {
	            return String(value);
	        }
	    },
	    RFC1738: Format.RFC1738,
	    RFC3986: Format.RFC3986
	};
	var formats_1 = formats.formatters;
	var formats_2 = formats.RFC1738;
	var formats_3 = formats.RFC3986;

	'use strict';



	var has$1 = Object.prototype.hasOwnProperty;
	var isArray$1 = Array.isArray;

	var hexTable = (function () {
	    var array = [];
	    for (var i = 0; i < 256; ++i) {
	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	    }

	    return array;
	}());

	var compactQueue = function compactQueue(queue) {
	    while (queue.length > 1) {
	        var item = queue.pop();
	        var obj = item.obj[item.prop];

	        if (isArray$1(obj)) {
	            var compacted = [];

	            for (var j = 0; j < obj.length; ++j) {
	                if (typeof obj[j] !== 'undefined') {
	                    compacted.push(obj[j]);
	                }
	            }

	            item.obj[item.prop] = compacted;
	        }
	    }
	};

	var arrayToObject = function arrayToObject(source, options) {
	    var obj = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	var merge = function merge(target, source, options) {
	    /* eslint no-param-reassign: 0 */
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (isArray$1(target)) {
	            target.push(source);
	        } else if (target && typeof target === 'object') {
	            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$1.call(Object.prototype, source)) {
	                target[source] = true;
	            }
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (!target || typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (isArray$1(target) && !isArray$1(source)) {
	        mergeTarget = arrayToObject(target, options);
	    }

	    if (isArray$1(target) && isArray$1(source)) {
	        source.forEach(function (item, i) {
	            if (has$1.call(target, i)) {
	                var targetItem = target[i];
	                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
	                    target[i] = merge(targetItem, item, options);
	                } else {
	                    target.push(item);
	                }
	            } else {
	                target[i] = item;
	            }
	        });
	        return target;
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (has$1.call(acc, key)) {
	            acc[key] = merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	var assign = function assignSingleSource(target, source) {
	    return Object.keys(source).reduce(function (acc, key) {
	        acc[key] = source[key];
	        return acc;
	    }, target);
	};

	var decode = function (str, decoder, charset) {
	    var strWithoutPlus = str.replace(/\+/g, ' ');
	    if (charset === 'iso-8859-1') {
	        // unescape never throws, no try...catch needed:
	        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
	    }
	    // utf-8
	    try {
	        return decodeURIComponent(strWithoutPlus);
	    } catch (e) {
	        return strWithoutPlus;
	    }
	};

	var encode = function encode(str, defaultEncoder, charset, kind, format) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = str;
	    if (typeof str === 'symbol') {
	        string = Symbol.prototype.toString.call(str);
	    } else if (typeof str !== 'string') {
	        string = String(str);
	    }

	    if (charset === 'iso-8859-1') {
	        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
	            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
	        });
	    }

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D // -
	            || c === 0x2E // .
	            || c === 0x5F // _
	            || c === 0x7E // ~
	            || (c >= 0x30 && c <= 0x39) // 0-9
	            || (c >= 0x41 && c <= 0x5A) // a-z
	            || (c >= 0x61 && c <= 0x7A) // A-Z
	            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        /* eslint operator-linebreak: [2, "before"] */
	        out += hexTable[0xF0 | (c >> 18)]
	            + hexTable[0x80 | ((c >> 12) & 0x3F)]
	            + hexTable[0x80 | ((c >> 6) & 0x3F)]
	            + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	var compact = function compact(value) {
	    var queue = [{ obj: { o: value }, prop: 'o' }];
	    var refs = [];

	    for (var i = 0; i < queue.length; ++i) {
	        var item = queue[i];
	        var obj = item.obj[item.prop];

	        var keys = Object.keys(obj);
	        for (var j = 0; j < keys.length; ++j) {
	            var key = keys[j];
	            var val = obj[key];
	            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
	                queue.push({ obj: obj, prop: key });
	                refs.push(val);
	            }
	        }
	    }

	    compactQueue(queue);

	    return value;
	};

	var isRegExp$1 = function isRegExp(obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	var isBuffer = function isBuffer(obj) {
	    if (!obj || typeof obj !== 'object') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

	var combine = function combine(a, b) {
	    return [].concat(a, b);
	};

	var maybeMap = function maybeMap(val, fn) {
	    if (isArray$1(val)) {
	        var mapped = [];
	        for (var i = 0; i < val.length; i += 1) {
	            mapped.push(fn(val[i]));
	        }
	        return mapped;
	    }
	    return fn(val);
	};

	var utils = {
	    arrayToObject: arrayToObject,
	    assign: assign,
	    combine: combine,
	    compact: compact,
	    decode: decode,
	    encode: encode,
	    isBuffer: isBuffer,
	    isRegExp: isRegExp$1,
	    maybeMap: maybeMap,
	    merge: merge
	};
	var utils_1 = utils.arrayToObject;
	var utils_2 = utils.assign;
	var utils_3 = utils.combine;
	var utils_4 = utils.compact;
	var utils_5 = utils.decode;
	var utils_6 = utils.encode;
	var utils_7 = utils.isBuffer;
	var utils_8 = utils.isRegExp;
	var utils_9 = utils.maybeMap;
	var utils_10 = utils.merge;

	'use strict';




	var has$2 = Object.prototype.hasOwnProperty;

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    comma: 'comma',
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};

	var isArray$2 = Array.isArray;
	var push = Array.prototype.push;
	var pushToArray = function (arr, valueOrArray) {
	    push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
	};

	var toISO = Date.prototype.toISOString;

	var defaultFormat = formats['default'];
	var defaults = {
	    addQueryPrefix: false,
	    allowDots: false,
	    charset: 'utf-8',
	    charsetSentinel: false,
	    delimiter: '&',
	    encode: true,
	    encoder: utils.encode,
	    encodeValuesOnly: false,
	    format: defaultFormat,
	    formatter: formats.formatters[defaultFormat],
	    // deprecated
	    indices: false,
	    serializeDate: function serializeDate(date) {
	        return toISO.call(date);
	    },
	    skipNulls: false,
	    strictNullHandling: false
	};

	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
	    return typeof v === 'string'
	        || typeof v === 'number'
	        || typeof v === 'boolean'
	        || typeof v === 'symbol'
	        || typeof v === 'bigint';
	};

	var sentinel = {};

	var stringify = function stringify(
	    object,
	    prefix,
	    generateArrayPrefix,
	    commaRoundTrip,
	    strictNullHandling,
	    skipNulls,
	    encoder,
	    filter,
	    sort,
	    allowDots,
	    serializeDate,
	    format,
	    formatter,
	    encodeValuesOnly,
	    charset,
	    sideChannel$1
	) {
	    var obj = object;

	    var tmpSc = sideChannel$1;
	    var step = 0;
	    var findFlag = false;
	    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
	        // Where object last appeared in the ref tree
	        var pos = tmpSc.get(object);
	        step += 1;
	        if (typeof pos !== 'undefined') {
	            if (pos === step) {
	                throw new RangeError('Cyclic object value');
	            } else {
	                findFlag = true; // Break while
	            }
	        }
	        if (typeof tmpSc.get(sentinel) === 'undefined') {
	            step = 0;
	        }
	    }

	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = serializeDate(obj);
	    } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
	        obj = utils.maybeMap(obj, function (value) {
	            if (value instanceof Date) {
	                return serializeDate(value);
	            }
	            return value;
	        });
	    }

	    if (obj === null) {
	        if (strictNullHandling) {
	            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
	        }

	        obj = '';
	    }

	    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
	        if (encoder) {
	            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
	            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
	        }
	        return [formatter(prefix) + '=' + formatter(String(obj))];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
	        // we need to join elements in
	        if (encodeValuesOnly && encoder) {
	            obj = utils.maybeMap(obj, encoder);
	        }
	        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
	    } else if (isArray$2(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    var adjustedPrefix = commaRoundTrip && isArray$2(obj) && obj.length === 1 ? prefix + '[]' : prefix;

	    for (var j = 0; j < objKeys.length; ++j) {
	        var key = objKeys[j];
	        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

	        if (skipNulls && value === null) {
	            continue;
	        }

	        var keyPrefix = isArray$2(obj)
	            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix
	            : adjustedPrefix + (allowDots ? '.' + key : '[' + key + ']');

	        sideChannel$1.set(object, step);
	        var valueSideChannel = sideChannel();
	        valueSideChannel.set(sentinel, sideChannel$1);
	        pushToArray(values, stringify(
	            value,
	            keyPrefix,
	            generateArrayPrefix,
	            commaRoundTrip,
	            strictNullHandling,
	            skipNulls,
	            generateArrayPrefix === 'comma' && encodeValuesOnly && isArray$2(obj) ? null : encoder,
	            filter,
	            sort,
	            allowDots,
	            serializeDate,
	            format,
	            formatter,
	            encodeValuesOnly,
	            charset,
	            valueSideChannel
	        ));
	    }

	    return values;
	};

	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
	    if (!opts) {
	        return defaults;
	    }

	    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    var charset = opts.charset || defaults.charset;
	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	    }

	    var format = formats['default'];
	    if (typeof opts.format !== 'undefined') {
	        if (!has$2.call(formats.formatters, opts.format)) {
	            throw new TypeError('Unknown format option provided.');
	        }
	        format = opts.format;
	    }
	    var formatter = formats.formatters[format];

	    var filter = defaults.filter;
	    if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
	        filter = opts.filter;
	    }

	    return {
	        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
	        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
	        charset: charset,
	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
	        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
	        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
	        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
	        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
	        filter: filter,
	        format: format,
	        formatter: formatter,
	        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
	        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
	        sort: typeof opts.sort === 'function' ? opts.sort : null,
	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
	    };
	};

	var stringify_1 = function (object, opts) {
	    var obj = object;
	    var options = normalizeStringifyOptions(opts);

	    var objKeys;
	    var filter;

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (isArray$2(options.filter)) {
	        filter = options.filter;
	        objKeys = filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = opts.arrayFormat;
	    } else if (opts && 'indices' in opts) {
	        arrayFormat = opts.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
	    if (opts && 'commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
	        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
	    }
	    var commaRoundTrip = generateArrayPrefix === 'comma' && opts && opts.commaRoundTrip;

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (options.sort) {
	        objKeys.sort(options.sort);
	    }

	    var sideChannel$1 = sideChannel();
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (options.skipNulls && obj[key] === null) {
	            continue;
	        }
	        pushToArray(keys, stringify(
	            obj[key],
	            key,
	            generateArrayPrefix,
	            commaRoundTrip,
	            options.strictNullHandling,
	            options.skipNulls,
	            options.encode ? options.encoder : null,
	            options.filter,
	            options.sort,
	            options.allowDots,
	            options.serializeDate,
	            options.format,
	            options.formatter,
	            options.encodeValuesOnly,
	            options.charset,
	            sideChannel$1
	        ));
	    }

	    var joined = keys.join(options.delimiter);
	    var prefix = options.addQueryPrefix === true ? '?' : '';

	    if (options.charsetSentinel) {
	        if (options.charset === 'iso-8859-1') {
	            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
	            prefix += 'utf8=%26%2310003%3B&';
	        } else {
	            // encodeURIComponent('✓')
	            prefix += 'utf8=%E2%9C%93&';
	        }
	    }

	    return joined.length > 0 ? prefix + joined : '';
	};

	'use strict';



	var has$3 = Object.prototype.hasOwnProperty;
	var isArray$3 = Array.isArray;

	var defaults$1 = {
	    allowDots: false,
	    allowPrototypes: false,
	    allowSparse: false,
	    arrayLimit: 20,
	    charset: 'utf-8',
	    charsetSentinel: false,
	    comma: false,
	    decoder: utils.decode,
	    delimiter: '&',
	    depth: 5,
	    ignoreQueryPrefix: false,
	    interpretNumericEntities: false,
	    parameterLimit: 1000,
	    parseArrays: true,
	    plainObjects: false,
	    strictNullHandling: false
	};

	var interpretNumericEntities = function (str) {
	    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
	        return String.fromCharCode(parseInt(numberStr, 10));
	    });
	};

	var parseArrayValue = function (val, options) {
	    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
	        return val.split(',');
	    }

	    return val;
	};

	// This is what browsers will submit when the ✓ character occurs in an
	// application/x-www-form-urlencoded body and the encoding of the page containing
	// the form is iso-8859-1, or when the submitted form has an accept-charset
	// attribute of iso-8859-1. Presumably also with other charsets that do not contain
	// the ✓ character, such as us-ascii.
	var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

	// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
	var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

	var parseValues = function parseQueryStringValues(str, options) {
	    var obj = { __proto__: null };

	    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
	    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
	    var parts = cleanStr.split(options.delimiter, limit);
	    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
	    var i;

	    var charset = options.charset;
	    if (options.charsetSentinel) {
	        for (i = 0; i < parts.length; ++i) {
	            if (parts[i].indexOf('utf8=') === 0) {
	                if (parts[i] === charsetSentinel) {
	                    charset = 'utf-8';
	                } else if (parts[i] === isoSentinel) {
	                    charset = 'iso-8859-1';
	                }
	                skipIndex = i;
	                i = parts.length; // The eslint settings do not allow break;
	            }
	        }
	    }

	    for (i = 0; i < parts.length; ++i) {
	        if (i === skipIndex) {
	            continue;
	        }
	        var part = parts[i];

	        var bracketEqualsPos = part.indexOf(']=');
	        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part, defaults$1.decoder, charset, 'key');
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
	            val = utils.maybeMap(
	                parseArrayValue(part.slice(pos + 1), options),
	                function (encodedVal) {
	                    return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
	                }
	            );
	        }

	        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
	            val = interpretNumericEntities(val);
	        }

	        if (part.indexOf('[]=') > -1) {
	            val = isArray$3(val) ? [val] : val;
	        }

	        if (has$3.call(obj, key)) {
	            obj[key] = utils.combine(obj[key], val);
	        } else {
	            obj[key] = val;
	        }
	    }

	    return obj;
	};

	var parseObject = function (chain, val, options, valuesParsed) {
	    var leaf = valuesParsed ? val : parseArrayValue(val, options);

	    for (var i = chain.length - 1; i >= 0; --i) {
	        var obj;
	        var root = chain[i];

	        if (root === '[]' && options.parseArrays) {
	            obj = [].concat(leaf);
	        } else {
	            obj = options.plainObjects ? Object.create(null) : {};
	            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
	            var index = parseInt(cleanRoot, 10);
	            if (!options.parseArrays && cleanRoot === '') {
	                obj = { 0: leaf };
	            } else if (
	                !isNaN(index)
	                && root !== cleanRoot
	                && String(index) === cleanRoot
	                && index >= 0
	                && (options.parseArrays && index <= options.arrayLimit)
	            ) {
	                obj = [];
	                obj[index] = leaf;
	            } else if (cleanRoot !== '__proto__') {
	                obj[cleanRoot] = leaf;
	            }
	        }

	        leaf = obj;
	    }

	    return leaf;
	};

	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var brackets = /(\[[^[\]]*])/;
	    var child = /(\[[^[\]]*])/g;

	    // Get the parent

	    var segment = options.depth > 0 && brackets.exec(key);
	    var parent = segment ? key.slice(0, segment.index) : key;

	    // Stash the parent if it exists

	    var keys = [];
	    if (parent) {
	        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
	        if (!options.plainObjects && has$3.call(Object.prototype, parent)) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(parent);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && has$3.call(Object.prototype, segment[1].slice(1, -1))) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options, valuesParsed);
	};

	var normalizeParseOptions = function normalizeParseOptions(opts) {
	    if (!opts) {
	        return defaults$1;
	    }

	    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	    }
	    var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

	    return {
	        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
	        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
	        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults$1.allowSparse,
	        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
	        charset: charset,
	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
	        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
	        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
	        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
	        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
	        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
	        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
	        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
	        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
	        parseArrays: opts.parseArrays !== false,
	        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
	    };
	};

	var parse = function (str, opts) {
	    var options = normalizeParseOptions(opts);

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
	        obj = utils.merge(obj, newObj, options);
	    }

	    if (options.allowSparse === true) {
	        return obj;
	    }

	    return utils.compact(obj);
	};

	'use strict';





	var lib = {
	    formats: formats,
	    parse: parse,
	    stringify: stringify_1
	};
	var lib_1 = lib.formats;
	var lib_2 = lib.parse;
	var lib_3 = lib.stringify;

	/*
	 * Copyright Joyent, Inc. and other Node contributors.
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to permit
	 * persons to whom the Software is furnished to do so, subject to the
	 * following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included
	 * in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	 * USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	'use strict';



	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	/*
	 * define these here so at least they only have to be
	 * compiled once on the first module load.
	 */
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	  portPattern = /:[0-9]*$/,

	  // Special case for a simple path URL
	  simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,

	  /*
	   * RFC 2396: characters reserved for delimiting URLs.
	   * We actually just auto-escape these.
	   */
	  delims = [
	    '<', '>', '"', '`', ' ', '\r', '\n', '\t'
	  ],

	  // RFC 2396: characters not allowed for various reasons.
	  unwise = [
	    '{', '}', '|', '\\', '^', '`'
	  ].concat(delims),

	  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	  autoEscape = ['\''].concat(unwise),
	  /*
	   * Characters that are never ever allowed in a hostname.
	   * Note that any invalid chars are also handled, but these
	   * are the ones that are *expected* to be seen, so we fast-path
	   * them.
	   */
	  nonHostChars = [
	    '%', '/', '?', ';', '#'
	  ].concat(autoEscape),
	  hostEndingChars = [
	    '/', '?', '#'
	  ],
	  hostnameMaxLen = 255,
	  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	  // protocols that can allow "unsafe" and "unwise" chars.
	  unsafeProtocol = {
	    javascript: true,
	    'javascript:': true
	  },
	  // protocols that never have a hostname.
	  hostlessProtocol = {
	    javascript: true,
	    'javascript:': true
	  },
	  // protocols that always contain a // bit.
	  slashedProtocol = {
	    http: true,
	    https: true,
	    ftp: true,
	    gopher: true,
	    file: true,
	    'http:': true,
	    'https:': true,
	    'ftp:': true,
	    'gopher:': true,
	    'file:': true
	  };

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && typeof url === 'object' && url instanceof Url) { return url; }

	  var u = new Url();
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
	  if (typeof url !== 'string') {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  /*
	   * Copy chrome, IE, opera backslash-handling behavior.
	   * Back slashes before the query string get converted to forward slashes
	   * See: https://code.google.com/p/chromium/issues/detail?id=25916
	   */
	  var queryIndex = url.indexOf('?'),
	    splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
	    uSplit = url.split(splitter),
	    slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);

	  var rest = url;

	  /*
	   * trim before proceeding.
	   * This is to support parse stuff like "  http://foo.com  \n"
	   */
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = lib.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  /*
	   * figure out if it's got a host
	   * user@server is *always* interpreted as a hostname, and url
	   * resolution will treat //foo/bar as host=foo,path=bar because that's
	   * how the browser resolves relative URLs.
	   */
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {

	    /*
	     * there's a hostname.
	     * the first instance of /, ?, ;, or # ends the host.
	     *
	     * If there is an @ in the hostname, then non-host chars *are* allowed
	     * to the left of the last @ sign, unless some host-ending character
	     * comes *before* the @-sign.
	     * URLs are obnoxious.
	     *
	     * ex:
	     * http://a@b@c/ => user:a@b host:c
	     * http://a@b?@c => user:a host:c path:/?@c
	     */

	    /*
	     * v0.12 TODO(isaacs): This is not quite how Chrome does things.
	     * Review our test case against browsers more comprehensively.
	     */

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
	    }

	    /*
	     * at this point, either we have an explicit point where the
	     * auth portion cannot go past, or the last @ char is the decider.
	     */
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      /*
	       * atSign must be in auth portion.
	       * http://a@b/c@d => host:b auth:a path:/c@d
	       */
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    /*
	     * Now we have a portion which is definitely the auth.
	     * Pull that off.
	     */
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) { hostEnd = rest.length; }

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    /*
	     * we've indicated that there is a hostname,
	     * so even if it's empty, it has to be present.
	     */
	    this.hostname = this.hostname || '';

	    /*
	     * if hostname begins with [ and ends with ]
	     * assume that it's an IPv6 address.
	     */
	    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) { continue; }
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              /*
	               * we replace non-ASCII char with a temporary placeholder
	               * we need this to make sure size of hostname is not
	               * broken by replacing non-ASCII by nothing
	               */
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      /*
	       * IDNA Support: Returns a punycoded representation of "domain".
	       * It only converts parts of the domain name that
	       * have non-ASCII characters, i.e. it doesn't matter if
	       * you call it with a domain that already is ASCII-only.
	       */
	      this.hostname = punycode.toASCII(this.hostname);
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    /*
	     * strip [ and ] from the hostname
	     * the host field still retains them, though
	     */
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  /*
	   * now rest is set to the post-host stuff.
	   * chop off any delim chars.
	   */
	  if (!unsafeProtocol[lowerProto]) {

	    /*
	     * First, make 100% sure that any "autoEscape" chars get
	     * escaped, even if encodeURIComponent doesn't think they
	     * need to be.
	     */
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1) { continue; }
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }

	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = lib.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) { this.pathname = rest; }
	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  // to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  /*
	   * ensure it's an object, and not a string url.
	   * If it's an obj, this is a no-op.
	   * this way, you can call url_format() on strings
	   * to clean up potentially wonky urls.
	   */
	  if (typeof obj === 'string') { obj = urlParse(obj); }
	  if (!(obj instanceof Url)) { return Url.prototype.format.call(obj); }
	  return obj.format();
	}

	Url.prototype.format = function () {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	    pathname = this.pathname || '',
	    hash = this.hash || '',
	    host = false,
	    query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query && typeof this.query === 'object' && Object.keys(this.query).length) {
	    query = lib.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; }

	  /*
	   * only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	   * unless they had them to begin with.
	   */
	  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
	  if (search && search.charAt(0) !== '?') { search = '?' + search; }

	  pathname = pathname.replace(/[?#]/g, function (match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function (relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) { return relative; }
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function (relative) {
	  if (typeof relative === 'string') {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }

	  /*
	   * hash is always overridden, no matter what.
	   * even href="" will remove it.
	   */
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol') { result[rkey] = relative[rkey]; }
	    }

	    // urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
	      result.pathname = '/';
	      result.path = result.pathname;
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    /*
	     * if it's a known url protocol, then changing
	     * the protocol does weird things
	     * first, if it's not file:, then we MUST have a host,
	     * and if there was a path
	     * to begin with, then we MUST have a path.
	     * if it is file:, then the host is dropped,
	     * because that's known to be hostless.
	     * anything else is assumed to be absolute.
	     */
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift())) { }
	      if (!relative.host) { relative.host = ''; }
	      if (!relative.hostname) { relative.hostname = ''; }
	      if (relPath[0] !== '') { relPath.unshift(''); }
	      if (relPath.length < 2) { relPath.unshift(''); }
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
	    isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
	    mustEndAbs = isRelAbs || isSourceAbs || (result.host && relative.pathname),
	    removeAllDots = mustEndAbs,
	    srcPath = result.pathname && result.pathname.split('/') || [],
	    relPath = relative.pathname && relative.pathname.split('/') || [],
	    psychotic = result.protocol && !slashedProtocol[result.protocol];

	  /*
	   * if the url is a non-slashed url, then relative
	   * links like ../.. should be able
	   * to crawl up to the hostname, as well.  This is strange.
	   * result.protocol has already been set by now.
	   * Later on, put the first path part into the host field.
	   */
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') { srcPath[0] = result.host; } else { srcPath.unshift(result.host); }
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') { relPath[0] = relative.host; } else { relPath.unshift(relative.host); }
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = relative.host || relative.host === '' ? relative.host : result.host;
	    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    /*
	     * it's relative
	     * throw away the existing file, and take the new path instead.
	     */
	    if (!srcPath) { srcPath = []; }
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (relative.search != null) {
	    /*
	     * just pull out the search.
	     * like href='?foo'.
	     * Put this after the other two cases because it simplifies the booleans
	     */
	    if (psychotic) {
	      result.host = srcPath.shift();
	      result.hostname = result.host;
	      /*
	       * occationaly the auth can get stuck only in host
	       * this especially happens in cases like
	       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	       */
	      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.hostname = authInHost.shift();
	        result.host = result.hostname;
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    // to support http.request
	    if (result.pathname !== null || result.search !== null) {
	      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    /*
	     * no path at all.  easy.
	     * we've already handled the other stuff above.
	     */
	    result.pathname = null;
	    // to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  /*
	   * if a url ENDs in . or .., then it must get a trailing slash.
	   * however, if it ends in anything else non-slashy,
	   * then it must NOT get a trailing slash.
	   */
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

	  /*
	   * strip single dots, resolve double dots to parent dir
	   * if the path tries to go above the root, `up` ends up > 0
	   */
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
	    result.host = result.hostname;
	    /*
	     * occationaly the auth can get stuck only in host
	     * this especially happens in cases like
	     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	     */
	    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.hostname = authInHost.shift();
	      result.host = result.hostname;
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (srcPath.length > 0) {
	    result.pathname = srcPath.join('/');
	  } else {
	    result.pathname = null;
	    result.path = null;
	  }

	  // to support request.http
	  if (result.pathname !== null || result.search !== null) {
	    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function () {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) { this.hostname = host; }
	};

	var parse$1 = urlParse;
	var resolve = urlResolve;
	var resolveObject = urlResolveObject;
	var format = urlFormat;

	var Url_1 = Url;

	var url = {
		parse: parse$1,
		resolve: resolve,
		resolveObject: resolveObject,
		format: format,
		Url: Url_1
	};

	/**
	 * The prefix that denotes a URL is for a retina asset.
	 *
	 * @static
	 * @name RETINA_PREFIX
	 * @memberof PIXI.settings
	 * @type {RegExp}
	 * @default /@([0-9\.]+)x/
	 * @example `@2x`
	 */
	settings.settings.RETINA_PREFIX = /@([0-9\.]+)x/;
	/**
	 * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported` function.
	 * For most scenarios this should be left as true, as otherwise the user may have a poor experience.
	 * However, it can be useful to disable under certain scenarios, such as headless unit tests.
	 *
	 * @static
	 * @name FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
	 * @memberof PIXI.settings
	 * @type {boolean}
	 * @default true
	 */
	settings.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = true;

	var saidHello = false;
	var VERSION = '5.3.12';
	/**
	 * Skips the hello message of renderers that are created after this is run.
	 *
	 * @function skipHello
	 * @memberof PIXI.utils
	 */
	function skipHello() {
	    saidHello = true;
	}
	/**
	 * Logs out the version and renderer information for this running instance of PIXI.
	 * If you don't want to see this message you can run `PIXI.utils.skipHello()` before
	 * creating your renderer. Keep in mind that doing that will forever make you a jerk face.
	 *
	 * @static
	 * @function sayHello
	 * @memberof PIXI.utils
	 * @param {string} type - The string renderer type to log.
	 */
	function sayHello(type) {
	    var _a;
	    if (saidHello) {
	        return;
	    }
	    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	        var args = [
	            "\n %c %c %c PixiJS " + VERSION + " - \u2730 " + type + " \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 \n\n",
	            'background: #ff66a5; padding:5px 0;',
	            'background: #ff66a5; padding:5px 0;',
	            'color: #ff66a5; background: #030307; padding:5px 0;',
	            'background: #ff66a5; padding:5px 0;',
	            'background: #ffc3dc; padding:5px 0;',
	            'background: #ff66a5; padding:5px 0;',
	            'color: #ff2424; background: #fff; padding:5px 0;',
	            'color: #ff2424; background: #fff; padding:5px 0;',
	            'color: #ff2424; background: #fff; padding:5px 0;' ];
	        (_a = window.console).log.apply(_a, args);
	    }
	    else if (window.console) {
	        window.console.log("PixiJS " + VERSION + " - " + type + " - http://www.pixijs.com/");
	    }
	    saidHello = true;
	}

	var supported;
	/**
	 * Helper for checking for WebGL support.
	 *
	 * @memberof PIXI.utils
	 * @function isWebGLSupported
	 * @return {boolean} Is WebGL supported.
	 */
	function isWebGLSupported() {
	    if (typeof supported === 'undefined') {
	        supported = (function supported() {
	            var contextOptions = {
	                stencil: true,
	                failIfMajorPerformanceCaveat: settings.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT,
	            };
	            try {
	                if (!window.WebGLRenderingContext) {
	                    return false;
	                }
	                var canvas = document.createElement('canvas');
	                var gl = (canvas.getContext('webgl', contextOptions)
	                    || canvas.getContext('experimental-webgl', contextOptions));
	                var success = !!(gl && gl.getContextAttributes().stencil);
	                if (gl) {
	                    var loseContext = gl.getExtension('WEBGL_lose_context');
	                    if (loseContext) {
	                        loseContext.loseContext();
	                    }
	                }
	                gl = null;
	                return success;
	            }
	            catch (e) {
	                return false;
	            }
	        })();
	    }
	    return supported;
	}

	/**
	 * Converts a hexadecimal color number to an [R, G, B] array of normalized floats (numbers from 0.0 to 1.0).
	 *
	 * @example
	 * PIXI.utils.hex2rgb(0xffffff); // returns [1, 1, 1]
	 * @memberof PIXI.utils
	 * @function hex2rgb
	 * @param {number} hex - The hexadecimal number to convert
	 * @param  {number[]} [out=[]] - If supplied, this array will be used rather than returning a new one
	 * @return {number[]} An array representing the [R, G, B] of the color where all values are floats.
	 */
	function hex2rgb(hex, out) {
	    if (out === void 0) { out = []; }
	    out[0] = ((hex >> 16) & 0xFF) / 255;
	    out[1] = ((hex >> 8) & 0xFF) / 255;
	    out[2] = (hex & 0xFF) / 255;
	    return out;
	}
	/**
	 * Converts a hexadecimal color number to a string.
	 *
	 * @example
	 * PIXI.utils.hex2string(0xffffff); // returns "#ffffff"
	 * @memberof PIXI.utils
	 * @function hex2string
	 * @param {number} hex - Number in hex (e.g., `0xffffff`)
	 * @return {string} The string color (e.g., `"#ffffff"`).
	 */
	function hex2string(hex) {
	    var hexString = hex.toString(16);
	    hexString = '000000'.substr(0, 6 - hexString.length) + hexString;
	    return "#" + hexString;
	}
	/**
	 * Converts a hexadecimal string to a hexadecimal color number.
	 *
	 * @example
	 * PIXI.utils.string2hex("#ffffff"); // returns 0xffffff
	 * @memberof PIXI.utils
	 * @function string2hex
	 * @param {string} string - The string color (e.g., `"#ffffff"`)
	 * @return {number} Number in hexadecimal.
	 */
	function string2hex(string) {
	    if (typeof string === 'string' && string[0] === '#') {
	        string = string.substr(1);
	    }
	    return parseInt(string, 16);
	}
	/**
	 * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
	 *
	 * @example
	 * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
	 * @memberof PIXI.utils
	 * @function rgb2hex
	 * @param {number[]} rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
	 * @return {number} Number in hexadecimal.
	 */
	function rgb2hex(rgb) {
	    return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
	}

	/**
	 * Corrects PixiJS blend, takes premultiplied alpha into account
	 *
	 * @memberof PIXI.utils
	 * @function mapPremultipliedBlendModes
	 * @private
	 * @return {Array<number[]>} Mapped modes.
	 */
	function mapPremultipliedBlendModes() {
	    var pm = [];
	    var npm = [];
	    for (var i = 0; i < 32; i++) {
	        pm[i] = i;
	        npm[i] = i;
	    }
	    pm[constants.BLEND_MODES.NORMAL_NPM] = constants.BLEND_MODES.NORMAL;
	    pm[constants.BLEND_MODES.ADD_NPM] = constants.BLEND_MODES.ADD;
	    pm[constants.BLEND_MODES.SCREEN_NPM] = constants.BLEND_MODES.SCREEN;
	    npm[constants.BLEND_MODES.NORMAL] = constants.BLEND_MODES.NORMAL_NPM;
	    npm[constants.BLEND_MODES.ADD] = constants.BLEND_MODES.ADD_NPM;
	    npm[constants.BLEND_MODES.SCREEN] = constants.BLEND_MODES.SCREEN_NPM;
	    var array = [];
	    array.push(npm);
	    array.push(pm);
	    return array;
	}
	/**
	 * maps premultiply flag and blendMode to adjusted blendMode
	 * @memberof PIXI.utils
	 * @const premultiplyBlendMode
	 * @type {Array<number[]>}
	 */
	var premultiplyBlendMode = mapPremultipliedBlendModes();
	/**
	 * changes blendMode according to texture format
	 *
	 * @memberof PIXI.utils
	 * @function correctBlendMode
	 * @param {number} blendMode - supposed blend mode
	 * @param {boolean} premultiplied - whether source is premultiplied
	 * @returns {number} true blend mode for this texture
	 */
	function correctBlendMode(blendMode, premultiplied) {
	    return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
	}
	/**
	 * combines rgb and alpha to out array
	 *
	 * @memberof PIXI.utils
	 * @function premultiplyRgba
	 * @param {Float32Array|number[]} rgb - input rgb
	 * @param {number} alpha - alpha param
	 * @param {Float32Array} [out] - output
	 * @param {boolean} [premultiply=true] - do premultiply it
	 * @returns {Float32Array} vec4 rgba
	 */
	function premultiplyRgba(rgb, alpha, out, premultiply) {
	    out = out || new Float32Array(4);
	    if (premultiply || premultiply === undefined) {
	        out[0] = rgb[0] * alpha;
	        out[1] = rgb[1] * alpha;
	        out[2] = rgb[2] * alpha;
	    }
	    else {
	        out[0] = rgb[0];
	        out[1] = rgb[1];
	        out[2] = rgb[2];
	    }
	    out[3] = alpha;
	    return out;
	}
	/**
	 * premultiplies tint
	 *
	 * @memberof PIXI.utils
	 * @function premultiplyTint
	 * @param {number} tint - integer RGB
	 * @param {number} alpha - floating point alpha (0.0-1.0)
	 * @returns {number} tint multiplied by alpha
	 */
	function premultiplyTint(tint, alpha) {
	    if (alpha === 1.0) {
	        return (alpha * 255 << 24) + tint;
	    }
	    if (alpha === 0.0) {
	        return 0;
	    }
	    var R = ((tint >> 16) & 0xFF);
	    var G = ((tint >> 8) & 0xFF);
	    var B = (tint & 0xFF);
	    R = ((R * alpha) + 0.5) | 0;
	    G = ((G * alpha) + 0.5) | 0;
	    B = ((B * alpha) + 0.5) | 0;
	    return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
	}
	/**
	 * converts integer tint and float alpha to vec4 form, premultiplies by default
	 *
	 * @memberof PIXI.utils
	 * @function premultiplyTintToRgba
	 * @param {number} tint - input tint
	 * @param {number} alpha - alpha param
	 * @param {Float32Array} [out] output
	 * @param {boolean} [premultiply=true] - do premultiply it
	 * @returns {Float32Array} vec4 rgba
	 */
	function premultiplyTintToRgba(tint, alpha, out, premultiply) {
	    out = out || new Float32Array(4);
	    out[0] = ((tint >> 16) & 0xFF) / 255.0;
	    out[1] = ((tint >> 8) & 0xFF) / 255.0;
	    out[2] = (tint & 0xFF) / 255.0;
	    if (premultiply || premultiply === undefined) {
	        out[0] *= alpha;
	        out[1] *= alpha;
	        out[2] *= alpha;
	    }
	    out[3] = alpha;
	    return out;
	}

	/**
	 * Generic Mask Stack data structure
	 *
	 * @memberof PIXI.utils
	 * @function createIndicesForQuads
	 * @param {number} size - Number of quads
	 * @param {Uint16Array|Uint32Array} [outBuffer] - Buffer for output, length has to be `6 * size`
	 * @return {Uint16Array|Uint32Array} - Resulting index buffer
	 */
	function createIndicesForQuads(size, outBuffer) {
	    if (outBuffer === void 0) { outBuffer = null; }
	    // the total number of indices in our array, there are 6 points per quad.
	    var totalIndices = size * 6;
	    outBuffer = outBuffer || new Uint16Array(totalIndices);
	    if (outBuffer.length !== totalIndices) {
	        throw new Error("Out buffer length is incorrect, got " + outBuffer.length + " and expected " + totalIndices);
	    }
	    // fill the indices with the quads to draw
	    for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
	        outBuffer[i + 0] = j + 0;
	        outBuffer[i + 1] = j + 1;
	        outBuffer[i + 2] = j + 2;
	        outBuffer[i + 3] = j + 0;
	        outBuffer[i + 4] = j + 2;
	        outBuffer[i + 5] = j + 3;
	    }
	    return outBuffer;
	}

	function getBufferType(array) {
	    if (array.BYTES_PER_ELEMENT === 4) {
	        if (array instanceof Float32Array) {
	            return 'Float32Array';
	        }
	        else if (array instanceof Uint32Array) {
	            return 'Uint32Array';
	        }
	        return 'Int32Array';
	    }
	    else if (array.BYTES_PER_ELEMENT === 2) {
	        if (array instanceof Uint16Array) {
	            return 'Uint16Array';
	        }
	    }
	    else if (array.BYTES_PER_ELEMENT === 1) {
	        if (array instanceof Uint8Array) {
	            return 'Uint8Array';
	        }
	    }
	    // TODO map out the rest of the array elements!
	    return null;
	}

	/* eslint-disable object-shorthand */
	var map = { Float32Array: Float32Array, Uint32Array: Uint32Array, Int32Array: Int32Array, Uint8Array: Uint8Array };
	function interleaveTypedArrays(arrays, sizes) {
	    var outSize = 0;
	    var stride = 0;
	    var views = {};
	    for (var i = 0; i < arrays.length; i++) {
	        stride += sizes[i];
	        outSize += arrays[i].length;
	    }
	    var buffer = new ArrayBuffer(outSize * 4);
	    var out = null;
	    var littleOffset = 0;
	    for (var i = 0; i < arrays.length; i++) {
	        var size = sizes[i];
	        var array = arrays[i];
	        /*
	        @todo This is unsafe casting but consistent with how the code worked previously. Should it stay this way
	              or should and `getBufferTypeUnsafe` function be exposed that throws an Error if unsupported type is passed?
	         */
	        var type = getBufferType(array);
	        if (!views[type]) {
	            views[type] = new map[type](buffer);
	        }
	        out = views[type];
	        for (var j = 0; j < array.length; j++) {
	            var indexStart = ((j / size | 0) * stride) + littleOffset;
	            var index = j % size;
	            out[indexStart + index] = array[j];
	        }
	        littleOffset += size;
	    }
	    return new Float32Array(buffer);
	}

	// Taken from the bit-twiddle package
	/**
	 * Rounds to next power of two.
	 *
	 * @function nextPow2
	 * @memberof PIXI.utils
	 * @param {number} v - input value
	 * @return {number}
	 */
	function nextPow2(v) {
	    v += v === 0 ? 1 : 0;
	    --v;
	    v |= v >>> 1;
	    v |= v >>> 2;
	    v |= v >>> 4;
	    v |= v >>> 8;
	    v |= v >>> 16;
	    return v + 1;
	}
	/**
	 * Checks if a number is a power of two.
	 *
	 * @function isPow2
	 * @memberof PIXI.utils
	 * @param {number} v - input value
	 * @return {boolean} `true` if value is power of two
	 */
	function isPow2(v) {
	    return !(v & (v - 1)) && (!!v);
	}
	/**
	 * Computes ceil of log base 2
	 *
	 * @function log2
	 * @memberof PIXI.utils
	 * @param {number} v - input value
	 * @return {number} logarithm base 2
	 */
	function log2(v) {
	    var r = (v > 0xFFFF ? 1 : 0) << 4;
	    v >>>= r;
	    var shift = (v > 0xFF ? 1 : 0) << 3;
	    v >>>= shift;
	    r |= shift;
	    shift = (v > 0xF ? 1 : 0) << 2;
	    v >>>= shift;
	    r |= shift;
	    shift = (v > 0x3 ? 1 : 0) << 1;
	    v >>>= shift;
	    r |= shift;
	    return r | (v >> 1);
	}

	/**
	 * Remove items from a javascript array without generating garbage
	 *
	 * @function removeItems
	 * @memberof PIXI.utils
	 * @param {Array<any>} arr - Array to remove elements from
	 * @param {number} startIdx - starting index
	 * @param {number} removeCount - how many to remove
	 */
	function removeItems(arr, startIdx, removeCount) {
	    var length = arr.length;
	    var i;
	    if (startIdx >= length || removeCount === 0) {
	        return;
	    }
	    removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount);
	    var len = length - removeCount;
	    for (i = startIdx; i < len; ++i) {
	        arr[i] = arr[i + removeCount];
	    }
	    arr.length = len;
	}

	/**
	 * Returns sign of number
	 *
	 * @memberof PIXI.utils
	 * @function sign
	 * @param {number} n - the number to check the sign of
	 * @returns {number} 0 if `n` is 0, -1 if `n` is negative, 1 if `n` is positive
	 */
	function sign$1(n) {
	    if (n === 0)
	        { return 0; }
	    return n < 0 ? -1 : 1;
	}

	var nextUid = 0;
	/**
	 * Gets the next unique identifier
	 *
	 * @memberof PIXI.utils
	 * @function uid
	 * @return {number} The next unique identifier to use.
	 */
	function uid() {
	    return ++nextUid;
	}

	// A map of warning messages already fired
	var warnings = {};
	/**
	 * Helper for warning developers about deprecated features & settings.
	 * A stack track for warnings is given; useful for tracking-down where
	 * deprecated methods/properties/classes are being used within the code.
	 *
	 * @memberof PIXI.utils
	 * @function deprecation
	 * @param {string} version - The version where the feature became deprecated
	 * @param {string} message - Message should include what is deprecated, where, and the new solution
	 * @param {number} [ignoreDepth=3] - The number of steps to ignore at the top of the error stack
	 *        this is mostly to ignore internal deprecation calls.
	 */
	function deprecation(version, message, ignoreDepth) {
	    if (ignoreDepth === void 0) { ignoreDepth = 3; }
	    // Ignore duplicat
	    if (warnings[message]) {
	        return;
	    }
	    /* eslint-disable no-console */
	    var stack = new Error().stack;
	    // Handle IE < 10 and Safari < 6
	    if (typeof stack === 'undefined') {
	        console.warn('PixiJS Deprecation Warning: ', message + "\nDeprecated since v" + version);
	    }
	    else {
	        // chop off the stack trace which includes PixiJS internal calls
	        stack = stack.split('\n').splice(ignoreDepth).join('\n');
	        if (console.groupCollapsed) {
	            console.groupCollapsed('%cPixiJS Deprecation Warning: %c%s', 'color:#614108;background:#fffbe6', 'font-weight:normal;color:#614108;background:#fffbe6', message + "\nDeprecated since v" + version);
	            console.warn(stack);
	            console.groupEnd();
	        }
	        else {
	            console.warn('PixiJS Deprecation Warning: ', message + "\nDeprecated since v" + version);
	            console.warn(stack);
	        }
	    }
	    /* eslint-enable no-console */
	    warnings[message] = true;
	}

	/**
	 * @todo Describe property usage
	 *
	 * @static
	 * @name ProgramCache
	 * @memberof PIXI.utils
	 * @type {Object}
	 */
	var ProgramCache = {};
	/**
	 * @todo Describe property usage
	 *
	 * @static
	 * @name TextureCache
	 * @memberof PIXI.utils
	 * @type {Object}
	 */
	var TextureCache = Object.create(null);
	/**
	 * @todo Describe property usage
	 *
	 * @static
	 * @name BaseTextureCache
	 * @memberof PIXI.utils
	 * @type {Object}
	 */
	var BaseTextureCache = Object.create(null);
	/**
	 * Destroys all texture in the cache
	 *
	 * @memberof PIXI.utils
	 * @function destroyTextureCache
	 */
	function destroyTextureCache() {
	    var key;
	    for (key in TextureCache) {
	        TextureCache[key].destroy();
	    }
	    for (key in BaseTextureCache) {
	        BaseTextureCache[key].destroy();
	    }
	}
	/**
	 * Removes all textures from cache, but does not destroy them
	 *
	 * @memberof PIXI.utils
	 * @function clearTextureCache
	 */
	function clearTextureCache() {
	    var key;
	    for (key in TextureCache) {
	        delete TextureCache[key];
	    }
	    for (key in BaseTextureCache) {
	        delete BaseTextureCache[key];
	    }
	}

	/**
	 * Creates a Canvas element of the given size to be used as a target for rendering to.
	 *
	 * @class
	 * @memberof PIXI.utils
	 */
	var CanvasRenderTarget = /** @class */ (function () {
	    /**
	     * @param {number} width - the width for the newly created canvas
	     * @param {number} height - the height for the newly created canvas
	     * @param {number} [resolution=1] - The resolution / device pixel ratio of the canvas
	     */
	    function CanvasRenderTarget(width, height, resolution) {
	        /**
	         * The Canvas object that belongs to this CanvasRenderTarget.
	         *
	         * @member {HTMLCanvasElement}
	         */
	        this.canvas = document.createElement('canvas');
	        /**
	         * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
	         *
	         * @member {CanvasRenderingContext2D}
	         */
	        this.context = this.canvas.getContext('2d');
	        this.resolution = resolution || settings.settings.RESOLUTION;
	        this.resize(width, height);
	    }
	    /**
	     * Clears the canvas that was created by the CanvasRenderTarget class.
	     *
	     * @private
	     */
	    CanvasRenderTarget.prototype.clear = function () {
	        this.context.setTransform(1, 0, 0, 1, 0, 0);
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    };
	    /**
	     * Resizes the canvas to the specified width and height.
	     *
	     * @param {number} width - the new width of the canvas
	     * @param {number} height - the new height of the canvas
	     */
	    CanvasRenderTarget.prototype.resize = function (width, height) {
	        this.canvas.width = width * this.resolution;
	        this.canvas.height = height * this.resolution;
	    };
	    /**
	     * Destroys this canvas.
	     *
	     */
	    CanvasRenderTarget.prototype.destroy = function () {
	        this.context = null;
	        this.canvas = null;
	    };
	    Object.defineProperty(CanvasRenderTarget.prototype, "width", {
	        /**
	         * The width of the canvas buffer in pixels.
	         *
	         * @member {number}
	         */
	        get: function () {
	            return this.canvas.width;
	        },
	        set: function (val) {
	            this.canvas.width = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(CanvasRenderTarget.prototype, "height", {
	        /**
	         * The height of the canvas buffer in pixels.
	         *
	         * @member {number}
	         */
	        get: function () {
	            return this.canvas.height;
	        },
	        set: function (val) {
	            this.canvas.height = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return CanvasRenderTarget;
	}());

	/**
	 * Trim transparent borders from a canvas
	 *
	 * @memberof PIXI.utils
	 * @function trimCanvas
	 * @param {HTMLCanvasElement} canvas - the canvas to trim
	 * @returns {object} Trim data
	 */
	function trimCanvas(canvas) {
	    // https://gist.github.com/remy/784508
	    var width = canvas.width;
	    var height = canvas.height;
	    var context = canvas.getContext('2d');
	    var imageData = context.getImageData(0, 0, width, height);
	    var pixels = imageData.data;
	    var len = pixels.length;
	    var bound = {
	        top: null,
	        left: null,
	        right: null,
	        bottom: null,
	    };
	    var data = null;
	    var i;
	    var x;
	    var y;
	    for (i = 0; i < len; i += 4) {
	        if (pixels[i + 3] !== 0) {
	            x = (i / 4) % width;
	            y = ~~((i / 4) / width);
	            if (bound.top === null) {
	                bound.top = y;
	            }
	            if (bound.left === null) {
	                bound.left = x;
	            }
	            else if (x < bound.left) {
	                bound.left = x;
	            }
	            if (bound.right === null) {
	                bound.right = x + 1;
	            }
	            else if (bound.right < x) {
	                bound.right = x + 1;
	            }
	            if (bound.bottom === null) {
	                bound.bottom = y;
	            }
	            else if (bound.bottom < y) {
	                bound.bottom = y;
	            }
	        }
	    }
	    if (bound.top !== null) {
	        width = bound.right - bound.left;
	        height = bound.bottom - bound.top + 1;
	        data = context.getImageData(bound.left, bound.top, width, height);
	    }
	    return {
	        height: height,
	        width: width,
	        data: data,
	    };
	}

	/**
	 * Regexp for data URI.
	 * Based on: {@link https://github.com/ragingwind/data-uri-regex}
	 *
	 * @static
	 * @constant {RegExp|string} DATA_URI
	 * @memberof PIXI
	 * @example data:image/png;base64
	 */
	var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

	/**
	 * @memberof PIXI.utils
	 * @interface DecomposedDataUri
	 */
	/**
	 * type, eg. `image`
	 * @memberof PIXI.utils.DecomposedDataUri#
	 * @member {string} mediaType
	 */
	/**
	 * Sub type, eg. `png`
	 * @memberof PIXI.utils.DecomposedDataUri#
	 * @member {string} subType
	 */
	/**
	 * @memberof PIXI.utils.DecomposedDataUri#
	 * @member {string} charset
	 */
	/**
	 * Data encoding, eg. `base64`
	 * @memberof PIXI.utils.DecomposedDataUri#
	 * @member {string} encoding
	 */
	/**
	 * The actual data
	 * @memberof PIXI.utils.DecomposedDataUri#
	 * @member {string} data
	 */
	/**
	 * Split a data URI into components. Returns undefined if
	 * parameter `dataUri` is not a valid data URI.
	 *
	 * @memberof PIXI.utils
	 * @function decomposeDataUri
	 * @param {string} dataUri - the data URI to check
	 * @return {PIXI.utils.DecomposedDataUri|undefined} The decomposed data uri or undefined
	 */
	function decomposeDataUri(dataUri) {
	    var dataUriMatch = DATA_URI.exec(dataUri);
	    if (dataUriMatch) {
	        return {
	            mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : undefined,
	            subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : undefined,
	            charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : undefined,
	            encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : undefined,
	            data: dataUriMatch[5],
	        };
	    }
	    return undefined;
	}

	var tempAnchor;
	/**
	 * Sets the `crossOrigin` property for this resource based on if the url
	 * for this resource is cross-origin. If crossOrigin was manually set, this
	 * function does nothing.
	 * Nipped from the resource loader!
	 *
	 * @ignore
	 * @param {string} url - The url to test.
	 * @param {object} [loc=window.location] - The location object to test against.
	 * @return {string} The crossOrigin value to use (or empty string for none).
	 */
	function determineCrossOrigin(url, loc) {
	    if (loc === void 0) { loc = window.location; }
	    // data: and javascript: urls are considered same-origin
	    if (url.indexOf('data:') === 0) {
	        return '';
	    }
	    // default is window.location
	    loc = loc || window.location;
	    if (!tempAnchor) {
	        tempAnchor = document.createElement('a');
	    }
	    // let the browser determine the full href for the url of this resource and then
	    // parse with the node url lib, we can't use the properties of the anchor element
	    // because they don't work in IE9 :(
	    tempAnchor.href = url;
	    var parsedUrl = parse$1(tempAnchor.href);
	    var samePort = (!parsedUrl.port && loc.port === '') || (parsedUrl.port === loc.port);
	    // if cross origin
	    if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
	        return 'anonymous';
	    }
	    return '';
	}

	/**
	 * get the resolution / device pixel ratio of an asset by looking for the prefix
	 * used by spritesheets and image urls
	 *
	 * @memberof PIXI.utils
	 * @function getResolutionOfUrl
	 * @param {string} url - the image path
	 * @param {number} [defaultValue=1] - the defaultValue if no filename prefix is set.
	 * @return {number} resolution / device pixel ratio of an asset
	 */
	function getResolutionOfUrl(url, defaultValue) {
	    var resolution = settings.settings.RETINA_PREFIX.exec(url);
	    if (resolution) {
	        return parseFloat(resolution[1]);
	    }
	    return defaultValue !== undefined ? defaultValue : 1;
	}

	/**
	 * Generalized convenience utilities for PIXI.
	 * @example
	 * // Extend PIXI's internal Event Emitter.
	 * class MyEmitter extends PIXI.utils.EventEmitter {
	 *   constructor() {
	 *      super();
	 *      console.log("Emitter created!");
	 *   }
	 * }
	 *
	 * // Get info on current device
	 * console.log(PIXI.utils.isMobile);
	 *
	 * // Convert hex color to string
	 * console.log(PIXI.utils.hex2string(0xff00ff)); // returns: "#ff00ff"
	 * @namespace PIXI.utils
	 */

	Object.defineProperty(exports, 'isMobile', {
		enumerable: true,
		get: function () {
			return settings.isMobile;
		}
	});
	exports.BaseTextureCache = BaseTextureCache;
	exports.CanvasRenderTarget = CanvasRenderTarget;
	exports.DATA_URI = DATA_URI;
	exports.EventEmitter = eventemitter3;
	exports.ProgramCache = ProgramCache;
	exports.TextureCache = TextureCache;
	exports.clearTextureCache = clearTextureCache;
	exports.correctBlendMode = correctBlendMode;
	exports.createIndicesForQuads = createIndicesForQuads;
	exports.decomposeDataUri = decomposeDataUri;
	exports.deprecation = deprecation;
	exports.destroyTextureCache = destroyTextureCache;
	exports.determineCrossOrigin = determineCrossOrigin;
	exports.earcut = earcut_1;
	exports.getBufferType = getBufferType;
	exports.getResolutionOfUrl = getResolutionOfUrl;
	exports.hex2rgb = hex2rgb;
	exports.hex2string = hex2string;
	exports.interleaveTypedArrays = interleaveTypedArrays;
	exports.isPow2 = isPow2;
	exports.isWebGLSupported = isWebGLSupported;
	exports.log2 = log2;
	exports.nextPow2 = nextPow2;
	exports.premultiplyBlendMode = premultiplyBlendMode;
	exports.premultiplyRgba = premultiplyRgba;
	exports.premultiplyTint = premultiplyTint;
	exports.premultiplyTintToRgba = premultiplyTintToRgba;
	exports.removeItems = removeItems;
	exports.rgb2hex = rgb2hex;
	exports.sayHello = sayHello;
	exports.sign = sign$1;
	exports.skipHello = skipHello;
	exports.string2hex = string2hex;
	exports.trimCanvas = trimCanvas;
	exports.uid = uid;
	exports.url = url;

	return exports;

}({}, PIXI, PIXI));
Object.assign(this.PIXI.utils, _pixi_utils);
//# sourceMappingURL=utils.js.map
