/*!
 * @pixi/canvas-text - v5.3.12
 * Compiled Wed, 02 Aug 2023 14:32:51 UTC
 *
 * @pixi/canvas-text is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
(function (text, sprite) {
    'use strict';

    /**
     * Renders the object using the Canvas renderer
     *
     * @method _renderCanvas
     * @memberof PIXI.Text#
     * @private
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    text.Text.prototype._renderCanvas = function _renderCanvas(renderer) {
        if (this._autoResolution && this._resolution !== renderer.resolution) {
            this._resolution = renderer.resolution;
            this.dirty = true;
        }
        this.updateText(true);
        sprite.Sprite.prototype._renderCanvas.call(this, renderer);
    };

}(PIXI, PIXI));
//# sourceMappingURL=canvas-text.js.map
