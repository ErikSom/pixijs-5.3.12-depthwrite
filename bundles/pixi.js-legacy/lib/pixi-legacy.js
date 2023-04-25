/* !
 * pixi.js-legacy - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * pixi.js-legacy is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

Object.defineProperty(exports, '__esModule', { value: true });

const pixi_js = require('pixi.js');
const canvasRenderer = require('@pixi/canvas-renderer');
const canvasMesh = require('@pixi/canvas-mesh');
const canvasGraphics = require('@pixi/canvas-graphics');
const canvasSprite = require('@pixi/canvas-sprite');
const canvasExtract = require('@pixi/canvas-extract');
const canvasPrepare = require('@pixi/canvas-prepare');

require('@pixi/canvas-sprite-tiling');
require('@pixi/canvas-particles');
require('@pixi/canvas-display');
require('@pixi/canvas-text');

canvasRenderer.CanvasRenderer.registerPlugin('accessibility', pixi_js.AccessibilityManager);
canvasRenderer.CanvasRenderer.registerPlugin('extract', canvasExtract.CanvasExtract);
canvasRenderer.CanvasRenderer.registerPlugin('graphics', canvasGraphics.CanvasGraphicsRenderer);
canvasRenderer.CanvasRenderer.registerPlugin('interaction', pixi_js.InteractionManager);
canvasRenderer.CanvasRenderer.registerPlugin('mesh', canvasMesh.CanvasMeshRenderer);
canvasRenderer.CanvasRenderer.registerPlugin('prepare', canvasPrepare.CanvasPrepare);
canvasRenderer.CanvasRenderer.registerPlugin('sprite', canvasSprite.CanvasSpriteRenderer);

Object.keys(pixi_js).forEach(function (key)
{
    Object.defineProperty(exports, key, {
        enumerable: true,
        get()
        {
            return pixi_js[key];
        }
    });
});
Object.defineProperty(exports, 'CanvasRenderer', {
    enumerable: true,
    get()
    {
        return canvasRenderer.CanvasRenderer;
    }
});
Object.defineProperty(exports, 'canvasUtils', {
    enumerable: true,
    get()
    {
        return canvasRenderer.canvasUtils;
    }
});
Object.defineProperty(exports, 'CanvasMeshRenderer', {
    enumerable: true,
    get()
    {
        return canvasMesh.CanvasMeshRenderer;
    }
});
Object.defineProperty(exports, 'CanvasGraphicsRenderer', {
    enumerable: true,
    get()
    {
        return canvasGraphics.CanvasGraphicsRenderer;
    }
});
Object.defineProperty(exports, 'CanvasSpriteRenderer', {
    enumerable: true,
    get()
    {
        return canvasSprite.CanvasSpriteRenderer;
    }
});
Object.defineProperty(exports, 'CanvasExtract', {
    enumerable: true,
    get()
    {
        return canvasExtract.CanvasExtract;
    }
});
Object.defineProperty(exports, 'CanvasPrepare', {
    enumerable: true,
    get()
    {
        return canvasPrepare.CanvasPrepare;
    }
});
// # sourceMappingURL=pixi-legacy.js.map
