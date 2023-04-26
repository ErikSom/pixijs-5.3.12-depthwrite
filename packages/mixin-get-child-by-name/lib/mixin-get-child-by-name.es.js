/* !
 * @pixi/mixin-get-child-by-name - v5.3.7
 * Compiled Wed, 26 Apr 2023 15:56:05 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { DisplayObject, Container } from '@pixi/display';

/**
 * The instance name of the object.
 *
 * @memberof PIXI.DisplayObject#
 * @member {string} name
 */
DisplayObject.prototype.name = null;
/**
 * Returns the display object in the container.
 *
 * Recursive searches are done in a preorder traversal.
 *
 * @method getChildByName
 * @memberof PIXI.Container#
 * @param {string} name - Instance name.
 * @param {boolean}[deep=false] - Whether to search recursively
 * @return {PIXI.DisplayObject} The child with the specified name.
 */
Container.prototype.getChildByName = function getChildByName(name, deep)
{
    for (var i = 0, j = this.children.length; i < j; i++)
    {
        if (this.children[i].name === name)
        {
            return this.children[i];
        }
    }
    if (deep)
    {
        for (var i = 0, j = this.children.length; i < j; i++)
        {
            const child = this.children[i];

            if (!child.getChildByName)
            {
                continue;
            }
            const target = this.children[i].getChildByName(name, true);

            if (target)
            {
                return target;
            }
        }
    }

    return null;
};
// # sourceMappingURL=mixin-get-child-by-name.es.js.map
