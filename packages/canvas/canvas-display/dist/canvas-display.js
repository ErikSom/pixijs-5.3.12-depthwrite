/*!
 * @pixi/canvas-display - v5.3.7
 * Compiled Wed, 26 Apr 2023 15:56:05 UTC
 *
 * @pixi/canvas-display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
(function (display) {
    'use strict';

    /**
     * To be overridden by the subclass
     * @method _renderCanvas
     * @memberof PIXI.Container#
     * @protected
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    display.Container.prototype._renderCanvas = function _renderCanvas(_renderer) {
        // this is where content itself gets rendered...
    };
    /**
     * Renders the object using the Canvas renderer
     * @method renderCanvas
     * @memberof PIXI.Container#
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    display.Container.prototype.renderCanvas = function renderCanvas(renderer) {
        // if not visible or the alpha is 0 then no need to render this
        if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
            return;
        }
        if (this._mask) {
            renderer.maskManager.pushMask(this._mask);
        }
        this._renderCanvas(renderer);
        for (var i = 0, j = this.children.length; i < j; ++i) {
            this.children[i].renderCanvas(renderer);
        }
        if (this._mask) {
            renderer.maskManager.popMask(renderer);
        }
    };

    /**
     * Renders the object using the Canvas renderer
     * @method renderCanvas
     * @memberof PIXI.Container#
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    display.DisplayObject.prototype.renderCanvas = function renderCanvas(_renderer) {
        // OVERWRITE;
    };

}(PIXI));
//# sourceMappingURL=canvas-display.js.map
