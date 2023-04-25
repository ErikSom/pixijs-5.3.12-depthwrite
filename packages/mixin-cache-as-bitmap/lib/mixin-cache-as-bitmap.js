/* !
 * @pixi/mixin-cache-as-bitmap - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/mixin-cache-as-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@pixi/core');
const sprite = require('@pixi/sprite');
const display = require('@pixi/display');
const math = require('@pixi/math');
const utils = require('@pixi/utils');
const settings = require('@pixi/settings');

const _tempMatrix = new math.Matrix();

display.DisplayObject.prototype._cacheAsBitmap = false;
display.DisplayObject.prototype._cacheData = null;
// figured there's no point adding ALL the extra variables to prototype.
// this model can hold the information needed. This can also be generated on demand as
// most objects are not cached as bitmaps.
/**
 * @class
 * @ignore
 */
const CacheData = /** @class */ (function ()
{
    function CacheData()
    {
        this.textureCacheId = null;
        this.originalRender = null;
        this.originalRenderCanvas = null;
        this.originalCalculateBounds = null;
        this.originalGetLocalBounds = null;
        this.originalUpdateTransform = null;
        this.originalDestroy = null;
        this.originalMask = null;
        this.originalFilterArea = null;
        this.originalContainsPoint = null;
        this.sprite = null;
    }

    return CacheData;
})();

Object.defineProperties(display.DisplayObject.prototype, {
    /**
     * Set this to true if you want this display object to be cached as a bitmap.
     * This basically takes a snap shot of the display object as it is at that moment. It can
     * provide a performance benefit for complex static displayObjects.
     * To remove simply set this property to `false`
     *
     * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE setting this property to true
     * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
     *
     * @member {boolean}
     * @memberof PIXI.DisplayObject#
     */
    cacheAsBitmap: {
        get()
        {
            return this._cacheAsBitmap;
        },
        set(value)
        {
            if (this._cacheAsBitmap === value)
            {
                return;
            }
            this._cacheAsBitmap = value;
            let data;

            if (value)
            {
                if (!this._cacheData)
                {
                    this._cacheData = new CacheData();
                }
                data = this._cacheData;
                data.originalRender = this.render;
                data.originalRenderCanvas = this.renderCanvas;
                data.originalUpdateTransform = this.updateTransform;
                data.originalCalculateBounds = this.calculateBounds;
                data.originalGetLocalBounds = this.getLocalBounds;
                data.originalDestroy = this.destroy;
                data.originalContainsPoint = this.containsPoint;
                data.originalMask = this._mask;
                data.originalFilterArea = this.filterArea;
                this.render = this._renderCached;
                this.renderCanvas = this._renderCachedCanvas;
                this.destroy = this._cacheAsBitmapDestroy;
            }
            else
            {
                data = this._cacheData;
                if (data.sprite)
                {
                    this._destroyCachedDisplayObject();
                }
                this.render = data.originalRender;
                this.renderCanvas = data.originalRenderCanvas;
                this.calculateBounds = data.originalCalculateBounds;
                this.getLocalBounds = data.originalGetLocalBounds;
                this.destroy = data.originalDestroy;
                this.updateTransform = data.originalUpdateTransform;
                this.containsPoint = data.originalContainsPoint;
                this._mask = data.originalMask;
                this.filterArea = data.originalFilterArea;
            }
        },
    },
});
/**
 * Renders a cached version of the sprite with WebGL
 *
 * @private
 * @function _renderCached
 * @memberof PIXI.DisplayObject#
 * @param {PIXI.Renderer} renderer - the WebGL renderer
 */
display.DisplayObject.prototype._renderCached = function _renderCached(renderer)
{
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable)
    {
        return;
    }
    this._initCachedDisplayObject(renderer);
    this._cacheData.sprite.transform._worldID = this.transform._worldID;
    this._cacheData.sprite.worldAlpha = this.worldAlpha;
    this._cacheData.sprite._render(renderer);
};
/**
 * Prepares the WebGL renderer to cache the sprite
 *
 * @private
 * @function _initCachedDisplayObject
 * @memberof PIXI.DisplayObject#
 * @param {PIXI.Renderer} renderer - the WebGL renderer
 */
display.DisplayObject.prototype._initCachedDisplayObject = function _initCachedDisplayObject(renderer)
{
    if (this._cacheData && this._cacheData.sprite)
    {
        return;
    }
    // make sure alpha is set to 1 otherwise it will get rendered as invisible!
    const cacheAlpha = this.alpha;

    this.alpha = 1;
    // first we flush anything left in the renderer (otherwise it would get rendered to the cached texture)
    renderer.batch.flush();
    // this.filters= [];
    // next we find the dimensions of the untransformed object
    // this function also calls updatetransform on all its children as part of the measuring.
    // This means we don't need to update the transform again in this function
    // TODO pass an object to clone too? saves having to create a new one each time!
    const bounds = this.getLocalBounds(null, true).clone();
    // add some padding!

    if (this.filters)
    {
        const padding = this.filters[0].padding;

        bounds.pad(padding);
    }
    bounds.ceil(settings.settings.RESOLUTION);
    // for now we cache the current renderTarget that the WebGL renderer is currently using.
    // this could be more elegant..
    const cachedRenderTexture = renderer.renderTexture.current;
    const cachedSourceFrame = renderer.renderTexture.sourceFrame.clone();
    const cachedDestinationFrame = renderer.renderTexture.destinationFrame.clone();
    const cachedProjectionTransform = renderer.projection.transform;
    // We also store the filter stack - I will definitely look to change how this works a little later down the line.
    // const stack = renderer.filterManager.filterStack;
    // this renderTexture will be used to store the cached DisplayObject
    const renderTexture = core.RenderTexture.create({ width: bounds.width, height: bounds.height });
    const textureCacheId = `cacheAsBitmap_${utils.uid()}`;

    this._cacheData.textureCacheId = textureCacheId;
    core.BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId);
    core.Texture.addToCache(renderTexture, textureCacheId);
    // need to set //
    const m = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-bounds.x, -bounds.y);
    // set all properties to there original so we can render to a texture

    this.render = this._cacheData.originalRender;
    renderer.render(this, renderTexture, true, m, false);
    // now restore the state be setting the new properties
    renderer.projection.transform = cachedProjectionTransform;
    renderer.renderTexture.bind(cachedRenderTexture, cachedSourceFrame, cachedDestinationFrame);
    // renderer.filterManager.filterStack = stack;
    this.render = this._renderCached;
    // the rest is the same as for Canvas
    this.updateTransform = this.displayObjectUpdateTransform;
    this.calculateBounds = this._calculateCachedBounds;
    this.getLocalBounds = this._getCachedLocalBounds;
    this._mask = null;
    this.filterArea = null;
    // create our cached sprite
    const cachedSprite = new sprite.Sprite(renderTexture);

    cachedSprite.transform.worldTransform = this.transform.worldTransform;
    cachedSprite.anchor.x = -(bounds.x / bounds.width);
    cachedSprite.anchor.y = -(bounds.y / bounds.height);
    cachedSprite.alpha = cacheAlpha;
    cachedSprite._bounds = this._bounds;
    this._cacheData.sprite = cachedSprite;
    this.transform._parentID = -1;
    // restore the transform of the cached sprite to avoid the nasty flicker..
    if (!this.parent)
    {
        this.enableTempParent();
        this.updateTransform();
        this.disableTempParent(null);
    }
    else
    {
        this.updateTransform();
    }
    // map the hit test..
    this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
/**
 * Renders a cached version of the sprite with canvas
 *
 * @private
 * @function _renderCachedCanvas
 * @memberof PIXI.DisplayObject#
 * @param {PIXI.CanvasRenderer} renderer - The canvas renderer
 */
display.DisplayObject.prototype._renderCachedCanvas = function _renderCachedCanvas(renderer)
{
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable)
    {
        return;
    }
    this._initCachedDisplayObjectCanvas(renderer);
    this._cacheData.sprite.worldAlpha = this.worldAlpha;
    this._cacheData.sprite._renderCanvas(renderer);
};
// TODO this can be the same as the WebGL version.. will need to do a little tweaking first though..
/**
 * Prepares the Canvas renderer to cache the sprite
 *
 * @private
 * @function _initCachedDisplayObjectCanvas
 * @memberof PIXI.DisplayObject#
 * @param {PIXI.CanvasRenderer} renderer - The canvas renderer
 */
display.DisplayObject.prototype._initCachedDisplayObjectCanvas = function _initCachedDisplayObjectCanvas(renderer)
{
    if (this._cacheData && this._cacheData.sprite)
    {
        return;
    }
    // get bounds actually transforms the object for us already!
    const bounds = this.getLocalBounds(null, true);
    const cacheAlpha = this.alpha;

    this.alpha = 1;
    const cachedRenderTarget = renderer.context;
    const cachedProjectionTransform = renderer._projTransform;

    bounds.ceil(settings.settings.RESOLUTION);
    const renderTexture = core.RenderTexture.create({ width: bounds.width, height: bounds.height });
    const textureCacheId = `cacheAsBitmap_${utils.uid()}`;

    this._cacheData.textureCacheId = textureCacheId;
    core.BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId);
    core.Texture.addToCache(renderTexture, textureCacheId);
    // need to set //
    const m = _tempMatrix;

    this.transform.localTransform.copyTo(m);
    m.invert();
    m.tx -= bounds.x;
    m.ty -= bounds.y;
    // m.append(this.transform.worldTransform.)
    // set all properties to there original so we can render to a texture
    this.renderCanvas = this._cacheData.originalRenderCanvas;
    renderer.render(this, renderTexture, true, m, false);
    // now restore the state be setting the new properties
    renderer.context = cachedRenderTarget;
    renderer._projTransform = cachedProjectionTransform;
    this.renderCanvas = this._renderCachedCanvas;
    // the rest is the same as for WebGL
    this.updateTransform = this.displayObjectUpdateTransform;
    this.calculateBounds = this._calculateCachedBounds;
    this.getLocalBounds = this._getCachedLocalBounds;
    this._mask = null;
    this.filterArea = null;
    // create our cached sprite
    const cachedSprite = new sprite.Sprite(renderTexture);

    cachedSprite.transform.worldTransform = this.transform.worldTransform;
    cachedSprite.anchor.x = -(bounds.x / bounds.width);
    cachedSprite.anchor.y = -(bounds.y / bounds.height);
    cachedSprite.alpha = cacheAlpha;
    cachedSprite._bounds = this._bounds;
    this._cacheData.sprite = cachedSprite;
    this.transform._parentID = -1;
    // restore the transform of the cached sprite to avoid the nasty flicker..
    if (!this.parent)
    {
        this.parent = renderer._tempDisplayObjectParent;
        this.updateTransform();
        this.parent = null;
    }
    else
    {
        this.updateTransform();
    }
    // map the hit test..
    this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
/**
 * Calculates the bounds of the cached sprite
 *
 * @private
 */
display.DisplayObject.prototype._calculateCachedBounds = function _calculateCachedBounds()
{
    this._bounds.clear();
    this._cacheData.sprite.transform._worldID = this.transform._worldID;
    this._cacheData.sprite._calculateBounds();
    this._bounds.updateID = this._boundsID;
};
/**
 * Gets the bounds of the cached sprite.
 *
 * @private
 * @return {Rectangle} The local bounds.
 */
display.DisplayObject.prototype._getCachedLocalBounds = function _getCachedLocalBounds()
{
    return this._cacheData.sprite.getLocalBounds(null);
};
/**
 * Destroys the cached sprite.
 *
 * @private
 */
display.DisplayObject.prototype._destroyCachedDisplayObject = function _destroyCachedDisplayObject()
{
    this._cacheData.sprite._texture.destroy(true);
    this._cacheData.sprite = null;
    core.BaseTexture.removeFromCache(this._cacheData.textureCacheId);
    core.Texture.removeFromCache(this._cacheData.textureCacheId);
    this._cacheData.textureCacheId = null;
};
/**
 * Destroys the cached object.
 *
 * @private
 * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
 *  have been set to that value.
 *  Used when destroying containers, see the Container.destroy method.
 */
display.DisplayObject.prototype._cacheAsBitmapDestroy = function _cacheAsBitmapDestroy(options)
{
    this.cacheAsBitmap = false;
    this.destroy(options);
};

exports.CacheData = CacheData;
// # sourceMappingURL=mixin-cache-as-bitmap.js.map
