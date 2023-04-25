/* !
 * @pixi/polyfill - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/polyfill is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function ()
{
    const commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire()
    {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function unwrapExports(x)
    {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }

    function createCommonjsModule(fn, module)
    {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    function getCjsExportFromNamespace(n)
    {
        return n && n.default || n;
    }

    const promise = createCommonjsModule(function (module, exports)
    {
        (function (global)
        {
            //
            // Check for native Promise and it has correct interface
            //

            const NativePromise = global.Promise;
            const nativePromiseSupported
	  = NativePromise
	  // Some of these methods are missing from
	  // Firefox/Chrome experimental implementations
	  && 'resolve' in NativePromise
	  && 'reject' in NativePromise
	  && 'all' in NativePromise
	  && 'race' in NativePromise
	  // Older version of the spec had a resolver object
	  // as the arg rather than a function
	  && (function ()
	  {
	    let resolve;

	    new NativePromise(function (r) { resolve = r; });

	      return typeof resolve === 'function';
	  })();

            //
            // export if necessary
            //

            if ('object' !== 'undefined' && exports)
            {
	  // node.js
	  exports.Promise = nativePromiseSupported ? NativePromise : Promise;
	  exports.Polyfill = Promise;
            }
            else
            {
	  // AMD
	  if (typeof undefined === 'function' && undefined.amd)
	  {
	    undefined(function ()
                    {
	      return nativePromiseSupported ? NativePromise : Promise;
	    });
	  }
	  else
	  {
	    // in browser add to global
	    if (!nativePromiseSupported)
	      { global.Promise = Promise; }
	  }
            }

            //
            // Polyfill
            //

            const PENDING = 'pending';
            const SEALED = 'sealed';
            const FULFILLED = 'fulfilled';
            const REJECTED = 'rejected';
            const NOOP = function () {};

            function isArray(value)
            {
	  return Object.prototype.toString.call(value) === '[object Array]';
            }

            // async calls
            const asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
            let asyncQueue = [];
            let asyncTimer;

            function asyncFlush()
            {
	  // run promise callbacks
	  for (let i = 0; i < asyncQueue.length; i++)
	    { asyncQueue[i][0](asyncQueue[i][1]); }

	  // reset async asyncQueue
	  asyncQueue = [];
	  asyncTimer = false;
            }

            function asyncCall(callback, arg)
            {
	  asyncQueue.push([callback, arg]);

	  if (!asyncTimer)
	  {
	    asyncTimer = true;
	    asyncSetTimer(asyncFlush, 0);
	  }
            }

            function invokeResolver(resolver, promise)
            {
	  function resolvePromise(value)
                {
	    resolve(promise, value);
	  }

	  function rejectPromise(reason)
                {
	    reject(promise, reason);
	  }

	  try
                {
	    resolver(resolvePromise, rejectPromise);
	  }
                catch (e)
                {
	    rejectPromise(e);
	  }
            }

            function invokeCallback(subscriber)
            {
	  const owner = subscriber.owner;
	  let settled = owner.state_;
	  let value = owner.data_;
	  const callback = subscriber[settled];
	  const promise = subscriber.then;

	  if (typeof callback === 'function')
	  {
	    settled = FULFILLED;
	    try
                    {
	      value = callback(value);
	    }
                    catch (e)
                    {
	      reject(promise, e);
	    }
	  }

	  if (!handleThenable(promise, value))
	  {
	    if (settled === FULFILLED)
	      { resolve(promise, value); }

	    if (settled === REJECTED)
	      { reject(promise, value); }
	  }
            }

            function handleThenable(promise, value)
            {
	  let resolved;

	  try
                {
	    if (promise === value)
	      { throw new TypeError('A promises callback cannot return that same promise.'); }

	    if (value && (typeof value === 'function' || typeof value === 'object'))
	    {
	      const then = value.then; // then should be retrived only once

	      if (typeof then === 'function')
	      {
	        then.call(value, function (val)
                            {
	          if (!resolved)
	          {
	            resolved = true;

	            if (value !== val)
	              { resolve(promise, val); }
	            else
	              { fulfill(promise, val); }
	          }
	        }, function (reason)
                            {
	          if (!resolved)
	          {
	            resolved = true;

	            reject(promise, reason);
	          }
	        });

	        return true;
	      }
	    }
	  }
                catch (e)
                {
	    if (!resolved)
	      { reject(promise, e); }

	    return true;
	  }

	  return false;
            }

            function resolve(promise, value)
            {
	  if (promise === value || !handleThenable(promise, value))
	    { fulfill(promise, value); }
            }

            function fulfill(promise, value)
            {
	  if (promise.state_ === PENDING)
	  {
	    promise.state_ = SEALED;
	    promise.data_ = value;

	    asyncCall(publishFulfillment, promise);
	  }
            }

            function reject(promise, reason)
            {
	  if (promise.state_ === PENDING)
	  {
	    promise.state_ = SEALED;
	    promise.data_ = reason;

	    asyncCall(publishRejection, promise);
	  }
            }

            function publish(promise)
            {
	  const callbacks = promise.then_;

	  promise.then_ = undefined;

	  for (let i = 0; i < callbacks.length; i++)
                {
	    invokeCallback(callbacks[i]);
	  }
            }

            function publishFulfillment(promise)
            {
	  promise.state_ = FULFILLED;
	  publish(promise);
            }

            function publishRejection(promise)
            {
	  promise.state_ = REJECTED;
	  publish(promise);
            }

            /**
	* @class
	*/
            function Promise(resolver)
            {
	  if (typeof resolver !== 'function')
	    { throw new TypeError('Promise constructor takes a function argument'); }

	  if (this instanceof Promise === false)
	    { throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.'); }

	  this.then_ = [];

	  invokeResolver(resolver, this);
            }

            Promise.prototype = {
	  constructor: Promise,

	  state_: PENDING,
	  then_: null,
	  data_: undefined,

	  then(onFulfillment, onRejection)
                {
	    const subscriber = {
	      owner: this,
	      then: new this.constructor(NOOP),
	      fulfilled: onFulfillment,
	      rejected: onRejection
	    };

	    if (this.state_ === FULFILLED || this.state_ === REJECTED)
	    {
	      // already resolved, call callback async
	      asyncCall(invokeCallback, subscriber);
	    }
	    else
	    {
	      // subscribe
	      this.then_.push(subscriber);
	    }

	    return subscriber.then;
	  },

	  catch(onRejection)
                {
	    return this.then(null, onRejection);
	  }
            };

            Promise.all = function (promises)
            {
	  const Class = this;

	  if (!isArray(promises))
	    { throw new TypeError('You must pass an array to Promise.all().'); }

	  return new Class(function (resolve, reject)
                {
	    const results = [];
	    let remaining = 0;

	    function resolver(index)
                    {
	      remaining++;

                        return function (value)
                        {
	        results[index] = value;
	        if (!--remaining)
	          { resolve(results); }
	      };
	    }

	    for (var i = 0, promise; i < promises.length; i++)
	    {
	      promise = promises[i];

	      if (promise && typeof promise.then === 'function')
	        { promise.then(resolver(i), reject); }
	      else
	        { results[i] = promise; }
	    }

	    if (!remaining)
	      { resolve(results); }
	  });
            };

            Promise.race = function (promises)
            {
	  const Class = this;

	  if (!isArray(promises))
	    { throw new TypeError('You must pass an array to Promise.race().'); }

	  return new Class(function (resolve, reject)
                {
	    for (var i = 0, promise; i < promises.length; i++)
	    {
	      promise = promises[i];

	      if (promise && typeof promise.then === 'function')
	        { promise.then(resolve, reject); }
	      else
	        { resolve(promise); }
	    }
	  });
            };

            Promise.resolve = function (value)
            {
	  const Class = this;

	  if (value && typeof value === 'object' && value.constructor === Class)
	    { return value; }

	  return new Class(function (resolve)
                {
	    resolve(value);
	  });
            };

            Promise.reject = function (reason)
            {
	  const Class = this;

	  return new Class(function (resolve, reject)
                {
	    reject(reason);
	  });
            };
        })(typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : commonjsGlobal);
    });
    const promise_1 = promise.Promise;
    const promise_2 = promise.Polyfill;

    // Support for IE 9 - 11 which does not include Promises
    if (!window.Promise)
    {
	    window.Promise = promise_2;
    }

    /*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

    'use strict';
    /* eslint-disable no-unused-vars */
    const getOwnPropertySymbols = Object.getOwnPropertySymbols;
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val)
    {
        if (val === null || val === undefined)
        {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }

        return Object(val);
    }

    function shouldUseNative()
    {
        try
        {
            if (!Object.assign)
            {
                return false;
            }

            // Detect buggy property enumeration order in older V8 versions.

            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            const test1 = new String('abc'); // eslint-disable-line no-new-wrappers

            test1[5] = 'de';
            if (Object.getOwnPropertyNames(test1)[0] === '5')
            {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            const test2 = {};

            for (let i = 0; i < 10; i++)
            {
                test2[`_${String.fromCharCode(i)}`] = i;
            }
            const order2 = Object.getOwnPropertyNames(test2).map(function (n)
            {
                return test2[n];
            });

            if (order2.join('') !== '0123456789')
            {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            const test3 = {};

            'abcdefghijklmnopqrst'.split('').forEach(function (letter)
            {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join('')
					!== 'abcdefghijklmnopqrst')
            {
                return false;
            }

            return true;
        }
        catch (err)
        {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
        }
    }

    const objectAssign = shouldUseNative() ? Object.assign : function (target, source)
    {
        const arguments$1 = arguments;

        let from;
        const to = toObject(target);
        let symbols;

        for (let s = 1; s < arguments.length; s++)
        {
            from = Object(arguments$1[s]);

            for (const key in from)
            {
                if (hasOwnProperty.call(from, key))
                {
                    to[key] = from[key];
                }
            }

            if (getOwnPropertySymbols)
            {
                symbols = getOwnPropertySymbols(from);
                for (let i = 0; i < symbols.length; i++)
                {
                    if (propIsEnumerable.call(from, symbols[i]))
                    {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }

        return to;
    };

    // References:
    if (!Object.assign)
    {
	    Object.assign = objectAssign;
    }

    'use strict';
    // References:
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // https://gist.github.com/1579671
    // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
    // https://gist.github.com/timhall/4078614
    // https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/requestAnimationFrame
    // Expected to be used with Browserfiy
    // Browserify automatically detects the use of `global` and passes the
    // correct reference of `global`, `self`, and finally `window`
    const ONE_FRAME_TIME = 16;
    // Date.now

    if (!(Date.now && Date.prototype.getTime))
    {
	    Date.now = function now()
        {
	        return new Date().getTime();
	    };
    }
    // performance.now
    if (!(window.performance && window.performance.now))
    {
	    const startTime_1 = Date.now();

	    if (!window.performance)
        {
	        window.performance = {};
	    }
	    window.performance.now = function () { return Date.now() - startTime_1; };
    }
    // requestAnimationFrame
    let lastTime = Date.now();
    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
    {
	    const p = vendors[x];

	    window.requestAnimationFrame = window[`${p}RequestAnimationFrame`];
	    window.cancelAnimationFrame = window[`${p}CancelAnimationFrame`]
	        || window[`${p}CancelRequestAnimationFrame`];
    }
    if (!window.requestAnimationFrame)
    {
	    window.requestAnimationFrame = function (callback)
        {
	        if (typeof callback !== 'function')
            {
	            throw new TypeError(`${callback}is not a function`);
	        }
	        const currentTime = Date.now();
	        let delay = ONE_FRAME_TIME + lastTime - currentTime;

	        if (delay < 0)
            {
	            delay = 0;
	        }
	        lastTime = currentTime;

            return window.setTimeout(function ()
            {
	            lastTime = Date.now();
	            callback(performance.now());
	        }, delay);
	    };
    }
    if (!window.cancelAnimationFrame)
    {
	    window.cancelAnimationFrame = function (id) { return clearTimeout(id); };
    }

    'use strict';
    // References:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    if (!Math.sign)
    {
	    Math.sign = function mathSign(x)
        {
	        x = Number(x);
	        if (x === 0 || isNaN(x))
            {
	            return x;
	        }

            return x > 0 ? 1 : -1;
	    };
    }

    'use strict';
    // References:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    if (!Number.isInteger)
    {
	    Number.isInteger = function numberIsInteger(value)
        {
	        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	    };
    }

    if (!window.ArrayBuffer)
    {
	    window.ArrayBuffer = Array;
    }
    if (!window.Float32Array)
    {
	    window.Float32Array = Array;
    }
    if (!window.Uint32Array)
    {
	    window.Uint32Array = Array;
    }
    if (!window.Uint16Array)
    {
	    window.Uint16Array = Array;
    }
    if (!window.Uint8Array)
    {
	    window.Uint8Array = Array;
    }
    if (!window.Int32Array)
    {
	    window.Int32Array = Array;
    }
})();
// # sourceMappingURL=polyfill.js.map
