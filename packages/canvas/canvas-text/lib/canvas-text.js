/* !
 * @pixi/canvas-text - v5.3.7
 * Compiled Wed, 02 Aug 2023 13:53:13 UTC
 *
 * @pixi/canvas-text is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

const text = require('@pixi/text');
const sprite = require('@pixi/sprite');

/**
 * Renders the object using the Canvas renderer
 *
 * @method _renderCanvas
 * @memberof PIXI.Text#
 * @private
 * @param {PIXI.CanvasRenderer} renderer - The renderer
 */
text.Text.prototype._renderCanvas = function _renderCanvas(renderer)
{
    if (this._autoResolution && this._resolution !== renderer.resolution)
    {
        this._resolution = renderer.resolution;
        this.dirty = true;
    }
    this.updateText(true);
    sprite.Sprite.prototype._renderCanvas.call(this, renderer);
};
// # sourceMappingURL=canvas-text.js.map
