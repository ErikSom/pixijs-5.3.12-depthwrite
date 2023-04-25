/* !
 * @pixi/filter-fxaa - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/filter-fxaa is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
this.PIXI.filters = this.PIXI.filters || {};
const _pixi_filter_fxaa = (function (exports, core)
{
    /* ! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b)
    {
        extendStatics = Object.setPrototypeOf
            || ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; })
            || function (d, b) { for (const p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };

        return extendStatics(d, b);
    };

    function __extends(d, b)
    {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function ()
    {
        __assign = Object.assign || function __assign(t)
        {
            const arguments$1 = arguments;

            for (var s, i = 1, n = arguments.length; i < n; i++)
            {
                s = arguments$1[i];
                for (const p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
            }

            return t;
        };

        return __assign.apply(this, arguments);
    };

    function __rest(s, e)
    {
        const t = {};

        for (var p in s)
        {
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            { t[p] = s[p]; }
        }
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        {
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            {
                if (e.indexOf(p[i]) < 0)
                { t[p[i]] = s[p[i]]; }
            }
        }

        return t;
    }

    function __decorate(decorators, target, key, desc)
    {
        const c = arguments.length; let r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc; let
            d;

        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') { r = Reflect.decorate(decorators, target, key, desc); }
        else { for (let i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }

        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator)
    {
        return function (target, key) { decorator(target, key, paramIndex); };
    }

    function __metadata(metadataKey, metadataValue)
    {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') { return Reflect.metadata(metadataKey, metadataValue); }
    }

    function __awaiter(thisArg, _arguments, P, generator)
    {
        return new (P || (P = Promise))(function (resolve, reject)
        {
            function fulfilled(value)
            {
                try { step(generator.next(value)); }
                catch (e) { reject(e); }
            }
            function rejected(value)
            {
                try { step(generator.throw(value)); }
                catch (e) { reject(e); }
            }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body)
    {
        let _ = { label: 0, sent()
        {
            if (t[0] & 1) { throw t[1]; }

            return t[1];
        }, trys: [], ops: [] }; let f; let y; let t; let
            g;

        return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op)
        {
            if (f) { throw new TypeError('Generator is already executing.'); }
            while (_)
            {
                try
                {
                    if (f = 1, y && (t = op[0] & 2 ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
                    if (y = 0, t) { op = [op[0] & 2, t.value]; }
                    switch (op[0])
                    {
                        case 0: case 1: t = op; break;
                        case 4: _.label++;

                            return { value: op[1], done: false };
                        case 5: _.label++; y = op[1]; op = [0]; continue;
                        case 7: op = _.ops.pop(); _.trys.pop(); continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                            if (t[2]) { _.ops.pop(); }
                            _.trys.pop(); continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) { op = [6, e]; y = 0; }
                finally { f = t = 0; }
            }
            if (op[0] & 5) { throw op[1]; }

            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports)
    {
        for (const p in m) { if (!exports.hasOwnProperty(p)) { exports[p] = m[p]; } }
    }

    function __values(o)
    {
        const m = typeof Symbol === 'function' && o[Symbol.iterator]; let
            i = 0;

        if (m) { return m.call(o); }

        return {
            next()
            {
                if (o && i >= o.length) { o = void 0; }

                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n)
    {
        let m = typeof Symbol === 'function' && o[Symbol.iterator];

        if (!m) { return o; }
        const i = m.call(o); let r; const ar = []; let
            e;

        try
        {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) { ar.push(r.value); }
        }
        catch (error) { e = { error }; }
        finally
        {
            try
            {
                if (r && !r.done && (m = i.return)) { m.call(i); }
            }
            finally { if (e) { throw e.error; } }
        }

        return ar;
    }

    function __spread()
    {
        const arguments$1 = arguments;

        for (var ar = [], i = 0; i < arguments.length; i++)
        { ar = ar.concat(__read(arguments$1[i])); }

        return ar;
    }

    function __await(v)
    {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator)
    {
        if (!Symbol.asyncIterator) { throw new TypeError('Symbol.asyncIterator is not defined.'); }
        const g = generator.apply(thisArg, _arguments || []); let i; const
            q = [];

        return i = {}, verb('next'), verb('throw'), verb('return'), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; } }
        function resume(n, v)
        {
            try { step(g[n](v)); }
            catch (e) { settle(q[0][3], e); }
        }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume('next', value); }
        function reject(value) { resume('throw', value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) { resume(q[0][0], q[0][1]); } }
    }

    function __asyncDelegator(o)
    {
        let i; let
            p;

        return i = {}, verb('next'), verb('throw', function (e) { throw e; }), verb('return'), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === 'return' } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o)
    {
        if (!Symbol.asyncIterator) { throw new TypeError('Symbol.asyncIterator is not defined.'); }
        const m = o[Symbol.asyncIterator]; let
            i;

        return m ? m.call(o) : (o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator](), i = {}, verb('next'), verb('throw'), verb('return'), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw)
    {
        if (Object.defineProperty) { Object.defineProperty(cooked, 'raw', { value: raw }); }
        else { cooked.raw = raw; }

        return cooked;
    }

    function __importStar(mod)
    {
        if (mod && mod.__esModule) { return mod; }
        const result = {};

        if (mod != null) { for (const k in mod) { if (Object.hasOwnProperty.call(mod, k)) { result[k] = mod[k]; } } }
        result.default = mod;

        return result;
    }

    function __importDefault(mod)
    {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    const vertex = '\r\nattribute vec2 aVertexPosition;\r\n\r\nuniform mat3 projectionMatrix;\r\n\r\nvarying vec2 v_rgbNW;\r\nvarying vec2 v_rgbNE;\r\nvarying vec2 v_rgbSW;\r\nvarying vec2 v_rgbSE;\r\nvarying vec2 v_rgbM;\r\n\r\nvarying vec2 vFragCoord;\r\n\r\nuniform vec4 inputPixel;\r\nuniform vec4 outputFrame;\r\n\r\nvec4 filterVertexPosition( void )\r\n{\r\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\r\n\r\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\r\n}\r\n\r\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\r\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\r\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\r\n               out vec2 v_rgbM) {\r\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\r\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\r\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\r\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\r\n    v_rgbM = vec2(fragCoord * inverseVP);\r\n}\r\n\r\nvoid main(void) {\r\n\r\n   gl_Position = filterVertexPosition();\r\n\r\n   vFragCoord = aVertexPosition * outputFrame.zw;\r\n\r\n   texcoords(vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\r\n}\r\n';

    const fragment = 'varying vec2 v_rgbNW;\r\nvarying vec2 v_rgbNE;\r\nvarying vec2 v_rgbSW;\r\nvarying vec2 v_rgbSE;\r\nvarying vec2 v_rgbM;\r\n\r\nvarying vec2 vFragCoord;\r\nuniform sampler2D uSampler;\r\nuniform highp vec4 inputPixel;\r\n\r\n\r\n/**\r\n Basic FXAA implementation based on the code on geeks3d.com with the\r\n modification that the texture2DLod stuff was removed since it\'s\r\n unsupported by WebGL.\r\n\r\n --\r\n\r\n From:\r\n https://github.com/mitsuhiko/webgl-meincraft\r\n\r\n Copyright (c) 2011 by Armin Ronacher.\r\n\r\n Some rights reserved.\r\n\r\n Redistribution and use in source and binary forms, with or without\r\n modification, are permitted provided that the following conditions are\r\n met:\r\n\r\n * Redistributions of source code must retain the above copyright\r\n notice, this list of conditions and the following disclaimer.\r\n\r\n * Redistributions in binary form must reproduce the above\r\n copyright notice, this list of conditions and the following\r\n disclaimer in the documentation and/or other materials provided\r\n with the distribution.\r\n\r\n * The names of the contributors may not be used to endorse or\r\n promote products derived from this software without specific\r\n prior written permission.\r\n\r\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\r\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\r\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\r\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\r\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\r\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\r\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\r\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\r\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\r\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\r\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\r\n */\r\n\r\n#ifndef FXAA_REDUCE_MIN\r\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\r\n#endif\r\n#ifndef FXAA_REDUCE_MUL\r\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\r\n#endif\r\n#ifndef FXAA_SPAN_MAX\r\n#define FXAA_SPAN_MAX     8.0\r\n#endif\r\n\r\n//optimized version for mobile, where dependent\r\n//texture reads can be a bottleneck\r\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\r\n          vec2 v_rgbNW, vec2 v_rgbNE,\r\n          vec2 v_rgbSW, vec2 v_rgbSE,\r\n          vec2 v_rgbM) {\r\n    vec4 color;\r\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\r\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\r\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\r\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\r\n    vec4 texColor = texture2D(tex, v_rgbM);\r\n    vec3 rgbM  = texColor.xyz;\r\n    vec3 luma = vec3(0.299, 0.587, 0.114);\r\n    float lumaNW = dot(rgbNW, luma);\r\n    float lumaNE = dot(rgbNE, luma);\r\n    float lumaSW = dot(rgbSW, luma);\r\n    float lumaSE = dot(rgbSE, luma);\r\n    float lumaM  = dot(rgbM,  luma);\r\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\r\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\r\n\r\n    mediump vec2 dir;\r\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\r\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\r\n\r\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\r\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\r\n\r\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\r\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\r\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\r\n                  dir * rcpDirMin)) * inverseVP;\r\n\r\n    vec3 rgbA = 0.5 * (\r\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\r\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\r\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\r\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\r\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\r\n\r\n    float lumaB = dot(rgbB, luma);\r\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\r\n        color = vec4(rgbA, texColor.a);\r\n    else\r\n        color = vec4(rgbB, texColor.a);\r\n    return color;\r\n}\r\n\r\nvoid main() {\r\n\r\n      vec4 color;\r\n\r\n      color = fxaa(uSampler, vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\r\n\r\n      gl_FragColor = color;\r\n}\r\n';

    /**
     * Basic FXAA (Fast Approximate Anti-Aliasing) implementation based on the code on geeks3d.com
     * with the modification that the texture2DLod stuff was removed since it is unsupported by WebGL.
     *
     * @see https://github.com/mitsuhiko/webgl-meincraft
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     *
     */
    const FXAAFilter = /** @class */ (function (_super)
    {
        __extends(FXAAFilter, _super);
        function FXAAFilter()
        {
            // TODO - needs work
            return _super.call(this, vertex, fragment) || this;
        }

        return FXAAFilter;
    })(core.Filter);

    exports.FXAAFilter = FXAAFilter;

    return exports;
})({}, PIXI);

Object.assign(this.PIXI.filters, _pixi_filter_fxaa);
// # sourceMappingURL=filter-fxaa.js.map
