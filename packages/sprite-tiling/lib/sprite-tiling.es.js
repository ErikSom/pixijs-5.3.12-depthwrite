/* !
 * @pixi/sprite-tiling - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/sprite-tiling is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { TextureMatrix, Texture, Shader, QuadUv, State, ObjectRenderer } from '@pixi/core';
import { Point, Transform, Rectangle, Matrix } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { deprecation, premultiplyTintToRgba, correctBlendMode } from '@pixi/utils';
import { WRAP_MODES } from '@pixi/constants';

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

const tempPoint = new Point();
/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 * @class
 * @extends PIXI.Sprite
 * @memberof PIXI
 */
const TilingSprite = /** @class */ (function (_super)
{
    __extends(TilingSprite, _super);
    /**
     * @param {PIXI.Texture} texture - the texture of the tiling sprite
     * @param {number} [width=100] - the width of the tiling sprite
     * @param {number} [height=100] - the height of the tiling sprite
     */
    function TilingSprite(texture, width, height)
    {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        const _this = _super.call(this, texture) || this;
        /**
         * Tile transform
         *
         * @member {PIXI.Transform}
         */

        _this.tileTransform = new Transform();
        /**
         * The with of the tiling sprite
         *
         * @member {number}
         * @private
         */
        _this._width = width;
        /**
         * The height of the tiling sprite
         *
         * @member {number}
         * @private
         */
        _this._height = height;
        /**
         * matrix that is applied to UV to get the coords in Texture normalized space to coords in BaseTexture space
         *
         * @member {PIXI.TextureMatrix}
         */
        _this.uvMatrix = _this.texture.uvMatrix || new TextureMatrix(texture);
        /**
         * Plugin that is responsible for rendering this element.
         * Allows to customize the rendering process without overriding '_render' method.
         *
         * @member {string}
         * @default 'tilingSprite'
         */
        _this.pluginName = 'tilingSprite';
        /**
         * Whether or not anchor affects uvs
         *
         * @member {boolean}
         * @default false
         */
        _this.uvRespectAnchor = false;

        return _this;
    }
    Object.defineProperty(TilingSprite.prototype, 'clampMargin', {
        /**
         * Changes frame clamping in corresponding textureTransform, shortcut
         * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
         *
         * @default 0.5
         * @member {number}
         */
        get()
        {
            return this.uvMatrix.clampMargin;
        },
        set(value)
        {
            this.uvMatrix.clampMargin = value;
            this.uvMatrix.update(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TilingSprite.prototype, 'tileScale', {
        /**
         * The scaling of the image that is being tiled
         *
         * @member {PIXI.ObservablePoint}
         */
        get()
        {
            return this.tileTransform.scale;
        },
        set(value)
        {
            this.tileTransform.scale.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TilingSprite.prototype, 'tilePosition', {
        /**
         * The offset of the image that is being tiled
         *
         * @member {PIXI.ObservablePoint}
         */
        get()
        {
            return this.tileTransform.position;
        },
        set(value)
        {
            this.tileTransform.position.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @protected
     */
    TilingSprite.prototype._onTextureUpdate = function ()
    {
        if (this.uvMatrix)
        {
            this.uvMatrix.texture = this._texture;
        }
        this._cachedTint = 0xFFFFFF;
    };
    /**
     * Renders the object using the WebGL renderer
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    TilingSprite.prototype._render = function (renderer)
    {
        // tweak our texture temporarily..
        const texture = this._texture;

        if (!texture || !texture.valid)
        {
            return;
        }
        this.tileTransform.updateLocalTransform();
        this.uvMatrix.update();
        renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
        renderer.plugins[this.pluginName].render(this);
    };
    /**
     * Updates the bounds of the tiling sprite.
     *
     * @protected
     */
    TilingSprite.prototype._calculateBounds = function ()
    {
        const minX = this._width * -this._anchor._x;
        const minY = this._height * -this._anchor._y;
        const maxX = this._width * (1 - this._anchor._x);
        const maxY = this._height * (1 - this._anchor._y);

        this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
    };
    /**
     * Gets the local bounds of the sprite object.
     *
     * @param {PIXI.Rectangle} rect - The output rectangle.
     * @return {PIXI.Rectangle} The bounds.
     */
    TilingSprite.prototype.getLocalBounds = function (rect)
    {
        // we can do a fast local bounds if the sprite has no children!
        if (this.children.length === 0)
        {
            this._bounds.minX = this._width * -this._anchor._x;
            this._bounds.minY = this._height * -this._anchor._y;
            this._bounds.maxX = this._width * (1 - this._anchor._x);
            this._bounds.maxY = this._height * (1 - this._anchor._y);
            if (!rect)
            {
                if (!this._localBoundsRect)
                {
                    this._localBoundsRect = new Rectangle();
                }
                rect = this._localBoundsRect;
            }

            return this._bounds.getRectangle(rect);
        }

        return _super.prototype.getLocalBounds.call(this, rect);
    };
    /**
     * Checks if a point is inside this tiling sprite.
     *
     * @param {PIXI.IPointData} point - the point to check
     * @return {boolean} Whether or not the sprite contains the point.
     */
    TilingSprite.prototype.containsPoint = function (point)
    {
        this.worldTransform.applyInverse(point, tempPoint);
        const width = this._width;
        const height = this._height;
        const x1 = -width * this.anchor._x;

        if (tempPoint.x >= x1 && tempPoint.x < x1 + width)
        {
            const y1 = -height * this.anchor._y;

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
    TilingSprite.prototype.destroy = function (options)
    {
        _super.prototype.destroy.call(this, options);
        this.tileTransform = null;
        this.uvMatrix = null;
    };
    /**
     * Helper function that creates a new tiling sprite based on the source you provide.
     * The source can be - frame id, image url, video url, canvas element, video element, base texture
     *
     * @static
     * @param {string|PIXI.Texture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
     * @param {Object} options - See {@link PIXI.BaseTexture}'s constructor for options.
     * @param {number} options.width - required width of the tiling sprite
     * @param {number} options.height - required height of the tiling sprite
     * @return {PIXI.TilingSprite} The newly created texture
     */
    TilingSprite.from = function (source, options)
    {
        // Deprecated
        if (typeof options === 'number')
        {
            deprecation('5.3.0', 'TilingSprite.from use options instead of width and height args');
            // eslint-disable-next-line prefer-rest-params
            options = { width: options, height: arguments[2] };
        }

        return new TilingSprite(Texture.from(source, options), options.width, options.height);
    };
    Object.defineProperty(TilingSprite.prototype, 'width', {
        /**
         * The width of the sprite, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get()
        {
            return this._width;
        },
        set(value)
        {
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TilingSprite.prototype, 'height', {
        /**
         * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get()
        {
            return this._height;
        },
        set(value)
        {
            this._height = value;
        },
        enumerable: false,
        configurable: true
    });

    return TilingSprite;
})(Sprite);

const vertex = 'attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTransform;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n';

const fragment = 'varying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec4 uColor;\r\nuniform mat3 uMapCoord;\r\nuniform vec4 uClampFrame;\r\nuniform vec2 uClampOffset;\r\n\r\nvoid main(void)\r\n{\r\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\r\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\r\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\r\n\r\n    vec4 texSample = texture2D(uSampler, coord);\r\n    gl_FragColor = texSample * uColor;\r\n}\r\n';

const fragmentSimple = 'varying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec4 uColor;\r\n\r\nvoid main(void)\r\n{\r\n    vec4 texSample = texture2D(uSampler, vTextureCoord);\r\n    gl_FragColor = texSample * uColor;\r\n}\r\n';

const tempMat = new Matrix();
/**
 * WebGL renderer plugin for tiling sprites
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
const TilingSpriteRenderer = /** @class */ (function (_super)
{
    __extends(TilingSpriteRenderer, _super);
    /**
     * constructor for renderer
     *
     * @param {PIXI.Renderer} renderer - The renderer this tiling awesomeness works for.
     */
    function TilingSpriteRenderer(renderer)
    {
        const _this = _super.call(this, renderer) || this;
        const uniforms = { globals: _this.renderer.globalUniforms };

        _this.shader = Shader.from(vertex, fragment, uniforms);
        _this.simpleShader = Shader.from(vertex, fragmentSimple, uniforms);
        _this.quad = new QuadUv();
        /**
         * The WebGL state in which this renderer will work.
         *
         * @member {PIXI.State}
         * @readonly
         */
        _this.state = State.for2d();

        return _this;
    }
    /**
     *
     * @param {PIXI.TilingSprite} ts - tilingSprite to be rendered
     */
    TilingSpriteRenderer.prototype.render = function (ts)
    {
        const renderer = this.renderer;
        const quad = this.quad;
        let vertices = quad.vertices;

        vertices[0] = vertices[6] = (ts._width) * -ts.anchor.x;
        vertices[1] = vertices[3] = ts._height * -ts.anchor.y;
        vertices[2] = vertices[4] = (ts._width) * (1.0 - ts.anchor.x);
        vertices[5] = vertices[7] = ts._height * (1.0 - ts.anchor.y);
        if (ts.uvRespectAnchor)
        {
            vertices = quad.uvs;
            vertices[0] = vertices[6] = -ts.anchor.x;
            vertices[1] = vertices[3] = -ts.anchor.y;
            vertices[2] = vertices[4] = 1.0 - ts.anchor.x;
            vertices[5] = vertices[7] = 1.0 - ts.anchor.y;
        }
        quad.invalidate();
        const tex = ts._texture;
        const baseTex = tex.baseTexture;
        const lt = ts.tileTransform.localTransform;
        const uv = ts.uvMatrix;
        let isSimple = baseTex.isPowerOfTwo
            && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height;
        // auto, force repeat wrapMode for big tiling textures

        if (isSimple)
        {
            if (!baseTex._glTextures[renderer.CONTEXT_UID])
            {
                if (baseTex.wrapMode === WRAP_MODES.CLAMP)
                {
                    baseTex.wrapMode = WRAP_MODES.REPEAT;
                }
            }
            else
            {
                isSimple = baseTex.wrapMode !== WRAP_MODES.CLAMP;
            }
        }
        const shader = isSimple ? this.simpleShader : this.shader;
        const w = tex.width;
        const h = tex.height;
        const W = ts._width;
        const H = ts._height;

        tempMat.set(lt.a * w / W, lt.b * w / H, lt.c * h / W, lt.d * h / H, lt.tx / W, lt.ty / H);
        // that part is the same as above:
        // tempMat.identity();
        // tempMat.scale(tex.width, tex.height);
        // tempMat.prepend(lt);
        // tempMat.scale(1.0 / ts._width, 1.0 / ts._height);
        tempMat.invert();
        if (isSimple)
        {
            tempMat.prepend(uv.mapCoord);
        }
        else
        {
            shader.uniforms.uMapCoord = uv.mapCoord.toArray(true);
            shader.uniforms.uClampFrame = uv.uClampFrame;
            shader.uniforms.uClampOffset = uv.uClampOffset;
        }
        shader.uniforms.uTransform = tempMat.toArray(true);
        shader.uniforms.uColor = premultiplyTintToRgba(ts.tint, ts.worldAlpha, shader.uniforms.uColor, baseTex.alphaMode);
        shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(true);
        shader.uniforms.uSampler = tex;
        renderer.shader.bind(shader);
        renderer.geometry.bind(quad);
        this.state.blendMode = correctBlendMode(ts.blendMode, baseTex.alphaMode);
        renderer.state.set(this.state);
        renderer.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    };

    return TilingSpriteRenderer;
})(ObjectRenderer);

export { TilingSprite, TilingSpriteRenderer };
// # sourceMappingURL=sprite-tiling.es.js.map
