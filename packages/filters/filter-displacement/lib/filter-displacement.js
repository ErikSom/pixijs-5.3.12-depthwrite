/* !
 * @pixi/filter-displacement - v5.3.7
 * Compiled Wed, 02 Aug 2023 13:53:13 UTC
 *
 * @pixi/filter-displacement is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@pixi/core');
const math = require('@pixi/math');

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

const fragment = 'varying vec2 vFilterCoord;\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform vec2 scale;\r\nuniform mat2 rotation;\r\nuniform sampler2D uSampler;\r\nuniform sampler2D mapSampler;\r\n\r\nuniform highp vec4 inputSize;\r\nuniform vec4 inputClamp;\r\n\r\nvoid main(void)\r\n{\r\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\r\n\r\n  map -= 0.5;\r\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\r\n\r\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\r\n}\r\n';

const vertex = 'attribute vec2 aVertexPosition;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 filterMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec2 vFilterCoord;\r\n\r\nuniform vec4 inputSize;\r\nuniform vec4 outputFrame;\r\n\r\nvec4 filterVertexPosition( void )\r\n{\r\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\r\n\r\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\r\n}\r\n\r\nvec2 filterTextureCoord( void )\r\n{\r\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\r\n}\r\n\r\nvoid main(void)\r\n{\r\n\tgl_Position = filterVertexPosition();\r\n\tvTextureCoord = filterTextureCoord();\r\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\r\n}\r\n';

/**
 * The DisplacementFilter class uses the pixel values from the specified texture
 * (called the displacement map) to perform a displacement of an object.
 *
 * You can use this filter to apply all manor of crazy warping effects.
 * Currently the `r` property of the texture is used to offset the `x`
 * and the `g` property of the texture is used to offset the `y`.
 *
 * The way it works is it uses the values of the displacement map to look up the
 * correct pixels to output. This means it's not technically moving the original.
 * Instead, it's starting at the output and asking "which pixel from the original goes here".
 * For example, if a displacement map pixel has `red = 1` and the filter scale is `20`,
 * this filter will output the pixel approximately 20 pixels to the right of the original.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
const DisplacementFilter = /** @class */ (function (_super)
{
    __extends(DisplacementFilter, _super);
    /**
     * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
     * @param {number} [scale] - The scale of the displacement
     */
    function DisplacementFilter(sprite, scale)
    {
        let _this = this;
        const maskMatrix = new math.Matrix();

        sprite.renderable = false;
        _this = _super.call(this, vertex, fragment, {
            mapSampler: sprite._texture,
            filterMatrix: maskMatrix,
            scale: { x: 1, y: 1 },
            rotation: new Float32Array([1, 0, 0, 1]),
        }) || this;
        _this.maskSprite = sprite;
        _this.maskMatrix = maskMatrix;
        if (scale === null || scale === undefined)
        {
            scale = 20;
        }
        /**
         * scaleX, scaleY for displacements
         * @member {PIXI.Point}
         */
        _this.scale = new math.Point(scale, scale);

        return _this;
    }
    /**
     * Applies the filter.
     *
     * @param {PIXI.systems.FilterSystem} filterManager - The manager.
     * @param {PIXI.RenderTexture} input - The input target.
     * @param {PIXI.RenderTexture} output - The output target.
     * @param {PIXI.CLEAR_MODES} clearMode - clearMode.
     */
    DisplacementFilter.prototype.apply = function (filterManager, input, output, clearMode)
    {
        // fill maskMatrix with _normalized sprite texture coords_
        this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);
        this.uniforms.scale.x = this.scale.x;
        this.uniforms.scale.y = this.scale.y;
        // Extract rotation from world transform
        const wt = this.maskSprite.worldTransform;
        const lenX = Math.sqrt((wt.a * wt.a) + (wt.b * wt.b));
        const lenY = Math.sqrt((wt.c * wt.c) + (wt.d * wt.d));

        if (lenX !== 0 && lenY !== 0)
        {
            this.uniforms.rotation[0] = wt.a / lenX;
            this.uniforms.rotation[1] = wt.b / lenX;
            this.uniforms.rotation[2] = wt.c / lenY;
            this.uniforms.rotation[3] = wt.d / lenY;
        }
        // draw the filter...
        filterManager.applyFilter(this, input, output, clearMode);
    };
    Object.defineProperty(DisplacementFilter.prototype, 'map', {
        /**
         * The texture used for the displacement map. Must be power of 2 sized texture.
         *
         * @member {PIXI.Texture}
         */
        get()
        {
            return this.uniforms.mapSampler;
        },
        set(value)
        {
            this.uniforms.mapSampler = value;
        },
        enumerable: false,
        configurable: true
    });

    return DisplacementFilter;
})(core.Filter);

exports.DisplacementFilter = DisplacementFilter;
// # sourceMappingURL=filter-displacement.js.map
