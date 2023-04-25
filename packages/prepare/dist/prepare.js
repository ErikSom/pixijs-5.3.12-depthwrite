/* !
 * @pixi/prepare - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/prepare is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
const _pixi_prepare = (function (exports, settings, core, graphics, ticker, display, text)
{
    /**
     * Default number of uploads per frame using prepare plugin.
     *
     * @static
     * @memberof PIXI.settings
     * @name UPLOADS_PER_FRAME
     * @type {number}
     * @default 4
     */
    settings.settings.UPLOADS_PER_FRAME = 4;

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
     * CountLimiter limits the number of items handled by a {@link PIXI.BasePrepare} to a specified
     * number of items per frame.
     *
     * @class
     * @memberof PIXI
     */
    const CountLimiter = /** @class */ (function ()
    {
        /**
         * @param {number} maxItemsPerFrame - The maximum number of items that can be prepared each frame.
         */
        function CountLimiter(maxItemsPerFrame)
        {
            /**
             * The maximum number of items that can be prepared each frame.
             * @type {number}
             * @private
             */
            this.maxItemsPerFrame = maxItemsPerFrame;
            /**
             * The number of items that can be prepared in the current frame.
             * @type {number}
             * @private
             */
            this.itemsLeft = 0;
        }
        /**
         * Resets any counting properties to start fresh on a new frame.
         */
        CountLimiter.prototype.beginFrame = function ()
        {
            this.itemsLeft = this.maxItemsPerFrame;
        };
        /**
         * Checks to see if another item can be uploaded. This should only be called once per item.
         * @return {boolean} If the item is allowed to be uploaded.
         */
        CountLimiter.prototype.allowedToUpload = function ()
        {
            return this.itemsLeft-- > 0;
        };

        return CountLimiter;
    })();

    /**
     * Built-in hook to find multiple textures from objects like AnimatedSprites.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */
    function findMultipleBaseTextures(item, queue)
    {
        let result = false;
        // Objects with multiple textures

        if (item && item._textures && item._textures.length)
        {
            for (let i = 0; i < item._textures.length; i++)
            {
                if (item._textures[i] instanceof core.Texture)
                {
                    const baseTexture = item._textures[i].baseTexture;

                    if (queue.indexOf(baseTexture) === -1)
                    {
                        queue.push(baseTexture);
                        result = true;
                    }
                }
            }
        }

        return result;
    }
    /**
     * Built-in hook to find BaseTextures from Texture.
     *
     * @private
     * @param {PIXI.Texture} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */
    function findBaseTexture(item, queue)
    {
        if (item.baseTexture instanceof core.BaseTexture)
        {
            const texture = item.baseTexture;

            if (queue.indexOf(texture) === -1)
            {
                queue.push(texture);
            }

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to find textures from objects.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */
    function findTexture(item, queue)
    {
        if (item._texture && item._texture instanceof core.Texture)
        {
            const texture = item._texture.baseTexture;

            if (queue.indexOf(texture) === -1)
            {
                queue.push(texture);
            }

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to draw PIXI.Text to its texture.
     *
     * @private
     * @param {PIXI.AbstractRenderer|PIXI.BasePrepare} helper - Not used by this upload handler
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function drawText(_helper, item)
    {
        if (item instanceof text.Text)
        {
            // updating text will return early if it is not dirty
            item.updateText(true);

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to calculate a text style for a PIXI.Text object.
     *
     * @private
     * @param {PIXI.AbstractRenderer|PIXI.BasePrepare} helper - Not used by this upload handler
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function calculateTextStyle(_helper, item)
    {
        if (item instanceof text.TextStyle)
        {
            const font = item.toFontString();

            text.TextMetrics.measureFont(font);

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to find Text objects.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Text object was found.
     */
    function findText(item, queue)
    {
        if (item instanceof text.Text)
        {
            // push the text style to prepare it - this can be really expensive
            if (queue.indexOf(item.style) === -1)
            {
                queue.push(item.style);
            }
            // also push the text object so that we can render it (to canvas/texture) if needed
            if (queue.indexOf(item) === -1)
            {
                queue.push(item);
            }
            // also push the Text's texture for upload to GPU
            const texture = item._texture.baseTexture;

            if (queue.indexOf(texture) === -1)
            {
                queue.push(texture);
            }

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to find TextStyle objects.
     *
     * @private
     * @param {PIXI.TextStyle} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.TextStyle object was found.
     */
    function findTextStyle(item, queue)
    {
        if (item instanceof text.TextStyle)
        {
            if (queue.indexOf(item) === -1)
            {
                queue.push(item);
            }

            return true;
        }

        return false;
    }
    /**
     * The prepare manager provides functionality to upload content to the GPU.
     *
     * BasePrepare handles basic queuing functionality and is extended by
     * {@link PIXI.Prepare} and {@link PIXI.CanvasPrepare}
     * to provide preparation capabilities specific to their respective renderers.
     *
     * @example
     * // Create a sprite
     * const sprite = PIXI.Sprite.from('something.png');
     *
     * // Load object into GPU
     * app.renderer.plugins.prepare.upload(sprite, () => {
     *
     *     //Texture(s) has been uploaded to GPU
     *     app.stage.addChild(sprite);
     *
     * })
     *
     * @abstract
     * @class
     * @memberof PIXI
     */
    const BasePrepare = /** @class */ (function ()
    {
        /**
         * @param {PIXI.AbstractRenderer} renderer - A reference to the current renderer
         */
        function BasePrepare(renderer)
        {
            const _this = this;
            /**
             * The limiter to be used to control how quickly items are prepared.
             * @type {PIXI.CountLimiter|PIXI.TimeLimiter}
             */

            this.limiter = new CountLimiter(settings.settings.UPLOADS_PER_FRAME);
            /**
             * Reference to the renderer.
             * @type {PIXI.AbstractRenderer}
             * @protected
             */
            this.renderer = renderer;
            /**
             * The only real difference between CanvasPrepare and Prepare is what they pass
             * to upload hooks. That different parameter is stored here.
             * @type {object}
             * @protected
             */
            this.uploadHookHelper = null;
            /**
             * Collection of items to uploads at once.
             * @type {Array<*>}
             * @private
             */
            this.queue = [];
            /**
             * Collection of additional hooks for finding assets.
             * @type {Array<Function>}
             * @private
             */
            this.addHooks = [];
            /**
             * Collection of additional hooks for processing assets.
             * @type {Array<Function>}
             * @private
             */
            this.uploadHooks = [];
            /**
             * Callback to call after completed.
             * @type {Array<Function>}
             * @private
             */
            this.completes = [];
            /**
             * If prepare is ticking (running).
             * @type {boolean}
             * @private
             */
            this.ticking = false;
            /**
             * 'bound' call for prepareItems().
             * @type {Function}
             * @private
             */
            this.delayedTick = function ()
            {
                // unlikely, but in case we were destroyed between tick() and delayedTick()
                if (!_this.queue)
                {
                    return;
                }
                _this.prepareItems();
            };
            // hooks to find the correct texture
            this.registerFindHook(findText);
            this.registerFindHook(findTextStyle);
            this.registerFindHook(findMultipleBaseTextures);
            this.registerFindHook(findBaseTexture);
            this.registerFindHook(findTexture);
            // upload hooks
            this.registerUploadHook(drawText);
            this.registerUploadHook(calculateTextStyle);
        }
        /**
         * Upload all the textures and graphics to the GPU.
         *
         * @param {Function|PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} item -
         *        Either the container or display object to search for items to upload, the items to upload themselves,
         *        or the callback function, if items have been added using `prepare.add`.
         * @param {Function} [done] - Optional callback when all queued uploads have completed
         */
        BasePrepare.prototype.upload = function (item, done)
        {
            if (typeof item === 'function')
            {
                done = item;
                item = null;
            }
            // If a display object, search for items
            // that we could upload
            if (item)
            {
                this.add(item);
            }
            // Get the items for upload from the display
            if (this.queue.length)
            {
                if (done)
                {
                    this.completes.push(done);
                }
                if (!this.ticking)
                {
                    this.ticking = true;
                    ticker.Ticker.system.addOnce(this.tick, this, ticker.UPDATE_PRIORITY.UTILITY);
                }
            }
            else if (done)
            {
                done();
            }
        };
        /**
         * Handle tick update
         *
         * @private
         */
        BasePrepare.prototype.tick = function ()
        {
            setTimeout(this.delayedTick, 0);
        };
        /**
         * Actually prepare items. This is handled outside of the tick because it will take a while
         * and we do NOT want to block the current animation frame from rendering.
         *
         * @private
         */
        BasePrepare.prototype.prepareItems = function ()
        {
            this.limiter.beginFrame();
            // Upload the graphics
            while (this.queue.length && this.limiter.allowedToUpload())
            {
                const item = this.queue[0];
                let uploaded = false;

                if (item && !item._destroyed)
                {
                    for (var i = 0, len = this.uploadHooks.length; i < len; i++)
                    {
                        if (this.uploadHooks[i](this.uploadHookHelper, item))
                        {
                            this.queue.shift();
                            uploaded = true;
                            break;
                        }
                    }
                }
                if (!uploaded)
                {
                    this.queue.shift();
                }
            }
            // We're finished
            if (!this.queue.length)
            {
                this.ticking = false;
                const completes = this.completes.slice(0);

                this.completes.length = 0;
                for (var i = 0, len = completes.length; i < len; i++)
                {
                    completes[i]();
                }
            }
            else
            {
                // if we are not finished, on the next rAF do this again
                ticker.Ticker.system.addOnce(this.tick, this, ticker.UPDATE_PRIORITY.UTILITY);
            }
        };
        /**
         * Adds hooks for finding items.
         *
         * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
         *          function must return `true` if it was able to add item to the queue.
         * @return {this} Instance of plugin for chaining.
         */
        BasePrepare.prototype.registerFindHook = function (addHook)
        {
            if (addHook)
            {
                this.addHooks.push(addHook);
            }

            return this;
        };
        /**
         * Adds hooks for uploading items.
         *
         * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
         *          function must return `true` if it was able to handle upload of item.
         * @return {this} Instance of plugin for chaining.
         */
        BasePrepare.prototype.registerUploadHook = function (uploadHook)
        {
            if (uploadHook)
            {
                this.uploadHooks.push(uploadHook);
            }

            return this;
        };
        /**
         * Manually add an item to the uploading queue.
         *
         * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
         *        add to the queue
         * @return {this} Instance of plugin for chaining.
         */
        BasePrepare.prototype.add = function (item)
        {
            // Add additional hooks for finding elements on special
            // types of objects that
            for (var i = 0, len = this.addHooks.length; i < len; i++)
            {
                if (this.addHooks[i](item, this.queue))
                {
                    break;
                }
            }
            // Get children recursively
            if (item instanceof display.Container)
            {
                for (var i = item.children.length - 1; i >= 0; i--)
                {
                    this.add(item.children[i]);
                }
            }

            return this;
        };
        /**
         * Destroys the plugin, don't use after this.
         *
         */
        BasePrepare.prototype.destroy = function ()
        {
            if (this.ticking)
            {
                ticker.Ticker.system.remove(this.tick, this);
            }
            this.ticking = false;
            this.addHooks = null;
            this.uploadHooks = null;
            this.renderer = null;
            this.completes = null;
            this.queue = null;
            this.limiter = null;
            this.uploadHookHelper = null;
        };

        return BasePrepare;
    })();

    /**
     * Built-in hook to upload PIXI.Texture objects to the GPU.
     *
     * @private
     * @param {PIXI.Renderer} renderer - instance of the webgl renderer
     * @param {PIXI.BaseTexture} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function uploadBaseTextures(renderer, item)
    {
        if (item instanceof core.BaseTexture)
        {
            // if the texture already has a GL texture, then the texture has been prepared or rendered
            // before now. If the texture changed, then the changer should be calling texture.update() which
            // reuploads the texture without need for preparing it again
            if (!item._glTextures[renderer.CONTEXT_UID])
            {
                renderer.texture.bind(item);
            }

            return true;
        }

        return false;
    }
    /**
     * Built-in hook to upload PIXI.Graphics to the GPU.
     *
     * @private
     * @param {PIXI.Renderer} renderer - instance of the webgl renderer
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function uploadGraphics(renderer, item)
    {
        if (!(item instanceof graphics.Graphics))
        {
            return false;
        }
        const geometry = item.geometry;
        // update dirty graphics to get batches

        item.finishPoly();
        geometry.updateBatches();
        const batches = geometry.batches;
        // upload all textures found in styles

        for (let i = 0; i < batches.length; i++)
        {
            const texture = batches[i].style.texture;

            if (texture)
            {
                uploadBaseTextures(renderer, texture.baseTexture);
            }
        }
        // if its not batchable - update vao for particular shader
        if (!geometry.batchable)
        {
            renderer.geometry.bind(geometry, item._resolveDirectShader(renderer));
        }

        return true;
    }
    /**
     * Built-in hook to find graphics.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Graphics object was found.
     */
    function findGraphics(item, queue)
    {
        if (item instanceof graphics.Graphics)
        {
            queue.push(item);

            return true;
        }

        return false;
    }
    /**
     * The prepare plugin provides renderer-specific plugins for pre-rendering DisplayObjects. These plugins are useful for
     * asynchronously preparing and uploading to the GPU assets, textures, graphics waiting to be displayed.
     *
     * Do not instantiate this plugin directly. It is available from the `renderer.plugins` property.
     * See {@link PIXI.CanvasRenderer#plugins} or {@link PIXI.Renderer#plugins}.
     * @example
     * // Create a new application
     * const app = new PIXI.Application();
     * document.body.appendChild(app.view);
     *
     * // Don't start rendering right away
     * app.stop();
     *
     * // create a display object
     * const rect = new PIXI.Graphics()
     *     .beginFill(0x00ff00)
     *     .drawRect(40, 40, 200, 200);
     *
     * // Add to the stage
     * app.stage.addChild(rect);
     *
     * // Don't start rendering until the graphic is uploaded to the GPU
     * app.renderer.plugins.prepare.upload(app.stage, () => {
     *     app.start();
     * });
     *
     * @class
     * @extends PIXI.BasePrepare
     * @memberof PIXI
     */
    const Prepare = /** @class */ (function (_super)
    {
        __extends(Prepare, _super);
        /**
         * @param {PIXI.Renderer} renderer - A reference to the current renderer
         */
        function Prepare(renderer)
        {
            const _this = _super.call(this, renderer) || this;

            _this.uploadHookHelper = _this.renderer;
            // Add textures and graphics to upload
            _this.registerFindHook(findGraphics);
            _this.registerUploadHook(uploadBaseTextures);
            _this.registerUploadHook(uploadGraphics);

            return _this;
        }

        return Prepare;
    })(BasePrepare);

    /**
     * TimeLimiter limits the number of items handled by a {@link PIXI.BasePrepare} to a specified
     * number of milliseconds per frame.
     *
     * @class
     * @memberof PIXI
     */
    const TimeLimiter = /** @class */ (function ()
    {
        /**
         * @param {number} maxMilliseconds - The maximum milliseconds that can be spent preparing items each frame.
         */
        function TimeLimiter(maxMilliseconds)
        {
            /**
             * The maximum milliseconds that can be spent preparing items each frame.
             * @type {number}
             * @private
             */
            this.maxMilliseconds = maxMilliseconds;
            /**
             * The start time of the current frame.
             * @type {number}
             * @private
             */
            this.frameStart = 0;
        }
        /**
         * Resets any counting properties to start fresh on a new frame.
         */
        TimeLimiter.prototype.beginFrame = function ()
        {
            this.frameStart = Date.now();
        };
        /**
         * Checks to see if another item can be uploaded. This should only be called once per item.
         * @return {boolean} If the item is allowed to be uploaded.
         */
        TimeLimiter.prototype.allowedToUpload = function ()
        {
            return Date.now() - this.frameStart < this.maxMilliseconds;
        };

        return TimeLimiter;
    })();

    exports.BasePrepare = BasePrepare;
    exports.CountLimiter = CountLimiter;
    exports.Prepare = Prepare;
    exports.TimeLimiter = TimeLimiter;

    return exports;
})({}, PIXI, PIXI, PIXI, PIXI, PIXI, PIXI);

Object.assign(this.PIXI, _pixi_prepare);
// # sourceMappingURL=prepare.js.map
