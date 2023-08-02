/* !
 * @pixi/filter-noise - v5.3.7
 * Compiled Wed, 02 Aug 2023 13:53:13 UTC
 *
 * @pixi/filter-noise is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@pixi/core');

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

const fragment = 'precision highp float;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\n\r\nuniform float uNoise;\r\nuniform float uSeed;\r\nuniform sampler2D uSampler;\r\n\r\nfloat rand(vec2 co)\r\n{\r\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec4 color = texture2D(uSampler, vTextureCoord);\r\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\r\n    float diff = (randomValue - 0.5) * uNoise;\r\n\r\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\r\n    if (color.a > 0.0) {\r\n        color.rgb /= color.a;\r\n    }\r\n\r\n    color.r += diff;\r\n    color.g += diff;\r\n    color.b += diff;\r\n\r\n    // Premultiply alpha again.\r\n    color.rgb *= color.a;\r\n\r\n    gl_FragColor = color;\r\n}\r\n';

/**
 * @author Vico @vicocotea
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
 */
/**
 * A Noise effect filter.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
const NoiseFilter = /** @class */ (function (_super)
{
    __extends(NoiseFilter, _super);
    /**
     * @param {number} [noise=0.5] - The noise intensity, should be a normalized value in the range [0, 1].
     * @param {number} [seed] - A random seed for the noise generation. Default is `Math.random()`.
     */
    function NoiseFilter(noise, seed)
    {
        if (noise === void 0) { noise = 0.5; }
        if (seed === void 0) { seed = Math.random(); }
        const _this = _super.call(this, core.defaultFilterVertex, fragment, {
            uNoise: 0,
            uSeed: 0,
        }) || this;

        _this.noise = noise;
        _this.seed = seed;

        return _this;
    }
    Object.defineProperty(NoiseFilter.prototype, 'noise', {
        /**
         * The amount of noise to apply, this value should be in the range (0, 1].
         *
         * @member {number}
         * @default 0.5
         */
        get()
        {
            return this.uniforms.uNoise;
        },
        set(value)
        {
            this.uniforms.uNoise = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoiseFilter.prototype, 'seed', {
        /**
         * A seed value to apply to the random noise generation. `Math.random()` is a good value to use.
         *
         * @member {number}
         */
        get()
        {
            return this.uniforms.uSeed;
        },
        set(value)
        {
            this.uniforms.uSeed = value;
        },
        enumerable: false,
        configurable: true
    });

    return NoiseFilter;
})(core.Filter);

exports.NoiseFilter = NoiseFilter;
// # sourceMappingURL=filter-noise.js.map
