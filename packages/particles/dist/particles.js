/* !
 * @pixi/particles - v5.3.7
 * Compiled Wed, 26 Apr 2023 15:56:05 UTC
 *
 * @pixi/particles is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
const _pixi_particles = (function (exports, constants, display, utils, core, math)
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

    /**
     * The ParticleContainer class is a really fast version of the Container built solely for speed,
     * so use when you need a lot of sprites or particles.
     *
     * The tradeoff of the ParticleContainer is that most advanced functionality will not work.
     * ParticleContainer implements the basic object transform (position, scale, rotation)
     * and some advanced functionality like tint (as of v4.5.6).
     *
     * Other more advanced functionality like masking, children, filters, etc will not work on sprites in this batch.
     *
     * It's extremely easy to use:
     * ```js
     * let container = new ParticleContainer();
     *
     * for (let i = 0; i < 100; ++i)
     * {
     *     let sprite = PIXI.Sprite.from("myImage.png");
     *     container.addChild(sprite);
     * }
     * ```
     *
     * And here you have a hundred sprites that will be rendered at the speed of light.
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI
     */
    const ParticleContainer = /** @class */ (function (_super)
    {
        __extends(ParticleContainer, _super);
        /**
         * @param {number} [maxSize=1500] - The maximum number of particles that can be rendered by the container.
         *  Affects size of allocated buffers.
         * @param {object} [properties] - The properties of children that should be uploaded to the gpu and applied.
         * @param {boolean} [properties.vertices=false] - When true, vertices be uploaded and applied.
         *                  if sprite's ` scale/anchor/trim/frame/orig` is dynamic, please set `true`.
         * @param {boolean} [properties.position=true] - When true, position be uploaded and applied.
         * @param {boolean} [properties.rotation=false] - When true, rotation be uploaded and applied.
         * @param {boolean} [properties.uvs=false] - When true, uvs be uploaded and applied.
         * @param {boolean} [properties.tint=false] - When true, alpha and tint be uploaded and applied.
         * @param {number} [batchSize=16384] - Number of particles per batch. If less than maxSize, it uses maxSize instead.
         * @param {boolean} [autoResize=false] - If true, container allocates more batches in case
         *  there are more than `maxSize` particles.
         */
        function ParticleContainer(maxSize, properties, batchSize, autoResize)
        {
            if (maxSize === void 0) { maxSize = 1500; }
            if (batchSize === void 0) { batchSize = 16384; }
            if (autoResize === void 0) { autoResize = false; }
            const _this = _super.call(this) || this;
            // Making sure the batch size is valid
            // 65535 is max vertex index in the index buffer (see ParticleRenderer)
            // so max number of particles is 65536 / 4 = 16384
            const maxBatchSize = 16384;

            if (batchSize > maxBatchSize)
            {
                batchSize = maxBatchSize;
            }
            /**
             * Set properties to be dynamic (true) / static (false)
             *
             * @member {boolean[]}
             * @private
             */
            _this._properties = [false, true, false, false, false];
            /**
             * @member {number}
             * @private
             */
            _this._maxSize = maxSize;
            /**
             * @member {number}
             * @private
             */
            _this._batchSize = batchSize;
            /**
             * @member {Array<PIXI.Buffer>}
             * @private
             */
            _this._buffers = null;
            /**
             * for every batch stores _updateID corresponding to the last change in that batch
             * @member {number[]}
             * @private
             */
            _this._bufferUpdateIDs = [];
            /**
             * when child inserted, removed or changes position this number goes up
             * @member {number[]}
             * @private
             */
            _this._updateID = 0;
            /**
             * @member {boolean}
             *
             */
            _this.interactiveChildren = false;
            /**
             * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL`
             * to reset the blend mode.
             *
             * @member {number}
             * @default PIXI.BLEND_MODES.NORMAL
             * @see PIXI.BLEND_MODES
             */
            _this.blendMode = constants.BLEND_MODES.NORMAL;
            /**
             * If true, container allocates more batches in case there are more than `maxSize` particles.
             * @member {boolean}
             * @default false
             */
            _this.autoResize = autoResize;
            /**
             * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
             * Advantages can include sharper image quality (like text) and faster rendering on canvas.
             * The main disadvantage is movement of objects may appear less smooth.
             * Default to true here as performance is usually the priority for particles.
             *
             * @member {boolean}
             * @default true
             */
            _this.roundPixels = true;
            /**
             * The texture used to render the children.
             *
             * @readonly
             * @member {PIXI.BaseTexture}
             */
            _this.baseTexture = null;
            _this.setProperties(properties);
            /**
             * The tint applied to the container.
             * This is a hex value. A value of 0xFFFFFF will remove any tint effect.
             *
             * @private
             * @member {number}
             * @default 0xFFFFFF
             */
            _this._tint = 0;
            _this.tintRgb = new Float32Array(4);
            _this.tint = 0xFFFFFF;

            return _this;
        }
        /**
         * Sets the private properties array to dynamic / static based on the passed properties object
         *
         * @param {object} properties - The properties to be uploaded
         */
        ParticleContainer.prototype.setProperties = function (properties)
        {
            if (properties)
            {
                this._properties[0] = 'vertices' in properties || 'scale' in properties
                    ? !!properties.vertices || !!properties.scale : this._properties[0];
                this._properties[1] = 'position' in properties ? !!properties.position : this._properties[1];
                this._properties[2] = 'rotation' in properties ? !!properties.rotation : this._properties[2];
                this._properties[3] = 'uvs' in properties ? !!properties.uvs : this._properties[3];
                this._properties[4] = 'tint' in properties || 'alpha' in properties
                    ? !!properties.tint || !!properties.alpha : this._properties[4];
            }
        };
        /**
         * Updates the object transform for rendering
         *
         * @private
         */
        ParticleContainer.prototype.updateTransform = function ()
        {
            // TODO don't need to!
            this.displayObjectUpdateTransform();
        };
        Object.defineProperty(ParticleContainer.prototype, 'tint', {
            /**
             * The tint applied to the container. This is a hex value.
             * A value of 0xFFFFFF will remove any tint effect.
             ** IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
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
                utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Renders the container using the WebGL renderer
         *
         * @private
         * @param {PIXI.Renderer} renderer - The webgl renderer
         */
        ParticleContainer.prototype.render = function (renderer)
        {
            const _this = this;

            if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable)
            {
                return;
            }
            if (!this.baseTexture)
            {
                this.baseTexture = this.children[0]._texture.baseTexture;
                if (!this.baseTexture.valid)
                {
                    this.baseTexture.once('update', function () { return _this.onChildrenChange(0); });
                }
            }
            renderer.batch.setObjectRenderer(renderer.plugins.particle);
            renderer.plugins.particle.render(this);
        };
        /**
         * Set the flag that static data should be updated to true
         *
         * @private
         * @param {number} smallestChildIndex - The smallest child index
         */
        ParticleContainer.prototype.onChildrenChange = function (smallestChildIndex)
        {
            const bufferIndex = Math.floor(smallestChildIndex / this._batchSize);

            while (this._bufferUpdateIDs.length < bufferIndex)
            {
                this._bufferUpdateIDs.push(0);
            }
            this._bufferUpdateIDs[bufferIndex] = ++this._updateID;
        };
        ParticleContainer.prototype.dispose = function ()
        {
            if (this._buffers)
            {
                for (let i = 0; i < this._buffers.length; ++i)
                {
                    this._buffers[i].destroy();
                }
                this._buffers = null;
            }
        };
        /**
         * Destroys the container
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their
         *  destroy method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the texture of the child sprite
         * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the base texture of the child sprite
         */
        ParticleContainer.prototype.destroy = function (options)
        {
            _super.prototype.destroy.call(this, options);
            this.dispose();
            this._properties = null;
            this._buffers = null;
            this._bufferUpdateIDs = null;
        };

        return ParticleContainer;
    })(display.Container);

    /**
     * @author Mat Groves
     *
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original PixiJS version!
     * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that
     * they now share 4 bytes on the vertex buffer
     *
     * Heavily inspired by LibGDX's ParticleBuffer:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/ParticleBuffer.java
     */
    /**
     * The particle buffer manages the static and dynamic buffers for a particle container.
     *
     * @class
     * @private
     * @memberof PIXI
     */
    const ParticleBuffer = /** @class */ (function ()
    {
        /**
         * @private
         * @param {object} properties - The properties to upload.
         * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
         * @param {number} size - The size of the batch.
         */
        function ParticleBuffer(properties, dynamicPropertyFlags, size)
        {
            this.geometry = new core.Geometry();
            this.indexBuffer = null;
            /**
             * The number of particles the buffer can hold
             *
             * @private
             * @member {number}
             */
            this.size = size;
            /**
             * A list of the properties that are dynamic.
             *
             * @private
             * @member {object[]}
             */
            this.dynamicProperties = [];
            /**
             * A list of the properties that are static.
             *
             * @private
             * @member {object[]}
             */
            this.staticProperties = [];
            for (let i = 0; i < properties.length; ++i)
            {
                let property = properties[i];
                // Make copy of properties object so that when we edit the offset it doesn't
                // change all other instances of the object literal

                property = {
                    attributeName: property.attributeName,
                    size: property.size,
                    uploadFunction: property.uploadFunction,
                    type: property.type || constants.TYPES.FLOAT,
                    offset: property.offset,
                };
                if (dynamicPropertyFlags[i])
                {
                    this.dynamicProperties.push(property);
                }
                else
                {
                    this.staticProperties.push(property);
                }
            }
            this.staticStride = 0;
            this.staticBuffer = null;
            this.staticData = null;
            this.staticDataUint32 = null;
            this.dynamicStride = 0;
            this.dynamicBuffer = null;
            this.dynamicData = null;
            this.dynamicDataUint32 = null;
            this._updateID = 0;
            this.initBuffers();
        }
        /**
         * Sets up the renderer context and necessary buffers.
         *
         * @private
         */
        ParticleBuffer.prototype.initBuffers = function ()
        {
            const geometry = this.geometry;
            let dynamicOffset = 0;
            /**
             * Holds the indices of the geometry (quads) to draw
             *
             * @member {Uint16Array}
             * @private
             */

            this.indexBuffer = new core.Buffer(utils.createIndicesForQuads(this.size), true, true);
            geometry.addIndex(this.indexBuffer);
            this.dynamicStride = 0;
            for (var i = 0; i < this.dynamicProperties.length; ++i)
            {
                var property = this.dynamicProperties[i];

                property.offset = dynamicOffset;
                dynamicOffset += property.size;
                this.dynamicStride += property.size;
            }
            const dynBuffer = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);

            this.dynamicData = new Float32Array(dynBuffer);
            this.dynamicDataUint32 = new Uint32Array(dynBuffer);
            this.dynamicBuffer = new core.Buffer(this.dynamicData, false, false);
            // static //
            let staticOffset = 0;

            this.staticStride = 0;
            for (var i = 0; i < this.staticProperties.length; ++i)
            {
                var property = this.staticProperties[i];

                property.offset = staticOffset;
                staticOffset += property.size;
                this.staticStride += property.size;
            }
            const statBuffer = new ArrayBuffer(this.size * this.staticStride * 4 * 4);

            this.staticData = new Float32Array(statBuffer);
            this.staticDataUint32 = new Uint32Array(statBuffer);
            this.staticBuffer = new core.Buffer(this.staticData, true, false);
            for (var i = 0; i < this.dynamicProperties.length; ++i)
            {
                var property = this.dynamicProperties[i];

                geometry.addAttribute(property.attributeName, this.dynamicBuffer, 0, property.type === constants.TYPES.UNSIGNED_BYTE, property.type, this.dynamicStride * 4, property.offset * 4);
            }
            for (var i = 0; i < this.staticProperties.length; ++i)
            {
                var property = this.staticProperties[i];

                geometry.addAttribute(property.attributeName, this.staticBuffer, 0, property.type === constants.TYPES.UNSIGNED_BYTE, property.type, this.staticStride * 4, property.offset * 4);
            }
        };
        /**
         * Uploads the dynamic properties.
         *
         * @private
         * @param {PIXI.DisplayObject[]} children - The children to upload.
         * @param {number} startIndex - The index to start at.
         * @param {number} amount - The number to upload.
         */
        ParticleBuffer.prototype.uploadDynamic = function (children, startIndex, amount)
        {
            for (let i = 0; i < this.dynamicProperties.length; i++)
            {
                const property = this.dynamicProperties[i];

                property.uploadFunction(children, startIndex, amount, property.type === constants.TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, property.offset);
            }
            this.dynamicBuffer._updateID++;
        };
        /**
         * Uploads the static properties.
         *
         * @private
         * @param {PIXI.DisplayObject[]} children - The children to upload.
         * @param {number} startIndex - The index to start at.
         * @param {number} amount - The number to upload.
         */
        ParticleBuffer.prototype.uploadStatic = function (children, startIndex, amount)
        {
            for (let i = 0; i < this.staticProperties.length; i++)
            {
                const property = this.staticProperties[i];

                property.uploadFunction(children, startIndex, amount, property.type === constants.TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, property.offset);
            }
            this.staticBuffer._updateID++;
        };
        /**
         * Destroys the ParticleBuffer.
         *
         * @private
         */
        ParticleBuffer.prototype.destroy = function ()
        {
            this.indexBuffer = null;
            this.dynamicProperties = null;
            this.dynamicBuffer = null;
            this.dynamicData = null;
            this.dynamicDataUint32 = null;
            this.staticProperties = null;
            this.staticBuffer = null;
            this.staticData = null;
            this.staticDataUint32 = null;
            // all buffers are destroyed inside geometry
            this.geometry.destroy();
        };

        return ParticleBuffer;
    })();

    const fragment = 'varying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\n\r\nuniform sampler2D uSampler;\r\n\r\nvoid main(void){\r\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\r\n    gl_FragColor = color;\r\n}';

    const vertex = 'attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nattribute vec4 aColor;\r\n\r\nattribute vec2 aPositionCoord;\r\nattribute float aRotation;\r\n\r\nuniform mat3 translationMatrix;\r\nuniform vec4 uColor;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\n\r\nvoid main(void){\r\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\r\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\r\n\r\n    vec2 v = vec2(x, y);\r\n    v = v + aPositionCoord;\r\n\r\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = aTextureCoord;\r\n    vColor = aColor * uColor;\r\n}\r\n';

    /**
     * @author Mat Groves
     *
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original PixiJS version!
     * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that they now
     * share 4 bytes on the vertex buffer
     *
     * Heavily inspired by LibGDX's ParticleRenderer:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/ParticleRenderer.java
     */
    /**
     * Renderer for Particles that is designer for speed over feature set.
     *
     * @class
     * @memberof PIXI
     */
    const ParticleRenderer = /** @class */ (function (_super)
    {
        __extends(ParticleRenderer, _super);
        /**
         * @param {PIXI.Renderer} renderer - The renderer this sprite batch works for.
         */
        function ParticleRenderer(renderer)
        {
            const _this = _super.call(this, renderer) || this;
            // 65535 is max vertex index in the index buffer (see ParticleRenderer)
            // so max number of particles is 65536 / 4 = 16384
            // and max number of element in the index buffer is 16384 * 6 = 98304
            // Creating a full index buffer, overhead is 98304 * 2 = 196Ko
            // let numIndices = 98304;
            /**
             * The default shader that is used if a sprite doesn't have a more specific one.
             *
             * @member {PIXI.Shader}
             */

            _this.shader = null;
            _this.properties = null;
            _this.tempMatrix = new math.Matrix();
            _this.properties = [
                // verticesData
                {
                    attributeName: 'aVertexPosition',
                    size: 2,
                    uploadFunction: _this.uploadVertices,
                    offset: 0,
                },
                // positionData
                {
                    attributeName: 'aPositionCoord',
                    size: 2,
                    uploadFunction: _this.uploadPosition,
                    offset: 0,
                },
                // rotationData
                {
                    attributeName: 'aRotation',
                    size: 1,
                    uploadFunction: _this.uploadRotation,
                    offset: 0,
                },
                // uvsData
                {
                    attributeName: 'aTextureCoord',
                    size: 2,
                    uploadFunction: _this.uploadUvs,
                    offset: 0,
                },
                // tintData
                {
                    attributeName: 'aColor',
                    size: 1,
                    type: constants.TYPES.UNSIGNED_BYTE,
                    uploadFunction: _this.uploadTint,
                    offset: 0,
                }];
            _this.shader = core.Shader.from(vertex, fragment, {});
            /**
             * The WebGL state in which this renderer will work.
             *
             * @member {PIXI.State}
             * @readonly
             */
            _this.state = core.State.for2d();

            return _this;
        }
        /**
         * Renders the particle container object.
         *
         * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
         */
        ParticleRenderer.prototype.render = function (container)
        {
            const children = container.children;
            const maxSize = container._maxSize;
            const batchSize = container._batchSize;
            const renderer = this.renderer;
            let totalChildren = children.length;

            if (totalChildren === 0)
            {
                return;
            }
            else if (totalChildren > maxSize && !container.autoResize)
            {
                totalChildren = maxSize;
            }
            let buffers = container._buffers;

            if (!buffers)
            {
                buffers = container._buffers = this.generateBuffers(container);
            }
            const baseTexture = children[0]._texture.baseTexture;
            // if the uvs have not updated then no point rendering just yet!

            this.state.blendMode = utils.correctBlendMode(container.blendMode, baseTexture.alphaMode);
            renderer.state.set(this.state);
            const gl = renderer.gl;
            const m = container.worldTransform.copyTo(this.tempMatrix);

            m.prepend(renderer.globalUniforms.uniforms.projectionMatrix);
            this.shader.uniforms.translationMatrix = m.toArray(true);
            this.shader.uniforms.uColor = utils.premultiplyRgba(container.tintRgb, container.worldAlpha, this.shader.uniforms.uColor, baseTexture.alphaMode);
            this.shader.uniforms.uSampler = baseTexture;
            this.renderer.shader.bind(this.shader);
            let updateStatic = false;
            // now lets upload and render the buffers..

            for (let i = 0, j = 0; i < totalChildren; i += batchSize, j += 1)
            {
                let amount = (totalChildren - i);

                if (amount > batchSize)
                {
                    amount = batchSize;
                }
                if (j >= buffers.length)
                {
                    buffers.push(this._generateOneMoreBuffer(container));
                }
                const buffer = buffers[j];
                // we always upload the dynamic

                buffer.uploadDynamic(children, i, amount);
                const bid = container._bufferUpdateIDs[j] || 0;

                updateStatic = updateStatic || (buffer._updateID < bid);
                // we only upload the static content when we have to!
                if (updateStatic)
                {
                    buffer._updateID = container._updateID;
                    buffer.uploadStatic(children, i, amount);
                }
                // bind the buffer
                renderer.geometry.bind(buffer.geometry);
                gl.drawElements(gl.TRIANGLES, amount * 6, gl.UNSIGNED_SHORT, 0);
            }
        };
        /**
         * Creates one particle buffer for each child in the container we want to render and updates internal properties
         *
         * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
         * @return {PIXI.ParticleBuffer[]} The buffers
         * @private
         */
        ParticleRenderer.prototype.generateBuffers = function (container)
        {
            const buffers = [];
            const size = container._maxSize;
            const batchSize = container._batchSize;
            const dynamicPropertyFlags = container._properties;

            for (let i = 0; i < size; i += batchSize)
            {
                buffers.push(new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize));
            }

            return buffers;
        };
        /**
         * Creates one more particle buffer, because container has autoResize feature
         *
         * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
         * @return {PIXI.ParticleBuffer} generated buffer
         * @private
         */
        ParticleRenderer.prototype._generateOneMoreBuffer = function (container)
        {
            const batchSize = container._batchSize;
            const dynamicPropertyFlags = container._properties;

            return new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize);
        };
        /**
         * Uploads the vertices.
         *
         * @param {PIXI.DisplayObject[]} children - the array of display objects to render
         * @param {number} startIndex - the index to start from in the children array
         * @param {number} amount - the amount of children that will have their vertices uploaded
         * @param {number[]} array - The vertices to upload.
         * @param {number} stride - Stride to use for iteration.
         * @param {number} offset - Offset to start at.
         */
        ParticleRenderer.prototype.uploadVertices = function (children, startIndex, amount, array, stride, offset)
        {
            let w0 = 0;
            let w1 = 0;
            let h0 = 0;
            let h1 = 0;

            for (let i = 0; i < amount; ++i)
            {
                const sprite = children[startIndex + i];
                const texture = sprite._texture;
                const sx = sprite.scale.x;
                const sy = sprite.scale.y;
                const trim = texture.trim;
                const orig = texture.orig;

                if (trim)
                {
                    // if the sprite is trimmed and is not a tilingsprite then we need to add the
                    // extra space before transforming the sprite coords..
                    w1 = trim.x - (sprite.anchor.x * orig.width);
                    w0 = w1 + trim.width;
                    h1 = trim.y - (sprite.anchor.y * orig.height);
                    h0 = h1 + trim.height;
                }
                else
                {
                    w0 = (orig.width) * (1 - sprite.anchor.x);
                    w1 = (orig.width) * -sprite.anchor.x;
                    h0 = orig.height * (1 - sprite.anchor.y);
                    h1 = orig.height * -sprite.anchor.y;
                }
                array[offset] = w1 * sx;
                array[offset + 1] = h1 * sy;
                array[offset + stride] = w0 * sx;
                array[offset + stride + 1] = h1 * sy;
                array[offset + (stride * 2)] = w0 * sx;
                array[offset + (stride * 2) + 1] = h0 * sy;
                array[offset + (stride * 3)] = w1 * sx;
                array[offset + (stride * 3) + 1] = h0 * sy;
                offset += stride * 4;
            }
        };
        /**
         * Uploads the position.
         *
         * @param {PIXI.DisplayObject[]} children - the array of display objects to render
         * @param {number} startIndex - the index to start from in the children array
         * @param {number} amount - the amount of children that will have their positions uploaded
         * @param {number[]} array - The vertices to upload.
         * @param {number} stride - Stride to use for iteration.
         * @param {number} offset - Offset to start at.
         */
        ParticleRenderer.prototype.uploadPosition = function (children, startIndex, amount, array, stride, offset)
        {
            for (let i = 0; i < amount; i++)
            {
                const spritePosition = children[startIndex + i].position;

                array[offset] = spritePosition.x;
                array[offset + 1] = spritePosition.y;
                array[offset + stride] = spritePosition.x;
                array[offset + stride + 1] = spritePosition.y;
                array[offset + (stride * 2)] = spritePosition.x;
                array[offset + (stride * 2) + 1] = spritePosition.y;
                array[offset + (stride * 3)] = spritePosition.x;
                array[offset + (stride * 3) + 1] = spritePosition.y;
                offset += stride * 4;
            }
        };
        /**
         * Uploads the rotation.
         *
         * @param {PIXI.DisplayObject[]} children - the array of display objects to render
         * @param {number} startIndex - the index to start from in the children array
         * @param {number} amount - the amount of children that will have their rotation uploaded
         * @param {number[]} array - The vertices to upload.
         * @param {number} stride - Stride to use for iteration.
         * @param {number} offset - Offset to start at.
         */
        ParticleRenderer.prototype.uploadRotation = function (children, startIndex, amount, array, stride, offset)
        {
            for (let i = 0; i < amount; i++)
            {
                const spriteRotation = children[startIndex + i].rotation;

                array[offset] = spriteRotation;
                array[offset + stride] = spriteRotation;
                array[offset + (stride * 2)] = spriteRotation;
                array[offset + (stride * 3)] = spriteRotation;
                offset += stride * 4;
            }
        };
        /**
         * Uploads the Uvs
         *
         * @param {PIXI.DisplayObject[]} children - the array of display objects to render
         * @param {number} startIndex - the index to start from in the children array
         * @param {number} amount - the amount of children that will have their rotation uploaded
         * @param {number[]} array - The vertices to upload.
         * @param {number} stride - Stride to use for iteration.
         * @param {number} offset - Offset to start at.
         */
        ParticleRenderer.prototype.uploadUvs = function (children, startIndex, amount, array, stride, offset)
        {
            for (let i = 0; i < amount; ++i)
            {
                const textureUvs = children[startIndex + i]._texture._uvs;

                if (textureUvs)
                {
                    array[offset] = textureUvs.x0;
                    array[offset + 1] = textureUvs.y0;
                    array[offset + stride] = textureUvs.x1;
                    array[offset + stride + 1] = textureUvs.y1;
                    array[offset + (stride * 2)] = textureUvs.x2;
                    array[offset + (stride * 2) + 1] = textureUvs.y2;
                    array[offset + (stride * 3)] = textureUvs.x3;
                    array[offset + (stride * 3) + 1] = textureUvs.y3;
                    offset += stride * 4;
                }
                else
                {
                    // TODO you know this can be easier!
                    array[offset] = 0;
                    array[offset + 1] = 0;
                    array[offset + stride] = 0;
                    array[offset + stride + 1] = 0;
                    array[offset + (stride * 2)] = 0;
                    array[offset + (stride * 2) + 1] = 0;
                    array[offset + (stride * 3)] = 0;
                    array[offset + (stride * 3) + 1] = 0;
                    offset += stride * 4;
                }
            }
        };
        /**
         * Uploads the tint.
         *
         * @param {PIXI.DisplayObject[]} children - the array of display objects to render
         * @param {number} startIndex - the index to start from in the children array
         * @param {number} amount - the amount of children that will have their rotation uploaded
         * @param {number[]} array - The vertices to upload.
         * @param {number} stride - Stride to use for iteration.
         * @param {number} offset - Offset to start at.
         */
        ParticleRenderer.prototype.uploadTint = function (children, startIndex, amount, array, stride, offset)
        {
            for (let i = 0; i < amount; ++i)
            {
                const sprite = children[startIndex + i];
                const premultiplied = sprite._texture.baseTexture.alphaMode > 0;
                const alpha = sprite.alpha;
                // we dont call extra function if alpha is 1.0, that's faster
                const argb = alpha < 1.0 && premultiplied
                    ? utils.premultiplyTint(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24);

                array[offset] = argb;
                array[offset + stride] = argb;
                array[offset + (stride * 2)] = argb;
                array[offset + (stride * 3)] = argb;
                offset += stride * 4;
            }
        };
        /**
         * Destroys the ParticleRenderer.
         */
        ParticleRenderer.prototype.destroy = function ()
        {
            _super.prototype.destroy.call(this);
            if (this.shader)
            {
                this.shader.destroy();
                this.shader = null;
            }
            this.tempMatrix = null;
        };

        return ParticleRenderer;
    })(core.ObjectRenderer);

    exports.ParticleContainer = ParticleContainer;
    exports.ParticleRenderer = ParticleRenderer;

    return exports;
})({}, PIXI, PIXI, PIXI.utils, PIXI, PIXI);

Object.assign(this.PIXI, _pixi_particles);
// # sourceMappingURL=particles.js.map
