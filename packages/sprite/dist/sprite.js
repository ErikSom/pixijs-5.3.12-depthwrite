/* !
 * @pixi/sprite - v5.3.7
 * Compiled Wed, 26 Apr 2023 15:56:05 UTC
 *
 * @pixi/sprite is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
const _pixi_sprite = (function (exports, constants, core, display, math, settings, utils)
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

    const tempPoint = new math.Point();
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    /**
     * The Sprite object is the base for all textured objects that are rendered to the screen
    *
     * A sprite can be created directly from an image like this:
     *
     * ```js
     * let sprite = PIXI.Sprite.from('assets/image.png');
     * ```
     *
     * The more efficient way to create sprites is using a {@link PIXI.Spritesheet},
     * as swapping base textures when rendering to the screen is inefficient.
     *
     * ```js
     * PIXI.Loader.shared.add("assets/spritesheet.json").load(setup);
     *
     * function setup() {
     *   let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
     *   let sprite = new PIXI.Sprite(sheet.textures["image.png"]);
     *   ...
     * }
     * ```
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI
     */
    const Sprite = /** @class */ (function (_super)
    {
        __extends(Sprite, _super);
        /**
         * @param {PIXI.Texture} [texture] - The texture for this sprite.
         */
        function Sprite(texture)
        {
            const _this = _super.call(this) || this;
            /**
             * The anchor point defines the normalized coordinates
             * in the texture that map to the position of this
             * sprite.
             *
             * By default, this is `(0,0)` (or `texture.defaultAnchor`
             * if you have modified that), which means the position
             * `(x,y)` of this `Sprite` will be the top-left corner.
             *
             * Note: Updating `texture.defaultAnchor` after
             * constructing a `Sprite` does _not_ update its anchor.
             *
             * {@link https://docs.cocos2d-x.org/cocos2d-x/en/sprites/manipulation.html}
             *
             * @default `texture.defaultAnchor`
             * @member {PIXI.ObservablePoint}
             * @private
             */

            _this._anchor = new math.ObservablePoint(_this._onAnchorUpdate, _this, (texture ? texture.defaultAnchor.x : 0), (texture ? texture.defaultAnchor.y : 0));
            /**
             * The texture that the sprite is using
             *
             * @private
             * @member {PIXI.Texture}
             */
            _this._texture = null;
            /**
             * The width of the sprite (this is initially set by the texture)
             *
             * @protected
             * @member {number}
             */
            _this._width = 0;
            /**
             * The height of the sprite (this is initially set by the texture)
             *
             * @protected
             * @member {number}
             */
            _this._height = 0;
            /**
             * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
             *
             * @private
             * @member {number}
             * @default 0xFFFFFF
             */
            _this._tint = null;
            /**
             * The tint applied to the sprite. This is a RGB value. A value of 0xFFFFFF will remove any tint effect.
             *
             * @private
             * @member {number}
             * @default 16777215
             */
            _this._tintRGB = null;
            _this.tint = 0xFFFFFF;
            /**
             * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
             *
             * @member {number}
             * @default PIXI.BLEND_MODES.NORMAL
             * @see PIXI.BLEND_MODES
             */
            _this.blendMode = constants.BLEND_MODES.NORMAL;
            /**
             * Cached tint value so we can tell when the tint is changed.
             * Value is used for 2d CanvasRenderer.
             *
             * @protected
             * @member {number}
             * @default 0xFFFFFF
             */
            _this._cachedTint = 0xFFFFFF;
            /**
             * this is used to store the uvs data of the sprite, assigned at the same time
             * as the vertexData in calculateVertices()
             *
             * @private
             * @member {Float32Array}
             */
            _this.uvs = null;
            // call texture setter
            _this.texture = texture || core.Texture.EMPTY;
            /**
             * this is used to store the vertex data of the sprite (basically a quad)
             *
             * @private
             * @member {Float32Array}
             */
            _this.vertexData = new Float32Array(8);
            /**
             * This is used to calculate the bounds of the object IF it is a trimmed sprite
             *
             * @private
             * @member {Float32Array}
             */
            _this.vertexTrimmedData = null;
            _this._transformID = -1;
            _this._textureID = -1;
            _this._transformTrimmedID = -1;
            _this._textureTrimmedID = -1;
            // Batchable stuff..
            // TODO could make this a mixin?
            _this.indices = indices;
            /**
             * Plugin that is responsible for rendering this element.
             * Allows to customize the rendering process without overriding '_render' & '_renderCanvas' methods.
             *
             * @member {string}
             * @default 'batch'
             */
            _this.pluginName = 'batch';
            /**
             * used to fast check if a sprite is.. a sprite!
             * @member {boolean}
             */
            _this.isSprite = true;
            /**
             * Internal roundPixels field
             *
             * @member {boolean}
             * @private
             */
            _this._roundPixels = settings.settings.ROUND_PIXELS;

            return _this;
        }
        /**
         * When the texture is updated, this event will fire to update the scale and frame
         *
         * @protected
         */
        Sprite.prototype._onTextureUpdate = function ()
        {
            this._textureID = -1;
            this._textureTrimmedID = -1;
            this._cachedTint = 0xFFFFFF;
            // so if _width is 0 then width was not set..
            if (this._width)
            {
                this.scale.x = utils.sign(this.scale.x) * this._width / this._texture.orig.width;
            }
            if (this._height)
            {
                this.scale.y = utils.sign(this.scale.y) * this._height / this._texture.orig.height;
            }
        };
        /**
         * Called when the anchor position updates.
         *
         * @private
         */
        Sprite.prototype._onAnchorUpdate = function ()
        {
            this._transformID = -1;
            this._transformTrimmedID = -1;
        };
        /**
         * calculates worldTransform * vertices, store it in vertexData
         */
        Sprite.prototype.calculateVertices = function ()
        {
            const texture = this._texture;

            if (this._transformID === this.transform._worldID && this._textureID === texture._updateID)
            {
                return;
            }
            // update texture UV here, because base texture can be changed without calling `_onTextureUpdate`
            if (this._textureID !== texture._updateID)
            {
                this.uvs = this._texture._uvs.uvsFloat32;
            }
            this._transformID = this.transform._worldID;
            this._textureID = texture._updateID;
            // set the vertex data
            const wt = this.transform.worldTransform;
            const a = wt.a;
            const b = wt.b;
            const c = wt.c;
            const d = wt.d;
            const tx = wt.tx;
            const ty = wt.ty;
            const vertexData = this.vertexData;
            const trim = texture.trim;
            const orig = texture.orig;
            const anchor = this._anchor;
            let w0 = 0;
            let w1 = 0;
            let h0 = 0;
            let h1 = 0;

            if (trim)
            {
                // if the sprite is trimmed and is not a tilingsprite then we need to add the extra
                // space before transforming the sprite coords.
                w1 = trim.x - (anchor._x * orig.width);
                w0 = w1 + trim.width;
                h1 = trim.y - (anchor._y * orig.height);
                h0 = h1 + trim.height;
            }
            else
            {
                w1 = -anchor._x * orig.width;
                w0 = w1 + orig.width;
                h1 = -anchor._y * orig.height;
                h0 = h1 + orig.height;
            }
            // xy
            vertexData[0] = (a * w1) + (c * h1) + tx;
            vertexData[1] = (d * h1) + (b * w1) + ty;
            // xy
            vertexData[2] = (a * w0) + (c * h1) + tx;
            vertexData[3] = (d * h1) + (b * w0) + ty;
            // xy
            vertexData[4] = (a * w0) + (c * h0) + tx;
            vertexData[5] = (d * h0) + (b * w0) + ty;
            // xy
            vertexData[6] = (a * w1) + (c * h0) + tx;
            vertexData[7] = (d * h0) + (b * w1) + ty;
            if (this._roundPixels)
            {
                const resolution = settings.settings.RESOLUTION;

                for (let i = 0; i < vertexData.length; ++i)
                {
                    vertexData[i] = Math.round((vertexData[i] * resolution | 0) / resolution);
                }
            }
        };
        /**
         * calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData
         * This is used to ensure that the true width and height of a trimmed texture is respected
         */
        Sprite.prototype.calculateTrimmedVertices = function ()
        {
            if (!this.vertexTrimmedData)
            {
                this.vertexTrimmedData = new Float32Array(8);
            }
            else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
            {
                return;
            }
            this._transformTrimmedID = this.transform._worldID;
            this._textureTrimmedID = this._texture._updateID;
            // lets do some special trim code!
            const texture = this._texture;
            const vertexData = this.vertexTrimmedData;
            const orig = texture.orig;
            const anchor = this._anchor;
            // lets calculate the new untrimmed bounds..
            const wt = this.transform.worldTransform;
            const a = wt.a;
            const b = wt.b;
            const c = wt.c;
            const d = wt.d;
            const tx = wt.tx;
            const ty = wt.ty;
            const w1 = -anchor._x * orig.width;
            const w0 = w1 + orig.width;
            const h1 = -anchor._y * orig.height;
            const h0 = h1 + orig.height;
            // xy

            vertexData[0] = (a * w1) + (c * h1) + tx;
            vertexData[1] = (d * h1) + (b * w1) + ty;
            // xy
            vertexData[2] = (a * w0) + (c * h1) + tx;
            vertexData[3] = (d * h1) + (b * w0) + ty;
            // xy
            vertexData[4] = (a * w0) + (c * h0) + tx;
            vertexData[5] = (d * h0) + (b * w0) + ty;
            // xy
            vertexData[6] = (a * w1) + (c * h0) + tx;
            vertexData[7] = (d * h0) + (b * w1) + ty;
        };
        /**
        *
        * Renders the object using the WebGL renderer
        *
        * @protected
        * @param {PIXI.Renderer} renderer - The webgl renderer to use.
        */
        Sprite.prototype._render = function (renderer)
        {
            this.calculateVertices();
            renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
            renderer.plugins[this.pluginName].render(this);
        };
        /**
         * Updates the bounds of the sprite.
         *
         * @protected
         */
        Sprite.prototype._calculateBounds = function ()
        {
            const trim = this._texture.trim;
            const orig = this._texture.orig;
            // First lets check to see if the current texture has a trim..

            if (!trim || (trim.width === orig.width && trim.height === orig.height))
            {
                // no trim! lets use the usual calculations..
                this.calculateVertices();
                this._bounds.addQuad(this.vertexData);
            }
            else
            {
                // lets calculate a special trimmed bounds...
                this.calculateTrimmedVertices();
                this._bounds.addQuad(this.vertexTrimmedData);
            }
        };
        /**
         * Gets the local bounds of the sprite object.
         *
         * @param {PIXI.Rectangle} [rect] - The output rectangle.
         * @return {PIXI.Rectangle} The bounds.
         */
        Sprite.prototype.getLocalBounds = function (rect)
        {
            // we can do a fast local bounds if the sprite has no children!
            if (this.children.length === 0)
            {
                this._bounds.minX = this._texture.orig.width * -this._anchor._x;
                this._bounds.minY = this._texture.orig.height * -this._anchor._y;
                this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x);
                this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y);
                if (!rect)
                {
                    if (!this._localBoundsRect)
                    {
                        this._localBoundsRect = new math.Rectangle();
                    }
                    rect = this._localBoundsRect;
                }

                return this._bounds.getRectangle(rect);
            }

            return _super.prototype.getLocalBounds.call(this, rect);
        };
        /**
         * Tests if a point is inside this sprite
         *
         * @param {PIXI.IPointData} point - the point to test
         * @return {boolean} the result of the test
         */
        Sprite.prototype.containsPoint = function (point)
        {
            this.worldTransform.applyInverse(point, tempPoint);
            const width = this._texture.orig.width;
            const height = this._texture.orig.height;
            const x1 = -width * this.anchor.x;
            let y1 = 0;

            if (tempPoint.x >= x1 && tempPoint.x < x1 + width)
            {
                y1 = -height * this.anchor.y;
                if (tempPoint.y >= y1 && tempPoint.y < y1 + height)
                {
                    return true;
                }
            }

            return false;
        };
        /**
         * Destroys this sprite and optionally its texture and children
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
         *      method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well
         * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
         */
        Sprite.prototype.destroy = function (options)
        {
            _super.prototype.destroy.call(this, options);
            this._texture.off('update', this._onTextureUpdate, this);
            this._anchor = null;
            const destroyTexture = typeof options === 'boolean' ? options : options && options.texture;

            if (destroyTexture)
            {
                const destroyBaseTexture = typeof options === 'boolean' ? options : options && options.baseTexture;

                this._texture.destroy(!!destroyBaseTexture);
            }
            this._texture = null;
        };
        // some helper functions..
        /**
         * Helper function that creates a new sprite based on the source you provide.
         * The source can be - frame id, image url, video url, canvas element, video element, base texture
         *
         * @static
         * @param {string|PIXI.Texture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @return {PIXI.Sprite} The newly created sprite
         */
        Sprite.from = function (source, options)
        {
            const texture = (source instanceof core.Texture)
                ? source
                : core.Texture.from(source, options);

            return new Sprite(texture);
        };
        Object.defineProperty(Sprite.prototype, 'roundPixels', {
            get()
            {
                return this._roundPixels;
            },
            /**
             * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
             * Advantages can include sharper image quality (like text) and faster rendering on canvas.
             * The main disadvantage is movement of objects may appear less smooth.
             * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
             *
             * @member {boolean}
             * @default false
             */
            set(value)
            {
                if (this._roundPixels !== value)
                {
                    this._transformID = -1;
                }
                this._roundPixels = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, 'width', {
            /**
             * The width of the sprite, setting this will actually modify the scale to achieve the value set
             *
             * @member {number}
             */
            get()
            {
                return Math.abs(this.scale.x) * this._texture.orig.width;
            },
            set(value)
            {
                const s = utils.sign(this.scale.x) || 1;

                this.scale.x = s * value / this._texture.orig.width;
                this._width = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, 'height', {
            /**
             * The height of the sprite, setting this will actually modify the scale to achieve the value set
             *
             * @member {number}
             */
            get()
            {
                return Math.abs(this.scale.y) * this._texture.orig.height;
            },
            set(value)
            {
                const s = utils.sign(this.scale.y) || 1;

                this.scale.y = s * value / this._texture.orig.height;
                this._height = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, 'anchor', {
            /**
             * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
             * and passed to the constructor.
             *
             * The default is `(0,0)`, this means the sprite's origin is the top left.
             *
             * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
             *
             * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
             *
             * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
             *
             * @example
             * const sprite = new PIXI.Sprite(texture);
             * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
             *
             * @member {PIXI.ObservablePoint}
             */
            get()
            {
                return this._anchor;
            },
            set(value)
            {
                this._anchor.copyFrom(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, 'tint', {
            /**
             * The tint applied to the sprite. This is a hex value.
             * A value of 0xFFFFFF will remove any tint effect.
             *
             * @member {number}
             * @default 0xFFFFFF
             */
            get()
            {
                return this._tint;
            },
            set(value)
            {
                this._tint = value;
                this._tintRGB = (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, 'texture', {
            /**
             * The texture that the sprite is using
             *
             * @member {PIXI.Texture}
             */
            get()
            {
                return this._texture;
            },
            set(value)
            {
                if (this._texture === value)
                {
                    return;
                }
                if (this._texture)
                {
                    this._texture.off('update', this._onTextureUpdate, this);
                }
                this._texture = value || core.Texture.EMPTY;
                this._cachedTint = 0xFFFFFF;
                this._textureID = -1;
                this._textureTrimmedID = -1;
                if (value)
                {
                    // wait for the texture to load
                    if (value.baseTexture.valid)
                    {
                        this._onTextureUpdate();
                    }
                    else
                    {
                        value.once('update', this._onTextureUpdate, this);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });

        return Sprite;
    })(display.Container);

    exports.Sprite = Sprite;

    return exports;
})({}, PIXI, PIXI, PIXI, PIXI, PIXI, PIXI.utils);

Object.assign(this.PIXI, _pixi_sprite);
// # sourceMappingURL=sprite.js.map
