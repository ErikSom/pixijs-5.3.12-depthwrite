/* !
 * @pixi/canvas-text - v5.3.12
 * Compiled Tue, 25 Apr 2023 12:45:00 UTC
 *
 * @pixi/canvas-text is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
(function (text, sprite)
{
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
})(PIXI, PIXI);
// # sourceMappingURL=canvas-text.js.map
